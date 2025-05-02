import { useEffect } from 'react';
import { Outlet, createRootRouteWithContext, useMatches } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';

import { ThemeProvider } from '@mui/material/styles';

import Background from 'components/Background';
import Footer from 'components/Footer';
import Error from 'components/Error';
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

function RootComponent() {
  const { pathname, context: { title } } = useMatches().slice(-1)[0];

  useEffect(() => {
    let newTitle = title ?? '';
    if (newTitle !== '' && pathname !== '/') {
      newTitle += ` | ${pages.titleSuffix}`;
    }
    document.title = newTitle;
  }, [title]);

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
