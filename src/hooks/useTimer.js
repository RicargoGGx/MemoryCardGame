import { useState, useEffect, useRef } from 'react';

export function useTimer(initialSeconds, { onTick, onExpire } = {}) {
  const [timeLeft,  setTimeLeft]  = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const stop  = () => { clearInterval(intervalRef.current); setIsRunning(false); };
  const reset = () => { stop(); setTimeLeft(initialSeconds); };
  const start = () => setIsRunning(true);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        onTick?.(next);
        if (next <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          onExpire?.();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]); // eslint-disable-line

  return { timeLeft, isRunning, start, stop, reset };
}
