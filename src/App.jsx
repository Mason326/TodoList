import { BrowserRouter, Routes, Route } from 'react-router';
import './App.css';
import TodoList from './TodoListComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<TodoList />} />
        <Route path="signIn" element={<div>SignIn Page</div>} />
        <Route path="signUp" element={<div>SignUp Page</div>} />
        <Route path="forgotPassword" element={<div>Forgot Password Page</div>} />
        <Route path="/" element={<div>Welcome Page</div>} />
        <Route path="*" element={<div>Oops, this page doesn't exist</div>} />
      </Routes>
    </BrowserRouter>
  )
} 

export default App;
