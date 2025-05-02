import { ChangeEventHandler, Ref, useState } from 'react';

import { IconButton, Input, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';

import { strings } from 'locale.json';

interface PasswordInputProps {
  inputRef?: Ref<HTMLInputElement>,
  onChange?: ChangeEventHandler<HTMLInputElement>,
}

function PasswordInput({ inputRef, onChange }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const changeVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={(e) => {e.preventDefault()}}>
      <Input
        {...{ inputRef, onChange }}
        placeholder={strings.password}
        autoFocus
        type={showPassword ? 'text' : 'password'}
        inputProps={{ autoComplete: 'off' }}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton onClick={changeVisibility}>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        )}
      />
    </form>
  );
}

export default PasswordInput;
