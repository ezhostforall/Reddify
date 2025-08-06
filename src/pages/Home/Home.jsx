import Section from '../../components/Section/Section';
import PostsList from '../../features/posts/PostsList';
export default function Home() {
  return (
    <Section>
      <PostsList subreddit="reactjs" sort="hot" limit={10} after="" />
    </Section>
  );
}
