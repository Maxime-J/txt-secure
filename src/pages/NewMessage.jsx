import { useState } from 'react';

import MessageCreated from 'components/create/MessageCreated';
import MessageForm from 'components/create/MessageForm';

function NewMessage() {
  const [message, setMessage] = useState({
    link: undefined,
    expiration: undefined,
    burn: false,
  });

  return (message.link)
    ? <MessageCreated
        message={message}
        newMessage={() => setMessage({})}
      />
    : <MessageForm onCreated={setMessage} />;
}

export default NewMessage;
