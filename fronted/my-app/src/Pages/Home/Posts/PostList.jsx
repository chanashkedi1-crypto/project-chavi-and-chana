import PostItem from "./PostItem";

export default function PostList({ posts,onUpdated, onDeleted }) {
  return (
    <ul className="post-list">
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onUpdated={onUpdated} 
          onDeleted={onDeleted}
        />
      ))}
    </ul>
  );
}