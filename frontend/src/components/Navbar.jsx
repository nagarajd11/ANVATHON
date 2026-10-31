import React from 'react';
import { 
  Sprout, 
  Languages,
  Sparkles,
  Droplets,
  Mic,
  MicOff
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function Navbar({ 
  lang, 
  setLang,
  isFluidFxEnabled = true,
  onToggleFluidFx,
  onSelectTab,
  isListening = false,
  onToggleVoiceCommand
}) {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-3 z-50 max-w-7xl mx-auto px-4 sm:px-6 mb-6 transition-all duration-300">
      <div className="glass-floating !rounded-2xl px-5 sm:px-7 py-3 border border-white/20 shadow-[0_12px_35px_-8px_rgba(0,0,0,0.35)] flex items-center justify-between">
        
        {/* Brand Logo & Editorial Title */}
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-emerald-400/50 shadow-lg shadow-black/40 border border-white/30 transition-transform duration-300 group-hover:scale-105 bg-emerald-950 flex-shrink-0">
            <img 
              src="/logo.jpg" 
              alt="HarvestRoute Logo" 
              className="w-full h-full object-cover object-center filter saturate-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-none text-crisp">
                {t.appTitle}
              </h1>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hidden sm:inline-block">
                APMC Network
              </span>
            </div>
            <p className="text-xs text-white/70 font-sans hidden md:block mt-0.5">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right Actions: Shared Trucks Link, Fluid FX Toggle & Language Switcher */}
        <div className="flex items-center gap-2.5">
          
          {/* WebGL Fluid FX Ripple Toggle */}
          <button
            type="button"
            onClick={onToggleFluidFx}
            className={`btn-secondary !py-1.5 !px-3 font-sans text-xs transition-all ${
              isFluidFxEnabled 
                ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.25)]' 
                : 'text-white/60 hover:text-white'
            }`}
            title={isFluidFxEnabled ? 'Fluid Wave FX Active (Click to pause)' : 'Fluid Wave FX Paused (Click to activate)'}
            aria-pressed={isFluidFxEnabled}
          >
            <Droplets className={`w-3.5 h-3.5 transition-transform duration-300 ${isFluidFxEnabled ? 'text-emerald-300 scale-110' : 'text-white/50'}`} />
            <span className="hidden sm:inline">Fluid FX:</span>
            <span className={`font-mono text-xs font-bold ${isFluidFxEnabled ? 'text-emerald-300' : 'text-white/50'}`}>
              {isFluidFxEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Multilingual Voice Command Mic Button */}
          {onToggleVoiceCommand && (
            <button
              type="button"
              onClick={onToggleVoiceCommand}
              className={`btn-secondary !py-1.5 !px-3 font-sans text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
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
                  <span className="hidden sm:inline">{t.voiceMicBtn}</span>
                </>
              )}
            </button>
          )}

          

          {/* Language Switcher */}
          <div className="flex items-center bg-black/30 backdrop-blur-md p-1 rounded-xl border border-white/15 shadow-inner">
            <Languages className="w-3.5 h-3.5 text-white/60 ml-1.5 mr-1" />
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                lang === 'en' 
                  ? 'bg-emerald-500 text-pine shadow-sm font-bold' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('kn')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                lang === 'kn' 
                  ? 'bg-emerald-500 text-pine shadow-sm font-bold' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                lang === 'hi' 
                  ? 'bg-emerald-500 text-pine shadow-sm font-bold' 
                  : 'text-white/70 hover:text-white hover:bg-white/10'
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
