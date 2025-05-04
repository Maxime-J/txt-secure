import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';

import AcceptTerms from 'components/new/AcceptTerms';
import AppDiv from 'components/AppDiv';
import PasswordInput from 'components/PasswordInput';
import Crypto from 'utils/Crypto';
import { formatDate } from 'utils/date';
import useInputValue from 'utils/useInputValue';
import { shareMutation } from 'queries';
import { strings } from 'locale.json';

import styles from './ShareForm.module.css';

import { NewShareState } from 'types';

const VALIDITY_PERIODS: Array<keyof typeof strings.form.periods> = [
  '5m',  // strings.form.periods.5m
  '10m', // strings.form.periods.10m
  '1h',  // strings.form.periods.1h
  '1d',  // strings.form.periods.1d
  '1w',  // strings.form.periods.1w
];

interface ShareFormProps {
  onCreated: (data: NewShareState) => void,
}

function ShareForm({ onCreated }: ShareFormProps) {
  const [content, onContentChange] = useInputValue('');
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const burnRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLInputElement>(null);

  const mutation = useMutation(shareMutation);

  const create = async () => {
    const { encrypt, params: cryptoParams } = Crypto();
    const encrypted = await encrypt(content, passwordEnabled ? passwordRef.current!.value : '');

    try {
      const { id, expirated_at } = await mutation.mutateAsync({
        encrypted,
        vector: cryptoParams.vector64,
        salt: cryptoParams.salt64,
        with_password: passwordEnabled && passwordRef.current!.value !== '',
        validity: periodRef.current!.value,
        burn: burnRef.current!.checked,
      });

      const link = `${location.origin}/${id}#${cryptoParams.key58}`;

      onCreated({
        link,
        expiration: formatDate(expirated_at * 1000),
        burn: burnRef.current!.checked,
      });
    } catch {
      // Re-render triggered by mutation error
    }
  };

  return (
    <>
      <AppDiv>
        <span className={styles.label}>{strings.form.content}</span>
        <textarea
          onChange={onContentChange}
          autoFocus
          spellCheck="false"
          maxLength={1000}
          className={styles.textarea}
        />
        <div className={styles.counter}><span>{`${content.length}/1000`}</span></div>
      </AppDiv>
      <AppDiv>
        <div className={styles.settings}>
          <div>
            <span className={styles.label}>{strings.form.validity}</span>
            <Select
              variant="outlined"
              defaultValue="1w"
              inputProps={{ ref: periodRef }}
              className={styles.select}
            >
              {VALIDITY_PERIODS.map((validityPeriod) => (
                <MenuItem
                  key={validityPeriod}
                  value={validityPeriod}
                >
                  {strings.form.periods[validityPeriod]}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div>
            <div>
              <span className={styles.label}>{strings.form.burn}</span>
              <Switch inputRef={burnRef} />
            </div>
            <div>
              <span className={styles.label}>{strings.form.password}</span>
              <Switch
                onChange={() => { setPasswordEnabled(!passwordEnabled) }}
                checked={passwordEnabled}
              />
            </div>
          </div>
        </div>
      </AppDiv>
      {passwordEnabled && (
        <AppDiv>
          <div>
            <PasswordInput inputRef={passwordRef} />
          </div>
        </AppDiv>
      )}
      {mutation.isError && <Alert severity="error">{strings.form.ipLimited}</Alert>}
      <AcceptTerms>
        <Button
          variant="contained"
          disabled={content.length === 0 || mutation.isPending}
          onClick={create}
        >
          {strings.form.submit}
        </Button>
        {mutation.isPending && (
          <CircularProgress
            size={20}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-10px',
              marginLeft: '-10px',
            }}
          />
        )}
      </AcceptTerms>
    </>
  );
}

export default ShareForm;
