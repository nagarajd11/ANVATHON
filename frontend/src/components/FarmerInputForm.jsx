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
Mic,
  MicOff,
  Volume2,
  Building2,
  Compass,
  Navigation
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { parseVoiceCommand, generateVoiceFeedback } from '../utils/voiceCommandParser';

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
  isLoading = false,
  onShowToast = () => {},
  isListening: externalIsListening,
  onToggleVoiceCommand: externalToggleVoiceCommand,
  hideSubmitButton = false
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

  const internalVoice = useVoiceAssistant(lang);
  const isListening = externalIsListening !== undefined ? externalIsListening : internalVoice.isListening;
  const stopListening = externalToggleVoiceCommand || internalVoice.stopListening;

  const handleToggleVoiceCommand = () => {
    if (externalToggleVoiceCommand) {
      externalToggleVoiceCommand();
      return;
    }

    if (internalVoice.isListening) {
      internalVoice.stopListening();
      return;
    }

    internalVoice.startListening({
      onStart: () => {
        if (onShowToast) onShowToast(t.listeningState);
      },
      onResult: (primaryTranscript, event, alternatives) => {
        const parsed = parseVoiceCommand(alternatives && alternatives.length ? alternatives : primaryTranscript);
        if (!parsed) return;

        const summary = [];
        if (parsed.matchedOrigin) {
          setOriginDistrict(parsed.matchedOrigin);
          summary.push(parsed.matchedOrigin);
        }
        if (parsed.matchedCrop) {
          setSelectedCrop(parsed.matchedCrop);
          summary.push(parsed.matchedCrop);
        }
        if (parsed.matchedQuantity) {
          setQuantity(parsed.matchedQuantity);
          summary.push(`${parsed.matchedQuantity} qtl`);
        }
        if (parsed.matchedVehicle) {
          setVehicleType(parsed.matchedVehicle);
          summary.push(parsed.matchedVehicle);
        }
        if (parsed.matchedFreshness) {
          setFreshness(parsed.matchedFreshness);
          summary.push(`${parsed.matchedFreshness}h`);
        }
        if (parsed.triggerCalculate) {
          onCalculate();
          summary.push('Calculate');
        }

        const speech = generateVoiceFeedback(parsed, lang, {
          originDistrict: parsed.matchedOrigin || originDistrict,
          selectedCrop: parsed.matchedCrop || selectedCrop,
          quantity: parsed.matchedQuantity !== null ? parsed.matchedQuantity : quantity,
          vehicleType: parsed.matchedVehicle || vehicleType
        });

        if (speech) {
          internalVoice.speak(speech, 'voice-confirm');
        }

        if (onShowToast) {
          onShowToast(`🎙️ "${parsed.rawText || primaryTranscript}" → ${summary.join(', ')}`);
        }
      },
      onError: (err) => {
        console.warn('Voice recognition error:', err);
        if (onShowToast) {
          onShowToast(err.message || 'Microphone error. Please allow microphone access in your browser.');
        }
      }
    });
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7 hover-lift h-full flex flex-col justify-between">
      
      <div>
        {/* Header with human, respectful tone */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
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

          {/* Voice Command Microphone Button */}
          <button
            type="button"
            onClick={handleToggleVoiceCommand}
            className={`btn-secondary !py-2 !px-3.5 flex items-center gap-2 transition-all self-start sm:self-center cursor-pointer ${
              isListening 
                ? 'bg-rose-500/25 border-rose-400 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.4)] animate-pulse' 
                : 'hover:border-emerald-400/50 hover:text-emerald-300'
            }`}
            title={isListening ? 'Click to cancel voice input' : t.voiceMicBtn}
            aria-pressed={isListening}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4 text-rose-300 animate-bounce" />
                <span className="text-xs font-bold text-rose-200 font-sans">
                  {t.listeningActive}
                </span>
                <span className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                </span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4 text-emerald-300" />
                <span className="text-xs font-semibold text-white/90 font-sans">
                  {t.voiceMicBtn}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Live Listening Feedback Banner */}
        {isListening && (
          <div className="mb-4 p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-400/40 backdrop-blur-md flex items-center justify-between gap-3 text-xs animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <div>
                <div className="font-bold text-emerald-300 font-sans">{t.listeningState}</div>
                <div className="text-[11px] text-white/60 font-mono mt-0.5">{t.voiceHint}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleToggleVoiceCommand}
              className="text-xs text-white/60 hover:text-white px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 cursor-pointer shrink-0"
            >
              Cancel
            </button>
          </div>
        )}

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

          {/* 6. Village / Place Selector */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-white/90 mb-1.5 flex items-center justify-between font-sans">
              <span className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                {t.farmerVillage || 'Select Village / Place'}
              </span>
              {villageList.length > 0 ? (
                <span className="text-[11px] text-emerald-300 font-mono font-bold">
                  {villageList.length} villages
                </span>
              ) : (
                <span className="text-[11px] text-emerald-400 font-mono">
                  {originTaluk === 'Koppal City' ? 'City APMC Direct' : 'City Center Area'}
                </span>
              )}
            </label>

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
              {villageList.length > 0 ? (
                <>
                  <option value="" className="bg-[#09261c] text-white">
                    📍 {originTaluk} Taluk Main Yard / Center
                  </option>
                  {villageList.map((v) => (
                    <option key={v.name} value={v.name} className="bg-[#09261c] text-white">
                      {getVillageDisplayName(v)}
                    </option>
                  ))}
                </>
              ) : (
                <option value="" className="bg-[#09261c] text-white">
                  🏙️ {originTaluk === 'Koppal City' ? 'Koppal City Center' : `${originTaluk || originDistrict} City Center (Direct Mandi Dispatch)`}
                </option>
              )}
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

            {isCityLocation && !isCustomVillage && (
              <div className="mt-2 text-xs text-emerald-300/90 flex items-center gap-1.5 font-medium">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>
                  {lang === 'kn' 
                    ? 'ನಗರ ಪ್ರದೇಶ (ನೇರ ಎಪಿಎಂಸಿ ಮಂಡಿ - ಕನಿಷ್ಠ ಸಾಗಾಣಿಕೆ ದರ)' 
                    : 'City Center Area (Direct Mandi Dispatch — lowest transit distance)'}
                </span>
              </div>
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

          {/* 5. Auto-Allocated Logistics Indicator */}
          <div className="sm:col-span-2">
            <div className="bg-emerald-500/10 border border-emerald-400/25 rounded-2xl p-4 flex items-start gap-3.5 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-400/30">
                <Truck className="w-5 h-5 text-emerald-300" />
              </div>
              <div className="flex-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-white font-sans text-xs sm:text-sm">
                    {lang === 'kn' ? 'ಸ್ವಯಂಚಾಲಿತ ವಾಹನ ಮತ್ತು ಚಾಲಕರ ಹಂಚಿಕೆ' : 'Auto-Allocated Vehicle & Verified Driver'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider border border-emerald-400/30">
                    AUTOMATIC
                  </span>
                </div>
                <p className="text-white/70 text-xs mt-1 font-sans leading-relaxed">
                  {lang === 'kn' 
                    ? 'ಲೆಕ್ಕಾಚಾರ ಮಾಡಿದಾಗ, ನಮ್ಮ ಎಂಜಿನ್ ನಿಮ್ಮ ಬೆಳೆ ಗಾತ್ರಕ್ಕೆ ಗರಿಷ್ಠ ನಿವ್ವಳ ಲಾಭ ನೀಡುವ ಅತ್ಯುತ್ತಮ ವಾಹನ ಮತ್ತು ಸ್ಥಳೀಯ ಪರಿಶೀಲಿತ ಚಾಲಕರ ನೇರ ಸಂಪರ್ಕ ಸಂಖ್ಯೆಯನ್ನು ಹಂಚಿಕೆ ಮಾಡುತ್ತದೆ.'
                    : 'When you click calculate, our engine automatically selects the vehicle delivering highest net take-home return and assigns a verified local driver with their direct contact phone number.'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Action Footer */}
      {!hideSubmitButton && (
      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-white/60 font-sans">
          Real-time prices updated across all 200 Karnataka APMCs
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

      )}
    </div>
  );
}
