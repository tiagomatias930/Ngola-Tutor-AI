import React from 'react';
import {Pause, Play, RotateCcw} from 'lucide-react';
import {HandShape} from './HandShape';
import {LIBRAS_ALPHABET, REST_SHAPE, type Place} from './libras-alphabet';
import {useFingerspelling} from './useFingerspelling';

interface SignAvatarProps {
  /** Text to fingerspell, normally the tutor's latest answer. */
  text: string;
  /** Tutor state from the chat screen: idle, explaining, thinking, ... */
  gesture?: string | null;
  isDark?: boolean;
  /** Smaller layout for the mobile overlay: no controls or caption. */
  compact?: boolean;
  enabled?: boolean;
}

const SPEED_MS = {slow: 900, normal: 600, fast: 380} as const;
type Speed = keyof typeof SPEED_MS;
const SPEED_LABEL: Record<Speed, string> = {slow: 'Lento', normal: 'Normal', fast: 'Rápido'};

const PLACE_OFFSET: Record<Place, [number, number]> = {
  side: [0, 0],
  out: [10, 18],
  face: [-62, -8],
  forehead: [-62, -34],
  chin: [-58, 22],
  chest: [-50, 58],
};

const STYLES = `
@keyframes sa-breathe { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
@keyframes sa-blink { 0%,92%,100% { transform: scaleY(1) } 95% { transform: scaleY(.1) } }
@keyframes sa-motion-j { 0% { transform: rotate(0) } 50% { transform: rotate(35deg) } 100% { transform: rotate(0) } }
@keyframes sa-motion-z { 0% { transform: translate(-10px,0) } 50% { transform: translate(10px,8px) } 100% { transform: translate(-10px,16px) } }
@keyframes sa-nod { 0%,100% { transform: rotate(0) } 50% { transform: rotate(3deg) } }
.sa-body { animation: sa-breathe 4s ease-in-out infinite; }
.sa-eye { animation: sa-blink 5s infinite; transform-box: fill-box; transform-origin: center; }
.sa-head[data-gesture="explaining"], .sa-head[data-gesture="speaking"] { animation: sa-nod .9s ease-in-out infinite; transform-origin: 80px 130px; }
.sa-hand[data-motion="j"] { animation: sa-motion-j .5s ease-in-out; transform-box: fill-box; transform-origin: center bottom; }
.sa-hand[data-motion="z"] { animation: sa-motion-z .5s ease-in-out; }
@media (prefers-reduced-motion: reduce) { .sa-body, .sa-eye, .sa-head, .sa-hand { animation: none !important; } }
`;

