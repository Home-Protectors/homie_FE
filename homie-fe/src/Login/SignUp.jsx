// SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignUp = (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError("이름, 아이디, 비밀번호는 필수 입력 사항입니다.");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || {};

        if (existingUsers[email]) {
            setError("이미 사용 중인 이메일입니다.");
            return;
        }

        const newUser = {
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            profilePic: profilePic || "",
        };

        existingUsers[email] = newUser;
        localStorage.setItem("users", JSON.stringify(existingUsers));

        alert(`${name}님, 회원가입이 완료되었습니다!`);
        navigate("/login");
    };

    return (
        <div className="auth-signup-container">
            <div className="auth-signup-header">
                <img
                    src={require("../assets/logo.png")}
                    alt="로고"
                    className="auth-signup-logo"
                />
                <h1>회원가입</h1>
                <p>회원가입을 완료하고 편리한 자취 생활을 시작하세요!</p>
            </div>
            <form className="auth-signup-form" onSubmit={handleSignUp}>
                {error && <p className="auth-signup-error">{error}</p>}

                <div className="auth-signup-form-group">
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="이름을 입력하세요"
                        value={name}
                        onChange={handleNameChange}
                    />
                </div>

                <div className="auth-signup-form-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>

                <div className="auth-signup-form-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                <div className="auth-signup-form-group">
                    <label htmlFor="photo-upload">프로필 사진 (선택)</label>
                    <input 
                        type="file" 
                        id="photo-upload" 
                        onChange={handlePhotoUpload}
                    />
                </div>

                <button type="submit" className="auth-signup-submit">
                    회원가입
                </button>
            </form>
        </div>
    );
};

export default SignUp;