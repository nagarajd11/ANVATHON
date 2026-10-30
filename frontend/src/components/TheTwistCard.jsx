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
import { TRANSLATIONS } from '../translations';

export default function TheTwistCard({ analysis, lang, onFocusMarket }) {
  if (!analysis || !analysis.twist) return null;

  const t = TRANSLATIONS[lang];
  const { twist, quantityQuintals, cropName } = analysis;
  const { bestNetMarket, highestPriceMarket, isSame, rupeeDifference } = twist;

  const explanationText = twist.explanation[lang] || twist.explanation.en;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 hover-lift">
      
      {/* Twist Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-normal bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
              The Trade-off Comparison
            </span>
            <span className="text-white/60 text-xs font-mono tabular-nums">
              {quantityQuintals} quintals • {cropName} {analysis.originLocationLabel ? `• Dispatch: ${analysis.originLocationLabel}` : ''}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white text-crisp">
            {t.theTwistTitle}
          </h2>
          <p className="text-xs sm:text-sm text-white/70 mt-1 font-sans max-w-2xl">
            {t.twistSub}
          </p>
        </div>

        {!isSame && rupeeDifference > 0 && (
          <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl px-5 py-3 flex items-center gap-3.5 backdrop-blur-md shadow-[0_8px_25px_-5px_rgba(16,185,129,0.35)] hover-glow-pill cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-pine flex items-center justify-center font-bold shadow-xs">
              <TrendingUp className="w-5 h-5 text-pine" />
            </div>
            <div>
              <div className="text-xs uppercase font-semibold tracking-wider text-emerald-300 font-mono">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        
        {/* Left: Nominal Price Trap (The Price Mirage) */}
        <div
          className={`rounded-2xl p-6 border transition-all hover-lift ${
            isSame 
              ? 'bg-white/[0.04] border-white/10' 
              : 'bg-amber-950/20 border-amber-500/30 hover:border-amber-400/60 shadow-[0_10px_30px_-6px_rgba(245,158,11,0.15)]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider font-mono ${
              isSame 
                ? 'bg-white/10 text-white/80' 
                : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'
            }`}>
              {isSame ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertOctagon className="w-3.5 h-3.5 text-amber-400" />}
              {t.priceTrapBadge}
            </span>
            <span className="text-xs text-white/60 font-medium flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-400/80" />
              {highestPriceMarket.district}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight text-crisp">
              {highestPriceMarket.marketName}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-white/50">{t.headlinePrice}:</span>
              <span className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono tabular-nums">
                ₹{highestPriceMarket.modalPrice.toLocaleString()}<span className="text-xs font-normal text-white/50">/qtl</span>
              </span>
              {highestPriceMarket.freshnessDiscountPct > 0 && (
                <span className="text-xs font-bold text-rose-300 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded-md">
                  -{highestPriceMarket.freshnessDiscountPct}% Age Cut
                </span>
              )}
            </div>
          </div>

          {/* Transit & Deductions Ledger */}
          <div className="bg-black/25 rounded-xl p-4 space-y-2 text-xs border border-white/10 mb-4 backdrop-blur-sm">
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

            <div className="flex justify-between items-center text-amber-300">
              <span className="flex items-center gap-1 text-white/50">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                {t.transportDeduction}
              </span>
              <span className="font-mono tabular-nums font-semibold">-₹{highestPriceMarket.costs.transportCost.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-amber-300">
              <span className="flex items-center gap-1 text-white/50">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
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
          <div className="border-t border-white/10 pt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-white/60">{t.netProfit}:</span>
            <span className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums text-crisp">
              ₹{highestPriceMarket.netReturnInr.toLocaleString()}
            </span>
          </div>

          {!isSame && rupeeDifference > 0 && (
            <div className="mt-3.5 py-2 px-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200 text-center font-mono">
              <span>⚠️ Leaves you with ₹{rupeeDifference.toLocaleString()} less in-hand cash</span>
            </div>
          )}

        </div>

        {/* Right: HarvestRoute Smart Pick (The True Harvest Winner) */}
        <div
          className="rounded-2xl p-6 border-2 border-emerald-500/50 bg-emerald-950/20 shadow-[0_12px_32px_-8px_rgba(16,185,129,0.25)] relative hover-lift hover:border-emerald-400"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-pine shadow-xs font-mono">
              <Trophy className="w-3.5 h-3.5 text-pine" />
              {t.smartPickBadge}
            </span>
            <span className="text-xs text-emerald-300 font-medium flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {bestNetMarket.district}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight text-crisp">
              {bestNetMarket.marketName}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-white/50">{t.headlinePrice}:</span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">
                ₹{bestNetMarket.modalPrice.toLocaleString()}<span className="text-xs font-normal text-white/50">/qtl</span>
              </span>
              {bestNetMarket.freshnessDiscountPct > 0 && (
                <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  -{bestNetMarket.freshnessDiscountPct}% Age Cut
                </span>
              )}
            </div>
          </div>

          {/* Transit & Deductions Ledger */}
          <div className="bg-black/25 rounded-xl p-4 space-y-2 text-xs border border-emerald-500/20 mb-4 backdrop-blur-sm">
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
          <div className="border-t border-emerald-500/30 pt-3 flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-300/80">{t.netProfit}:</span>
            <span className="text-3xl sm:text-4xl font-bold text-emerald-400 font-mono tabular-nums text-crisp">
              ₹{bestNetMarket.netReturnInr.toLocaleString()}
            </span>
          </div>

          {/* Direct CTA to Focus / Open Slip */}
          <button
            onClick={() => onFocusMarket && onFocusMarket(bestNetMarket)}
            className="btn-shimmer btn-primary w-full mt-3.5 py-2.5 text-xs"
          >
            <span>Lock Winner & Print Settlement Pass</span>
            <ArrowRight className="w-3.5 h-3.5 text-pine" />
          </button>

        </div>

      </div>

      {/* Plain Language Farmer Decision Advisory */}
      <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover-glow-pill">
        <div className="flex items-start gap-3.5">
          <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl shrink-0 mt-0.5 border border-emerald-500/30">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-display font-bold text-emerald-300 mb-0.5">
              Why These Two Mandis Differ — In Plain Words
            </h4>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-sans">
              {explanationText}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
