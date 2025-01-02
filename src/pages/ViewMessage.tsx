import { memo, useEffect, useMemo, useState } from 'react';
import { useLoaderData, useLocation } from 'react-router';

import AppDiv from 'components/AppDiv';
import DecryptedMessage from 'components/view/DecryptedMessage';
import PasswordInput from 'components/PasswordInput';

import Crypto from 'utils/Crypto';
import useTextInput from 'utils/useTextInput';

import strings from 'fr-locale';
import styles from './ViewMessage.module.css';

import { MessageData } from 'types';

const PasswordCheck = memo<typeof PasswordInput>(({ onChange }) => (
  <PasswordInput onChange={onChange} />
));
PasswordCheck.displayName = 'PasswordCheck';

function ViewMessage() {
  const message = useLoaderData<MessageData>();
  const { hash } = useLocation();

  const [notFound, setNotFound] = useState(!message);
  const [password, onPasswordChange] = useTextInput('');
  const [content, setContent] = useState<string>();

  const crypto = useMemo(() => {
    if (notFound) return;
    let key = hash.substring(1);
    key = key.split('&', 1)[0];

    return Crypto({
      key58: key,
      vector64: message.vector,
      salt64: message.salt,
    });
  }, []);

  const render = () => {
    if (notFound) return <strong className={styles.invalid}>{strings.linkExpiredOrInvalid}</strong>;
    if (content) return <DecryptedMessage content={content} expiration={message.expirated_at} burn={message.burn} />;
    if (message?.with_password) return <PasswordCheck onChange={onPasswordChange} />;
  };

  useEffect(() => {
    if (notFound || message.with_password && password === '') return;
    (async () => {
      try {
        const decrypted = await crypto!.decrypt(message.encrypted, password);
        setContent(decrypted);
      } catch {
        if (!message.with_password) setNotFound(true);
      }
    })();
  }, [password]);

  return (
    <AppDiv>
      {render()}
    </AppDiv>
  );
}

export default ViewMessage;
