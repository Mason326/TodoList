import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import SignUp from "./components/sign-up/SignUp.jsx";
import TodoList from "./TodoListComponent";
import { createContext, useEffect, useState, useCallback } from "react";
import SignIn from "./components/sign-in/SignIn.jsx";
import { supabase } from "./api/supabase/supabase-client/index.js";
import WelcomePage from "./components/welcome-page-route/components/WelcomePage.jsx";
import {
  cleanupAllChannels,
  subscribeToProjects,
} from "./api/supabase/supabase-utils/db.js";

export const AuthContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [payloadProject, setPayloadProject] = useState(null);

  const handleAuthChange = useCallback(async (event, session) => {
    setSession(session);
    setUser(session?.user ?? null);

    if (event === "SIGNED_IN" && session?.user) {
      await subscribeToProjects(session.user.id, (payload) => {
        window.dispatchEvent(
          new CustomEvent("project-change", { detail: payload }),
        );
        setPayloadProject(payload);
      });
    }

    if (event === "SIGNED_OUT") {
      cleanupAllChannels();
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      handleAuthChange("INIT", session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      subscription.unsubscribe();
      cleanupAllChannels();
    };
  }, [handleAuthChange]);

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          session,
          checkSession: () => handleCheckSession(),
          payloadProject,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="dashboard" element={<TodoList />} />
            <Route path="signIn" element={<SignIn />} />
            <Route path="signUp" element={<SignUp />} />
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="*"
              element={<div>Oops, this page doesn't exist</div>}
            />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}
export default App;
