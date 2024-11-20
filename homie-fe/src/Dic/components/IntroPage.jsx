import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/introPage.css';

const IntroPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [message, setMessage] = useState('');
  const [opacity, setOpacity] = useState(1);
  const [slideX, setSlideX] = useState(0);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);

  const navigate = useNavigate();

  const welcomeText1 = "자취에 대한 모든 것을 물어보세요!";
  const welcomeText2 = "저희 자취봇이 모든 것을 알려드립니다!";
  const botTitle = "자취봇";

  const renderSecondLine = (text) => {
    const parts = text.split('자취봇');
    if (parts.length === 1) return text;
    
    //타이핑 글자가 자취봇이면 색상효과
    if (text.includes('자취봇')) {
      return (
        <>
          {parts[0]}
          <span className="highlight">자취봇</span>
          {parts[1]}
        </>
      );
    }
    return text;
  };

  const startTypingAnimation = useCallback(() => {
    let text1Index = 0;
    let text2Index = 0;
    let isFirstLineComplete = false;

    const typeText = () => {
      if (!isFirstLineComplete) {
        if (text1Index < welcomeText1.length) {
          setTypedText1(welcomeText1.substring(0, text1Index + 1));
          text1Index++;
          setTimeout(typeText, 50);
        } else {
          isFirstLineComplete = true;
          setTimeout(typeText, 300);
        }
      } else {
        if (text2Index < welcomeText2.length) {
          setTypedText2(welcomeText2.substring(0, text2Index + 1));
          text2Index++;
          setTimeout(typeText, 50);
        }
      }
    };

    // 타이핑 시작
    typeText();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 2000);

    let lastScrollY = window.scrollY;

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollPosition = window.scrollY;
      const chatSection = document.querySelector('.chat-section');
      const chatSectionTop = chatSection?.offsetTop ?? 0;

      //스크롤이 끝까지 내려갔는지
      const isNowFullyScrolled = scrollPosition >= chatSectionTop;
      
      if (isNowFullyScrolled && !isFullyScrolled) {
        setIsFullyScrolled(true);
        startTypingAnimation();
      }

      if (currentScrollY >= chatSectionTop && lastScrollY < currentScrollY) {
        setMessageVisible(1);
        if (typedText1 === '') {
          startTypingAnimation();
        }
      }
      // 스크롤을 조금이라도 올릴 때
      else if (currentScrollY < lastScrollY) {
        setMessageVisible(0);
      }
      
      lastScrollY = currentScrollY;
      
      // 메인 섹션 가로 슬라이드 계산
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
  }, [isFullyScrolled, startTypingAnimation, typedText1]);

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
          <img src="/checkButton.png" alt="자취 체크리스트" className="side-button" 
           onClick={() => navigate('/checklist')}
          />
          <img src="/itemButton.png" alt="자취팁 추천" className="side-button" 
           onClick={() => navigate('/tips')}
          />
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
          <div
            className="welcome-message"
            style={{ opacity: messageVisible, transition: 'opacity 0.1s ease' }}
          >
            <p className="welcome-line">{typedText1}</p>
            <p className="welcome-line">{renderSecondLine(typedText2)}</p>
         </div>
          <form onSubmit={handleSubmit} className="chat-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="얼마든지 물어보세요!"
              className="chat-input"
            />
            <button type="submit" className="scroll-button">
              <img src="/button.png" alt="Submit" className="scroll-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;