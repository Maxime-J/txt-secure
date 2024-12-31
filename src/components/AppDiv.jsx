import styles from './AppDiv.module.css';

function AppDiv({ children }) {
  return (
    <div className={styles.div}>
      {children}
    </div>
  );
};

export default AppDiv;
