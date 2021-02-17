import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./LoginScreen.css";

const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if ((email = "" || password === "")) {
      setTimeout(() => {
        setError("");
      }, 500);
      return setError("Please provide email and password.");
    }

    try {
      const { data } = await axios.post(
        "/login",
        {
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

  <div className="login">
    <form onSubmit={registerHandler} className="login__form">
      <h1 className="login__title">Login</h1>
      {error && <span className="error-message">{error}</span>}
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

      <button type="submit" className="btn btn-primary">
        Login
      </button>
      <span className="login__subtext">
        Do not have an account? <Link to="/register">Register</Link>
      </span>
    </form>
  </div>;
};

export default LoginScreen;
