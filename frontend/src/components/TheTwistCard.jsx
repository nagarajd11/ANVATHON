import React from 'react';
import { 
  Trophy, 
  AlertOctagon, 
  ArrowRight, 
  TrendingUp, 
  Truck, 
  Flame, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function TheTwistCard({ analysis, lang, onFocusMarket, onBookTransporter }) {
  if (!analysis || !analysis.twist) return null;

  const t = TRANSLATIONS[lang];
  const { twist, quantityQuintals, cropName } = analysis;
  const { bestNetMarket, highestPriceMarket, isSame, rupeeDifference } = twist;

  const explanationText = twist.explanation[lang] || twist.explanation.en;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl border border-slate-800">
      
      {/* Twist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              The Twist Feature
            </span>
            <span className="text-slate-400 text-xs font-medium">
              Comparing {quantityQuintals} Quintals of {cropName}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {t.theTwistTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {t.twistSub}
          </p>
        </div>

        {!isSame && rupeeDifference > 0 && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl px-4 py-2.5 flex items-center gap-3">
            <div className="p-2 bg-emerald-500 text-slate-950 rounded-xl font-black">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-emerald-400">
                {t.extraCashBadge}
              </div>
              <div className="text-lg sm:text-xl font-black text-emerald-300">
                +₹{rupeeDifference.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Side-by-side comparison cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        
        {/* Left: Nominal Price Trap (or equal) */}
        <div className={`rounded-2xl p-6 border relative transition-all ${
          isSame 
            ? 'bg-slate-800/40 border-slate-700' 
            : 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              isSame 
                ? 'bg-slate-700 text-slate-300' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}>
              {isSame ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertOctagon className="w-3.5 h-3.5" />}
              {t.priceTrapBadge}
            </span>
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {highestPriceMarket.district}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1">
              {highestPriceMarket.marketName}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400">{t.headlinePrice}:</span>
              <span className="text-2xl font-black text-rose-400">
                ₹{highestPriceMarket.modalPrice.toLocaleString()}<span className="text-xs font-normal text-slate-400">/qtl</span>
              </span>
            </div>
          </div>

          {/* Transit & Deductions Details */}
          <div className="bg-slate-900/60 rounded-xl p-4 space-y-2.5 text-xs border border-slate-800/80 mb-5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {t.travelDistance} & {t.transitTime}
              </span>
              <span className="font-semibold">{highestPriceMarket.roadDistanceKm} km ({highestPriceMarket.transitHours} hrs)</span>
            </div>
            
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">{t.grossTotal} ({quantityQuintals} qtl × ₹{highestPriceMarket.modalPrice})</span>
              <span className="font-bold">₹{highestPriceMarket.grossRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-rose-300">
              <span className="flex items-center gap-1 text-slate-400">
                <Truck className="w-3.5 h-3.5 text-rose-400" />
                {t.transportDeduction}
              </span>
              <span className="font-bold">-₹{highestPriceMarket.costs.transportCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-amber-300">
              <span className="flex items-center gap-1 text-slate-400">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {t.spoilageDeduction} ({highestPriceMarket.costs.spoilagePct}%)
              </span>
              <span className="font-bold">-₹{highestPriceMarket.costs.spoilageLoss.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">{t.feesDeduction}</span>
              <span className="font-semibold">-₹{highestPriceMarket.costs.marketFees.toLocaleString()}</span>
            </div>
          </div>

          {/* Take Home Cash */}
          <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">{t.netProfit}:</span>
            <span className="text-2xl font-black text-white">
              ₹{highestPriceMarket.netReturnInr.toLocaleString()}
            </span>
          </div>

        </div>

        {/* Right: HarvestRoute Smart Pick */}
        <div className="bg-gradient-to-b from-emerald-950/40 to-slate-900 rounded-2xl p-6 border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/10 relative">
          
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500 text-slate-950 shadow-sm">
              <Trophy className="w-3.5 h-3.5" />
              {t.smartPickBadge}
            </span>
            <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {bestNetMarket.district}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1">
              {bestNetMarket.marketName}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-slate-400">{t.headlinePrice}:</span>
              <span className="text-2xl font-black text-emerald-400">
                ₹{bestNetMarket.modalPrice.toLocaleString()}<span className="text-xs font-normal text-slate-400">/qtl</span>
              </span>
            </div>
          </div>

          {/* Transit & Deductions Details */}
          <div className="bg-slate-900/80 rounded-xl p-4 space-y-2.5 text-xs border border-emerald-500/30 mb-5">
            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                {t.travelDistance} & {t.transitTime}
              </span>
              <span className="font-semibold text-emerald-300">
                {bestNetMarket.roadDistanceKm} km ({bestNetMarket.transitHours} hrs)
              </span>
            </div>
            
            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">{t.grossTotal} ({quantityQuintals} qtl × ₹{bestNetMarket.modalPrice})</span>
              <span className="font-bold">₹{bestNetMarket.grossRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1 text-slate-400">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                {t.transportDeduction}
              </span>
              <span className="font-bold text-emerald-400">-₹{bestNetMarket.costs.transportCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span className="flex items-center gap-1 text-slate-400">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                {t.spoilageDeduction} ({bestNetMarket.costs.spoilagePct}%)
              </span>
              <span className="font-bold text-emerald-400">-₹{bestNetMarket.costs.spoilageLoss.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-slate-300">
              <span className="text-slate-400">{t.feesDeduction}</span>
              <span className="font-semibold">-₹{bestNetMarket.costs.marketFees.toLocaleString()}</span>
            </div>
          </div>

          {/* Take Home Cash */}
          <div className="border-t border-emerald-500/30 pt-3 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300">{t.netProfit}:</span>
            <span className="text-3xl font-black text-emerald-400">
              ₹{bestNetMarket.netReturnInr.toLocaleString()}
            </span>
          </div>

        </div>

      </div>

      {/* Plain Language Farmer Explanation Box */}
      <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-400/20 text-amber-300 rounded-xl shrink-0 mt-0.5">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-200 mb-1 flex items-center gap-1.5">
              <span>Why They Differ — Farmer Decision Advisory</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {explanationText}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

