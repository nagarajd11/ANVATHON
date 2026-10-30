import React from 'react';
import { 
  Wheat, 
  Scale, 
  Clock, 
  MapPin, 
  Truck, 
  Snowflake, 
  AlertTriangle,
  ArrowRight, 
  Sparkles,
  Users
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function FarmerInputForm({
  lang,
  crops,
  origins,
  vehicleCatalog,
  selectedCrop,
  setSelectedCrop,
  quantity,
  setQuantity,
  freshness,
  setFreshness,
  originDistrict,
  setOriginDistrict,
  vehicleType,
  setVehicleType,
  onCalculate,
  isLoading
}) {
  const t = TRANSLATIONS[lang];

  // Current crop metadata
  const currentCropObj = crops.find(c => c.crop_name === selectedCrop);
  const currentVehicleObj = vehicleCatalog[vehicleType] || {};

  // Check if multiple trips required
  const tripsNeeded = currentVehicleObj.capacity 
    ? Math.ceil(quantity / currentVehicleObj.capacity) 
    : 1;

  const getCropDisplayName = (crop) => {
    if (lang === 'kn' && crop.kannada_name) return `${crop.kannada_name} (${crop.crop_name})`;
    if (lang === 'hi' && crop.hindi_name) return `${crop.hindi_name} (${crop.crop_name})`;
    return crop.crop_name;
  };

  const getDistrictDisplayName = (orig) => {
    if (lang === 'kn' && orig.kannada_name) return `${orig.kannada_name} (${orig.district})`;
    return orig.district;
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-emerald-900/10 shadow-[0_16px_45px_-10px_rgba(4,47,46,0.22),inset_0_1px_1px_0_rgba(255,255,255,0.9)]">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-chlorophyll/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-800">
              <Wheat className="w-4 h-4 text-emerald-700" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-chlorophyll/60">
              Karnataka Mandi Lot Configuration
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-chlorophyll tracking-wide">
            {t.lotDetailsTitle}
          </h2>
          <p className="text-xs text-chlorophyll/70 mt-1 font-sans">
            {t.datasetBadge} • 62 Regulated Yards
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-900 border border-emerald-600/20 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Live APMC Price Indices
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        
        {/* 1. Crop Dropdown */}
        <div>
          <label className="block text-xs font-bold text-chlorophyll mb-2 flex items-center gap-1.5">
            <Wheat className="w-3.5 h-3.5 text-emerald-700" />
            {t.selectCrop}
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full bg-white/90 border border-chlorophyll/15 rounded-xl px-3.5 py-3 text-sm font-semibold text-chlorophyll focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer shadow-2xs"
          >
            {crops.map((crop) => (
              <option key={crop.crop_id || crop.crop_name} value={crop.crop_name}>
                {getCropDisplayName(crop)}
              </option>
            ))}
          </select>
          {currentCropObj && (
            <div className="mt-2 flex items-center gap-1 text-[11px] text-chlorophyll/70">
              <span className={`px-2 py-0.5 rounded-md font-bold uppercase tracking-wider text-[10px] ${
                currentCropObj.perishability_tier === 'HIGH' ? 'bg-terracotta-50 text-terracotta-800 border border-terracotta-200' :
                currentCropObj.perishability_tier === 'MEDIUM' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                {currentCropObj.perishability_tier} Perishability
              </span>
            </div>
          )}
        </div>

        {/* 2. Quantity (Quintals) */}
        <div>
          <label className="block text-xs font-bold text-chlorophyll mb-2 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-emerald-700" />
            {t.enterQuantity}
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="500"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full bg-white/90 border border-chlorophyll/15 rounded-xl px-3.5 py-3 text-sm font-mono font-bold tabular-nums text-chlorophyll focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-2xs"
            />
            <span className="absolute right-3.5 top-3.5 text-xs font-mono font-bold text-chlorophyll/40">
              qtl (100kg)
            </span>
          </div>
          {/* Quick preset chips */}
          <div className="mt-2 flex items-center gap-1.5">
            {[5, 10, 20, 35, 50].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setQuantity(val)}
                className={`text-[11px] font-mono font-bold tabular-nums px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                  quantity === val 
                    ? 'bg-chlorophyll text-emerald-300 border-chlorophyll shadow-xs' 
                    : 'bg-white/80 text-chlorophyll/80 hover:bg-white border-chlorophyll/15'
                }`}
              >
                {val}q
              </button>
            ))}
          </div>
        </div>

        {/* 3. Freshness / Harvest Age */}
        <div>
          <label className="block text-xs font-bold text-chlorophyll mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            {t.freshnessWindow}
          </label>
          <select
            value={freshness}
            onChange={(e) => setFreshness(parseFloat(e.target.value))}
            className="w-full bg-white/90 border border-chlorophyll/15 rounded-xl px-3.5 py-3 text-sm font-semibold text-chlorophyll focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer shadow-2xs"
          >
            <option value="6">{t.freshnessJustHarvested}</option>
            <option value="24">{t.freshness1Day}</option>
            <option value="48">{t.freshness2Days}</option>
          </select>
          <p className="mt-2 text-[11px] text-chlorophyll/60">
            Affects non-linear transit decay
          </p>
        </div>

        {/* 4. Origin District */}
        <div>
          <label className="block text-xs font-bold text-chlorophyll mb-2 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            {t.farmerOrigin}
          </label>
          <select
            value={originDistrict}
            onChange={(e) => setOriginDistrict(e.target.value)}
            className="w-full bg-white/90 border border-chlorophyll/15 rounded-xl px-3.5 py-3 text-sm font-semibold text-chlorophyll focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer shadow-2xs"
          >
            {origins.map((orig) => (
              <option key={orig.district} value={orig.district}>
                {getDistrictDisplayName(orig)}
              </option>
            ))}
          </select>
          <p className="mt-2 text-[11px] text-chlorophyll/60">
            Farm / village dispatch hub
          </p>
        </div>

        {/* 5. Transport Vehicle Class */}
        <div>
          <label className="block text-xs font-bold text-chlorophyll mb-2 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-emerald-700" />
            {t.selectVehicle}
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full bg-white/90 border border-chlorophyll/15 rounded-xl px-3.5 py-3 text-sm font-semibold text-chlorophyll focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 transition-all cursor-pointer shadow-2xs"
          >
            {Object.entries(vehicleCatalog).map(([key, vh]) => (
              <option key={key} value={key}>
                {vh.name} (≤{vh.capacity}q | ₹{vh.ratePerKm}/km)
              </option>
            ))}
          </select>
          {currentVehicleObj.isReefer ? (
            <p className="mt-2 text-[11px] font-bold text-emerald-700 flex items-center gap-1 font-mono">
              <Snowflake className="w-3 h-3 text-emerald-600" />
              85% Decay Elimination
            </p>
          ) : tripsNeeded > 1 ? (
            <p className="mt-2 text-[11px] font-bold text-terracotta-700 flex items-center gap-1 font-mono">
              <AlertTriangle className="w-3 h-3 text-terracotta-600" />
              Requires {tripsNeeded} trips (cap: {currentVehicleObj.capacity}q)
            </p>
          ) : (
            <p className="mt-2 text-[11px] font-mono tabular-nums text-chlorophyll/60">
              Capacity: {currentVehicleObj.capacity} quintals
            </p>
          )}
        </div>

      </div>

      {/* Small Lot Optimization Callout */}
      {quantity <= 15 && (
        <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-600/20 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-chlorophyll text-emerald-300 rounded-xl shrink-0 shadow-xs">
              <Users className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-chlorophyll flex items-center gap-2">
                <span className="font-sans">{t.soloAlertBadge} ({quantity} Quintals)</span>
                <span className="text-[10px] font-bold font-mono uppercase px-2 py-0.5 bg-emerald-500/20 text-emerald-900 border border-emerald-600/30 rounded-full">
                  Save up to 75%
                </span>
              </div>
              <p className="text-[11px] text-chlorophyll/70 mt-0.5 font-sans">
                {t.soloAlertText}
              </p>
            </div>
          </div>
          <a
            href="#crop-pooling-section"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-chlorophyll hover:bg-[#0c3829] text-emerald-300 font-bold text-xs shrink-0 transition-all border border-emerald-500/30 hover:border-emerald-400 shadow-xs"
          >
            <span>{t.poolNavBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Action Button: Chlorophyll Pine with Magnetic Glow */}
      <div className="mt-7 flex justify-end">
        <button
          onClick={onCalculate}
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-xl bg-chlorophyll hover:bg-[#0c3829] text-emerald-300 font-bold text-sm tracking-wide shadow-md shadow-emerald-950/20 border border-emerald-500/40 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <span className="font-mono">{t.calculating}</span>
          ) : (
            <>
              <span>{t.calculateBtn}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
