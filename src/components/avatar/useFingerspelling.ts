import {useCallback, useEffect, useMemo, useState} from 'react';
import {toSymbols, type SignSymbol} from './libras-alphabet';

export interface Fingerspelling {
  symbols: SignSymbol[];
  index: number;
  current: SignSymbol | null;
  playing: boolean;
  finished: boolean;
  play(): void;
  pause(): void;
  replay(): void;
}

/**
 * Steps through the letters of `text` on a timer. Every timer is cleared on
 * change/unmount, so fast message updates can never leave stray timeouts
 * running (the cause of the old widget freezing the page).
 */
export function useFingerspelling(text: string, enabled: boolean, msPerLetter: number): Fingerspelling {
  const symbols = useMemo(() => toSymbols(text), [text]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setIndex(0);
    setPlaying(true);
  }, [symbols]);

  useEffect(() => {
    if (!enabled || !playing || index >= symbols.length) return;
    const symbol = symbols[index];
    const duration =
      symbol.kind === 'letter' ? msPerLetter : symbol.kind === 'pose' ? msPerLetter * 0.75 : msPerLetter * 0.5;
    const timer = window.setTimeout(() => setIndex(value => value + 1), duration);
    return () => window.clearTimeout(timer);
  }, [enabled, playing, index, symbols, msPerLetter]);

  const finished = index >= symbols.length;
  return {
    symbols,
    index,
    current: finished ? null : symbols[index],
    playing: playing && !finished,
    finished,
    play: useCallback(() => setPlaying(true), []),
    pause: useCallback(() => setPlaying(false), []),
    replay: useCallback(() => {
      setIndex(0);
      setPlaying(true);
    }, []),
  };
}
