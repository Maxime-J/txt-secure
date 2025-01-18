import { PropsWithChildren, ReactNode } from 'react';
import styles from './IconSpan.module.css';

interface IconSpanProps {
  icon: ReactNode,
}

function IconSpan({ icon, children }: PropsWithChildren<IconSpanProps>){
  return (
    <div className={styles.div}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

export default IconSpan;
