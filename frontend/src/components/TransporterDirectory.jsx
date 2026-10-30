import React, { useState } from 'react';
import { 
  Truck, 
  Phone, 
  MessageCircle, 
  CheckCircle, 
  Star, 
  Snowflake, 
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Truck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.transporterTitle}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{t.transporterSub}</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
          Verified Karnataka Agri-Logistics
        </span>
      </div>

      {/* Transporter Dealer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dealers.map((dealer) => (
          <div 
            key={dealer.dealer_id}
            className="rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow bg-slate-50/50"
          >
            {/* Dealer Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900">{dealer.dealer_name}</h4>
                  {dealer.verified && (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" title="Verified Carrier" />
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                  <span>Base: {dealer.district_base}</span>
                  <span>•</span>
                  <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {dealer.rating} ({dealer.trips_completed} trips)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <a
                  href={`tel:${dealer.contact_phone}`}
                  className="p-2 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                  title="Call Dealer"
                >
                  <Phone className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://wa.me/${dealer.whatsapp_number.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Vehicle Fleet */}
            <div className="space-y-2 mt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Available Fleet Options:
              </span>
              {dealer.vehicles.map((vh) => {
                const isSelected = currentVehicleType === vh.vehicle_type;

                return (
                  <div
                    key={vh.vehicle_id}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                      isSelected 
                        ? 'bg-agri-50 border-agri-300 text-agri-900 font-semibold' 
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className={`w-4 h-4 ${vh.is_refrigerated ? 'text-cyan-600' : 'text-slate-500'}`} />
                      <div>
                        <div className="flex items-center gap-1 font-bold">
                          <span>{vh.vehicle_name}</span>
                          {vh.is_refrigerated && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-100 text-cyan-800 border border-cyan-200 flex items-center gap-0.5">
                              <Snowflake className="w-2.5 h-2.5" /> Reefer
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Capacity: {vh.capacity_quintals} qtl • Base: ₹{vh.base_fare_inr} + ₹{vh.rate_per_km_inr}/km
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onSelectVehicle(vh.vehicle_type)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-agri-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </button>

                      <button
                        onClick={() => setBookedModalDealer({ dealer, vehicle: vh })}
                        className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-[11px] font-bold cursor-pointer"
                        title="Instant Booking Confirmation"
                      >
                        Book
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        ))}
      </div>

      {/* Booking Confirmation Modal */}
      {bookedModalDealer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4">
              <CalendarCheck className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
              Vehicle Booking Request
            </h3>
            <p className="text-xs text-slate-500 text-center mb-4">
              Direct linkage with {bookedModalDealer.dealer.dealer_name}
            </p>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-500">Vehicle:</span>
                <span className="font-bold text-slate-800">{bookedModalDealer.vehicle.vehicle_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Freight Rate:</span>
                <span className="font-bold text-slate-800">
                  ₹{bookedModalDealer.vehicle.base_fare_inr} Base + ₹{bookedModalDealer.vehicle.rate_per_km_inr}/km
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Carrier Phone:</span>
                <span className="font-bold text-emerald-700">{bookedModalDealer.dealer.contact_phone}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-5 text-center">
              A dispatch notification has been scheduled. Would you like to call the driver now to confirm gate pickup?
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setBookedModalDealer(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close
              </button>
              <a
                href={`tel:${bookedModalDealer.dealer.contact_phone}`}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Driver
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

