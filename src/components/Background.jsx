import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';

import styles from './Background.module.css';

function Background() {
  const [loaded, setLoaded] = useState(false);
  const { file } = useLoaderData();
  
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
      style={{
        '--background': `url(${backgroundURL})`,
        opacity: (loaded) ? 1 : undefined
      }}
    />
  );
}

export default Background;
