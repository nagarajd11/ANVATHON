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
    <div className="glass-dark-card rounded-3xl p-6 sm:p-8 mb-8 border border-white/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/15 text-emerald-300">
              <Sliders className="w-4 h-4 text-emerald-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              What-If Assumptions Engine
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-white tracking-wide">
            {t.sensitivityTitle}
          </h3>
          <p className="text-xs text-white/70 mt-1 font-sans">
            {t.sensitivitySub}
          </p>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-semibold border border-white/15 hover:border-emerald-500/40 transition-all cursor-pointer self-start sm:self-auto shadow-xs active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.resetSliders}</span>
        </button>
      </div>

      {/* 4 Tactile Glass Slider Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* 1. Fuel / Freight Rate Slider */}
        <SpotlightCard
          spotlightColor="rgba(249, 115, 22, 0.12)"
          className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-white/80 flex items-center gap-1.5 font-sans">
              <Fuel className="w-4 h-4 text-terracotta-400" />
              {t.dieselFactor}
            </label>
            <span className="text-xs font-mono font-bold tabular-nums text-terracotta-400 px-2.5 py-0.5 rounded-md bg-terracotta-500/15 border border-terracotta-500/30">
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
          <div className="flex justify-between text-[10px] text-white/40 mt-2 font-mono">
            <span>Cheap Return (0.7x)</span>
            <span>Spike (2.0x)</span>
          </div>
        </SpotlightCard>

        {/* 2. Spoilage / Weather Slider */}
        <SpotlightCard
          spotlightColor="rgba(234, 88, 12, 0.12)"
          className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-white/80 flex items-center gap-1.5 font-sans">
              <Sun className="w-4 h-4 text-terracotta-400" />
              {t.spoilageFactor}
            </label>
            <span className="text-xs font-mono font-bold tabular-nums text-terracotta-400 px-2.5 py-0.5 rounded-md bg-terracotta-500/15 border border-terracotta-500/30">
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
          <div className="flex justify-between text-[10px] text-white/40 mt-2 font-mono">
            <span>Cool Winter (0.5x)</span>
            <span>Heatwave (2.5x)</span>
          </div>
        </SpotlightCard>

        {/* 3. Mandi Cess Rate */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.15)"
          className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-white/80 flex items-center gap-1.5 font-sans">
              <Percent className="w-4 h-4 text-emerald-400" />
              {t.mandiCess}
            </label>
            <span className="text-xs font-mono font-bold tabular-nums text-emerald-400 px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30">
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
          <div className="flex justify-between text-[10px] text-white/40 mt-2 font-mono">
            <span>Low Cess (0.5%)</span>
            <span>High Cess (3.5%)</span>
          </div>
        </SpotlightCard>

        {/* 4. Transit Speed / Delay */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.15)"
          className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-white/80 flex items-center gap-1.5 font-sans">
              <Gauge className="w-4 h-4 text-emerald-400" />
              {t.transitSpeed}
            </label>
            <span className="text-xs font-mono font-bold tabular-nums text-emerald-400 px-2.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30">
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
          <div className="flex justify-between text-[10px] text-white/40 mt-2 font-mono">
            <span>Rough Roads (20)</span>
            <span>Expressway (65)</span>
          </div>
        </SpotlightCard>

      </div>

    </div>
  );
}
