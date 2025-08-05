import { LevelContext } from './LevelContext';

export const LevelProvider = ({ children }) => {
  return <LevelContext.Provider value={0}>{children}</LevelContext.Provider>;
};
