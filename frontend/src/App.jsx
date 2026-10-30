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
import { CheckCircle, Sparkles, Sprout, ArrowDown } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState('en');
  const t = TRANSLATIONS[lang];

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
    <div className="relative min-h-screen text-chlorophyll font-sans selection:bg-emerald-500/30 selection:text-emerald-950">
      
      {/* Scroll-Locked Background Video Layer */}
      <BackgroundVideo />

      {/* Main Foreground Interface */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 glass-dark-card text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 text-xs animate-bounce font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="font-sans">{toastMessage}</span>
          </div>
        )}

        {/* Top Navigation */}
        <Navbar
          lang={lang}
          setLang={setLang}
        />

        {/* Vision-OS Botanical Hero Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 w-full mb-8 pt-2">
          <div className="glass-floating rounded-3xl p-8 sm:p-12 text-white border border-white/30 shadow-[0_20px_50px_-12px_rgba(4,47,46,0.35),inset_0_1px_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl relative overflow-hidden">
            
            {/* Ambient emerald light bloom */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

            <div className="relative z-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 backdrop-blur-md">
                  <Sprout className="w-3.5 h-3.5 text-emerald-300" />
                  Domain 3: Agriculture & Rural Development
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/10 text-white/80 border border-white/15 backdrop-blur-md">
                  87,420 Agmarknet APMC Records
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif italic tracking-wide text-white font-normal leading-[1.15]">
                Find the Market That Pays the Most After Costs.
              </h2>

              <p className="text-sm sm:text-base text-white/85 mt-4 leading-relaxed font-sans max-w-2xl font-normal">
                Never load the truck for the wrong mandi again. HarvestRoute recalculates real in-hand cash after deducting road freight, non-linear transit decay on perishable crops, and statutory yard cess.
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/15 text-xs text-white/70 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>62 Karnataka Mandis Monitored</span>
                </div>
                <span>•</span>
                <div>
                  <span>Haversine 1.28x Road Tortuosity</span>
                </div>
                <span>•</span>
                <div>
                  <span>Non-Linear Spoilage Decay Curves</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Ledger */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 flex-1 w-full">
          
          {/* 1. Farmer Lot Configuration Input */}
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

          {/* 2. The Twist: Side-by-side Showcase */}
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

          {/* 3. Interactive Route & Logistics Map */}
          {analysis && (
            <MarketMap
              analysis={analysis}
              lang={lang}
            />
          )}

          {/* 4. Ranked APMC Leaderboard Table with Gliding Springs */}
          {analysis && (
            <MarketLeaderboard
              analysis={analysis}
              lang={lang}
              onSelectMarketForSlip={(mkt) => {
                setMarketForSlip(mkt);
                setIsDispatchSlipOpen(true);
              }}
            />
          )}

          {/* 5. 'What-If' Dynamic Sensitivity Lab (Live Sliders) */}
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

          {/* 6. Visual Deductions Waterfall Chart */}
          {analysis && (
            <CostBreakdownChart
              analysis={analysis}
              lang={lang}
            />
          )}

          {/* 7. Truck Sharing & Direct Phone Collaboration */}
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

          {/* 8. Local Karnataka Transporter & Vehicle Directory */}
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
        <footer className="glass-floating border-t border-white/20 text-white/70 py-8 text-xs backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-pine flex items-center justify-center font-bold font-sans text-xs">
                HR
              </div>
              <span className="font-bold text-white font-sans">HarvestRoute Agricultural Intelligence</span>
              <span>•</span>
              <span>Domain 3 / Karnataka APMC Network</span>
            </div>

            <div className="text-white/50 text-[11px]">
              Crafted with botanical glass & mathematical rigor.
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
