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
  Users,
  Building2,
  Compass,
  Navigation
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function FarmerInputForm({
  lang = 'en',
  crops = [],
  origins = [],
  vehicleCatalog = {},
  selectedCrop = 'Tomato',
  setSelectedCrop = () => {},
  quantity = 10,
  setQuantity = () => {},
  freshness = 6,
  setFreshness = () => {},
  originDistrict = 'Chamarajanagar',
  setOriginDistrict = () => {},
  originTaluk = '',
  setOriginTaluk = () => {},
  originVillage = '',
  setOriginVillage = () => {},
  nearestApmc = null,
  vehicleType = 'BOLERO_PICKUP',
  setVehicleType = () => {},
  onCalculate = () => {},
  isLoading = false
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const safeOriginTaluk = originTaluk || '';
  const safeOriginVillage = originVillage || '';

  // Current crop and vehicle metadata
  const currentCropObj = (crops || []).find(c => c.crop_name === selectedCrop);
  const currentVehicleObj = (vehicleCatalog && vehicleCatalog[vehicleType]) || {};

  // Check if multiple trips required
  const tripsNeeded = currentVehicleObj.capacity 
    ? Math.ceil(quantity / currentVehicleObj.capacity) 
    : 1;

  const [isCustomVillage, setIsCustomVillage] = React.useState(false);

  // Selected district metadata and taluks list
  const currentDistrictObj = (origins || []).find(o => o.district === originDistrict);
  const talukList = currentDistrictObj?.taluks || [];
  const currentTalukObj = talukList.find(t => t.name === safeOriginTaluk) || talukList[0];
  const villageList = currentTalukObj?.villages || [];

  // Farmer in City location (e.g. Koppal City or District City Center) - does not take villages
  const isCityLocation = Boolean(
    currentTalukObj?.isCity || 
    safeOriginTaluk === 'Koppal City' || 
    safeOriginTaluk.toLowerCase().includes('city') || 
    (talukList.length > 0 && villageList.length === 0)
  );

  const getVillageDisplayName = (v) => {
    if (lang === 'kn' && v.kn) return `${v.kn} (${v.name})`;
    return v.name;
  };

  const getTalukDisplayName = (tlk) => {
    if (lang === 'kn' && tlk.kn) return `${tlk.kn} (${tlk.name})`;
    return tlk.name;
  };

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
              {t.farmerOrigin || 'District'}
            </label>
            <select
              value={originDistrict}
              onChange={(e) => setOriginDistrict(e.target.value)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-hidden cursor-pointer"
            >
              {origins.map((orig) => (
                <option key={orig.district} value={orig.district} className="bg-[#09261c] text-white">
                  {getDistrictDisplayName(orig)}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Taluk / Town */}
          <div>
            <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center gap-1.5 font-sans">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              {t.farmerTaluk || 'Taluk / Local Town'}
            </label>
            <select
              value={originTaluk}
              onChange={(e) => setOriginTaluk(e.target.value)}
              className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-hidden cursor-pointer"
            >
              {talukList.length > 0 ? (
                talukList.map((tlk) => (
                  <option key={tlk.name} value={tlk.name} className="bg-[#09261c] text-white">
                    {getTalukDisplayName(tlk)}
                  </option>
                ))
              ) : (
                <option value="" className="bg-[#09261c] text-white">{originDistrict} Central</option>
              )}
            </select>
          </div>

          {/* 6. Village / Place Selector OR City Center Badge */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center justify-between font-sans">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                {t.farmerVillage || 'Select Village / Place'}
              </span>
              {!isCityLocation && villageList.length > 0 && (
                <span className="text-[11px] text-emerald-300 font-mono font-bold">
                  {villageList.length} villages
                </span>
              )}
            </label>

            {isCityLocation ? (
              <div className="w-full bg-emerald-500/15 border border-emerald-400/30 rounded-xl px-4 py-3 flex items-center gap-3 backdrop-blur-md">
                <Building2 className="w-4 h-4 text-emerald-300 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">
                    {originTaluk === 'Koppal City' ? 'Koppal City Center' : `${originTaluk || originDistrict} City`}
                  </p>
                  <p className="text-[11px] text-emerald-300/90 font-medium">
                    {lang === 'kn' ? 'ನಗರ ಪ್ರದೇಶ (ನೇರ ಎಪಿಎಂಸಿ - ಗ್ರಾಮ ಆಯ್ಕೆ ಅಗತ್ಯವಿಲ್ಲ)' : 'City Center Area (Direct Mandi Dispatch — No village needed)'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <select
                  value={isCustomVillage ? '__CUSTOM__' : originVillage}
                  onChange={(e) => {
                    if (e.target.value === '__CUSTOM__') {
                      setIsCustomVillage(true);
                      setOriginVillage('');
                    } else {
                      setIsCustomVillage(false);
                      setOriginVillage(e.target.value);
                    }
                  }}
                  className="w-full glass-input rounded-xl px-3.5 py-2.5 text-sm font-medium text-white focus:outline-hidden cursor-pointer"
                >
                  {villageList.map((v) => (
                    <option key={v.name} value={v.name} className="bg-[#09261c] text-white">
                      {getVillageDisplayName(v)}
                    </option>
                  ))}
                  <option value="__CUSTOM__" className="bg-[#09261c] text-white">✍️ Other / Enter Custom Village Name...</option>
                </select>

                {isCustomVillage && (
                  <input
                    type="text"
                    autoFocus
                    value={originVillage}
                    onChange={(e) => setOriginVillage(e.target.value)}
                    placeholder={t.villagePlaceholder || "Type your village or farm location..."}
                    className="mt-2 w-full glass-input rounded-xl px-3.5 py-2 text-xs font-medium text-white placeholder:text-white/40 focus:outline-hidden border-emerald-400/50"
                  />
                )}
              </>
            )}

            {/* Nearest APMC Badge */}
            {nearestApmc && (
              <div className="mt-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/70">{t.nearestApmcBadge || 'Nearest APMC'}:</span>
                  <span className="font-bold text-emerald-300">{nearestApmc.marketName}</span>
                </div>
                <div className="text-white/90 font-bold">
                  {nearestApmc.roadDistanceKm} km <span className="text-white/50 font-normal">({nearestApmc.transitHours}h)</span>
                </div>
              </div>
            )}
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
