const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  crop_id: { type: String, required: true, unique: true },
  crop_name: { type: String, required: true, index: true },
  commodity_group: { type: String, required: true },
  perishability_tier: { 
    type: String, 
    enum: ['HIGH', 'MEDIUM', 'LOW', 'NEGLIGIBLE'], 
    default: 'MEDIUM' 
  },
  base_spoilage_rate_per_hour: { type: Number, default: 0.002 }, // e.g. 0.005 = 0.5% per hr
  shelf_life_days: { type: Number, default: 7 },
  packing_type: { type: String, default: 'Standard Bags' },
  kannada_name: { type: String },
  hindi_name: { type: String },
  icon: { type: String, default: 'sprout' }
}, { timestamps: true });

module.exports = mongoose.model('Crop', CropSchema);

