import * as UserModel from '../models/userModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'chavi123'; 

export const loginUser = async (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ error: "חובה להזין שם משתמש וסיסמה" });
    }

    try {
        const user = await UserModel.findUserForAuth(name);

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (isMatch) {
                const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
                
                return res.status(200).json({ 
                    message: "התחברת בהצלחה",
                    token, 
                    user: { id: user.id, name: user.name, email: user.email } 
                });
            }
        }
        
        res.status(401).json({ error: "שם משתמש או סיסמה שגויים" });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "אירעה שגיאה בשרת במהלך ההתחברות" });
    }
};


export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        if (!name || !email || !password) {
            return res.status(400).json({ error: "כל השדות הם חובה" });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // יצירת המשתמש
        const newUser = await UserModel.User.create(name, email, passwordHash);

        // יצירת טוקן (כדי שהמשתמש יתחבר אוטומטית)
        const token = jwt.sign(
            { id: newUser.id, name: newUser.name }, 
            process.env.JWT_SECRET || 'your_secret_key', 
            { expiresIn: '1h' }
        );

        // החזרת תשובה במבנה אחיד (זהה ל-Login)
        res.status(201).json({
            message: "נרשמת בהצלחה",
            token: token,
            user: newUser // newUser מכיל { id, name, email }
        });
    } catch (error) {
        console.error("Create User Error:", error);
        res.status(400).json({ error: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "המשתמש לא נמצא" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};