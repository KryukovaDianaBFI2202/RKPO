import React from 'react';

function TodoList({ todos, toggleTodo, removeTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.title}
          </span>
          <button onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? 'Сделано' : 'Не сделано'}
          </button>
          <button onClick={() => removeTodo(todo.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;