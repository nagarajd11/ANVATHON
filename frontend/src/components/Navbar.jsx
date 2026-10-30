import React from 'react';
import { 
  Sprout, 
  Languages, 
  Users,
  Compass
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function Navbar({ 
  lang, 
  setLang
}) {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-3 z-50 max-w-7xl mx-auto px-4 sm:px-6 mb-6 transition-all duration-300">
      <div className="glass-card !bg-white/85 !backdrop-blur-2xl !rounded-2xl px-4 sm:px-6 py-3.5 border border-emerald-900/10 shadow-[0_12px_40px_-10px_rgba(4,47,46,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.9)]">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chlorophyll via-[#0c3829] to-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/20 ring-1 ring-white/40">
              <Sprout className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-chlorophyll tracking-tight leading-none font-sans">
                  {t.appTitle}
                </h1>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-900 border border-emerald-600/20 hidden sm:inline-block">
                  Field Intelligence
                </span>
              </div>
              <p className="text-[11px] text-[#09261c]/70 font-medium hidden md:block mt-0.5">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Right Actions: Shared Trucks Link & Language Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Quick Link to Truck Sharing */}
            <a
              href="#crop-pooling-section"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-900/5 hover:bg-emerald-900/10 text-chlorophyll text-xs font-semibold border border-emerald-900/10 transition-all hover:border-emerald-600/30 hover:shadow-xs active:scale-95"
              title={t.poolNavBtn}
            >
              <Users className="w-3.5 h-3.5 text-emerald-700" />
              <span className="font-sans">{t.poolNavBtn}</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-black/5 p-1 rounded-xl border border-black/5">
              <Languages className="w-3.5 h-3.5 text-chlorophyll/60 ml-1.5 mr-1" />
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'en' 
                    ? 'bg-white text-chlorophyll shadow-xs ring-1 ring-black/5' 
                    : 'text-chlorophyll/60 hover:text-chlorophyll'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'kn' 
                    ? 'bg-white text-chlorophyll shadow-xs ring-1 ring-black/5' 
                    : 'text-chlorophyll/60 hover:text-chlorophyll'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  lang === 'hi' 
                    ? 'bg-white text-chlorophyll shadow-xs ring-1 ring-black/5' 
                    : 'text-chlorophyll/60 hover:text-chlorophyll'
                }`}
              >
                हिन्दी
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
