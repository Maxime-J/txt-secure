import { useMatches } from 'react-router';

function useHandles() {
  const matches = useMatches();
  return matches.reduce((acc, val) => ({ ...acc, ...val.handle }), {});
}

export default useHandles;
