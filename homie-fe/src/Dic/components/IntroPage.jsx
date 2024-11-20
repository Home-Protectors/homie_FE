// src/Dic/components/IntroPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/introPage.css';

const IntroPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="intro-container">
      {/* 메인 섹션 */}
      <div className="main-section">
        <div className={`main-content ${isAnimated ? 'slide-left' : ''}`}>
          <img src="/house.png" alt="집 이미지" className="house-image" />
        </div>
        <div className={`side-buttons ${isAnimated ? 'fade-in' : ''}`}>
          <img src="/checkButton.png" alt="자취 체크리스트" className="side-button" />
          <img src="/itemButton.png" alt="자취팁 추천" className="side-button" />
        </div>
      </div>

    
    </div>
  );
};

export default IntroPage;