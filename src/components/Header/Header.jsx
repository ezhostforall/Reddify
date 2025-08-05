import styles from './Header.module.css';
import { NavLink } from 'react-router';

export default function Header() {
  return (
    <header className={styles.header}>
      <p className={styles.textLogo}>
        Redd<span className={styles.logoAccent}>ify</span>
      </p>
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
