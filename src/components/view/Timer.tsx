import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'utils/date';

interface TimerProps {
  /** Unix timestamp in milliseconds */
  timestamp: number,
}

function Timer({ timestamp }: TimerProps) {
  const [distance, setDistance] = useState(formatDistanceToNow(timestamp));

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (Date.now() >= timestamp) return;

      const newDistance = formatDistanceToNow(timestamp);
      if (newDistance !== distance) setDistance(newDistance);
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [distance]);

  return <span>{distance}</span>;
}

export default Timer;
