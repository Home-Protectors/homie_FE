import React, { useState } from 'react';
import '../css/newCheckList.css';

const NewCheckList = ({ onSave }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave(title);
      setTitle('');
    }
  };

  return (
    <div className="new-checklist">
      <h2>새로운 체크리스트</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="체크리스트 제목"
        />
        <button type="submit">저장</button>
      </form>
    </div>
   );
};

export default NewCheckList;