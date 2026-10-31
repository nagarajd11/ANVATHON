import React from 'react';
import { 
  ArrowLeft, 
  Map, 
  Sliders, 
  BarChart3, 
  Truck, 
  Printer, 
  BookmarkPlus, 
  CheckCircle, 
  RotateCcw,
  Sparkles,
  PieChart
} from 'lucide-react';
import TheTwistCard from './TheTwistCard';
import MarketMap from './MarketMap';
import MarketLeaderboard from './MarketLeaderboard';
import SensitivityLab from './SensitivityLab';
import CostBreakdownChart from './CostBreakdownChart';
import TransporterDirectory from './TransporterDirectory';
import { TRANSLATIONS } from '../translations';
import { toLocalizedMandiName } from '../utils/kannadaLocalization';

export default function AnalysisResultsView({
  analysis,
  lang = 'en',
  onBackToConfig = () => {},
  onOpenDispatchSlip = () => {},
  onOpenSavedModal = () => {},
  // Sensitivity Sliders State
  fuelRateMultiplier,
  setFuelRateMultiplier,
  spoilageMultiplier,
  setSpoilageMultiplier,
  cessRateOverride,
  setCessRateOverride,
  speedKmph,
  setSpeedKmph,
  onResetSensitivity,
  // Logistics Data
  origins = [],
  crops = [],
  vehicleCatalog = {},
  dealers = [],
  originDistrict,
  selectedCrop,
  quantity,
  vehicleType,
  setVehicleType = () => {},
  onVehicleChange = () => {},
  onShowToast = () => {}
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const labels = {
    en: {
      adjustDetailsBtn: "← Back / Change Lot",
      printSlipBtn: "Print Gate Pass",
      saveScenarioBtn: "Save",
      quickJump: "Jump:",
      slidersBtn: "Cost, Quality & Distance",
      rankingsBtn: "Mandi Rankings",
      breakdownBtn: "Breakdown",
      mapBtn: "Route Map",
      transportersBtn: "Drivers",
      topWinner: "Top Mandi",
      pocketGain: "in hand"
    },
    kn: {
      adjustDetailsBtn: "← ಹಿಂದಕ್ಕೆ / ಬದಲಾಯಿಸಿ",
      printSlipBtn: "ಗೇಟ್ ಪಾಸ್",
      saveScenarioBtn: "ಉಳಿಸಿ",
      quickJump: "ವಿಭಾಗಗಳು:",
      slidersBtn: "ಗುಣಮಟ್ಟ, ವೆಚ್ಚ & ದೂರ",
      rankingsBtn: "ಮಂಡಿ ಪಟ್ಟಿ",
      breakdownBtn: "ಖರ್ಚಿನ ವಿವರ",
      mapBtn: "ರಸ್ತೆ ನಕ್ಷೆ",
      transportersBtn: "ಚಾಲಕರು",
      topWinner: "ಅತ್ಯುತ್ತಮ ಮಂಡಿ",
      pocketGain: "ಜೇಬಿಗೆ"
    },
    hi: {
      adjustDetailsBtn: "← वापस / बदलें",
      printSlipBtn: "गेट पास",
      saveScenarioBtn: "सुरक्षित करें",
      quickJump: "सीधे जाएं:",
      slidersBtn: "लागत, गुणवत्ता व दूरी",
      rankingsBtn: "मंडी रैंकिंग",
      breakdownBtn: "लागत विवरण",
      mapBtn: "रूट मैप",
      transportersBtn: "ड्राइवर",
      topWinner: "सर्वश्रेष्ठ मंडी",
      pocketGain: "जेब में"
    }
  };

  const l = labels[lang] || labels.en;

  const rawTopMandi = analysis?.topOpportunity?.mandi_name || analysis?.bestNetMarket?.marketName || 'Top Mandi';
  const topMandi = toLocalizedMandiName(rawTopMandi, lang);
  const topProfit = analysis?.topOpportunity?.net_earnings_total || 0;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-20">
      
      {/* 1. TOP BAR: Back Navigation + Lot Summary + Quick Print Action */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-6 py-3 px-4 sm:px-6 glass-floating rounded-2xl border border-white/20 shadow-xl">
        
        {/* Back Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToConfig}
            className="btn-secondary !py-2 !px-4 text-xs font-bold flex items-center gap-2 cursor-pointer hover:border-emerald-400/60 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-300" />
            <span>{l.adjustDetailsBtn}</span>
          </button>

          {/* Current Lot Metadata Pills */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white font-bold border border-white/15">
              {selectedCrop}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
              {quantity} Quintals
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 text-white/80 border border-white/15 hidden md:inline">
              Hub: {originDistrict}
            </span>
          </div>
        </div>

        {/* Top Winner Highlight + Print Manifest */}
        <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
          {analysis?.topOpportunity && (
            <div className="flex items-center gap-2 text-xs bg-emerald-950/60 border border-emerald-400/40 px-3.5 py-1.5 rounded-xl text-emerald-300 font-mono shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{l.topWinner}: <strong>{topMandi}</strong></span>
              <span className="text-white font-bold ml-1">₹{topProfit.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenDispatchSlip(analysis?.bestNetMarket || (analysis?.rankedMarkets && analysis.rankedMarkets[0]) || null)}
              className="btn-primary !py-2 !px-3.5 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/30 cursor-pointer"
              title={l.printSlipBtn}
            >
              <Printer className="w-3.5 h-3.5 text-pine" />
              <span className="hidden sm:inline">{l.printSlipBtn}</span>
            </button>

            <button
              type="button"
              onClick={onOpenSavedModal}
              className="btn-secondary !py-2 !px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              title={l.saveScenarioBtn}
            >
              <BookmarkPlus className="w-3.5 h-3.5 text-emerald-300" />
            </button>
          </div>

        </div>

      </div>

      {/* 2. THE TWIST HERO: Side-by-side Price Mirage vs True Harvest Winner */}
      {analysis && (
        <section className="mb-8">
          <TheTwistCard
            analysis={analysis}
            lang={lang}
            onFocusMarket={(mkt) => {
              onOpenDispatchSlip(mkt);
            }}
          />
        </section>
      )}

      {/* 3. QUICK JUMP NAVIGATION BAR (Reordered with Assumptions first) */}
      {analysis && (
        <div className="flex items-center justify-between flex-wrap gap-2.5 mb-8 py-3 px-4 sm:px-6 glass-floating rounded-2xl border border-white/15">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] uppercase font-mono font-bold tracking-wider text-white/50">
              {l.quickJump}
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => document.getElementById('sensitivity-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary !py-1.5 !px-3 text-xs font-medium"
              >
                <Sliders className="w-3.5 h-3.5 text-emerald-300" />
                <span>{l.slidersBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => document.getElementById('rankings-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary !py-1.5 !px-3 text-xs font-medium"
              >
                <BarChart3 className="w-3.5 h-3.5 text-emerald-300" />
                <span>{l.rankingsBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => document.getElementById('breakdown-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary !py-1.5 !px-3 text-xs font-medium"
              >
                <PieChart className="w-3.5 h-3.5 text-emerald-300" />
                <span>{l.breakdownBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => document.getElementById('map-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary !py-1.5 !px-3 text-xs font-medium"
              >
                <Map className="w-3.5 h-3.5 text-emerald-300" />
                <span>{l.mapBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => document.getElementById('transporters-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary !py-1.5 !px-3 text-xs font-medium"
              >
                <Truck className="w-3.5 h-3.5 text-emerald-300" />
                <span>{l.transportersBtn}</span>
              </button>
            </div>
          </div>

          <div className="text-xs text-white/50 font-mono hidden sm:block">
            {lang === 'kn' ? '200 ಎಪಿಎಂಸಿ ಮಂಡಿಗಳು' : lang === 'hi' ? '200 मंडियों की निगरानी' : '200 APMCs Monitored'}
          </div>
        </div>
      )}

      {/* 4. COST, QUALITY & DISTANCE ASSUMPTIONS (Placed ABOVE Mandi Rankings so the farmer can tune parameters and see rankings update live!) */}
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
          onReset={onResetSensitivity}
        />
      </section>

      {/* 5. RANKED MARKET LEDGER & ITEMIZED RECEIPT DRAWERS (Mandi Rankings by Real Cash) */}
      {analysis && (
        <section id="rankings-section" className="mb-8 scroll-mt-20">
          <MarketLeaderboard
            analysis={analysis}
            lang={lang}
            onSelectMarketForSlip={(mkt) => {
              onOpenDispatchSlip(mkt);
            }}
          />
        </section>
      )}

      {/* 6. VISUAL NET RETURN VS GROSS MIRAGE BREAKDOWN */}
      {analysis && (
        <section id="breakdown-section" className="mb-8 scroll-mt-20">
          <CostBreakdownChart
            analysis={analysis}
            lang={lang}
          />
        </section>
      )}

      {/* 7. INTERACTIVE ROUTE & LOGISTICS MAP */}
      {analysis && (
        <section id="map-section" className="mb-8 scroll-mt-20">
          <MarketMap
            analysis={analysis}
            lang={lang}
          />
        </section>
      )}

      {/* 8. VERIFIED REGIONAL TRANSPORTERS DIRECTORY */}
      <section id="transporters-section" className="mb-8 scroll-mt-20">
        <TransporterDirectory
          dealers={dealers}
          lang={lang}
          currentVehicleType={vehicleType}
          onSelectVehicle={(vType) => {
            setVehicleType(vType);
            onVehicleChange(vType);
            onShowToast(`Vehicle updated to ${vType}. Analysis recalculated!`);
          }}
        />
      </section>

    </div>
  );
}