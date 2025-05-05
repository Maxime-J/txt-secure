import { useRouter, useRouterState } from '@tanstack/react-router';

function useRouterMatches() {
  useRouterState({
    select: ({ resolvedLocation }) => resolvedLocation,
  });

  const router = useRouter();
  return router.__store.state.matches;
}

export default useRouterMatches;
