import db from '../config/db.js';

export const Todo = {
    getByUserId: async (userId) => {
        try {
            const [rows] = await db.execute('SELECT * FROM todos WHERE userId = ?', [userId]);
            return rows;
        } catch (error) {
            throw new Error(`שגיאה בשליפת המשימות: ` + error.message);
        }
    },

    getById: async (id) => {
        try {
            const [rows] = await db.execute('SELECT * FROM todos WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`שגיאה בשליפת משימה לפי מזהה: ` + error.message);
        }
    },

    create: async (userId, title, completed = false) => {
        try {
            const [result] = await db.execute(
                'INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)',
                [userId, title, completed]
            );
            return { id: result.insertId, userId, title, completed };
        } catch (error) {
            throw new Error('יצירת המשימה נכשלה: ' + error.message);
        }
    },

    update: async (id, fields) => {
        try {
            const keys = Object.keys(fields);
            if (keys.length === 0) throw new Error('לא נשלחו נתונים לעדכון');

            const values = Object.values(fields);
            const setClause = keys.map(key => `${key} = ?`).join(', ');

            const [result] = await db.execute(
                `UPDATE todos SET ${setClause} WHERE id = ?`,
                [...values, id]
            );
            return result;
        } catch (error) {
            throw new Error('עדכון המשימה נכשל: ' + error.message);
        }
    },

    delete: async (id) => {
        try {
            const [result] = await db.execute('DELETE FROM todos WHERE id = ?', [id]);
            return result;
        } catch (error) {
            throw new Error('מחיקת המשימה נכשלה: ' + error.message);
        }
    }
};