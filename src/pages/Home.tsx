import { Link } from 'react-router';

import Fab from '@mui/material/Fab';
import LockIcon from '@mui/icons-material/Lock';

import AppDiv from 'components/AppDiv';

import strings from 'fr-locale';
import styles from './Home.module.css';

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
        <Link to="/nouveau-lien">
          <Fab variant="extended" sx={{ width: '100%', marginTop: '20px' }}>
            {strings.home.button}
          </Fab>
        </Link>
      </AppDiv>
    </div>
  );
}

export default Home;
