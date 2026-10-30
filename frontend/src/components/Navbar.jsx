import React from 'react';
import { 
  Sprout, 
  Languages, 
  Users
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function Navbar({ 
  lang, 
  setLang
}) {
  const t = TRANSLATIONS[lang];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-agri-700 via-agri-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-agri-600/20">
              <Sprout className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.appTitle}
              </h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Right Actions: Shared Trucks Link & Language Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Quick Link to Truck Sharing */}
            <a
              href="#crop-pooling-section"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors shadow-2xs"
              title={t.poolNavBtn}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>{t.poolNavBtn}</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <Languages className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                  lang === 'en' ? 'bg-white text-agri-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                  lang === 'kn' ? 'bg-white text-agri-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                  lang === 'hi' ? 'bg-white text-agri-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
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
