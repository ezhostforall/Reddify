import Div from '../../components/Div/Div';
import Heading from '../../components/Heading/Heading';
import styles from './posts.module.css';
import { Link } from 'react-router';
export default function PostItem({ post }) {
  return (
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
      <Heading className={styles.postTitle}>{post.title}</Heading>
      <Div className={styles.postMeta}>
        <p className={styles.metaText}>Posted by u/{post.author}</p>
        <p className={styles.metaText}>
          👍 {post.score} | 💬 {post.num_comments}
        </p>
      </Div>
      <Link to={`/post/${post.id}`} className={styles.viewPostLink}>
        View post →
      </Link>
    </Div>
  );
}
