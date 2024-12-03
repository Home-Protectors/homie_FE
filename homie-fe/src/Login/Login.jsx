// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

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

        localStorage.setItem("loggedInUserEmail", email);
        login();
        alert(`${user.name}님, 환영합니다!`);
        navigate("/");
    };

    return (
        <div className="auth-login-container">
            <div className="auth-login-header">
                <img
                    src={require("../assets/logo.png")}
                    alt="자취생 로고"
                    className="auth-login-logo"
                />
                <h1 className="auth-login-title">자취생을 위한 자취 백과사전</h1>
                <p className="auth-login-subtitle">자취 생활을 더 편리하고 즐겁게!</p>
            </div>
            <form className="auth-login-form" onSubmit={handleLogin}>
                {error && <p className="auth-error-message">{error}</p>}

                <div className="auth-login-form-group">
                    <label htmlFor="email">아이디</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="auth-login-form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="auth-button-container">
                    <button type="submit" className="auth-login-button">로그인</button>
                    <button 
                        type="button" 
                        className="auth-signup-button" 
                        onClick={() => navigate("/signup")}
                    >
                        회원가입
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;