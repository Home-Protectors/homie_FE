import React, { useEffect, useRef } from 'react';
import '../css/chatbot.css';

const ChatBot = ({ messages, onSendMessage, isVisible }) => {
  const messagesEndRef = useRef(null);
  const chatContentRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessage = (message, index) => {
    return (
      <div key={index} className={`message-wrapper ${message.isUser ? 'user-message' : 'bot-message'}`}>
        {!message.isUser && (
          <div className="bot-profile">
            <img src="/robot.png" alt="Bot" className="bot-avatar" />
          </div>
        )}
        <div className={`message ${message.isUser ? 'user' : 'bot'}`}>
          {message.text}
        </div>
      </div>
    );
  };

  return (
    <div className={`chat-content ${isVisible ? 'visible' : ''}`} ref={chatContentRef}>
      <div className="messages-wrapper">
        <div className="messages-container">
          {messages.map((message, index) => renderMessage(message, index))}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;