import * as CommentModel from '../models/commentModels.js';

export const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.query;
        if (!postId) {
            return res.status(400).json({ error: "חסר מזהה פוסט (postId) בשאילתה" });
        }
        const comments = await CommentModel.Comment.getByPostId(postId);
        res.json(comments);
    } catch (error) { 
        res.status(500).json({ error: "שגיאה בשליפת התגובות" }); 
    }
};

export const addComment = async (req, res) => {
    try {
        const { postId, name } = req.body;
        const userId = req.user.id; 

        if (!postId || !name) {
            return res.status(400).json({ error: "חובה לספק מזהה פוסט ותוכן לתגובה" });
        }

        const newComment = await CommentModel.Comment.create(postId, userId, name);
        res.status(201).json(newComment);
    } catch (error) { 
        res.status(400).json({ error: error.message }); 
    }
};

export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const userIdFromToken = req.user.id;

        const comment = await CommentModel.Comment.getById(id);
        if (!comment) return res.status(404).json({ error: "התגובה לא נמצאה" });

        if (comment.userId !== userIdFromToken) {
            return res.status(403).json({ error: "אין לך הרשאה לערוך תגובה זו" });
        }

        if (!name) {
            return res.status(400).json({ error: "חובה לספק תוכן לעדכון" });
        }

        await CommentModel.Comment.update(id, name);
        res.json({ id: Number(id), name, message: "התגובה עודכנה בהצלחה" }); 
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const userIdFromToken = req.user.id;

        const comment = await CommentModel.Comment.getById(id);
        if (!comment) return res.status(404).json({ error: "התגובה לא נמצאה" });

        if (comment.userId !== userIdFromToken) {
            return res.status(403).json({ error: "אין לך הרשאה למחוק תגובה זו" });
        }

        await CommentModel.Comment.delete(id);
        res.status(200).json({ message: "התגובה נמחקה בהצלחה" });
    } catch (error) {
        res.status(500).json({ error: "מחיקת התגובה נכשלה" });
    }
};

export const deleteCommentsByPost = async (req, res) => {
    try {
        await CommentModel.Comment.deleteByPostId(req.params.postId);
        res.status(200).json({ message: "כל התגובות לפוסט זה נמחקו" });
    } catch (error) { 
        res.status(500).json({ error: error.message }); 
    }
};