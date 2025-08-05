import { render, screen } from '@testing-library/react';
import Header from './Header.jsx';
import { MemoryRouter } from 'react-router';

describe('Header', () => {
  it('renders the header content', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText(/red/i)).toBeInTheDocument();
  });
});
