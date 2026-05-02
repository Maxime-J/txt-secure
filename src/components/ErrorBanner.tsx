import { strings } from 'locale.json';

import styles from './ErrorBanner.module.css';

function ErrorBanner() {
  return (
    <div className={styles.banner}>
      <strong>{strings.error}</strong>
    </div>
  );
}

export default ErrorBanner;
