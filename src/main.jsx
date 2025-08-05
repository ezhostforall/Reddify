import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider.jsx';
import { LevelProvider } from './context/LevelProvider.jsx';

import store from './app/store.js';
import router from './router.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <LevelProvider>
          <RouterProvider router={router} />
        </LevelProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
