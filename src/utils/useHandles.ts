import { useMatches } from 'react-router';

function useHandles(): Record<string, any> {
  const matches = useMatches();
  return matches.reduce((acc, val) => ({ ...acc, ...(val.handle as object) }), {});
}

export default useHandles;
