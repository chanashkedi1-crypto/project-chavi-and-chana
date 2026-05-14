import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Hooks/UserContext.jsx";
import { getTodosByUser } from "../../../API/todos";
import TodoList from "./TodosList.jsx";
import TodoForm from "./TodoForm.jsx";
import TodoFilter from "./TodoFilter";
import "../../../CSS/Todos.css";

export default function Todos() {
  const { user } = useContext(UserContext);
  const userId = user.id;

  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState({
    value: "",
    type: "title", 
  });
  const [filter, setFilter] = useState("all"); // all | completed | uncompleted
  const [sortBy, setSortBy] = useState("id"); // id | title | completed

  useEffect(() => {
       async function loadTodos() {
      try {
        const data = await getTodosByUser(userId);
        setTodos(data);
      } catch {
        alert("Failed to load todos");
      }
    }
    loadTodos();
  }, []);
  const handleAddState = (newTodo) =>
    setTodos((prev) => [...prev, newTodo]);

  const handleDeletedState = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const handleUpdatedState = (updated) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );

  
  const filteredTodos = todos
    .filter((todo) => {
      if (!search.value) return true;

      if (search.type === "id") {
        return todo.id.toString().includes(search.value);
      }

      return todo.title
        .toLowerCase()
        .includes(search.value.toLowerCase());
    })
    .filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "uncompleted") return !todo.completed;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);
      if (sortBy === "completed") return a.completed - b.completed;
      return String(a.id).localeCompare(String(b.id));
    });

  return (
    <div className="todos-container">
      <h2>My Todos</h2>

      <TodoFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <TodoForm  onAdded={handleAddState} />

      <TodoList
        todos={filteredTodos}
        onDeleted={handleDeletedState}
        onUpdated={handleUpdatedState}
      />
    </div>
  );
}