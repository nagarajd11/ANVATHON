const { getRoadDistance, getTransitDurationHours } = require('./geoService');

// Crop perishability database
const CROP_PERISHABILITY = {
  'Tomato': { tier: 'HIGH', basePerHour: 0.007, shelfDays: 4, nameKn: 'ಟೊಮೇಟೊ', nameHi: 'टमाटर', icon: 'apple' },
  'Banana': { tier: 'HIGH', basePerHour: 0.005, shelfDays: 5, nameKn: 'ಬಾಳೆಹಣ್ಣು', nameHi: 'ಕೆಲಾ', icon: 'banana' },
  'Mango': { tier: 'HIGH', basePerHour: 0.006, shelfDays: 6, nameKn: 'ಮಾವಿನಹಣ್ಣು', nameHi: 'आम', icon: 'citrus' },
  'Onion': { tier: 'MEDIUM', basePerHour: 0.0012, shelfDays: 20, nameKn: 'ಈರುಳ್ಳಿ', nameHi: 'प्याज', icon: 'onion' },
  'Potato': { tier: 'MEDIUM', basePerHour: 0.001, shelfDays: 30, nameKn: 'ಆಲೂಗಡ್ಡೆ', nameHi: 'आलू', icon: 'potato' },
  'Garlic': { tier: 'MEDIUM', basePerHour: 0.0008, shelfDays: 45, nameKn: 'ಬೆಳ್ಳುಳ್ಳಿ', nameHi: 'लहसुन', icon: 'garlic' },
  'Ginger': { tier: 'MEDIUM', basePerHour: 0.001, shelfDays: 25, nameKn: 'ಶುಂಠಿ', nameHi: 'अदरक', icon: 'ginger' },
  'Dry Chilli': { tier: 'LOW', basePerHour: 0.0004, shelfDays: 60, nameKn: 'ಒಣ ಮೆಣಸಿನಕಾಯಿ', nameHi: 'सूखी मिर्च', icon: 'chilli' },
  'Turmeric': { tier: 'LOW', basePerHour: 0.0003, shelfDays: 90, nameKn: 'ಅರಿಶಿನ', nameHi: 'हल्दी', icon: 'sparkles' },
  'Black Pepper': { tier: 'LOW', basePerHour: 0.0002, shelfDays: 120, nameKn: 'ಕರಿಮೆಣಸು', nameHi: 'काली मिर्च', icon: 'nut' },
  'Cardamom': { tier: 'LOW', basePerHour: 0.0002, shelfDays: 120, nameKn: 'ಏಲಕ್ಕಿ', nameHi: 'इलायची', icon: 'leaf' },
  'Cashew': { tier: 'LOW', basePerHour: 0.0002, shelfDays: 90, nameKn: 'ಗೋಡಂಬಿ', nameHi: 'काजू', icon: 'nut' },
  'Coffee': { tier: 'LOW', basePerHour: 0.0002, shelfDays: 180, nameKn: 'ಕಾಫಿ', nameHi: 'कॉफ़ी', icon: 'coffee' },
  'Cocoa': { tier: 'LOW', basePerHour: 0.0003, shelfDays: 90, nameKn: 'ಕೋಕೋ', nameHi: 'कोको', icon: 'box' },
  'Tea': { tier: 'LOW', basePerHour: 0.0003, shelfDays: 90, nameKn: 'ಟೀ', nameHi: 'चाय', icon: 'cup-soda' },
  'Arecanut': { tier: 'LOW', basePerHour: 0.0002, shelfDays: 120, nameKn: 'ಅಡಿಕೆ', nameHi: 'ಸುಪಾರಿ', icon: 'nut' },
  'Coconut': { tier: 'LOW', basePerHour: 0.0003, shelfDays: 45, nameKn: 'ತೆಂಗಿನಕಾಯಿ', nameHi: 'नारियल', icon: 'circle' },
  'Paddy': { tier: 'NEGLIGIBLE', basePerHour: 0.0001, shelfDays: 180, nameKn: 'ಭತ್ತ', nameHi: 'धान', icon: 'wheat' },
  'Ragi': { tier: 'NEGLIGIBLE', basePerHour: 0.0001, shelfDays: 240, nameKn: 'ರಾಗಿ', nameHi: 'रागी', icon: 'wheat' },
  'Maize': { tier: 'NEGLIGIBLE', basePerHour: 0.00012, shelfDays: 150, nameKn: 'ಮೆಕ್ಕೆಜೋಳ', nameHi: 'मक्का', icon: 'corn' },
  'Cotton': { tier: 'NEGLIGIBLE', basePerHour: 0.00008, shelfDays: 180, nameKn: 'ಹತ್ತಿ', nameHi: 'कपास', icon: 'feather' },
  'Blackgram': { tier: 'NEGLIGIBLE', basePerHour: 0.0001, shelfDays: 180, nameKn: 'ಉದ್ದಿನ ಬೇಳೆ', nameHi: 'उड़द', icon: 'beans' },
  'Chickpea': { tier: 'NEGLIGIBLE', basePerHour: 0.0001, shelfDays: 180, nameKn: 'ಕಡಲೆ', nameHi: 'चना', icon: 'beans' },
  'Greengram': { tier: 'NEGLIGIBLE', basePerHour: 0.0001, shelfDays: 180, nameKn: 'ಹೆಸರು ಕಾಳು', nameHi: 'मूंग', icon: 'beans' },
  'Groundnut': { tier: 'NEGLIGIBLE', basePerHour: 0.0001, shelfDays: 120, nameKn: 'ಕಡಲೆಕಾಯಿ', nameHi: 'मूंगफली', icon: 'nut' },
  'Redgram': { tier: 'NEGLIGIBLE', basePerHour: 0.0001, shelfDays: 180, nameKn: 'ತೊಗರಿ ಬೇಳೆ', nameHi: 'अरहर / तूर', icon: 'beans' },
  'Sugarcane': { tier: 'MEDIUM', basePerHour: 0.0018, shelfDays: 5, nameKn: 'ಕಬ್ಬು', nameHi: 'गन्ना', icon: 'activity' },
  'Sunflower': { tier: 'NEGLIGIBLE', basePerHour: 0.0001, shelfDays: 120, nameKn: 'ಸೂರ್ಯಕಾಂತಿ', nameHi: 'सूरजमुखी', icon: 'sun' }
};

