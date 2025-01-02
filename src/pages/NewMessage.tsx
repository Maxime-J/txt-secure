import { useState } from 'react';

import MessageCreated from 'components/create/MessageCreated';
import MessageForm from 'components/create/MessageForm';

import { NewMessageState } from 'types';

function NewMessage() {
  const [message, setMessage] = useState<NewMessageState | null>(null);

  return (message)
    ? <MessageCreated
        message={message}
        newMessage={() => setMessage(null)}
      />
    : <MessageForm onCreated={setMessage} />;
}

export default NewMessage;
