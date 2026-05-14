import * as TodoModel from '../models/todoModels.js';

export const getTodosByUser = async (req, res) => {
    try {
        const userId = req.user.id; 
        const todos = await TodoModel.Todo.getByUserId(userId);
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: "אירעה שגיאה בשליפת המשימות" });
    }
};

export const addTodo = async (req, res) => {
    try {
        const { title, completed } = req.body;
        const userId = req.user.id;

        if (!title) {
            return res.status(400).json({ error: "כותרת המשימה היא שדה חובה" });
        }

        const newTodo = await TodoModel.Todo.create(userId, title, completed);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdFromToken = req.user.id;

        const todo = await TodoModel.Todo.getById(id);
        if (!todo) {
            return res.status(404).json({ error: "המשימה לא נמצאה" });
        }

        if (todo.userId !== userIdFromToken) {
            return res.status(403).json({ error: "אין לך הרשאה לערוך משימה של משתמש אחר" });
        }

        await TodoModel.Todo.update(id, req.body);
        res.json({ message: "המשימה עודכנה בהצלחה", id: Number(id), ...req.body });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdFromToken = req.user.id;

        const todo = await TodoModel.Todo.getById(id);
        if (!todo) {
            return res.status(404).json({ error: "המשימה לא נמצאה" });
        }

        if (todo.userId !== userIdFromToken) {
            return res.status(403).json({ error: "אין לך הרשאה למחוק משימה זו" });
        }

        await TodoModel.Todo.delete(id);
        res.status(200).json({ message: "המשימה נמחקה בהצלחה" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};