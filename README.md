# 🌾 HarvestRoute: Find the Market That Pays the Most After Costs
> **Domain 3: Agriculture and Rural Development**  
> **Problem Statement 1 | Category: Software | Theme: Agriculture and Food Systems**  
> *Target Stakeholders: Farmer Producer Organizations (FPOs), Agricultural Marketing Boards, Small & Marginal Farmers*

---

## 🌟 Executive Summary & Problem Dilemma

A farmer in Karnataka with 20 quintals of freshly harvested tomatoes evaluates two options:
* **Market A (Local Mandi, 45 km away)**: Lists a modest price of ₹2,766 / quintal.
* **Market B (Terminal Market Yard, 420 km away)**: Lists an enticing, headline price of ₹2,944 / quintal (+₹178/qtl higher).

Naturally, without transparent logistics intelligence, the farmer decides to hire a truck and head towards Market B. But after paying:
1. High road freight and fuel surcharges,
2. Transit spoilage and quality downgrades during a grueling 11-hour drive in an open cargo bed,
3. Mandi market cess, unloading fees (hamali), and weighbridge charges,

...the farmer takes home **₹38,515** at Market B, compared to **₹51,170** had they sold at Market A! 
The farmer **loses ₹12,655 in cold, hard cash** because the highest listed price masked catastrophic transit overheads.

**HarvestRoute solves this problem before the truck is ever loaded.**

---

## ⚡ Key Highlights & Award-Winning Features

### 1. 🏆 "The Twist": Nominal Price Trap vs. HarvestRoute Smart Choice
* Side-by-side comparative diagnosis exposing the **Mandi Trap**.
* Demonstrates why a market advertising a higher headline price often yields thousands of rupees *less* in farmer's pockets.
* Provides a plain-language explanation tailored for rural producers in **English, ಕನ್ನಡ (Kannada), and हिन्दी (Hindi)**.

### 2. 📊 Grounded on Real Dataset (87,420 Records)
* Full integration of `harvestroute_karnataka_market_crop.csv`:
  * **62 Real Karnataka APMC Mandis** (from Bidar to Chamarajanagar, Mangaluru to Kolar).
  * **28 Agricultural Commodities** across 9 groups (Vegetables, Cereals, Pulses, Spices, Fruits, Commercial).
  * Real geographic coordinates, arrivals, purchase capacities, and modal/min/max auction prices.

### 3. 🍃 Non-Linear Crop Perishability Dynamics
* Accounts for crop-specific decay curves:
  * **High Perishable (Tomato, Banana, Mango)**: 0.5%–0.7% quality loss per transit hour.
  * **Medium Perishable (Onion, Potato, Garlic, Ginger, Sugarcane)**: 0.08%–0.18% per hour.
  * **Low/Negligible Perishable (Paddy, Ragi, Maize, Cotton, Pulses, Coffee, Spices)**: 0.01% per hour.
* Accounts for harvest freshness window (Harvested today vs 1-2 days ago).

### 4. 🚛 Vehicle Fleet & Transporter Directory
* Real-world transport vehicle classes:
  * **Auto / Piaggio Ape** (≤ 8 qtl, ₹18/km)
  * **Tata Ace (Chota Hathi)** (≤ 15 qtl, ₹24/km)
  * **Mahindra Bolero Maxi Truck** (≤ 25 qtl, ₹28/km)
  * **Eicher 14ft Canter** (≤ 50 qtl, ₹38/km)
  * **Cold-Chain Reefer Van** (≤ 35 qtl, ₹46/km — *eliminates 85% of transit spoilage!*)
* Directory of verified local Karnataka transporters with direct phone call and WhatsApp linkage.

### 5. 🗺️ Interactive GIS Route Map (Leaflet)
* Visualizes the farmer's origin with a tractor icon.
* Color-coded market beacons (🟢 Recommended Net Winner, 🔴 Nominal Price Trap, 🔵 Other Mandis).
* Driving route polylines with road distance (km) and travel duration (hrs).
* Interactive popups with instant financial scorecards.

### 6. 🎛️ Real-Time "What-If" Sensitivity Simulator
* Live slider controls to adjust:
  * **Fuel / Freight Rate Modifier** (0.7x to 2.0x)
  * **Spoilage / Weather Severity** (Summer heatwave vs Winter cool)
  * **APMC Cess Rate** (0.5% to 3.5%)
  * **Truck Transit Speed / Road Delay** (20 km/h to 65 km/h)
* Instantaneous recalculation of rankings and cost breakdown chart without page refresh.

### 7. 📄 Printable Farmer Dispatch Slip & Mandi Gate Pass
* 1-click printable manifest for the farmer to hand over to the truck driver, complete with GPS route distance, agreed transporter charges, gate pass details, and itemized deduction ledger.

### 8. 🍃 Zero-Login MongoDB Integration
* Built with MongoDB (Mongoose) storing crops, markets, prices, transporter fleets, and saved simulations.
* Zero-friction guest experience: farmers can use the platform immediately without sign-up, save routes, and retrieve past simulations.
* Built-in high-speed pre-indexed JSON cache ensures resilient, lightning-fast execution in any environment.

---

## 🧮 Mathematical & Economic Formulation

$$\text{Gross Nominal Revenue} = Q \times P_m$$

$$\text{Road Distance (km)} = \text{Haversine}(\text{Origin}, \text{Market}) \times 1.28$$

