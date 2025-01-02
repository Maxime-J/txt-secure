import { PropsWithChildren } from 'react';
import styles from './AppDiv.module.css';

function AppDiv({ children }: PropsWithChildren) {
  return (
    <div className={styles.div}>
      {children}
    </div>
  );
};

export default AppDiv;
