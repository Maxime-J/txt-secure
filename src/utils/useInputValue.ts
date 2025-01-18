import { ChangeEventHandler, useState, useCallback } from 'react';

type ChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

function useInputValue(initialValue: string): [state: string, changeHandler: ChangeHandler] {
  const [state, setState] = useState<string>(initialValue);

  let timeoutId: number;

  const changeHandler = useCallback<ChangeHandler>((event) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setState(event.target.value);
    }, 300);
  }, []);

  return [state, changeHandler];
}

export default useInputValue;
