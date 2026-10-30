const mongoose = require('mongoose');

const MarketSchema = new mongoose.Schema({
  market_id: { type: String, required: true, unique: true },
  market_name: { type: String, required: true, index: true },
  district: { type: String, required: true, index: true },
  market_town: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  apmc_cess_rate: { type: Number, default: 0.015 }, // 1.5%
  hamali_rate_per_quintal: { type: Number, default: 25 }, // INR per quintal
  weighbridge_fee_flat: { type: Number, default: 50 }, // INR
  operating_hours: { type: String, default: "05:30 AM - 01:00 PM" },
  payment_settlement: { type: String, default: "Direct Bank Transfer / Immediate Cash" },
  is_terminal_market: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Market', MarketSchema);

