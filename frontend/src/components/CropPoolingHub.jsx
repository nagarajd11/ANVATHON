import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Truck, 
  PlusCircle, 
  Share2, 
  Printer, 
  Phone, 
  MessageSquare,
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  BadgePercent, 
  Filter, 
  X,
  Calculator,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TRANSLATIONS } from '../translations';

export default function CropPoolingHub({
  lang = 'en',
  origins = [],
  crops = [],
  vehicleCatalog = {},
  currentDistrict = 'Chamarajanagar',
  currentCrop = 'Tomato',
  currentQuantity = 8,
  onShowToast
}) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Pools state
  const [pools, setPools] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCalcModalOpen, setIsCalcModalOpen] = useState(false);
  const [selectedTruckForCalc, setSelectedTruckForCalc] = useState(null);

  // Quick In-Person Split Calculator State
  const [myLotQtl, setMyLotQtl] = useState(currentQuantity || 6);

  // Create Request Form State
  const [createForm, setCreateForm] = useState({
    creator_farmer_name: '',
    creator_phone: '',
    origin_district: currentDistrict || 'Chamarajanagar',
    origin_village: '',
    destination_market: 'Mysore',
    crop_name: currentCrop || 'Tomato',
    quantity_quintals: currentQuantity || 8,
    vehicle_type: 'BOLERO_PICKUP',
    dispatch_date: 'Tomorrow Morning',
    dispatch_time: '05:30 AM',
    notes: ''
  });

  // Fetch only empty trucks
  const fetchPools = async () => {
    setIsLoading(true);
    try {
      let url = '/api/pools';
      const params = new URLSearchParams();
      if (selectedDistrict !== 'ALL') params.append('district', selectedDistrict);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        // Strict safety filter: ONLY trucks with empty space available
        const emptyOnly = data.filter(p => p.remaining_capacity_quintals > 0);
        setPools(emptyOnly);
      }
    } catch (err) {
      console.error('Failed to load empty trucks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, [selectedDistrict]);

  // Clean phone number for tel: and wa.me links
  const cleanPhone = (phone) => {
    return (phone || '').replace(/[^0-9]/g, '');
  };

  // Handle Post Request Submit
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/pools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm)
      });
      if (res.ok) {
        onShowToast && onShowToast('Empty truck request posted! Farmers can now call you directly.');
        setIsCreateModalOpen(false);
        fetchPools();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to post request');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  return (
    <section id="crop-pooling-section" className="py-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8 border border-emerald-700/50">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" />
                {t.emptyBadgeNotice}
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-300/30">
                Direct Phone Call Coordination • Settle Cash In-Person
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  {t.poolHubTitle}
                </h3>
                <p className="text-emerald-100 text-sm sm:text-base mt-2 leading-relaxed">
                  {t.poolHubSubtitle}
                </p>
              </div>

              <button
                onClick={() => {
                  setCreateForm(prev => ({
                    ...prev,
                    origin_district: currentDistrict,
                    crop_name: currentCrop,
                    quantity_quintals: currentQuantity
                  }));
                  setIsCreateModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-sm shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
              >
                <PlusCircle className="w-5 h-5" />
                <span>{t.createPoolBtn}</span>
              </button>
            </div>

            {/* Direct Phone Call Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-emerald-800/60">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Spot Empty Capacity</h4>
                  <p className="text-xs text-emerald-100/80 mt-1">
                    Browse trucks departing from your district with open quintals of space.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 font-black flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Call Farmer on Phone</h4>
                  <p className="text-xs text-teal-100/80 mt-1">
                    Hit the green Call button to speak directly with the farmer or truck host.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-black flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Split In-Person Cash</h4>
                  <p className="text-xs text-amber-100/80 mt-1">
                    Load your produce together and pay your fair weight share in cash to the driver.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
              <Filter className="w-4 h-4 text-slate-500" />
              <label className="text-xs font-semibold text-slate-700">{t.filterDistrict}:</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-900 focus:outline-hidden cursor-pointer"
              >
                <option value="ALL">{t.filterAll}</option>
                {origins.map(o => (
                  <option key={o.district} value={o.district}>
                    {o.district} {o.kannada_name ? `(${o.kannada_name})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Showing {pools.length} empty truck{pools.length === 1 ? '' : 's'}</span>
            </div>
          </div>
        </div>

        {/* Empty Trucks Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            Checking empty truck availability...
          </div>
        ) : pools.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-10 text-center">
            <Truck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No empty trucks currently listed in this district</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Have extra space in your truck? Generate a request with your phone number so neighboring farmers can call you to share freight!
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-xs cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.createPoolBtn}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {pools.map(truck => {
              const telUri = `tel:${cleanPhone(truck.creator_phone)}`;
              const waText = encodeURIComponent(
                `Hello ${truck.creator_farmer_name}, I saw your empty truck on HarvestRoute going from ${truck.origin_district} to ${truck.destination_market} APMC. I have crops to load and want to share freight.`
              );
              const waUri = `https://wa.me/${cleanPhone(truck.creator_phone)}?text=${waText}`;

              return (
                <div 
                  key={truck.pool_id}
                  className="bg-white rounded-3xl border-2 border-emerald-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Top Empty Space Highlight Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      <span>{truck.remaining_capacity_quintals} Quintals Empty Space</span>
                    </span>

                    <span className="text-[11px] font-bold text-slate-500">
                      ID: {truck.pool_id}
                    </span>
                  </div>

                  <div>
                    {/* Route Details */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-4">
                      <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                        <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                        <span>{truck.origin_village ? `${truck.origin_village}, ` : ''}{truck.origin_district}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                        <span className="text-emerald-700 font-black">{truck.destination_market} APMC Mandi</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-200/70 text-xs">
                        <div>
                          <span className="text-slate-500">Vehicle:</span>
                          <div className="font-bold text-slate-800">{truck.vehicle_name}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Trip Freight:</span>
                          <div className="font-bold text-emerald-800">₹{truck.total_freight_inr}</div>
                        </div>
                        <div>
                          <span className="text-slate-500">Departure:</span>
                          <div className="font-bold text-slate-800 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{truck.dispatch_time}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-slate-500">Date:</span>
                          <div className="font-bold text-slate-800">{truck.dispatch_date}</div>
                        </div>
                      </div>
                    </div>

                    {/* Farmer Host Profile & Contact */}
                    <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">
                            Truck Host Farmer
                          </span>
                          <div className="text-base font-black text-slate-900 mt-0.5">
                            {truck.creator_farmer_name}
                          </div>
                          <div className="text-xs text-slate-600">
                            Location: {truck.origin_village || truck.origin_district}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-[10px] font-bold text-slate-500">Phone Number</span>
                          <div className="text-sm font-black text-emerald-900 font-mono">
                            {truck.creator_phone}
                          </div>
                        </div>
                      </div>

                      {truck.notes && (
                        <p className="text-xs text-slate-700 italic mt-2.5 pt-2 border-t border-emerald-200/60">
                          "{truck.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Direct Phone Call & In-Person Expense Split Action Footer */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2">
                    
                    {/* Primary Phone Call Button */}
                    <a
                      href={telUri}
                      className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all active:scale-[0.98]"
                    >
                      <Phone className="w-4 h-4 fill-white" />
                      <span>Call {truck.creator_phone}</span>
                    </a>

                    {/* WhatsApp Button */}
                    <a
                      href={waUri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs shadow-xs transition-colors"
                      title="Send WhatsApp Message"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Quick Split Calculator button */}
                    <button
                      onClick={() => {
                        setSelectedTruckForCalc(truck);
                        setMyLotQtl(currentQuantity || 5);
                        setIsCalcModalOpen(true);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                      title="Calculate In-Person Cash Split"
                    >
                      <Calculator className="w-3.5 h-3.5 text-slate-600" />
                      <span>Split Check</span>
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 1. GENERATE EMPTY TRUCK REQUEST MODAL */}
      {/* ========================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    {t.createPoolBtn}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Farmers will call your phone directly to share this truck.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Gowda"
                    value={createForm.creator_farmer_name}
                    onChange={(e) => setCreateForm({...createForm, creator_farmer_name: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (For Callers) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98451 23410"
                    value={createForm.creator_phone}
                    onChange={(e) => setCreateForm({...createForm, creator_phone: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Origin District *</label>
                  <select
                    value={createForm.origin_district}
                    onChange={(e) => setCreateForm({...createForm, origin_district: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    {origins.map(o => (
                      <option key={o.district} value={o.district}>
                        {o.district}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Village / Hobli</label>
                  <input
                    type="text"
                    placeholder="e.g. Gundlupet Circle"
                    value={createForm.origin_village}
                    onChange={(e) => setCreateForm({...createForm, origin_village: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target APMC Mandi *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mysore, Bangalore Yard"
                    value={createForm.destination_market}
                    onChange={(e) => setCreateForm({...createForm, destination_market: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vehicle Type</label>
                  <select
                    value={createForm.vehicle_type}
                    onChange={(e) => setCreateForm({...createForm, vehicle_type: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="CHOTA_HATHI">Tata Ace (15 qtl capacity)</option>
                    <option value="BOLERO_PICKUP">Mahindra Bolero Maxi (25 qtl capacity)</option>
                    <option value="CANTER_TRUCK">Eicher 14ft Canter (50 qtl capacity)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Crop Weight (qtl) *</label>
                  <input
                    type="number"
                    min="1"
                    max="45"
                    required
                    value={createForm.quantity_quintals}
                    onChange={(e) => setCreateForm({...createForm, quantity_quintals: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Departure Date & Time</label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow 05:30 AM"
                    value={createForm.dispatch_time}
                    onChange={(e) => setCreateForm({...createForm, dispatch_time: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes for Farmers Calling You</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Leaving from village junction. Crates/bags accepted. Settle cash in person at loading."
                  value={createForm.notes}
                  onChange={(e) => setCreateForm({...createForm, notes: e.target.value})}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  Publish Empty Truck Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. IN-PERSON EXPENSE SPLIT CHECK CALCULATOR MODAL */}
      {/* ========================================================= */}
      {isCalcModalOpen && selectedTruckForCalc && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-base text-slate-900">
                  In-Person Split Calculator
                </h3>
              </div>
              <button 
                onClick={() => setIsCalcModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-4">
              Check your fair share before calling <strong className="text-slate-900">{selectedTruckForCalc.creator_farmer_name}</strong>:
            </p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  How many quintals will you load?
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedTruckForCalc.remaining_capacity_quintals}
                  value={myLotQtl}
                  onChange={(e) => setMyLotQtl(Math.max(1, parseFloat(e.target.value) || 1))}
                  className="w-full text-sm font-bold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Available in this truck: up to {selectedTruckForCalc.remaining_capacity_quintals} quintals
                </span>
              </div>

              {/* Calculated Split Card */}
              {(() => {
                const hostQtl = selectedTruckForCalc.quantity_quintals || 8;
                const totalQtl = hostQtl + myLotQtl;
                const totalFreight = selectedTruckForCalc.total_freight_inr;
                const myShare = Math.round((myLotQtl / totalQtl) * totalFreight);
                const hostShare = totalFreight - myShare;
                
                // Compare with hiring solo 3-wheeler/Tata Ace
                const soloCost = Math.round(selectedTruckForCalc.trip_distance_km * 24 + 650);
                const cashSaved = Math.max(0, soloCost - myShare);

                return (
                  <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 space-y-2.5">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>Total Vehicle Freight:</span>
                      <span>₹{totalFreight}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-900 text-sm pt-2 border-t border-emerald-200">
                      <span>Your In-Person Share to Pay Driver:</span>
                      <span className="text-base font-black text-emerald-700">₹{myShare}</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-[11px]">
                      <span>Host ({selectedTruckForCalc.creator_farmer_name}) Share:</span>
                      <span>₹{hostShare}</span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-emerald-200 text-[11px] font-bold text-emerald-800 flex items-center justify-between">
                      <span>Solo Vehicle Alternative:</span>
                      <span className="line-through text-slate-400">₹{soloCost}</span>
                    </div>
                    <div className="text-[11px] font-extrabold text-amber-800 bg-amber-100/60 p-2 rounded-lg text-center">
                      🎉 You save ₹{cashSaved} by sharing this truck!
                    </div>
                  </div>
                );
              })()}

              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`tel:${cleanPhone(selectedTruckForCalc.creator_phone)}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Call {selectedTruckForCalc.creator_farmer_name}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
