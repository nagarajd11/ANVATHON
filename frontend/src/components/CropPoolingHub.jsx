import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Truck, 
  PlusCircle, 
  Share2, 
  Printer, 
  CheckCircle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  BadgePercent, 
  IndianRupee, 
  Filter, 
  X,
  Phone,
  AlertTriangle,
  FileText
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
  const [openOnly, setOpenOnly] = useState(false);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isSlipModalOpen, setIsSlipModalOpen] = useState(false);
  const [activePool, setActivePool] = useState(null);

  // Create Form State
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

  // Join Form State
  const [joinForm, setJoinForm] = useState({
    farmer_name: '',
    phone: '',
    village: '',
    crop_name: currentCrop || 'Tomato',
    quantity_quintals: 5
  });

  // Calculator State
  const [calcQty, setCalcQty] = useState(6);
  const [calcDist, setCalcDist] = useState(75);
  const [calcResult, setCalcResult] = useState(null);

  // Fetch Pools
  const fetchPools = async () => {
    setIsLoading(true);
    try {
      let url = '/api/pools';
      const params = new URLSearchParams();
      if (selectedDistrict !== 'ALL') params.append('district', selectedDistrict);
      if (openOnly) params.append('status', 'OPEN');
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setPools(data);
      }
    } catch (err) {
      console.error('Failed to load pools:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, [selectedDistrict, openOnly]);

  // Recalculate savings simulator
  useEffect(() => {
    async function getSavings() {
      try {
        const res = await fetch('/api/pools/calculate-savings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantityQuintals: calcQty, distanceKm: calcDist })
        });
        if (res.ok) {
          const data = await res.json();
          setCalcResult(data);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getSavings();
  }, [calcQty, calcDist]);

  // Handle Create Submit
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/pools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm)
      });
      if (res.ok) {
        onShowToast && onShowToast('Crop transport pool created successfully!');
        setIsCreateModalOpen(false);
        fetchPools();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to create pool');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  // Handle Join Submit
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    if (!activePool) return;
    try {
      const res = await fetch(`/api/pools/${activePool.pool_id}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(joinForm)
      });
      if (res.ok) {
        onShowToast && onShowToast(`Joined pool! Your in-person share is reserved.`);
        setIsJoinModalOpen(false);
        fetchPools();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to join pool');
      }
    } catch (err) {
      alert('Error connecting to server.');
    }
  };

  return (
    <section id="crop-pooling-section" className="py-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Value Proposition */}
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden mb-8 border border-emerald-700/50">
          <div className="relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                Community Logistics • In-Person Expense Split
              </span>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-300/30">
                Save up to 75% on Freight
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

            {/* How In-Person Pooling Works 3-Step Banner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-emerald-800/60">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 font-black flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Post or Find a Truck</h4>
                  <p className="text-xs text-emerald-100/80 mt-1">
                    Connect with farmers nearby harvesting on the same day heading to the same APMC.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-300 font-black flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Fill Empty Space</h4>
                  <p className="text-xs text-teal-100/80 mt-1">
                    Turn a half-empty Bolero or Canter into 100% capacity. Lower freight rate for everyone.
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 font-black flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">Settle In-Person Cash</h4>
                  <p className="text-xs text-amber-100/80 mt-1">
                    Transparent weight-based receipt. Pay the driver directly upon loading or mandi arrival.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Solo vs Pooled Savings Calculator */}
        <div className="bg-gradient-to-r from-amber-50 via-slate-50 to-emerald-50 rounded-2xl p-5 border border-slate-200 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
                <BadgePercent className="w-4 h-4 text-amber-600" />
                <span>{t.soloVsPoolComparison}</span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900">
                Why small lots lose money solo & how pooling solves it:
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Adjust your lot size and trip distance below to see real cash savings:
              </p>

              {/* Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Your Harvest Lot:</span>
                    <span className="font-bold text-agri-700">{calcQty} Quintals</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="1"
                    value={calcQty}
                    onChange={(e) => setCalcQty(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-agri-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                    <span>Trip Distance to Mandi:</span>
                    <span className="font-bold text-agri-700">{calcDist} km</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="5"
                    value={calcDist}
                    onChange={(e) => setCalcDist(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-agri-600"
                  />
                </div>
              </div>
            </div>

            {/* Savings Cards Display */}
            {calcResult && (
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="bg-white p-3.5 rounded-xl border border-red-200 shadow-xs min-w-[130px]">
                  <div className="text-[10px] uppercase font-bold text-red-600">Going Solo Alone</div>
                  <div className="text-lg font-black text-slate-900 mt-0.5">
                    ₹{calcResult.soloScenario.totalCostInr}
                  </div>
                  <div className="text-[11px] text-red-700 font-semibold">
                    ₹{calcResult.soloScenario.costPerQuintalInr} / quintal
                  </div>
                </div>

                <div className="text-slate-400 font-black">➔</div>

                <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-300 shadow-xs min-w-[130px]">
                  <div className="text-[10px] uppercase font-bold text-emerald-700">In Shared Pool</div>
                  <div className="text-lg font-black text-emerald-900 mt-0.5">
                    ₹{calcResult.pooledScenario.sharedCostInr}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold">
                    ₹{calcResult.pooledScenario.costPerQuintalInr} / quintal
                  </div>
                </div>

                <div className="bg-gradient-to-tr from-amber-500 to-amber-600 text-white p-3.5 rounded-xl shadow-md min-w-[150px]">
                  <div className="text-[10px] uppercase font-black text-amber-100">In-Hand Cash Saved</div>
                  <div className="text-xl font-black mt-0.5">
                    +₹{calcResult.savings.cashSavedInr}
                  </div>
                  <div className="text-[11px] font-bold text-amber-100">
                    {calcResult.savings.percentSaved}% Freight Cut!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
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

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer bg-slate-100 px-3 py-2 rounded-xl border border-slate-200">
              <input
                type="checkbox"
                checked={openOnly}
                onChange={(e) => setOpenOnly(e.target.checked)}
                className="rounded-sm text-agri-600 focus:ring-agri-500"
              />
              <span>{t.openTrucksOnly}</span>
            </label>
          </div>

          <div className="text-xs font-semibold text-slate-500">
            Showing <span className="font-bold text-slate-900">{pools.length}</span> transport pool{pools.length === 1 ? '' : 's'}
          </div>
        </div>

        {/* Pools Grid */}
        {isLoading ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            Loading active crop transport pools...
          </div>
        ) : pools.length === 0 ? (
          <div className="bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-10 text-center">
            <Truck className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800">No active pools found for this district filter</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Be the first farmer to start a transport pool! Share your harvest lot and invite nearby farmers to fill the vehicle.
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
            {pools.map(pool => {
              const capacityPct = Math.min(100, Math.round((pool.current_load_quintals / pool.vehicle_capacity_quintals) * 100));
              const isOpen = pool.status === 'OPEN' && pool.remaining_capacity_quintals > 0;

              return (
                <div 
                  key={pool.pool_id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Route & Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                          <span>{pool.origin_village ? `${pool.origin_village}, ` : ''}{pool.origin_district}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span className="text-emerald-700">{pool.destination_market} APMC</span>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Approx. {pool.trip_distance_km} km • ID: <span className="font-mono text-slate-700">{pool.pool_id}</span>
                        </div>
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        isOpen 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {isOpen ? `${pool.remaining_capacity_quintals} Qtl Open` : 'Truck Full'}
                      </span>
                    </div>

                    {/* Vehicle and Departure Bar */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between text-xs mb-4">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-slate-600" />
                        <div>
                          <div className="font-bold text-slate-800">{pool.vehicle_name}</div>
                          <div className="text-[11px] text-slate-500">Trip Freight: ₹{pool.total_freight_inr}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{pool.dispatch_time}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">{pool.dispatch_date}</div>
                      </div>
                    </div>

                    {/* Capacity Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-600">{t.capacityFilled}:</span>
                        <span className="font-bold text-slate-900">
                          {pool.current_load_quintals} / {pool.vehicle_capacity_quintals} qtl ({capacityPct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div 
                          className={`h-full transition-all rounded-full ${
                            capacityPct >= 90 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${capacityPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Participants List */}
                    <div className="mb-4">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                        Farmers In This Truck ({pool.participants.length}):
                      </div>
                      <div className="space-y-1.5">
                        {pool.participants.map(p => (
                          <div 
                            key={p.participant_id}
                            className="flex items-center justify-between text-xs bg-slate-50/80 px-2.5 py-1.5 rounded-lg border border-slate-100"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span className="font-bold text-slate-800">{p.farmer_name}</span>
                              <span className="text-[11px] text-slate-500">({p.crop_name}, {p.quantity_quintals} qtl)</span>
                            </div>
                            <div className="font-bold text-emerald-800 text-[11px]">
                              ₹{p.split_expense_inr} <span className="text-[10px] font-normal text-slate-500">({p.share_percentage}%)</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notes if any */}
                    {pool.notes && (
                      <p className="text-xs text-slate-600 italic bg-amber-50/50 p-2.5 rounded-lg border border-amber-100 mb-4">
                        "{pool.notes}"
                      </p>
                    )}
                  </div>

                  {/* Actions footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setActivePool(pool);
                        setIsSlipModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
                      title="View In-Person Cash Settlement Receipt"
                    >
                      <FileText className="w-3.5 h-3.5 text-slate-600" />
                      <span>{t.settleSlipBtn}</span>
                    </button>

                    {isOpen ? (
                      <button
                        onClick={() => {
                          setActivePool(pool);
                          setJoinForm(prev => ({
                            ...prev,
                            crop_name: pool.crop_name,
                            quantity_quintals: Math.min(5, pool.remaining_capacity_quintals)
                          }));
                          setIsJoinModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{t.joinPoolBtn}</span>
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-amber-700 px-3 py-1.5 bg-amber-50 rounded-lg">
                        Capacity Full
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* 1. CREATE POOL MODAL */}
      {/* ========================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {t.createPoolBtn}
                </h3>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Farmer / Host Name *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / WhatsApp *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Crop Type *</label>
                  <select
                    value={createForm.crop_name}
                    onChange={(e) => setCreateForm({...createForm, crop_name: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    {crops.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Crop Weight (Quintals) *</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    required
                    value={createForm.quantity_quintals}
                    onChange={(e) => setCreateForm({...createForm, quantity_quintals: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Transport Vehicle Class</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dispatch Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow Morning"
                    value={createForm.dispatch_date}
                    onChange={(e) => setCreateForm({...createForm, dispatch_date: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dispatch Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 05:30 AM"
                    value={createForm.dispatch_time}
                    onChange={(e) => setCreateForm({...createForm, dispatch_time: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes for Neighboring Farmers</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Leaving from village junction. Crates/gunny bags accepted. Direct cash split at APMC gate."
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
                  Publish Pool Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. JOIN POOL MODAL */}
      {/* ========================================================= */}
      {isJoinModalOpen && activePool && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  Join Transport Vehicle
                </span>
                <h3 className="font-extrabold text-base text-slate-900">
                  {activePool.vehicle_name}
                </h3>
              </div>
              <button 
                onClick={() => setIsJoinModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Capacity Info Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 mb-4 text-xs">
              <div className="flex justify-between font-bold text-emerald-950">
                <span>Destination:</span>
                <span>{activePool.destination_market} APMC</span>
              </div>
              <div className="flex justify-between font-bold text-emerald-950 mt-1">
                <span>Available Capacity:</span>
                <span className="text-emerald-700 font-black">{activePool.remaining_capacity_quintals} Quintals Max</span>
              </div>
              <div className="flex justify-between text-slate-600 mt-1">
                <span>Departure:</span>
                <span>{activePool.dispatch_date} ({activePool.dispatch_time})</span>
              </div>
            </div>

            <form onSubmit={handleJoinSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Gowda"
                  value={joinForm.farmer_name}
                  onChange={(e) => setJoinForm({...joinForm, farmer_name: e.target.value})}
                  className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 94481 00000"
                    value={joinForm.phone}
                    onChange={(e) => setJoinForm({...joinForm, phone: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Village</label>
                  <input
                    type="text"
                    placeholder="e.g. Begur Hobli"
                    value={joinForm.village}
                    onChange={(e) => setJoinForm({...joinForm, village: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Crop to Transport *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tomato, Onion"
                    value={joinForm.crop_name}
                    onChange={(e) => setJoinForm({...joinForm, crop_name: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quantity (Quintals) *</label>
                  <input
                    type="number"
                    min="1"
                    max={activePool.remaining_capacity_quintals}
                    required
                    value={joinForm.quantity_quintals}
                    onChange={(e) => setJoinForm({...joinForm, quantity_quintals: e.target.value})}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* In-Person Expense Live Calculation */}
              {joinForm.quantity_quintals > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Your Proportional In-Person Share:</span>
                    <span className="text-emerald-700 font-black text-sm">
                      ₹{Math.round((parseFloat(joinForm.quantity_quintals) / (activePool.current_load_quintals + parseFloat(joinForm.quantity_quintals))) * activePool.total_freight_inr)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Based on fair weight proportion of the total ₹{activePool.total_freight_inr} trip freight. Settle directly with the host/driver in cash.
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsJoinModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md"
                >
                  Confirm & Join Truck
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. IN-PERSON EXPENSE SETTLEMENT SLIP MODAL */}
      {/* ========================================================= */}
      {isSlipModalOpen && activePool && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto print:p-0 print:border-none print:shadow-none">
            
            {/* Action Bar (Non-print) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 print:hidden">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <h3 className="font-extrabold text-base text-slate-900">
                  {t.settleSlipBtn}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button 
                  onClick={() => setIsSlipModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Slip Content */}
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 bg-amber-50/20">
              
              {/* Slip Header */}
              <div className="text-center pb-4 border-b border-slate-200">
                <span className="text-[10px] uppercase font-black tracking-widest text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  HarvestRoute Farmer Collaboration Hub
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-1">
                  In-Person Freight Settlement Slip
                </h4>
                <p className="text-xs text-slate-500">
                  Pool Reference: <span className="font-mono font-bold text-slate-800">{activePool.pool_id}</span>
                </p>
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-2 gap-3 py-3 text-xs border-b border-slate-200">
                <div>
                  <span className="text-slate-500">Origin:</span>
                  <div className="font-bold text-slate-800">{activePool.origin_village ? `${activePool.origin_village}, ` : ''}{activePool.origin_district}</div>
                </div>
                <div>
                  <span className="text-slate-500">Target APMC Mandi:</span>
                  <div className="font-bold text-emerald-800">{activePool.destination_market} APMC</div>
                </div>
                <div>
                  <span className="text-slate-500">Vehicle:</span>
                  <div className="font-bold text-slate-800">{activePool.vehicle_name}</div>
                </div>
                <div>
                  <span className="text-slate-500">Departure:</span>
                  <div className="font-bold text-slate-800">{activePool.dispatch_date} • {activePool.dispatch_time}</div>
                </div>
              </div>

              {/* Breakdown Table */}
              <div className="py-4">
                <div className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                  Itemized Farmer Split (Weight Proportional):
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-100 text-[11px] font-bold text-slate-700 border-b border-slate-200">
                      <tr>
                        <th className="p-2">Farmer</th>
                        <th className="p-2">Crop</th>
                        <th className="p-2 text-right">Qtl</th>
                        <th className="p-2 text-right">Share</th>
                        <th className="p-2 text-right">To Pay (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {activePool.participants.map(p => (
                        <tr key={p.participant_id}>
                          <td className="p-2 font-bold text-slate-900">{p.farmer_name}</td>
                          <td className="p-2 text-slate-600">{p.crop_name}</td>
                          <td className="p-2 text-right font-semibold">{p.quantity_quintals}</td>
                          <td className="p-2 text-right text-slate-500">{p.share_percentage}%</td>
                          <td className="p-2 text-right font-black text-emerald-800">₹{p.split_expense_inr}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-emerald-50 font-black border-t border-emerald-200 text-xs">
                      <tr>
                        <td colSpan="2" className="p-2 text-emerald-950 uppercase">Total Vehicle Freight</td>
                        <td className="p-2 text-right">{activePool.current_load_quintals} qtl</td>
                        <td className="p-2 text-right">100%</td>
                        <td className="p-2 text-right text-emerald-900 text-sm">₹{activePool.total_freight_inr}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>In-Person Cash Settlement Rule:</span>
                </div>
                Each farmer listed above agrees to hand over their designated share in cash directly to the vehicle driver or host farmer upon loading crates in the village or arrival at the APMC gate. No middleman deductions.
              </div>

              {/* Host Contact */}
              <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500">Host Farmer Contact:</span>
                  <div className="font-bold text-slate-800">{activePool.creator_farmer_name} ({activePool.creator_phone})</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Settlement Type:</span>
                  <div className="font-bold text-slate-800">In-Person Direct Cash</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

