import React from 'react';
import { 
  Sprout, 
  Database, 
  ShieldCheck, 
  Languages, 
  Bookmark, 
  FileText,
  TrendingUp,
  Users
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function Navbar({ 
  lang, 
  setLang, 
  dbStatus, 
  onOpenSaved, 
  onOpenDispatch, 
  hasAnalysis 
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
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  {t.appTitle}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-agri-100 text-agri-800 border border-agri-300">
                  Domain 3
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Center Badges (DB & Guest Mode) */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>MongoDB {dbStatus?.connected ? 'Online' : 'Indexed Cache'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Zero-Login Guest Access</span>
            </div>
          </div>

          {/* Right Actions: Crop Pooling, Dispatch Slip, Saved, Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Link to Crop Pooling Hub */}
            <a
              href="#crop-pooling-section"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors shadow-2xs"
              title={t.poolNavBtn}
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">{t.poolNavBtn}</span>
            </a>

            {hasAnalysis && (
              <button
                onClick={onOpenDispatch}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                title={t.dispatchSlipBtn}
              >
                <FileText className="w-4 h-4 text-slate-600" />
                <span>{t.dispatchSlipBtn}</span>
              </button>
            )}

            <button
              onClick={onOpenSaved}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              title={t.savedAnalysesBtn}
            >
              <Bookmark className="w-4 h-4 text-amber-600" />
              <span className="hidden lg:inline">{t.savedAnalysesBtn}</span>
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <Languages className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 text-xs font-bold rounded ${
                  lang === 'en' ? 'bg-white text-agri-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-2 py-1 text-xs font-bold rounded ${
                  lang === 'kn' ? 'bg-white text-agri-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 text-xs font-bold rounded ${
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
