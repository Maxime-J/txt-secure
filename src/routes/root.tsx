import { useEffect } from 'react';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

import { ThemeProvider } from '@mui/material/styles';

import Background from 'components/Background';
import Footer from 'components/Footer';
import Error from 'components/Error';
import useRouterMatches from 'utils/useRouterMatches';
import { backgroundQuery } from 'queries';
import { pages } from 'locale.json';

import '../styles/global.css';
import muiTheme from '../styles/mui';
import styles from './root.module.css';

interface RouterContext {
  queryClient: QueryClient,
  showHome?: boolean,
  title?: string,
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  loader: ({ context: { queryClient }}) => {
    return queryClient.ensureQueryData(backgroundQuery);
  },
  staleTime: Infinity,
  errorComponent: Error,
});

function LocationEffects() {
  const { pathname, context: { title } } = useRouterMatches().slice(-1)[0];

  useEffect(() => {
    const root = document.getElementById('root')!;
    if (root.scrollTop !== 0) root.scrollTo(0, 0);

    let newTitle = title ?? '';
    if (newTitle !== '' && pathname !== '/') {
      newTitle += ` | ${pages.titleSuffix}`;
    }
    document.title = newTitle;
  }, [title]);

  return null;
}

function RootComponent() {
  return (
    <>
      <LocationEffects />
      <ThemeProvider theme={muiTheme}>
        <div className={styles.main}>
          <Background />
          <div className={styles.ui}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </>
  );
}
