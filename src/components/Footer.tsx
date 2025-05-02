import { Link, useLoaderData, useMatches } from '@tanstack/react-router';

import HomeIcon from '@mui/icons-material/Home';

import { pages, strings } from 'locale.json';

import styles from './Footer.module.css';

function Footer() {
  const { location, author, link } = useLoaderData({ from: '__root__' });
  const { context: { showHome } } = useMatches().slice(-1)[0];

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
        <Link to={pages.terms.path}>{strings.terms}</Link>
        {' - '}
        <Link to={pages.about.path}>{strings.footer.about}</Link>
      </div>
    </div>
  );
}

export default Footer;
