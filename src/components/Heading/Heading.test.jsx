import { render, screen } from '@testing-library/react';
import Heading from './Heading.jsx';
import { LevelContext } from '../../context/LevelContext';

describe('Heading', () => {
  it('renders the correct heading level based on context', () => {
    render(
      <LevelContext.Provider value={2}>
        <Heading>Test Heading</Heading>
      </LevelContext.Provider>
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Test Heading'
    );
  });

  it('applies the correct class name', () => {
    render(
      <LevelContext.Provider value={1}>
        <Heading className="custom-class">Test Heading</Heading>
      </LevelContext.Provider>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
      'custom-class'
    );
  });

  it('throws if not inside a Section (level 0)', () => {
    // Suppress error output for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(
        <LevelContext.Provider value={0}>
          <Heading>Should throw</Heading>
        </LevelContext.Provider>
      )
    ).toThrow('Heading must be inside a Section!');
    spy.mockRestore();
  });
});
