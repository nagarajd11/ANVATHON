const mongoose = require('mongoose');

const MarketPriceSchema = new mongoose.Schema({
  market_id: { type: String, required: true, index: true },
  market_name: { type: String, required: true },
  district: { type: String, required: true },
  crop_id: { type: String, required: true, index: true },
  crop_name: { type: String, required: true, index: true },
  reported_month: { type: String },
  year: { type: Number },
  month: { type: Number },
  season_label: { type: String },
  min_price_inr_per_unit: { type: Number, required: true },
  modal_price_inr_per_unit: { type: Number, required: true },
  max_price_inr_per_unit: { type: Number, required: true },
  price_unit: { type: String, default: "INR_per_quintal" },
  arrivals_tonnes_est: { type: Number, default: 50 },
  market_demand_proxy_tonnes_est: { type: Number, default: 50 },
  supply_demand_ratio_est: { type: Number, default: 1.0 },
  market_purchase_capacity_tonnes_est: { type: Number, default: 100 }
}, { timestamps: true });

MarketPriceSchema.index({ crop_name: 1, market_name: 1 });

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);

