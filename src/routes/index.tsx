import { Link, createFileRoute } from '@tanstack/react-router';

import Fab from '@mui/material/Fab';
import LockIcon from '@mui/icons-material/Lock';

import AppDiv from 'components/AppDiv';
import { pages, strings } from 'locale.json';

import styles from './index.module.css';

export const Route = createFileRoute('/')({
  component: Home,
  staticData: {
    title: pages.home.title,
  },
});

function Home() {
  return (
    <div className={styles.home}>
      <AppDiv>
        <span className={styles.description}>
          {strings.home.description}
        </span>
        <div className={styles.info}>
          <LockIcon />
          <p>{strings.home.about}</p>
        </div>
        <Link to={pages.newLink.path}>
          <Fab variant="extended" sx={{ width: '100%', marginTop: '20px' }}>
            {strings.home.button}
          </Fab>
        </Link>
      </AppDiv>
    </div>
  );
}
