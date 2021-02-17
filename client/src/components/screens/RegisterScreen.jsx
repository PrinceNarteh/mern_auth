import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 500);
      return setError("Passwords do not match.");
    }

    try {
      const { data } = await axios.post(
        "/register",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);
      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 500);
    }
  };

  <div className="register-screen">
    <form onSubmit={registerHandler} className="register-screen__form">
      <h1 className="register-screen__title">Register</h1>
      {error && <span className="error-message">{error}</span>}
      <div className="form-group">
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Register
      </button>
      <span className="register-screen__subtext">
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </form>
  </div>;
};

export default RegisterScreen;
