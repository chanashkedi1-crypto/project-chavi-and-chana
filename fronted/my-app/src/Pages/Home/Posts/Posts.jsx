import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Hooks/UserContext";
import { getPosts } from "../../../API/posts";
import PostFilter from "./PostFilter";
import PostList from "./PostList";
import PostForm from "./PostForm";
import "../../../CSS/Posts.css";

export default function Posts() {
  const { user } = useContext(UserContext);

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState({
    value: "",
    type: "title",
  });

  const [postsScope, setPostsScope] = useState("all"); // all | mine

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch {
        alert("Failed to load posts");
      }
    }
    loadPosts();
  }, []);

  const handleAddState = (newPost) =>
    setPosts((prev) => [newPost, ...prev]);

  const handleDeleteState = (id) =>
    setPosts((prev) => prev.filter((p) => p.id !== id));

  const handleUpdateState = (updatedPost) =>
    setPosts((prev) =>
      prev.map((p) => (p.id === updatedPost.id ? updatedPost : p))
    );

  const filteredPosts = posts
    .filter((post) =>
      postsScope === "mine"
        ? Number(post.userId) === Number(user.id)
        : true
    )
    .filter((post) => {
      if (!search.value) return true;

      if (search.type === "id") {
        return post.id.toString().includes(search.value);
      }

      return post.title
        .toLowerCase()
        .includes(search.value.toLowerCase());
    });

 
   return (
  <div className="posts-layout">
  <main className="posts-content">
    <h2>Posts</h2>
    <PostList
      posts={filteredPosts}
      onDeleted={handleDeleteState}
      onUpdated={handleUpdateState}
    />
  </main>
  <aside className="posts-sidebar">

    <div className="posts-search-box">
      <PostFilter
        search={search}
        setSearch={setSearch}
        postsScope={postsScope}
        setPostsScope={setPostsScope}
      />
    </div>

    <div className="posts-add-box">
      <PostForm
        onPostAdded={handleAddState}
      />
    </div>

  </aside>

</div>

);

}