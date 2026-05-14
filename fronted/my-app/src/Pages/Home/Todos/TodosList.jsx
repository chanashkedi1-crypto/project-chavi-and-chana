import TodoItem from "./TodoItem";
export default function TodoList({ todos, onUpdated, onDeleted }) {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdated={onUpdated} 
          onDeleted={onDeleted} 
        />
      ))}
    </div>
  );
}