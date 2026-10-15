import React, {useState} from 'react';
import {Hand, Minimize2, X} from 'lucide-react';
import {SignAvatar} from './SignAvatar';

interface TilsPanelProps {
  isActive: boolean;
  onToggle: () => void;
  lastAssistantMessage: string;
  isDark: boolean;
}

/** Floating toggle + panel that hosts the sign avatar on any screen. */
export const TilsPanel: React.FC<TilsPanelProps> = ({isActive, onToggle, lastAssistantMessage, isDark}) => {
  const [minimized, setMinimized] = useState(false);
  const surface = isDark ? 'bg-slate-900/95 border-indigo-500/30' : 'bg-white/95 border-indigo-200';

  return (
    <>
      {isActive && !minimized && (
        <div className={`fixed bottom-24 left-4 z-50 w-[280px] h-[340px] rounded-3xl border shadow-xl backdrop-blur-xl flex flex-col ${surface}`}>
          <div className="flex items-center justify-between px-3 py-2 border-b border-indigo-500/10">
            <span className="text-xs font-bold text-indigo-500 flex items-center gap-1.5"><Hand size={14} /> Intérprete Libras</span>
            <span className="flex gap-1 text-slate-400">
              <button type="button" onClick={() => setMinimized(true)} aria-label="Minimizar" className="p-1 hover:text-slate-200"><Minimize2 size={13} /></button>
              <button type="button" onClick={onToggle} aria-label="Fechar" className="p-1 hover:text-red-400"><X size={13} /></button>
            </span>
          </div>
          <div className="flex-1 min-h-0">
            <SignAvatar text={lastAssistantMessage} isDark={isDark} />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => (isActive && minimized ? setMinimized(false) : onToggle())}
        aria-pressed={isActive}
        title={isActive ? 'Desativar intérprete de Libras' : 'Ativar intérprete de Libras'}
        className={`fixed bottom-6 left-4 z-50 w-14 h-14 rounded-2xl grid place-items-center border-2 shadow-xl transition-transform hover:scale-105 active:scale-95 ${
          isActive
            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 border-indigo-400 text-white'
            : isDark ? 'bg-slate-900/90 border-white/10 text-white/70' : 'bg-white/90 border-slate-200 text-slate-600'
        }`}
      >
        <Hand size={24} />
      </button>
    </>
  );
};
