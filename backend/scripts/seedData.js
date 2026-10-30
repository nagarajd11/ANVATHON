const fs = require('fs');
const path = require('path');
const readline = require('readline');
const mongoose = require('mongoose');

const Crop = require('../models/Crop');
const Market = require('../models/Market');
const MarketPrice = require('../models/MarketPrice');
const Transporter = require('../models/Transporter');
const { CROP_PERISHABILITY } = require('../services/calculationEngine');
const { ALL_KARNATAKA_APMCS } = require('../data/karnatakaApmcRegistry');
const { haversineDistance } = require('../services/geoService');

const CSV_PATH = path.resolve(__dirname, '../../harvestroute_karnataka_market_crop.csv');
const CACHE_DIR = path.resolve(__dirname, '../data');
const CACHE_FILE = path.join(CACHE_DIR, 'seedDataCache.json');

// District centers for farmer origin selector
const DISTRICT_CENTERS = {
  'Bagalkot': { lat: 16.18, lon: 75.70, kn: 'ಬಾಗಲಕೋಟೆ' },
  'Ballari': { lat: 15.14, lon: 76.92, kn: 'ಬಳ್ಳಾರಿ' },
  'Belagavi': { lat: 15.85, lon: 74.50, kn: 'ಬೆಳಗಾವಿ' },
  'Bengaluru Urban': { lat: 12.97, lon: 77.59, kn: 'ಬೆಂಗಳೂರು ನಗರ' },
  'Bengaluru Rural': { lat: 13.29, lon: 77.54, kn: 'ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ' },
  'Bidar': { lat: 17.91, lon: 77.52, kn: 'ಬೀದರ್' },
  'Chamarajanagar': { lat: 11.92, lon: 76.94, kn: 'ಚಾಮರಾಜನಗರ' },
  'Chikkaballapur': { lat: 13.43, lon: 77.73, kn: 'ಚಿಕ್ಕಬಳ್ಳಾಪುರ' },
  'Chikkamagaluru': { lat: 13.32, lon: 75.77, kn: 'ಚಿಕ್ಕಮಗಳೂರು' },
  'Chitradurga': { lat: 14.23, lon: 76.40, kn: 'ಚಿತ್ರದುರ್ಗ' },
  'Dakshina Kannada': { lat: 12.91, lon: 74.86, kn: 'ದಕ್ಷಿಣ ಕನ್ನಡ' },
  'Davanagere': { lat: 14.47, lon: 75.92, kn: 'ದಾವಣಗೆರೆ' },
  'Dharwad': { lat: 15.46, lon: 75.01, kn: 'ಧಾರವಾಡ' },
  'Gadag': { lat: 15.43, lon: 75.63, kn: 'ಗದಗ' },
  'Hassan': { lat: 13.00, lon: 76.10, kn: 'ಹಾಸನ' },
  'Haveri': { lat: 14.79, lon: 75.40, kn: 'ಹಾವೇರಿ' },
  'Kalaburagi': { lat: 17.33, lon: 76.83, kn: 'ಕಲಬುರಗಿ' },
  'Kodagu': { lat: 12.42, lon: 75.74, kn: 'ಕೊಡಗು' },
  'Kolar': { lat: 13.14, lon: 78.13, kn: 'ಕೋಲಾರ' },
  'Koppal': { lat: 15.35, lon: 76.15, kn: 'ಕೊಪ್ಪಳ' },
  'Mandya': { lat: 12.52, lon: 76.90, kn: 'ಮಂಡ್ಯ' },
  'Mysuru': { lat: 12.30, lon: 76.65, kn: 'ಮೈಸೂರು' },
  'Raichur': { lat: 16.21, lon: 77.36, kn: 'ರಾಯಚೂರು' },
  'Ramanagara': { lat: 12.72, lon: 77.28, kn: 'ರಾಮನಗರ' },
  'Shivamogga': { lat: 13.93, lon: 75.57, kn: 'ಶಿವಮೊಗ್ಗ' },
  'Tumakuru': { lat: 13.34, lon: 77.10, kn: 'ತುಮಕೂರು' },
  'Udupi': { lat: 13.34, lon: 74.75, kn: 'ಉಡುಪಿ' },
  'Uttara Kannada': { lat: 14.62, lon: 74.84, kn: 'ಉತ್ತರ ಕನ್ನಡ' },
  'Vijayapura': { lat: 16.83, lon: 75.71, kn: 'ವಿಜಯಪುರ' },
  'Yadgir': { lat: 16.77, lon: 77.14, kn: 'ಯಾದಗಿರಿ' },
  'Vijayanagara': { lat: 15.27, lon: 76.39, kn: 'ವಿಜಯನಗರ' }
};

