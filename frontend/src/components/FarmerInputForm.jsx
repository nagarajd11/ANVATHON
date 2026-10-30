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
    <div className="glass-card rounded-3xl p-6 sm:p-7 hover-lift h-full flex flex-col justify-between">
      
      <div>
        {/* Header with human, respectful tone */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
                <Wheat className="w-4 h-4 text-emerald-300" />
              </span>
              <span className="text-xs font-semibold tracking-wider text-emerald-300 font-mono">
                {t.datasetBadge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white text-crisp">
              {t.lotDetailsTitle}
            </h2>
            <p className="text-xs text-white/70 mt-1 font-sans">
              {t.lotDetailsSubtitle}
            </p>
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* 1. Crop Dropdown */}
          <div>
            <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center gap-1.5 font-sans">
              <Wheat className="w-3.5 h-3.5 text-emerald-400" />
              {t.selectCrop}
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-hidden cursor-pointer"
            >
              {crops.map((crop) => (
                <option key={crop.crop_id || crop.crop_name} value={crop.crop_name}>
                  {getCropDisplayName(crop)}
                </option>
              ))}
            </select>
            {currentCropObj && (
              <div className="mt-1.5 flex items-center gap-1 text-xs text-white/70">
                <span className={`px-2 py-0.5 rounded-md font-medium text-xs ${
                  currentCropObj.perishability_tier === 'HIGH' ? 'bg-amber-500/20 text-amber-200 border border-amber-400/30' :
                  currentCropObj.perishability_tier === 'MEDIUM' ? 'bg-amber-500/15 text-amber-200 border border-amber-400/20' :
                  'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30'
                }`}>
                  {currentCropObj.perishability_tier === 'HIGH' ? 'Highly Perishable' : 
                   currentCropObj.perishability_tier === 'MEDIUM' ? 'Medium Perishable' : 'Durable Produce'}
                </span>
              </div>
            )}
          </div>

          {/* 2. Quantity (Quintals) */}
          <div>
            <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center gap-1.5 font-sans">
              <Scale className="w-3.5 h-3.5 text-emerald-400" />
              {t.enterQuantity}
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="500"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseFloat(e.target.value) || 1))}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-mono font-medium tabular-nums text-white focus:outline-hidden"
              />
              <span className="absolute right-3.5 top-2.5 text-xs font-mono text-white/50 pointer-events-none">
                quintals
              </span>
            </div>
            {/* Quick preset chips */}
            <div className="mt-1.5 flex items-center gap-1.5">
              {[5, 10, 20, 35, 50].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setQuantity(val)}
                  className={`text-xs font-mono font-medium tabular-nums px-2 py-0.5 rounded-md border transition-all cursor-pointer hover-glow-pill ${
                    quantity === val 
                      ? 'bg-emerald-500 text-pine font-bold border-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]' 
                      : 'bg-white/5 text-white/75 hover:bg-white/15 hover:text-white border-white/15'
                  }`}
                >
                  {val}q
                </button>
              ))}
            </div>
          </div>

          {/* 3. Freshness / Harvest Age */}
          <div>
            <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center gap-1.5 font-sans">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {t.freshnessWindow}
            </label>
            <select
              value={freshness}
              onChange={(e) => setFreshness(parseFloat(e.target.value))}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-hidden cursor-pointer"
            >
              <option value="6">{t.freshnessJustHarvested}</option>
              <option value="24">{t.freshness1Day}</option>
              <option value="48">{t.freshness2Days}</option>
            </select>
          </div>

          {/* 4. Origin District */}
          <div>
            <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center gap-1.5 font-sans">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {t.farmerOrigin}
            </label>
            <select
              value={originDistrict}
              onChange={(e) => setOriginDistrict(e.target.value)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-hidden cursor-pointer"
            >
              {origins.map((orig) => (
                <option key={orig.district} value={orig.district}>
                  {getDistrictDisplayName(orig)}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Transport Vehicle Class */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center gap-1.5 font-sans">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              {t.selectVehicle}
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-hidden cursor-pointer"
            >
              {Object.entries(vehicleCatalog).map(([key, vh]) => (
                <option key={key} value={key}>
                  {vh.name} (Cap: ≤{vh.capacity}q • ₹{vh.ratePerKm}/km)
                </option>
              ))}
            </select>
            {currentVehicleObj.isReefer ? (
              <p className="mt-1 text-xs text-emerald-300 flex items-center gap-1">
                <Snowflake className="w-3 h-3 text-emerald-300" />
                <span>Refrigerated transport eliminates up to 85% of transit spoilage</span>
              </p>
            ) : tripsNeeded > 1 ? (
              <p className="mt-1 text-xs text-amber-300 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-300" />
                <span>Requires {tripsNeeded} trips with this vehicle (capacity: {currentVehicleObj.capacity}q)</span>
              </p>
            ) : null}
          </div>

        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-white/60 font-sans">
          Prices update across all 62 Karnataka mandis
        </span>

        <button
          onClick={onCalculate}
          disabled={isLoading}
          className="btn-shimmer btn-primary w-full sm:w-auto px-7 py-3 text-sm disabled:opacity-50"
        >
          {isLoading ? (
            <span className="font-mono">{t.calculating}</span>
          ) : (
            <>
              <span>{t.calculateBtn}</span>
              <ArrowRight className="w-4 h-4 text-pine" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
