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

// Pre-seeded realistic Karnataka Crop Transport Pools
const initialSeedPools = [
  {
    pool_id: 'POOL-KA-101',
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
    remaining_capacity_quintals: 11,
    trip_distance_km: 74,
    total_freight_inr: 2922,
    solo_freight_estimate_inr: 2922,
    dispatch_date: 'Tomorrow Morning',
    dispatch_time: '05:30 AM',
    status: 'OPEN',
    notes: 'Leaving from Gundlupet main circle. Have 11 quintals capacity left. Suitable for tomatoes, leafy vegetables, or fruits.',
    settlement_type: 'IN_PERSON_CASH',
    participants: [
      {
        participant_id: 'PART-101-1',
        farmer_name: 'Ramesh Gowda (Host)',
        phone: '+91 98451 23410',
        village: 'Gundlupet',
        crop_name: 'Tomato',
        quantity_quintals: 8,
        share_percentage: 57.1,
        split_expense_inr: 1669,
        joined_at: new Date(Date.now() - 3600000 * 5)
      },
      {
        participant_id: 'PART-101-2',
        farmer_name: 'Suresh Naik',
        phone: '+91 94481 99201',
        village: 'Begur Hobli',
        crop_name: 'Cabbage',
        quantity_quintals: 6,
        share_percentage: 42.9,
        split_expense_inr: 1253,
        joined_at: new Date(Date.now() - 3600000 * 2)
      }
    ],
    created_at: new Date(Date.now() - 3600000 * 6)
  },
  {
    pool_id: 'POOL-KA-102',
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
    remaining_capacity_quintals: 8,
    trip_distance_km: 68,
    total_freight_inr: 2282,
    solo_freight_estimate_inr: 2282,
    dispatch_date: 'Today Evening',
    dispatch_time: '07:00 PM',
    status: 'OPEN',
    notes: 'Harvested fresh tomatoes. Heading to Yeshwanthpur/Bangalore Yard. Looking for 1-2 farmers near Srinivaspur to fill 8 quintals.',
    settlement_type: 'IN_PERSON_CASH',
    participants: [
      {
        participant_id: 'PART-102-1',
        farmer_name: 'Manjunatha Reddy (Host)',
        phone: '+91 94480 87654',
        village: 'Srinivaspur',
        crop_name: 'Tomato',
        quantity_quintals: 7,
        share_percentage: 100,
        split_expense_inr: 2282,
        joined_at: new Date(Date.now() - 3600000 * 3)
      }
    ],
    created_at: new Date(Date.now() - 3600000 * 3)
  },
  {
    pool_id: 'POOL-KA-103',
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
    remaining_capacity_quintals: 14,
    trip_distance_km: 142,
    total_freight_inr: 7080,
    solo_freight_estimate_inr: 7080,
    dispatch_date: 'Tomorrow Morning',
    dispatch_time: '06:00 AM',
    status: 'OPEN',
    notes: 'Canter heading to Hubli APMC. 14 quintals empty capacity remaining. Settle transport cash directly at loading.',
    settlement_type: 'IN_PERSON_CASH',
    participants: [
      {
        participant_id: 'PART-103-1',
        farmer_name: 'Basavarajappa Patil (Host)',
        phone: '+91 99002 45123',
        village: 'Harihar',
        crop_name: 'Onion',
        quantity_quintals: 20,
        share_percentage: 55.6,
        split_expense_inr: 3933,
        joined_at: new Date(Date.now() - 3600000 * 8)
      },
      {
        participant_id: 'PART-103-2',
        farmer_name: 'Ningappa K',
        phone: '+91 98862 11044',
        village: 'Malebennur',
        crop_name: 'Maize',
        quantity_quintals: 16,
        share_percentage: 44.4,
        split_expense_inr: 3147,
        joined_at: new Date(Date.now() - 3600000 * 4)
      }
    ],
    created_at: new Date(Date.now() - 3600000 * 8)
  },
  {
    pool_id: 'POOL-KA-104',
    creator_farmer_name: 'Mallikarjun Biradar',
    creator_phone: '+91 97413 88901',
    origin_district: 'Belgaum',
    origin_village: 'Gokak',
    destination_market: 'Belgaum',
    destination_district: 'Belgaum',
    crop_name: 'Potato',
    quantity_quintals: 13,
    vehicle_type: 'BOLERO_PICKUP',
    vehicle_name: 'Mahindra Bolero Maxi Truck',
    vehicle_capacity_quintals: 25,
    current_load_quintals: 25,
    remaining_capacity_quintals: 0,
    trip_distance_km: 65,
    total_freight_inr: 2670,
    solo_freight_estimate_inr: 2670,
    dispatch_date: 'Departing Soon',
    dispatch_time: '04:00 AM',
    status: 'FULL',
    notes: 'Bolero is fully booked with 2 farmers. Settle in person at Belgaum yard gate.',
    settlement_type: 'IN_PERSON_CASH',
    participants: [
      {
        participant_id: 'PART-104-1',
        farmer_name: 'Mallikarjun Biradar (Host)',
        phone: '+91 97413 88901',
        village: 'Gokak',
        crop_name: 'Potato',
        quantity_quintals: 13,
        share_percentage: 52.0,
        split_expense_inr: 1388,
        joined_at: new Date(Date.now() - 3600000 * 12)
      },
      {
        participant_id: 'PART-104-2',
        farmer_name: 'Anand Shintre',
        phone: '+91 99801 33490',
        village: 'Koujalagi',
        crop_name: 'Ginger',
        quantity_quintals: 12,
        share_percentage: 48.0,
        split_expense_inr: 1282,
        joined_at: new Date(Date.now() - 3600000 * 7)
      }
    ],
    created_at: new Date(Date.now() - 3600000 * 12)
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

    // Seed initial pools into MongoDB if empty
    const poolCount = await PoolRequest.countDocuments();
    if (poolCount === 0) {
      console.log('Seeding initial Crop Pooling requests into MongoDB...');
      await PoolRequest.insertMany(initialSeedPools);
    }
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

// ==========================================
// CROP POOLING & IN-PERSON EXPENSE SPLITTING
// ==========================================

async function getPoolRequests({ district = null, status = null, crop = null } = {}) {
  if (isMongoConnected) {
    try {
      const query = {};
      if (district && district !== 'ALL') query.origin_district = district;
      if (status && status !== 'ALL') query.status = status;
      if (crop && crop !== 'ALL') query.crop_name = crop;
      const list = await PoolRequest.find(query).sort({ created_at: -1 }).lean();
      if (list.length > 0) return list;
    } catch (e) {
      // Fallback to memory
    }
  }

  let list = [...inMemoryPools];
  if (district && district !== 'ALL') {
    list = list.filter(p => p.origin_district.toLowerCase() === district.toLowerCase());
  }
  if (status && status !== 'ALL') {
    list = list.filter(p => p.status === status);
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
  const poolId = `POOL-KA-${Math.floor(1000 + Math.random() * 9000)}`;
  
  const creatorQuantity = parseFloat(data.quantity_quintals) || 5;
  const vehicleCapacity = parseFloat(data.vehicle_capacity_quintals) || 25;
  const totalFreight = Math.round(parseFloat(data.total_freight_inr) || 2500);

  const initialParticipant = {
    participant_id: `PART-${Math.floor(10000 + Math.random() * 90000)}`,
    farmer_name: `${data.creator_farmer_name} (Host)`,
    phone: data.creator_phone,
    village: data.origin_village,
    crop_name: data.crop_name,
    quantity_quintals: creatorQuantity,
    share_percentage: 100,
    split_expense_inr: totalFreight,
    joined_at: new Date()
  };

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
    remaining_capacity_quintals: Math.max(0, vehicleCapacity - creatorQuantity),
    trip_distance_km: Math.round(data.trip_distance_km || 60),
    total_freight_inr: totalFreight,
    solo_freight_estimate_inr: totalFreight,
    dispatch_date: data.dispatch_date || 'Tomorrow',
    dispatch_time: data.dispatch_time || '06:00 AM',
    status: (vehicleCapacity - creatorQuantity) <= 0 ? 'FULL' : 'OPEN',
    notes: data.notes || '',
    settlement_type: 'IN_PERSON_CASH',
    participants: [initialParticipant],
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

async function joinPoolRequest(poolId, { farmer_name, phone, village, crop_name, quantity_quintals }) {
  const qty = parseFloat(quantity_quintals);
  let pool = null;

  if (isMongoConnected) {
    try {
      pool = await PoolRequest.findOne({ pool_id: poolId });
    } catch (e) {
      // Fallback
    }
  }

  if (!pool) {
    pool = inMemoryPools.find(p => p.pool_id === poolId);
  }

  if (!pool) {
    throw new Error(`Pool request ${poolId} not found.`);
  }

  if (pool.status === 'FULL') {
    throw new Error(`This transport vehicle is already full.`);
  }

  if (qty > pool.remaining_capacity_quintals) {
    throw new Error(`Requested ${qty} quintals exceeds remaining capacity (${pool.remaining_capacity_quintals} qtl).`);
  }

  const newParticipant = {
    participant_id: `PART-${Math.floor(10000 + Math.random() * 90000)}`,
    farmer_name: farmer_name.trim(),
    phone: phone.trim(),
    village: (village || '').trim(),
    crop_name: crop_name,
    quantity_quintals: qty,
    share_percentage: 0,
    split_expense_inr: 0,
    joined_at: new Date()
  };

  const updatedParticipants = [...pool.participants, newParticipant];
  const newTotalLoad = updatedParticipants.reduce((sum, p) => sum + p.quantity_quintals, 0);
  const remaining = Math.max(0, pool.vehicle_capacity_quintals - newTotalLoad);

  // Recalculate weight-proportional split for all participants
  updatedParticipants.forEach(p => {
    const fraction = p.quantity_quintals / newTotalLoad;
    p.share_percentage = Math.round(fraction * 1000) / 10;
    p.split_expense_inr = Math.round(fraction * pool.total_freight_inr);
  });

  pool.participants = updatedParticipants;
  pool.current_load_quintals = newTotalLoad;
  pool.remaining_capacity_quintals = remaining;
  pool.status = remaining === 0 ? 'FULL' : 'OPEN';

  if (isMongoConnected && typeof pool.save === 'function') {
    await pool.save();
  } else {
    // Update memory
    const idx = inMemoryPools.findIndex(p => p.pool_id === poolId);
    if (idx !== -1) inMemoryPools[idx] = pool;
  }

  return pool;
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
  joinPoolRequest,
  isDbConnected: () => isMongoConnected
};