// Standard vehicle specifications
const VEHICLE_CATALOG = {
  'THREE_WHEELER': {
    name: 'Auto / Piaggio Ape',
    nameKn: 'ಆಟೋ / ಪಿಯಾಜಿಯೊ ಏಪ್',
    capacity: 8,
    baseFare: 400,
    ratePerKm: 18,
    isReefer: false,
    coolingBenefitPct: 0
  },
  'CHOTA_HATHI': {
    name: 'Tata Ace (Chota Hathi)',
    nameKn: 'ಟಾಟಾ ಏಸ್ (ಛೋಟಾ ಹಾತಿ)',
    capacity: 15,
    baseFare: 650,
    ratePerKm: 24,
    isReefer: false,
    coolingBenefitPct: 0
  },
  'BOLERO_PICKUP': {
    name: 'Mahindra Bolero Maxi Truck',
    nameKn: 'ಮಹೀಂದ್ರಾ ಬೊಲೆರೋ ಮ್ಯಾಕ್ಸಿ ಟ್ರಕ್',
    capacity: 25,
    baseFare: 850,
    ratePerKm: 28,
    isReefer: false,
    coolingBenefitPct: 0
  },
  'CANTER_TRUCK': {
    name: 'Eicher 14ft Canter',
    nameKn: 'ಐಷರ್ 14 ಅಡಿ ಕ್ಯಾಂಟರ್',
    capacity: 50,
    baseFare: 1400,
    ratePerKm: 38,
    isReefer: false,
    coolingBenefitPct: 0
  },
  'COLD_CHAIN_REEFER': {
    name: 'Insulated Cold-Van (Reefer)',
    nameKn: 'ಕೋಲ್ಡ್ ಚೈನ್ ಶೀತಲೀಕೃತ ವಾಹನ',
    capacity: 35,
    baseFare: 1900,
    ratePerKm: 46,
    isReefer: true,
    coolingBenefitPct: 0.85 // Eliminates 85% of transit decay
  }
};

/**
 * Calculates net return for a single market candidate
 */
