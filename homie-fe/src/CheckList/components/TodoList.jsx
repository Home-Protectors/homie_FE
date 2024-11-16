import React, { useState, useEffect } from 'react';
import '../css/todoList.css';

const TodoList = ({ listId, viewMode }) => {
  const [todos, setTodos] = useState([]); // 초기 todos 상태
  const [newTodo, setNewTodo] = useState(''); // 새로운 todo 입력값

  useEffect(() => {
    // 각 리스트별 초기 데이터 가져오기
    const initialTodos = {
      1: [
        { id: 1, text: '월세', completed: false },
        { id: 2, text: '가스비', completed: false },
        { id: 3, text: '전기세', completed: false },
        { id: 4, text: '수도세', completed: false },
        { id: 5, text: '인터넷 요금', completed: false },
      ],
      2: [
        { id: 6, text: '침대', completed: true },
        { id: 7, text: '냉장고', completed: false },
        { id: 8, text: '책상', completed: false },
      ],
      3: [
        { id: 9, text: '조명', completed: false },
        { id: 10, text: '커튼', completed: true },
      ],
    };

    // 선택된 리스트 ID에 맞는 초기 데이터 설정
    setTodos(initialTodos[listId] || []);
  }, [listId]);

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
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo('');
    }
  };

  // todo 삭제
  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h2 className="todo-title">
          {listId === 1
            ? '관리비 Check'
            : listId === 2
            ? '자취 필수품'
            : '인테리어 쇼핑'}
        </h2>
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