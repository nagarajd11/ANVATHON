import React, { useState } from 'react';
import { 
  Truck, 
  Phone, 
  MessageCircle, 
  Star, 
  Snowflake, 
  ShieldCheck,
  CalendarCheck,
  Check
} from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import { TRANSLATIONS } from '../translations';

export default function TransporterDirectory({
  dealers,
  lang,
  currentVehicleType,
  onSelectVehicle
}) {
  const t = TRANSLATIONS[lang];
  const [bookedModalDealer, setBookedModalDealer] = useState(null);

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 hover-lift">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
              <Truck className="w-4 h-4 text-emerald-300" />
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-emerald-300/90 font-mono">
              Verified Transport Network
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white text-crisp">
            {t.transporterTitle}
          </h3>
          <p className="text-xs text-white/70 mt-1 font-sans">
            {t.transporterSub}
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-3.5 py-1.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 self-start sm:self-auto backdrop-blur-md">
          Karnataka APMC Transport Network
        </span>
      </div>

      {/* Transporter Dealer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dealers.map((dealer) => (
          <SpotlightCard 
            key={dealer.dealer_id}
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="rounded-2xl border border-white/15 p-5 glass-dark-card shadow-lg hover-lift text-white"
          >
            {/* Dealer Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-base text-white tracking-tight font-sans">{dealer.dealer_name}</h4>
                  {dealer.verified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" title="Verified Carrier" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60 mt-1 font-mono">
                  <span>Hub: {dealer.district_base}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-300 font-bold tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {dealer.rating} ({dealer.trips_completed} trips)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${dealer.contact_phone}`}
                  className="btn-shimmer p-2.5 rounded-xl bg-white/10 text-white hover:bg-emerald-500 hover:text-pine transition-all border border-white/20"
                  title="Call Transporter"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${dealer.whatsapp_number ? dealer.whatsapp_number.replace(/[^0-9]/g, '') : ''}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-shimmer p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all border border-emerald-400/40 shadow-xs"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Vehicle Fleet */}
            <div className="space-y-2.5 mt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 block font-mono">
                Available Fleet Units:
              </span>
              {dealer.vehicles.map((vh) => {
                const isSelected = currentVehicleType === vh.vehicle_type;

                return (
                  <div
                    key={vh.vehicle_id}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                      isSelected 
                        ? 'bg-emerald-500/20 border-emerald-400/80 text-white font-semibold shadow-[0_0_15px_rgba(16,185,129,0.25)]' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-white/90'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck className={`w-4 h-4 shrink-0 ${vh.is_refrigerated ? 'text-emerald-400' : 'text-white/50'}`} />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold font-sans">
                          <span>{vh.vehicle_name}</span>
                          {vh.is_refrigerated && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-0.5 font-mono">
                              <Snowflake className="w-2.5 h-2.5" /> Reefer
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-white/60 font-mono tabular-nums mt-0.5">
                          Cap: {vh.capacity_quintals} qtl • Base: ₹{vh.base_fare_inr} + ₹{vh.rate_per_km_inr}/km
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectVehicle(vh.vehicle_type)}
                        className={`btn-shimmer px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-500 text-pine border border-emerald-300 shadow-xs'
                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/15'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </button>

                      <button
                        onClick={() => setBookedModalDealer({ dealer, vehicle: vh })}
                        className="btn-shimmer px-2.5 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-400/30 hover:bg-emerald-500 hover:text-pine text-[11px] font-bold cursor-pointer"
                        title="Instant Booking Confirmation"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </SpotlightCard>
        ))}
      </div>

      {/* Booking Confirmation Modal */}
      {bookedModalDealer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-dark-card rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-white/20 text-white">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center mx-auto mb-4 border border-emerald-400/30">
              <CalendarCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-display font-bold text-white text-center mb-1 text-crisp">
              Vehicle Booking Dispatch
            </h3>
            <p className="text-xs text-white/60 text-center mb-5 font-sans">
              Direct linkage with {bookedModalDealer.dealer.dealer_name}
            </p>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs space-y-2 mb-5 font-mono backdrop-blur-md">
              <div className="flex justify-between">
                <span className="text-white/60 font-sans">Vehicle:</span>
                <span className="font-bold text-white">{bookedModalDealer.vehicle.vehicle_name}</span>
              </div>
              <div className="flex justify-between tabular-nums">
                <span className="text-white/60 font-sans">Freight Rate:</span>
                <span className="font-bold text-emerald-300">
                  ₹{bookedModalDealer.vehicle.base_fare_inr} Base + ₹{bookedModalDealer.vehicle.rate_per_km_inr}/km
                </span>
              </div>
              <div className="flex justify-between tabular-nums">
                <span className="text-white/60 font-sans">Carrier Phone:</span>
                <span className="font-bold text-white">{bookedModalDealer.dealer.contact_phone}</span>
              </div>
            </div>

            <p className="text-xs text-white/70 mb-6 text-center font-sans">
              A dispatch notification has been scheduled. Would you like to call the driver now to confirm gate pickup?
            </p>

            <div className="flex items-center gap-3 font-sans">
              <button
                onClick={() => setBookedModalDealer(null)}
                className="flex-1 py-3 rounded-xl border border-white/15 text-xs font-bold text-white/70 hover:bg-white/10 transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={`tel:${bookedModalDealer.dealer.contact_phone}`}
                className="btn-shimmer flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-pine text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg border border-emerald-300/40"
              >
                <Phone className="w-3.5 h-3.5 fill-pine" />
                Call Driver
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
