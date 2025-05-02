import { createFileRoute, useLoaderData } from '@tanstack/react-router';

import AppDiv from 'components/AppDiv';
import { getContentQuery } from 'queries';

export const Route = createFileRoute('/_server')({
  component: FromServer,
  loader: ({ context: { queryClient }, location }) => {
    return queryClient.ensureQueryData(getContentQuery(location.pathname));
  },
  gcTime: 0,
});

function FromServer() {
  const content = useLoaderData({ from: '/_server' });

  return (
    <AppDiv>
      <div className="server-content" dangerouslySetInnerHTML={{ __html: content }} />
    </AppDiv>
  );
}
