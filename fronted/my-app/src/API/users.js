
import axiosInstance from "./axios";

export const getUserById = async (id) => {
    try {
        const res = await axiosInstance.get(`/users/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "נכשלה טעינת נתוני משתמש" };
    }
};

export const RegisterUser = async (userData) => {
    try {
        const res = await axiosInstance.post(`/users/register`, userData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "ההרשמה נכשלה" };
    }
};

export const createUser = async (userData) => {
    try {
        const res = await axiosInstance.post(`/users`, userData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "יצירת משתמש נכשלה" };
    }
};

export const updateUser = async (id, userData) => {
    try {
        const res = await axiosInstance.put(`/users/${id}`, userData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "עדכון פרטי משתמש נכשל" };
    }
};

export const userService = {
    getAllUsers: async () => {
        try {
            return await axiosInstance.get(`/users`);
        } catch (error) {
            throw error.response?.data || { error: "נכשלה טעינת רשימת משתמשים" };
        }
    },
    getUserById: (id) => axiosInstance.get(`/users/${id}`), // השארתי כפי שהיה במידה ונעשה שימוש ישיר ב-Response
    updateProfile: async (id, data) => {
        try {
            const res = await axiosInstance.put(`/users/${id}`, data);
            return res.data;
        } catch (error) {
            throw error.response?.data || { error: "עדכון הפרופיל נכשל" };
        }
    },
};

export const LoginUser = async (name, password) => {
    try {
        const response = await axiosInstance.post(`/users/login`, { name, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || { error: "התחברות נכשלה" };
    }
};