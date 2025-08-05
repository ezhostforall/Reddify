import { render, screen } from '@testing-library/react';
import Home from './Home.jsx';

describe('Home Page', () => {
  it('renders the main feed heading', () => {
    render(<Home />);
    expect(screen.getByText(/this will be the main feed/i)).toBeInTheDocument();
  });
});
