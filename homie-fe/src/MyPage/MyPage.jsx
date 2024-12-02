import React, { useState, useEffect } from "react";
import "./ProfileEdit.css";

const MyPage = () => {
  const initialNickname = "원준영";
  const initialProfilePic = "https://via.placeholder.com/150";

  const [nickname, setNickname] = useState(() => {
    return localStorage.getItem("nickname") || initialNickname;
  });
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem("profilePic") || initialProfilePic;
  });

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setProfilePic(base64Image); 
        localStorage.setItem("profilePic", base64Image); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("profilePic", profilePic);
    alert("변경사항이 저장되었습니다.");
  };

  const handleCancel = () => {
    alert("변경이 취소되었습니다.");
    setNickname(localStorage.getItem("nickname") || initialNickname);
    setProfilePic(localStorage.getItem("profilePic") || initialProfilePic);
  };

  const handleDelete = () => {
    setProfilePic(initialProfilePic); 
    localStorage.removeItem("profilePic"); 
    alert("프로필 사진이 초기화되었습니다.");
  };

  useEffect(() => {
    const savedNickname = localStorage.getItem("nickname");
    const savedProfilePic = localStorage.getItem("profilePic");
    if (savedNickname) setNickname(savedNickname);
    if (savedProfilePic) setProfilePic(savedProfilePic);
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>내 프로필</h2>
        <p>자취생들을 위한 공간입니다. 정보를 수정하고 자취 팁을 확인하세요!</p>
      </div>

      <div className="profile-edit-section">
        <div className="profile-photo-section">
          <img
            src={profilePic || initialProfilePic}
            alt="Profile"
            className="profile-photo"
          />
          <div className="photo-buttons">
            <label htmlFor="photo-upload" className="photo-upload-button">
              사진 변경
            </label>
            <input
              type="file"
              id="photo-upload"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
            <button className="photo-delete-button" onClick={handleDelete}>
              삭제
            </button>
          </div>
        </div>

        <div className="nickname-section">
          <label htmlFor="nickname">이름</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={handleNicknameChange}
            className="nickname-input"
          />
        </div>
      </div>

      <div className="profile-buttons">
        <button className="save-button" onClick={handleSave}>
          적용
        </button>
        <button className="cancel-button" onClick={handleCancel}>
          취소
        </button>
      </div>

      <div className="tips-section">
        <h3>자취 생활 꿀팁</h3>
        <ul>
          <li>
            <strong>식비 절약:</strong> 대량 구매 대신 소량 구입을 추천합니다.
          </li>
          <li>
            <strong>청소 팁:</strong> 주방과 화장실은 주 1회 청소하기!
          </li>
          <li>
            <strong>생활 필수품:</strong> 멀티탭, 공기청정기, 미니 냉장고.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MyPage;