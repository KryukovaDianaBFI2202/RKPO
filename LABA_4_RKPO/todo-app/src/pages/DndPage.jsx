import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import './DndPage.css'; // Импортируйте CSS-файл

function DndPage() {
  const [columns, setColumns] = useState({
    todo: {
      name: 'Надо сделать:',
      items: [
        { id: 1, content: 'Проснуться' },
        { id: 2, content: 'Создать список дел' },
      ],
    },
    inProgress: {
      name: 'Выполняемые:',
      items: [],
    },
    done: {
      name: 'Завершенные:',
      items: [],
    },
    blocked: {
      name: 'Удаленные:',
      items: [],
    },
  });

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (!newTask) return;
  
    const newTaskItem = {
      id: Date.now(),
      content: newTask,
    };
  
    setColumns((prevColumns) => ({
      ...prevColumns,
      todo: {
        ...prevColumns.todo,
        items: [...prevColumns.todo.items, newTaskItem],
      },
    }));
  
    setNewTask('');
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1); // Удаляем перетаскиваемую задачу

    if (source.droppableId === destination.droppableId) {
      // Если перетаскивание в ту же колонку
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      // Если перетаскивание в другую колонку
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  const removeTask = (columnId, taskId) => {
    const column = columns[columnId];
    const updatedItems = column.items.filter(item => item.id !== taskId);
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="add-task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Новая задача..."
          />
          <button onClick={addTask}>Добавить</button>
      </div>
      <div className="dndpage-container">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div className="column" key={columnId}>
                <h2>{column.name}</h2>
                <Droppable droppableId={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`droppable ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    >
                      {column.items.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`draggable ${snapshot.isDragging ? 'dragging' : ''}`}
                            >
                              {item.content}
                              <button className="delete-button" onClick={() => removeTask(columnId, item.id)}>Удалить</button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <div className="link">
        <button onClick={() => navigate('/')}>Перейти к обычному To-Do листу</button>
      </div>
    </div>
  );
}

export default DndPage;