import React, { useEffect } from 'react';
import { 
  Printer, 
  X, 
  ArrowLeft,
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck,
  FileText
} from 'lucide-react';
import { toLocalizedMandiName, toLocalizedDistrict } from '../utils/kannadaLocalization';

export default function FarmerDispatchSlip({
  isOpen,
  onClose,
  analysis,
  marketOverride,
  lang = 'en'
}) {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !analysis) return null;

  const targetMarket = marketOverride || analysis.bestNetMarket || (analysis.rankedMarkets && analysis.rankedMarkets[0]) || {};
  const dispatchId = `HR-DISP-${Date.now().toString().slice(-6)}`;
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  const displayName = toLocalizedMandiName(targetMarket.marketName || 'APMC Yard', lang);
  const displayDistrict = toLocalizedDistrict(targetMarket.district || '', lang);
  const displayOrigin = toLocalizedDistrict(analysis.originDistrict || '', lang);

  const tLabels = {
    en: {
      modalTitle: "Farmer Dispatch & Mandi Transit Manifest",
      backBtn: "← Back / Close",
      printBtn: "Print Slip",
      returnBtn: "← Return to Mandi Results",
      printPassBtn: "Print Gate Pass Now",
      subTitle: "Official Mandi Dispatch Manifest & Gate Pass",
      originLabel: "Origin Farm Location",
      originSub: "Route Departure Node",
      destLabel: "Destination APMC Yard",
      cropSpec: "Crop Spec",
      lotQty: "Lot Quantity",
      transitEst: "Transit Estimate",
      hrsTransit: "hours transit",
      carrierLabel: "Assigned Logistics Carrier",
      verifiedBadge: "Verified Mandi Transport",
      assignedDriver: "Assigned Driver",
      driverPhone: "Phone",
      quoteLabel: "Agreed Freight Quote",
      tripsLabel: "Trips Required",
      breakdownTitle: "Itemized Mandi Settlement Breakdown (Projected)",
      grossAuction: "Gross Auction Value",
      freightCost: "(-) Transport Freight & Highway Surcharges",
      decayLoss: "(-) Transit Spoilage / Weight Loss Reserve",
      apmcFees: "(-) Mandi Cess, Hamali (Unloading) & Weighbridge",
      netPayout: "Estimated Net In-Hand Take-Home Payout",
      ownerSign: "Farmer Lot Owner",
      driverSign: "Assigned Truck Driver",
      clerkSign: "APMC Yard Gate Clerk",
      footerNotice: "Generated via HarvestRoute Mandi Optimization Platform. Data cross-referenced with Karnataka APMC daily benchmarks."
    },
    kn: {
      modalTitle: "ರೈತ ರವಾನೆ ಪಟ್ಟಿ ಮತ್ತು ಮಂಡಿ ಗೇಟ್ ಪಾಸ್",
      backBtn: "← ಹಿಂದಕ್ಕೆ / ಮುಚ್ಚಿ",
      printBtn: "ರಶೀದಿ ಮುದ್ರಿಸಿ",
      returnBtn: "← ಮಂಡಿ ಶ್ರೇಯಾಂಕ ಪಟ್ಟಿಗೆ ಹಿಂತಿರುಗಿ",
      printPassBtn: "ಗೇಟ್ ಪಾಸ್ ಮುದ್ರಿಸಿ (Print Pass)",
      subTitle: "ಅಧಿಕೃತ ಮಂಡಿ ರವಾನೆ ಪಟ್ಟಿ ಮತ್ತು ಗೇಟ್ ಪಾಸ್",
      originLabel: "ಬೆಳೆ ಹೊರಟ ಸ್ಥಳ",
      originSub: "ನಿರ್ಗಮನ ಕೇಂದ್ರ",
      destLabel: "ತಲುಪುವ ಎಪಿಎಂಸಿ ಮಂಡಿ",
      cropSpec: "ಬೆಳೆಯ ವಿವರ",
      lotQty: "ಬೆಳೆಯ ಪ್ರಮಾಣ",
      transitEst: "ಸಾರಿಗೆ ಅಂದಾಜು",
      hrsTransit: "ಗಂಟೆಗಳ ಪ್ರಯಾಣ",
      carrierLabel: "ಹಂಚಿಕೆಯಾದ ಸಾರಿಗೆ ವಾಹನ ಮತ್ತು ಚಾಲಕ",
      verifiedBadge: "ಪರಿಶೀಲಿತ ಮಂಡಿ ವಾಹನ",
      assignedDriver: "ನಿಯೋಜಿತ ಚಾಲಕರು",
      driverPhone: "ದೂರವಾಣಿ",
      quoteLabel: "ನಿಗದಿಪಡಿಸಿದ ಬಾಡಿಗೆ ದರ",
      tripsLabel: "ಅಗತ್ಯವಿರುವ ಟ್ರಿಪ್‌ಗಳು",
      breakdownTitle: "ವಿವರವಾದ ಮಂಡಿ ಪಾವತಿ ಲೆಕ್ಕಾಚಾರ (ಅಂದಾಜು)",
      grossAuction: "ಒಟ್ಟು ಹರಾಜು ಮೊತ್ತ",
      freightCost: "(-) ವಾಹನ ಸಾರಿಗೆ ಬಾಡಿಗೆ ಮತ್ತು ಇಂಧನ",
      decayLoss: "(-) ರಸ್ತೆ ಹಾಳಾಗುವಿಕೆ / ತೂಕ ನಷ್ಟ",
      apmcFees: "(-) ಮಂಡಿ ಸೆಸ್, ಹಮಾಲಿ ಮತ್ತು ತೂಕ ಶುಲ್ಕ",
      netPayout: "ಕೈಗೆ ಸಿಗುವ ಅಂದಾಜು ನಿವ್ವಳ ಲಾಭ",
      ownerSign: "ಬೆಳೆಗಾರ ರೈತರು",
      driverSign: "ವಾಹನ ಚಾಲಕರು",
      clerkSign: "ಎಪಿಎಂಸಿ ಗೇಟ್ ಗುಮಾಸ್ತರು",
      footerNotice: "ಹಾರ್ವೆಸ್ಟ್‌ರೂಟ್ ಕೃಷಿ ವೇದಿಕೆಯಿಂದ ತಯಾರಿಸಲಾಗಿದೆ. ಕರ್ನಾಟಕ ಎಪಿಎಂಸಿ ನಿಖರ ದತ್ತಾಂಶವನ್ನು ಆಧರಿಸಿದೆ."
    },
    hi: {
      modalTitle: "किसान प्रेषण पत्र एवं मंडी गेट पास",
      backBtn: "← वापस / बंद करें",
      printBtn: "पर्ची प्रिंट करें",
      returnBtn: "← वापस मंडी रैंकिंग देखें",
      printPassBtn: "गेट पास प्रिंट करें",
      subTitle: "आधिकारिक मंडी प्रेषण पत्र एवं गेट पास",
      originLabel: "फसल प्रस्थान केंद्र",
      originSub: "मार्ग रवानगी केंद्र",
      destLabel: "गंतव्य एपीएमसी मंडी",
      cropSpec: "फसल का प्रकार",
      lotQty: "उपज की मात्रा",
      transitEst: "सड़क दूरी व समय",
      hrsTransit: "घंटे का सफर",
      carrierLabel: "आवंटित परिवहन वाहन एवं ड्राइवर",
      verifiedBadge: "सत्यापित मंडी ट्रांसपोर्ट",
      assignedDriver: "आवंटित ड्राइवर",
      driverPhone: "फोन",
      quoteLabel: "तय भाड़ा दर",
      tripsLabel: "आवश्यक फेरे",
      breakdownTitle: "मंडी भुगतान का मदवार विवरण (अनुमानित)",
      grossAuction: "कुल नीलामी मूल्य",
      freightCost: "(-) गाड़ी भाड़ा एवं डीजल खर्च",
      decayLoss: "(-) रास्ते में उपज खराबी / वजन कमी",
      apmcFees: "(-) मंडी उपकर, हमाली एवं तुलाई",
      netPayout: "हाथ में आने वाला अनुमानित शुद्ध मुनाफा",
      ownerSign: "फसल मालिक किसान",
      driverSign: "ट्रक ड्राइवर",
      clerkSign: "मंडी गेट क्लर्क",
      footerNotice: "हार्वेस्ट रूट कृषि प्लेटफॉर्म द्वारा जनरेट किया गया। कर्नाटक एपीएमसी डेटा से सत्यापित।"
    }
  };

  const l = tLabels[lang] || tLabels.en;

  const transportCost = targetMarket.costs?.transportCost || 0;
  const spoilageLoss = targetMarket.costs?.spoilageLoss || 0;
  const spoilagePct = targetMarket.costs?.spoilagePct || 0;
  const marketFees = targetMarket.costs?.marketFees || 0;
  const netReturn = targetMarket.netReturnInr || 0;
  const modalPrice = targetMarket.modalPrice || 0;
  const grossRevenue = targetMarket.grossRevenue || (analysis.quantityQuintals * modalPrice);
  const vehicleName = targetMarket.vehicleUsed?.name || analysis.allocatedTransport?.vehicle?.name || 'Commercial Pickup';
  const tripsCount = targetMarket.vehicleUsed?.tripsRequired || 1;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl border border-white/40 relative my-6 print:bg-white print:p-0 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar (Hidden in print) */}
        <div className="flex items-center justify-between border-b border-chlorophyll/15 pb-4 mb-5 print:hidden gap-2">
          
          {/* Prominent Back / Return Button */}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300 cursor-pointer shadow-xs active:scale-95"
            title="Return to Mandi Rankings"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-800" />
            <span>{l.backBtn}</span>
          </button>

          {/* Modal Title */}
          <div className="hidden sm:flex items-center gap-1.5 text-chlorophyll font-sans font-bold text-xs">
            <FileText className="w-4 h-4 text-emerald-700" />
            <span>{l.modalTitle}</span>
          </div>

          {/* Action Print Button + Close X */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="btn-shimmer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all border border-emerald-600 cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-200" />
              <span>{l.printBtn}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-600 cursor-pointer transition-colors border border-slate-200"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div id="printable-dispatch-slip" className="text-chlorophyll text-xs font-mono">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-chlorophyll pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-chlorophyll/30 flex-shrink-0 shadow-sm">
                  <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover object-center" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-chlorophyll tracking-tight font-sans">HARVESTROUTE</h1>
                  <p className="text-[11px] text-chlorophyll/70 uppercase tracking-widest font-mono font-bold">
                    {l.subTitle}
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-sm text-chlorophyll block">{dispatchId}</span>
              <span className="text-xs text-chlorophyll/50">{currentDate}</span>
            </div>
          </div>

          {/* Consignment Metadata */}
          <div className="grid grid-cols-2 gap-4 bg-[#fbfbfa] p-4 rounded-2xl border border-chlorophyll/15 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase text-chlorophyll/50 block font-sans">{l.originLabel}</span>
              <div className="font-bold text-sm text-chlorophyll font-sans">
                {displayOrigin} {lang === 'kn' ? 'ಜಿಲ್ಲೆ' : 'District'}, Karnataka
              </div>
              <div className="text-xs text-chlorophyll/60 font-sans">{l.originSub}</div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase text-chlorophyll/50 block font-sans">{l.destLabel}</span>
              <div className="font-bold text-sm text-emerald-900 font-sans">{displayName}</div>
              <div className="text-xs text-chlorophyll/60 font-sans">
                {displayDistrict} {lang === 'kn' ? 'ಜಿಲ್ಲೆ' : 'District'}
              </div>
            </div>
          </div>

          {/* Crop & Transit Specs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 border border-chlorophyll/15 rounded-xl bg-white shadow-xs">
              <span className="text-[11px] text-chlorophyll/50 uppercase font-bold block font-sans">{l.cropSpec}</span>
              <span className="font-bold text-chlorophyll text-sm font-sans">{analysis.cropName}</span>
              <span className="text-xs text-chlorophyll/60 block tabular-nums">{spoilagePct}% Spoilage Tol.</span>
            </div>
            <div className="p-3 border border-chlorophyll/15 rounded-xl bg-white shadow-xs">
              <span className="text-[11px] text-chlorophyll/50 uppercase font-bold block font-sans">{l.lotQty}</span>
              <span className="font-bold text-chlorophyll text-sm font-sans tabular-nums">{analysis.quantityQuintals} Quintals</span>
              <span className="text-xs text-chlorophyll/60 block tabular-nums">({analysis.quantityQuintals * 100} kg net)</span>
            </div>
            <div className="p-3 border border-chlorophyll/15 rounded-xl bg-white shadow-xs">
              <span className="text-[11px] text-chlorophyll/50 uppercase font-bold block font-sans">{l.transitEst}</span>
              <span className="font-bold text-chlorophyll text-sm tabular-nums">{targetMarket.roadDistanceKm || 0} km</span>
              <span className="text-xs text-chlorophyll/60 block tabular-nums">~{targetMarket.transitHours || 0} {l.hrsTransit}</span>
            </div>
          </div>

          {/* Vehicle & Carrier info */}
          <div className="p-3.5 border border-chlorophyll/15 rounded-xl mb-4 bg-[#fbfbfa]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold uppercase text-chlorophyll/60 flex items-center gap-1 font-sans">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                {l.carrierLabel}:
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-sans">
                {l.verifiedBadge}
              </span>
            </div>
            <div className="font-bold text-chlorophyll text-sm font-sans flex items-center justify-between">
              <span>{vehicleName}</span>
              {analysis.allocatedTransport?.driver && (
                <span className="font-mono text-xs text-chlorophyll/80">{analysis.allocatedTransport.driver.plateNumber}</span>
              )}
            </div>
            {analysis.allocatedTransport?.driver && (
              <div className="mt-1.5 text-xs text-chlorophyll font-sans flex flex-col sm:flex-row sm:items-center justify-between border-t border-chlorophyll/10 pt-1.5 gap-1">
                <span>{l.assignedDriver}: <strong className="font-bold">{analysis.allocatedTransport.driver.name}</strong></span>
                <span className="font-mono font-bold text-emerald-800">{l.driverPhone}: {analysis.allocatedTransport.driver.phone}</span>
              </div>
            )}
            <div className="text-xs text-chlorophyll/60 flex justify-between mt-1.5 tabular-nums border-t border-chlorophyll/10 pt-1">
              <span>{l.quoteLabel}: ₹{transportCost.toLocaleString()}</span>
              <span>{l.tripsLabel}: {tripsCount}</span>
            </div>
          </div>

          {/* Financial Settlement Breakdown */}
          <div className="border border-chlorophyll/15 rounded-2xl overflow-hidden mb-5">
            <div className="bg-black/5 px-4 py-2 font-bold text-chlorophyll text-xs uppercase tracking-wider font-sans">
              {l.breakdownTitle}
            </div>
            <div className="p-4 space-y-2 text-xs tabular-nums bg-white font-sans">
              <div className="receipt-line font-mono">
                <span>{l.grossAuction} ({analysis.quantityQuintals}q × ₹{modalPrice}):</span>
                <span>₹ {grossRevenue.toLocaleString()}.00</span>
              </div>
              <div className="receipt-line text-terracotta-700 font-mono">
                <span>{l.freightCost}:</span>
                <span>-₹ {transportCost.toLocaleString()}.00</span>
              </div>
              <div className="receipt-line text-terracotta-700 font-mono">
                <span>{l.decayLoss}:</span>
                <span>-₹ {spoilageLoss.toLocaleString()}.00</span>
              </div>
              <div className="receipt-line text-chlorophyll/70 font-mono">
                <span>{l.apmcFees}:</span>
                <span>-₹ {marketFees.toLocaleString()}.00</span>
              </div>
              <div className="border-t-2 border-dashed border-chlorophyll/30 pt-2.5 mt-2 flex justify-between items-baseline font-bold text-sm text-emerald-900 font-sans">
                <span className="uppercase">{l.netPayout}:</span>
                <span className="font-mono text-emerald-700 font-extrabold text-base tabular-nums">
                  ₹ {netReturn.toLocaleString()}.00
                </span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-4 mt-4 border-t border-chlorophyll/20 text-center text-xs text-chlorophyll/50 font-sans">
            <div>
              <div className="h-8 border-b border-dashed border-chlorophyll/30 mb-1" />
              <span>{l.ownerSign}</span>
            </div>
            <div>
              <div className="h-8 border-b border-dashed border-chlorophyll/30 mb-1" />
              <span>{l.driverSign}</span>
            </div>
            <div>
              <div className="h-8 border-b border-dashed border-chlorophyll/30 mb-1" />
              <span>{l.clerkSign}</span>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-4 text-[11px] text-chlorophyll/50 text-center font-sans">
            {l.footerNotice}
          </div>

        </div>

        {/* Modal Bottom Actions (Hidden in print) */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300 cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-800" />
            <span>{l.returnBtn}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4 text-emerald-200" />
            <span>{l.printPassBtn}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
