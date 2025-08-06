import { useLoaderData, useSearchParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import Heading from '../../components/Heading/Heading';
import Section from '../../components/Section/Section';
import Button from '../../components/Button/Button';
import PostsList from '../../features/posts/PostsList';

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
      setAllPosts((prev) => [...prev, ...posts]);
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
      <PostsList
        title={`Search Results for "${query}"`}
        showFilter={false}
        posts={allPosts}
        after={currentAfter}
        loading={loading}
        onLoadMore={loadMoreResults}
        noMoreText="No more results to load."
        showCount
      />
      <Section>
        <Button
          variant="backToTop"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ˄
        </Button>
      </Section>
    </>
  );
}
