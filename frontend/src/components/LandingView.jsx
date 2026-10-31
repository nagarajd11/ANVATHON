import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  EyeOff, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  CheckCircle,
  TrendingUp, 
  Scale, 
  Building2,
  ShieldCheck,
  Compass,
  Clock
} from 'lucide-react';

export default function LandingView({
  lang = 'en',
  onLaunchCalculator = () => {}
}) {
  const content = {
    en: {
      badge: "200 Karnataka APMCs Monitored",
      headline: "Find the market that pays the most in your pocket — after all costs.",
      subheadline: "A higher price two hours away isn't worth it if fuel, road spoilage, and yard fees eat your margin. HarvestRoute calculates your real take-home earnings across Karnataka mandis so you always pick the best destination.",
      cta: "Launch Market Calculator →",
      metrics: [
        { num: "200", label: "Karnataka APMCs" },
        { num: "28+", label: "Commercial Crops" },
        { num: "100%", label: "Free & Transparent" }
      ],
      cardsTitle: "The Problem We Solve",
      cardsSubtitle: "Why traditional mandi price apps mislead farmers and how HarvestRoute guarantees true profit.",
      cards: [
        {
          num: "01",
          tag: "The Price Illusion",
          icon: EyeOff,
          title: "Highest Price ≠ Highest Profit",
          desc: "Mandi price apps only show headline auction rates. A yard advertising ₹3,200/qtl seems lucrative, but driving 120 km further often leaves you with less money than a nearby yard paying ₹2,900/qtl.",
          takeaway: "Don't fall for headline sticker prices."
        },
        {
          num: "02",
          tag: "Hidden Leakages",
          icon: Flame,
          title: "Transport Fuel & Road Decay",
          desc: "Every hour on rough roads causes moisture evaporation, weight loss, and grade degradation. When diesel freight (₹18-35/km) and APMC cess + hamali are deducted, your margin vanishes.",
          takeaway: "Exact road distance & decay accounted for."
        },
        {
          num: "03",
          tag: "The Twist Advantage",
          icon: Trophy,
          title: "Clear Net-Return Decision",
          desc: "HarvestRoute computes true in-hand cash before you load your crates. We compare the highest gross payer against the true net winner side-by-side so you always pocket the maximum rupees.",
          takeaway: "Guaranteed maximum in-pocket cash."
        }
      ]
    },
    kn: {
      badge: "200 ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ಮಂಡಿಗಳು",
      headline: "ಸಾರಿಗೆ, ಹಾಳಾಗುವಿಕೆ ಮತ್ತು ಶುಲ್ಕಗಳ ನಂತರ ನಿಮ್ಮ ಜೇಬಿಗೆ ಅತಿ ಹೆಚ್ಚು ಹಣ ಕೊಡುವ ಮಂಡಿ.",
      subheadline: "ದೂರದ ಮಂಡಿಯಲ್ಲಿ ಹೆಚ್ಚಿನ ದರ ಕಂಡರೂ ಲಾರಿ ಬಾಡಿಗೆ, ದಾರಿಯಲ್ಲಿ ತೂಕ ಕಡಿಮೆಯಾಗುವುದು ಮತ್ತು ಮಂಡಿ ಶುಲ್ಕ ಕಳೆದರೆ ಕೈಗೆ ಸಿಗುವ ಹಣ ಕಡಿಮೆಯಾಗಬಹುದು. ಕರ್ನಾಟಕದ 200 ಎಪಿಎಂಸಿಗಳಲ್ಲಿ ನಿಮ್ಮ ನೈಜ ಲಾಭ ತಿಳಿಯಿರಿ.",
      cta: "ಮಂಡಿ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಪ್ರಾರಂಭಿಸಿ →",
      metrics: [
        { num: "200", label: "ಕರ್ನಾಟಕ ಮಂಡಿಗಳು" },
        { num: "28+", label: "ಕೃಷಿ ತೋಟಗಾರಿಕಾ ಬೆಳೆಗಳು" },
        { num: "100%", label: "ಉಚಿತ & ಪಾರದರ್ಶಕ" }
      ],
      cardsTitle: "ನಾವು ಪರಿಹರಿಸುವ ರೈತರ ಸಮಸ್ಯೆ",
      cardsSubtitle: "ಕೇವಲ ಪ್ರಕಟಿತ ಬೆಲೆ ನೋಡಿ ಮಂಡಿಗೆ ಹೋದರೆ ನಷ್ಟವಾಗುವುದು ಏಕೆ?",
      cards: [
        {
          num: "01",
          tag: "ಪ್ರಕಟಿತ ಬೆಲೆಯ ಭ್ರಮೆ",
          icon: EyeOff,
          title: "ಹೆಚ್ಚಿನ ದರ = ಹೆಚ್ಚಿನ ಲಾಭವಲ್ಲ",
          desc: "ದೂರದ ಮಂಡಿಯಲ್ಲಿ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹3,200 ಪ್ರಕಟಿಸಿರಬಹುದು, ಆದರೆ 120 ಕಿ.ಮೀ ದೂರ ಸಾಗಿಸಲು ಲಾರಿ ಬಾಡಿಗೆ ಕಳೆದು ನೋಡಿದರೆ, ಹತ್ತಿರದ ₹2,900 ಮಂಡಿಯೇ ಹೆಚ್ಚು ಹಣ ನೀಡುತ್ತದೆ.",
          takeaway: "ಕೇವಲ ಬೋರ್ಡ್ ಬೆಲೆ ನಂಬಬೇಡಿ."
        },
        {
          num: "02",
          tag: "ಗುಪ್ತ ನಷ್ಟಗಳು",
          icon: Flame,
          title: "ಡೀಸೆಲ್ ಬಾಡಿಗೆ ಮತ್ತು ಹಾಳಾಗುವಿಕೆ",
          desc: "ರಸ್ತೆಯಲ್ಲಿ ಪ್ರತಿ ಗಂಟೆ ಕಳೆದಂತೆ ತರಕಾರಿ ತೂಕ ಇಳಿಯುತ್ತದೆ ಮತ್ತು ಗುಣಮಟ್ಟ ಕುಸಿಯುತ್ತದೆ. ಲಾರಿ ಬಾಡಿಗೆ, ಹಮಾಲಿ ಮತ್ತು ಸೆಸ್ ಸೇರಿದಾಗ ಲಾಭ ನಷ್ಟವಾಗಿ ಬದಲಾಗುತ್ತದೆ.",
          takeaway: "ನೈಜ ರಸ್ತೆ ಕಿ.ಮೀ & ನಷ್ಟದ ನಿಖರ ಲೆಕ್ಕ."
        },
        {
          num: "03",
          tag: "ಟ್ವಿಸ್ಟ್ ಲಾಭ",
          icon: Trophy,
          title: "ಕೈಗೆ ಸಿಗುವ ನೈಜ ಹಣದ ನಿರ್ಧಾರ",
          desc: "ಲಾರಿಗೆ ಮಾಲು ತುಂಬುವ ಮುನ್ನವೇ ಯಾವ ಮಂಡಿಗೆ ಹೋದರೆ ನಿಮ್ಮ ಜೇಬಿಗೆ ಅತಿ ಹೆಚ್ಚು ಹಣ ಬರುತ್ತದೆ ಎಂದು ಹಾರ್ವೆಸ್ಟ್‌ರೂಟ್ ತೋರಿಸುತ್ತದೆ.",
          takeaway: "ಪ್ರತಿ ಲಾಟಿಗೆ ಗರಿಷ್ಠ ಉಳಿತಾಯ."
        }
      ]
    },
    hi: {
      badge: "200 कर्नाटक मंडियां",
      headline: "भाड़ा, फसल खराबी और मंडी शुल्क काटकर आपकी जेब में सबसे ज्यादा पैसा देने वाली मंडी।",
      subheadline: "दूर की मंडी में ऊंचा भाव देखकर जाना नुकसानदेह हो सकता है यदि गाड़ी भाड़ा और रास्ते का नुकसान आपकी कमाई खा जाए। कर्नाटक की 200 मंडियों में अपनी असली शुद्ध बचत जानें।",
      cta: "मार्केट कैलकुलेटर शुरू करें →",
      metrics: [
        { num: "200", label: "कर्नाटक मंडियां" },
        { num: "28+", label: "व्यावसायिक फसलें" },
        { num: "100%", label: "मुफ्त एवं पारदर्शी" }
      ],
      cardsTitle: "हम किसान की कौन सी समस्या हल करते हैं?",
      cardsSubtitle: "सिर्फ विज्ञापित भाव देखकर मंडी जाने पर नुकसान क्यों होता है?",
      cards: [
        {
          num: "01",
          tag: "विज्ञापित भाव का भ्रम",
          icon: EyeOff,
          title: "सबसे ऊंचा भाव = सबसे ज्यादा मुनाफा नहीं",
          desc: "दूर की मंडी ₹3,200/क्विंटल का भाव दिखा सकती है, लेकिन 120 किमी की दूरी और भाड़े के बाद पास की ₹2,900 वाली मंडी किसान की जेब में ज्यादा पैसा छोड़ती है।",
          takeaway: "बोर्ड पर लिखे भाव के झांसे में न आएं।"
        },
        {
          num: "02",
          tag: "छिपे हुए नुकसान",
          icon: Flame,
          title: "डीजल भाड़ा और रास्ते की फसल खराबी",
          desc: "सड़क पर हर घंटे उपज का वजन घटता है। जब गाड़ी का भाड़ा (₹18-35/किमी), हमाली और एपीएमसी सेस काटा जाता है तो मुनाफा गायब हो जाता है।",
          takeaway: "सड़क की दूरी और खराबी का सटीक हिसाब।"
        },
        {
          num: "03",
          tag: "द ट्विस्ट का फायदा",
          icon: Trophy,
          title: "हाथ में आने वाले शुद्ध मुनाफे का फैसला",
          desc: "गाड़ी लोड करने से पहले ही जानें कि किस मंडी में आपकी जेब में सबसे ज्यादा पैसा बचेगा। सबसे अच्छे और धोखेबाज भाव की सीधी तुलना।",
          takeaway: "हाथ में आने वाला अधिकतम मुनाफा।"
        }
      ]
    }
  };

  const c = content[lang] || content.en;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-2 pb-16">
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold tracking-wide mb-5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
          <span>{c.badge}</span>
        </div>

        {/* Wordmark */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl overflow-hidden ring-1.5 ring-emerald-400/60 shadow-lg shadow-black/50 border border-white/20 bg-emerald-950 flex-shrink-0">
            <img src="/logo.jpg" alt="HarvestRoute" className="w-full h-full object-cover saturate-110" />
          </div>
          <span className="text-2xl sm:text-3xl font-display font-black text-white text-crisp">
            HarvestRoute
          </span>
        </div>

        {/* Main Headline (The original authentic quote) */}
        <h1 className="text-3xl sm:text-5xl lg:text-5xl font-display font-extrabold tracking-tight text-white text-crisp leading-[1.14] mb-4">
          {c.headline}
        </h1>

        {/* Original Subtitle */}
        <p className="text-sm sm:text-base text-white/85 font-sans leading-relaxed max-w-2xl mx-auto mb-8 text-pretty">
          {c.subheadline}
        </p>

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            onClick={onLaunchCalculator}
            className="w-full sm:w-auto btn-shimmer btn-primary !py-3.5 !px-8 text-base font-display font-bold flex items-center justify-center gap-2.5 shadow-[0_10px_35px_-5px_rgba(16,185,129,0.55)] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <span>{c.cta}</span>
            <ArrowRight className="w-5 h-5 text-pine" />
          </button>
        </div>

        {/* Live Metrics Strip */}
        <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2.5 px-4 glass-floating rounded-2xl border border-white/15">
          {c.metrics.map((m, idx) => (
            <div key={idx} className="text-center">
              <div className="text-lg sm:text-xl font-mono font-extrabold text-emerald-300 tabular-nums">
                {m.num}
              </div>
              <div className="text-[11px] font-bold text-white/80 font-sans mt-0.5">
                {m.label}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 3 VisionOS Problem Cards */}
      <section className="mb-4">
        
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white text-crisp">
            {c.cardsTitle}
          </h2>
          <p className="text-xs text-white/70 mt-1 font-sans">
            {c.cardsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {c.cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="glass-white-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover-lift transition-all duration-200 border border-white/90 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                      {card.tag}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">
                      #{card.num}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="p-2 rounded-xl bg-emerald-800 text-white shadow-sm shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 leading-snug">
                      {card.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-700 font-sans leading-relaxed mt-2">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{card.takeaway}</span>
                </div>
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}