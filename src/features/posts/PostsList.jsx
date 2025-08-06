import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { fetchSubredditPosts } from './postsAPI';
import Section from '../../components/Section/Section';
import Div from '../../components/Div/Div';
import Heading from '../../components/Heading/Heading';
import styles from './posts.module.css';

export default function PostsList({ subreddit = 'all' }) {
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
      <Section variant='left-aligned-flex' className={styles.postsFeed}> 
        {posts.map(({ data: post }) => (
          <Div className={styles.post} key={post.id}>
            {post.media?.reddit_video?.fallback_url ? (
              <video controls className={styles.video}>
                <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : post.preview?.images?.[0]?.source?.url ? (
              <img
                src={post.preview.images[0].source.url.replace(/&amp;/g, '&')}
                alt={post.title}
                loading="lazy"
                className={styles.image}
              />
            ) : null}
            <Heading>{post.title}</Heading>
            <p>Posted by u/{post.author}</p>
            <p>👍 {post.score} | 💬 {post.num_comments}</p>
            <Link
              to={`post/${post.id}`}
            >
              View post →
            </Link>
          </Div>
        ))}
      </Section>
      <Section>
        {after && (
          <button type="button" onClick={loadMorePosts} disabled={loading}>
            {loading ? 'Loading...' : 'Load More Posts'}
          </button>
        )}
      {!after && posts.length > 0 && <p>No more posts to load.</p>}
      </Section>
    </>
  );
}