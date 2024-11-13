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

      {/* 하단 버튼 섹션 */}
      <div className="bottom-section">
        <div className="bottom-frame">
          <div className="button-grid">
            <div className="grid-row">
              <button 
                className="grid-button"
                onClick={() => navigate('/detailInfo/expense-plan')}>
                  자취 비용 계획
              </button>
              <button 
                className="grid-button" 
                onClick={() => navigate('/detailInfo/house-viewing')}>
                  집 보러 가기
              </button>
              <button 
                className="grid-button" 
                onClick={() => navigate('/detailInfo/house-types')}>
                  주택의 종류와 개념
              </button>
            </div>
            <div className="grid-row">
              <button 
                className="grid-button" 
                onClick={() => navigate('/detailInfo/pre-contract')}>
                  계약 전 확인하기
              </button>
              <button 
                className="grid-button" 
                onClick={() => navigate('/detailInfo/contract')}>
                  계약하기
              </button>
              <button 
                className="grid-button" 
                onClick={() => navigate('/detailInfo/jeonse-info')}>
                  전세에 대한 모든 것
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;