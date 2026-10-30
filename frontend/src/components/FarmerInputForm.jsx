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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
      
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-agri-100 text-agri-700 rounded-lg">
            <Wheat className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">{t.lotDetailsTitle}</h2>
            <p className="text-xs text-slate-500">{t.datasetBadge}</p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Real Karnataka Mandi Prices
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
        
        {/* 1. Crop Dropdown */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Wheat className="w-3.5 h-3.5 text-agri-600" />
            {t.selectCrop}
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-agri-500 focus:bg-white transition-all cursor-pointer"
          >
            {crops.map((crop) => (
              <option key={crop.crop_id || crop.crop_name} value={crop.crop_name}>
                {getCropDisplayName(crop)}
              </option>
            ))}
          </select>
          {currentCropObj && (
            <div className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-500">
              <span className={`px-1.5 py-0.5 rounded font-semibold ${
                currentCropObj.perishability_tier === 'HIGH' ? 'bg-red-50 text-red-700 border border-red-200' :
                currentCropObj.perishability_tier === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-slate-100 text-slate-700'
              }`}>
                {currentCropObj.perishability_tier} Perishability
              </span>
            </div>
          )}
        </div>

        {/* 2. Quantity (Quintals) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-agri-600" />
            {t.enterQuantity}
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              max="500"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseFloat(e.target.value) || 1))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-agri-500 focus:bg-white transition-all"
            />
            <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-400">
              qtl (100kg)
            </span>
          </div>
          {/* Quick preset chips */}
          <div className="mt-1.5 flex items-center gap-1">
            {[5, 10, 20, 35, 50].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setQuantity(val)}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border cursor-pointer ${
                  quantity === val 
                    ? 'bg-agri-600 text-white border-agri-600' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border-slate-200'
                }`}
              >
                {val}q
              </button>
            ))}
          </div>
        </div>

        {/* 3. Freshness / Harvest Age */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-agri-600" />
            {t.freshnessWindow}
          </label>
          <select
            value={freshness}
            onChange={(e) => setFreshness(parseFloat(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-agri-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="6">{t.freshnessJustHarvested}</option>
            <option value="24">{t.freshness1Day}</option>
            <option value="48">{t.freshness2Days}</option>
          </select>
          <p className="mt-1.5 text-[11px] text-slate-400">
            Affects transit decay rate
          </p>
        </div>

        {/* 4. Origin District */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-agri-600" />
            {t.farmerOrigin}
          </label>
          <select
            value={originDistrict}
            onChange={(e) => setOriginDistrict(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-agri-500 focus:bg-white transition-all cursor-pointer"
          >
            {origins.map((orig) => (
              <option key={orig.district} value={orig.district}>
                {getDistrictDisplayName(orig)}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-[11px] text-slate-400">
            Center of farm / village route
          </p>
        </div>

        {/* 5. Transport Vehicle Class */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-agri-600" />
            {t.selectVehicle}
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-agri-500 focus:bg-white transition-all cursor-pointer"
          >
            {Object.entries(vehicleCatalog).map(([key, vh]) => (
              <option key={key} value={key}>
                {vh.name} (≤{vh.capacity}q | ₹{vh.ratePerKm}/km)
              </option>
            ))}
          </select>
          {currentVehicleObj.isReefer ? (
            <p className="mt-1.5 text-[11px] font-bold text-cyan-700 flex items-center gap-1">
              <Snowflake className="w-3 h-3 text-cyan-600" />
              85% Decay Elimination
            </p>
          ) : tripsNeeded > 1 ? (
            <p className="mt-1.5 text-[11px] font-bold text-amber-700 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              Requires {tripsNeeded} trips (cap: {currentVehicleObj.capacity}q)
            </p>
          ) : (
            <p className="mt-1.5 text-[11px] text-slate-400">
              Capacity: {currentVehicleObj.capacity} quintals
            </p>
          )}
        </div>

      </div>

      {/* Small Lot Optimization Callout */}
      {quantity <= 15 && (
        <div className="mt-5 p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-emerald-100 text-emerald-800 rounded-lg shrink-0">
              <Users className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                <span>{t.soloAlertBadge} ({quantity} Quintals)</span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 bg-emerald-200/60 text-emerald-800 rounded">
                  Save up to 75%
                </span>
              </div>
              <p className="text-[11px] text-emerald-800/80 mt-0.5">
                {t.soloAlertText}
              </p>
            </div>
          </div>
          <a
            href="#crop-pooling-section"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shrink-0 transition-colors shadow-2xs"
          >
            <span>{t.poolNavBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={onCalculate}
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-agri-700 via-agri-600 to-emerald-600 hover:from-agri-800 hover:to-emerald-700 text-white font-bold text-sm shadow-md shadow-agri-700/20 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <span>{t.calculating}</span>
          ) : (
            <>
              <span>{t.calculateBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
