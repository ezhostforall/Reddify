import { render, screen } from '@testing-library/react';
import Div from './Div.jsx';
import { LevelProvider } from '../../context/LevelProvider.jsx';

describe('Div Component', () => {
  it('renders children correctly', () => {
    render(
      <LevelProvider>
        <Div>Test Child</Div>
      </LevelProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies variant className when variant prop is provided', () => {
    render(
      <LevelProvider>
        <Div variant="primary">Test Child</Div>
      </LevelProvider>
    );
    const divElement = screen.getByText('Test Child');
    expect(divElement).toHaveClass('primary'); // Assuming 'primary' is a valid class in styles
  });

  it('combines custom className with variant className', () => {
    render(
      <LevelProvider>
        <Div variant="secondary" className="custom-class">
          Test Child
        </Div>
      </LevelProvider>
    );
    const divElement = screen.getByText('Test Child');
    expect(divElement).toHaveClass('secondary custom-class'); // Assuming 'secondary' is a valid class in styles
  });

  it('increments level context value for children', () => {
    render(
      <LevelProvider>
        <Div>
          <Div>Nested Child</Div>
        </Div>
      </LevelProvider>
    );
    const nestedDiv = screen.getByText('Nested Child');
    expect(nestedDiv).toBeInTheDocument();
  });
});
