import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Hooks/UserContext.jsx";
import Info from "./Info.jsx";
import { useState } from "react";
import "../../CSS/Header.css";
export default function Header() {

  const { user, setUser } = useContext(UserContext);
  const [showInfo, setShowInfo] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser({ id: null, name: "" });
    navigate("/login");
  };
  return (
    <>
      <header className="app-header">
        <div className="header-left">
          <nav className="nav-links">
            <NavLink to={`/users/${user.id}/home`}>Home</NavLink>
            <NavLink to={`/users/${user.id}/home/todos`}>Todos</NavLink>
            <NavLink to={`/users/${user.id}/home/posts`}>Posts</NavLink>
            <button className="info-btn" onClick={() => setShowInfo(!showInfo)}>
              Info
            </button>
          </nav>
        </div>
        <div className="header-right">
          <span className="user-name">Hello {user.name}</span>
          {showInfo && <Info onClose={() => setShowInfo(false)} />}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
    </>
  );
}