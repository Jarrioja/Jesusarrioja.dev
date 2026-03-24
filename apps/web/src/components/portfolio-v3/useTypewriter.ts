import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  enabled?: boolean;
}

export function useTypewriter({
  text,
  speed = 30,
  delay = 0,
  enabled = true,
}: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!enabled || !text) return;

    setDisplayed("");
    setIsDone(false);
    indexRef.current = 0;

    const delayTimer = setTimeout(() => {
      const interval = setInterval(() => {
        indexRef.current += 1;
        setDisplayed(text.slice(0, indexRef.current));

        if (indexRef.current >= text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimer);
  }, [text, speed, delay, enabled]);

  return { displayed, isDone };
}
