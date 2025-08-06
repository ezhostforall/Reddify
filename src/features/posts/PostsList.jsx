import { useLoaderData } from 'react-router';
import Section from '../../components/Section/Section';
import PostItem from './PostItem';
import PostsFilter from '../../components/PostsFilter/PostsFilter';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Heading from '../../components/Heading/Heading';
import Button from '../../components/Button/Button';
import styles from './posts.module.css';

export default function PostsList({
  title = 'Posts',
  showFilter = true,
  posts,
  after,
  loading = false,
  onLoadMore,
  noMoreText = 'No more posts to load.',
  showCount = false,
}) {
  // Use loader data if props not provided
  const loaderData = useLoaderData?.() || {};
  const allPosts = posts ?? loaderData.posts ?? [];
  const currentAfter = after ?? loaderData.after;
  const subreddit = loaderData.subreddit;

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
        {showCount && <p>{allPosts.length} results found</p>}
      </Section>

      <Section className={styles.postsFeed}>
        {allPosts.map(({ data: post }) => (
          <PostItem key={post.id} post={post} />
        ))}
      </Section>

      <Section className={styles.postsFeed}>
        {currentAfter && onLoadMore && (
          <Button
            variant="loadMore"
            type="button"
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? (
              <LoadingSpinner
                size="small"
                color="primary"
                centered={false}
                className={styles.inline}
              />
            ) : (
              `Load More Results`
            )}
          </Button>
        )}
        {!currentAfter && allPosts.length > 0 && <p>{noMoreText}</p>}
      </Section>

      {loading && <LoadingSpinner />}
    </>
  );
}
