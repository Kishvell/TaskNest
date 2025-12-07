import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">TaskNest</div>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`navbar-links ${open ? "open" : ""}`}>
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>
            <Link to="/pomodoro" className="nav-link">
              Pomodoro
            </Link>

            <button onClick={logout} className="nav-button logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-button signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
