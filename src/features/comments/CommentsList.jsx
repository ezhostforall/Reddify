import Div from '../../components/Div/Div';
import Section from '../../components/Section/Section';
import Heading from '../../components/Heading/Heading';
import styles from './CommentsList.module.css';

// Utility to decode HTML entities
function decodeHtml(html) {
  const txt =
    typeof window !== 'undefined' ? document.createElement('textarea') : null;
  if (!txt) return html;
  txt.innerHTML = html;
  return txt.value;
}

// Helper to extract replies as an array of comment data
function getReplies(replies) {
  if (
    !replies ||
    replies === '' ||
    !replies.data ||
    !Array.isArray(replies.data.children)
  )
    return [];
  return replies.data.children
    .filter((child) => child.kind === 't1')
    .map((child) => {
      const data = child.data;
      return {
        ...data,
        replies: getReplies(data.replies),
      };
    });
}

function Comment({ comment }) {
  const html = comment.body_html ? decodeHtml(comment.body_html) : comment.body;

  // Always normalize replies for every comment
  const replies = getReplies(comment.replies);

  return (
    <li className={styles.comment}>
      <div>
        <strong>u/{comment.author}</strong>
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
      {replies.length > 0 && (
        <ul className={styles.replies}>
          {replies.map((reply) => (
            <Comment key={reply.id} comment={reply} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function CommentsList({ comments }) {
  if (!comments || comments.length === 0) {
    return (
      <Section>
        <Heading level={3}>Comments</Heading>
        <p>No comments yet.</p>
      </Section>
    );
  }

  return (
    <Section>
      <Heading level={3}>Comments</Heading>
      <ul className={styles.commentsList}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
    </Section>
  );
}
