import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from AuthContext

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || {};
    const user = existingUsers[email];

    if (!user) {
      setError("등록되지 않은 이메일입니다.");
      return;
    }

    if (user.password !== password) {
      setError("비밀번호가 올바르지 않습니다.");
      return;
    }

    localStorage.setItem("loggedInUserEmail", email); // Save logged-in user's email
    login(); // Set authentication state to true
    alert(`${user.name}님, 환영합니다!`);
    navigate("/"); // Redirect to home
  };

  return (
    <div className="login-container">
      <div className="login-header">
        {/* 로고 이미지 */}
        <img
          src={require("../assets/logo.png")} // 로고 이미지 경로 (프로젝트 내)
          alt="자취생 로고"
          className="login-logo"
        />
        <h1 className="login-title">자취생을 위한 </h1>
        <p className="login-subtitle">자취 생활을 더 편리하고 즐겁게!</p>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">아이디</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit" className="login-button">
          로그인
        </button>

        <button
          type="button"
          className="signup-button"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Login;