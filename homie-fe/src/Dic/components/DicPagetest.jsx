import React, { useState } from 'react';
import styles from '../css/DicPagetest.module.css';

const DicPagetest = () => {
    const [currentModal, setCurrentModal] = useState(0);
  
  const modals = [
    { id: 1, content: "모달 1의 내용입니다" },
    { id: 2, content: "모달 2의 내용입니다" },
    { id: 3, content: "모달 3의 내용입니다" },
    { id: 4, content: "모달 4의 내용입니다" },
    { id: 5, content: "모달 5의 내용입니다" },
  ];

  const isFirstModal = currentModal === 0;
  const isLastModal = currentModal === modals.length - 1;

  const handlePrevClick = () => {
    if (!isFirstModal) {
      setCurrentModal(prev => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (!isLastModal) {
      setCurrentModal(prev => prev + 1);
    }
  };

  const getModalStyle = (index) => {
    const position = index - currentModal;
    let transform = `translateX(${position * 100}%)`;
    
    if (Math.abs(position) > 1) {
      transform += ' scale(0)';
    } else if (position !== 0) {
      transform = `translateX(${position > 0 ? 85 : -85}%)`;
    }
    
    return {
      transform,
      opacity: Math.abs(position) > 1 ? 0 : 1
    };
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalsWrapper}>
        {modals.map((modal, index) => (
          <div
            key={modal.id}
            className={`${styles.modal} ${
              index === currentModal ? styles.active : styles.nonActive
            }`}
            style={getModalStyle(index)}
          >
            <div className={styles.modalContent}>
              <h2>모달 {modal.id}</h2>
              <p>{modal.content}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.navigationButtons}>
        <button 
          className={`${styles.navButton} ${isFirstModal ? styles.disabled : ''}`}
          onClick={handlePrevClick}
          disabled={isFirstModal}
        >
          ←
        </button>
        <button 
          className={`${styles.navButton} ${isLastModal ? styles.disabled : ''}`}
          onClick={handleNextClick}
          disabled={isLastModal}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default DicPagetest;