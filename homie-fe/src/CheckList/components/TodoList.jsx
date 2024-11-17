import React, { useState, useEffect } from 'react';
import '../css/todoList.css';

const TodoList = ({ listId, viewMode, listTitle }) => {
  const [todos, setTodos] = useState([]); // 초기 todos 상태
  const [newTodo, setNewTodo] = useState(''); // 새로운 todo 입력값

  // 로컬 스토리지에서 특정 리스트의 항목 가져오기
  const getInitialTodos = () => {
    const storedTodos = localStorage.getItem(`todos_${listId}`);
    return storedTodos ? JSON.parse(storedTodos) : []; // 저장된 항목이 없으면 빈 배열 반환
  };

  useEffect(() => {
    // 선택된 리스트 ID에 맞는 초기 데이터 설정
    setTodos(getInitialTodos());
  }, [listId]);

  useEffect(() => {
    // todos 상태가 변경될 때 로컬 스토리지에 저장
    localStorage.setItem(`todos_${listId}`, JSON.stringify(todos));
  }, [todos, listId]);

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