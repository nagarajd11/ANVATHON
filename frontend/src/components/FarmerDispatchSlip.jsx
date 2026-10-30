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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8">
        
        {/* Modal Controls (Hidden in print) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6 print:hidden">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-agri-700" />
            <h3 className="text-base font-bold text-slate-900">
              Farmer Dispatch & Mandi Transit Manifest
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-agri-700 hover:bg-agri-800 text-white text-xs font-bold shadow-md shadow-agri-700/20 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Area */}
        <div id="printable-dispatch-slip" className="text-slate-800 text-xs">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-black">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-900 tracking-tight">HARVESTROUTE</h1>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Official Mandi Dispatch Manifest & Gate Pass
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-sm text-slate-900 block">{dispatchId}</span>
              <span className="text-[10px] text-slate-500">{currentDate}</span>
            </div>
          </div>

          {/* Consignment Metadata */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Origin Farm Location</span>
              <div className="font-bold text-sm text-slate-900">{analysis.originDistrict} District, Karnataka</div>
              <div className="text-[11px] text-slate-500">Route Departure Node</div>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-400 block">Destination APMC Yard</span>
              <div className="font-bold text-sm text-emerald-800">{targetMarket.marketName}</div>
              <div className="text-[11px] text-slate-500">{targetMarket.district} District</div>
            </div>
          </div>

          {/* Crop & Transit Specs */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Crop Spec</span>
              <span className="font-bold text-slate-900 text-sm">{analysis.cropName}</span>
              <span className="text-[10px] text-slate-500 block">{targetMarket.costs.spoilagePct}% Spoilage Tol.</span>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Lot Quantity</span>
              <span className="font-bold text-slate-900 text-sm">{analysis.quantityQuintals} Quintals</span>
              <span className="text-[10px] text-slate-500 block">({analysis.quantityQuintals * 100} kg net)</span>
            </div>
            <div className="p-3 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Transit Estimate</span>
              <span className="font-bold text-slate-900 text-sm">{targetMarket.roadDistanceKm} km</span>
              <span className="text-[10px] text-slate-500 block">~{targetMarket.transitHours} hours transit</span>
            </div>
          </div>

          {/* Vehicle & Carrier info */}
          <div className="p-3 border border-slate-200 rounded-lg mb-4 bg-slate-50/50">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Assigned Logistics Carrier:
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Verified Mandi Transport
              </span>
            </div>
            <div className="font-bold text-slate-900">{targetMarket.vehicleUsed.name}</div>
            <div className="text-[11px] text-slate-500 flex justify-between mt-1">
              <span>Agreed Freight Quote: ₹{targetMarket.costs.transportCost.toLocaleString()}</span>
              <span>Trips: {targetMarket.vehicleUsed.tripsRequired}</span>
            </div>
          </div>

          {/* Financial Settlement Breakdown */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-5">
            <div className="bg-slate-100 px-4 py-2 font-bold text-slate-700 text-xs">
              Itemized Mandi Settlement Breakdown (Projected)
            </div>
            <div className="p-4 space-y-2 text-xs">
              <div className="flex justify-between font-semibold">
                <span>Gross Auction Value ({analysis.quantityQuintals}q × ₹{targetMarket.modalPrice}):</span>
                <span>₹{targetMarket.grossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-600">
                <span>(-) Transport Freight & Surcharges:</span>
                <span>-₹{targetMarket.costs.transportCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-600">
                <span>(-) Transit Spoilage / Weight Loss Reserve:</span>
                <span>-₹{targetMarket.costs.spoilageLoss.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>(-) Mandi Cess, Hamali (Unloading) & Weighbridge:</span>
                <span>-₹{targetMarket.costs.marketFees.toLocaleString()}</span>
              </div>
              <div className="border-t-2 border-slate-800 pt-2 flex justify-between text-sm font-black text-emerald-800">
                <span>Estimated Net In-Hand Take-Home Payout:</span>
                <span>₹{targetMarket.netReturnInr.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-300 text-center text-[10px] text-slate-500">
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1" />
              <span>Farmer Lot Owner</span>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1" />
              <span>Assigned Truck Driver</span>
            </div>
            <div>
              <div className="h-10 border-b border-dashed border-slate-400 mb-1" />
              <span>APMC Yard Gate Clerk</span>
            </div>
          </div>

          {/* Footer notice */}
          <div className="mt-5 text-[9px] text-slate-400 text-center">
            Generated via HarvestRoute Mandi Optimization Platform. Data cross-referenced with Karnataka APMC daily benchmarks.
          </div>

        </div>

      </div>
    </div>
  );
}

