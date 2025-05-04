import { PropsWithChildren, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import {
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { getContentQuery } from 'queries';
import { pages, strings } from 'locale.json';

import styles from './AcceptTerms.module.css';

function AcceptTerms({ children }: PropsWithChildren) {
  const [termsOpened, setTermsOpened] = useState(false);

  const query = useQuery({
    ...getContentQuery(pages.terms.path),
    enabled: false,
  });

  const openTerms = () => {
    if (!query.data) query.refetch();
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
        {query.data
          ? <>
              <DialogContent className="server-content" dangerouslySetInnerHTML={{ __html: query.data }} />
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
