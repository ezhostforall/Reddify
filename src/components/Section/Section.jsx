import { useContext } from 'react';
import { LevelContext } from '../../context/LevelContext';
import styles from './Section.module.css';

export default function Section({
  children,
  variant,
  className = '',
  ...rest
}) {
  const level = useContext(LevelContext);

  const combinedClassName = [variant ? styles[variant] : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={combinedClassName} {...rest}>
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}
