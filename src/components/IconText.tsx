import { PropsWithChildren, ReactNode } from 'react';
import styles from './IconText.module.css';

interface IconTextProps {
  icon: ReactNode,
}

function IconText({ icon, children }: PropsWithChildren<IconTextProps>){
  return (
    <div className={styles.div}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default IconText;
