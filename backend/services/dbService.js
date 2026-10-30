const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Crop = require('../models/Crop');
const Market = require('../models/Market');
const MarketPrice = require('../models/MarketPrice');
const Transporter = require('../models/Transporter');
const SavedAnalysis = require('../models/SavedAnalysis');
const PoolRequest = require('../models/PoolRequest');
const { getRoadDistance } = require('./geoService');

const CACHE_FILE = path.resolve(__dirname, '../data/seedDataCache.json');

let isMongoConnected = false;
let memoryCache = null;
const inMemorySavedAnalyses = [];

// Pre-seeded realistic Karnataka Empty Trucks for Direct Phone Collaboration
const initialSeedPools = [
  {
    pool_id: 'TRUCK-KA-101',
    creator_farmer_name: 'Ramesh Gowda',
    creator_phone: '+91 98451 23410',
    origin_district: 'Chamarajanagar',
    origin_village: 'Gundlupet',
    destination_market: 'Mysore',
    destination_district: 'Mysore',
    crop_name: 'Tomato',
    quantity_quintals: 8,
    vehicle_type: 'BOLERO_PICKUP',
    vehicle_name: 'Mahindra Bolero Maxi Truck',
    vehicle_capacity_quintals: 25,
    current_load_quintals: 14,
    remaining_capacity_quintals: 11, // 11 qtl EMPTY
    trip_distance_km: 74,
    total_freight_inr: 2922,
    solo_freight_estimate_inr: 2922,
    dispatch_date: 'Tomorrow Morning',
    dispatch_time: '05:30 AM',
    status: 'OPEN',
    notes: 'Leaving Gundlupet circle early morning. 11 quintals empty capacity in Bolero. Call me to load your vegetables and split driver freight in cash.',
    settlement_type: 'IN_PERSON_CASH',
    created_at: new Date(Date.now() - 3600000 * 2)
  },
  {
    pool_id: 'TRUCK-KA-102',
    creator_farmer_name: 'Manjunatha Reddy',
    creator_phone: '+91 94480 87654',
    origin_district: 'Kolar',
    origin_village: 'Srinivaspur',
    destination_market: 'Bangalore',
    destination_district: 'Bangalore Urban',
    crop_name: 'Tomato',
    quantity_quintals: 7,
    vehicle_type: 'CHOTA_HATHI',
    vehicle_name: 'Tata Ace (Chota Hathi)',
    vehicle_capacity_quintals: 15,
    current_load_quintals: 7,
    remaining_capacity_quintals: 8, // 8 qtl EMPTY
    trip_distance_km: 68,
    total_freight_inr: 2282,
    solo_freight_estimate_inr: 2282,
    dispatch_date: 'Today Evening',
    dispatch_time: '07:00 PM',
    status: 'OPEN',
    notes: 'Fresh tomato crates ready. 8 quintals empty space available to Yeshwanthpur/Bangalore Yard. Call directly to coordinate loading.',
    settlement_type: 'IN_PERSON_CASH',
    created_at: new Date(Date.now() - 3600000 * 3)
  },
  {
    pool_id: 'TRUCK-KA-103',
    creator_farmer_name: 'Basavarajappa Patil',
    creator_phone: '+91 99002 45123',
    origin_district: 'Davanagere',
    origin_village: 'Harihar',
    destination_market: 'Hubli',
    destination_district: 'Dharwad',
    crop_name: 'Onion',
    quantity_quintals: 20,
    vehicle_type: 'CANTER_TRUCK',
    vehicle_name: 'Eicher 14ft Canter',
    vehicle_capacity_quintals: 50,
    current_load_quintals: 36,
    remaining_capacity_quintals: 14, // 14 qtl EMPTY
    trip_distance_km: 142,
    total_freight_inr: 7080,
    solo_freight_estimate_inr: 7080,
    dispatch_date: 'Tomorrow Morning',
    dispatch_time: '06:00 AM',
    status: 'OPEN',
    notes: 'Heading to Hubli APMC. Have 14 quintals empty space in Canter. Call me if you have onion or maize to transport together.',
    settlement_type: 'IN_PERSON_CASH',
    created_at: new Date(Date.now() - 3600000 * 4)
  },
  {
    pool_id: 'TRUCK-KA-104',
    creator_farmer_name: 'Somanna K',
    creator_phone: '+91 94491 66723',
    origin_district: 'Haveri',
    origin_village: 'Ranebennur',
    destination_market: 'Davanagere',
    destination_district: 'Davanagere',
    crop_name: 'Dry Chilli',
    quantity_quintals: 6,
    vehicle_type: 'CHOTA_HATHI',
    vehicle_name: 'Tata Ace (Chota Hathi)',
    vehicle_capacity_quintals: 15,
    current_load_quintals: 6,
    remaining_capacity_quintals: 9, // 9 qtl EMPTY
    trip_distance_km: 42,
    total_freight_inr: 1658,
    solo_freight_estimate_inr: 1658,
    dispatch_date: 'Tomorrow Afternoon',
    dispatch_time: '02:00 PM',
    status: 'OPEN',
    notes: 'Tata Ace going to Davanagere APMC yard. 9 quintals space left. Call to share fuel expense.',
    settlement_type: 'IN_PERSON_CASH',
    created_at: new Date(Date.now() - 3600000 * 5)
  },
  {
    pool_id: 'TRUCK-KA-105',
    creator_farmer_name: 'Mallikarjun Biradar',
    creator_phone: '+91 97413 88901',
    origin_district: 'Belgaum',
    origin_village: 'Gokak',
    destination_market: 'Belgaum',
    destination_district: 'Belgaum',
    crop_name: 'Potato',
    quantity_quintals: 15,
    vehicle_type: 'BOLERO_PICKUP',
    vehicle_name: 'Mahindra Bolero Maxi Truck',
    vehicle_capacity_quintals: 25,
    current_load_quintals: 15,
    remaining_capacity_quintals: 10, // 10 qtl EMPTY
    trip_distance_km: 65,
    total_freight_inr: 2670,
    solo_freight_estimate_inr: 2670,
    dispatch_date: 'Tomorrow Morning',
    dispatch_time: '04:30 AM',
    status: 'OPEN',
    notes: '10 quintals empty capacity in Bolero. Call me to load potato, vegetables, or ginger before 8 PM tonight.',
    settlement_type: 'IN_PERSON_CASH',
    created_at: new Date(Date.now() - 3600000 * 6)
  }
];

