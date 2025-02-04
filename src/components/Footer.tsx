import { Link, useLoaderData } from 'react-router';

import HomeIcon from '@mui/icons-material/Home';

import useHandle from 'utils/useHandle';

import strings from 'fr-locale';
import styles from './Footer.module.css';

import { BackgroundInfos } from 'types';

function Footer() {
  const { location, author, link } = useLoaderData<BackgroundInfos>();
  const { showHome } = useHandle();

  return (
    <div className={styles.footer}>
      <a
        href={link}
        rel="noopener noreferrer nofollow"
        target="_blank"
      >
        {`${strings.footer.pictureBy} ${author} - ${location}`}
      </a>
      {showHome && <Link to="/" className={styles.home}><HomeIcon /></Link>}
      <div>
        <Link to="/conditions">{strings.terms}</Link>
        {' - '}
        <Link to="/a-propos">{strings.footer.about}</Link>
      </div>
    </div>
  );
}

export default Footer;
