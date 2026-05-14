import { useState, useEffect,useContext } from "react";
import CommentS from "./Comments/Comment";
import { updatePost, deletePost,deleteCommentsByPost } from '../../../API/posts';
import { UserContext } from "../../../Hooks/UserContext.jsx";

export default function PostDetails({ post, onUpdated, onDeleted, onClose }) {
   const { user } = useContext(UserContext);
    const userId = user.id;
  const canEdit = Number(post.userId) === Number(userId);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
    setEdit(false);
  }, [post.id, post.title, post.body]);

const save = async () => {
  if (!title || !body) return;
  try {
    const updatedFields = { title, body };
    await updatePost(post.id, updatedFields);
    
    onUpdated({ ...post, ...updatedFields }); 
    setEdit(false);
  } catch {
    alert("Failed to update post");
  }
};

const handleDelete = async () => {
    if (!window.confirm("בטוח שברצונך למחוק את הפוסט?")) return;

    try {
        await deletePost(post.id); 
        
        onDeleted(post.id); 
    } catch (err) {
        alert("שגיאה במחיקת הפוסט. ודא שכל הקשרים ב-DB הוסרו.");
    }
};

  return (
    <div className="post-details">
      {edit ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={save}>💾 Save</button>
          <button onClick={() => setEdit(false)}>❌ Cancel</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p style={{ whiteSpace: "pre-line" }}>{post.body}</p>
        </>
      )}

      <div className="post-details-actions">
        <div className="comment-toolbar">
        {canEdit && !edit && (
          
          <button onClick={() => setEdit(true)}>✏️ Edit</button>
        )}
        
          <button onClick={() => setShowComments(p => !p)}>
            💬 {showComments ? "Hide comments" : "Show comments"}
          </button>

          {canEdit && (
            <button className="danger-btn" onClick={handleDelete}>
              🗑️ Delete
            </button>
          )}

          <button onClick={onClose}>⬆ Close</button>
        </div>
      </div>
      {showComments && <CommentS postId={post.id} />}
    </div>
  );
}