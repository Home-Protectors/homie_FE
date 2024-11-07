// src/Dic/components/IntroPage.jsx
import React, { useEffect, useState } from 'react';
import '../css/introPage.css';

const IntroPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);

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

      {/* 하단 버튼 섹션 */}
      <div className="bottom-section">
        <div className="bottom-frame">
          <div className="button-grid">
            <div className="grid-row">
              <button className="grid-button">자취 비용 계획</button>
              <button className="grid-button">집 보러 가기</button>
              <button className="grid-button">주택의 종류와 개념</button>
            </div>
            <div className="grid-row">
              <button className="grid-button">계약 전 확인하기</button>
              <button className="grid-button">계약하기</button>
              <button className="grid-button">전세에 대한 모든 것</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;