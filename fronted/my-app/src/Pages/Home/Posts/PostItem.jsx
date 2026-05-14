import { useState } from "react";
import PostDetails from "./PostDetails";

export default function PostItem({ post, onUpdated, onDeleted }) {
  const [open, setOpen] = useState(false);

  return (
    <li className={`post-card ${open ? "open" : ""}`}>

      {!open && (
        <div
          className="post-title"
          onClick={() => setOpen(true)}
          style={{ cursor: "pointer" }}
        >
          #{post.id} {post.title}
        </div>
      )}

      {open && (
        <PostDetails
          post={post}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
          onClose={() => setOpen(false)}
        />
      )}
    </li>
  );
}