import { useMatches } from 'react-router';

interface ConfigHandle {
  showHome?: boolean,
  title?: string,
}

function useHandle(): ConfigHandle {
  const matches = useMatches();
  const currentRoute = matches[matches.length - 1];
  return currentRoute.handle ?? {};
}

export default useHandle;
