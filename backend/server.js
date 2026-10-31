require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const https = require('https');
const { 
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
  isDbConnected
} = require('./services/dbService');
const { runHarvestRouteAnalysis, VEHICLE_CATALOG } = require('./services/calculationEngine');
const { KARNATAKA_DISTRICT_TALUKS } = require('./data/karnatakaTaluks');
const { getRoadDistance } = require('./services/geoService');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize database connection
initDatabase();

// 1. Health & Status
app.get('/api/status', async (req, res) => {
  const crops = await getCrops();
  const markets = await getMarkets();
  const prices = await getPricesLookup();
  const transporters = await getTransporters();
  const emptyTrucks = await getPoolRequests();

  res.json({
    status: 'ONLINE',
    service: 'HarvestRoute Market Intelligence & Empty Truck Collaboration',
    database: {
      type: 'MongoDB',
      connected: isDbConnected(),
      mode: isDbConnected() ? 'MongoDB Active' : 'High-Speed Memory Cache Active'
    },
    dataset: {
      totalCrops: crops.length,
      totalMarkets: markets.length,
      totalPriceRecords: Object.keys(prices).length,
      totalTransporterDealers: transporters.length,
      availableEmptyTrucks: emptyTrucks.length
    }
  });
});

// 2. Crops List
app.get('/api/crops', async (req, res) => {
  try {
    const crops = await getCrops();
    res.json(crops);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Origins (Districts) List
app.get('/api/origins', (req, res) => {
  const centers = getDistrictCenters();
  const list = Object.entries(centers).map(([name, val]) => ({
    district: name,
    kannada_name: val.kn,
    latitude: val.lat,
    longitude: val.lon,
    taluks: KARNATAKA_DISTRICT_TALUKS[name] || []
  }));
  res.json(list);
});

// 4. Transporters & Vehicle Catalog
app.get('/api/transporters', async (req, res) => {
  try {
    const dealers = await getTransporters();
    res.json({
      vehicleCatalog: VEHICLE_CATALOG,
      dealers
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Core Route & Net Return Analysis Engine
app.post('/api/analyze', async (req, res) => {
  try {
    const {
      cropName = 'Tomato',
      quantityQuintals = 20,
      originDistrict = 'Davanagere',
      originTaluk = '',
      originVillage = '',
      originLat: inputLat,
      originLon: inputLon,
      vehicleType = null,
      freshnessHours = 6,
      fuelRateMultiplier = 1.0,
      spoilageMultiplier = 1.0,
      cessRateOverride = null,
      speedKmph = 40
    } = req.body;

    const markets = await getMarkets();
    const pricesLookup = await getPricesLookup();
    const districtCenters = getDistrictCenters();

    let originLat = inputLat ? parseFloat(inputLat) : null;
    let originLon = inputLon ? parseFloat(inputLon) : null;

    if (!originLat || !originLon) {
      const taluks = KARNATAKA_DISTRICT_TALUKS[originDistrict] || [];
      let matchTaluk = taluks.find(t => originTaluk && t.name.toLowerCase() === originTaluk.toLowerCase());
      if (!matchTaluk) {
        matchTaluk = taluks.find(t => 
          originTaluk && (t.name.toLowerCase().startsWith(originTaluk.toLowerCase()) || originTaluk.toLowerCase().startsWith(t.name.toLowerCase()))
        );
      }
      if (matchTaluk) {
        // Resolve exact village coordinates if village is matched
        let matchVillage = (matchTaluk.villages || []).find(v =>
          originVillage && v.name.toLowerCase() === originVillage.toLowerCase()
        );
        if (!matchVillage) {
          matchVillage = (matchTaluk.villages || []).find(v =>
            originVillage && (v.name.toLowerCase().includes(originVillage.toLowerCase()) || originVillage.toLowerCase().includes(v.name.toLowerCase()))
          );
        }
        if (matchVillage) {
          originLat = matchVillage.lat;
          originLon = matchVillage.lon;
        } else {
          originLat = matchTaluk.lat;
          originLon = matchTaluk.lon;
        }
      } else {
        const origin = districtCenters[originDistrict] || districtCenters['Davanagere'];
        originLat = origin.lat;
        originLon = origin.lon;
      }
    }

    const analysisResult = runHarvestRouteAnalysis({
      markets,
      marketPricesMap: pricesLookup,
      cropName,
      quantityQuintals: parseFloat(quantityQuintals),
      originDistrict,
      originTaluk,
      originVillage,
      originLat,
      originLon,
      vehicleType,
      freshnessHours: parseFloat(freshnessHours),
      fuelRateMultiplier: parseFloat(fuelRateMultiplier),
      spoilageMultiplier: parseFloat(spoilageMultiplier),
      cessRateOverride: cessRateOverride ? parseFloat(cessRateOverride) : null,
      speedKmph: parseFloat(speedKmph)
    });

    res.json(analysisResult);
  } catch (err) {
    console.error('Analysis error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 6. Save Farmer Scenario / Receipt (No Login)
app.post('/api/save-analysis', async (req, res) => {
  try {
    const data = req.body;
    const record = {
      analysis_id: `HR-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...data,
      created_at: new Date()
    };
    const saved = await saveAnalysisRecord(record);
    res.json({ success: true, record: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 7.5 Multilingual High-Quality TTS Proxy (Kannada, Hindi, English)
app.get('/api/tts', (req, res) => {
  try {
    const { text, lang = 'kn' } = req.query;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text query parameter is required' });
    }

    const tl = lang === 'kn' ? 'kn' : lang === 'hi' ? 'hi' : 'en';
    const cleanText = text.trim().slice(0, 200);
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${tl}&client=tw-ob`;

    const proxyReq = https.get(googleTtsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/'
      }
    }, (googleRes) => {
      if (googleRes.statusCode !== 200) {
        return res.status(googleRes.statusCode).json({ error: 'TTS Provider Error' });
      }
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      googleRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      console.warn('TTS proxy request error:', err.message);
      res.status(502).json({ error: 'Failed to fetch audio stream' });
    });
  } catch (err) {
    console.error('TTS handler error:', err);
    res.status(500).json({ error: err.message });
  }
});

// 7. Get Recent Saved Scenarios
app.get('/api/saved-analyses', async (req, res) => {
  try {
    const list = await getSavedAnalysesList();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==============================================================
// 8. EMPTY TRUCK COLLABORATION (DIRECT PHONE CONTACT ONLY)
// ==============================================================

// Get empty trucks only (empty capacity > 0)
app.get('/api/pools', async (req, res) => {
  try {
    const { district, crop } = req.query;
    const emptyTrucks = await getPoolRequests({ district, crop });
    res.json(emptyTrucks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single empty truck details
app.get('/api/pools/:id', async (req, res) => {
  try {
    const truck = await getPoolById(req.params.id);
    if (!truck) return res.status(404).json({ error: 'Truck request not found' });
    res.json(truck);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a new empty truck collaboration request with phone number
app.post('/api/pools', async (req, res) => {
  try {
    const {
      creator_farmer_name,
      creator_phone,
      origin_district,
      origin_village,
      destination_market,
      crop_name,
      quantity_quintals,
      vehicle_type = 'BOLERO_PICKUP',
      dispatch_date,
      dispatch_time,
      notes
    } = req.body;

    if (!creator_farmer_name || !creator_phone || !origin_district || !destination_market || !quantity_quintals) {
      return res.status(400).json({ error: 'Please enter your name, contact phone, and route details.' });
    }

    const vehicle = VEHICLE_CATALOG[vehicle_type] || VEHICLE_CATALOG['BOLERO_PICKUP'];
    const districtCenters = getDistrictCenters();
    const markets = await getMarkets();

    const originCenter = districtCenters[origin_district] || districtCenters['Davanagere'];
    const targetMkt = markets.find(m => m.market_name.toLowerCase() === destination_market.toLowerCase()) 
      || markets[0];

    const distKm = getRoadDistance(originCenter.lat, originCenter.lon, targetMkt.latitude, targetMkt.longitude);
    const tollSurcharge = distKm > 80 ? Math.round((distKm / 60) * 120) : 0;
    const totalFreight = Math.round(vehicle.baseFare + (distKm * vehicle.ratePerKm) + tollSurcharge);

    const poolRecord = await createPoolRequest({
      creator_farmer_name,
      creator_phone,
      origin_district,
      origin_village,
      destination_market: targetMkt.market_name,
      destination_district: targetMkt.district,
      crop_name: crop_name || 'Mixed Produce',
      quantity_quintals: parseFloat(quantity_quintals),
      vehicle_type,
      vehicle_name: vehicle.name,
      vehicle_capacity_quintals: vehicle.capacity,
      trip_distance_km: distKm,
      total_freight_inr: totalFreight,
      dispatch_date,
      dispatch_time,
      notes
    });

    res.status(201).json({ success: true, pool: poolRecord });
  } catch (err) {
    console.error('Create empty truck request error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Calculate Solo vs Pooled Savings Comparison
app.post('/api/pools/calculate-savings', async (req, res) => {
  try {
    const { quantityQuintals = 6, distanceKm = 80 } = req.body;
    const qty = parseFloat(quantityQuintals);
    const dist = parseFloat(distanceKm);

    // Solo scenario: Farmer must hire minimal vehicle (e.g. 3-wheeler or Chota Hathi)
    let soloVehicle = VEHICLE_CATALOG['THREE_WHEELER'];
    if (qty > 8) soloVehicle = VEHICLE_CATALOG['CHOTA_HATHI'];
    if (qty > 15) soloVehicle = VEHICLE_CATALOG['BOLERO_PICKUP'];

    const soloFreight = soloVehicle.baseFare + (dist * soloVehicle.ratePerKm);
    const soloRatePerQtl = Math.round(soloFreight / qty);

    // Pooled scenario: 25-qtl Bolero shared to full capacity with neighbors
    const poolVehicle = VEHICLE_CATALOG['BOLERO_PICKUP'];
    const pooledFullFreight = poolVehicle.baseFare + (dist * poolVehicle.ratePerKm);
    const pooledRatePerQtl = Math.round(pooledFullFreight / poolVehicle.capacity);
    const farmerPooledExpense = Math.round(qty * pooledRatePerQtl);

    const cashSaved = Math.max(0, soloFreight - farmerPooledExpense);
    const percentSaved = Math.round((cashSaved / soloFreight) * 100);

    res.json({
      lotQuantityQuintals: qty,
      distanceKm: dist,
      soloScenario: {
        vehicleName: soloVehicle.name,
        totalCostInr: Math.round(soloFreight),
        costPerQuintalInr: soloRatePerQtl
      },
      pooledScenario: {
        vehicleName: poolVehicle.name,
        sharedCostInr: farmerPooledExpense,
        costPerQuintalInr: pooledRatePerQtl
      },
      savings: {
        cashSavedInr: cashSaved,
        percentSaved: percentSaved
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 9. Serve Frontend Static Production Build and Public Assets
const distPath = path.resolve(__dirname, '../frontend/dist');
const publicPath = path.resolve(__dirname, '../frontend/public');
app.use(express.static(distPath));
app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🌾 HarvestRoute Full-Stack Server running on port ${PORT}`);
  console.log(`Web App & API available at: http://localhost:${PORT}`);
  console.log(`===============================================`);
});
