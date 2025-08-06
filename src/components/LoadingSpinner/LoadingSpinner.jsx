import styles from './LoadingSpinner.module.css';

export default function LoadingSpinner({ 
  size = 'large', 
  color = 'primary', 
  centered = true 
}) {
  const containerClasses = [
    styles.loadingSpinner,
    styles[size],
    styles[color],
    centered && styles.centered
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      <div className={styles.spinner}></div>
    </div>
  );
}