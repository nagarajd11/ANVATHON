import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sliders, 
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import FarmerInputForm from './FarmerInputForm';
import SensitivityLab from './SensitivityLab';

export default function FarmerConfigView({
  lang = 'en',
  crops = [],
  origins = [],
  vehicleCatalog = {},
  selectedCrop = 'Tomato',
  setSelectedCrop = () => {},
  quantity = 8,
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
  fuelRateMultiplier = 1.0,
  setFuelRateMultiplier = () => {},
  spoilageMultiplier = 1.0,
  setSpoilageMultiplier = () => {},
  cessRateOverride = 0.015,
  setCessRateOverride = () => {},
  speedKmph = 40,
  setSpeedKmph = () => {},
  onResetSensitivity = () => {},
  onRunAnalysis = () => {},
  onBackToLanding = () => {},
  isLoading = false,
  onShowToast = () => {},
  isListening = false,
  onToggleVoiceCommand = () => {}
}) {
  const [showAdvancedAssumptions, setShowAdvancedAssumptions] = useState(false);

  const labels = {
    en: {
      backBtn: "← Back",
      stepBadge: "Step 1: Your Harvest",
      title: "Your Harvest & Farm Hub",
      subtitle: "Enter what you're cutting and where from. We'll do the road math.",
      showAssumptions: "Optional: Tweak diesel price & road decay rates",
      hideAssumptions: "Hide cost adjustments",
      runBtn: "Calculate Real Cash Profit →",
      calculating: "Comparing 200 mandis..."
    },
    kn: {
      backBtn: "← ಹಿಂದಕ್ಕೆ",
      stepBadge: "ಹಂತ 1: ಬೆಳೆಯ ವಿವರ",
      title: "ನಿಮ್ಮ ಬೆಳೆ ಮತ್ತು ಊರಿನ ವಿವರ",
      subtitle: "ನಿಮ್ಮ ಬೆಳೆ, ತೂಕ ಮತ್ತು ಗ್ರಾಮ ಆರಿಸಿ. ರಸ್ತೆ ಮತ್ತು ಲಾಭದ ಲೆಕ್ಕ ನಾವು ಹಾಕುತ್ತೇವೆ.",
      showAssumptions: "ಹೆಚ್ಚುವರಿ: ಡೀಸೆಲ್ ದರ ಮತ್ತು ಹಾಳಾಗುವಿಕೆ ಬದಲಾಯಿಸಿ",
      hideAssumptions: "ಹೆಚ್ಚುವರಿ ವಿವರ ಮುಚ್ಚಿ",
      runBtn: "ನನ್ನ ಅಸಲಿ ಲಾಭ ನೋಡಿ →",
      calculating: "200 ಮಂಡಿಗಳ ಲೆಕ್ಕ ಹಾಕಲಾಗುತ್ತಿದೆ..."
    },
    hi: {
      backBtn: "← वापस",
      stepBadge: "चरण 1: फसल का विवरण",
      title: "आपकी फसल और संकलन केंद्र",
      subtitle: "अपनी फसल, मात्रा और गांव चुनें। बाकी सड़क और मुनाफे का हिसाब हम करेंगे।",
      showAssumptions: "वैकल्पिक: डीजल दर एवं रास्ते की खराबी बदलें",
      hideAssumptions: "लागत विवरण छिपाएं",
      runBtn: "असली नकद मुनाफा निकालें →",
      calculating: "200 मंडियों का विश्लेषण जारी..."
    }
  };

  const l = labels[lang] || labels.en;

  const handleValidateAndRun = () => {
    if (!quantity || quantity <= 0) {
      onShowToast(lang === 'kn' ? 'ದಯವಿಟ್ಟು ಸರಿಯಾದ ಪ್ರಮಾಣ ನಮೂದಿಸಿ' : 'Please enter a valid harvest quantity');
      return;
    }
    onRunAnalysis();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-16">
      
      {/* Top Simple Header with Back Button */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBackToLanding}
          className="btn-secondary !py-1.5 !px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:border-emerald-400"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-emerald-300" />
          <span>{l.backBtn}</span>
        </button>

        <span className="text-xs font-mono font-bold text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30">
          {l.stepBadge}
        </span>
      </div>

      {/* Main Form Deck */}
      <div className="space-y-4">
        <FarmerInputForm
          lang={lang}
          crops={crops}
          origins={origins}
          vehicleCatalog={vehicleCatalog}
          selectedCrop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
          quantity={quantity}
          setQuantity={setQuantity}
          freshness={freshness}
          setFreshness={setFreshness}
          originDistrict={originDistrict}
          setOriginDistrict={setOriginDistrict}
          originTaluk={originTaluk}
          setOriginTaluk={setOriginTaluk}
          originVillage={originVillage}
          setOriginVillage={setOriginVillage}
          nearestApmc={nearestApmc}
          vehicleType={vehicleType}
          setVehicleType={setVehicleType}
          onCalculate={handleValidateAndRun}
          isLoading={isLoading}
          onShowToast={onShowToast}
          isListening={isListening}
          onToggleVoiceCommand={onToggleVoiceCommand}
          hideSubmitButton={true}
        />

        {/* Collapsible Advanced Assumptions (Optional) */}
        <div className="glass-card rounded-2xl p-4 border border-white/10">
          <button
            type="button"
            onClick={() => setShowAdvancedAssumptions(!showAdvancedAssumptions)}
            className="w-full flex items-center justify-between text-xs font-semibold text-white/80 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showAdvancedAssumptions ? l.hideAssumptions : l.showAssumptions}</span>
            </div>
            {showAdvancedAssumptions ? (
              <ChevronUp className="w-4 h-4 text-emerald-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-white/50" />
            )}
          </button>

          {showAdvancedAssumptions && (
            <div className="mt-4 pt-3 border-t border-white/10">
              <SensitivityLab
                lang={lang}
                fuelRateMultiplier={fuelRateMultiplier}
                setFuelRateMultiplier={setFuelRateMultiplier}
                spoilageMultiplier={spoilageMultiplier}
                setSpoilageMultiplier={setSpoilageMultiplier}
                cessRateOverride={cessRateOverride}
                setCessRateOverride={setCessRateOverride}
                speedKmph={speedKmph}
                setSpeedKmph={setSpeedKmph}
                onReset={onResetSensitivity}
              />
            </div>
          )}
        </div>

        {/* Big Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleValidateAndRun}
            disabled={isLoading}
            className="w-full btn-shimmer btn-primary !py-4 text-base font-display font-black flex items-center justify-center gap-2 shadow-[0_10px_35px_-5px_rgba(16,185,129,0.55)] cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <span className="font-mono">{l.calculating}</span>
            ) : (
              <>
                <span>{l.runBtn}</span>
                <ArrowRight className="w-5 h-5 text-pine" />
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}