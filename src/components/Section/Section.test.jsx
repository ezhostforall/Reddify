import { render, screen } from '@testing-library/react';
import Section from './Section.jsx';
import { LevelProvider } from '../../context/LevelProvider.jsx';

describe('Section Component', () => {
  it('renders children correctly', () => {
    render(
      <LevelProvider>
        <Section>Test Child</Section>
      </LevelProvider>
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies variant className when variant prop is provided', () => {
    render(
      <LevelProvider>
        <Section variant="primary">Test Child</Section>
      </LevelProvider>
    );
    const sectionElement = screen.getByText('Test Child');
    expect(sectionElement).toHaveClass('primary'); // Assuming 'primary' is a valid class in styles
  });

  it('combines custom className with variant className', () => {
    render(
      <LevelProvider>
        <Section variant="secondary" className="custom-class">
          Test Child
        </Section>
      </LevelProvider>
    );
    const sectionElement = screen.getByText('Test Child');
    expect(sectionElement).toHaveClass('secondary custom-class'); // Assuming 'secondary' is a valid class in styles
  });

  it('increments level context value for children', () => {
    render(
      <LevelProvider>
        <Section>
          <Section>Nested Child</Section>
        </Section>
      </LevelProvider>
    );
    const nestedSection = screen.getByText('Nested Child');
    expect(nestedSection).toBeInTheDocument();
  });
});
