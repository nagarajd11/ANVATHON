import React from 'react';
import { Sliders, RotateCcw, Fuel, Sun, Percent, Gauge } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function SensitivityLab({
  lang,
  fuelRateMultiplier,
  setFuelRateMultiplier,
  spoilageMultiplier,
  setSpoilageMultiplier,
  cessRateOverride,
  setCessRateOverride,
  speedKmph,
  setSpeedKmph,
  onReset
}) {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-slate-900 text-white rounded-2xl border border-slate-800 shadow-md p-5 sm:p-6 mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-500/20 text-amber-300 rounded-lg">
              <Sliders className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">{t.sensitivityTitle}</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{t.sensitivitySub}</p>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.resetSliders}</span>
        </button>
      </div>

      {/* 4 Interactive Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Fuel / Freight Rate Slider */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-amber-400" />
              {t.dieselFactor}
            </label>
            <span className="text-xs font-black text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
              {fuelRateMultiplier.toFixed(2)}x
            </span>
          </div>
          <input
            type="range"
            min="0.7"
            max="2.0"
            step="0.05"
            value={fuelRateMultiplier}
            onChange={(e) => setFuelRateMultiplier(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
            <span>Cheap / Return Trip (0.7x)</span>
            <span>Fuel Spike (2.0x)</span>
          </div>
        </div>

        {/* 2. Spoilage / Weather Slider */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-rose-400" />
              {t.spoilageFactor}
            </label>
            <span className="text-xs font-black text-rose-400 px-2 py-0.5 rounded bg-rose-500/10">
              {spoilageMultiplier.toFixed(2)}x
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={spoilageMultiplier}
            onChange={(e) => setSpoilageMultiplier(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
            <span>Cool Winter (0.5x)</span>
            <span>Scorching Heat (2.5x)</span>
          </div>
        </div>

        {/* 3. Mandi Cess Rate */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-emerald-400" />
              {t.mandiCess}
            </label>
            <span className="text-xs font-black text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">
              {(cessRateOverride * 100).toFixed(1)}%
            </span>
          </div>
          <input
            type="range"
            min="0.005"
            max="0.035"
            step="0.002"
            value={cessRateOverride}
            onChange={(e) => setCessRateOverride(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
            <span>Low Cess (0.5%)</span>
            <span>High Cess (3.5%)</span>
          </div>
        </div>

        {/* 4. Transit Speed / Delay */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-blue-400" />
              {t.transitSpeed}
            </label>
            <span className="text-xs font-black text-blue-400 px-2 py-0.5 rounded bg-blue-500/10">
              {speedKmph} km/h
            </span>
          </div>
          <input
            type="range"
            min="20"
            max="65"
            step="5"
            value={speedKmph}
            onChange={(e) => setSpeedKmph(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1.5">
            <span>Bad Roads / Jam (20)</span>
            <span>Fast Express (65)</span>
          </div>
        </div>

      </div>

    </div>
  );
}

