
import { addTodo } from "../../../API/todos";
import { useState, useContext } from "react";
import { UserContext } from "../../../Hooks/UserContext.jsx";
export default function TodoForm({ onAdded }) {
    const { user } = useContext(UserContext);
    const userId = user.id;
    const [title, setTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        if (!title) return;
        try {
            setIsSubmitting(true);
            const newTodo = await addTodo({ userId, title, completed: false });
            onAdded(newTodo);
            setTitle("");
        } catch {
            alert("Failed to add todo");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="todo-form">
            <input
                placeholder="New todo..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        submit();
                    }
                }}
                disabled={isSubmitting}
            />
            <button onClick={submit} disabled={isSubmitting}>
                {isSubmitting ? "..." : "➕ Add"}
            </button>
        </div>
    );
}