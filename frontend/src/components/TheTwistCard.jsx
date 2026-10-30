import React from 'react';
import { 
  Trophy, 
  AlertOctagon, 
  TrendingUp, 
  Truck, 
  Flame, 
  MapPin, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { TRANSLATIONS } from '../translations';

export default function TheTwistCard({ analysis, lang, onFocusMarket, onBookTransporter }) {
  if (!analysis || !analysis.twist) return null;

  const t = TRANSLATIONS[lang];
  const { twist, quantityQuintals, cropName } = analysis;
  const { bestNetMarket, highestPriceMarket, isSame, rupeeDifference } = twist;

  const explanationText = twist.explanation[lang] || twist.explanation.en;

  return (
    <SpotlightCard 
      spotlightColor="rgba(16, 185, 129, 0.12)"
      className="glass-dark-card rounded-3xl p-6 sm:p-8 mb-8 border border-white/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.12)] text-white"
    >
      
      {/* Twist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              The Twist Feature
            </span>
            <span className="text-white/60 text-xs font-mono tabular-nums">
              Lot: {quantityQuintals} qtl • {cropName}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-white tracking-wide">
            {t.theTwistTitle}
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1 font-sans max-w-2xl">
            {t.twistSub}
          </p>
        </div>

        {!isSame && rupeeDifference > 0 && (
          <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl px-5 py-3 flex items-center gap-3.5 backdrop-blur-md shadow-[0_8px_20px_-5px_rgba(16,185,129,0.3)]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-pine flex items-center justify-center font-black shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                {t.extraCashBadge}
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                +₹{rupeeDifference.toLocaleString()}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Side-by-side comparison cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
        
        {/* Left: Nominal Price Trap (The Price Mirage) */}
        <SpotlightCard
          spotlightColor="rgba(234, 88, 12, 0.15)"
          className={`rounded-2xl p-6 border transition-all ${
            isSame 
              ? 'bg-white/5 border-white/10' 
              : 'bg-terracotta-950/20 border-terracotta-500/30 hover:border-terracotta-500/50 shadow-[0_12px_30px_-8px_rgba(234,88,12,0.2)]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              isSame 
                ? 'bg-white/10 text-white/80' 
                : 'bg-terracotta-500/20 text-terracotta-300 border border-terracotta-500/40'
            }`}>
              {isSame ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertOctagon className="w-3.5 h-3.5 text-terracotta-400" />}
              {t.priceTrapBadge}
            </span>
            <span className="text-xs text-white/60 font-medium flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-terracotta-400/80" />
              {highestPriceMarket.district}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
              {highestPriceMarket.marketName}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-white/50">{t.headlinePrice}:</span>
              <span className="text-2xl sm:text-3xl font-bold text-terracotta-400 font-mono tabular-nums">
                ₹{highestPriceMarket.modalPrice.toLocaleString()}<span className="text-xs font-normal text-white/50">/qtl</span>
              </span>
            </div>
          </div>

          {/* Transit & Deductions Ledger */}
          <div className="bg-black/30 rounded-xl p-4 space-y-2.5 text-xs border border-white/5 mb-5 backdrop-blur-sm">
            <div className="flex justify-between items-center text-white/80">
              <span className="flex items-center gap-1.5 text-white/50">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                {t.travelDistance} & {t.transitTime}
              </span>
              <span className="font-mono tabular-nums">{highestPriceMarket.roadDistanceKm} km ({highestPriceMarket.transitHours} hrs)</span>
            </div>
            
            <div className="flex justify-between items-center text-white/80">
              <span className="text-white/50">{t.grossTotal} ({quantityQuintals} qtl × ₹{highestPriceMarket.modalPrice})</span>
              <span className="font-mono tabular-nums font-semibold">₹{highestPriceMarket.grossRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-terracotta-300">
              <span className="flex items-center gap-1 text-white/50">
                <Truck className="w-3.5 h-3.5 text-terracotta-400" />
                {t.transportDeduction}
              </span>
              <span className="font-mono tabular-nums font-semibold">-₹{highestPriceMarket.costs.transportCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-terracotta-300">
              <span className="flex items-center gap-1 text-white/50">
                <Flame className="w-3.5 h-3.5 text-terracotta-400" />
                {t.spoilageDeduction} ({highestPriceMarket.costs.spoilagePct}%)
              </span>
              <span className="font-mono tabular-nums font-semibold">-₹{highestPriceMarket.costs.spoilageLoss.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-white/70">
              <span className="text-white/50">{t.feesDeduction}</span>
              <span className="font-mono tabular-nums font-medium">-₹{highestPriceMarket.costs.marketFees.toLocaleString()}</span>
            </div>
          </div>

          {/* Take Home Cash */}
          <div className="border-t border-white/10 pt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60">{t.netProfit}:</span>
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
              ₹{highestPriceMarket.netReturnInr.toLocaleString()}
            </span>
          </div>

        </SpotlightCard>

        {/* Right: HarvestRoute Smart Pick (The True Harvest Winner) */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.22)"
          className="rounded-2xl p-6 border-2 border-emerald-500/50 bg-gradient-to-b from-emerald-950/40 via-[#06281e]/60 to-[#041a13]/80 shadow-[0_16px_40px_-10px_rgba(16,185,129,0.3)] relative"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-emerald-500 text-chlorophyll shadow-xs">
              <Trophy className="w-3.5 h-3.5 text-chlorophyll" />
              {t.smartPickBadge}
            </span>
            <span className="text-xs text-emerald-300/80 font-medium flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {bestNetMarket.district}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
              {bestNetMarket.marketName}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-white/50">{t.headlinePrice}:</span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">
                ₹{bestNetMarket.modalPrice.toLocaleString()}<span className="text-xs font-normal text-white/50">/qtl</span>
              </span>
            </div>
          </div>

          {/* Transit & Deductions Ledger */}
          <div className="bg-emerald-950/40 rounded-xl p-4 space-y-2.5 text-xs border border-emerald-500/20 mb-5 backdrop-blur-sm">
            <div className="flex justify-between items-center text-white/90">
              <span className="flex items-center gap-1.5 text-white/50">
                <MapPin className="w-3.5 h-3.5 text-emerald-400/80" />
                {t.travelDistance} & {t.transitTime}
              </span>
              <span className="font-mono tabular-nums text-emerald-300 font-semibold">
                {bestNetMarket.roadDistanceKm} km ({bestNetMarket.transitHours} hrs)
              </span>
            </div>
            
            <div className="flex justify-between items-center text-white/90">
              <span className="text-white/50">{t.grossTotal} ({quantityQuintals} qtl × ₹{bestNetMarket.modalPrice})</span>
              <span className="font-mono tabular-nums font-semibold">₹{bestNetMarket.grossRevenue.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-emerald-300">
              <span className="flex items-center gap-1 text-white/50">
                <Truck className="w-3.5 h-3.5 text-emerald-400" />
                {t.transportDeduction}
              </span>
              <span className="font-mono tabular-nums font-semibold text-emerald-300">-₹{bestNetMarket.costs.transportCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-emerald-300">
              <span className="flex items-center gap-1 text-white/50">
                <Flame className="w-3.5 h-3.5 text-emerald-400" />
                {t.spoilageDeduction} ({bestNetMarket.costs.spoilagePct}%)
              </span>
              <span className="font-mono tabular-nums font-semibold text-emerald-300">-₹{bestNetMarket.costs.spoilageLoss.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-white/70">
              <span className="text-white/50">{t.feesDeduction}</span>
              <span className="font-mono tabular-nums font-medium">-₹{bestNetMarket.costs.marketFees.toLocaleString()}</span>
            </div>
          </div>

          {/* Take Home Cash */}
          <div className="border-t border-emerald-500/30 pt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-300/80">{t.netProfit}:</span>
            <span className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono tabular-nums">
              ₹{bestNetMarket.netReturnInr.toLocaleString()}
            </span>
          </div>

        </SpotlightCard>

      </div>

      {/* Plain Language Farmer Decision Advisory */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-emerald-500/15 text-emerald-300 rounded-xl shrink-0 mt-0.5 border border-emerald-500/20">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-serif italic text-emerald-200 mb-1 flex items-center gap-1.5">
              <span>Why They Differ — Field Ledger Advisory</span>
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              {explanationText}
            </p>
          </div>
        </div>
      </div>

    </SpotlightCard>
  );
}
