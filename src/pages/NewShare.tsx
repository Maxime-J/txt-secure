import { useState } from 'react';

import CreatedShare from 'components/new/CreatedShare';
import ShareForm from 'components/new/ShareForm';

import { NewShareState } from 'types';

function NewShare() {
  const [share, setShare] = useState<NewShareState | null>(null);

  return (share)
    ? <CreatedShare
        share={share}
        newShare={() => setShare(null)}
      />
    : <ShareForm onCreated={setShare} />;
}

export default NewShare;
