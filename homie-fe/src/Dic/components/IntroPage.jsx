import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBot from './ChatBot'; 
import '../css/introPage.css';

const IntroPage = () => {
  const chatWindowRef = useRef(null);
  const [isAnimated, setIsAnimated] = useState(false);
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState(""); //메시지 입력
  const [opacity, setOpacity] = useState(1);
  const [slideX, setSlideX] = useState(0);
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [isFullyScrolled, setIsFullyScrolled] = useState(false);
  const [typedText1, setTypedText1] = useState('');
  const [typedText2, setTypedText2] = useState('');
  const [messageVisible, setMessageVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatContentVisible, setChatContentVisible] = useState(false);
  

  const navigate = useNavigate();

  const CLAUDE_API_KEY = process.env.REACT_APP_CLAUDE_API_KEY;
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; // CORS 프록시 서버

  // sendToClaudeAPI 함수 수정
  const sendToClaudeAPI = async (userMessage) => {
    const url = `${CORS_PROXY}https://api.anthropic.com/v1/messages`;
    
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          'x-api-key': CLAUDE_API_KEY
        },
        body: JSON.stringify({
          model: "claude-3-opus-20240229",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: userMessage
          }],
          system: `
            당신은 전세사기 위험을 전문적으로 분석하는 AI 전문가입니다. 
            법률, 부동산, 금융 분야의 깊은 지식을 가진 전문가로서 답변해주세요.
          `
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result = await response.json();
      return result.content[0].text;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      return '죄송합니다. 일시적인 오류가 발생했습니다.';
    }
  };



  const welcomeText1 = "자취에 대한 모든 것을 물어보세요!";
  const welcomeText2 = "저희 자취봇이 모든 것을 알려드립니다!";
  const botTitle = "자취봇";

  
//메세지 추가하고 api호출
  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { role: "user", content: input };
    setMessage([...message, userMessage]); // 유저 메시지 추가

    setInput(""); // 입력 초기화
    // API 호출
    setTimeout(async () => {
    const botMessage = await fetchBotResponse(input);
    setMessage((prevMessages) => [...prevMessages, botMessage]); // 챗봇 응답 추가
  }, 1000); // 1초 간격

  };

    //API 호출 함수 - gpt
    const fetchBotResponse = async (userMessage) => {
      try {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo", // 모델 이름
            messages: [...message, { role: "user", content: userMessage }],
          }),
        });
    
        const data = await response.json();
        if (data.error) {
          console.error("API Error Response:", data.error);
          return { role: "bot", content: `오류 발생: ${data.error.message}` };
        }
        // 응답 검증
        if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
          //console.error("Unexpected API response structure:", data);
          return { role: "bot", content: "API 응답이 올바르지 않습니다." };
        }

        // 정상적인 응답 처리
        return { role: "bot", content: data.choices[0].message.content };
      } catch (error) {
        console.error("Error fetching chatbot response:", error);
        return { role: "bot", content: "오류가 발생했습니다. 다시 시도해주세요." };
      }
};

// const fetchBotResponse = async (userMessage) => {
//   try {
//     const response = await fetch("http://localhost:5000/api/chatbot", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message: userMessage }),
//     });

//     const data = await response.json();
//     if (data.error) {
//       return { role: "bot", content: "오류가 발생했습니다." };
//     }

//     return { role: "bot", content: data.response };
//   } catch (error) {
//     console.error("Error fetching chatbot response:", error);
//     return { role: "bot", content: "서버와의 통신에 실패했습니다." };
//   }
// };
//   const renderSecondLine = (text) => {
//     const parts = text.split('자취봇');
//     if (parts.length === 1) return text;
    
