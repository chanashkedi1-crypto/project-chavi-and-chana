import { useState, useContext } from "react";
import { UserContext } from "../../../../Hooks/UserContext";
import { addComment } from "../../../../API/posts";

export default function CommentForm({ postId, onCommentAdded }) {
  const { user } = useContext(UserContext); 
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault(); 
    
    if (!text.trim()) return; 

    try {
      setLoading(true); 
      
      const newComment = {
        postId: postId,
        userId: user.id, 
        name: text      
      };
      
      const saved = await addComment(newComment); 
      onCommentAdded(saved); 
      setText(""); 
    } catch (err) {
      alert("Failed to add comment");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}