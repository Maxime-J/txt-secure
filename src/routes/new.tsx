import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';

import CreatedShare from 'components/new/CreatedShare';
import ShareForm from 'components/new/ShareForm';
import { pages } from 'locale.json';

import { NewShareState } from 'types';

// Virtual file route: path generated from routes.js
export const Route = createFileRoute('/nouveau-lien')({
  component: NewShare,
  beforeLoad: () => ({
    title: pages.newLink.title,
  }),
});

function NewShare() {
  const [share, setShare] = useState<NewShareState | null>(null);

  return (share)
    ? <CreatedShare
        share={share}
        newShare={() => setShare(null)}
      />
    : <ShareForm onCreated={setShare} />;
}
