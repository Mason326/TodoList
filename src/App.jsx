import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import SignUp from "./components/sign-up/SignUp.jsx";
import TodoList from "./TodoListComponent";
import { createContext, useEffect, useState } from "react";
import SignIn from "./components/sign-in/SignIn.jsx";
import { supabase } from "./api/supabase/supabase-client/index.js";
import WelcomePage from "./components/welcome-page-route/components/WelcomePage.jsx";
import { subscribeToProjects } from "./api/supabase/supabase-utils/db.js";

export const AuthContext = createContext();
function App() {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [realtimeChannel, setRealtimeChannel] = useState(null);

  useEffect(() => {
    handleCheckSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (event === "TOKEN_REFRESHED") {
        console.log("Token refreshed");
      }

      if (event === "SIGNED_OUT") {
        if (realtimeChannel) {
          supabase.removeChannel(realtimeChannel);
          setRealtimeChannel(null);
        }
      }

      if (event === "SIGNED_IN" && session?.user) {
        subscribeToProjects([realtimeChannel, setRealtimeChannel]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  function handleCheckSession() {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });
  }

  return (
    <>
      <AuthContext.Provider
        value={{ user, session, checkSession: () => handleCheckSession() }}
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
