import db from '../config/db.js';

export const Comment = {
    getByPostId: async (postId) => {
        try {
            const [rows] = await db.execute('SELECT * FROM comments WHERE postId = ?', [postId]);
            return rows;
        } catch (error) {
            throw new Error(`שגיאה בשליפת תגובות עבור פוסט ${postId}: ` + error.message);
        }
    },

    getById: async (id) => {
        try {
            const [rows] = await db.execute('SELECT * FROM comments WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`שגיאה בשליפת תגובה לפי מזהה: ` + error.message);
        }
    },

    create: async (postId, userId, name) => {
        try {
            const [result] = await db.execute(
                'INSERT INTO comments (postId, userId, name) VALUES (?, ?, ?)',
                [postId, userId, name]
            );
            return { id: result.insertId, postId, userId, name };
        } catch (error) {
            throw new Error('שגיאה ביצירת תגובה חדשה: ' + error.message);
        }
    },

    update: async (id, name) => {
        try {
            const [result] = await db.execute('UPDATE comments SET name = ? WHERE id = ?', [name, id]);
            return result;
        } catch (error) {
            throw new Error('שגיאה בעדכון התגובה: ' + error.message);
        }
    },

    delete: async (id) => {
        try {
            const [result] = await db.execute('DELETE FROM comments WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw new Error('שגיאה במחיקת התגובה: ' + error.message);
        }
    },

    deleteByPostId: async (postId) => {
        try {
            await db.execute('DELETE FROM comments WHERE postId = ?', [postId]);
        } catch (error) {
            throw new Error('שגיאה במחיקת תגובות לפי פוסט: ' + error.message);
        }
    }
};