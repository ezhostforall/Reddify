import { useContext } from 'react';
import { LevelContext } from '../../context/LevelContext';
import styles from './Div.module.css';

export default function Div({ children, variant, className = '', ...rest }) {
  const level = useContext(LevelContext);

  const combinedClassName = [variant ? styles[variant] : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={combinedClassName} {...rest}>
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </div>
  );
}
