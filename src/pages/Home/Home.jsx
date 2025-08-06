import Heading from '../../components/Heading/Heading';
import Section from '../../components/Section/Section';
import PostsList from '../../features/posts/PostsList';
export default function Home() {
  return (
    <Section>
      <Heading>This will be the main feed</Heading>
      <PostsList subreddit="reactjs" sort="hot" limit={10} after="" />
    </Section>
  );
}
