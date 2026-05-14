import { useState, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { UserContext } from "../../Hooks/UserContext.jsx";
import "../../CSS/Login.css";
import { LoginUser } from "../../API/users.js";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (user && user.id) {
    return <Navigate to={`/users/${user.id}/home`} replace />;
  }

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    if (!name || !password) {
      setError("שם משתמש וסיסמה הם שדות חובה");
      return;
    }

    try {
      const response = await LoginUser(name, password);
      
      const userData = response.user;
      const token = response.token;

      if (!userData || !userData.id) {
        throw new Error("נתוני משתמש חסרים בתגובת השרת");
      }

      const userToStore = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userToStore));
      
      setUser(userToStore); 
            navigate(`/users/${userData.id}/home`);

    } catch (error) {
      console.error("Login Error Details:", error);

      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else if (error.error) {
        setError(error.error);
      } else {
        setError("אירעה שגיאה בתהליך ההתחברות. נסה שוב");
      }
    }
};
  return (
    <form className="auth-card" onSubmit={handleSubmit}>
      <h2>Welcome back</h2>

      {error && <p className="error" style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      <p className="switch">
        Don’t have an account? <Link to="/register">Create one</Link>
      </p>
    </form>
  );
}