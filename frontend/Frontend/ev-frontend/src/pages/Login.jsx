import { useState } from "react";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!user.email || !user.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const res = await login(user);

      if (res.data) {
        // Store user info (optional)
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">

      <form className="login-card" onSubmit={handleSubmit}>

        {/* Icon */}
        <span className="login-icon">⚡</span>

        {/* Title */}
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to access EV Dashboard</p>

        {/* Error Message */}
        {error && (
          <div className="login-error">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {/* Email Input */}
        <div className="input-group">
          <span className="input-icon">✉️</span>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <span className="input-icon">🔒</span>
          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={isLoading ? "loading" : ""}>
          {isLoading ? "Signing in" : "Sign In"}
        </button>

        {/* Divider */}
        <div className="login-divider">
          <div className="line"></div>
          <span>or</span>
          <div className="line"></div>
        </div>

        {/* Signup Link */}
        <p onClick={() => navigate("/signup")}>
          Don't have an account? <span>Sign Up</span>
        </p>

      </form>

    </div>
  );
}

export default Login;