// Seed transporters for Karnataka regions
const LOCAL_TRANSPORTERS = [
  {
    dealer_id: 'TRP_KA_001',
    dealer_name: 'Annadatha Kisan Logistics & Fleet',
    contact_phone: '+91 94801 23456',
    whatsapp_number: '+91 94801 23456',
    district_base: 'Davanagere',
    rating: 4.9,
    trips_completed: 340,
    verified: true,
    vehicles: [
      {
        vehicle_id: 'VH_01',
        vehicle_name: 'Tata Ace Gold (Chota Hathi)',
        vehicle_type: 'CHOTA_HATHI',
        capacity_quintals: 15,
        base_fare_inr: 650,
        rate_per_km_inr: 24,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 4
      },
      {
        vehicle_id: 'VH_02',
        vehicle_name: 'Mahindra Bolero Maxi Truck Plus',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 3
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_002',
    dealer_name: 'Kaveri Green Express Logistics',
    contact_phone: '+91 98450 78901',
    whatsapp_number: '+91 98450 78901',
    district_base: 'Bengaluru Rural',
    rating: 4.8,
    trips_completed: 512,
    verified: true,
    vehicles: [
      {
        vehicle_id: 'VH_03',
        vehicle_name: 'Eicher Pro 2049 (14ft Canter)',
        vehicle_type: 'CANTER_TRUCK',
        capacity_quintals: 50,
        base_fare_inr: 1400,
        rate_per_km_inr: 38,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 2
      },
      {
        vehicle_id: 'VH_04',
        vehicle_name: 'Thermo King Reefer Cold-Van',
        vehicle_type: 'COLD_CHAIN_REEFER',
        capacity_quintals: 35,
        base_fare_inr: 1900,
        rate_per_km_inr: 46,
        is_refrigerated: true,
        cooling_spoilage_reduction_pct: 85,
        available_units_now: 2
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_003',
    dealer_name: 'Sahyadri Agri Freight Union',
    contact_phone: '+91 97412 45678',
    whatsapp_number: '+91 97412 45678',
    district_base: 'Shivamogga',
    rating: 4.7,
    trips_completed: 280,
    verified: true,
    vehicles: [
      {
        vehicle_id: 'VH_05',
        vehicle_name: 'Piaggio Ape Extra LDX',
        vehicle_type: 'THREE_WHEELER',
        capacity_quintals: 8,
        base_fare_inr: 400,
        rate_per_km_inr: 18,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 5
      },
      {
        vehicle_id: 'VH_06',
        vehicle_name: 'Mahindra Bolero Camper Cargo',
        vehicle_type: 'BOLERO_PICKUP',
        capacity_quintals: 25,
        base_fare_inr: 850,
        rate_per_km_inr: 28,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 3
      }
    ]
  },
  {
    dealer_id: 'TRP_KA_004',
    dealer_name: 'Basaveshwara Mandi Carriers',
    contact_phone: '+91 96110 33445',
    whatsapp_number: '+91 96110 33445',
    district_base: 'Belagavi',
    rating: 4.9,
    trips_completed: 410,
    verified: true,
    vehicles: [
      {
        vehicle_id: 'VH_07',
        vehicle_name: 'Tata Ace HT+',
        vehicle_type: 'CHOTA_HATHI',
        capacity_quintals: 15,
        base_fare_inr: 650,
        rate_per_km_inr: 24,
        is_refrigerated: false,
        cooling_spoilage_reduction_pct: 0,
        available_units_now: 3
      },
      {
        vehicle_id: 'VH_08',
        vehicle_name: 'Cold-Ride Multi-Temp Reefer',
        vehicle_type: 'COLD_CHAIN_REEFER',
        capacity_quintals: 35,
        base_fare_inr: 1900,
        rate_per_km_inr: 46,
        is_refrigerated: true,
        cooling_spoilage_reduction_pct: 85,
        available_units_now: 1
      }
    ]
  }
];

async function seedData() {
  console.log('--- Starting HarvestRoute Data Parsing & Seeding ---');
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV file not found at: ${CSV_PATH}`);
    process.exit(1);
  }

  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }

  const marketsMap = new Map();
  const cropsMap = new Map();
  const latestPriceMap = new Map(); // key: "market_name___crop_name" -> record

  const rl = readline.createInterface({
    input: fs.createReadStream(CSV_PATH),
    crlfDelay: Infinity
  });

  let rowCount = 0;

  for await (const line of rl) {
    rowCount++;
    if (rowCount === 1) continue; // Skip header

    // Quick parse CSV line
    // observation_id,market_id,market_name,district,market_town,latitude_town_proxy,longitude_town_proxy,crop_id,crop_name,commodity_group,reported_month,year,month,season_label,crop_calendar_season,min_price_inr_per_unit,modal_price_inr_per_unit,max_price_inr_per_unit,price_unit,arrivals_tonnes_est,market_demand_proxy_tonnes_est,supply_demand_ratio_est,market_purchase_capacity_tonnes_est,...
    const p = line.split(',');
    if (p.length < 23) continue;

    const marketId = p[1];
    const marketName = p[2];
    const district = p[3];
    const marketTown = p[4];
    const lat = parseFloat(p[5]);
    const lon = parseFloat(p[6]);
    const cropId = p[7];
    const cropName = p[8];
    const commodityGroup = p[9];
    const reportedMonth = p[10];
    const year = parseInt(p[11], 10);
    const month = parseInt(p[12], 10);
    const seasonLabel = p[13];
    const minPrice = parseFloat(p[15]);
    const modalPrice = parseFloat(p[16]);
    const maxPrice = parseFloat(p[17]);
    const arrivals = parseFloat(p[19]) || 50;
    const demand = parseFloat(p[20]) || 50;
    const sdRatio = parseFloat(p[21]) || 1.0;
    const capacity = parseFloat(p[22]) || 100;

    // 1. Markets
    if (!marketsMap.has(marketName)) {
      const isTerminal = ['Yeshwanthpur Market Yard', 'Bengaluru Market Yard', 'Kolar APMC', 'Hubballi APMC'].includes(marketName);
      marketsMap.set(marketName, {
        market_id: marketId,
        market_name: marketName,
        district: district,
        market_town: marketTown,
        latitude: lat,
        longitude: lon,
        apmc_cess_rate: 0.015,
        hamali_rate_per_quintal: 25,
        weighbridge_fee_flat: 50,
        is_terminal_market: isTerminal,
        operating_hours: isTerminal ? "04:30 AM - 02:00 PM" : "06:00 AM - 12:30 PM"
      });
    }

    // 2. Crops
    if (!cropsMap.has(cropName)) {
      const meta = CROP_PERISHABILITY[cropName] || {};
      cropsMap.set(cropName, {
        crop_id: cropId,
        crop_name: cropName,
        commodity_group: commodityGroup,
        perishability_tier: meta.tier || 'MEDIUM',
        base_spoilage_rate_per_hour: meta.basePerHour || 0.002,
        shelf_life_days: meta.shelfDays || 14,
        kannada_name: meta.nameKn || cropName,
        hindi_name: meta.nameHi || cropName,
        icon: meta.icon || 'sprout'
      });
    }

    // 3. Keep latest market price by date (year * 100 + month)
    const priceKey = `${marketName}___${cropName}`;
    const dateScore = year * 100 + month;
    const existing = latestPriceMap.get(priceKey);

    if (!existing || dateScore > existing.dateScore) {
      latestPriceMap.set(priceKey, {
        market_id: marketId,
        market_name: marketName,
        district: district,
        crop_id: cropId,
        crop_name: cropName,
        reported_month: reportedMonth,
        year: year,
        month: month,
        dateScore: dateScore,
        season_label: seasonLabel,
        min_price_inr_per_unit: minPrice,
        modal_price_inr_per_unit: modalPrice,
        max_price_inr_per_unit: maxPrice,
        price_unit: "INR_per_quintal",
        arrivals_tonnes_est: arrivals,
        market_demand_proxy_tonnes_est: demand,
        supply_demand_ratio_est: sdRatio,
        market_purchase_capacity_tonnes_est: capacity
      });
    }
  }

  // 4. Register all comprehensive Karnataka APMCs across all 31 districts
  let newMarketIdSeq = 1000;
  for (const reg of ALL_KARNATAKA_APMCS) {
    if (!marketsMap.has(reg.market_name)) {
      newMarketIdSeq++;
      marketsMap.set(reg.market_name, {
        market_id: `MKT_KA_${newMarketIdSeq}`,
        market_name: reg.market_name,
        district: reg.district,
        market_town: reg.market_town,
        latitude: reg.latitude,
        longitude: reg.longitude,
        apmc_cess_rate: 0.015,
        hamali_rate_per_quintal: 25,
        weighbridge_fee_flat: 50,
        is_terminal_market: reg.is_terminal_market || false,
        operating_hours: reg.is_terminal_market ? "04:30 AM - 02:00 PM" : "06:00 AM - 12:30 PM",
        payment_settlement: "Direct Bank Transfer / Immediate Cash"
      });
    } else {
      const existing = marketsMap.get(reg.market_name);
      if (reg.is_terminal_market) existing.is_terminal_market = true;
    }
  }

  // 5. Synthesize Prices for Uncovered APMCs using "Nearest District Benchmark"
  const cropsList = Array.from(cropsMap.values());
  const marketsList = Array.from(marketsMap.values());

  console.log(`Enriched APMC dataset to ${marketsList.length} markets across all 31 Karnataka districts.`);
  console.log(`Synthesizing complete price matrix for ${marketsList.length} APMCs across ${cropsList.length} crops using Nearest District Benchmark...`);

  for (const crop of cropsList) {
    // 1. Gather all direct sources for this crop
    const directSources = [];
    for (const p of latestPriceMap.values()) {
      if (p.crop_name === crop.crop_name && p.modal_price_inr_per_unit > 0) {
        const m = marketsMap.get(p.market_name);
        if (m) {
          directSources.push({ price: p, market: m });
        }
      }
    }

    // 2. Gather group fallback sources if needed
    const groupSources = [];
    if (directSources.length === 0) {
      for (const p of latestPriceMap.values()) {
        const cMeta = cropsMap.get(p.crop_name);
        if (cMeta && cMeta.commodity_group === crop.commodity_group && p.modal_price_inr_per_unit > 0) {
          const m = marketsMap.get(p.market_name);
          if (m) {
            groupSources.push({ price: p, market: m });
          }
        }
      }
    }

    const availableSources = directSources.length > 0 ? directSources : groupSources;

    // 3. For each APMC, resolve price
    for (const mkt of marketsList) {
      const priceKey = `${mkt.market_name}___${crop.crop_name}`;
      if (!latestPriceMap.has(priceKey)) {
        if (availableSources.length === 0) continue;

        // Find nearest market source
        let nearest = availableSources[0];
        let minDist = haversineDistance(mkt.latitude, mkt.longitude, nearest.market.latitude, nearest.market.longitude);

        for (let i = 1; i < availableSources.length; i++) {
          const d = haversineDistance(mkt.latitude, mkt.longitude, availableSources[i].market.latitude, availableSources[i].market.longitude);
          if (d < minDist) {
            minDist = d;
            nearest = availableSources[i];
          }
        }

        const base = nearest.price;
        // Minor realistic spatial pricing adjustment:
        // Terminal metro market premium vs regional taluk sub-yard
        let priceScale = 1.0;
        if (mkt.is_terminal_market && !nearest.market.is_terminal_market) {
          priceScale = 1.025; // +2.5% at major terminal market
        } else if (!mkt.is_terminal_market && nearest.market.is_terminal_market) {
          priceScale = 0.98; // -2.0% at regional taluk yard
        }

        const modalPrice = Math.round(base.modal_price_inr_per_unit * priceScale);
        const minPrice = Math.round(base.min_price_inr_per_unit * priceScale);
        const maxPrice = Math.round(base.max_price_inr_per_unit * priceScale);

        latestPriceMap.set(priceKey, {
          market_id: mkt.market_id,
          market_name: mkt.market_name,
          district: mkt.district,
          crop_id: crop.crop_id,
          crop_name: crop.crop_name,
          reported_month: base.reported_month || "Oct-2026",
          year: base.year || 2026,
          month: base.month || 10,
          dateScore: base.dateScore || 202610,
          season_label: base.season_label || "Kharif",
          min_price_inr_per_unit: minPrice,
          modal_price_inr_per_unit: modalPrice,
          max_price_inr_per_unit: maxPrice,
          price_unit: "INR_per_quintal",
          arrivals_tonnes_est: Math.round((base.arrivals_tonnes_est || 50) * (mkt.is_terminal_market ? 1.4 : 0.7)),
          market_demand_proxy_tonnes_est: Math.round((base.market_demand_proxy_tonnes_est || 50) * (mkt.is_terminal_market ? 1.5 : 0.7)),
          supply_demand_ratio_est: base.supply_demand_ratio_est || 1.0,
          market_purchase_capacity_tonnes_est: Math.round((base.market_purchase_capacity_tonnes_est || 100) * (mkt.is_terminal_market ? 1.4 : 0.8)),
          price_source: "NEAREST_DISTRICT_BENCHMARK",
          reference_market: nearest.market.market_name,
          reference_district: nearest.market.district,
          reference_distance_km: Math.round(minDist * 10) / 10
        });
      } else {
        const p = latestPriceMap.get(priceKey);
        p.price_source = "REPORTED";
        p.reference_market = p.market_name;
        p.reference_district = p.district;
        p.reference_distance_km = 0;
      }
    }
  }

  const pricesList = Array.from(latestPriceMap.values());

  console.log(`Parsed ${rowCount} rows from CSV:`);
  console.log(`- Total Karnataka APMCs: ${marketsList.length} across 31 districts`);
  console.log(`- Crops: ${cropsList.length}`);
  console.log(`- Total (Market x Crop) comprehensive price matrix: ${pricesList.length} records`);

  // Create lookup dictionary for fast in-memory analysis
  const pricesLookup = {};
  for (const p of pricesList) {
    pricesLookup[`${p.market_name}___${p.crop_name}`] = p;
  }

  // Save to JSON cache for fast in-memory fallback
  const cacheData = {
    districtCenters: DISTRICT_CENTERS,
    markets: marketsList,
    crops: cropsList,
    transporters: LOCAL_TRANSPORTERS,
    pricesLookup: pricesLookup,
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cacheData, null, 2));
  console.log(`Successfully wrote pre-indexed JSON cache to ${CACHE_FILE}`);

  // Try MongoDB connection if available
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/harvestroute';
  console.log(`Attempting MongoDB seed connection: ${mongoUri}...`);

  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 3000 });
    console.log('Connected to MongoDB! Seeding collections...');

    await Crop.deleteMany({});
    await Crop.insertMany(cropsList);
    console.log(`Seeded ${cropsList.length} crops in MongoDB.`);

    await Market.deleteMany({});
    await Market.insertMany(marketsList);
    console.log(`Seeded ${marketsList.length} markets in MongoDB.`);

    await MarketPrice.deleteMany({});
    await MarketPrice.insertMany(pricesList);
    console.log(`Seeded ${pricesList.length} market prices in MongoDB.`);

    await Transporter.deleteMany({});
    await Transporter.insertMany(LOCAL_TRANSPORTERS);
    console.log(`Seeded ${LOCAL_TRANSPORTERS.length} transporter dealers in MongoDB.`);

    await mongoose.disconnect();
    console.log('MongoDB seeding completed successfully!');
  } catch (err) {
    console.warn(`MongoDB not currently reachable (${err.message}). Pre-indexed JSON cache is ready and fully active for the server!`);
  }

  return cacheData;
}

if (require.main === module) {
  seedData()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed error:', err);
      process.exit(1);
    });
}

module.exports = { seedData, DISTRICT_CENTERS, LOCAL_TRANSPORTERS };

