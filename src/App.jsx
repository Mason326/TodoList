import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import SignUp from "./components/sign-up/SignUp.jsx"
import TodoList from './TodoListComponent';
import SignIn from './components/sign-in/SignIn.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<TodoList />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="forgotPassword" element={<div>Forgot Password Page</div>} />
        <Route path="/" element={<div>Welcome Page</div>} />
        <Route path="*" element={<div>Oops, this page doesn't exist</div>} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App;