let inMemoryPools = [...initialSeedPools];

function loadCacheFromFile() {
  if (fs.existsSync(CACHE_FILE)) {
    try {
      const raw = fs.readFileSync(CACHE_FILE, 'utf-8');
      memoryCache = JSON.parse(raw);
      console.log('Loaded seed data from JSON cache into memory.');
    } catch (e) {
      console.error('Failed to parse seed cache:', e.message);
    }
  }
}

// Initial load
loadCacheFromFile();

async function initDatabase() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/harvestroute';
  console.log(`Connecting to MongoDB: ${mongoUri}...`);

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2500 });
    isMongoConnected = true;
    console.log('MongoDB successfully connected and active!');

    // Check if collections are empty, if so, seed from memoryCache
    const cropCount = await Crop.countDocuments();
    if (cropCount === 0 && memoryCache) {
      console.log('MongoDB collections empty. Auto-seeding from memory cache...');
      if (memoryCache.crops) await Crop.insertMany(memoryCache.crops);
      if (memoryCache.markets) await Market.insertMany(memoryCache.markets);
      if (memoryCache.transporters) await Transporter.insertMany(memoryCache.transporters);
      if (memoryCache.pricesLookup) {
        const prices = Object.values(memoryCache.pricesLookup);
        await MarketPrice.insertMany(prices);
      }
      console.log('MongoDB auto-seeding completed.');
    }

    // Replace pools collection with empty truck seed requests
    await PoolRequest.deleteMany({});
    console.log('Seeding fresh empty truck collaboration requests into MongoDB...');
    await PoolRequest.insertMany(initialSeedPools);
  } catch (err) {
    isMongoConnected = false;
    console.warn(`MongoDB not accessible: ${err.message}. Operating in resilient High-Speed Cache mode.`);
  }

  mongoose.connection.on('connected', () => { isMongoConnected = true; });
  mongoose.connection.on('disconnected', () => { isMongoConnected = false; });
}

async function getCrops() {
  if (isMongoConnected) {
    try {
      const crops = await Crop.find().lean();
      if (crops.length > 0) return crops;
    } catch (e) {
      // Fallback
    }
  }
  return memoryCache ? memoryCache.crops : [];
}

async function getMarkets() {
  if (isMongoConnected) {
    try {
      const mkts = await Market.find().lean();
      if (mkts.length > 0) return mkts;
    } catch (e) {
      // Fallback
    }
  }
  return memoryCache ? memoryCache.markets : [];
}

async function getPricesLookup() {
  if (isMongoConnected) {
    try {
      const prices = await MarketPrice.find().lean();
      if (prices.length > 0) {
        const lookup = {};
        for (const p of prices) {
          lookup[`${p.market_name}___${p.crop_name}`] = p;
        }
        return lookup;
      }
    } catch (e) {
      // Fallback
    }
  }
  return memoryCache ? memoryCache.pricesLookup : {};
}

async function getTransporters() {
  if (isMongoConnected) {
    try {
      const list = await Transporter.find().lean();
      if (list.length > 0) return list;
    } catch (e) {
      // Fallback
    }
  }
  return memoryCache ? memoryCache.transporters : [];
}

