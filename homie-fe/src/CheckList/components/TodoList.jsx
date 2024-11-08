// src/CheckList/components/TodoList.jsx
import React, { useState } from 'react';
import '../css/todoList.css';

const TodoList = ({ listId }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: '월세', completed: false },
    { id: 2, text: '가스비', completed: false },
    { id: 3, text: '전기세', completed: false },
    { id: 4, text: '수도세', completed: false },
    { id: 5, text: '인터넷 요금', completed: false }
  ]);

  const [newTodo, setNewTodo] = useState('');
  const activeTodoCount = todos.filter(todo => !todo.completed).length;

  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && newTodo.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2 className="todo-title">관리비 Check</h2>
        <span className="todo-count">{activeTodoCount}</span>
      </div>
      
      <div className="todo-list">
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <label className="todo-label">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <span className="checkmark"></span>
              <span className="todo-text">{todo.text}</span>
            </label>
          </div>
        ))}
        
        <div className="add-todo">
          <input
            type="text"
            placeholder="새로운 항목 추가"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleAddTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;