import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';

import { ThemeProvider } from '@mui/material/styles';

import Background from 'components/Background';
import Footer from 'components/Footer';

import useHandle from 'utils/useHandle';

import strings from 'fr-locale';
import styles from './Layout.module.css';

import muiTheme from './styles/mui';
import './styles/global.css';

function Layout() {
  const location = useLocation();
  const { title } = useHandle();

  useEffect(() => {
    const root = document.getElementById('root')!;
    if (root.scrollTop !== 0) root.scrollTo(0, 0);

    let newTitle = title ?? '';

    if (newTitle != '' && location.pathname != '/') {
      newTitle = `${title} - ${strings.hostname}`;
    }

    document.title = newTitle;
  }, [location]);

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={styles.main}>
        <Background />
        <div className={styles.ui}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default Layout;
