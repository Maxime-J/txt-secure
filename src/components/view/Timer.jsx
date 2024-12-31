import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'utils/date';

function Timer({ timestamp, onElapsed }) {
  const [elapsed, setElapsed] = useState(false);
  const [distance, setDistance] = useState(formatDistanceToNow(timestamp));

  useEffect(() => {
    if (!elapsed && Date.now() >= timestamp) {
      onElapsed();
      setElapsed(true);
    }

    const intervalId = setInterval(() => {
      const newDistance = formatDistanceToNow(timestamp);
      if (newDistance !== distance) setDistance(newDistance);
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [distance, elapsed]);

  return <span>{distance}</span>;
}

export default Timer;
