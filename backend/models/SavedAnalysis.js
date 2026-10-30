const mongoose = require('mongoose');

const SavedAnalysisSchema = new mongoose.Schema({
  analysis_id: { type: String, required: true, unique: true },
  crop_name: { type: String, required: true },
  quantity_quintals: { type: Number, required: true },
  freshness_hours: { type: Number, default: 6 },
  origin_district: { type: String, required: true },
  origin_lat: { type: Number, required: true },
  origin_lon: { type: Number, required: true },
  vehicle_type: { type: String, required: true },
  vehicle_name: { type: String, required: true },
  recommended_market: {
    market_name: String,
    district: String,
    net_return_inr: Number,
    modal_price_inr: Number,
    distance_km: Number,
    transit_hours: Number,
    transport_cost_inr: Number,
    spoilage_loss_inr: Number,
    market_fees_inr: Number
  },
  nominal_highest_market: {
    market_name: String,
    district: String,
    net_return_inr: Number,
    modal_price_inr: Number,
    distance_km: Number,
    transport_cost_inr: Number,
    spoilage_loss_inr: Number,
    market_fees_inr: Number
  },
  price_trap_delta_inr: Number, // Difference in net profit
  explanation: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SavedAnalysis', SavedAnalysisSchema);

