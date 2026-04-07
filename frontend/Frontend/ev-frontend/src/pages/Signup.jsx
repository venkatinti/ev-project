import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!user.name || !user.email || !user.password) {
      setError("Please fill in all fields");
      return;
    }

    if (user.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      const res = await signup(user);

      if (res.data) {
        setSuccess("Account created successfully! Redirecting...");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError("Failed to create account");
      }
    } catch (error) {
      if (error.response?.data?.includes("email")) {
        setError("Email already exists");
      } else {
        setError("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">

      <form className="signup-card" onSubmit={handleSubmit}>

        {/* Icon */}
        <span className="signup-icon">🚗</span>

        {/* Title */}
        <h2>Create Account</h2>
        <p className="signup-subtitle">Join the EV Analytics platform</p>

        {/* Error Message */}
        {error && (
          <div className="signup-error">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="signup-success">
            <span>✅</span>
            {success}
          </div>
        )}

        {/* Name Input */}
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            name="name"
            type="text"
            placeholder="Enter your name"
            value={user.name}
            onChange={handleChange}
            required
            disabled={isLoading}
          />
        </div>

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
            placeholder="Create a password (min 6 chars)"
            value={user.password}
            onChange={handleChange}
            required
            minLength={6}
            disabled={isLoading}
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className={isLoading ? "loading" : ""}>
          {isLoading ? "Creating account" : "Create Account"}
        </button>

        {/* Divider */}
        <div className="signup-divider">
          <div className="line"></div>
          <span>or</span>
          <div className="line"></div>
        </div>

        {/* Login Link */}
        <p onClick={() => navigate("/")}>
          Already have an account? <span>Sign In</span>
        </p>

      </form>

    </div>
  );
}

export default Signup;