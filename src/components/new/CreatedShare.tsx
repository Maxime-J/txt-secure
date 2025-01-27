import { useEffect, useState } from 'react';

import { Button, Fab, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopyOutlined';

import AppDiv from 'components/AppDiv';
import IconSpan from 'components/IconSpan';

import strings from 'fr-locale';
import styles from './CreatedShare.module.css';

import { NewShareState } from 'types';

interface CreatedShareProps {
  share: NewShareState,
  newShare: () => void,
}

function CreatedShare({ share, newShare }: CreatedShareProps) {
  const [copyDone, setCopyDone] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(share.link);
    setCopyDone(true);
  };

  const selectLink = ({ target }: React.MouseEvent) => {
    (target as HTMLInputElement).select();
  };

  useEffect(() => {
    if (copyDone) setTimeout(() => { setCopyDone(false) }, 1500);
  }, [copyDone]);

  return (
    <>
    <AppDiv>
      <span className={styles.text}>
        {strings.created.title}
      </span>

      <div className={styles.link}>
        <div>
          <input readOnly value={share.link} onClick={selectLink} />
        </div>
        <div>
          <Tooltip
            placement="top"
            open={copyDone}
            title={strings.created.copySuccess}
            describeChild={true}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            slotProps={{
              popper: {
                disablePortal: true,
              }
            }}
          >
            <Button
              variant="contained"
              disableElevation
              onClick={copyLink}
            >
              <ContentCopyIcon />
              <span>{strings.created.copy}</span>
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className={styles.text}>
        <IconSpan icon={<AccessTimeIcon fontSize="inherit"/>}>
          {`${strings.created.expiryOn} ${share.expiration}`}
          {share.burn && ` - ${strings.created.burnInfo}`}
        </IconSpan>
      </div>
    </AppDiv>
    <div className={styles.new}>
      <Fab variant="extended" onClick={newShare}>
        {strings.created.newShare}
      </Fab>
    </div>
    </>
  );
}

export default CreatedShare;
