import { useLoaderData } from 'react-router';
import AppDiv from 'components/AppDiv';

function FromServer() {
  const content = useLoaderData<string>();
  return (
    <AppDiv>
      <div className="server-content" dangerouslySetInnerHTML={{ __html: content }} />
    </AppDiv>
  );
}

export default FromServer;
