import { useEffect, useState} from "react";
import { getCommentsByPost } from "../../../../API/posts";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function Comment({ postId }) {
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function load() {
            try {
                setError(null);
                const data = await getCommentsByPost(postId);
                setComments(data);
            } catch (err) {
                setError("Failed to load comments");
            }
        }
        load();
    }, [postId]);

    const handleAddState = (newComment) => setComments(prev => [...prev, newComment]);
    const handleDeleteState = (id) => setComments(prev => prev.filter(c => c.id !== id));
  const handleUpdateState = (updatedComment) => 
    setComments(prev => prev.map(c => 
        c.id === updatedComment.id ? { ...c, ...updatedComment } : c
    ));
    if (error) return <p className="error-msg">{error}</p>;

    return (
        <>
            <CommentForm postId={String(postId)} onCommentAdded={handleAddState} />
            <CommentList
                comments={comments}
                onDeleted={handleDeleteState}
                onUpdated={handleUpdateState}
            />
        </>
    );
}