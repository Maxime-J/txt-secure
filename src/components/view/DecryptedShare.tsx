import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';

import IconSpan from 'components/IconSpan';
import Timer from 'components/view/Timer';
import { strings } from 'locale.json';

import styles from './DecryptedShare.module.css';

interface DecryptedShareProps {
  content: string,
  /** Unix timestamp in seconds */
  expiratedAt: number,
  burn: boolean,
}

function DecryptedShare({ content, expiratedAt, burn }: DecryptedShareProps) {
  return (
    <>
      <div>
        <pre className={styles.pre}>{content}</pre>
      </div>

      <div className={styles.infos}>
        <IconSpan icon={<LockIcon fontSize="inherit" />}>
          {`${strings.decrypted.info} `}
          <a
            href="/"
            rel="noreferrer"
            className={styles.link}
          >
            {strings.hostname}
          </a>
        </IconSpan>
        <IconSpan icon={<AccessTimeIcon fontSize="inherit" />}>
          {burn
            ? `${strings.decrypted.readableFor} `
            : `${strings.decrypted.expiresIn} `}
          <Timer timestamp={expiratedAt * 1000} />
        </IconSpan>
      </div>
    </>
  );
}

export default DecryptedShare;
