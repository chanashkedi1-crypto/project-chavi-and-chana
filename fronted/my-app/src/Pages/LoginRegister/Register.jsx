import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../API/users.js";
import { UserContext } from "../../Hooks/UserContext.jsx";
import "../../CSS/Register.css";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    if (!name || !email || !password || !confirmPassword) {
      setError("כל השדות הם חובה");
      return;
    }

    if (password !== confirmPassword) {
      setError("הסיסמאות אינן תואמות");
      return;
    }

    try {
      // שליפת הנתונים מהשרת
      const data = await RegisterUser({ name, email, password });
      
      // בדיקה שהנתונים חזרו במבנה הנכון
      if (!data || !data.user || !data.user.id) {
          throw new Error("השרת החזיר נתונים חלקיים - בדקי את ה-Controller בבקנד");
      }

      const userToStore = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email
      };

      // שמירה ב-LocalStorage
      localStorage.setItem("user", JSON.stringify(userToStore));
      localStorage.setItem("token", data.token); 
      
      setUser(userToStore);

      // ניווט לדף הבית
      navigate(`/users/${data.user.id}/home`);

    } catch (err) {
      console.error("Registration Error Details:", err);
      // הצגת השגיאה מהשרת (כמו "אימייל כבר קיים") או שגיאה כללית
      setError(err.error || err.message || "אירעה שגיאה בתהליך ההרשמה");
    }
};
  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email" 
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>

        <p className="switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}