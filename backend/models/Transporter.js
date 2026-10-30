const mongoose = require('mongoose');

const TransporterSchema = new mongoose.Schema({
  dealer_id: { type: String, required: true, unique: true },
  dealer_name: { type: String, required: true },
  contact_phone: { type: String, required: true },
  whatsapp_number: { type: String },
  district_base: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  trips_completed: { type: Number, default: 120 },
  verified: { type: Boolean, default: true },
  vehicles: [
    {
      vehicle_id: { type: String, required: true },
      vehicle_name: { type: String, required: true }, // e.g. "Tata Ace Chota Hathi"
      vehicle_type: { 
        type: String, 
        enum: ['THREE_WHEELER', 'CHOTA_HATHI', 'BOLERO_PICKUP', 'CANTER_TRUCK', 'COLD_CHAIN_REEFER'],
        required: true 
      },
      capacity_quintals: { type: Number, required: true },
      base_fare_inr: { type: Number, required: true },
      rate_per_km_inr: { type: Number, required: true },
      is_refrigerated: { type: Boolean, default: false },
      cooling_spoilage_reduction_pct: { type: Number, default: 0 }, // e.g. 85% for Reefer
      available_units_now: { type: Number, default: 2 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Transporter', TransporterSchema);

