import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import { useNavigate } from 'react-router-dom';

function TodoPage() {
  const [todos, setTodos] = useState([
    { id: 1, title: 'Проснуться', completed: false },
    { id: 2, title: 'Создать список дел', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo) return;

    const newTodoItem = {
      id: Date.now(),
      title: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="todo-container">
        <h1>Мой список дел!</h1>
        <form onSubmit={addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Новая задача..."
          />
          <button type="submit">Добавить</button>
          <div className="buttons">
            <button type="button" onClick={() => setFilter('all')}>Все</button>
            <button type="button" onClick={() => setFilter('completed')}>Завершенные</button>
            <button type="button" onClick={() => setFilter('incomplete')}>Выполняемые</button>
          </div>
        </form>
        <div className="container">
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} />
        </div>
        <button onClick={() => navigate('/dnd')}>Перейти к странице с DnD</button>
      </div>
    </div>
  );
}

export default TodoPage;