import React from 'react';
import { 
  Sliders, 
  RotateCcw, 
  Fuel, 
  Sparkles, 
  Percent, 
  Gauge,
  ShieldCheck,
  AlertTriangle,
  Leaf,
  Truck,
  MapPin,
  Coins
} from 'lucide-react';

export default function SensitivityLab({
  lang = 'en',
  fuelRateMultiplier = 1.0,
  setFuelRateMultiplier = () => {},
  spoilageMultiplier = 1.0,
  setSpoilageMultiplier = () => {},
  cessRateOverride = 0.015,
  setCessRateOverride = () => {},
  speedKmph = 40,
  setSpeedKmph = () => {},
  onReset = () => {}
}) {
  const content = {
    en: {
      title: "Cost, Quality & Distance Assumptions",
      subtitle: "Change simple real-world factors like produce quality, road conditions, and diesel cost to find your winning mandi.",
      resetBtn: "Reset to Default",
      liveBadge: "Live Profit Recalculation",
      quality: {
        title: "1. Produce Quality & Freshness",
        desc: "Fresh crops survive long travel; ripe crops spoil fast on rough roads.",
        presetA: "Grade A (Fresh)",
        presetB: "Grade B (Normal)",
        presetC: "Grade C (Ripe / Urgent)",
        statusA: "🌟 Grade A: Stays fresh on long drives (Low decay risk)",
        statusB: "🌿 Grade B: Standard harvest (Normal transit decay)",
        statusC: "⚠️ Grade C: Ripe crop (High decay — sell to a nearby mandi!)"
      },
      cost: {
        title: "2. Transport Cost (Diesel Rate)",
        desc: "Adjust if local truck drivers charge higher or lower freight today.",
        presetLow: "Budget (₹20/km)",
        presetMid: "Standard (₹25/km)",
        presetHigh: "High Fuel (₹32/km)",
        statusLow: "💰 Budget Freight: Low diesel rates",
        statusMid: "🚛 Standard Rate: Regular truck freight",
        statusHigh: "⛽ Expensive Freight: High diesel price (+35%)"
      },
      distance: {
        title: "3. Road Condition & Travel Speed",
        desc: "Slower roads mean more hours under the hot sun and higher weight loss.",
        presetRough: "Rough Roads (25 km/h)",
        presetNormal: "Standard (40 km/h)",
        presetExpress: "Express (55 km/h)",
        statusRough: "🚜 Village / Rough Roads: Slow travel, more bumps",
        statusNormal: "🛣️ State Highway: Normal driving speed",
        statusExpress: "⚡ Fast 4-Lane Highway: Quick delivery"
      },
      fee: {
        title: "4. Mandi Yard Fees & Cuts",
        desc: "Expected deduction for APMC cess, hamali, and weighing.",
        presetLow: "Low Cut (1.0%)",
        presetMid: "Standard APMC (1.5%)",
        presetHigh: "High Yard Cuts (2.5%)",
        statusLow: "📉 Low Deduction: Direct yard sale",
        statusMid: "⚖️ Standard APMC: Official 1.5% cess",
        statusHigh: "📈 High Cuts: Extra hamali and weighing fee"
      }
    },
    kn: {
      title: "ವೆಚ್ಚ, ಗುಣಮಟ್ಟ ಮತ್ತು ರಸ್ತೆ ದೂರದ ಹೊಂದಾಣಿಕೆ",
      subtitle: "ಬೆಳೆಯ ಗುಣಮಟ್ಟ, ಡೀಸೆಲ್ ಬಾಡಿಗೆ ಮತ್ತು ರಸ್ತೆ ವೇಗವನ್ನು ನಿಮ್ಮ ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಯಿಸಿ.",
      resetBtn: "ಮೊದಲಿನಂತೆ ಮಾಡಿ",
      liveBadge: "ನೈಜ ಸಮಯದಲ್ಲಿ ಲೆಕ್ಕಾಚಾರ",
      quality: {
        title: "1. ಬೆಳೆಯ ಗುಣಮಟ್ಟ ಮತ್ತು ತಾಜಾತನ",
        desc: "ತಾಜಾ ಬೆಳೆ ದೂರದ ಪ್ರಯಾಣ ತಡೆಯುತ್ತದೆ; ಮಾಗಿದ ಬೆಳೆ ಬೇಗ ಹಾಳಾಗುತ್ತದೆ.",
        presetA: "ಗ್ರೇಡ್ A (ಅತ್ಯುತ್ತಮ)",
        presetB: "ಗ್ರೇಡ್ B (ಸಾಮಾನ್ಯ)",
        presetC: "ಗ್ರೇಡ್ C (ಮಾಗಿದ್ದು / ಬೇಗ ಮಾರಿ)",
        statusA: "🌟 ಗ್ರೇಡ್ A: ದೂರದ ಮಂಡಿಗೆ ಕೊಂಡೊಯ್ಯಲು ಸೂಕ್ತ (ಕಡಿಮೆ ನಷ್ಟ)",
        statusB: "🌿 ಗ್ರೇಡ್ B: ಸಾಮಾನ್ಯ ಗುಣಮಟ್ಟದ ಬೆಳೆ",
        statusC: "⚠️ ಗ್ರೇಡ್ C: ಮಾಗಿದ ಬೆಳೆ (ಹತ್ತಿರದ ಮಂಡಿಯಲ್ಲೇ ಮಾರುವುದು ಉತ್ತಮ)"
      },
      cost: {
        title: "2. ಸಾರಿಗೆ ಮತ್ತು ಡೀಸೆಲ್ ವೆಚ್ಚ",
        desc: "ಇಂದಿನ ಲಾರಿ ಬಾಡಿಗೆ ಮತ್ತು ಡೀಸೆಲ್ ದರಕ್ಕೆ ತಕ್ಕಂತೆ ಬದಲಾಯಿಸಿ.",
        presetLow: "ಕಡಿಮೆ (₹20/ಕಿ.ಮೀ)",
        presetMid: "ಸಾಮಾನ್ಯ (₹25/ಕಿ.ಮೀ)",
        presetHigh: "ಹೆಚ್ಚು (₹32/ಕಿ.ಮೀ)",
        statusLow: "💰 ಕಡಿಮೆ ವೆಚ್ಚ: ಉಳಿತಾಯದ ಬಾಡಿಗೆ",
        statusMid: "🚛 ಸಾಮಾನ್ಯ ಬಾಡಿಗೆ: ಸರಾಸರಿ ಮಾರುಕಟ್ಟೆ ದರ",
        statusHigh: "⛽ ದುಬಾರಿ ಬಾಡಿಗೆ: ಹೆಚ್ಚಿನ ಡೀಸೆಲ್ ದರ"
      },
      distance: {
        title: "3. ರಸ್ತೆ ಸ್ಥಿತಿ ಮತ್ತು ಚಾಲನಾ ವೇಗ",
        desc: "ನಿಧಾನದ ರಸ್ತೆಗಳಲ್ಲಿ ಬಿಸಿಲಿಗೆ ತರಕಾರಿ ತೂಕ ಬೇಗ ಇಳಿಯುತ್ತದೆ.",
        presetRough: "ಹಳ್ಳಿ ರಸ್ತೆ (25 km/h)",
        presetNormal: "ಸಾಮಾನ್ಯ (40 km/h)",
        presetExpress: "ಹೆದ್ದಾರಿ (55 km/h)",
        statusRough: "🚜 ಹಳ್ಳಿ ರಸ್ತೆ: ನಿಧಾನ ಪ್ರಯಾಣ, ಹೆಚ್ಚು ಗುಂಡಿಗಳು",
        statusNormal: "🛣️ ರಾಜ್ಯ ಹೆದ್ದಾರಿ: ಸಾಮಾನ್ಯ ಚಾಲನಾ ವೇಗ",
        statusExpress: "⚡ ರಾಷ್ಟ್ರೀಯ ಹೆದ್ದಾರಿ: ವೇಗದ ಸಾಗಾಟ"
      },
      fee: {
        title: "4. ಮಂಡಿ ಶುಲ್ಕ ಮತ್ತು ಹಮಾಲಿ",
        desc: "ಎಪಿಎಂಸಿ ಸೆಸ್ ಮತ್ತು ಮಂಡಿ ಖರ್ಚುಗಳ ಅಂದಾಜು.",
        presetLow: "ಕಡಿಮೆ (1.0%)",
        presetMid: "ಸಾಮಾನ್ಯ (1.5%)",
        presetHigh: "ಹೆಚ್ಚು (2.5%)",
        statusLow: "📉 ಕಡಿಮೆ ಶುಲ್ಕ",
        statusMid: "⚖️ ಸಾಮಾನ್ಯ ಎಪಿಎಂಸಿ ಸೆಸ್ (1.5%)",
        statusHigh: "📈 ಹೆಚ್ಚಿನ ಹಮಾಲಿ ಮತ್ತು ತೂಕದ ಕಡಿತ"
      }
    },
    hi: {
      title: "लागत, फसल गुणवत्ता एवं दूरी का हिसाब",
      subtitle: "फसल की क्वालिटी, गाड़ी का भाड़ा और सड़क की स्थिति को अपनी जरूरत अनुसार बदलें।",
      resetBtn: "डिफ़ॉल्ट सेट करें",
      liveBadge: "तुरंत मुनाफा गणना",
      quality: {
        title: "1. फसल की गुणवत्ता एवं ताज़गी",
        desc: "कड़क ताज़ा माल लंबा सफर झेलता है, पका हुआ माल रास्ते में दब जाता है।",
        presetA: "ग्रेड A (एकदम ताज़ा)",
        presetB: "ग्रेड B (सामान्य)",
        presetC: "ग्रेड C (पका हुआ / तुरंत बेचें)",
        statusA: "🌟 ग्रेड A: दूर की मंडी के लिए सुरक्षित (खराबी का कम जोखिम)",
        statusB: "🌿 ग्रेड B: सामान्य औसत क्वालिटी",
        statusC: "⚠️ ग्रेड C: पका हुआ माल (नजदीकी मंडी में बेचना ही फायदेमंद)"
      },
      cost: {
        title: "2. गाड़ी भाड़ा एवं डीजल लागत",
        desc: "यदि आज लोकल ड्राइवर ज्यादा या कम भाड़ा मांग रहा है तो बदलें।",
        presetLow: "सस्ता (₹20/किमी)",
        presetMid: "सामान्य (₹25/किमी)",
        presetHigh: "महंगा डीजल (₹32/किमी)",
        statusLow: "💰 कम भाड़ा: किफायती गाड़ी",
        statusMid: "🚛 सामान्य भाड़ा: औसत बाजार दर",
        statusHigh: "⛽ महंगा भाड़ा: डीजल का ऊंचा भाव (+35%)"
      },
      distance: {
        title: "3. सड़क की स्थिति एवं दूरी का समय",
        desc: "सड़क खराब होगी तो धूप में फसल का वजन और चमक जल्दी घटेगी।",
        presetRough: "कच्ची सड़क (25 km/h)",
        presetNormal: "सामान्य रोड (40 km/h)",
        presetExpress: "एक्सप्रेस हाईवे (55 km/h)",
        statusRough: "🚜 कच्ची / ग्रामीण सड़क: धीमा सफर, ज्यादा झटके",
        statusNormal: "🛣️ पक्की स्टेट रोड: सामान्य गति",
        statusExpress: "⚡ नेशनल हाईवे: तेज डिलीवरी"
      },
      fee: {
        title: "4. मंडी टैक्स एवं आढ़त कटौती",
        desc: "मंडी में कटने वाला सरकारी सेस, हमाली और तुलाई खर्च।",
        presetLow: "कम कटौती (1.0%)",
        presetMid: "सरकारी सेस (1.5%)",
        presetHigh: "ज्यादा कटौती (2.5%)",
        statusLow: "📉 कम शुल्क",
        statusMid: "⚖️ मानक एपीएमसी सेस (1.5%)",
        statusHigh: "📈 ज्यादा हमाली व तुलाई कटौती"
      }
    }
  };

  const c = content[lang] || content.en;

  // Determine current quality label
  const getQualityLabel = () => {
    if (spoilageMultiplier <= 0.8) return c.quality.statusA;
    if (spoilageMultiplier >= 1.4) return c.quality.statusC;
    return c.quality.statusB;
  };

  // Determine current cost label
  const getCostLabel = () => {
    if (fuelRateMultiplier <= 0.9) return c.cost.statusLow;
    if (fuelRateMultiplier >= 1.2) return c.cost.statusHigh;
    return c.cost.statusMid;
  };

  // Determine current distance/speed label
  const getSpeedLabel = () => {
    if (speedKmph <= 30) return c.distance.statusRough;
    if (speedKmph >= 50) return c.distance.statusExpress;
    return c.distance.statusNormal;
  };

  // Determine current fee label
  const getFeeLabel = () => {
    if (cessRateOverride <= 0.012) return c.fee.statusLow;
    if (cessRateOverride >= 0.02) return c.fee.statusHigh;
    return c.fee.statusMid;
  };

  return (
    <div className="glass-card rounded-3xl p-5 sm:p-7 hover-lift">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
              <Sliders className="w-4 h-4 text-emerald-300" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-emerald-300 font-mono">
              {c.liveBadge}
            </span>
          </div>
          <h3 className="text-lg sm:text-2xl font-display font-bold tracking-tight text-white text-crisp">
            {c.title}
          </h3>
          <p className="text-xs text-white/70 mt-0.5 font-sans">
            {c.subtitle}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="btn-secondary !py-1.5 !px-3 text-xs self-start sm:self-center flex items-center gap-1.5 cursor-pointer hover:border-emerald-400"
          title="Reset to default assumptions"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-300" />
          <span>{c.resetBtn}</span>
        </button>
      </div>

      {/* 4 Simple Farmer Qualities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 1. PRODUCE QUALITY (Quality) */}
        <div className="bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 p-4 rounded-2xl transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                <span>{c.quality.title}</span>
              </label>
            </div>
            <p className="text-[11px] text-white/60 mb-3">
              {c.quality.desc}
            </p>

            {/* Quick 1-Tap Presets */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setSpoilageMultiplier(0.7)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  spoilageMultiplier <= 0.8
                    ? 'bg-emerald-500 text-pine font-bold border-emerald-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.quality.presetA}
              </button>
              <button
                type="button"
                onClick={() => setSpoilageMultiplier(1.0)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  spoilageMultiplier > 0.8 && spoilageMultiplier < 1.4
                    ? 'bg-emerald-500 text-pine font-bold border-emerald-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.quality.presetB}
              </button>
              <button
                type="button"
                onClick={() => setSpoilageMultiplier(1.6)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  spoilageMultiplier >= 1.4
                    ? 'bg-amber-500 text-pine font-bold border-amber-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.quality.presetC}
              </button>
            </div>

            {/* High-visibility Smooth Slider */}
            <div className="py-1">
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.05"
                value={spoilageMultiplier}
                onChange={(e) => setSpoilageMultiplier(parseFloat(e.target.value))}
                className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/50 font-mono mt-1">
                <span>0.5x (Hardy / No Spoilage)</span>
                <span>2.0x (Extreme Spoilage)</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 text-[11px] font-mono text-emerald-300/90 font-medium">
            {getQualityLabel()}
          </div>
        </div>

        {/* 2. TRANSPORT COST (Cost) */}
        <div className="bg-white/[0.04] border border-white/10 hover:border-amber-400/40 p-4 rounded-2xl transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                <Truck className="w-3.5 h-3.5 text-amber-400" />
                <span>{c.cost.title}</span>
              </label>
            </div>
            <p className="text-[11px] text-white/60 mb-3">
              {c.cost.desc}
            </p>

            {/* Quick 1-Tap Presets */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setFuelRateMultiplier(0.85)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  fuelRateMultiplier <= 0.9
                    ? 'bg-amber-400 text-pine font-bold border-amber-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.cost.presetLow}
              </button>
              <button
                type="button"
                onClick={() => setFuelRateMultiplier(1.0)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  fuelRateMultiplier > 0.9 && fuelRateMultiplier < 1.2
                    ? 'bg-amber-400 text-pine font-bold border-amber-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.cost.presetMid}
              </button>
              <button
                type="button"
                onClick={() => setFuelRateMultiplier(1.35)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  fuelRateMultiplier >= 1.2
                    ? 'bg-amber-400 text-pine font-bold border-amber-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.cost.presetHigh}
              </button>
            </div>

            {/* High-visibility Smooth Slider */}
            <div className="py-1">
              <input
                type="range"
                min="0.7"
                max="1.8"
                step="0.05"
                value={fuelRateMultiplier}
                onChange={(e) => setFuelRateMultiplier(parseFloat(e.target.value))}
                className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/50 font-mono mt-1">
                <span>0.7x (Cheap Fuel)</span>
                <span>1.8x (Peak Fuel)</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 text-[11px] font-mono text-amber-300/90 font-medium">
            {getCostLabel()}
          </div>
        </div>

        {/* 3. ROAD CONDITION & SPEED (Distance) */}
        <div className="bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 p-4 rounded-2xl transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{c.distance.title}</span>
              </label>
            </div>
            <p className="text-[11px] text-white/60 mb-3">
              {c.distance.desc}
            </p>

            {/* Quick 1-Tap Presets */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setSpeedKmph(25)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  speedKmph <= 30
                    ? 'bg-emerald-500 text-pine font-bold border-emerald-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.distance.presetRough}
              </button>
              <button
                type="button"
                onClick={() => setSpeedKmph(40)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  speedKmph > 30 && speedKmph < 50
                    ? 'bg-emerald-500 text-pine font-bold border-emerald-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.distance.presetNormal}
              </button>
              <button
                type="button"
                onClick={() => setSpeedKmph(55)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  speedKmph >= 50
                    ? 'bg-emerald-500 text-pine font-bold border-emerald-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.distance.presetExpress}
              </button>
            </div>

            {/* High-visibility Smooth Slider */}
            <div className="py-1">
              <input
                type="range"
                min="20"
                max="65"
                step="5"
                value={speedKmph}
                onChange={(e) => setSpeedKmph(parseFloat(e.target.value))}
                className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/50 font-mono mt-1">
                <span>20 km/h (Slow Rural)</span>
                <span>65 km/h (Highway)</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 text-[11px] font-mono text-emerald-300/90 font-medium">
            {getSpeedLabel()} ({speedKmph} km/h)
          </div>
        </div>

        {/* 4. MANDI DEDUCTIONS (Mandi Cuts) */}
        <div className="bg-white/[0.04] border border-white/10 hover:border-emerald-400/40 p-4 rounded-2xl transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-white flex items-center gap-1.5 font-sans">
                <Coins className="w-3.5 h-3.5 text-emerald-400" />
                <span>{c.fee.title}</span>
              </label>
            </div>
            <p className="text-[11px] text-white/60 mb-3">
              {c.fee.desc}
            </p>

            {/* Quick 1-Tap Presets */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setCessRateOverride(0.010)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  cessRateOverride <= 0.012
                    ? 'bg-emerald-500 text-pine font-bold border-emerald-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.fee.presetLow}
              </button>
              <button
                type="button"
                onClick={() => setCessRateOverride(0.015)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  cessRateOverride > 0.012 && cessRateOverride < 0.02
                    ? 'bg-emerald-500 text-pine font-bold border-emerald-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.fee.presetMid}
              </button>
              <button
                type="button"
                onClick={() => setCessRateOverride(0.025)}
                className={`text-[11px] font-semibold py-1.5 px-2 rounded-lg border transition-all cursor-pointer text-center ${
                  cessRateOverride >= 0.02
                    ? 'bg-emerald-500 text-pine font-bold border-emerald-300 shadow-sm'
                    : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
                }`}
              >
                {c.fee.presetHigh}
              </button>
            </div>

            {/* High-visibility Smooth Slider */}
            <div className="py-1">
              <input
                type="range"
                min="0.005"
                max="0.035"
                step="0.002"
                value={cessRateOverride}
                onChange={(e) => setCessRateOverride(parseFloat(e.target.value))}
                className="w-full h-2.5 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/50 font-mono mt-1">
                <span>0.5% (Low Cut)</span>
                <span>3.5% (High Cut)</span>
              </div>
            </div>
          </div>

          <div className="mt-2.5 text-[11px] font-mono text-emerald-300/90 font-medium">
            {getFeeLabel()} ({(cessRateOverride * 100).toFixed(1)}%)
          </div>
        </div>

      </div>

    </div>
  );
}