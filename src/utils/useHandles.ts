import { useMatches } from 'react-router';

interface Test {
  showHome?: boolean,
}

function useHandles(): Test {
  const matches = useMatches();
  return matches.reduce((acc, val) => ({ ...acc, ...(val.handle as object) }), {});
}

export default useHandles;
