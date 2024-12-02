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
        setProfilePic(reader.result); // Store the Base64 encoded image string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();

    // Validation to ensure required fields are filled
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("이름, 아이디, 비밀번호는 필수 입력 사항입니다.");
      return;
    }

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || {};

    // Check for duplicate email
    if (existingUsers[email]) {
      setError("이미 사용 중인 이메일입니다.");
      return;
    }

    // Create a new user object
    const newUser = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
      profilePic: profilePic || "", // Profile picture is optional
    };

    // Save the new user to localStorage
    existingUsers[email] = newUser;
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert(`${name}님, 회원가입이 완료되었습니다!`);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img
          src={require("../assets/logo.png")}
          alt="로고"
          className="signup-logo"
        />
        <h1>자취생을 위한 웹</h1>
        <p>회원가입을 완료하고 편리한 자취 생활을 시작하세요!</p>
      </div>
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>회원가입</h2>
        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={handleNameChange}
          />
        </div>

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

        <div className="form-group">
          <label htmlFor="photo-upload">프로필 사진 (선택)</label>
          <input type="file" id="photo-upload" onChange={handlePhotoUpload} />
        </div>

        <button type="submit" className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;