import styles from './Footer.module.css';
import ThemeToggle from '../ThemeToggle/ThemeToggle';

export default function Footer({
  websiteName = 'Reddify',
  copyrightDetails = 'All rights reserved.',
}) {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>
        &copy; {new Date().getFullYear()} {websiteName}. {copyrightDetails}
      </p>
      <ThemeToggle />
    </footer>
  );
}
