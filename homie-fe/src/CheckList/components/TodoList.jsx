import React, { useState } from 'react';
import '../css/todoList.css';

const TodoList = ({ listId, viewMode, listTitle, todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState(''); // 새로운 todo 입력값

  // 완료되지 않은 todo 개수 계산
  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  // 현재 viewMode에 따라 todos 필터링
  const filteredTodos = todos.filter((todo) => {
    if (viewMode === 'all') return true;
    if (viewMode === 'completed') return todo.completed;
    return false;
  });

  // todo 상태 토글
  const handleToggle = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 새로운 todo 추가
  const handleAddTodo = (e) => {
    if (e.key === 'Enter' && newTodo.trim() !== '') {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo,
        completed: false,
      };
      setTodos([...todos, newTodoItem]); // todos에 새로운 항목 추가
      setNewTodo(''); // 입력값 초기화
    }
  };

  // todo 삭제
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2 className="todo-title">{listTitle}</h2> {/* 동적으로 제목 표시 */}
        <span className="todo-count">{activeTodoCount}</span>
      </div>

      <div className="todo-list">
        {filteredTodos.map((todo) => (
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
            <button
              className="delete-button"
              onClick={() => handleDelete(todo.id)}
              aria-label="삭제"
            >
              ×
            </button>
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