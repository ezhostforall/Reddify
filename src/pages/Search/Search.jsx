import { useLoaderData, useSearchParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Heading from '../../components/Heading/Heading';
import Section from '../../components/Section/Section';
import PostItem from '../../features/posts/PostItem';
import styles from '../../features/posts/posts.module.css';

export default function Search() {
  const { posts, after, query, error } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState(posts);
  const [currentAfter, setCurrentAfter] = useState(after);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoadMore = searchParams.has('after');
    
    if (isLoadMore) {
      setAllPosts(prev => [...prev, ...posts]);
    } else {
      setAllPosts(posts);
    }
    setCurrentAfter(after);
  }, [posts, after, searchParams]);

  const loadMoreResults = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams(searchParams);
      params.set('after', currentAfter);
      
      await navigate(`/search?${params.toString()}`);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <Section>
        <Heading>Search Error</Heading>
        <p>{error}</p>
      </Section>
    );
  }

  if (!query) {
    return (
      <Section>
        <Heading>Search</Heading>
        <p>Enter a search term to find posts.</p>
      </Section>
    );
  }

  return (
    <>
      <Section>
        <Heading>Search Results for "{query}"</Heading>
        <p>{allPosts.length} results found</p>
      </Section>
      
      {allPosts.length > 0 ? (
        <>
          <Section variant='left-aligned-flex' className={styles.postsFeed}>
            {allPosts.map(({ data: post }) => (
              <PostItem key={post.id} post={post} />
            ))}
          </Section>
          <Section>
            {currentAfter && (
              <button type="button" onClick={loadMoreResults} disabled={loading}>
                {loading ? 'Loading...' : 'Load More Results'}
              </button>
            )}
            <button type="button" onClick={() => window.scrollTo(0, 0)}>
              Back to top
            </button>
            {!currentAfter && allPosts.length > 0 && <p>No more results to load.</p>}
          </Section>
        </>
      ) : (
        <Section>
          <p>No posts found for "{query}". Try a different search term.</p>
        </Section>
      )}
    </>
  );
}