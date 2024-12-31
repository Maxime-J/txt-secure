import { useState } from 'react';
import { useFetcher } from 'react-router';

import {
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';

import strings from 'fr-locale';
import styles from './AcceptTerms.module.css';

function AcceptTerms({ children }) {
  const fetcher = useFetcher();
  const [termsOpened, setTermsOpened] = useState(false);
  
  const openTerms = () => {
    if (!fetcher.data) fetcher.load('/conditions');
    setTermsOpened(true);
  };
  
  const closeTerms = () => {
    setTermsOpened(false);
  };

  return (
    <>
    <Alert severity="info" className={styles.info}>
      <div>{`${strings.acceptTerms} `}<a onClick={openTerms} className={styles.link}>{strings.terms}</a></div>
      <div className={styles.child}>{children}</div>
    </Alert>
    <Dialog
      open={termsOpened}
      onClose={closeTerms}
      scroll="body"
    >
      {fetcher.data
        ? <>
          <DialogContent className="server-content" dangerouslySetInnerHTML={{ __html: fetcher.data }} />
          <DialogActions sx={{ justifyContent: 'center' }}>
            <span onClick={closeTerms} className={styles.close}>{strings.close}</span>
          </DialogActions>
          </>
        : <DialogContent><CircularProgress size={20} sx={{ display: 'block' }}/></DialogContent>}
    </Dialog>
    </>
  );
}

export default AcceptTerms;
