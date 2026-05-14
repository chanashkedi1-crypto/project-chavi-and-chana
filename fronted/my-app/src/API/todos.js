import axiosInstance from './axios';

export const getTodosByUser = async () => {
    try {
        const res = await axiosInstance.get('/todos');
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "נכשלה טעינת המשימות" };
    }
};

export const addTodo = async (todoData) => {
    try {
        const res = await axiosInstance.post('/todos', todoData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "יצירת המשימה נכשלה" };
    }
};

export const updateTodo = async (id, todoData) => {
    try {
        const res = await axiosInstance.put(`/todos/${id}`, todoData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "עדכון המשימה נכשל" };
    }
};

export const deleteTodo = async (id) => {
    try {
        const res = await axiosInstance.delete(`/todos/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "מחיקת המשימה נכשלה" };
    }
};