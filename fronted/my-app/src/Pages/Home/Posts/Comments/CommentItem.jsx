import { useState } from "react";
import { deleteComment, updateComment } from "../../../../API/posts";

export default function CommentItem({ comment, canEdit, onDeleted, onUpdated }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(comment.name);

const handleSave = async () => {
    if (!text) return;
    try {
        const updatedData = { name: text }; 
        await updateComment(comment.id, updatedData); 
        onUpdated({ ...comment, name: text }); 
        
        setEdit(false);
    } catch {
        alert("Failed to update comment");
    }
};

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      onDeleted(comment.id);
    } catch {
      alert("Failed to delete comment");
    } finally {
    }
  };

  return (
    <div className="comment-card">
      <div className="comment-header">
<span className="comment-author">User ID: {comment.userId}</span>      </div>

      {edit ? (
        <>
          <input value={text} onChange={(e) => setText(e.target.value)}  />
          <div className="comment-actions">
            <button onClick={handleSave} >Update</button>
            <button onClick={() => { setEdit(false); setText(comment.body); }} >Cancel</button>
          </div>
        </>
      ) : (
        <>
<div className="comment-body">{comment.name}</div>          {canEdit && (
            <div className="comment-actions">
              <button onClick={() => setEdit(true)}>✏️</button>
              <button onClick={handleDelete} >🗑️</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}