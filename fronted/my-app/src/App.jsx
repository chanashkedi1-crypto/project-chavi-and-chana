import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import './App.css'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/LoginRegister/Login.jsx'
import Register from './Pages/LoginRegister/Register.jsx'
import { UserProvider } from './Hooks/UserContext.jsx';
import Todos from './Pages/Home/Todos/Todos.jsx';
import Posts from './Pages/Home/Posts/Posts.jsx';
import Welcome from "./Pages/Home/Welcome.jsx";
function App() {
  return (
    <>
      <UserProvider>
        <Routes>
          
          <Route path="/" element={<Navigate to="/users/:id/home" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/users/:id/home" element={<Home />}>
              <Route index element={<Welcome />} />
              <Route path="todos" element={<Todos />} />
              <Route path="posts" element={<Posts />} />
            </Route>
          </Route>
          <Route path="*" element={<div style={{ padding: "20px" }}><h1>404 - Page Not Found</h1></div>} />
        </Routes>
      </UserProvider>
    </>
  )
}

export default App
