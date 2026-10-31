import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import BackgroundVideo from './components/BackgroundVideo';
import FluidRippleCanvas from './components/FluidRippleCanvas';
import LandingView from './components/LandingView';
import FarmerConfigView from './components/FarmerConfigView';
import AnalysisResultsView from './components/AnalysisResultsView';
import FarmerDispatchSlip from './components/FarmerDispatchSlip';
import SavedAnalysesModal from './components/SavedAnalysesModal';
import { TRANSLATIONS } from './translations';
import { voiceAssistant } from './utils/voiceAssistant';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';
import { parseVoiceCommand, generateVoiceFeedback } from './utils/voiceCommandParser';
import { CheckCircle } from 'lucide-react';

const viewVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      type: 'spring', 
      damping: 28, 
      stiffness: 240, 
      mass: 0.85 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -14, 
    transition: { 
      duration: 0.2, 
      ease: [0.4, 0, 0.2, 1] 
    } 
  }
};

export default function App() {
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // View Router State: 'landing' | 'config' | 'analysis'
  const [currentView, setCurrentView] = useState('landing');

  const handleSetLang = (newLang) => {
    voiceAssistant.stop();
    setLang(newLang);
    const speechLocales = { en: 'English (en-IN)', kn: 'α▓òα▓¿α│ìα▓¿α▓í (kn-IN)', hi: 'αñ╣αñ┐αñ¿αÑìαñªαÑÇ (hi-IN)' };
    showToast(`≡ƒîÉ Speech Locale: ${speechLocales[newLang] || newLang}`);
  };

  // System & Reference data
  const [crops, setCrops] = useState([]);
  const [origins, setOrigins] = useState([]);
  const [vehicleCatalog, setVehicleCatalog] = useState({});
  const [dealers, setDealers] = useState([]);

  // Farmer Form State
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [quantity, setQuantity] = useState(8);
  const [freshness, setFreshness] = useState(6);
  const [originDistrict, setOriginDistrict] = useState('Chamarajanagar');
  const [originTaluk, setOriginTaluk] = useState('');
  const [originVillage, setOriginVillage] = useState('');
  const [vehicleType, setVehicleType] = useState('BOLERO_PICKUP');

  // Sensitivity Sliders
  const [fuelRateMultiplier, setFuelRateMultiplier] = useState(1.0);
  const [spoilageMultiplier, setSpoilageMultiplier] = useState(1.0);
  const [cessRateOverride, setCessRateOverride] = useState(0.015);
  const [speedKmph, setSpeedKmph] = useState(40);

  // Analysis Result
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Modals
  const [isDispatchSlipOpen, setIsDispatchSlipOpen] = useState(false);
  const [marketForSlip, setMarketForSlip] = useState(null);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // 1. Initial Load of Reference Data
  useEffect(() => {
    async function initData() {
      try {
        const [cropsRes, originsRes, transRes] = await Promise.all([
          fetch('/api/crops').then(r => r.json()),
          fetch('/api/origins').then(r => r.json()),
          fetch('/api/transporters').then(r => r.json())
        ]);

        setCrops(cropsRes);
        setOrigins(originsRes);
        if (transRes.vehicleCatalog) setVehicleCatalog(transRes.vehicleCatalog);
        if (transRes.dealers) setDealers(transRes.dealers);
      } catch (err) {
        console.error('Failed to load initial metadata:', err);
      }
    }
    initData();
  }, []);

  // Auto-sync village when taluk changes (clears village if farmer is in city)
  useEffect(() => {
    const curDist = origins.find(o => o.district === originDistrict);
    const curTaluk = curDist?.taluks?.find(t => t.name === originTaluk);
    if (curTaluk) {
      if (curTaluk.isCity || curTaluk.name === 'Koppal City' || !curTaluk.villages || curTaluk.villages.length === 0) {
        setOriginVillage('');
      } else {
        const exists = curTaluk.villages.some(v => v.name === originVillage);
        if (!exists) {
          setOriginVillage(curTaluk.villages[0].name);
        }
      }
    }
  }, [originTaluk, originDistrict, origins]);

  // Auto-sync taluk when district changes
  useEffect(() => {
    const cur = origins.find(o => o.district === originDistrict);
    if (cur && cur.taluks && cur.taluks.length > 0) {
      const exists = cur.taluks.some(t => t.name === originTaluk);
      if (!exists) {
        const ruralTaluk = cur.taluks.find(t => !t.isCity && t.villages && t.villages.length > 0);
        const defaultTaluk = ruralTaluk || cur.taluks[0];
        setOriginTaluk(defaultTaluk.name);
      }
    }
  }, [originDistrict, origins]);

  // 2. Perform Analysis Function
  const executeAnalysis = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const payload = {
        cropName: params.cropName || selectedCrop,
        quantityQuintals: params.quantity !== undefined ? params.quantity : quantity,
        originDistrict: params.originDistrict || originDistrict,
        originTaluk: params.originTaluk !== undefined ? params.originTaluk : originTaluk,
        originVillage: params.originVillage !== undefined ? params.originVillage : originVillage,
        vehicleType: params.vehicleType || vehicleType,
        freshnessHours: params.freshness !== undefined ? params.freshness : freshness,
        fuelRateMultiplier: params.fuelRateMultiplier !== undefined ? params.fuelRateMultiplier : fuelRateMultiplier,
        spoilageMultiplier: params.spoilageMultiplier !== undefined ? params.spoilageMultiplier : spoilageMultiplier,
        cessRateOverride: params.cessRateOverride !== undefined ? params.cessRateOverride : cessRateOverride,
        speedKmph: params.speedKmph !== undefined ? params.speedKmph : speedKmph
      };

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setAnalysis(data);
        return data;
      }
    } catch (err) {
      console.error('Analysis execution failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCrop, quantity, originDistrict, originTaluk, originVillage, vehicleType, freshness, fuelRateMultiplier, spoilageMultiplier, cessRateOverride, speedKmph]);

  // Initial background analysis once origins are loaded
  useEffect(() => {
    if (origins.length > 0) {
      executeAnalysis();
    }
  }, [origins.length]);

  // Sensitivity Sliders Debounced Live Recalculation
  useEffect(() => {
    if (!analysis) return;
    const timer = setTimeout(() => {
      executeAnalysis();
    }, 250);
    return () => clearTimeout(timer);
  }, [selectedCrop, quantity, freshness, originDistrict, originTaluk, originVillage, vehicleType, fuelRateMultiplier, spoilageMultiplier, cessRateOverride, speedKmph]);

  // Reset Sensitivity
  const handleResetSensitivity = () => {
    setFuelRateMultiplier(1.0);
    setSpoilageMultiplier(1.0);
    setCessRateOverride(0.015);
    setSpeedKmph(40);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLoadSavedScenario = (saved) => {
    setSelectedCrop(saved.crop_name);
    setQuantity(saved.quantity_quintals);
    setOriginDistrict(saved.origin_district);
    if (saved.vehicle_type) setVehicleType(saved.vehicle_type);
    executeAnalysis({
      cropName: saved.crop_name,
      quantity: saved.quantity_quintals,
      originDistrict: saved.origin_district,
      vehicleType: saved.vehicle_type
    });
    setCurrentView('analysis');
    showToast(`Loaded scenario: ${saved.crop_name} (${saved.quantity_quintals} qtl) from ${saved.origin_district}`);
  };

  const handleRunAnalysisFromConfig = async () => {
    await executeAnalysis();
    setCurrentView('analysis');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectView = (view) => {
    if (view === 'analysis' && !analysis) {
      executeAnalysis();
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Voice Assistant Hook & Parser
  const { speak, stop: stopVoice, startListening, stopListening, isListening } = useVoiceAssistant(lang);

  const handleToggleVoiceCommand = () => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening({
      onStart: () => {
        showToast(t.listeningActive || '≡ƒÄÖ∩╕Å Listening... Speak origin, crop, quantity, vehicle');
      },
      onResult: (primaryTranscript, event, alternatives) => {
        const parsed = parseVoiceCommand(alternatives && alternatives.length ? alternatives : primaryTranscript);
        if (!parsed) return;

        const updatedParams = {};
        const feedbackChanges = [];

        if (parsed.matchedOrigin) {
          setOriginDistrict(parsed.matchedOrigin);
          updatedParams.originDistrict = parsed.matchedOrigin;
          feedbackChanges.push(parsed.matchedOrigin);
        }

        if (parsed.matchedCrop) {
          setSelectedCrop(parsed.matchedCrop);
          updatedParams.cropName = parsed.matchedCrop;
          feedbackChanges.push(parsed.matchedCrop);
        }

        if (parsed.matchedQuantity !== null && parsed.matchedQuantity !== undefined) {
          setQuantity(parsed.matchedQuantity);
          updatedParams.quantity = parsed.matchedQuantity;
          feedbackChanges.push(`${parsed.matchedQuantity} qtl`);
        }

        if (parsed.matchedVehicle) {
          setVehicleType(parsed.matchedVehicle);
          updatedParams.vehicleType = parsed.matchedVehicle;
          feedbackChanges.push(parsed.matchedVehicle);
        }

        if (parsed.matchedFreshness !== null && parsed.matchedFreshness !== undefined) {
          setFreshness(parsed.matchedFreshness);
          updatedParams.freshness = parsed.matchedFreshness;
          feedbackChanges.push(`${parsed.matchedFreshness}h`);
        }

        // Sensitivity adjustments
        if (parsed.sensitivityUpdates.fuelRateMultiplier !== undefined) {
          setFuelRateMultiplier(parsed.sensitivityUpdates.fuelRateMultiplier);
          updatedParams.fuelRateMultiplier = parsed.sensitivityUpdates.fuelRateMultiplier;
          feedbackChanges.push('Fuel Rate');
        }

        if (parsed.sensitivityUpdates.spoilageMultiplier !== undefined) {
          setSpoilageMultiplier(parsed.sensitivityUpdates.spoilageMultiplier);
          updatedParams.spoilageMultiplier = parsed.sensitivityUpdates.spoilageMultiplier;
          feedbackChanges.push('Spoilage');
        }

        if (parsed.sensitivityUpdates.speedKmph !== undefined) {
          setSpeedKmph(parsed.sensitivityUpdates.speedKmph);
          updatedParams.speedKmph = parsed.sensitivityUpdates.speedKmph;
          feedbackChanges.push('Speed');
        }

        if (parsed.sensitivityUpdates.resetSensitivity) {
          handleResetSensitivity();
          feedbackChanges.push('Reset Sliders');
        }

        // Action Navigation
        if (parsed.triggerOpenMap) {
          setCurrentView('analysis');
          setTimeout(() => {
            document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
          feedbackChanges.push('Open Map');
        }

        if (parsed.triggerOpenSlip) {
          setMarketForSlip(analysis?.topOpportunity || null);
          setIsDispatchSlipOpen(true);
          feedbackChanges.push('Open Slip');
        }

        if (parsed.triggerOpenPooling) {
          setCurrentView('analysis');
          setTimeout(() => {
            document.getElementById('transporters-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 150);
          feedbackChanges.push('Transporters');
        }

        if (parsed.triggerResetForm) {
          setSelectedCrop('Tomato');
          setQuantity(8);
          setOriginDistrict('Chamarajanagar');
          setVehicleType('BOLERO_PICKUP');
          setFreshness(6);
          handleResetSensitivity();
          feedbackChanges.push('Reset Form');
        }

        // Calculate Trigger
        if (parsed.triggerCalculate) {
          executeAnalysis(updatedParams);
          setCurrentView('analysis');
          feedbackChanges.push('Calculate');
        }

        // Spoken audio feedback
        const speech = generateVoiceFeedback(parsed, lang, {
          originDistrict: parsed.matchedOrigin || originDistrict,
          selectedCrop: parsed.matchedCrop || selectedCrop,
          quantity: parsed.matchedQuantity !== null ? parsed.matchedQuantity : quantity,
          vehicleType: parsed.matchedVehicle || vehicleType
        });

        if (speech) {
          speak(speech, 'voice-confirm');
        }

        const transcriptDisplay = parsed.rawText || primaryTranscript;
        const summaryText = feedbackChanges.length > 0 ? feedbackChanges.join(', ') : 'Updated';
        showToast(`≡ƒÄÖ∩╕Å "${transcriptDisplay}" ΓåÆ ${summaryText}`);
      },
      onError: (err) => {
        console.warn('Voice command recognition error:', err);
        showToast(err.message || 'Microphone error. Please allow microphone permissions.');
      }
    });
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-950 flex flex-col justify-between">
      
      {/* 1. Persistent Scroll-Locked Background Video Layer */}
      <BackgroundVideo />

      {/* 2. Persistent Interactive Water Ripple WebGL Shader Canvas */}
      <FluidRippleCanvas enabled={true} />

      {/* 3. Main Foreground App Interface */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 glass-dark-card text-white px-5 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 text-xs animate-bounce font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="font-sans">{toastMessage}</span>
          </div>
        )}

        {/* Top Clean Navbar */}
        <Navbar
          lang={lang}
          setLang={handleSetLang}
          isListening={isListening}
          onToggleVoiceCommand={handleToggleVoiceCommand}
          onLogoClick={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Dynamic Multi-View Client-Side Router */}
        <main className="flex-1 w-full">
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: The Cinematic Landing & Explainer Page */}
            {currentView === 'landing' && (
              <motion.div
                key="landing"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <LandingView
                  lang={lang}
                  onLaunchCalculator={() => setCurrentView('config')}
                  totalMarkets={200}
                  totalCrops={28}
                />
              </motion.div>
            )}

            {/* VIEW 2: The Farmer Lot Configuration View */}
            {currentView === 'config' && (
              <motion.div
                key="config"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <FarmerConfigView
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
                  nearestApmc={analysis?.nearestApmc}
                  vehicleType={vehicleType}
                  setVehicleType={setVehicleType}
                  fuelRateMultiplier={fuelRateMultiplier}
                  setFuelRateMultiplier={setFuelRateMultiplier}
                  spoilageMultiplier={spoilageMultiplier}
                  setSpoilageMultiplier={setSpoilageMultiplier}
                  cessRateOverride={cessRateOverride}
                  setCessRateOverride={setCessRateOverride}
                  speedKmph={speedKmph}
                  setSpeedKmph={setSpeedKmph}
                  onResetSensitivity={handleResetSensitivity}
                  onRunAnalysis={handleRunAnalysisFromConfig}
                  onBackToLanding={() => setCurrentView('landing')}
                  isLoading={isLoading}
                  onShowToast={showToast}
                  isListening={isListening}
                  onToggleVoiceCommand={handleToggleVoiceCommand}
                />
              </motion.div>
            )}

            {/* VIEW 3: The Analysis & Twist Results View */}
            {currentView === 'analysis' && (
              <motion.div
                key="analysis"
                variants={viewVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AnalysisResultsView
                  analysis={analysis}
                  lang={lang}
                  onBackToConfig={() => setCurrentView('config')}
                  onOpenDispatchSlip={(mkt) => {
                    setMarketForSlip(mkt);
                    setIsDispatchSlipOpen(true);
                  }}
                  onOpenSavedModal={() => setIsSavedModalOpen(true)}
                  fuelRateMultiplier={fuelRateMultiplier}
                  setFuelRateMultiplier={setFuelRateMultiplier}
                  spoilageMultiplier={spoilageMultiplier}
                  setSpoilageMultiplier={setSpoilageMultiplier}
                  cessRateOverride={cessRateOverride}
                  setCessRateOverride={setCessRateOverride}
                  speedKmph={speedKmph}
                  setSpeedKmph={setSpeedKmph}
                  onResetSensitivity={handleResetSensitivity}
                  origins={origins}
                  crops={crops}
                  vehicleCatalog={vehicleCatalog}
                  dealers={dealers}
                  originDistrict={originDistrict}
                  selectedCrop={selectedCrop}
                  quantity={quantity}
                  vehicleType={vehicleType}
                  setVehicleType={setVehicleType}
                  onVehicleChange={(vType) => {
                    executeAnalysis({ vehicleType: vType });
                  }}
                  onShowToast={showToast}
                />
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* Global Modals */}
        <FarmerDispatchSlip
          isOpen={isDispatchSlipOpen}
          onClose={() => setIsDispatchSlipOpen(false)}
          analysis={analysis}
          marketOverride={marketForSlip}
        />

        <SavedAnalysesModal
          isOpen={isSavedModalOpen}
          onClose={() => setIsSavedModalOpen(false)}
          onLoadScenario={handleLoadSavedScenario}
        />

        {/* Editorial Footer */}
        <footer className="glass-floating border-t border-white/15 text-white/70 py-6 text-xs backdrop-blur-md relative z-10 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-pine flex items-center justify-center font-bold font-sans text-xs shadow-sm">
                HR
              </div>
              <span className="font-bold text-white font-sans">HarvestRoute</span>
              <span>ΓÇó</span>
              <span>Karnataka APMC Agricultural Marketing Network</span>
            </div>

            <div className="text-white/50 text-xs font-sans">
              Helping farmers take home more cash on every harvest.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
