import { useState ,useContext} from "react";
import { addPost } from '../../../API/posts';
import { UserContext } from "../../../Hooks/UserContext.jsx";
export default function PostForm({ onPostAdded }) {
    const { user } = useContext(UserContext);
    const userId = user.id;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const submit = async () => {
        if (!title || !body) return;
        try {
            const newPost = await addPost({ userId, title, body });
            onPostAdded(newPost);
            setTitle(""); setBody("");
        } catch { alert("Failed to add post"); }
    };

    return (
        <div className="post-form-wrapper">
            <div className="post-form">
                <input  className="post-form-input" placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea className="post-form-textarea" placeholder="Post content" value={body} onChange={(e) => setBody(e.target.value)} />
                <button className="post-form-btn" onClick={submit}>Add Post</button>
            </div>
        </div>
    );
}