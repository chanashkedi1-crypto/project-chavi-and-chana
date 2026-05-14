import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: "גישה נדחתה. חסר טוקן אימות" });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'chavi123', (err, user) => {
        if (err) {
            return res.status(403).json({ error: "הטוקן לא בתוקף או פג תוקפו" });
        }
                req.user = user; 
        next(); 
    });
};