function calculateMarketNetReturn({
  market,
  marketPrice,
  cropName,
  quantityQuintals,
  originLat,
  originLon,
  vehicleType = 'BOLERO_PICKUP',
  freshnessHours = 6,
  // Sensitivity adjustment overrides
  fuelRateMultiplier = 1.0,
  spoilageMultiplier = 1.0,
  cessRateOverride = null,
  speedKmph = 40
}) {
  const cropConfig = CROP_PERISHABILITY[cropName] || {
    tier: 'MEDIUM',
    basePerHour: 0.002,
    shelfDays: 14,
    nameKn: cropName,
    nameHi: cropName
  };

  const vehicle = VEHICLE_CATALOG[vehicleType] || VEHICLE_CATALOG['BOLERO_PICKUP'];

  // 1. Distance & Transit time
  const roadDistanceKm = getRoadDistance(originLat, originLon, market.latitude, market.longitude);
  const transitHours = getTransitDurationHours(roadDistanceKm, speedKmph);

  // 2. Harvest Age Quality Discount on Mandi Auction Price
  // Real-world APMC dynamics: older perishable produce gets discounted at auction due to softening/grade drop.
  const baselineModalPrice = marketPrice.modal_price_inr_per_unit;
  
  let freshnessDiscountPct = 0;
  if (freshnessHours > 6) {
    if (cropConfig.tier === 'HIGH') {
      // High perishables (Tomato, Banana, Mango): severe discount when harvested 24h-48h ago
      freshnessDiscountPct = freshnessHours <= 24 ? 0.08 : 0.22;
    } else if (cropConfig.tier === 'MEDIUM') {
      // Medium perishables (Onion, Potato, Garlic, Ginger, Sugarcane)
      freshnessDiscountPct = freshnessHours <= 24 ? 0.03 : 0.08;
    } else {
      // Low / Negligible perishables (Grains, Pulses, Spices)
      freshnessDiscountPct = freshnessHours <= 24 ? 0 : 0.01;
    }
  }

  // Realized Mandi Price per unit
  const realizedPricePerUnit = Math.round(baselineModalPrice * (1 - freshnessDiscountPct));
  const grossRevenue = Math.round(quantityQuintals * realizedPricePerUnit);

  // 3. Transport Cost
  const tripsRequired = Math.ceil(quantityQuintals / vehicle.capacity);
  const baseTransportFare = vehicle.baseFare * tripsRequired;
  const mileageCost = roadDistanceKm * vehicle.ratePerKm * fuelRateMultiplier * tripsRequired;
  // Toll / highway surcharge for distances > 80km
  const tollSurcharge = roadDistanceKm > 80 ? Math.round((roadDistanceKm / 60) * 120 * tripsRequired) : 0;
  const totalTransportCost = Math.round(baseTransportFare + mileageCost + tollSurcharge);

  // 4. Spoilage Loss Calculation
  // Exponential decay acceleration with age at harvest
  const ageFactor = 1 + (freshnessHours / (cropConfig.shelfDays * 24)) * 1.5;
  const reeferFactor = vehicle.isReefer ? (1 - vehicle.coolingBenefitPct) : 1.0;
  
  const decayRate = cropConfig.basePerHour * transitHours * ageFactor * spoilageMultiplier * reeferFactor;
  // Cap max spoilage to 35% in realistic worst cases
  const effectiveSpoilagePct = Math.min(0.35, Math.max(0.001, decayRate));
  const spoilageLossInr = Math.round(grossRevenue * effectiveSpoilagePct);
  const effectiveSpoilageQuantityQtl = Math.round(quantityQuintals * effectiveSpoilagePct * 100) / 100;

  // 5. APMC Market Fees & Hamali (Unloading & Weighing)
  const cessRate = cessRateOverride !== null ? cessRateOverride : (market.apmc_cess_rate || 0.015);
  const apmcCessInr = Math.round(grossRevenue * cessRate);
  const hamaliRate = market.hamali_rate_per_quintal || 25;
  const hamaliInr = Math.round(quantityQuintals * hamaliRate);
  const weighbridgeFeeInr = market.weighbridge_fee_flat || 50;
  const totalMarketFeesInr = apmcCessInr + hamaliInr + weighbridgeFeeInr;

  // 6. Capacity Risk / Supply-Demand Ratio Check
  const arrivals = marketPrice.arrivals_tonnes_est || 50;
  const capacity = marketPrice.market_purchase_capacity_tonnes_est || 100;
  const capacityUtilPct = Math.round((arrivals / Math.max(1, capacity)) * 100);
  const hasGlutRisk = arrivals > capacity * 1.15;

  // 7. Net Take-Home Return
  const totalDeductionsInr = totalTransportCost + spoilageLossInr + totalMarketFeesInr;
  const netReturnInr = grossRevenue - totalDeductionsInr;
  const netReturnPerQuintal = Math.round((netReturnInr / quantityQuintals) * 10) / 10;
  const profitMarginPct = Math.round((netReturnInr / grossRevenue) * 1000) / 10;

  return {
    marketId: market.market_id,
    marketName: market.market_name,
    district: market.district,
    marketTown: market.market_town,
    latitude: market.latitude,
    longitude: market.longitude,
    roadDistanceKm,
    transitHours,
    modalPrice: realizedPricePerUnit,
    baselineModalPrice,
    freshnessDiscountPct: Math.round(freshnessDiscountPct * 100),
    freshnessHours,
    minPrice: marketPrice.min_price_inr_per_unit,
    maxPrice: marketPrice.max_price_inr_per_unit,
    grossRevenue,
    vehicleUsed: {
      type: vehicleType,
      name: vehicle.name,
      capacity: vehicle.capacity,
      tripsRequired,
      isReefer: vehicle.isReefer
    },
    costs: {
      transportCost: totalTransportCost,
      transportBreakdown: {
        baseFare: baseTransportFare,
        mileageCost: Math.round(mileageCost),
        tollSurcharge,
        tripsRequired
      },
      spoilageLoss: spoilageLossInr,
      spoilagePct: Math.round(effectiveSpoilagePct * 1000) / 10,
      spoilageQuantityQtl: effectiveSpoilageQuantityQtl,
      marketFees: totalMarketFeesInr,
      marketFeesBreakdown: {
        apmcCess: apmcCessInr,
        cessRatePct: Math.round(cessRate * 1000) / 10,
        hamali: hamaliInr,
        weighbridge: weighbridgeFeeInr
      },
      totalDeductions: totalDeductionsInr
    },
    netReturnInr,
    netReturnPerQuintal,
    profitMarginPct,
    capacityInfo: {
      arrivalsTonnes: arrivals,
      capacityTonnes: capacity,
      capacityUtilPct,
      hasGlutRisk
    }
  };
}

