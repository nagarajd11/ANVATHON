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
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-emerald-900/10 shadow-[0_16px_45px_-10px_rgba(4,47,46,0.22),inset_0_1px_1px_0_rgba(255,255,255,0.9)]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-chlorophyll/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-800">
              <Truck className="w-4 h-4 text-emerald-700" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-chlorophyll/60">
              Verified Logistics Directory
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-chlorophyll tracking-wide">
            {t.transporterTitle}
          </h3>
          <p className="text-xs text-chlorophyll/70 mt-1 font-sans">
            {t.transporterSub}
          </p>
        </div>
        <span className="text-xs font-mono font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 self-start sm:self-auto">
          Karnataka APMC Transport Network
        </span>
      </div>

      {/* Transporter Dealer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dealers.map((dealer) => (
          <SpotlightCard 
            key={dealer.dealer_id}
            spotlightColor="rgba(16, 185, 129, 0.12)"
            className="rounded-2xl border border-chlorophyll/15 p-5 bg-white/90 shadow-2xs hover:shadow-md transition-all"
          >
            {/* Dealer Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-base text-chlorophyll tracking-tight font-sans">{dealer.dealer_name}</h4>
                  {dealer.verified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Carrier" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-chlorophyll/60 mt-1 font-mono">
                  <span>Hub: {dealer.district_base}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-terracotta-700 font-bold tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {dealer.rating} ({dealer.trips_completed} trips)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${dealer.contact_phone}`}
                  className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors border border-emerald-200/60"
                  title="Call Transporter"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/${dealer.whatsapp_number ? dealer.whatsapp_number.replace(/[^0-9]/g, '') : ''}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-xs"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Vehicle Fleet */}
            <div className="space-y-2.5 mt-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-chlorophyll/50 block font-mono">
                Available Fleet Units:
              </span>
              {dealer.vehicles.map((vh) => {
                const isSelected = currentVehicleType === vh.vehicle_type;

                return (
                  <div
                    key={vh.vehicle_id}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-all ${
                      isSelected 
                        ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-semibold shadow-xs' 
                        : 'bg-[#fbfbfa] border-chlorophyll/10 hover:border-chlorophyll/20 text-chlorophyll'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Truck className={`w-4 h-4 shrink-0 ${vh.is_refrigerated ? 'text-emerald-700' : 'text-chlorophyll/50'}`} />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold font-sans">
                          <span>{vh.vehicle_name}</span>
                          {vh.is_refrigerated && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-0.5 font-mono">
                              <Snowflake className="w-2.5 h-2.5" /> Reefer
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-chlorophyll/60 font-mono tabular-nums mt-0.5">
                          Cap: {vh.capacity_quintals} qtl • Base: ₹{vh.base_fare_inr} + ₹{vh.rate_per_km_inr}/km
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectVehicle(vh.vehicle_type)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-chlorophyll text-emerald-300 shadow-xs'
                            : 'bg-white text-chlorophyll hover:bg-black/5 border border-chlorophyll/15'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </button>

                      <button
                        onClick={() => setBookedModalDealer({ dealer, vehicle: vh })}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-bold cursor-pointer"
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
        <div className="fixed inset-0 z-50 bg-pine/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-chlorophyll/15">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
              <CalendarCheck className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-chlorophyll text-center mb-1 font-serif italic">
              Vehicle Booking Dispatch
            </h3>
            <p className="text-xs text-chlorophyll/60 text-center mb-5 font-sans">
              Direct linkage with {bookedModalDealer.dealer.dealer_name}
            </p>

            <div className="bg-[#fbfbfa] p-4 rounded-2xl border border-chlorophyll/10 text-xs space-y-2 mb-5 font-mono">
              <div className="flex justify-between">
                <span className="text-chlorophyll/60 font-sans">Vehicle:</span>
                <span className="font-bold text-chlorophyll">{bookedModalDealer.vehicle.vehicle_name}</span>
              </div>
              <div className="flex justify-between tabular-nums">
                <span className="text-chlorophyll/60 font-sans">Freight Rate:</span>
                <span className="font-bold text-chlorophyll">
                  ₹{bookedModalDealer.vehicle.base_fare_inr} Base + ₹{bookedModalDealer.vehicle.rate_per_km_inr}/km
                </span>
              </div>
              <div className="flex justify-between tabular-nums">
                <span className="text-chlorophyll/60 font-sans">Carrier Phone:</span>
                <span className="font-bold text-emerald-800">{bookedModalDealer.dealer.contact_phone}</span>
              </div>
            </div>

            <p className="text-xs text-chlorophyll/70 mb-6 text-center font-sans">
              A dispatch notification has been scheduled. Would you like to call the driver now to confirm gate pickup?
            </p>

            <div className="flex items-center gap-3 font-sans">
              <button
                onClick={() => setBookedModalDealer(null)}
                className="flex-1 py-3 rounded-xl border border-chlorophyll/20 text-xs font-bold text-chlorophyll/70 hover:bg-black/5 transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={`tel:${bookedModalDealer.dealer.contact_phone}`}
                className="flex-1 py-3 rounded-xl bg-chlorophyll hover:bg-[#0c3829] text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/20 border border-emerald-500/40"
              >
                <Phone className="w-3.5 h-3.5 fill-emerald-300" />
                Call Driver
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
