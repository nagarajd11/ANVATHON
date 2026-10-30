import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
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
import { CheckCircle } from 'lucide-react';

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
  }, [fuelRateMultiplier, spoilageMultiplier, cessRateOverride, speedKmph]);

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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-agri-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
      />

      {/* Hero Strip Banner */}
      <div className="bg-gradient-to-r from-agri-900 via-agri-800 to-emerald-900 text-white py-6 px-4 sm:px-6 lg:px-8 border-b border-agri-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-emerald-300 text-xs font-bold uppercase tracking-wider">
              Agricultural Marketing & Supply Chain
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {t.appTitle}: {t.appSubtitle}
          </h2>
          <p className="text-xs sm:text-sm text-agri-100 max-w-2xl mt-1 leading-relaxed">
            Never load the truck for the wrong mandi again. HarvestRoute recalculates true in-hand cash after deducting real freight, transit spoilage on perishable lots, and APMC yard charges.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        
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

        {/* 4. Ranked APMC Leaderboard Table */}
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold">
              HR
            </div>
            <span className="font-bold text-slate-300">HarvestRoute Agricultural Intelligence</span>
            <span>•</span>
            <span>Built with MongoDB & Real APMC Dataset</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Domain 3: Agriculture and Rural Development</span>
            <span>•</span>
            <span>Karnataka APMC Mandi Network</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
