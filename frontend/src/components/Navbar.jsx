import React from 'react';
import { 
  Languages, 
  Mic,
  MicOff
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function Navbar({ 
  lang, 
  setLang,
  isListening = false,
  onToggleVoiceCommand,
  onLogoClick = () => {}
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <header className="sticky top-3 z-50 max-w-6xl mx-auto px-4 sm:px-6 mb-6 transition-all duration-300">
      <div className="glass-floating !rounded-2xl px-4 sm:px-6 py-2.5 border border-white/15 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.35)] flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <div 
          onClick={onLogoClick}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden ring-1.5 ring-emerald-400/60 shadow-md shadow-black/40 border border-white/20 transition-transform duration-200 group-hover:scale-105 bg-emerald-950 flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="HarvestRoute" 
              className="w-full h-full object-cover saturate-110" 
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight text-crisp">
              HarvestRoute
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hidden sm:inline-block">
              Karnataka APMC
            </span>
          </div>
        </div>

        {/* Right Actions: Voice Assistant & Language Switcher */}
        <div className="flex items-center gap-2.5">

          {/* Voice Command Mic Button */}
          {onToggleVoiceCommand && (
            <button
              type="button"
              onClick={onToggleVoiceCommand}
              className={`btn-secondary !py-1.5 !px-3 text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                isListening 
                  ? 'border-rose-400 bg-rose-500/25 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse' 
                  : 'text-white/80 hover:text-emerald-300 hover:border-emerald-400/50'
              }`}
              title={isListening ? 'Click to cancel voice input' : t.voiceMicBtn}
              aria-pressed={isListening}
            >
              {isListening ? (
                <>
                  <MicOff className="w-3.5 h-3.5 text-rose-300 animate-bounce" />
                  <span className="font-bold text-rose-200 hidden sm:inline">{t.listeningActive}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                </>
              ) : (
                <>
                  <Mic className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="hidden sm:inline font-medium">{t.voiceMicBtn}</span>
                </>
              )}
            </button>
          )}

          {/* Clean Language Switcher */}
          <div className="flex items-center bg-black/40 backdrop-blur-md p-1 rounded-xl border border-white/15">
            <Languages className="w-3 h-3 text-white/50 ml-1.5 mr-1" />
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                lang === 'en' 
                  ? 'bg-emerald-500 text-pine font-bold shadow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('kn')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                lang === 'kn' 
                  ? 'bg-emerald-500 text-pine font-bold shadow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                lang === 'hi' 
                  ? 'bg-emerald-500 text-pine font-bold shadow-sm' 
                  : 'text-white/70 hover:text-white'
              }`}
            >
              हिन्दी
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}