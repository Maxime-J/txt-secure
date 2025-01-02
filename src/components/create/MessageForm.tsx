import { useRef, useState } from 'react';

import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Switch,
} from '@mui/material';

import AcceptTerms from 'components/create/AcceptTerms';
import AppDiv from 'components/AppDiv';
import PasswordInput from 'components/PasswordInput';

import Crypto from 'utils/Crypto';
import { createMessage } from 'utils/api';
import { formatDate } from 'utils/date';
import useTextInput from 'utils/useTextInput';

import strings from 'fr-locale';
import styles from './MessageForm.module.css';

import { NewMessageState } from 'types';

const VALIDITY_PERIODS = [
  '5m',  //{strings.form.periods.5m}
  '10m', //{strings.form.periods.10m}
  '1h',  //{strings.form.periods.1h}
  '1d',  //{strings.form.periods.1d}
  '1w',  //{strings.form.periods.1w}
];

interface MessageFormProps {
  onCreated: (data: NewMessageState) => void,
}

interface FormState {
  sending?: boolean,
  error?: string,
}

function MessageForm({ onCreated }: MessageFormProps) {
  const [content, onContentChange] = useTextInput('');
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [formState, setFormState] = useState<FormState>({});
  const passwordRef = useRef<HTMLInputElement>(null);
  const burnRef = useRef<HTMLInputElement>(null);
  const periodRef = useRef<HTMLInputElement>(null);

  const create = async () => {
    const { encrypt, params: cryptoParams } = Crypto();
    const encrypted = await encrypt(content, passwordEnabled ? passwordRef.current!.value : '');

    const { error, id, expirated_at } = await createMessage({
      encrypted,
      vector: cryptoParams.vector64,
      salt: cryptoParams.salt64,
      with_password: !!(passwordEnabled && passwordRef.current!.value.length),
      validity: periodRef.current!.value,
      burn: burnRef.current!.checked,
    });

    if (error) {
      setFormState({ error });
      return;
    }

    const link = `${location.origin}/${id}#${cryptoParams.key58}`;

    onCreated({
      link,
      expiration: formatDate(expirated_at * 1000),
      burn: burnRef.current!.checked,
    });
  };

  const togglePassword = () => {
    setPasswordEnabled(!passwordEnabled);
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
            defaultValue={'1w'}
            variant="outlined"
            inputProps={{ ref: periodRef }}
            className={styles.select}
          >
            {VALIDITY_PERIODS.map((validityPeriod) => (
              <MenuItem
                key={validityPeriod}
                value={validityPeriod}
              >
                {strings.form.periods[validityPeriod as keyof typeof strings.form.periods]}
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
              onChange={togglePassword}
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
    {formState.error && (
      /**
       * Errors:
       * {strings.form.errors.ip}
       */
      <Alert severity="error">{strings.form.errors[formState.error as keyof typeof strings.form.errors]}</Alert>
    )}
    <AcceptTerms>
      <Button
        disabled={content.length === 0 || formState.sending}
        variant="contained"
        onClick={() => {
          setFormState({ sending: true });
          create();
        }}
      >
        {strings.form.submit}
      </Button>
      {formState.sending && (
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

export default MessageForm;
