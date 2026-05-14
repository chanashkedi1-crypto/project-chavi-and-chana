import db from '../config/db.js';

export const Post = {
    getAll: async () => {
        try {
            const [rows] = await db.execute('SELECT * FROM posts');
            return rows;
        } catch (error) {
            throw new Error('שגיאה בשליפת הפוסטים: ' + error.message);
        }
    },

    getById: async (id) => {
        try {
            const [rows] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw new Error('שגיאה בשליפת פוסט לפי מזהה: ' + error.message);
        }
    },

    create: async (userId, title, body) => {
        try {
            const [result] = await db.execute(
                'INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)',
                [userId, title, body]
            );
            return { id: result.insertId, userId, title, body };
        } catch (error) {
            throw new Error('יצירת הפוסט נכשלה: ' + error.message);
        }
    },

    update: async (id, fields) => {
        try {
            const keys = Object.keys(fields);
            if (keys.length === 0) throw new Error('לא נשלחו שדות לעדכון');

            const values = Object.values(fields);
            const setClause = keys.map(key => `${key} = ?`).join(', ');
            
            const [result] = await db.execute(`UPDATE posts SET ${setClause} WHERE id = ?`, [...values, id]);
            return result;
        } catch (error) {
            throw new Error('עדכון הפוסט נכשל: ' + error.message);
        }
    },

    delete: async (id) => {
        try {
            const [result] = await db.execute('DELETE FROM posts WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw new Error('מחיקת הפוסט נכשלה: ' + error.message);
        }
    }
};