$$\text{Transit Time (hrs)} = \frac{\text{Road Distance}}{\text{Avg Speed (40 km/h)}} + 0.25$$

$$\text{Transport Cost} = (\text{Base Fare}_v + \text{Distance} \times \text{Rate}_v \times \text{Fuel Multiplier} + \text{Toll}) \times \lceil Q / \text{Cap}_v \rceil$$

$$\text{Spoilage Loss} = \text{Gross Revenue} \times \left( \text{Base Decay}(\text{crop}) \times \text{Transit Hours} \times \text{Freshness Factor} \times (1 - \text{Reefer Discount}) \right)$$

$$\text{Market Fees} = (\text{Gross Revenue} \times \text{Cess Rate}) + (Q \times \text{Hamali Rate}) + \text{Weighbridge Fee}$$

$$\mathbf{\text{Net In-Hand Cash}} = \text{Gross Revenue} - \text{Transport Cost} - \text{Spoilage Loss} - \text{Market Fees}$$

---

## 📂 Project Architecture

```
Anvathon/
├── harvestroute_karnataka_market_crop.csv   # 87,420 row APMC pricing dataset
├── IMPLEMENTATION_PLAN.md                  # Comprehensive architectural plan
├── package.json                            # Root npm run scripts
│
├── backend/                                # Node.js + Express API
│   ├── models/
│   │   ├── Crop.js                         # Crop schema & decay parameters
│   │   ├── Market.js                       # 62 APMC mandis & GPS coordinates
│   │   ├── MarketPrice.js                  # Pricing & capacity records
│   │   ├── Transporter.js                  # Local transporter fleet directory
│   │   └── SavedAnalysis.js                # No-login saved scenarios
│   ├── services/
│   │   ├── geoService.js                   # Haversine distance & road tortuosity
│   │   ├── calculationEngine.js            # Net return & The Twist engine
│   │   └── dbService.js                    # MongoDB connection & cache fallback
│   ├── scripts/
│   │   └── seedData.js                     # Dataset parser & seeder
│   ├── data/
│   │   └── seedDataCache.json              # Pre-indexed high-speed cache
│   └── server.js                           # Express full-stack web server
│
└── frontend/                               # React + Vite + Tailwind CSS
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx                  # Header, trilingual switcher, DB badge
    │   │   ├── FarmerInputForm.jsx         # Lot picker (Crop, Qty, Freshness, District)
    │   │   ├── TheTwistCard.jsx            # Mandi Trap vs Smart Pick hero card
    │   │   ├── MarketMap.jsx               # Leaflet GIS route map & markers
    │   │   ├── MarketLeaderboard.jsx       # Ranked APMC table with equation breakdown
    │   │   ├── SensitivityLab.jsx          # Live What-If sliders (Fuel, Decay, Cess)
    │   │   ├── CostBreakdownChart.jsx      # Recharts waterfall of deductions
    │   │   ├── TransporterDirectory.jsx    # Transporter fleet cards & booking modal
    │   │   ├── FarmerDispatchSlip.jsx      # Printable driver manifest & invoice
    │   │   └── SavedAnalysesModal.jsx      # No-login saved scenario retrieval
    │   ├── translations.js                 # EN / ಕನ್ನಡ / हिन्दी dictionaries
    │   ├── App.jsx                         # Main orchestrator
    │   └── index.css                       # Tailwind & print styling
    └── dist/                               # Production bundled assets
```

---

## 🚀 Quick Start Guide

### 1. Requirements
* Node.js v18+ (tested on Node.js v24)
* MongoDB (optional: app automatically falls back to the pre-indexed JSON cache if MongoDB is offline, guaranteeing 100% uptime!)

### 2. Run the Application
Open PowerShell or your terminal in the `Anvathon` project directory:

```bash
# Start the full-stack server
npm start
```

Then open your browser at:
👉 **`http://localhost:5000`**

### 3. Re-seed Dataset (Optional)
If you wish to parse the 87,420 rows fresh from the CSV:
```bash
npm run seed
```

---

## 💡 Typical Farmer Scenario Walkthrough

1. **Lot Selection**: Farmer selects **Tomato**, **20 Quintals**, **Freshly Harvested (< 6 hrs)**, with origin in **Chamarajanagar District**.
2. **Analysis Result**:
   * **The Twist Appears**: Shows **Ranebennur APMC** listed at ₹2,944/qtl (Nominal Winner) vs **Nanjangud APMC** listed at ₹2,766/qtl (Smart Choice).
   * **The Reality**: Travelling 425 km to Ranebennur burns ₹13,580 in transport and ruins ₹4,691 of tomatoes in the heat. Nanjangud is only 46 km away, costing just ₹2,118 in freight and ₹631 in spoilage.
   * **The Verdict**: Choosing Nanjangud APMC puts **₹12,655 extra net cash in the farmer's pocket (+32.8%)**!
3. **What-If Exploration**: The farmer drags the **Fuel Rate Modifier** up to 1.5x or changes the vehicle to a **Cold-Chain Reefer**, seeing instant recalculations across the map and leaderboard.
4. **Logistics Booking**: The farmer reviews local transporters in the directory, contacts the driver, and prints the **Farmer Dispatch Slip** for the trip.

---

*HarvestRoute — Empowering Indian farmers with transparent market intelligence.*
