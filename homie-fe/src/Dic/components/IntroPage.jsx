import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/introPage.css';

const IntroPage = () => {
  const chatWindowRef = useRef(null);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);
  const navigate = useNavigate();

  const botTitle = '자취봇';

  // API 호출 함수 - GPT
  const fetchBotResponse = async (userMessage) => {
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: userMessage }],
        }),
      });

      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        return { text: 'GPT 응답을 받을 수 없습니다.', isUser: false };
      }
      return { text: data.choices[0].message.content, isUser: false };
    } catch (error) {
      console.error('Error fetching GPT response:', error);
      return { text: '오류가 발생했습니다. 다시 시도해주세요.', isUser: false };
    }
  };

  // 메시지 렌더링 함수
  const renderMessages = () => {
    return messages.map((msg, index) => (
      <div
        key={index}
        className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}
      >
        {msg.text}
      </div>
    ));
  };

  // 메시지 전송 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 사용자 메시지 추가
    const userMessage = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // GPT 응답 추가
    const botResponse = await fetchBotResponse(input);
    setMessages((prevMessages) => [...prevMessages, botResponse]);

    // 스크롤을 맨 아래로 이동
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // 스크롤을 맨 아래로 유지
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="intro-container">
      {/* 메인 섹션 */}
      <div className="main-section">
        <div className="main-content">
          <img src="/house.png" alt="집 이미지" className="house-image" />
        </div>
        <div className="side-buttons">
          <img
            src="/checkButton.png"
            alt="자취 체크리스트"
            className="side-button"
            onClick={() => navigate('/checklist')}
          />
          <img
            src="/itemButton.png"
            alt="자취팁 추천"
            className="side-button"
            onClick={() => navigate('/tips')}
          />
        </div>
      </div>

      {/* 채팅 섹션 */}
      <div className="chat-section">
        <div className="chat-top-bar">
          <span className="bot-title">{botTitle}</span>
        </div>
        <div className="chat-container">
          <div className="message-list" ref={chatWindowRef}>
            {renderMessages()}
          </div>
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
