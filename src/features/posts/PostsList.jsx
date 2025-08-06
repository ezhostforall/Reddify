import { useLoaderData, useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import Section from '../../components/Section/Section';
import PostItem from './PostItem';
import styles from './posts.module.css';

export default function PostsList() {
  const { posts, after } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const [allPosts, setAllPosts] = useState(posts);
  const [currentAfter, setCurrentAfter] = useState(after);
  const [loading, setLoading] = useState(false);

  // Update accumulated posts when new data comes from loader
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const isLoadMore = urlParams.has('after');
    
    if (isLoadMore) {
      // Append new posts to existing ones
      setAllPosts(prev => [...prev, ...posts]);
    } else {
      // Fresh load, replace all posts
      setAllPosts(posts);
    }
    setCurrentAfter(after);
  }, [posts, after, location.search]);

  const loadMorePosts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(location.search);
      params.set('after', currentAfter);
      
      await navigate(`${location.pathname}?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  if (!allPosts || allPosts.length === 0) {
    return (
      <Section>
        <p>No posts available.</p>
      </Section>
    );
  }

  return (
    <>
      <Section variant='left-aligned-flex' className={styles.postsFeed}> 
        {allPosts.map(({ data: post }) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Section>
      <Section>
        {currentAfter && (
          <button type="button" onClick={loadMorePosts} disabled={loading}>
            {loading ? 'Loading...' : 'Load More Posts'}
          </button>
        )}
        <button type="button" onClick={() => window.scrollTo(0, 0)}>
          Back to top
        </button>
        {!currentAfter && allPosts.length > 0 && <p>No more posts to load.</p>}
      </Section>
    </>
  );
}