import { useContext } from 'react';
import { LevelContext } from '../../context/LevelContext';
import styles from './Heading.module.css';

export default function Heading({
  children,
  variant,
  className = '',
  ...rest
}) {
  const level = useContext(LevelContext);

  const combinedClassName = [variant ? styles[variant] : '', className]
    .filter(Boolean)
    .join(' ');

  switch (level) {
    case 0:
      throw Error('Heading must be inside a Section!');
    case 1:
      return (
        <h1 className={combinedClassName} {...rest}>
          {children}
        </h1>
      );
    case 2:
      return (
        <h2 className={combinedClassName} {...rest}>
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 className={combinedClassName} {...rest}>
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 className={combinedClassName} {...rest}>
          {children}
        </h4>
      );
    case 5:
      return (
        <h5 className={combinedClassName} {...rest}>
          {children}
        </h5>
      );
    case 6:
      return (
        <h6 className={combinedClassName} {...rest}>
          {children}
        </h6>
      );
    default:
      throw Error('Unknown level: ' + level);
  }
}
