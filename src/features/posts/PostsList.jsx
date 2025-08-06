import { useState, useEffect } from 'react';
import { fetchSubredditPosts } from './postsAPI';

export default function PostsList({ subreddit, sort = 'hot', limit = 10, after = '' }) {
  // This component will use fetchSubredditPosts to get posts and render them
  // Implementation details would go here
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSubredditPosts(subreddit, sort, limit, after);
        setPosts(data.data.children.map(child => child.data));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [subreddit, sort, limit, after]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(posts); // For debugging purposes

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
