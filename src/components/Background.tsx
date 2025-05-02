import { CSSProperties, useEffect, useState } from 'react';
import { useLoaderData } from '@tanstack/react-router';

import styles from './Background.module.css';

interface BackgroundCSS extends CSSProperties {
  '--background': string,
}

function Background() {
  const [loaded, setLoaded] = useState(false);
  const { file } = useLoaderData({ from: '__root__' });

  const backgroundURL = `/backgrounds/${file}`;

  useEffect(() => {
    const img = document.createElement('img');
    img.addEventListener('load', () => {
      setLoaded(true);
    });
    img.src = backgroundURL;
  }, []);

  return (
    <div
      className={styles.background}
      style={
        {
          '--background': `url(${backgroundURL})`,
          opacity: (loaded) ? 1 : undefined
        } as BackgroundCSS
      }
    />
  );
}

export default Background;
