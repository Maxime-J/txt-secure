import strings from 'fr-locale';
import styles from './Error.module.css';

function Error() {
  return (
    <div className={styles.error}>
      <strong>{strings.error}</strong>
    </div>
  );
}

export default Error;