/**
 * Runs full comparative analysis across all candidate markets in Karnataka
 */
function runHarvestRouteAnalysis({
  markets,
  marketPricesMap,
  cropName = 'Tomato',
  quantityQuintals = 20,
  originDistrict = 'Davanagere',
  originLat = 14.4644,
  originLon = 75.9218,
  vehicleType = 'BOLERO_PICKUP',
  freshnessHours = 6,
  fuelRateMultiplier = 1.0,
  spoilageMultiplier = 1.0,
  cessRateOverride = null,
  speedKmph = 40
}) {
  const evaluated = [];

  for (const mkt of markets) {
    const priceKey = `${mkt.market_name}___${cropName}`;
    const priceRecord = marketPricesMap[priceKey] || marketPricesMap[mkt.market_name];
    if (!priceRecord) continue;

    const evaluation = calculateMarketNetReturn({
      market: mkt,
      marketPrice: priceRecord,
      cropName,
      quantityQuintals,
      originLat,
      originLon,
      vehicleType,
      freshnessHours,
      fuelRateMultiplier,
      spoilageMultiplier,
      cessRateOverride,
      speedKmph
    });

    evaluated.push(evaluation);
  }

  // Sort descending by Net Return
  evaluated.sort((a, b) => b.netReturnInr - a.netReturnInr);

  // Identify Net Return Winner (#1 Rank)
  const bestNetMarket = evaluated[0] || null;

  // Identify Highest Nominal Price Market
  let highestPriceMarket = null;
  let maxNominalPrice = -1;
  for (const item of evaluated) {
    if (item.modalPrice > maxNominalPrice) {
      maxNominalPrice = item.modalPrice;
      highestPriceMarket = item;
    }
  }

  // "The Twist" Diagnosis
  let twist = null;
  if (bestNetMarket && highestPriceMarket) {
    const isSame = bestNetMarket.marketId === highestPriceMarket.marketId;
    const rupeeDifference = bestNetMarket.netReturnInr - highestPriceMarket.netReturnInr;
    const nominalDifferencePerQtl = highestPriceMarket.modalPrice - bestNetMarket.modalPrice;
    const extraTransport = highestPriceMarket.costs.transportCost - bestNetMarket.costs.transportCost;
    const extraSpoilage = highestPriceMarket.costs.spoilageLoss - bestNetMarket.costs.spoilageLoss;
    const extraDistanceKm = Math.round((highestPriceMarket.roadDistanceKm - bestNetMarket.roadDistanceKm) * 10) / 10;

    let explanationEn = '';
    let explanationKn = '';
    let explanationHi = '';

    if (isSame) {
      explanationEn = `Strong Alignment: ${bestNetMarket.marketName} offers both the top wholesale rate (₹${bestNetMarket.modalPrice}/qtl) and remains cost-efficient. After accounting for ₹${bestNetMarket.costs.transportCost.toLocaleString()} transport and ₹${bestNetMarket.costs.spoilageLoss.toLocaleString()} spoilage, it leaves you with maximum take-home profit of ₹${bestNetMarket.netReturnInr.toLocaleString()}.`;
      explanationKn = `ಉತ್ತಮ ಹೊಂದಾಣಿಕೆ: ${bestNetMarket.marketName} ಅತಿ ಹೆಚ್ಚಿನ ಸಗಟು ಬೆಲೆ (₹${bestNetMarket.modalPrice}/ಕ್ವಿಂಟಾಲ್) ನೀಡುತ್ತದೆ ಮತ್ತು ಸಾರಿಗೆ ವೆಚ್ಚದ ನಂತರವೂ ಅತಿ ಹೆಚ್ಚು ನಿವ್ವಳ ಲಾಭ (₹${bestNetMarket.netReturnInr.toLocaleString()}) ನೀಡುತ್ತದೆ.`;
      explanationHi = `सटीक बाज़ार: ${bestNetMarket.marketName} में सबसे अधिक भाव (₹${bestNetMarket.modalPrice}/क्विंटल) भी है और सभी खर्चों के बाद सबसे ज़्यादा शुद्ध मुनाफा (₹${bestNetMarket.netReturnInr.toLocaleString()}) भी।`;
    } else {
      explanationEn = `The Mandi Trap Exposed: Although ${highestPriceMarket.marketName} advertises a higher headline price of ₹${highestPriceMarket.modalPrice.toLocaleString()}/qtl (+₹${nominalDifferencePerQtl.toLocaleString()}/qtl over ${bestNetMarket.marketName}), travelling ${extraDistanceKm} km farther costs an extra ₹${extraTransport.toLocaleString()} in freight and causes ₹${extraSpoilage.toLocaleString()} more transit spoilage. Choosing ${bestNetMarket.marketName} puts ₹${rupeeDifference.toLocaleString()} MORE net cash directly into your pocket!`;
      explanationKn = `ಮಂಡಿ ಬೆಲೆ ಭ್ರಮೆ: ${highestPriceMarket.marketName} ಹೆಚ್ಚಿನ ದರ (₹${highestPriceMarket.modalPrice.toLocaleString()}/ಕ್ವಿಂಟಾಲ್) ತೋರುತ್ತದೆಯಾದರೂ, ${extraDistanceKm} ಕಿ.ಮೀ ದೂರ ಸಾಗಿಸಲು ಹೆಚ್ಚುವರಿ ₹${extraTransport.toLocaleString()} ಸಾರಿಗೆ ವೆಚ್ಚ ಮತ್ತು ₹${extraSpoilage.toLocaleString()} ಕೊಳೆಯುವ ನಷ್ಟ ಉಂಟಾಗುತ್ತದೆ. ಆದ್ದರಿಂದ ${bestNetMarket.marketName} ಆಯ್ಕೆ ಮಾಡಿದರೆ ನಿಮ್ಮ ಕೈಯಲ್ಲಿ ₹${rupeeDifference.toLocaleString()} ಹೆಚ್ಚಿನ ನಿವ್ವಳ ಲಾಭ ಉಳಿಯುತ್ತದೆ!`;
      explanationHi = `मंडी के भाव का भ्रम: यद्यपि ${highestPriceMarket.marketName} में ₹${highestPriceMarket.modalPrice.toLocaleString()}/क्विंटल का ऊंचा भाव दिख रहा है, लेकिन ${extraDistanceKm} किमी अतिरिक्त दूरी तय करने पर ₹${extraTransport.toLocaleString()} अधिक भाड़ा और ₹${extraSpoilage.toLocaleString()} की फसल खराबी होगी। ${bestNetMarket.marketName} चुनने पर आपको ₹${rupeeDifference.toLocaleString()} का अधिक शुद्ध लाभ मिलेगा!`;
    }

    twist = {
      isSame,
      bestNetMarket,
      highestPriceMarket,
      rupeeDifference,
      nominalDifferencePerQtl,
      extraTransport,
      extraSpoilage,
      extraDistanceKm,
      explanation: {
        en: explanationEn,
        kn: explanationKn,
        hi: explanationHi
      }
    };
  }

  return {
    cropName,
    cropConfig: CROP_PERISHABILITY[cropName],
    quantityQuintals,
    originDistrict,
    originCoordinates: { lat: originLat, lon: originLon },
    vehicleType,
    rankedMarkets: evaluated,
    bestNetMarket,
    highestPriceMarket,
    twist
  };
}

module.exports = {
  CROP_PERISHABILITY,
  VEHICLE_CATALOG,
  calculateMarketNetReturn,
  runHarvestRouteAnalysis
};
