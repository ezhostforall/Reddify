import { createBrowserRouter } from 'react-router';
import App from './App.jsx';
import Home from './pages/Home/Home.jsx';
import Post from './pages/Post/Post.jsx';
import Search from './pages/Search/Search.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'post/:postId',
        element: <Post />,
      },
      {
        path: 'search',
        element: <Search />,
      },
    ],
  },
]);

export default router;
