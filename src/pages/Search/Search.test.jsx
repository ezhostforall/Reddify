import { render, screen } from '@testing-library/react';
import Search from './Search.jsx';

describe('Search Page', () => {
  it('renders the search title', () => {
    render(<Search />);
    expect(screen.getByText(/search page/i)).toBeInTheDocument();
  });
});
