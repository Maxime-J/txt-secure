import { memo, useEffect, useMemo, useState } from 'react';
import { createFileRoute, useLoaderData, useLocation } from '@tanstack/react-router';

import AppDiv from 'components/AppDiv';
import DecryptedShare from 'components/view/DecryptedShare';
import PasswordInput from 'components/PasswordInput';
import Crypto from 'utils/Crypto';
import useInputValue from 'utils/useInputValue';
import { shareQuery } from 'queries';
import { strings } from 'locale.json';

import styles from './view.module.css';

// Virtual file route: path generated from routes.js
export const Route = createFileRoute('/$shareId')({
  component: ViewShare,
  loader: ({ context: { queryClient }, params }) => {
    return queryClient.ensureQueryData(shareQuery(params.shareId));
  },
  gcTime: 0,
});

const PasswordCheck = memo<typeof PasswordInput>(({ onChange }) => (
  <PasswordInput onChange={onChange} />
));
PasswordCheck.displayName = 'PasswordCheck';

function ViewShare() {
  const share = useLoaderData({ from: '/$shareId' });
  const { hash } = useLocation();

  const [notFound, setNotFound] = useState(!share);
  const [password, onPasswordChange] = useInputValue('');
  const [content, setContent] = useState<string>();

  const crypto = useMemo(() => {
    if (notFound) return;
    const key = hash.split('&', 1)[0];

    return Crypto({
      key58: key,
      vector64: share.vector,
      salt64: share.salt,
    });
  }, []);

  const render = () => {
    if (notFound) return <strong className={styles.invalid}>{strings.linkExpiredOrInvalid}</strong>;
    if (content) return <DecryptedShare content={content} expiration={share.expirated_at} burn={share.burn} />;
    if (share.with_password) return <PasswordCheck onChange={onPasswordChange} />;
  };

  useEffect(() => {
    if (notFound || share.with_password && password === '') return;
    (async () => {
      try {
        const decrypted = await crypto!.decrypt(share.encrypted, password);
        setContent(decrypted);
      } catch {
        if (!share.with_password) setNotFound(true);
      }
    })();
  }, [password]);

  useEffect(() => {
    if (notFound) return;

    const expiration = share.expirated_at * 1000;

    const intervalId = setInterval(() => {
      if (Date.now() >= expiration) window.location.reload();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [notFound]);

  return (
    <AppDiv>
      {render()}
    </AppDiv>
  );
}
