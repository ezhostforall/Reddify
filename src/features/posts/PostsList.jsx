import { useEffect, useState } from 'react';
import { fetchSubredditPosts } from './postsAPI';

export default function PostsList({ subreddit = 'reactjs' }) {
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSubredditPosts(subreddit, 'hot', 10, '')
      .then(data => {
        setPosts(data.children);
        setAfter(data.after);
      })
      .catch(err => {
        console.error('Failed to fetch posts:', err);
      })
      .finally(() => setLoading(false));
  }, [subreddit]);

  const loadMorePosts = () => {
    if (!after) return;
    setLoading(true);
    fetchSubredditPosts(subreddit, 'hot', 10, after)
      .then(data => {
        setPosts(prevPosts => [...prevPosts, ...data.children]);
        setAfter(data.after);
      })
      .catch(err => {
        console.error('Failed to load more posts:', err);
      })
      .finally(() => setLoading(false));
  };

  if (loading && posts.length === 0) return <p>Loading posts...</p>;

  return (
    <>
      <ul>
        {posts.map(({ data: post }) => (
          <li key={post.id}>
            {post.media?.reddit_video?.fallback_url ? (
              <video controls>
                <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : post.preview?.images?.[0]?.source?.url ? (
              <img
                src={post.preview.images[0].source.url.replace(/&amp;/g, '&')}
                alt={post.title}
                loading="lazy"
              />
            ) : null}
            <h2>{post.title}</h2>
            <p>Posted by u/{post.author}</p>
            <p>👍 {post.score} | 💬 {post.num_comments}</p>
            <a
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Reddit →
            </a>
          </li>
        ))}
      </ul>
      {after && (
        <button type="button" onClick={loadMorePosts} disabled={loading}>
          {loading ? 'Loading...' : 'Load More Posts'}
        </button>
      )}
      {!after && posts.length > 0 && <p>No more posts to load.</p>}
    </>
  );
}