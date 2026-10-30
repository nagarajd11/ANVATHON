const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const Crop = require('../models/Crop');
const Market = require('../models/Market');
const MarketPrice = require('../models/MarketPrice');
const Transporter = require('../models/Transporter');
const SavedAnalysis = require('../models/SavedAnalysis');

const CACHE_FILE = path.resolve(__dirname, '../data/seedDataCache.json');

let isMongoConnected = false;
let memoryCache = null;
const inMemorySavedAnalyses = [];

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

module.exports = {
  initDatabase,
  getCrops,
  getMarkets,
  getPricesLookup,
  getTransporters,
  getDistrictCenters,
  saveAnalysisRecord,
  getSavedAnalysesList,
  isDbConnected: () => isMongoConnected
};

