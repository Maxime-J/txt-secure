import { useState, useCallback } from 'react';

function useTextInput(initialValue) {
  const [state, setState] = useState(initialValue);

  let timeoutId;

  const changeHandler = useCallback((event) => {
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      setState(event.target.value);
    }, 300);
  }, []);

  return [state, changeHandler];
}

export default useTextInput;