//     if (text.includes('자취봇')) {
//       return (
//         <>
//           {parts[0]}
//           <span className="highlight">자취봇</span>
//           {parts[1]}
//         </>
//       );
//     }
//     return text;
//   };

  
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

    typeText();
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [message]);

  useEffect(() => {
    if (isFullyScrolled) {
      startTypingAnimation();
    }
  }, [isFullyScrolled, startTypingAnimation]);

  //채팅 메세지 표시
  //useEffect(() => {
  //  const chatWindow = document.getElementById("chat-window");
  //  chatWindow.scrollTop = chatWindow.scrollHeight;
  //}, [message]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 2000);

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const chatSection = document.querySelector('.chat-section');
      const chatSectionTop = chatSection?.offsetTop ?? 0;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // 스크롤이 정확히 바닥에 닿았는지 확인
      const isAtBottom = Math.abs((currentScrollY + windowHeight) - documentHeight) < 1;
      
      const mainSectionHeight = windowHeight * 0.8;

      if (scrollTop >= mainSectionHeight * 0.5) {
        setChatContentVisible(true);
      } else {
        setChatContentVisible(false);
      }

      // 스크롤이 정확히 바닥에 닿았을 때만 애니메이션 시작
      if (isAtBottom && !isFullyScrolled) {
        setIsFullyScrolled(true);
        startTypingAnimation();
      }

      // 채팅 섹션이 viewport에 있고 스크롤이 바닥에 닿았을 때만 메시지 표시
      const slideEnd = chatSectionTop;
      const slideProgress = Math.min(currentScrollY / slideEnd, 1);
      const slideDistance = 100;
      setSlideX(slideProgress * slideDistance);

      if (isAtBottom) {
        // 스크롤이 바닥에 닿으면 모든 글자 표시
        setVisibleLetters(botTitle.length);
        setMessageVisible(1);
        if (typedText1 === '') {
          startTypingAnimation();
        }
      } else {
        // 스크롤 진행도에 따른 글자 표시 계산
        const progress = Math.min(Math.max(currentScrollY / chatSectionTop, 0), 1);
        const lettersToShow = Math.floor(progress * (botTitle.length - 1)); // 마지막 글자는 바닥에서 표시
        setVisibleLetters(lettersToShow);
        setMessageVisible(0);
      }
      
      // 타이틀 페이드아웃 계산
      const fadeStart = chatSectionTop * 0.5;
      const fadeEnd = chatSectionTop;
      
      if (currentScrollY <= fadeStart) {
        setOpacity(1);
      } else if (currentScrollY >= fadeEnd) {
        setOpacity(0);
      } else {
        const fadeLength = fadeEnd - fadeStart;
        const fadeProgress = (currentScrollY - fadeStart) / fadeLength;
        setOpacity(1 - fadeProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll); // 창 크기 변경 시에도 체크
    
    // 초기 로드 시 스크롤 위치 체크
    handleScroll();
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isFullyScrolled, startTypingAnimation, typedText1]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message) {
      // 채팅이 시작되지 않았다면 시작으로 표시
      if (!chatStarted) {
        setChatStarted(true);
        setMessageVisible(false); // 웰컴 메시지 숨기기
      }

      // 사용자 메시지 추가
      const userMessage = {
        text: message,
        isUser: true
      };
      setMessages(prev => [...prev, userMessage]);
      
      // 봇 응답 추가
      /*
      const botMessage = {
        text: "네 알겠습니다.",
        isUser: false
      };
      */
      const claudeResponse = await sendToClaudeAPI(message);
      const botMessage = {
        text: claudeResponse,
        isUser: false
      };

      setMessages(prev => [...prev, botMessage]);

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
            style={{
              '--char-index': index // CSS 변수로 인덱스 전달
            }}
          >
              {char}
            </span>
          ))}
        </span>
      </div>
        <div className="chat-container">
        {!chatStarted && (
            <>
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
                
              </div>
            </>
          )}
          <ChatBot 
            messages={messages}
            onSendMessage={handleSubmit}
            isVisible={chatContentVisible}
          />

          <form onSubmit={handleSubmit} className="chat-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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