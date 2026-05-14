import db from '../config/db.js';

export const User = {
    findByUsername: async (name) => {
        try {
            const [rows] = await db.execute('SELECT * FROM users WHERE name = ?', [name]);
            return rows[0];
        } catch (error) {
            throw new Error(`שגיאה בחיפוש משתמש לפי שם (${name}): ` + error.message);
        }
    },

    findById: async (id) => {
        try {
            const [rows] = await db.execute('SELECT id, name, email FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`שגיאה בחיפוש משתמש לפי מזהה (${id}): ` + error.message);
        }
    },

       create: async (name, email, passwordHash) => {
        try {
            const [result] = await db.execute(
                'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
                [name, email, passwordHash]
            );
            return { id: result.insertId, name, email };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new Error('שם המשתמש או האימייל כבר קיימים במערכת');
            }
            throw new Error('יצירת משתמש נכשלה: ' + error.message);
        }
    }
};

export const findUserForAuth = async (name) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE name = ?', [name]);
    return rows[0];
};