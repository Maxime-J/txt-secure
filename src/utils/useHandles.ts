import { useMatches } from 'react-router';

interface ConfigHandles {
  showHome?: boolean,
}

function useHandles(): ConfigHandles {
  const matches = useMatches();
  return matches.reduce((acc, val) => ({ ...acc, ...(val.handle as object) }), {});
}

export default useHandles;
