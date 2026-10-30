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
import { CheckCircle, Sparkles, Sprout, BarChart3, Map, Truck, ShieldCheck, Sliders } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];

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

  // 2. Perform Analysis Function
  const executeAnalysis = useCallback(async (params = {}) => {
    setIsLoading(true);
    try {
      const payload = {
        cropName: params.cropName || selectedCrop,
        quantityQuintals: params.quantity !== undefined ? params.quantity : quantity,
        originDistrict: params.originDistrict || originDistrict,
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
  }, [selectedCrop, quantity, originDistrict, vehicleType, freshness, fuelRateMultiplier, spoilageMultiplier, cessRateOverride, speedKmph]);

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
  }, [selectedCrop, quantity, freshness, originDistrict, vehicleType, fuelRateMultiplier, spoilageMultiplier, cessRateOverride, speedKmph]);

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
          setLang={setLang}
          isFluidFxEnabled={isFluidFxEnabled}
          onToggleFluidFx={handleToggleFluidFx}
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
              vehicleType={vehicleType}
              setVehicleType={setVehicleType}
              onCalculate={() => executeAnalysis()}
              isLoading={isLoading}
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
