import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import BackgroundVideo from './components/BackgroundVideo';
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
import { CheckCircle, Sparkles, Sprout, BarChart3, Map, Truck, ShieldCheck } from 'lucide-react';

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
          onSelectTab={(tab) => {
            setActiveTab(tab);
            const el = document.getElementById('details-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Hero Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-6 pt-1">
          <div className="glass-floating rounded-3xl p-6 sm:p-10 text-white border border-white/20 shadow-[0_16px_40px_-10px_rgba(0,0,0,0.3)] backdrop-blur-md relative overflow-hidden">
            
            <div className="relative z-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                  <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                  {t.domainBadge}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono text-white/80 bg-white/5 border border-white/10">
                  {t.datasetBadge}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono text-emerald-300/80 bg-emerald-500/10 border border-emerald-400/20">
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
          
          {/* GROUP 1: Two-Column Control Center (Lot Setup & Route Assumptions) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">
            
            {/* Left (7 cols): Farmer Lot Configuration */}
            <div className="lg:col-span-7">
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

            {/* Right (5 cols): Live Route Assumptions & Sliders */}
            <div className="lg:col-span-5">
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
            </div>

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

          {/* GROUP 3: Detailed Intelligence Tabs (Rankings, Map, Logistics) */}
          <section id="details-section" className="mb-8">
            
            {/* Elegant Tab Switcher Bar */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-white/50">
                  Explore Details:
                </span>
                <div className="flex items-center bg-black/30 backdrop-blur-md p-1 rounded-2xl border border-white/15">
                  
                  <button
                    onClick={() => setActiveTab('rankings')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'rankings'
                        ? 'bg-emerald-500 text-pine font-bold shadow-md'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Mandi Rankings & Bill</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('map')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'map'
                        ? 'bg-emerald-500 text-pine font-bold shadow-md'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Map className="w-4 h-4" />
                    <span>Route Map & Distances</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('logistics')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'logistics'
                        ? 'bg-emerald-500 text-pine font-bold shadow-md'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Truck className="w-4 h-4" />
                    <span>Trucks & Transporters</span>
                  </button>

                </div>
              </div>

              <div className="text-xs text-white/50 font-mono hidden sm:block">
                {activeTab === 'rankings' ? 'Itemized deduction statements for top 10 mandis' :
                 activeTab === 'map' ? 'Interactive Leaflet GIS route map' :
                 'Find shared trucks or book verified carriers'}
              </div>
            </div>

            {/* Tab 1: Mandi Rankings & Settlement Slips + Visual Chart */}
            {activeTab === 'rankings' && analysis && (
              <div className="space-y-6">
                <MarketLeaderboard
                  analysis={analysis}
                  lang={lang}
                  onSelectMarketForSlip={(mkt) => {
                    setMarketForSlip(mkt);
                    setIsDispatchSlipOpen(true);
                  }}
                />

                <CostBreakdownChart
                  analysis={analysis}
                  lang={lang}
                />
              </div>
            )}

            {/* Tab 2: Interactive Route Map with Mouse Scroll Zoom */}
            {activeTab === 'map' && analysis && (
              <MarketMap
                analysis={analysis}
                lang={lang}
              />
            )}

            {/* Tab 3: Logistics (Truck Sharing & Transporter Directory) */}
            {activeTab === 'logistics' && (
              <div className="space-y-6">
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
              </div>
            )}

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

            <div className="text-white/50 text-[11px] font-sans">
              Helping farmers take home more cash on every harvest.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
