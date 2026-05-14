import { useState } from "react";
import { updateTodo, deleteTodo } from "../../../API/todos";

export default function TodoItem({ todo, onUpdated, onDeleted }) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const handleToggle = async () => {
    try {
        const dataToSend = { 
            title: todo.title, 
            completed: !todo.completed, 
            userId: todo.userId 
        };
        const updated = await updateTodo(todo.id, dataToSend);
        onUpdated(updated); 
    } catch {
        alert("Error updating status");
    }
};

    const handleDelete = async () => {
          try {
            await deleteTodo(todo.id);
            onDeleted(todo.id);
        } catch {
            alert("Error");
        }
    };

const handleSaveTitle = async () => {
    if (!title) return;
    try {
        const dataToSend = { 
            title: title, 
            completed: todo.completed, 
            userId: todo.userId 
        };
        const updated = await updateTodo(todo.id, dataToSend);
        onUpdated(updated);  
        setEdit(false);
    } catch {
        alert("Failed to update title");
    }
};

  return (
    <div className={`todo-card ${todo.completed ? "completed" : "not-completed"}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />

      {edit ? (
        <div className="edit-mode">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <button onClick={handleSaveTitle}>💾</button>
          <button onClick={() => { setEdit(false); setTitle(todo.title); }}>❌</button>
        </div>
      ) : (
        <>
          <div className="todo-id">{todo.id}</div>
          <div className="todo-title">{todo.title}</div>

          <div className="todo-actions">
            <button onClick={() => setEdit(true)}>✏️</button>
            <button onClick={() => handleDelete(todo.id)}>🗑️</button>
          </div>
        </>
      )}
    </div>
  );
}