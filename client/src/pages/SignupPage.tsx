import { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./LoginPage.css";

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(email), [email]);

  const passwordChecks = useMemo(() => ({
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }), [password]);

  const passwordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = password === confirm;

  const formValid = emailValid && passwordValid && passwordsMatch && name.length > 0 && agree;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formValid) {
      setError("Please complete all required fields correctly.");
      return;
    }

    try {
      setLoading(true);
      await signup(name, email, password);
      navigate("/login");
    } catch {
      setError("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="signup-page">
      <form onSubmit={submit} className="signup-form">
        <h1>Create Account</h1>

        {error && <p className="form-error">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={!emailValid && email.length > 0 ? "invalid" : ""}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={!passwordValid && password.length > 0 ? "invalid" : ""}
        />

        <div className="password-rules">
          <p className={passwordChecks.length ? "ok" : ""}>• At least 8 characters</p>
          <p className={passwordChecks.upper ? "ok" : ""}>• Uppercase letter</p>
          <p className={passwordChecks.lower ? "ok" : ""}>• Lowercase letter</p>
          <p className={passwordChecks.number ? "ok" : ""}>• Number</p>
          <p className={passwordChecks.symbol ? "ok" : ""}>• Special character</p>
        </div>

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={!passwordsMatch && confirm.length > 0 ? "invalid" : ""}
        />

        <label className="checkbox-line">
          <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)}/>
          I agree to the Terms & Privacy Policy
        </label>

        <button type="submit" disabled={!formValid || loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
