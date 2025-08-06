import { useLoaderData, Link } from 'react-router';
import Heading from '../../components/Heading/Heading';
import Div from '../../components/Div/Div';
import Section from '../../components/Section/Section';
import CommentsList from '../../features/comments/CommentsList';
import styles from './Post.module.css';

function formatTimestamp(timestamp) {
  const date = new Date(timestamp * 1000);
  return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
    Math.floor((date - new Date()) / (1000 * 60 * 60 * 24)),
    'day'
  );
}

function formatScore(score) {
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}k`;
  }
  return score.toString();
}

function PostContent({ post }) {
  if (post.is_video && post.media?.reddit_video) {
    return (
      <div className={styles['post-content']}>
        <video
          controls
          poster={post.preview?.images?.[0]?.source?.url?.replace(
            /&amp;/g,
            '&'
          )}
        >
          <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (post.post_hint === 'image' && post.url) {
    return (
      <div className={styles['post-content']}>
        <img src={post.url} alt={post.title} />
      </div>
    );
  }

  if (post.is_self && post.selftext_html) {
    return (
      <div
        className={styles['post-content']}
        dangerouslySetInnerHTML={{
          __html: post.selftext_html
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&'),
        }}
      />
    );
  }

  if (post.url && !post.is_self) {
    return (
      <Div className={styles['post-content']}>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles['post-link']}
        >
          View External Link →
        </a>
      </Div>
    );
  }

  return null;
}

export default function Post() {
  const { post, comments } = useLoaderData();

  if (!post) {
    return (
      <Section>
        <Heading>Post not found</Heading>
        <p>The post you're looking for could not be found.</p>
        <Link to="/">← Back to Home</Link>
      </Section>
    );
  }

  return (
    <Div className={styles['post-root']}>
      <Section className={styles['post-breadcrumbs']}>
        <nav>
          <Link to="/">Home</Link>
          <span>/</span>
          <span>{post.title}</span>
        </nav>
      </Section>

      <Section>
        <Div>
          <Div className={styles['post-meta']}>
            <span>r/{post.subreddit}</span>
            <span>•</span>
            <span>u/{post.author}</span>
            <span>•</span>
            <time>{formatTimestamp(post.created_utc)}</time>
          </Div>

          <Div className={styles['post-stats']}>
            <Div>
              <span>↑ {formatScore(post.ups)}</span>
              <span>({Math.round(post.upvote_ratio * 100)}% upvoted)</span>
            </Div>
            <Div>💬 {post.num_comments} comments</Div>
          </Div>
        </Div>

        <Heading className={styles['post-title']}>{post.title}</Heading>

        {post.link_flair_text && (
          <Div className={styles['post-flair']}>{post.link_flair_text}</Div>
        )}

        <PostContent post={post} />

        <Div className={styles['post-actions']}>
          <a
            href={`https://reddit.com${post.permalink}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles['post-link']}
          >
            View on Reddit →
          </a>
          <button
            className={styles['post-link']}
            onClick={() =>
              navigator.share?.({
                title: post.title,
                url: window.location.href,
              })
            }
          >
            Share
          </button>
        </Div>
      </Section>
      <CommentsList comments={comments} />
    </Div>
  );
}
