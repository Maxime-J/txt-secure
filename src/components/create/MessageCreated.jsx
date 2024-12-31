import { useEffect, useState } from 'react';

import { Button, Fab, Tooltip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ContentCopyIcon from '@mui/icons-material/ContentCopyOutlined';

import AppDiv from 'components/AppDiv';
import IconText from 'components/IconText';

import strings from 'fr-locale';
import styles from './MessageCreated.module.css';

function MessageCreated({ message, newMessage }) {
  const [copyDone, setCopyDone] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(message.link);
    setCopyDone(true);
  };

  const selectLink = ({ target }) => {
    const selection = window.getSelection();
    selection.setBaseAndExtent(target, 0, target, 1);
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
          <pre onClick={selectLink}>{message.link}</pre>
        </div>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            placement="top"
            open={copyDone}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={strings.created.copySuccess}
            describeChild={true}
          >
            <Button
              color="inherit"
              onClick={copyLink}
            >
              <ContentCopyIcon />
              <span>{strings.created.copy}</span>
            </Button>
          </Tooltip>
        </div>
      </div>
      
      <div className={styles.text}>
        <IconText icon={<AccessTimeIcon fontSize="inherit"/>}>
          {`${strings.created.validUntil} ${message.expiration}`}
          {message.burn && ` (${strings.created.burnInfo})`}
        </IconText>
      </div>
    </AppDiv>
    <div className={styles.new}>
      <Fab variant="extended" onClick={newMessage}>
        {strings.created.newMessage}
      </Fab>
    </div>
    </>
  );
}

export default MessageCreated;
