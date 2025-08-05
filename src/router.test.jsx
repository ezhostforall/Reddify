import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router';
import router from './router.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx';
import { LevelProvider } from './context/LevelProvider.jsx';
import { Provider } from 'react-redux';
import store from './app/store.js';

function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <Provider store={store}>
        <LevelProvider>{ui}</LevelProvider>
      </Provider>
    </ThemeProvider>
  );
}

describe('App Router', () => {
  it('renders Home page at root path', () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/'],
    });
    renderWithProviders(<RouterProvider router={memoryRouter} />);
    expect(screen.getByText(/this will be the main feed/i)).toBeInTheDocument();
  });

  it('renders Search page at /search', () => {
    const memoryRouter = createMemoryRouter(router.routes, {
      initialEntries: ['/search'],
    });
    renderWithProviders(<RouterProvider router={memoryRouter} />);
    expect(screen.getByText(/search page/i)).toBeInTheDocument();
  });
});
