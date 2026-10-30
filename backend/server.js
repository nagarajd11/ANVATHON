require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { 
  initDatabase, 
  getCrops, 
  getMarkets, 
  getPricesLookup, 
  getTransporters, 
  getDistrictCenters,
  saveAnalysisRecord,
  getSavedAnalysesList,
  isDbConnected
} = require('./services/dbService');
const { runHarvestRouteAnalysis, VEHICLE_CATALOG } = require('./services/calculationEngine');

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

  res.json({
    status: 'ONLINE',
    service: 'HarvestRoute Market Intelligence Engine',
    database: {
      type: 'MongoDB',
      connected: isDbConnected(),
      mode: isDbConnected() ? 'MongoDB Active' : 'High-Speed Memory Cache Active'
    },
    dataset: {
      totalCrops: crops.length,
      totalMarkets: markets.length,
      totalPriceRecords: Object.keys(prices).length,
      totalTransporterDealers: transporters.length
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
    longitude: val.lon
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
      vehicleType = 'BOLERO_PICKUP',
      freshnessHours = 6,
      fuelRateMultiplier = 1.0,
      spoilageMultiplier = 1.0,
      cessRateOverride = null,
      speedKmph = 40
    } = req.body;

    const markets = await getMarkets();
    const pricesLookup = await getPricesLookup();
    const districtCenters = getDistrictCenters();

    const origin = districtCenters[originDistrict] || districtCenters['Davanagere'];
    const originLat = origin.lat;
    const originLon = origin.lon;

    const analysisResult = runHarvestRouteAnalysis({
      markets,
      marketPricesMap: pricesLookup,
      cropName,
      quantityQuintals: parseFloat(quantityQuintals),
      originDistrict,
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

// 7. Get Recent Saved Scenarios
app.get('/api/saved-analyses', async (req, res) => {
  try {
    const list = await getSavedAnalysesList();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 8. Serve Frontend Static Production Build
const distPath = path.resolve(__dirname, '../frontend/dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🌾 HarvestRoute Full-Stack Server running on port ${PORT}`);
  console.log(`Web App & API available at: http://localhost:${PORT}`);
  console.log(`===============================================`);
});
