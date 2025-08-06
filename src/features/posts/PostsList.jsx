import { useLoaderData, useNavigate, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Section from '../../components/Section/Section';
import PostItem from './PostItem';
import PostsFilter from '../../components/PostsFilter/PostsFilter';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Heading from '../../components/Heading/Heading';
import styles from './posts.module.css';

export default function PostsList({ title = "Posts", showFilter = true }) {
  const { posts: initialPosts, after: initialAfter, subreddit } = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const { postsPerPage, defaultSort } = useSelector(state => state.user.preferences);

  const [allPosts, setAllPosts] = useState(initialPosts);
  const [currentAfter, setCurrentAfter] = useState(initialAfter);
  const [loading, setLoading] = useState(false);

  // Reload data when preferences change
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const currentLimit = urlParams.get('limit');
    const currentSort = urlParams.get('sort');

    // Only reload if we're not loading more posts AND preferences don't match URL
    if (!urlParams.has('after')) {
      const needsReload = 
        (currentLimit && currentLimit !== postsPerPage.toString()) ||
        (currentSort && currentSort !== defaultSort) ||
        (!currentLimit || !currentSort); // First load without params

      if (needsReload) {
        urlParams.set('limit', postsPerPage);
        urlParams.set('sort', defaultSort);
        urlParams.delete('after'); // Reset pagination

        const newUrl = `${location.pathname}?${urlParams.toString()}`;
        navigate(newUrl, { replace: true });
      }
    }
  }, [postsPerPage, defaultSort, location, navigate]);

  // Update accumulated posts when new data comes from loader
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const isLoadMore = urlParams.has('after');
    
    if (isLoadMore) {
      // Append new posts to existing ones
      setAllPosts(prev => [...prev, ...initialPosts]);
    } else {
      // Fresh load, replace all posts
      setAllPosts(initialPosts);
    }
    setCurrentAfter(initialAfter);
  }, [initialPosts, initialAfter, location.search]);

  const loadMorePosts = async () => {
    if (!currentAfter || loading) return;

    setLoading(true);
    try {
      const params = new URLSearchParams(location.search);
      params.set('after', currentAfter);
      params.set('limit', postsPerPage);
      params.set('sort', defaultSort);
      
      await navigate(`${location.pathname}?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  const getPageTitle = () => {
    if (subreddit && subreddit !== 'all') {
      return `r/${subreddit}`;
    }
    return title;
  };

  if (!allPosts || allPosts.length === 0) {
    return (
      <Section>
        <Heading>{getPageTitle()}</Heading>
        {showFilter && <PostsFilter />}
        <p>No posts available.</p>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <Heading>{getPageTitle()}</Heading>
        {showFilter && <PostsFilter />}
      </Section>
      
      <Section variant='left-aligned-flex' className={styles.postsFeed}> 
        {allPosts.map(({ data: post }) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Section>
      
      <Section>
        <p>Showing {allPosts.length} posts</p>
        {currentAfter && (
          <button type="button" onClick={loadMorePosts} disabled={loading}>
            {loading ? 'Loading...' : `Load ${postsPerPage} More Posts`}
          </button>
        )}
        <button type="button" onClick={() => window.scrollTo(0, 0)}>
          Back to top
        </button>
        {!currentAfter && allPosts.length > 0 && <p>No more posts to load.</p>}
      </Section>
      
      {loading && <LoadingSpinner />}
    </>
  );
}