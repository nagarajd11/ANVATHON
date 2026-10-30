import React, { useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Truck, 
  Flame, 
  Receipt,
  ArrowRight,
  Sparkles,
  Scale
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function MarketLeaderboard({ analysis, lang, onSelectMarketForSlip }) {
  if (!analysis) return null;

  const t = TRANSLATIONS[lang];
  const { rankedMarkets, quantityQuintals, cropName } = analysis;
  const [expandedId, setExpandedId] = useState(rankedMarkets[0]?.marketId || null);

  // Top 10 markets
  const top10 = rankedMarkets.slice(0, 10);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-chlorophyll/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-800">
              <Trophy className="w-4 h-4 text-emerald-700" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-chlorophyll/60">
              Real-Time APMC Ranking Engine
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-chlorophyll">
            {t.leaderboardTitle}
          </h3>
          <p className="text-xs text-chlorophyll/70 mt-1 font-sans">
            {t.leaderboardSub}
          </p>
        </div>
        <span className="text-xs font-mono tabular-nums font-semibold px-3 py-1.5 rounded-full bg-black/5 text-chlorophyll border border-black/5 self-start sm:self-auto">
          Top {top10.length} Candidate Mandis
        </span>
      </div>

      {/* Table Container with Framer Motion Layout Springs */}
      <div className="overflow-x-auto -mx-6 sm:mx-0">
        <LayoutGroup id="market-rankings-group">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-chlorophyll/10 text-[11px] font-bold text-chlorophyll/60 uppercase tracking-wider bg-black/[0.02]">
                <th className="py-3 px-3 sm:px-4 font-mono">{t.rank}</th>
                <th className="py-3 px-3 sm:px-4">{t.market}</th>
                <th className="py-3 px-2 sm:px-3 font-mono">{t.distance}</th>
                <th className="py-3 px-2 sm:px-3 font-mono">{t.mandiPrice}</th>
                <th className="py-3 px-2 sm:px-3 text-right font-mono">{t.gross}</th>
                <th className="py-3 px-2 sm:px-3 text-right text-terracotta-600 font-mono">{t.freight}</th>
                <th className="py-3 px-2 sm:px-3 text-right text-terracotta-700 font-mono">{t.spoilage}</th>
                <th className="py-3 px-2 sm:px-3 text-right text-chlorophyll/70 font-mono">{t.apmcFees}</th>
                <th className="py-3 px-3 sm:px-4 text-right text-emerald-800 font-bold font-mono">{t.netReturn}</th>
                <th className="py-3 px-3 text-center">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chlorophyll/5 text-xs font-medium text-chlorophyll">
              {top10.map((mkt, idx) => {
                const isFirst = idx === 0;
                const isExpanded = expandedId === mkt.marketId;

                return (
                  <React.Fragment key={mkt.marketId}>
                    {/* Animated gliding row */}
                    <motion.tr 
                      layout
                      layoutId={`market-row-${mkt.marketId}`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      onClick={() => toggleExpand(mkt.marketId)}
                      className={`cursor-pointer transition-colors ${
                        isFirst 
                          ? 'bg-emerald-500/[0.08] hover:bg-emerald-500/[0.12]' 
                          : isExpanded 
                            ? 'bg-black/[0.03]' 
                            : 'hover:bg-black/[0.02]'
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-4 px-3 sm:px-4 font-mono font-bold">
                        <div className="flex items-center gap-1.5">
                          {isFirst ? (
                            <span className="w-6 h-6 rounded-full bg-chlorophyll text-emerald-300 flex items-center justify-center text-xs font-bold shadow-xs">
                              1
                            </span>
                          ) : (
                            <span className="w-6 h-6 rounded-full bg-black/5 text-chlorophyll/70 flex items-center justify-center text-xs font-semibold">
                              {idx + 1}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Market Name & District */}
                      <td className="py-4 px-3 sm:px-4">
                        <div>
                          <div className="font-bold text-chlorophyll flex items-center gap-2">
                            <span className="text-sm font-sans tracking-tight">{mkt.marketName}</span>
                            {isFirst && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                                Top Net Profit
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-chlorophyll/60 mt-0.5">
                            {mkt.district} District
                            {mkt.capacityInfo.hasGlutRisk && (
                              <span className="ml-1.5 text-terracotta-600 font-bold inline-flex items-center gap-0.5">
                                <AlertTriangle className="w-3 h-3 text-terracotta-500" />
                                Glut Risk
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Distance & Transit Hours */}
                      <td className="py-4 px-2 sm:px-3 text-chlorophyll/80 whitespace-nowrap font-mono tabular-nums">
                        <div className="font-semibold">{mkt.roadDistanceKm} km</div>
                        <div className="text-[10px] text-chlorophyll/50">{mkt.transitHours} hrs</div>
                      </td>

                      {/* Mandi Headline Price */}
                      <td className="py-4 px-2 sm:px-3 whitespace-nowrap font-mono tabular-nums text-chlorophyll font-semibold">
                        ₹{mkt.modalPrice.toLocaleString()}<span className="text-[10px] text-chlorophyll/50">/q</span>
                      </td>

                      {/* Gross */}
                      <td className="py-4 px-2 sm:px-3 text-right whitespace-nowrap font-mono tabular-nums font-semibold text-chlorophyll/90">
                        ₹{mkt.grossRevenue.toLocaleString()}
                      </td>

                      {/* Freight */}
                      <td className="py-4 px-2 sm:px-3 text-right text-terracotta-600 font-mono tabular-nums whitespace-nowrap font-semibold">
                        -₹{mkt.costs.transportCost.toLocaleString()}
                      </td>

                      {/* Spoilage */}
                      <td className="py-4 px-2 sm:px-3 text-right text-terracotta-700 font-mono tabular-nums whitespace-nowrap font-semibold">
                        -₹{mkt.costs.spoilageLoss.toLocaleString()}
                        <div className="text-[10px] text-terracotta-600/70">({mkt.costs.spoilagePct}%)</div>
                      </td>

                      {/* Mandi Fees */}
                      <td className="py-4 px-2 sm:px-3 text-right text-chlorophyll/70 font-mono tabular-nums whitespace-nowrap">
                        -₹{mkt.costs.marketFees.toLocaleString()}
                      </td>

                      {/* Net In-Hand Take Home */}
                      <td className="py-4 px-3 sm:px-4 text-right whitespace-nowrap">
                        <div className="text-sm sm:text-base font-bold text-emerald-800 font-mono tabular-nums">
                          ₹{mkt.netReturnInr.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-mono tabular-nums font-semibold text-emerald-700">
                          ₹{mkt.netReturnPerQuintal}/q ({mkt.profitMarginPct}%)
                        </div>
                      </td>

                      {/* Toggle */}
                      <td className="py-4 px-3 text-center text-chlorophyll/40">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 mx-auto text-chlorophyll" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mx-auto hover:text-chlorophyll" />
                        )}
                      </td>
                    </motion.tr>

                    {/* Step-by-Step Monospace Commodity Bill Drawer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.tr 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-black/[0.015] border-b border-chlorophyll/10"
                        >
                          <td colSpan="10" className="p-4 sm:p-6">
                            <div className="bg-[#fbfbfa] rounded-2xl p-5 sm:p-6 border border-chlorophyll/15 shadow-sm font-mono text-xs">
                              
                              {/* Bill Header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-dashed border-chlorophyll/20 text-chlorophyll">
                                <div className="flex items-center gap-2">
                                  <Receipt className="w-4 h-4 text-emerald-700" />
                                  <span className="font-bold uppercase tracking-wider text-sm">
                                    APMC MANDI COMMODITY SETTLEMENT LEDGER
                                  </span>
                                </div>
                                <div className="text-[11px] text-chlorophyll/60 mt-1 sm:mt-0">
                                  Yard: {mkt.marketName} • Dist: {mkt.district}
                                </div>
                              </div>

                              {/* Monospace Right-Aligned Ledger Table */}
                              <div className="space-y-2.5 text-xs text-chlorophyll leading-relaxed">
                                
                                <div className="receipt-line">
                                  <span>[1] GROSS AUCTION VALUE ({quantityQuintals} qtl @ ₹{mkt.modalPrice}/qtl modal)</span>
                                  <span className="font-bold">₹ {mkt.grossRevenue.toLocaleString()}.00</span>
                                </div>

                                <div className="receipt-line text-terracotta-700">
                                  <span>[2] (-) LOGISTICS FREIGHT & TOLL SURCHARGE ({mkt.roadDistanceKm} km via {mkt.vehicleUsed.name})</span>
                                  <span className="font-semibold">-₹ {mkt.costs.transportCost.toLocaleString()}.00</span>
                                </div>

                                <div className="receipt-line text-terracotta-700">
                                  <span>[3] (-) PERISHABLE DECAY & WEIGHT DISCOUNT ({mkt.costs.spoilagePct}% across {mkt.transitHours}h transit)</span>
                                  <span className="font-semibold">-₹ {mkt.costs.spoilageLoss.toLocaleString()}.00</span>
                                </div>

                                <div className="receipt-line text-chlorophyll/80">
                                  <span>[4] (-) APMC STATUTORY MARKET CESS ({mkt.costs.marketFeesBreakdown.cessRatePct}%)</span>
                                  <span>-₹ {mkt.costs.marketFeesBreakdown.apmcCess.toLocaleString()}.00</span>
                                </div>

                                <div className="receipt-line text-chlorophyll/80">
                                  <span>[5] (-) UNLOADING & WEIGHBRIDGE CHARGES (Hamali ₹{mkt.costs.marketFeesBreakdown.hamali} + Ticket ₹{mkt.costs.marketFeesBreakdown.weighbridge})</span>
                                  <span>-₹ {(mkt.costs.marketFeesBreakdown.hamali + mkt.costs.marketFeesBreakdown.weighbridge).toLocaleString()}.00</span>
                                </div>

                                <div className="border-t-2 border-dashed border-chlorophyll/30 pt-3 mt-3 flex justify-between items-baseline font-bold text-sm sm:text-base text-emerald-900">
                                  <span className="uppercase tracking-tight">(=) NET TAKE-HOME FARMER RETURN IN HAND</span>
                                  <span className="text-emerald-700 font-extrabold text-base sm:text-lg">
                                    ₹ {mkt.netReturnInr.toLocaleString()}.00
                                  </span>
                                </div>

                              </div>

                              {/* Action Link to Dispatch Slip */}
                              <div className="mt-5 pt-3 border-t border-chlorophyll/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                                <span className="text-[11px] text-chlorophyll/60 font-sans">
                                  Capacity Utilization: {mkt.capacityInfo.capacityUtilPct}% • Auction Hours: 05:30 AM - 01:00 PM
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectMarketForSlip(mkt);
                                  }}
                                  className="text-xs font-sans font-bold text-chlorophyll hover:text-emerald-700 inline-flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-chlorophyll/15 shadow-2xs hover:border-emerald-600"
                                >
                                  <span>Generate Official Dispatch Manifest</span>
                                  <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                                </button>
                              </div>

                            </div>
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </LayoutGroup>
      </div>

    </div>
  );
}
