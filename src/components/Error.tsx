import { strings } from 'locale.json';

import styles from './Error.module.css';

function Error() {
  return (
    <div className={styles.error}>
      <strong>{strings.error}</strong>
    </div>
  );
}

export default Error;
