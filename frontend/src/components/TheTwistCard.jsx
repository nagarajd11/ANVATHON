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
  ArrowRight,
  Volume2,
  VolumeX
, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { useVoiceAssistant } from '../hooks/useVoiceAssistant';
import { toLocalizedMandiName, toLocalizedDistrict } from '../utils/kannadaLocalization';

export default function TheTwistCard({ analysis, lang, onFocusMarket }) {
  if (!analysis || !analysis.twist) return null;

  const t = TRANSLATIONS[lang];
  const { twist, quantityQuintals, cropName, rankedMarkets } = analysis;
  const { bestNetMarket, highestPriceMarket, isSame, rupeeDifference } = twist;

  const explanationText = twist.explanation[lang] || twist.explanation.en;

  const { speak, stop, activeSpeechId } = useVoiceAssistant(lang);

  // Spoken audio decision: Compares strictly the TOP TWO ranked mandis from the farmer's filtered list
  // Speaks authentic, fluent Kannada stating the net returns, distance, difference in rupees, and advising to sell at #1.
  const getKannadaSpeechText = () => {
    const m1 = (rankedMarkets && rankedMarkets[0]) || bestNetMarket;
    const m2 = (rankedMarkets && rankedMarkets[1]) || null;
    if (!m1) return '';

    const name1 = toLocalizedMandiName(m1.marketName);
    const dist1 = Math.round(m1.roadDistanceKm);
    const net1 = Math.round(m1.netReturnInr);

    if (!m2 || m1.marketId === m2.marketId) {
      return `ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ. ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಫಿಲ್ಟರ್ ಪ್ರಕಾರ ನಿಮ್ಮ ಬೆಳೆಗೆ ಅತ್ಯುತ್ತಮ ಮಾರುಕಟ್ಟೆ ${name1} ಆಗಿದೆ. ಇದು ನಿಮ್ಮ ಸ್ಥಳದಿಂದ ${dist1} ಕಿಲೋಮೀಟರ್ ದೂರದಲ್ಲಿದ್ದು, ಸಾರಿಗೆ ವೆಚ್ಚ ಮತ್ತು ಎಲ್ಲಾ ಮಂಡಿ ಶುಲ್ಕ ಕಳೆದ ನಂತರ ನಿಮ್ಮ ಕೈಗೆ ${net1} ರೂಪಾಯಿಗಳ ನಿವ್ವಳ ಲಾಭ ಸಿಗುತ್ತದೆ. ಆದ್ದರಿಂದ ನೀವು ${name1} ಮಂಡಿಯಲ್ಲೇ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಮಾರಾಟ ಮಾಡಿ ಗರಿಷ್ಠ ಲಾಭ ಗಳಿಸಿ.`;
    }

    const name2 = toLocalizedMandiName(m2.marketName);
    const dist2 = Math.round(m2.roadDistanceKm);
    const net2 = Math.round(m2.netReturnInr);
    const diff = Math.abs(net1 - net2);

    return `ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ. ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಫಿಲ್ಟರ್ ಪ್ರಕಾರ ಮಂಡಿ ರ‍್ಯಾಂಕಿಂಗ್ ಪಟ್ಟಿಯ ಅಗ್ರ ಎರಡು ಅತ್ಯುತ್ತಮ ಮಂಡಿಗಳು ಹೀಗಿವೆ. ` +
      `ಮೊದಲನೆಯ ಅತ್ಯುತ್ತಮ ಮಂಡಿ ${name1}. ನಿಮ್ಮ ಸ್ಥಳದಿಂದ ಇದು ${dist1} ಕಿಲೋಮೀಟರ್ ದೂರವಿದ್ದು, ಎಲ್ಲಾ ಸಾರಿಗೆ ಮತ್ತು ಮಂಡಿ ಶುಲ್ಕ ಕಳೆದ ನಂತರ ನಿಮ್ಮ ಕೈಗೆ ${net1} ರೂಪಾಯಿಗಳ ನಿವ್ವಳ ಲಾಭ ಸಿಗುತ್ತದೆ. ` +
      `ಎರಡನೆಯ ಮಂಡಿ ${name2}. ಇದು ${dist2} ಕಿಲೋಮೀಟರ್ ದೂರವಿದ್ದು, ಇಲ್ಲಿ ನಿಮಗೆ ${net2} ರೂಪಾಯಿಗಳ ನಿವ್ವಳ ಲಾಭ ಸಿಗುತ್ತದೆ. ` +
      `${name1} ಮಂಡಿಯು ${name2} ಗಿಂತ ${diff} ರೂಪಾಯಿಗಳಷ್ಟು ಹೆಚ್ಚಿನ ನಿವ್ವಳ ಲಾಭ ನೀಡುತ್ತದೆ. ` +
      `ಆದ್ದರಿಂದ ಹೆಚ್ಚು ಲಾಭ ಕೊಡುವ ಮೊದಲನೆಯ ${name1} ಮಂಡಿಯಲ್ಲೇ ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಮಾರಾಟ ಮಾಡಿ ಗರಿಷ್ಠ ಆದಾಯ ಪಡೆಯಿರಿ.`;
  };

  // English counterpart for top two ranked mandis
  const getEnglishSpeechText = () => {
    const m1 = (rankedMarkets && rankedMarkets[0]) || bestNetMarket;
    const m2 = (rankedMarkets && rankedMarkets[1]) || null;
    if (!m1) return '';

    const name1 = m1.marketName;
    const dist1 = Math.round(m1.roadDistanceKm);
    const net1 = Math.round(m1.netReturnInr).toLocaleString();

    if (!m2 || m1.marketId === m2.marketId) {
      return `Hello farmer friend. Based on your selected filters, the top ranked market for your crop is ${name1}, at a distance of ${dist1} km, giving you a net in-hand profit of ₹${net1} after all expenses. We strongly recommend selling at ${name1} for maximum returns.`;
    }

    const name2 = m2.marketName;
    const dist2 = Math.round(m2.roadDistanceKm);
    const net2 = Math.round(m2.netReturnInr).toLocaleString();
    const diff = Math.abs(Math.round(m1.netReturnInr) - Math.round(m2.netReturnInr)).toLocaleString();

    return `Hello farmer friend. Based on your selected filters, here are the top two best mandis from the ranking list. ` +
      `Rank 1 is ${name1}, located ${dist1} km away, yielding ₹${net1} net in-hand cash after all transport and fees. ` +
      `Rank 2 is ${name2}, located ${dist2} km away, yielding ₹${net2} net in-hand cash. ` +
      `${name1} gives you ₹${diff} more net profit than ${name2}. ` +
      `Therefore, please sell at ${name1} to pocket the highest profit.`;
  };

  const handleSpeakKn = () => {
    const speechId = 'twist-audio-kn';
    if (activeSpeechId === speechId) {
      stop();
      return;
    }
    const text = getKannadaSpeechText();
    speak(text, speechId, 'kn');
  };

  const handleSpeakEn = () => {
    const speechId = 'twist-audio-en';
    if (activeSpeechId === speechId) {
      stop();
      return;
    }
    const text = getEnglishSpeechText();
    speak(text, speechId, 'en');
  };

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

                <div className="flex items-center flex-wrap gap-3">
          {/* Dual Bilingual Audio Buttons: Kannada & English */}
          <div className="flex items-center gap-2">
            {/* Primary Kannada Audio Button */}
            <button
              type="button"
              onClick={handleSpeakKn}
              className={`btn-secondary !py-2 !px-3 sm:!px-4 flex items-center gap-2 transition-all cursor-pointer font-sans text-xs ${
                activeSpeechId === 'twist-audio-kn' 
                  ? 'bg-emerald-500 text-pine border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] font-bold' 
                  : 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/25'
              }`}
              title={activeSpeechId === 'twist-audio-kn' ? 'ಆಡಿಯೋ ನಿಲ್ಲಿಸಿ (Stop Audio)' : 'ಕನ್ನಡದಲ್ಲಿ ನಿರ್ಧಾರದ ಆಡಿಯೋ ಆಲಿಸಿ'}
              aria-pressed={activeSpeechId === 'twist-audio-kn'}
            >
              {activeSpeechId === 'twist-audio-kn' ? (
                <>
                  <VolumeX className="w-4 h-4 text-pine animate-pulse" />
                  <span className="font-bold text-pine flex items-center gap-1.5">
                    <span>ಆಲಿಸುತ್ತಿದೆ...</span>
                    <span className="flex gap-0.5">
                      <span className="w-1 h-3 bg-pine animate-bounce" />
                      <span className="w-1 h-4 bg-pine animate-bounce delay-100" />
                      <span className="w-1 h-2 bg-pine animate-bounce delay-200" />
                    </span>
                  </span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />
                  <span className="font-bold">
                    🔊 ನಿರ್ಧಾರದ ಆಡಿಯೋ ಆಲಿಸಿ (ಕನ್ನಡ)
                  </span>
                </>
              )}
            </button>

            {/* English Audio Button */}
            <button
              type="button"
              onClick={handleSpeakEn}
              className={`btn-secondary !py-2 !px-3 flex items-center gap-1.5 transition-all cursor-pointer font-sans text-xs ${
                activeSpeechId === 'twist-audio-en' 
                  ? 'bg-emerald-500 text-pine border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)] font-bold' 
                  : 'text-white/80 hover:text-emerald-300 hover:border-emerald-400/40'
              }`}
              title={activeSpeechId === 'twist-audio-en' ? 'Stop Audio' : 'Listen in English'}
              aria-pressed={activeSpeechId === 'twist-audio-en'}
            >
              {activeSpeechId === 'twist-audio-en' ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-pine animate-pulse" />
                  <span className="font-bold text-pine">Playing...</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-white/70" />
                  <span>Decision Audio (English)</span>
                </>
              )}
            </button>
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
      </div>

      {/* Side-by-side comparison cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        
                {/* Left: HarvestRoute Smart Pick (The True Harvest Winner - Most Profitable) */}
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
              {toLocalizedDistrict(bestNetMarket.district, lang)}{lang === 'kn' ? ' ಜಿಲ್ಲೆ' : ''}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight text-crisp">
              {toLocalizedMandiName(bestNetMarket.marketName, lang)}
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
            onClick={() => onFocusMarket && onFocusMarket(bestNetMarket || (analysis && analysis.bestNetMarket) || (rankedMarkets && rankedMarkets[0]))}
            className="btn-shimmer btn-primary w-full mt-3.5 py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all shadow-md"
          >
            <span>
              {lang === 'kn' 
                ? 'ಗೆದ್ದ ಮಂಡಿ ಲಾಕ್ ಮಾಡಿ & ಗೇಟ್ ಪಾಸ್ ಮುದ್ರಿಸಿ' 
                : lang === 'hi' 
                  ? 'विजेता मंडी लॉक करें और गेट पास प्रिंट करें' 
                  : 'Lock Winner & Print Settlement Pass'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-pine" />
          </button>

        </div>

        {/* Right: Nominal Price Trap (The Price Mirage) */}
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
              {toLocalizedDistrict(highestPriceMarket.district, lang)}{lang === 'kn' ? ' ಜಿಲ್ಲೆ' : ''}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight text-crisp">
              {toLocalizedMandiName(highestPriceMarket.marketName, lang)}
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
      </div>

      {/* Assigned Best Vehicle & Verified Driver Dispatch Card */}
      {analysis.allocatedTransport && (
        <div className="rounded-2xl p-5 border-2 border-emerald-400/40 bg-gradient-to-br from-emerald-950/40 via-pine/30 to-black/50 shadow-xl backdrop-blur-md mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-pine flex items-center justify-center font-black shadow-lg shadow-emerald-950/40 shrink-0">
                <Truck className="w-6 h-6 text-pine" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    {lang === 'kn' ? 'ಹಂಚಿಕೆಯಾದ ಅತ್ಯುತ್ತಮ ವಾಹನ' : 'Assigned Optimal Transport'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-emerald-400 font-semibold hidden sm:inline">Ready to Dispatch</span>
                </div>
                <h3 className="text-lg sm:text-xl font-display font-extrabold text-white mt-1">
                  {lang === 'kn' ? analysis.allocatedTransport.vehicleNameKn : analysis.allocatedTransport.vehicleName}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <div className="bg-black/40 border border-white/15 px-3 py-1.5 rounded-xl">
                <span className="text-white/50">Capacity: </span>
                <span className="text-emerald-300 font-bold">{analysis.allocatedTransport.capacityQuintals} qtl</span>
              </div>
              <div className="bg-black/40 border border-white/15 px-3 py-1.5 rounded-xl">
                <span className="text-white/50">Trips: </span>
                <span className="text-white font-bold">{analysis.allocatedTransport.tripsRequired} direct haul</span>
              </div>
            </div>
          </div>

          {/* Reason banner */}
          <div className="py-3 text-xs text-emerald-200/90 font-sans leading-relaxed flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{lang === 'kn' ? analysis.allocatedTransport.recommendationReasonKn : analysis.allocatedTransport.recommendationReason}</span>
          </div>

          {/* Driver Card & Contact details */}
          {analysis.allocatedTransport.driver && (
            <div className="mt-2 pt-3 border-t border-white/10 bg-black/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center font-bold text-emerald-300 shrink-0 text-base shadow-sm">
                  {analysis.allocatedTransport.driver.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm sm:text-base font-sans">
                      {lang === 'kn' ? analysis.allocatedTransport.driver.nameKn : analysis.allocatedTransport.driver.name}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" title="Verified Carrier" />
                    <span className="text-xs px-2 py-0.5 rounded-md bg-white/10 text-white/80 font-mono">
                      {analysis.allocatedTransport.driver.plateNumber}
                    </span>
                    <span className="text-xs font-bold text-amber-300 font-mono">
                      ★ {analysis.allocatedTransport.driver.rating}
                    </span>
                  </div>
                  <div className="text-xs text-white/60 font-mono mt-0.5 flex items-center gap-2">
                    <span>{analysis.allocatedTransport.driver.baseStand}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{analysis.allocatedTransport.driver.statusLabel}</span>
                  </div>
                </div>
              </div>

              {/* Direct Call & WhatsApp */}
              <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
                <a
                  href={`tel:${analysis.allocatedTransport.driver.cleanPhone}`}
                  className="px-3.5 py-2 rounded-xl bg-emerald-950/70 border border-emerald-500/50 flex items-center gap-2 hover:bg-emerald-900/60 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
                  <span className="font-mono text-sm sm:text-base font-bold text-emerald-300 tracking-wide">
                    {analysis.allocatedTransport.driver.phone}
                  </span>
                </a>

                <a
                  href={`tel:${analysis.allocatedTransport.driver.cleanPhone}`}
                  className="btn-shimmer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-pine font-bold text-xs shadow-md transition-all cursor-pointer"
                  title="Call Driver Now"
                >
                  <Phone className="w-3.5 h-3.5 fill-pine text-pine" />
                  <span>Call Driver</span>
                </a>

                <a
                  href={analysis.allocatedTransport.driver.whatsappUri}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold hover:text-emerald-300 transition-all cursor-pointer"
                  title="WhatsApp Driver"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

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
