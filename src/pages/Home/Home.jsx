import { useSelector } from 'react-redux';
import Section from '../../components/Section/Section';
import PostsList from '../../features/posts/PostsList';
import Button from '../../components/Button/Button';

export default function Home() {
  const { postsPerPage, defaultSort } = useSelector(
    (state) => state.user.preferences
  );

  console.log(postsPerPage, defaultSort);

  return (
    <Section>
      <PostsList title="Browse Posts" showFilter={true} />
      <Button
        variant="backToTop"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ˄
      </Button>
    </Section>
  );
}