function getDistrictCenters() {
  return memoryCache ? memoryCache.districtCenters : {};
}

async function saveAnalysisRecord(record) {
  if (isMongoConnected) {
    try {
      const doc = new SavedAnalysis(record);
      await doc.save();
      return doc.toObject();
    } catch (e) {
      console.warn('Could not save to MongoDB, saving in memory:', e.message);
    }
  }
  inMemorySavedAnalyses.unshift(record);
  if (inMemorySavedAnalyses.length > 50) inMemorySavedAnalyses.pop();
  return record;
}

async function getSavedAnalysesList() {
  if (isMongoConnected) {
    try {
      return await SavedAnalysis.find().sort({ created_at: -1 }).limit(20).lean();
    } catch (e) {
      // Fallback
    }
  }
  return inMemorySavedAnalyses;
}

// ==============================================================
// EMPTY TRUCK COLLABORATION & DIRECT PHONE CALL COORDINATION
// (Only trucks with empty capacity are retrieved & displayed)
// ==============================================================

async function getPoolRequests({ district = null, crop = null } = {}) {
  // Query rule: Only return trucks with empty capacity > 0 and status OPEN
  if (isMongoConnected) {
    try {
      const query = {
        remaining_capacity_quintals: { $gt: 0 },
        status: 'OPEN'
      };
      if (district && district !== 'ALL') query.origin_district = district;
      if (crop && crop !== 'ALL') query.crop_name = crop;
      const list = await PoolRequest.find(query).sort({ created_at: -1 }).lean();
      if (list.length > 0) return list;
    } catch (e) {
      // Fallback to memory
    }
  }

  // Filter in-memory: ONLY trucks with empty capacity > 0
  let list = inMemoryPools.filter(p => p.remaining_capacity_quintals > 0 && p.status === 'OPEN');
  if (district && district !== 'ALL') {
    list = list.filter(p => p.origin_district.toLowerCase() === district.toLowerCase());
  }
  if (crop && crop !== 'ALL') {
    list = list.filter(p => p.crop_name.toLowerCase() === crop.toLowerCase());
  }
  return list;
}

async function getPoolById(poolId) {
  if (isMongoConnected) {
    try {
      const doc = await PoolRequest.findOne({ pool_id: poolId }).lean();
      if (doc) return doc;
    } catch (e) {
      // Fallback
    }
  }
  return inMemoryPools.find(p => p.pool_id === poolId) || null;
}

async function createPoolRequest(data) {
  const poolId = `TRUCK-KA-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const creatorQuantity = parseFloat(data.quantity_quintals) || 5;
  const vehicleCapacity = parseFloat(data.vehicle_capacity_quintals) || 25;
  const remainingSpace = Math.max(1, vehicleCapacity - creatorQuantity);
  const totalFreight = Math.round(parseFloat(data.total_freight_inr) || 2500);

  const poolRecord = {
    pool_id: poolId,
    creator_farmer_name: data.creator_farmer_name,
    creator_phone: data.creator_phone,
    origin_district: data.origin_district,
    origin_village: data.origin_village || 'Local Village',
    destination_market: data.destination_market,
    destination_district: data.destination_district || '',
    crop_name: data.crop_name,
    quantity_quintals: creatorQuantity,
    vehicle_type: data.vehicle_type,
    vehicle_name: data.vehicle_name,
    vehicle_capacity_quintals: vehicleCapacity,
    current_load_quintals: creatorQuantity,
    remaining_capacity_quintals: remainingSpace, // Empty space for callers!
    trip_distance_km: Math.round(data.trip_distance_km || 60),
    total_freight_inr: totalFreight,
    solo_freight_estimate_inr: totalFreight,
    dispatch_date: data.dispatch_date || 'Tomorrow',
    dispatch_time: data.dispatch_time || '06:00 AM',
    status: 'OPEN',
    notes: data.notes || '',
    settlement_type: 'IN_PERSON_CASH',
    created_at: new Date()
  };

  if (isMongoConnected) {
    try {
      const doc = new PoolRequest(poolRecord);
      await doc.save();
      inMemoryPools.unshift(doc.toObject());
      return doc.toObject();
    } catch (e) {
      console.warn('MongoDB pool save failed, using memory:', e.message);
    }
  }

  inMemoryPools.unshift(poolRecord);
  return poolRecord;
}

module.exports = {
  initDatabase,
  getCrops,
  getMarkets,
  getPricesLookup,
  getTransporters,
  getDistrictCenters,
  saveAnalysisRecord,
  getSavedAnalysesList,
  getPoolRequests,
  getPoolById,
  createPoolRequest,
  isDbConnected: () => isMongoConnected
};
