import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Truck, 
  PlusCircle, 
  Phone, 
  MessageSquare, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Filter, 
  X, 
  CheckCircle2 
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
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

  // Modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Create Request Form State
  const [createForm, setCreateForm] = useState({
    creator_farmer_name: '',
    creator_phone: '',
    origin_district: currentDistrict || 'Chamarajanagar',
    origin_village: '',
    destination_market: 'Mysore',
    crop_name: currentCrop || 'Produce',
    quantity_quintals: 10,
    vehicle_type: 'BOLERO_PICKUP',
    dispatch_date: 'Tomorrow Morning',
    dispatch_time: '05:30 AM',
    notes: ''
  });

  // Fetch trucks
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
        setPools(data);
      }
    } catch (err) {
      console.error('Failed to load trucks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPools();
  }, [selectedDistrict]);

  const cleanPhone = (phone) => {
    return (phone || '').replace(/[^0-9]/g, '');
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/pools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm)
      });
      if (res.ok) {
        setIsCreateModalOpen(false);
        if (onShowToast) onShowToast(t.poolCreatedSuccess);
        fetchPools();
        setCreateForm({
          creator_farmer_name: '',
          creator_phone: '',
          origin_district: currentDistrict,
          origin_village: '',
          destination_market: 'Mysore',
          crop_name: currentCrop,
          quantity_quintals: 10,
          vehicle_type: 'BOLERO_PICKUP',
          dispatch_date: 'Tomorrow Morning',
          dispatch_time: '05:30 AM',
          notes: ''
        });
      }
    } catch (err) {
      console.error('Failed to create truck listing:', err);
    }
  };

  return (
    <section id="crop-pooling-section" className="mb-8">
      
      {/* Hero Glass Banner */}
      <SpotlightCard
        spotlightColor="rgba(16, 185, 129, 0.14)"
        className="glass-card rounded-3xl p-6 sm:p-8 border border-white/15 mb-6 text-white hover-lift"
      >
        <div className="relative z-10">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
              <Users className="w-3.5 h-3.5" />
              Share a Truck • Split Fuel
            </span>
            <span className="text-white/60 text-xs font-mono">
              Save up to 75% on small lot transport
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white text-crisp">
                {t.poolHubTitle}
              </h3>
              <p className="text-white/75 text-xs sm:text-sm mt-1.5 leading-relaxed font-sans">
                {t.poolHubSubtitle}
              </p>
            </div>

            <button
              onClick={() => {
                setCreateForm(prev => ({
                  ...prev,
                  origin_district: currentDistrict,
                  crop_name: currentCrop
                }));
                setIsCreateModalOpen(true);
              }}
              className="btn-shimmer inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-pine font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/40 transition-all cursor-pointer shrink-0 border border-emerald-300/60"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t.createPoolBtn}</span>
            </button>
          </div>

          {/* 3 Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3 hover:border-emerald-500/30 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">Find Trucks on Your Route</h4>
                <p className="text-xs text-white/70 mt-1 font-sans">
                  Check trucks traveling from your district to your target APMC mandi.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3 hover:border-emerald-500/30 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">Call & Confirm Space</h4>
                <p className="text-xs text-white/70 mt-1 font-sans">
                  Tap the Call button to speak directly with the farmer and confirm space.
                </p>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex items-start gap-3 hover:border-amber-500/30 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <h4 className="font-bold text-xs text-white uppercase tracking-wider font-sans">Split Cash In-Person</h4>
                <p className="text-xs text-white/70 mt-1 font-sans">
                  Meet at loading point, transport produce together, and split fuel in cash.
                </p>
              </div>
            </div>
          </div>

        </div>
      </SpotlightCard>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 glass-input px-3.5 py-2 rounded-xl border border-white/20">
            <Filter className="w-4 h-4 text-emerald-300" />
            <label className="text-xs font-semibold text-white/90">{t.filterDistrict}:</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-transparent text-xs font-bold text-emerald-300 focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">{t.filterAll}</option>
              {origins.map(o => (
                <option key={o.district} value={o.district}>
                  {o.district} {o.kannada_name ? `(${o.kannada_name})` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-400/30 backdrop-blur-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Showing {pools.length} shared truck option{pools.length === 1 ? '' : 's'}</span>
          </div>
        </div>
      </div>

      {/* Trucks Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-white/60 text-xs font-mono">
          Loading available shared trucks...
        </div>
      ) : pools.length === 0 ? (
        <div className="glass-card rounded-3xl p-10 text-center border border-dashed border-white/20">
          <Truck className="w-10 h-10 text-white/40 mx-auto mb-3" />
          <h4 className="text-base font-bold text-white">No trucks currently listed in this district</h4>
          <p className="text-xs text-white/60 mt-1 max-w-md mx-auto">
            Heading to an APMC mandi? Post your truck with your phone number so neighboring farmers can call to share!
          </p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-shimmer mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-pine font-bold text-xs cursor-pointer shadow-md border border-emerald-300/60"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.createPoolBtn}</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pools.map(truck => {
            const telUri = `tel:${cleanPhone(truck.creator_phone)}`;
            const waText = encodeURIComponent(
              `Hello ${truck.creator_farmer_name}, I saw your truck on HarvestRoute going from ${truck.origin_district} to ${truck.destination_market} APMC. Do you have empty space available to share?`
            );
            const waUri = `https://wa.me/${cleanPhone(truck.creator_phone)}?text=${waText}`;

            return (
              <SpotlightCard 
                key={truck.pool_id}
                spotlightColor="rgba(16, 185, 129, 0.12)"
                className="glass-card rounded-2xl border border-white/15 p-6 flex flex-col justify-between hover-lift text-white"
              >
                <div>
                  {/* Top Status Badge */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-emerald-500 text-pine shadow-xs flex items-center gap-1.5">
                      <Phone className="w-3 h-3 fill-pine" />
                      <span>{t.emptyBadgeNotice}</span>
                    </span>

                    <span className="text-xs font-mono tabular-nums text-white/50">
                      ID: {truck.pool_id}
                    </span>
                  </div>

                  {/* Route Details */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-4 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <MapPin className="w-4 h-4 text-terracotta-400 shrink-0" />
                      <span>{truck.origin_village ? `${truck.origin_village}, ` : ''}{truck.origin_district}</span>
                      <ArrowRight className="w-4 h-4 text-white/40" />
                      <span className="text-emerald-300 font-bold">{truck.destination_market} APMC Mandi</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10 text-xs">
                      <div>
                        <span className="text-white/50 text-xs">Vehicle:</span>
                        <div className="font-bold text-white">{truck.vehicle_name}</div>
                      </div>
                      <div>
                        <span className="text-white/50 text-xs">Trip Freight:</span>
                        <div className="font-bold text-emerald-300 font-mono tabular-nums">₹{truck.total_freight_inr}</div>
                      </div>
                      <div>
                        <span className="text-white/50 text-xs">Departure Time:</span>
                        <div className="font-bold text-white flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-white/50" />
                          <span>{truck.dispatch_time}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-white/50 text-xs">Date:</span>
                        <div className="font-bold text-white">{truck.dispatch_date}</div>
                      </div>
                    </div>
                  </div>

                  {/* Farmer Host Profile */}
                  <div className="bg-emerald-500/15 rounded-xl p-4 border border-emerald-400/20 mb-4 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                          Truck Host Farmer
                        </span>
                        <div className="text-sm font-bold text-white mt-0.5">
                          {truck.creator_farmer_name}
                        </div>
                        <div className="text-xs text-white/70">
                          {truck.origin_village || truck.origin_district}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-white/50">Mobile</span>
                        <div className="text-sm font-bold text-emerald-300 font-mono tabular-nums">
                          {truck.creator_phone}
                        </div>
                      </div>
                    </div>

                    {truck.notes && (
                      <p className="text-xs text-white/80 italic mt-2.5 pt-2 border-t border-emerald-400/20 font-sans">
                        "{truck.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Call to Confirm Action Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                  <a
                    href={telUri}
                    className="btn-shimmer flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-pine font-bold text-xs sm:text-sm shadow-md transition-all border border-emerald-300/40"
                  >
                    <Phone className="w-3.5 h-3.5 fill-pine" />
                    <span>{t.callToConfirmBtn}: {truck.creator_phone}</span>
                  </a>

                  <a
                    href={waUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shimmer inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-emerald-600 text-white font-bold text-xs border border-white/20 transition-all"
                    title="Send WhatsApp Message"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.whatsappFarmerBtn}</span>
                  </a>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      )}

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-dark-card rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-white/20 max-h-[90vh] overflow-y-auto text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white font-sans">
                    {t.createPoolBtn}
                  </h3>
                  <p className="text-xs text-white/60">
                    Farmers will call your phone directly to confirm space.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="text-white/50 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Gowda"
                    value={createForm.creator_farmer_name}
                    onChange={(e) => setCreateForm({...createForm, creator_farmer_name: e.target.value})}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98451 23410"
                    value={createForm.creator_phone}
                    onChange={(e) => setCreateForm({...createForm, creator_phone: e.target.value})}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">Origin District *</label>
                  <select
                    value={createForm.origin_district}
                    onChange={(e) => setCreateForm({...createForm, origin_district: e.target.value})}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden cursor-pointer"
                  >
                    {origins.map(o => (
                      <option key={o.district} value={o.district}>
                        {o.district}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">Village / Hobli</label>
                  <input
                    type="text"
                    placeholder="e.g. Gundlupet Circle"
                    value={createForm.origin_village}
                    onChange={(e) => setCreateForm({...createForm, origin_village: e.target.value})}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">Target APMC Mandi *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mysore, Bangalore Yard"
                    value={createForm.destination_market}
                    onChange={(e) => setCreateForm({...createForm, destination_market: e.target.value})}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">Vehicle Type</label>
                  <select
                    value={createForm.vehicle_type}
                    onChange={(e) => setCreateForm({...createForm, vehicle_type: e.target.value})}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden cursor-pointer"
                  >
                    <option value="CHOTA_HATHI">Tata Ace (Chota Hathi)</option>
                    <option value="BOLERO_PICKUP">Mahindra Bolero Maxi Truck</option>
                    <option value="CANTER_TRUCK">Eicher 14ft Canter</option>
                    <option value="THREE_WHEELER">Auto / Piaggio Ape</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">Departure Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Tomorrow"
                    value={createForm.dispatch_date}
                    onChange={(e) => setCreateForm({...createForm, dispatch_date: e.target.value})}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-white/80 mb-1">Departure Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 05:30 AM"
                    value={createForm.dispatch_time}
                    onChange={(e) => setCreateForm({...createForm, dispatch_time: e.target.value})}
                    className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-white/80 mb-1">Notes for Calling Farmers</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Leaving from Gundlupet circle early morning. Call me to confirm space and split vehicle fuel."
                  value={createForm.notes}
                  onChange={(e) => setCreateForm({...createForm, notes: e.target.value})}
                  className="w-full text-xs font-semibold px-3.5 py-2.5 rounded-xl glass-input focus:outline-hidden"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-shimmer px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-pine font-bold text-xs cursor-pointer shadow-md border border-emerald-300/40"
                >
                  Publish Truck Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
