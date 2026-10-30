const mongoose = require('mongoose');

const ParticipantSchema = new mongoose.Schema({
  participant_id: { type: String, required: true },
  farmer_name: { type: String, required: true },
  phone: { type: String, required: true },
  village: { type: String, default: '' },
  crop_name: { type: String, required: true },
  quantity_quintals: { type: Number, required: true },
  share_percentage: { type: Number, default: 0 },
  split_expense_inr: { type: Number, default: 0 },
  joined_at: { type: Date, default: Date.now }
});

const PoolRequestSchema = new mongoose.Schema({
  pool_id: { type: String, required: true, unique: true },
  creator_farmer_name: { type: String, required: true },
  creator_phone: { type: String, required: true },
  origin_district: { type: String, required: true },
  origin_village: { type: String, required: true },
  destination_market: { type: String, required: true },
  destination_district: { type: String, default: '' },
  crop_name: { type: String, required: true },
  quantity_quintals: { type: Number, required: true },
  vehicle_type: { type: String, required: true },
  vehicle_name: { type: String, required: true },
  vehicle_capacity_quintals: { type: Number, required: true },
  current_load_quintals: { type: Number, required: true },
  remaining_capacity_quintals: { type: Number, required: true },
  trip_distance_km: { type: Number, required: true },
  total_freight_inr: { type: Number, required: true },
  solo_freight_estimate_inr: { type: Number, default: 0 },
  dispatch_date: { type: String, required: true },
  dispatch_time: { type: String, default: 'Early Morning (05:00 AM)' },
  status: { 
    type: String, 
    enum: ['OPEN', 'FULL', 'DEPARTED', 'CANCELLED'], 
    default: 'OPEN' 
  },
  notes: { type: String, default: '' },
  settlement_type: { type: String, default: 'IN_PERSON_CASH' },
  participants: [ParticipantSchema],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PoolRequest', PoolRequestSchema);

