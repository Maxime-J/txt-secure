import IconText from 'components/IconText';
import Timer from 'components/view/Timer';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LockIcon from '@mui/icons-material/Lock';

import strings from 'fr-locale';
import styles from './DecryptedMessage.module.css';

import { MessageDecrypted } from 'types';

function DecryptedMessage({ content, expiration, burn }: MessageDecrypted) {
  return (
    <>
    <div>
      <pre className={styles.pre}>{content}</pre>
    </div>

    <div className={styles.infos}>
      <IconText icon={<LockIcon fontSize="inherit" />}>
        {`${strings.decrypted.info} `}
        <a
          href="/"
          rel="noreferrer"
          target="_blank"
          className={styles.link}
        >
          {strings.hostname}
        </a>
      </IconText>
      <IconText icon={<AccessTimeIcon fontSize="inherit" />}>
        { burn
          ? `${strings.decrypted.deleted} `
          : `${strings.decrypted.deletedIn} `
        }
        <Timer timestamp={expiration * 1000} />
      </IconText>
    </div>
    </>
  );
}

export default DecryptedMessage;
