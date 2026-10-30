import React, { useState } from 'react';
import { 
  Trophy, 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  TrendingUp, 
  Info,
  CheckCircle,
  Truck,
  Flame,
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-agri-100 text-agri-700 rounded-lg">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.leaderboardTitle}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{t.leaderboardSub}</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
          Showing Top {top10.length} Candidate Markets
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto -mx-5 sm:mx-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-3 sm:px-4">{t.rank}</th>
              <th className="py-3 px-3 sm:px-4">{t.market}</th>
              <th className="py-3 px-2 sm:px-3">{t.distance}</th>
              <th className="py-3 px-2 sm:px-3">{t.mandiPrice}</th>
              <th className="py-3 px-2 sm:px-3 text-right">{t.gross}</th>
              <th className="py-3 px-2 sm:px-3 text-right text-rose-600">{t.freight}</th>
              <th className="py-3 px-2 sm:px-3 text-right text-amber-600">{t.spoilage}</th>
              <th className="py-3 px-2 sm:px-3 text-right text-slate-600">{t.apmcFees}</th>
              <th className="py-3 px-3 sm:px-4 text-right text-emerald-700 font-extrabold">{t.netReturn}</th>
              <th className="py-3 px-3 text-center">{t.action}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
            {top10.map((mkt, idx) => {
              const isFirst = idx === 0;
              const isExpanded = expandedId === mkt.marketId;

              return (
                <React.Fragment key={mkt.marketId}>
                  <tr 
                    onClick={() => toggleExpand(mkt.marketId)}
                    className={`cursor-pointer transition-colors ${
                      isFirst 
                        ? 'bg-emerald-50/50 hover:bg-emerald-50' 
                        : isExpanded 
                          ? 'bg-slate-50' 
                          : 'hover:bg-slate-50/80'
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 px-3 sm:px-4 font-bold">
                      <div className="flex items-center gap-1.5">
                        {isFirst ? (
                          <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                            1
                          </span>
                        ) : (
                          <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                            {idx + 1}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Market Name & District */}
                    <td className="py-3.5 px-3 sm:px-4">
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{mkt.marketName}</span>
                          {isFirst && (
                            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                              Best Choice
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {mkt.district} District
                          {mkt.capacityInfo.hasGlutRisk && (
                            <span className="ml-1 text-rose-600 font-bold inline-flex items-center gap-0.5">
                              <AlertTriangle className="w-3 h-3" />
                              Glut Risk
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Distance */}
                    <td className="py-3.5 px-2 sm:px-3 text-slate-600 whitespace-nowrap">
                      <div>{mkt.roadDistanceKm} km</div>
                      <div className="text-[10px] text-slate-400">{mkt.transitHours} hrs</div>
                    </td>

                    {/* Mandi Headline Price */}
                    <td className="py-3.5 px-2 sm:px-3 font-semibold text-slate-900 whitespace-nowrap">
                      ₹{mkt.modalPrice.toLocaleString()}<span className="text-[10px] text-slate-400">/q</span>
                    </td>

                    {/* Gross */}
                    <td className="py-3.5 px-2 sm:px-3 text-right font-semibold text-slate-800 whitespace-nowrap">
                      ₹{mkt.grossRevenue.toLocaleString()}
                    </td>

                    {/* Freight */}
                    <td className="py-3.5 px-2 sm:px-3 text-right text-rose-600 font-semibold whitespace-nowrap">
                      -₹{mkt.costs.transportCost.toLocaleString()}
                    </td>

                    {/* Spoilage */}
                    <td className="py-3.5 px-2 sm:px-3 text-right text-amber-600 font-semibold whitespace-nowrap">
                      -₹{mkt.costs.spoilageLoss.toLocaleString()}
                      <div className="text-[10px] text-slate-400">({mkt.costs.spoilagePct}%)</div>
                    </td>

                    {/* Mandi Fees */}
                    <td className="py-3.5 px-2 sm:px-3 text-right text-slate-600 font-medium whitespace-nowrap">
                      -₹{mkt.costs.marketFees.toLocaleString()}
                    </td>

                    {/* Net Return */}
                    <td className="py-3.5 px-3 sm:px-4 text-right whitespace-nowrap">
                      <div className="text-sm sm:text-base font-black text-emerald-700">
                        ₹{mkt.netReturnInr.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-bold text-emerald-600">
                        ₹{mkt.netReturnPerQuintal}/q ({mkt.profitMarginPct}%)
                      </div>
                    </td>

                    {/* Toggle */}
                    <td className="py-3.5 px-3 text-center text-slate-400">
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 mx-auto text-slate-700" />
                      ) : (
                        <ChevronDown className="w-4 h-4 mx-auto" />
                      )}
                    </td>
                  </tr>

                  {/* Step-by-Step Breakdown Drawer */}
                  {isExpanded && (
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <td colSpan="10" className="p-4 sm:p-5">
                        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                            <Info className="w-4 h-4 text-agri-600" />
                            Step-by-Step Financial Equation for {mkt.marketName}
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                            
                            {/* Step 1: Gross */}
                            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                                Step 1: Gross Value
                              </span>
                              <div className="font-bold text-slate-800 text-sm mb-1">
                                ₹{mkt.grossRevenue.toLocaleString()}
                              </div>
                              <p className="text-[11px] text-slate-500">
                                {quantityQuintals} qtl × ₹{mkt.modalPrice}/qtl modal auction price
                              </p>
                            </div>

                            {/* Step 2: Freight */}
                            <div className="p-3 rounded-lg bg-rose-50/50 border border-rose-100">
                              <span className="text-[10px] font-bold text-rose-500 uppercase block mb-1">
                                Step 2: Transport Cost
                              </span>
                              <div className="font-bold text-rose-700 text-sm mb-1">
                                -₹{mkt.costs.transportCost.toLocaleString()}
                              </div>
                              <p className="text-[11px] text-slate-600 leading-tight">
                                {mkt.roadDistanceKm} km road distance. Base fare: ₹{mkt.costs.transportBreakdown.baseFare} + Mileage: ₹{mkt.costs.transportBreakdown.mileageCost} + Toll: ₹{mkt.costs.transportBreakdown.tollSurcharge}.
                              </p>
                            </div>

                            {/* Step 3: Spoilage */}
                            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                              <span className="text-[10px] font-bold text-amber-600 uppercase block mb-1">
                                Step 3: Transit Spoilage
                              </span>
                              <div className="font-bold text-amber-700 text-sm mb-1">
                                -₹{mkt.costs.spoilageLoss.toLocaleString()}
                              </div>
                              <p className="text-[11px] text-slate-600 leading-tight">
                                {mkt.costs.spoilagePct}% transit weight & grade discount across {mkt.transitHours} hrs travel ({mkt.costs.spoilageQuantityQtl} quintals equivalent loss).
                              </p>
                            </div>

                            {/* Step 4: Fees & Take-home */}
                            <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200">
                              <span className="text-[10px] font-bold text-emerald-600 uppercase block mb-1">
                                Step 4: Net In-Hand Take Home
                              </span>
                              <div className="font-black text-emerald-800 text-base mb-1">
                                ₹{mkt.netReturnInr.toLocaleString()}
                              </div>
                              <p className="text-[11px] text-slate-600 leading-tight">
                                Minus ₹{mkt.costs.marketFeesBreakdown.apmcCess} APMC cess ({mkt.costs.marketFeesBreakdown.cessRatePct}%) + ₹{mkt.costs.marketFeesBreakdown.hamali} hamali + ₹{mkt.costs.marketFeesBreakdown.weighbridge} weighbridge.
                              </p>
                            </div>

                          </div>

                          {/* Dispatch slip trigger */}
                          <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectMarketForSlip(mkt);
                              }}
                              className="text-xs font-bold text-agri-700 hover:text-agri-900 underline flex items-center gap-1"
                            >
                              Generate Driver Dispatch Slip for this market →
                            </button>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}

