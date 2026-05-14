import CommentItem from "./CommentItem.jsx";
import { useContext } from "react";
import { UserContext } from "../../../../Hooks/UserContext.jsx";
export default function CommentList({ comments = [], onDeleted, onUpdated }) {
   const { user } = useContext(UserContext);
    return (
        <div className="comment-list">
            {comments.length === 0 && <p className="empty-msg">No comments yet</p>}
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    canEdit={Number(comment.userId) === Number(user.id)}
                    onDeleted={onDeleted}
                    onUpdated={onUpdated}
                />
            ))}
        </div>
    );
}