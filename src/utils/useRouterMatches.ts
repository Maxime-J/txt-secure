import { useRouter, useRouterState } from '@tanstack/react-router';

function useRouterMatches() {
  useRouterState({
    select: ({ resolvedLocation }) => resolvedLocation,
  });

  const router = useRouter();
  return router.stores.matches.get();
}

export default useRouterMatches;
