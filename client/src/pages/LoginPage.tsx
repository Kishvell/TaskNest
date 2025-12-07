import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (!validateEmail(email)) return setLoginError("Enter a valid email.");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setLoginError("Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage("");
    setResetError("");
    if (!validateEmail(resetEmail)) return setResetError("Enter a valid email.");

    setResetLoading(true);
    try {
      await resetPassword(resetEmail);
      setResetMessage("Check your email for reset instructions.");
    } catch {
      setResetError("Failed to send reset email. Try again later.");
    } finally {
      setResetLoading(false);
    }
  };

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  return (
    <div className="login-page">
      {!showReset ? (
        <form onSubmit={handleLogin} className="login-form">
          <h1>Login</h1>

          {loginError && <div className="error-message">{loginError}</div>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="forgot-password">
            <button type="button" onClick={() => setShowReset(true)}>
              Forgot password?
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleReset} className="reset-form">
          <h1>Reset Password</h1>

          {resetMessage && <div className="success-message">{resetMessage}</div>}
          {resetError && <div className="error-message">{resetError}</div>}

          <label htmlFor="reset-email">Email</label>
          <input
            id="reset-email"
            type="email"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={resetLoading}>
            {resetLoading ? "Sending..." : "Send Reset Email"}
          </button>

          <button type="button" className="cancel-btn" onClick={() => setShowReset(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
