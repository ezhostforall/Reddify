import { render, screen } from '@testing-library/react';
import Post from './Post.jsx';

describe('Post Page', () => {
  it('renders the post title', () => {
    render(<Post />);
    expect(screen.getByText(/this is a post page/i)).toBeInTheDocument();
  });
});
