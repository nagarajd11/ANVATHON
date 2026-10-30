import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import BackgroundVideo from './components/BackgroundVideo';
import FluidRippleCanvas from './components/FluidRippleCanvas';
import FarmerInputForm from './components/FarmerInputForm';
import TheTwistCard from './components/TheTwistCard';
import MarketMap from './components/MarketMap';
import MarketLeaderboard from './components/MarketLeaderboard';
import SensitivityLab from './components/SensitivityLab';
import CostBreakdownChart from './components/CostBreakdownChart';
import CropPoolingHub from './components/CropPoolingHub';
import TransporterDirectory from './components/TransporterDirectory';
import FarmerDispatchSlip from './components/FarmerDispatchSlip';
import SavedAnalysesModal from './components/SavedAnalysesModal';
import { TRANSLATIONS } from './translations';
import { voiceAssistant } from './utils/voiceAssistant';
import { useVoiceAssistant } from './hooks/useVoiceAssistant';
import { parseVoiceCommand, generateVoiceFeedback } from './utils/voiceCommandParser';
import { CheckCircle, Sparkles, Sprout, BarChart3, Map, Truck, ShieldCheck, Sliders } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];

  const handleSetLang = (newLang) => {
    voiceAssistant.stop();
    setLang(newLang);
    const speechLocales = { en: 'English (en-IN)', kn: 'ಕನ್ನಡ (kn-IN)', hi: 'हिन्दी (hi-IN)' };
    showToast(`🌐 Speech Locale: ${speechLocales[newLang] || newLang}`);
  };

  // Active view tab: 'rankings' | 'map' | 'logistics'
  const [activeTab, setActiveTab] = useState('rankings');

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

  // WebGL Interactive Fluid Wave Ripple FX State
  const [isFluidFxEnabled, setIsFluidFxEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem('harvestroute_fluid_fx');
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const handleToggleFluidFx = () => {
    setIsFluidFxEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('harvestroute_fluid_fx', JSON.stringify(next));
      } catch {}
      showToast(next ? '🌊 Fluid Water Ripples Active' : 'Static Background Active');
      return next;
    });
  };

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
  // Auto-sync village when taluk changes (clears village if farmer is in city like Koppal City)
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
      }
    } catch (err) {
      console.error('Analysis execution failed:', err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCrop, quantity, originDistrict, originTaluk, originVillage, vehicleType, freshness, fuelRateMultiplier, spoilageMultiplier, cessRateOverride, speedKmph]);

  // Initial analysis once origins are loaded
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
    showToast(`Loaded scenario: ${saved.crop_name} (${saved.quantity_quintals} qtl) from ${saved.origin_district}`);
  };

  
  const { speak, stop: stopVoice, startListening, stopListening, isListening } = useVoiceAssistant(lang);

  const handleToggleVoiceCommand = () => {
    if (isListening) {
      stopListening();
      return;
    }

    startListening({
      onStart: () => {
        showToast(t.listeningActive || '🎙️ Listening... Speak origin, crop, quantity, vehicle');
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
          document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' });
          feedbackChanges.push('Open Map');
        }

        if (parsed.triggerOpenSlip) {
          setMarketForSlip(analysis?.topOpportunity || null);
          setIsDispatchSlipOpen(true);
          feedbackChanges.push('Open Slip');
        }

        if (parsed.triggerOpenPooling) {
          document.getElementById('pooling-section')?.scrollIntoView({ behavior: 'smooth' });
          feedbackChanges.push('Truck Pooling');
        }

        if (parsed.triggerResetForm) {
          setSelectedCrop('Tomato');
          setQuantity(20);
          setOriginDistrict('Davanagere');
          setVehicleType('BOLERO_PICKUP');
          setFreshness(6);
          handleResetSensitivity();
          feedbackChanges.push('Reset Form');
        }

        // Calculate Trigger
        if (parsed.triggerCalculate) {
          executeAnalysis(updatedParams);
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
        showToast(`🎙️ "${transcriptDisplay}" → ${summaryText}`);
      },
      onError: (err) => {
        console.warn('Voice command recognition error:', err);
        showToast(err.message || 'Microphone error. Please allow microphone permissions.');
      }
    });
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-emerald-500/30 selection:text-emerald-950">
      
      {/* Scroll-Locked Background Video Layer */}
      <BackgroundVideo />

      {/* Interactive Real-Time WebGL Water Ripple & Fluid Wave */}
      <FluidRippleCanvas enabled={isFluidFxEnabled} />

      {/* Main Foreground Interface */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 glass-dark-card text-white px-5 py-3 rounded-2xl shadow-xl border border-white/20 flex items-center gap-3 text-xs animate-bounce font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="font-sans">{toastMessage}</span>
          </div>
        )}

        {/* Top Navigation */}
        <Navbar
          lang={lang}
          setLang={handleSetLang}
          isFluidFxEnabled={isFluidFxEnabled}
          onToggleFluidFx={handleToggleFluidFx}
          isListening={isListening}
          onToggleVoiceCommand={handleToggleVoiceCommand}
          onSelectTab={(tab) => {
            const id = tab === 'logistics' ? 'pooling-section' : tab === 'map' ? 'map-section' : 'rankings-section';
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Hero Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-6 pt-1">
          <div className="glass-floating rounded-3xl p-6 sm:p-10 text-white border border-white/20 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.3)] backdrop-blur-md relative overflow-hidden">
            
            <div className="relative z-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                  <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                  {t.domainBadge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-white/70 bg-white/5 border border-white/10">
                  {t.datasetBadge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-400/20">
                  {t.noLoginBadge}
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.12] text-crisp">
                Find the market that pays the most in your pocket — after all costs.
              </h2>

              <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed font-sans max-w-3xl">
                A higher price two hours away isn't worth it if fuel, road spoilage, and yard fees eat your margin. HarvestRoute calculates your real take-home earnings across Karnataka mandis so you always pick the best destination.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-5 pt-4 border-t border-white/10 text-xs text-white/70 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>62 Karnataka Mandis Monitored</span>
                </div>
                <span>•</span>
                <div>
                  <span>Haversine Road Distance Matrix</span>
                </div>
                <span>•</span>
                <div>
                  <span>Real Spoilage & Freshness Decay</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Ledger */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 flex-1 w-full">
          
{/* Farmer Lot Configuration */}
          <div className="mb-8">
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
              nearestApmc={analysis?.nearestApmc}
              vehicleType={vehicleType}
              setVehicleType={setVehicleType}
              onCalculate={() => executeAnalysis()}
              isLoading={isLoading}
              onShowToast={showToast}
              isListening={isListening}
              onToggleVoiceCommand={handleToggleVoiceCommand}
            />
          </div>

          {/* GROUP 2: The Twist — Side-by-side Showcase (Core Decision) */}
          {analysis && (
            <TheTwistCard
              analysis={analysis}
              lang={lang}
              onFocusMarket={(mkt) => {
                setMarketForSlip(mkt);
                setIsDispatchSlipOpen(true);
              }}
            />
          )}

          {/* Quick Jump Navigation Bar */}
          {analysis && (
            <div className="flex items-center justify-between flex-wrap gap-3 mb-8 py-3 px-5 glass-floating rounded-2xl border border-white/15">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-white/50">
                  Quick Jump:
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-secondary !py-1.5 !px-3 text-xs"
                  >
                    <Map className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Route Map</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => document.getElementById('sensitivity-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-secondary !py-1.5 !px-3 text-xs"
                  >
                    <Sliders className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Cost Sliders</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => document.getElementById('rankings-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-secondary !py-1.5 !px-3 text-xs"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Mandi Rankings & Bill</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => document.getElementById('pooling-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-secondary !py-1.5 !px-3 text-xs"
                  >
                    <Truck className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Truck Sharing & Transporters</span>
                  </button>
                </div>
              </div>
              <div className="text-xs text-white/50 font-mono hidden sm:block">
                All 62 Karnataka Mandis Active
              </div>
            </div>
          )}

          {/* 3. Interactive Route & Logistics Map (Directly Visible on Page) */}
          {analysis && (
            <section id="map-section" className="mb-8 scroll-mt-20">
              <MarketMap
                analysis={analysis}
                lang={lang}
              />
            </section>
          )}

          {/* 4. Market Conditions & Cost Sliders */}
          <section id="sensitivity-section" className="mb-8 scroll-mt-20">
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
              onReset={handleResetSensitivity}
            />
          </section>

          {/* 5. Ranked Market Ledger & Itemized Deduction Bills */}
          {analysis && (
            <section id="rankings-section" className="mb-8 scroll-mt-20">
              <MarketLeaderboard
                analysis={analysis}
                lang={lang}
                onSelectMarketForSlip={(mkt) => {
                  setMarketForSlip(mkt);
                  setIsDispatchSlipOpen(true);
                }}
              />
            </section>
          )}

          {/* 5. Visual Net Return vs Gross Mirage Breakdown */}
          {analysis && (
            <section id="breakdown-section" className="mb-8 scroll-mt-20">
              <CostBreakdownChart
                analysis={analysis}
                lang={lang}
              />
            </section>
          )}

          {/* 6. Farmer Crop Pooling & Group Freight Sharing */}
          <section id="pooling-section" className="mb-8 scroll-mt-20">
            <CropPoolingHub
              lang={lang}
              origins={origins}
              crops={crops}
              vehicleCatalog={vehicleCatalog}
              currentDistrict={originDistrict}
              currentCrop={selectedCrop}
              currentQuantity={quantity}
              onShowToast={showToast}
            />
          </section>

          {/* 7. Verified Regional Transporters Directory */}
          <section id="transporters-section" className="mb-8 scroll-mt-20">
            <TransporterDirectory
              dealers={dealers}
              lang={lang}
              currentVehicleType={vehicleType}
              onSelectVehicle={(vType) => {
                setVehicleType(vType);
                executeAnalysis({ vehicleType: vType });
                showToast(`Vehicle updated to ${vType}. Analysis recalculated!`);
              }}
            />
          </section>

        </main>

        {/* Modals */}
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
        <footer className="glass-floating border-t border-white/15 text-white/70 py-7 text-xs backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-pine flex items-center justify-center font-bold font-sans text-xs">
                HR
              </div>
              <span className="font-bold text-white font-sans">HarvestRoute</span>
              <span>•</span>
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
