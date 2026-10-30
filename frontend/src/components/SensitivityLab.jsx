import React from 'react';
import { Sliders, RotateCcw, Fuel, Sun, Percent, Gauge } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import SpotlightCard from './SpotlightCard';

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
    <div className="glass-card rounded-3xl p-6 sm:p-7 hover-lift h-full flex flex-col justify-between">
      
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
                <Sliders className="w-4 h-4 text-emerald-300" />
              </span>
              <span className="text-[11px] font-semibold tracking-wider text-emerald-300/90 font-mono">
                Live Assumptions
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white text-crisp">
              {t.sensitivityTitle}
            </h3>
            <p className="text-xs text-white/70 mt-1 font-sans">
              {t.sensitivitySub}
            </p>
          </div>

          <button
            onClick={onReset}
            className="btn-shimmer group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-pine text-white/80 hover:text-pine text-xs font-semibold border border-white/15 hover:border-emerald-300 transition-all cursor-pointer shadow-xs"
            title="Reset to default assumptions"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-300 group-hover:text-pine group-hover:-rotate-90 transition-transform duration-300" />
            <span className="hidden sm:inline">{t.resetSliders}</span>
          </button>
        </div>

        {/* 4 Sliders in 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* 1. Fuel / Freight Rate Slider */}
          <div className="bg-white/[0.04] border border-white/10 hover:border-amber-400/40 p-4 rounded-2xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-white/90 flex items-center gap-1.5 font-sans">
                <Fuel className="w-3.5 h-3.5 text-amber-400" />
                {t.dieselFactor}
              </label>
              <span className="text-xs font-mono font-medium tabular-nums text-amber-200 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/30">
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
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/50 mt-1.5 font-mono">
              <span>Standard (1.0x)</span>
              <span>Spike (2.0x)</span>
            </div>
          </div>

          {/* 2. Spoilage / Weather Slider */}
          <div className="bg-white/[0.04] border border-white/10 hover:border-amber-400/40 p-4 rounded-2xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-white/90 flex items-center gap-1.5 font-sans">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                {t.spoilageFactor}
              </label>
              <span className="text-xs font-mono font-medium tabular-nums text-amber-200 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-400/30">
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
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/50 mt-1.5 font-mono">
              <span>Normal (1.0x)</span>
              <span>Heatwave (2.5x)</span>
            </div>
          </div>

          {/* 3. Mandi Cess Rate */}
          <div className="bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 p-4 rounded-2xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-white/90 flex items-center gap-1.5 font-sans">
                <Percent className="w-3.5 h-3.5 text-emerald-400" />
                {t.mandiCess}
              </label>
              <span className="text-xs font-mono font-medium tabular-nums text-emerald-200 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/30">
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
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/50 mt-1.5 font-mono">
              <span>0.5% (Low)</span>
              <span>3.5% (Max)</span>
            </div>
          </div>

          {/* 4. Transit Speed / Delay */}
          <div className="bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 p-4 rounded-2xl transition-all">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-white/90 flex items-center gap-1.5 font-sans">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" />
                {t.transitSpeed}
              </label>
              <span className="text-xs font-mono font-medium tabular-nums text-emerald-200 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-400/30">
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
              className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-white/50 mt-1.5 font-mono">
              <span>Ghat / Rough (20)</span>
              <span>Highway (65)</span>
            </div>
          </div>

        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-white/10 text-[11px] text-white/60 font-sans flex items-center justify-between">
        <span>Rankings update live as sliders move</span>
        <span className="font-mono text-emerald-300">Live Simulation</span>
      </div>

    </div>
  );
}
