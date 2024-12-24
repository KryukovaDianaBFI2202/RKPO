import React from 'react';

function TodoItem({ todo, toggleTodo, removeTodo }) {
    return (
        <div class = "ToDo-list">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button onClick={() => removeTodo(todo.id)}>Удалить</button> {}
        </div>
    );
}

export default TodoItem;