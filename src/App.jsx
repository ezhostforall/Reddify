import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <header>
        <h1>Reddify</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2023 Reddify</p>
      </footer>
    </>
  );
}

export default App;
