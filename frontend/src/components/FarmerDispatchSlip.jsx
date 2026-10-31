import React from 'react';
import { 
  Printer, 
  X, 
  Sprout, 
  Truck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function FarmerDispatchSlip({
  isOpen,
  onClose,
  analysis,
  marketOverride
}) {
  if (!isOpen || !analysis) return null;

  const targetMarket = marketOverride || analysis.bestNetMarket;
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

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/30 relative my-8 print:bg-white print:p-0 print:border-none print:shadow-none">
        
        {/* Modal Controls (Hidden in print) */}
        <div className="flex items-center justify-between border-b border-chlorophyll/10 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-chlorophyll font-sans">
              Farmer Dispatch & Mandi Transit Manifest
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="btn-shimmer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-chlorophyll hover:bg-[#0c3829] text-emerald-300 text-xs font-bold shadow-md transition-all border border-emerald-500/30 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/5 hover:bg-black/10 text-chlorophyll/60 cursor-pointer transition-colors"
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
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-chlorophyll/30 flex-shrink-0 shadow-sm">
                  <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover object-center" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-chlorophyll tracking-tight font-sans">HARVESTROUTE</h1>
                  <p className="text-xs text-chlorophyll/60 uppercase tracking-widest font-mono font-bold">
                    Official Mandi Dispatch Manifest & Gate Pass
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
              <span className="text-xs font-bold uppercase text-chlorophyll/50 block font-sans">Origin Farm Location</span>
              <div className="font-bold text-sm text-chlorophyll font-sans">{analysis.originDistrict} District, Karnataka</div>
              <div className="text-xs text-chlorophyll/60 font-sans">Route Departure Node</div>
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-chlorophyll/50 block font-sans">Destination APMC Yard</span>
              <div className="font-bold text-sm text-emerald-900 font-sans">{targetMarket.marketName}</div>
              <div className="text-xs text-chlorophyll/60 font-sans">{targetMarket.district} District</div>
            </div>
          </div>

          {/* Crop & Transit Specs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 border border-chlorophyll/15 rounded-xl bg-white">
              <span className="text-xs text-chlorophyll/50 uppercase font-bold block font-sans">Crop Spec</span>
              <span className="font-bold text-chlorophyll text-sm font-sans">{analysis.cropName}</span>
              <span className="text-xs text-chlorophyll/60 block tabular-nums">{targetMarket.costs.spoilagePct}% Spoilage Tol.</span>
            </div>
            <div className="p-3 border border-chlorophyll/15 rounded-xl bg-white">
              <span className="text-xs text-chlorophyll/50 uppercase font-bold block font-sans">Lot Quantity</span>
              <span className="font-bold text-chlorophyll text-sm font-sans tabular-nums">{analysis.quantityQuintals} Quintals</span>
              <span className="text-xs text-chlorophyll/60 block tabular-nums">({analysis.quantityQuintals * 100} kg net)</span>
            </div>
            <div className="p-3 border border-chlorophyll/15 rounded-xl bg-white">
              <span className="text-xs text-chlorophyll/50 uppercase font-bold block font-sans">Transit Estimate</span>
              <span className="font-bold text-chlorophyll text-sm tabular-nums">{targetMarket.roadDistanceKm} km</span>
              <span className="text-xs text-chlorophyll/60 block tabular-nums">~{targetMarket.transitHours} hours transit</span>
            </div>
          </div>

          {/* Vehicle & Carrier info */}
          <div className="p-3.5 border border-chlorophyll/15 rounded-xl mb-4 bg-[#fbfbfa]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold uppercase text-chlorophyll/60 flex items-center gap-1 font-sans">
                <Truck className="w-3.5 h-3.5 text-emerald-700" />
                Assigned Logistics Carrier:
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md font-sans">
                Verified Mandi Transport
              </span>
            </div>
            <div className="font-bold text-chlorophyll text-sm font-sans flex items-center justify-between">
              <span>{targetMarket.vehicleUsed.name}</span>
              {analysis.allocatedTransport?.driver && (
                <span className="font-mono text-xs text-chlorophyll/80">{analysis.allocatedTransport.driver.plateNumber}</span>
              )}
            </div>
            {analysis.allocatedTransport?.driver && (
              <div className="mt-1 text-xs text-chlorophyll font-sans flex items-center justify-between border-t border-chlorophyll/10 pt-1">
                <span>Assigned Driver: <strong className="font-bold">{analysis.allocatedTransport.driver.name}</strong></span>
                <span className="font-mono font-bold text-emerald-800">Phone: {analysis.allocatedTransport.driver.phone}</span>
              </div>
            )}
            <div className="text-xs text-chlorophyll/60 flex justify-between mt-1 tabular-nums">
              <span>Agreed Freight Quote: ₹{targetMarket.costs.transportCost.toLocaleString()}</span>
              <span>Trips Required: {targetMarket.vehicleUsed.tripsRequired}</span>
            </div>
          </div>

          {/* Financial Settlement Breakdown */}
          <div className="border border-chlorophyll/15 rounded-2xl overflow-hidden mb-5">
            <div className="bg-black/5 px-4 py-2 font-bold text-chlorophyll text-xs uppercase tracking-wider font-sans">
              Itemized Mandi Settlement Breakdown (Projected)
            </div>
            <div className="p-4 space-y-2 text-xs tabular-nums bg-white">
              <div className="receipt-line">
                <span>Gross Auction Value ({analysis.quantityQuintals}q × ₹{targetMarket.modalPrice}):</span>
                <span>₹ {targetMarket.grossRevenue.toLocaleString()}.00</span>
              </div>
              <div className="receipt-line text-terracotta-700">
                <span>(-) Transport Freight & Highway Surcharges:</span>
                <span>-₹ {targetMarket.costs.transportCost.toLocaleString()}.00</span>
              </div>
              <div className="receipt-line text-terracotta-700">
                <span>(-) Transit Spoilage / Weight Loss Reserve:</span>
                <span>-₹ {targetMarket.costs.spoilageLoss.toLocaleString()}.00</span>
              </div>
              <div className="receipt-line text-chlorophyll/70">
                <span>(-) Mandi Cess, Hamali (Unloading) & Weighbridge:</span>
                <span>-₹ {targetMarket.costs.marketFees.toLocaleString()}.00</span>
              </div>
              <div className="border-t-2 border-dashed border-chlorophyll/30 pt-2.5 mt-2 flex justify-between items-baseline font-bold text-sm text-emerald-900 font-sans">
                <span className="uppercase">Estimated Net In-Hand Take-Home Payout:</span>
                <span className="font-mono text-emerald-700 font-extrabold text-base tabular-nums">
                  ₹ {targetMarket.netReturnInr.toLocaleString()}.00
                </span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-chlorophyll/20 text-center text-xs text-chlorophyll/50 font-sans">
            <div>
              <div className="h-10 border-b border-dashed border-chlorophyll/30 mb-1.5" />
              <span>Farmer Lot Owner</span>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-chlorophyll/30 mb-1.5" />
              <span>Assigned Truck Driver</span>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-chlorophyll/30 mb-1.5" />
              <span>APMC Yard Gate Clerk</span>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-5 text-xs text-chlorophyll/40 text-center font-sans">
            Generated via HarvestRoute Mandi Optimization Platform. Data cross-referenced with Karnataka APMC daily benchmarks.
          </div>

        </div>

      </div>
    </div>
  );
}
