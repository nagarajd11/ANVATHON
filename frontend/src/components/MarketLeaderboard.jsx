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
  Volume2, 
  VolumeX 
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { toLocalizedMandiName, toLocalizedDistrict } from '../utils/kannadaLocalization';

export default function MarketLeaderboard({ analysis, lang = 'en', onSelectMarketForSlip }) {
  if (!analysis || !analysis.rankedMarkets) return null;

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const { rankedMarkets, quantityQuintals, cropName } = analysis;
  const [expandedId, setExpandedId] = useState(rankedMarkets[0]?.marketId || null);

  // Top 10 markets
  const top10 = rankedMarkets.slice(0, 10);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const { speak, stop, activeSpeechId } = useVoiceAssistant(lang);

  const handleSpeakMandi = (mkt) => {
    const speechId = `mkt-${mkt.marketId}`;
    if (activeSpeechId === speechId) {
      stop();
      return;
    }

    const knName = toLocalizedMandiName(mkt.marketName, 'kn');
    let speechText = '';
    if (lang === 'kn') {
      speechText = `${knName}. ಪ್ರಕಟಿತ ದರ ${mkt.modalPrice} ರೂಪಾಯಿ. ಸಾರಿಗೆ ವೆಚ್ಚ ${mkt.costs.transportCost} ರೂಪಾಯಿ. ಹಾಳಾಗುವಿಕೆ ನಷ್ಟ ${mkt.costs.spoilageLoss} ರೂಪಾಯಿ. ನಿಮ್ಮ ಕೈಗೆ ಸಿಗುವ ಒಟ್ಟು ನಿವ್ವಳ ಲಾಭ ${Math.round(mkt.netReturnInr)} ರೂಪಾಯಿಗಳು.`;
    } else if (lang === 'hi') {
      speechText = `${mkt.marketName} मंडी। विज्ञापित भाव ${mkt.modalPrice} रुपये। गाड़ी भाड़ा ${mkt.costs.transportCost} रुपये। फसल खराबी ${mkt.costs.spoilageLoss} रुपये। जेब में आने वाला शुद्ध मुनाफा ${Math.round(mkt.netReturnInr)} रुपये।`;
    } else {
      speechText = `${mkt.marketName}. Listed rate ₹${mkt.modalPrice} per quintal. Transport cost minus ₹${mkt.costs.transportCost.toLocaleString()}. Spoilage loss minus ₹${mkt.costs.spoilageLoss.toLocaleString()}. Final in-hand return: ₹${Math.round(mkt.netReturnInr).toLocaleString()}.`;
    }

    speak(speechText, speechId, lang);
  };

  // Localized UI dictionary
  const uiText = {
    en: {
      badgeTitle: "Net Returns Ranked",
      topCandidateBadge: `Top ${top10.length} Candidate Mandis`,
      bestChoice: "Best Choice",
      districtSuffix: "District",
      highArrivals: "High Arrivals",
      hrsDrive: "hrs drive",
      ageCut: "Age Cut",
      perQtl: "/qtl",
      billTitle: "Projected Mandi Settlement Statement",
      yardPrefix: "Yard",
      grossAuction: "GROSS AUCTION VALUE",
      freightDiesel: "(-) VEHICLE FREIGHT & DIESEL",
      decayDiscount: "(-) ROAD DECAY & WEIGHT DISCOUNT",
      apmcCess: "(-) APMC STATUTORY MANDI CESS",
      unloadingWeigh: "(-) UNLOADING & WEIGHBRIDGE",
      hamaliLabel: "Hamali",
      ticketLabel: "Ticket",
      cashInHand: "(=) ESTIMATED CASH IN HAND",
      capacityLabel: "Mandi Capacity",
      gateHours: "Gate Hours: 05:30 AM - 01:00 PM",
      printSlip: "Print Gate Pass & Settlement Slip",
      driveTime: "drive"
    },
    kn: {
      badgeTitle: "ನಿವ್ವಳ ಲಾಭದ ಶ್ರೇಯಾಂಕ",
      topCandidateBadge: `ಅಗ್ರ ${top10.length} ಮಂಡಿಗಳು`,
      bestChoice: "ಅತ್ಯುತ್ತಮ ಆಯ್ಕೆ",
      districtSuffix: "ಜಿಲ್ಲೆ",
      highArrivals: "ಹೆಚ್ಚಿನ ಆವಕ",
      hrsDrive: "ಗಂಟೆ ಪ್ರಯಾಣ",
      ageCut: "ಹಳೆಯ ಕೊಯ್ಲು ಕಡಿತ",
      perQtl: "/ಕ್ವಿಂಟಾಲ್",
      billTitle: "ಅಂದಾಜು ಮಂಡಿ ಇತ್ಯರ್ಥ ವಿವರಣೆ ಪಟ್ಟಿ",
      yardPrefix: "ಮಂಡಿ",
      grossAuction: "ಒಟ್ಟು ಹರಾಜು ಮೌಲ್ಯ",
      freightDiesel: "(-) ವಾಹನ ಬಾಡಿಗೆ ಮತ್ತು ಡೀಸೆಲ್",
      decayDiscount: "(-) ರಸ್ತೆ ಹಾಳಾಗುವಿಕೆ ನಷ್ಟ",
      apmcCess: "(-) ಎಪಿಎಂಸಿ ಶಾಸನಬದ್ಧ ಮಂಡಿ ಸೆಸ್",
      unloadingWeigh: "(-) ಇಳಿಸುವಿಕೆ ಹಮಾಲಿ ಮತ್ತು ತೂಕ",
      hamaliLabel: "ಹಮಾಲಿ",
      ticketLabel: "ತೂಕ ಶುಲ್ಕ",
      cashInHand: "(=) ಕೈಗೆ ಸಿಗುವ ಅಂದಾಜು ನೈಜ ನಗದು",
      capacityLabel: "ಮಂಡಿ ಸಾಮರ್ಥ್ಯ",
      gateHours: "ಗೇಟ್ ಸಮಯ: ಮುಂಜಾನೆ 05:30 - ಮಧ್ಯಾಹ್ನ 01:00",
      printSlip: "ಗೇಟ್ ಪಾಸ್ & ಇತ್ಯರ್ಥ ರಸೀದಿ ಮುದ್ರಿಸಿ",
      driveTime: "ಪ್ರಯಾಣ"
    },
    hi: {
      badgeTitle: "शुद्ध मुनाफे की रैंकिंग",
      topCandidateBadge: `शीर्ष ${top10.length} मंडियां`,
      bestChoice: "सर्वोत्तम विकल्प",
      districtSuffix: "जिला",
      highArrivals: "अधिक आवक",
      hrsDrive: "घंटे का सफर",
      ageCut: "बासी फसल कटौती",
      perQtl: "/क्विंटल",
      billTitle: "अनुमानित मंडी भुगतान विवरण पर्ची",
      yardPrefix: "मंडी",
      grossAuction: "कुल नीलामी मूल्य",
      freightDiesel: "(-) वाहन भाड़ा एवं डीजल",
      decayDiscount: "(-) रास्ते में फसल खराबी नुकसान",
      apmcCess: "(-) एपीएमसी वैधानिक मंडी उपकर",
      unloadingWeigh: "(-) उतराई हमाली एवं तुलाई",
      hamaliLabel: "हमाली",
      ticketLabel: "कांटा पर्ची",
      cashInHand: "(=) हाथ में आने वाला शुद्ध नकद",
      capacityLabel: "मंडी क्षमता",
      gateHours: "गेट समय: 05:30 पूर्वाह्न - 01:00 अपराह्न",
      printSlip: "गेट पास और निपटान पर्ची प्रिंट करें",
      driveTime: "सफर"
    }
  };

  const ui = uiText[lang] || uiText.en;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7 mb-8 overflow-hidden hover-lift">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
              <Trophy className="w-4 h-4 text-emerald-300" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-emerald-300 font-mono">
              {ui.badgeTitle}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white text-crisp">
            {t.leaderboardTitle}
          </h3>
          <p className="text-xs text-white/70 mt-0.5 font-sans">
            {t.leaderboardSub}
          </p>
        </div>
        <span className="text-xs font-mono tabular-nums font-medium px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/30 self-start sm:self-auto backdrop-blur-sm shadow-xs">
          {ui.topCandidateBadge}
        </span>
      </div>

      {/* Table Container with Framer Motion Layout Springs */}
      <div className="overflow-x-auto -mx-6 sm:mx-0">
        <LayoutGroup id="market-rankings-group">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs font-semibold text-white/70 uppercase tracking-wider bg-white/[0.02]">
                <th className="py-2.5 px-3 sm:px-4 font-mono">{t.rank}</th>
                <th className="py-2.5 px-3 sm:px-4">{t.market}</th>
                <th className="py-2.5 px-2 sm:px-3 font-mono">{t.distance}</th>
                <th className="py-2.5 px-2 sm:px-3 font-mono">{t.mandiPrice}</th>
                <th className="py-2.5 px-2 sm:px-3 text-right font-mono">{t.gross}</th>
                <th className="py-2.5 px-2 sm:px-3 text-right text-amber-300 font-mono">{t.freight}</th>
                <th className="py-2.5 px-2 sm:px-3 text-right text-amber-400 font-mono">{t.spoilage}</th>
                <th className="py-2.5 px-2 sm:px-3 text-right text-white/60 font-mono">{t.apmcFees}</th>
                <th className="py-2.5 px-3 sm:px-4 text-right text-emerald-300 font-bold font-mono">{t.netReturn}</th>
                <th className="py-2.5 px-3 text-center">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-medium text-white/90">
              {top10.map((mkt, idx) => {
                const isFirst = idx === 0;
                const isExpanded = expandedId === mkt.marketId;
                const displayName = toLocalizedMandiName(mkt.marketName, lang);
                const displayDistrict = toLocalizedDistrict(mkt.district, lang);

                return (
                  <React.Fragment key={mkt.marketId}>
                    {/* Animated gliding row with hover physics */}
                    <motion.tr 
                      layout
                      layoutId={`market-row-${mkt.marketId}`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      onClick={() => toggleExpand(mkt.marketId)}
                      className={`cursor-pointer transition-colors group ${
                        isFirst 
                          ? 'bg-emerald-500/[0.12] hover:bg-emerald-500/[0.18] border-l-4 border-l-emerald-400' 
                          : isExpanded 
                            ? 'bg-white/[0.06] border-l-4 border-l-white/30' 
                            : 'hover:bg-white/[0.04] hover:border-l-4 hover:border-l-emerald-500/30'
                      }`}
                    >
                      {/* Rank */}
                      <td className="py-3 px-3 sm:px-4 font-mono font-bold">
                        <div className="flex items-center gap-1.5">
                          {isFirst ? (
                            <span className="w-6 h-6 rounded-full bg-emerald-500 text-pine flex items-center justify-center text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                              1
                            </span>
                          ) : (
                            <span className="w-6 h-6 rounded-full bg-white/10 text-white/80 group-hover:bg-white/20 flex items-center justify-center text-xs font-medium">
                              {idx + 1}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Market Name & District */}
                      <td className="py-3 px-3 sm:px-4">
                        <div>
                          <div className="font-bold text-white flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-sans tracking-tight text-crisp">{displayName}</span>
                            {isFirst && (
                              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500 text-pine shadow-xs">
                                {ui.bestChoice}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-white/70 mt-0.5 font-sans">
                            {displayDistrict} {ui.districtSuffix}
                            {mkt.capacityInfo.hasGlutRisk && (
                              <span className="ml-1.5 text-amber-300 font-medium inline-flex items-center gap-0.5">
                                <AlertTriangle className="w-3 h-3 text-amber-400" />
                                {ui.highArrivals}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Distance & Transit Hours */}
                      <td className="py-3 px-2 sm:px-3 text-white/80 whitespace-nowrap font-mono tabular-nums">
                        <div className="font-medium">{mkt.roadDistanceKm} km</div>
                        <div className="text-xs text-white/50">{mkt.transitHours} {ui.hrsDrive}</div>
                      </td>

                      {/* Mandi Headline Price */}
                      <td className="py-3 px-2 sm:px-3 whitespace-nowrap font-mono tabular-nums text-white font-medium">
                        <div>₹{mkt.modalPrice.toLocaleString()}<span className="text-xs text-white/50">{ui.perQtl}</span></div>
                        {mkt.freshnessDiscountPct > 0 && (
                          <div className="text-xs font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                            <span className="bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.5 rounded">-{mkt.freshnessDiscountPct}% {ui.ageCut}</span>
                            <span className="line-through text-white/40 font-normal">₹{mkt.baselineModalPrice}</span>
                          </div>
                        )}
                      </td>

                      {/* Gross */}
                      <td className="py-3 px-2 sm:px-3 text-right whitespace-nowrap font-mono tabular-nums font-medium text-white/90">
                        ₹{mkt.grossRevenue.toLocaleString()}
                      </td>

                      {/* Freight */}
                      <td className="py-3 px-2 sm:px-3 text-right text-amber-200 font-mono tabular-nums whitespace-nowrap font-medium">
                        -₹{mkt.costs.transportCost.toLocaleString()}
                      </td>

                      {/* Spoilage */}
                      <td className="py-3 px-2 sm:px-3 text-right text-amber-300 font-mono tabular-nums whitespace-nowrap font-medium">
                        -₹{mkt.costs.spoilageLoss.toLocaleString()}
                        <div className="text-xs text-amber-300/70">({mkt.costs.spoilagePct}%)</div>
                      </td>

                      {/* Mandi Fees */}
                      <td className="py-3 px-2 sm:px-3 text-right text-white/60 font-mono tabular-nums whitespace-nowrap">
                        -₹{mkt.costs.marketFees.toLocaleString()}
                      </td>

                      {/* Net In-Hand Take Home */}
                      <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                        <div className="text-sm sm:text-base font-bold text-emerald-300 font-mono tabular-nums text-crisp">
                          ₹{mkt.netReturnInr.toLocaleString()}
                        </div>
                        <div className="text-xs font-mono tabular-nums text-emerald-400/80">
                          ₹{mkt.netReturnPerQuintal}{ui.perQtl}
                        </div>
                      </td>

                      {/* Toggle */}
                      <td className="py-3 px-3 text-center text-white/40">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 mx-auto text-emerald-300" />
                        ) : (
                          <ChevronDown className="w-4 h-4 mx-auto group-hover:text-white" />
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
                          className="bg-black/20 border-b border-white/10"
                        >
                          <td colSpan="10" className="p-4 sm:p-5">
                            <div className="glass-dark-card rounded-2xl p-5 border border-white/12 shadow-lg font-mono text-xs backdrop-blur-sm">
                              
                              {/* Bill Header */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-dashed border-white/15 text-white">
                                <div className="flex items-center gap-2">
                                  <Receipt className="w-4 h-4 text-emerald-400" />
                                  <span className="font-bold tracking-wider text-xs text-emerald-300 uppercase font-sans">
                                    {ui.billTitle}
                                  </span>
                                </div>
                                <div className="text-xs text-white/70 font-sans mt-1 sm:mt-0">
                                  {ui.yardPrefix}: <span className="font-bold text-white">{displayName}</span> • {displayDistrict}
                                </div>
                              </div>

                              {/* Monospace Right-Aligned Ledger Table */}
                              <div className="space-y-2 text-xs text-white/90 leading-relaxed font-sans">
                                
                                <div className="receipt-line font-mono">
                                  <span>[1] {ui.grossAuction} ({quantityQuintals} {lang === 'kn' ? 'ಕ್ವಿಂ' : 'qtl'} @ ₹{mkt.modalPrice}{ui.perQtl})</span>
                                  <span className="font-bold text-white">₹ {mkt.grossRevenue.toLocaleString()}.00</span>
                                </div>

                                <div className="receipt-line text-amber-200 font-mono">
                                  <span>[2] {ui.freightDiesel} ({mkt.roadDistanceKm} km, {mkt.vehicleUsed?.name || 'Truck'})</span>
                                  <span className="font-semibold">-₹ {mkt.costs.transportCost.toLocaleString()}.00</span>
                                </div>

                                <div className="receipt-line text-amber-300 font-mono">
                                  <span>[3] {ui.decayDiscount} ({mkt.costs.spoilagePct}%, {mkt.transitHours}h {ui.driveTime})</span>
                                  <span className="font-semibold">-₹ {mkt.costs.spoilageLoss.toLocaleString()}.00</span>
                                </div>

                                <div className="receipt-line text-white/70 font-mono">
                                  <span>[4] {ui.apmcCess} ({mkt.costs.marketFeesBreakdown?.cessRatePct || '1.5'}%)</span>
                                  <span>-₹ {mkt.costs.marketFeesBreakdown?.apmcCess.toLocaleString() || '0'}.00</span>
                                </div>

                                <div className="receipt-line text-white/70 font-mono">
                                  <span>[5] {ui.unloadingWeigh} ({ui.hamaliLabel} ₹{mkt.costs.marketFeesBreakdown?.hamali || 0} + {ui.ticketLabel} ₹{mkt.costs.marketFeesBreakdown?.weighbridge || 0})</span>
                                  <span>-₹ {((mkt.costs.marketFeesBreakdown?.hamali || 0) + (mkt.costs.marketFeesBreakdown?.weighbridge || 0)).toLocaleString()}.00</span>
                                </div>

                                <div className="border-t-2 border-dashed border-emerald-500/40 pt-3 mt-2.5 flex justify-between items-baseline font-bold text-sm text-emerald-300">
                                  <span className="uppercase tracking-tight font-sans">{ui.cashInHand}</span>
                                  <span className="text-emerald-300 font-extrabold text-base sm:text-lg font-mono">
                                    ₹ {mkt.netReturnInr.toLocaleString()}.00
                                  </span>
                                </div>

                              </div>

                              {/* Action Link to Dispatch Slip */}
                              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
                                <span className="text-xs text-white/60 font-sans">
                                  {ui.capacityLabel}: {mkt.capacityInfo?.capacityUtilPct || 65}% • {ui.gateHours}
                                </span>
                                <div className="flex items-center gap-2">
                                  {/* Listen to this mandi return audio */}
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSpeakMandi(mkt);
                                    }}
                                    className="btn-secondary !py-2 !px-3 text-xs font-sans font-bold flex items-center gap-1.5 cursor-pointer text-emerald-300 hover:text-white"
                                    title={activeSpeechId === `mkt-${mkt.marketId}` ? 'Stop Audio' : 'Listen'}
                                  >
                                    {activeSpeechId === `mkt-${mkt.marketId}` ? (
                                      <>
                                        <VolumeX className="w-3.5 h-3.5 text-pine animate-pulse" />
                                        <span>{lang === 'kn' ? 'ಆಲಿಸುತ್ತಿದೆ...' : 'Playing...'}</span>
                                      </>
                                    ) : (
                                      <>
                                        <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                                        <span>{lang === 'kn' ? '🔊 ಆಲಿಸಿ' : '🔊 Listen'}</span>
                                      </>
                                    )}
                                  </button>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onSelectMarketForSlip(mkt);
                                    }}
                                    className="btn-shimmer text-xs font-sans font-bold text-pine bg-emerald-500 hover:bg-emerald-400 inline-flex items-center gap-1.5 transition-all cursor-pointer px-4 py-2 rounded-xl border border-emerald-400 shadow-sm"
                                  >
                                    <span>{ui.printSlip}</span>
                                    <ArrowRight className="w-3.5 h-3.5 text-pine" />
                                  </button>
                                </div>
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
