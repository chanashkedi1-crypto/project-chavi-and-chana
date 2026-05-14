import * as PostModel from '../models/postModels.js';
import * as CommentModel from '../models/commentModels.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.Post.getAll();
        res.json(posts);
    } catch (error) { 
        res.status(500).json({ error: "שגיאה בשרת בעת שליפת הפוסטים" }); 
    }
};

export const addPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.id; 
        
        if (!title || !body) {
            return res.status(400).json({ error: "חובה לספק כותרת ותוכן לפוסט" });
        }

        const newPost = await PostModel.Post.create(userId, title, body);
        res.status(201).json(newPost);
    } catch (error) { 
        res.status(400).json({ error: error.message }); 
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdFromToken = req.user.id;
        
        const post = await PostModel.Post.getById(id);
        if (!post) return res.status(404).json({ error: "הפוסט לא נמצא" });

        if (post.userId !== userIdFromToken) {
            return res.status(403).json({ error: "אין לך הרשאה לערוך פוסט זה" });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "לא נשלחו נתונים לעדכון" });
        }

        await PostModel.Post.update(id, req.body);
        res.json({ message: "הפוסט עודכן בהצלחה", id: Number(id), ...req.body });
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdFromToken = req.user.id;

        const post = await PostModel.Post.getById(id);
        if (!post) return res.status(404).json({ error: "הפוסט לא נמצא" });

        if (post.userId !== userIdFromToken) {
            return res.status(403).json({ error: "אין לך הרשאה למחוק פוסט זה" });
        }

        await CommentModel.Comment.deleteByPostId(id); 
        await PostModel.Post.delete(id); 

        res.status(200).json({ message: "הפוסט נמחק בהצלחה" }); 
    } catch (error) {
        res.status(500).json({ error: "מחיקת הפוסט נכשלה" });
    }
};