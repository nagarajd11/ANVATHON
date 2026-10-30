import React from 'react';
import { 
  Sprout, 
  Languages, 
  Users,
  Sparkles
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function Navbar({ 
  lang, 
  setLang,
  onSelectTab
}) {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-3 z-50 max-w-7xl mx-auto px-4 sm:px-6 mb-6 transition-all duration-300">
      <div className="glass-floating !rounded-2xl px-5 sm:px-7 py-3 border border-white/20 shadow-[0_12px_35px_-8px_rgba(0,0,0,0.35)] flex items-center justify-between">
        
        {/* Brand Logo & Editorial Title */}
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-emerald-500 text-pine flex items-center justify-center font-bold shadow-md shadow-emerald-950/30 border border-white/30 transition-transform duration-300 group-hover:scale-105">
            <Sprout className="w-5 h-5 text-pine" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight leading-none text-crisp">
                {t.appTitle}
              </h1>
              <span className="text-[9px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 hidden sm:inline-block">
                APMC Network
              </span>
            </div>
            <p className="text-[11px] text-white/70 font-sans hidden md:block mt-0.5">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right Actions: Shared Trucks Link & Language Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Quick Link to Truck Sharing */}
          <button
            onClick={() => onSelectTab && onSelectTab('logistics')}
            className="btn-shimmer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-pine text-white text-xs font-semibold border border-white/20 backdrop-blur-md transition-all shadow-xs cursor-pointer"
            title={t.poolNavBtn}
          >
            <Users className="w-3.5 h-3.5 text-emerald-300" />
            <span className="font-sans">{t.poolNavBtn}</span>
          </button>

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
