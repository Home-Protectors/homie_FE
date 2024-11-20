import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/introPage.css';

const IntroPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [message, setMessage] = useState('');
  const [opacity, setOpacity] = useState(1);
  const [slideX, setSlideX] = useState(0);
  const [visibleLetters, setVisibleLetters] = useState(0);
  
  const botTitle = "자취봇";
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 2000);

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const chatSection = document.querySelector('.chat-section');
      const chatSectionTop = chatSection?.offsetTop ?? 0;
      
      // 메인 섹션 가로 슬라이드 계산
      const slideStart = 0;
      const slideEnd = chatSectionTop;
      const slideProgress = Math.min(scrollPosition / slideEnd, 1);
      const slideDistance = 100; // 슬라이드할 거리 (vw 단위)
      setSlideX(slideProgress * slideDistance);

      // 스크롤 진행도 계산 (0 ~ 1)
      const progress = Math.min(Math.max(scrollPosition / chatSectionTop, 0), 1);
      
      // 보여줄 글자 수 계산 (0 ~ 3)
      const lettersToShow = Math.floor(progress * botTitle.length);
      setVisibleLetters(lettersToShow);
      
      // 타이틀 페이드아웃 계산
      const fadeStart = chatSectionTop * 0.5;
      const fadeEnd = chatSectionTop;
      
      if (scrollPosition <= fadeStart) {
        setOpacity(1);
      } else if (scrollPosition >= fadeEnd) {
        setOpacity(0);
      } else {
        const fadeLength = fadeEnd - fadeStart;
        const fadeProgress = (scrollPosition - fadeStart) / fadeLength;
        setOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      console.log('Message submitted:', message);
      setMessage('');
    }
  };

  return (
    <div className="intro-container">
      {/* 메인 섹션 */}
      <div 
        className="main-section"
        style={{
          transform: `translateX(${slideX}vw)`,
          transition: 'transform 0.1s ease-out'
        }}
      >

        <div className={`main-content ${isAnimated ? 'slide-left' : ''}`}>
          <img src="/house.png" alt="집 이미지" className="house-image" />
        </div>
        <div className={`side-buttons ${isAnimated ? 'fade-in' : ''}`}>
          <img src="/checkButton.png" alt="자취 체크리스트" className="side-button" />
          <img src="/itemButton.png" alt="자취팁 추천" className="side-button" />
        </div>
      </div>

      {/* 채팅 섹션 */}
      <div className="chat-section">
      <div className="chat-top-bar">
        <span className="bot-title">
          {[...botTitle].map((char, index) => (
            <span 
              key={index}
              className={`title-char ${index < visibleLetters ? 'visible' : ''}`}
            >
              {char}
            </span>
          ))}
        </span>
      </div>
        <div className="chat-container">
        <h1 
            className="chat-title"
            style={{ 
              opacity: opacity,
              visibility: opacity === 0 ? 'hidden' : 'visible',
              transition: 'opacity 0.01s ease, visibility 0.01s ease'
            }}
          >
            Do you want to start the chat?
        </h1>
          <form onSubmit={handleSubmit} className="chat-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="얼마든지 물어보세요!"
              className="chat-input"
            />
            <button type="submit" className="scroll-button">
              <img src="/scrollTop.png" alt="Submit" className="scroll-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;