export const SignAvatar: React.FC<SignAvatarProps> = ({
  text, gesture = 'idle', isDark = true, compact = false, enabled = true,
}) => {
  const [speed, setSpeed] = React.useState<Speed>('normal');
  const spelling = useFingerspelling(text, enabled, SPEED_MS[speed]);
  const {current} = spelling;
  const letter = current?.kind === 'letter' ? current.char : null;
  const pose = current?.kind === 'pose' ? current : null;
  const spec = pose ? pose.shape : letter ? LIBRAS_ALPHABET[letter] : REST_SHAPE;
  const [dx, dy] = PLACE_OFFSET[pose?.at ?? 'side'];

  const words = React.useMemo(() => {
    const out: {chars: string[]; start: number}[] = [];
    let word: {chars: string[]; start: number} | null = null;
    spelling.symbols.forEach((symbol, i) => {
      if (symbol.kind === 'letter') {
        if (!word) { word = {chars: [], start: i}; out.push(word); }
        word.chars.push(symbol.char);
      } else if (symbol.kind === 'pose') {
        if (!word) { word = {chars: [], start: i}; out.push(word); }
        if (!word.chars.length) word.chars.push(symbol.word);
      } else if (symbol.kind === 'space') {
        word = null;
      }
    });
    return out;
  }, [spelling.symbols]);
  const activeWord = [...words].reverse().find(word => word.start <= spelling.index) ?? words[0];
  const letterOffset = activeWord
    ? spelling.symbols.slice(activeWord.start, spelling.index).filter(s => s.kind === 'letter').length
    : 0;

  const gestureKey = spelling.playing ? 'speaking' : gesture ?? 'idle';
  const iconButton = 'p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400 hover:bg-indigo-500/25';

  return (
    <section
      aria-label="Intérprete de Libras (datilologia)"
      className={`w-full h-full flex flex-col rounded-3xl overflow-hidden border border-indigo-500/20 ${isDark ? 'bg-slate-900/70 text-white' : 'bg-white/80 text-slate-800'}`}
    >
      <style>{STYLES}</style>
      <div className="flex-1 min-h-0 grid place-items-center bg-gradient-to-b from-indigo-500/10 to-purple-500/10">
        <svg viewBox="0 0 270 250" className="h-full max-h-full w-full" role="img" aria-label={pose ? `Sinal ${pose.word}` : letter ? `Letra ${letter}` : 'Aguardando'}>
          <g className="sa-body">
            <path d="M25 250 C25 190 50 160 80 160 C110 160 135 190 135 250 Z" fill="#4f46e5" />
            <rect x="68" y="136" width="24" height="28" rx="8" fill="#c98f5f" />
            {/* signing arm */}
            <path d="M122 182 Q205 245 190 175" fill="none" stroke="#4f46e5" strokeWidth="24" strokeLinecap="round" />
            <path d="M190 190 L190 168" stroke="#e0ac7e" strokeWidth="18" strokeLinecap="round" />
            <g className="sa-head" data-gesture={gestureKey}>
              <circle cx="80" cy="95" r="40" fill="#e0ac7e" />
              <path d="M40 92 C38 50 120 45 120 92 C105 70 60 70 40 92Z" fill="#2b1d14" />
              <ellipse className="sa-eye" cx="65" cy="98" rx="4.5" ry="5.5" fill="#1f2937" />
              <ellipse className="sa-eye" cx="95" cy="98" rx="4.5" ry="5.5" fill="#1f2937" />
              <path
                d={spelling.playing ? 'M70 118 Q80 128 90 118' : 'M70 118 Q80 124 90 118'}
                fill="none" stroke="#7c2d12" strokeWidth="3" strokeLinecap="round"
              />
            </g>
          </g>
          {/* keyed so one-shot J/Z motions replay for every symbol */}
          <g style={{transform: `translate(${dx}px, ${dy}px)`, transition: 'transform .3s ease-out'}}>
            <g key={spelling.index} className="sa-hand" data-motion={spec.motion ?? 'none'}>
              <foreignObject x="130" y="28" width="120" height="144">
                <HandShape spec={spec} className="w-full h-full" />
              </foreignObject>
            </g>
          </g>
          {pose && (
            <text x="205" y="244" textAnchor="middle" fontSize="16" fontWeight="800" fill={isDark ? '#a5b4fc' : '#4338ca'}>
              Sinal: {pose.word}
            </text>
          )}
          {letter && (
            <text x="232" y="22" textAnchor="middle" fontSize="30" fontWeight="800" fill={isDark ? '#a5b4fc' : '#4338ca'}>
              {letter}
            </text>
          )}
        </svg>
      </div>

      {!compact && (
        <div className="px-3 py-2 space-y-2 border-t border-indigo-500/10">
          <div className="flex flex-wrap gap-1 min-h-[28px]">
            {activeWord
              ? activeWord.chars.map((char, i) => (
                  <span
                    key={i}
                    className={`w-6 h-7 grid place-items-center rounded-md text-xs font-black ${
                      i === letterOffset && spelling.playing ? 'bg-indigo-500 text-white'
                        : i < letterOffset ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {char}
                  </span>
                ))
              : <span className="text-[11px] text-slate-400 italic">O intérprete soletra as respostas do tutor em Libras.</span>}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={spelling.playing ? spelling.pause : spelling.finished ? spelling.replay : spelling.play}
              className={iconButton}
              aria-label={spelling.playing ? 'Pausar' : 'Reproduzir'}
            >
              {spelling.playing ? <Pause size={14} /> : <Play size={14} />}
            </button>
            <button type="button" onClick={spelling.replay} className={iconButton} aria-label="Repetir">
              <RotateCcw size={14} />
            </button>
            <div className="ml-auto flex gap-1" role="group" aria-label="Velocidade">
              {(Object.keys(SPEED_MS) as Speed[]).map(key => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSpeed(key)}
                  aria-pressed={speed === key}
                  className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                    speed === key ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {SPEED_LABEL[key]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
