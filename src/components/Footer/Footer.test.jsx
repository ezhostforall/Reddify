import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';
import { useTheme } from '../../hooks/useTheme.js';

jest.mock('../../hooks/useTheme.js');

describe('Footer', () => {
  it('renders the footer content', () => {
    useTheme.mockReturnValue({ theme: 'light' });
    render(<Footer websiteName="reddify" />);
    expect(screen.getByText(/reddify/i)).toBeInTheDocument();
  });
});
