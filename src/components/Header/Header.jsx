import styles from './Header.module.css';
import { NavLink } from 'react-router';
import SearchBar from '../SearchBar/SearchBar';

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.textLogo}>
        Red<span className={styles.logoAccent}>dify</span>
      </p>
      <SearchBar />
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.navLink}>
          Home
        </NavLink>
        <NavLink to="/search" className={styles.navLink}>
          Search
        </NavLink>
      </nav>
    </header>
  );
}
