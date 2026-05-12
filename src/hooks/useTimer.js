import { useState, useEffect, useRef } from 'react';

/**
 * Countdown timer with stale-closure-safe callbacks.
 * The callbacks object is stored in a ref that is updated every render,
 * so onTick/onExpire always see the latest state/props.
 */
export function useTimer(initialSeconds, callbacks = {}) {
  const [timeLeft,   setTimeLeft]   = useState(initialSeconds);
  const [isRunning,  setIsRunning]  = useState(false);
  const intervalRef  = useRef(null);
  const callbacksRef = useRef(callbacks);

  // Update ref every render — no useEffect needed, runs synchronously
  callbacksRef.current = callbacks;

  const stop  = () => { clearInterval(intervalRef.current); setIsRunning(false); };
  const reset = () => { stop(); setTimeLeft(initialSeconds); };
  const start = () => setIsRunning(true);

  useEffect(() => {
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        callbacksRef.current.onTick?.(next);
        if (next <= 0) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          callbacksRef.current.onExpire?.();
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return { timeLeft, isRunning, start, stop, reset };
}
