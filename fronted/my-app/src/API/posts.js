import axiosInstance from './axios';

// --- פוסטים ---
export const getPosts = async () => {
    try {
        const res = await axiosInstance.get('/posts');
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "נכשלה טעינת הפוסטים" };
    }
};

export const addPost = async (postData) => {
    try {
        const res = await axiosInstance.post('/posts', postData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "יצירת הפוסט נכשלה" };
    }
};

export const updatePost = async (id, postData) => {
    try {
        const res = await axiosInstance.put(`/posts/${id}`, postData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "עדכון הפוסט נכשל" };
    }
};

export const deletePost = async (id) => {
    try {
        const res = await axiosInstance.delete(`/posts/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "מחיקת הפוסט נכשלה" };
    }
};

// --- תגובות ---
export const getCommentsByPost = async (postId) => {
    try {
        const res = await axiosInstance.get(`/comments?postId=${postId}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "נכשלה טעינת התגובות" };
    }
};

export const addComment = async (commentData) => {
    try {
        const res = await axiosInstance.post('/comments', commentData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "הוספת התגובה נכשלה" };
    }
};

export const updateComment = async (id, commentData) => {
    try {
        const res = await axiosInstance.put(`/comments/${id}`, commentData);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "עדכון התגובה נכשל" };
    }
};

export const deleteComment = async (id) => {
    try {
        const res = await axiosInstance.delete(`/comments/${id}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "מחיקת התגובה נכשלה" };
    }
};

export const deleteCommentsByPost = async (postId) => {
    try {
        const res = await axiosInstance.delete(`/comments/by-post/${postId}`);
        return res.data;
    } catch (error) {
        throw error.response?.data || { error: "מחיקת התגובות נכשלה" };
    }
};