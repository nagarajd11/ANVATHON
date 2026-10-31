# 🌾 HarvestRoute
### Intelligent Agricultural Market Net-Return & Logistics Optimization Platform
> **Domain 3: Agriculture and Rural Development**  
> **Problem Statement 1 | Category: Software | Theme: Agriculture and Food Systems**  
> *Target Stakeholders: Farmer Producer Organizations (FPOs), Agricultural Marketing Boards, Small & Marginal Farmers*

---

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Active%20%7C%20Cached-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS%20Mapping-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Language](https://img.shields.io/badge/Language-English%20%7C%20%E0%B2%95%E0%B2%A8%E0%B3%8D%E0%B2%A8%E0%B2%A1-brightgreen)](#-full-kannada-%E0%B2%95%E0%B2%A8%E0%B3%8D%E0%B2%A8%E0%B2%A1-localization)

---

## 🌟 Executive Summary & The "Mandi Trap" Dilemma

A farmer in Davanagere, Karnataka with **20 quintals of freshly harvested tomatoes** evaluates two selling opportunities:
* **Market A (Local Mandi, 45 km away)**: Lists a modest price of **₹2,766 / quintal**.
* **Market B (Terminal Market Yard, 420 km away)**: Lists an enticing headline price of **₹2,944 / quintal** (+₹178 / qtl premium).

Without transparent logistics and perishability intelligence, the farmer chooses Market B. However, upon arrival after:
1. High road freight and fuel surcharges over a 420 km journey,
2. Severe transit spoilage during an 11-hour drive in open cargo,
3. Mandi market cess, unloading fees (hamali), and weighbridge charges,

...the farmer takes home **₹38,515** at Market B, compared to **₹51,170** had they sold at Market A.  
The farmer **loses ₹12,655 in cash** because the headline price masked crushing transit overheads.

**HarvestRoute exposes the Mandi Trap and calculates the true in-hand net return before the truck is ever loaded.**

---

## ⚡ Key Highlights & Core Features

### 1. 🏆 "The Twist": Nominal Price Trap vs. HarvestRoute Smart Winner
* **Side-by-Side Diagnosis**: Direct comparative card highlighting the difference between the headline price and the true net payout.
* **Plain-Language Advisory**: Actionable guidance tailored for rural producers in **English and ಕನ್ನಡ (Kannada)**.
* **Detailed Breakdown Drawers**: Itemized financial balance sheets for both the Recommended Net Winner and the Nominal Trap Market.

### 2. 🎙️ Fluent Bilingual Voice Assistant (English & ಕನ್ನಡ)
* **High-Definition Audio Guidance**: "Listen to Decision Audio" button (`ಧ್ವನಿ ಸಲಹೆ ಕೇಳಿ`) with dual-engine streaming (native browser speech synthesis + resilient `/api/tts` proxy).
* **Focused 2-Market Comparison**: Explicitly compares the **Top 2 Mandis** from the farmer's filtered results, announces the exact net-profit difference in rupees, and advises the farmer on the most profitable choice in fluent conversational Kannada.

### 3. 🚛 Automated Optimal Logistics & Verified Local Transporter Allocation
* **Zero-Friction Vehicle Matchmaking**: The system automatically allocates the most cost-effective vehicle class based on load weight and crop perishability:
  * **Auto / Piaggio Ape** (≤ 8 qtl, ₹18/km)
  * **Tata Ace (Chota Hathi)** (≤ 15 qtl, ₹24/km)
  * **Mahindra Bolero Maxi Truck** (≤ 25 qtl, ₹28/km)
  * **Eicher 14ft Canter** (≤ 50 qtl, ₹38/km)
  * **Cold-Chain Reefer Van** (≤ 35 qtl, ₹46/km — reduces transit spoilage by 85%)
* **Verified Local Driver Contacts**: Instantly links verified regional Karnataka transporters with agency names, assigned drivers, direct call buttons, and 1-click WhatsApp messaging.

### 4. 🌐 Full Kannada (ಕನ್ನಡ) Localization
* Complete localization covering:
  * **200 Karnataka APMC Mandi Names** (e.g., Davanagere $\rightarrow$ ದಾವಣಗೆರೆ, Kolar $\rightarrow$ ಕೋಲಾರ, Yeshwanthpur $\rightarrow$ ಯಶವಂತಪುರ).
  * **31 Karnataka Districts & Taluks**.
  * Mandi ranking badges, status tags, table headers, financial ledgers, and printable dispatch slips.
  * Instant 1-click language switcher (`ಕನ್ನಡ / EN`).

### 5. 🗺️ Interactive GIS Route Map (Leaflet)
* Dynamic route visualization with custom marker icons:
  * 🚜 Farmer origin pin.
  * 🟢 Green beacon for Recommended Net Return Winner.
  * 🔴 Red beacon for Nominal Price Trap Market.
  * 🔵 Blue beacons for alternative APMC mandis.
* Driving route polylines showing road distance (km) and travel duration (hrs).
* Interactive popups with instant financial scorecards.

### 6. 🎛️ Real-Time "What-If" Sensitivity Simulator
* Interactive live sliders to stress-test real-world conditions:
  * **Fuel / Freight Rate Modifier** (0.7x to 2.0x)
  * **Transit Spoilage Severity** (Summer heatwave vs. Winter cool)
  * **APMC Cess Rate** (0.5% to 3.5%)
  * **Truck Speed / Transit Delay** (20 km/h to 65 km/h)
* Instant dynamic recalculation of rankings and cost breakdown charts without page reloading.

### 7. 📄 Printable Gate Pass Slip & Settlement Manifest
* **Clean Navigation**: Top header close button (`✕ / Close`), bottom return button (`← Return to Mandi Results`), backdrop overlay click, and `Escape` key shortcut.
* **Winner Lock**: Lock the selected market to generate an official APMC Gate Pass slip.
* **Complete Manifest**: Includes vehicle specs, driver contact, barcode/QR visual, GPS distance, itemized deductions, and net payable cash summary.

### 8. 🍃 Zero-Login Resilient Database Architecture
* Fully integrated with **MongoDB (Mongoose)** for persistent data management.
* Built-in high-speed pre-indexed JSON cache (`seedDataCache.json`) provides resilient, zero-downtime execution even when MongoDB is offline.
* Zero-friction guest experience: farmers can evaluate routes immediately without sign-up.

---

## 🧮 Mathematical & Economic Formulation

$$\text{Gross Nominal Revenue} = Q \times P_m$$

$$\text{Road Distance (km)} = \text{Haversine}(\text{Origin}, \text{Market}) \times 1.28$$

$$\text{Transit Time (hrs)} = \frac{\text{Road Distance}}{\text{Avg Speed (40 km/h)}} + 0.25$$

$$\text{Transport Cost} = \left(\text{Base Fare}_v + (\text{Distance} \times \text{Rate}_v \times \text{Fuel Multiplier}) + \text{Toll Surcharges}\right) \times \lceil Q / \text{Cap}_v \rceil$$

$$\text{Spoilage Loss} = \text{Gross Revenue} \times \left( \text{Base Decay}(\text{crop}) \times \text{Transit Hours} \times \text{Freshness Factor} \times (1 - \text{Reefer Discount}) \right)$$

$$\text{Mandi Expenses} = (\text{Gross Revenue} \times \text{Cess Rate}) + (Q \times \text{Hamali Rate}) + \text{Weighment Fee}$$

$$\mathbf{\text{Net In-Hand Return}} = \mathbf{\text{Gross Revenue}} - \mathbf{\text{Transport Cost}} - \mathbf{\text{Spoilage Loss}} - \mathbf{\text{Mandi Expenses}}$$

---

## 🏛️ Project Architecture

```
Hackathon project/
├── backend/
│   ├── data/
│   │   ├── karnatakaApmcRegistry.js      # 200 Karnataka APMCs with geocodes & cess
│   │   ├── karnatakaTaluks.js            # 31 Districts & sub-district mappings
│   │   ├── seedDataCache.json            # Pre-indexed offline cache (crops, markets, prices)
│   │   └── verifiedTransportersDataset.js# Verified regional driver & vehicle fleet dataset
│   ├── models/                           # Mongoose schemas (Crop, Market, Transporter, etc.)
│   ├── scripts/                          # DB seed and import scripts
│   ├── services/
│   │   ├── calculationEngine.js          # Core net-return & perishability decay engine
│   │   ├── dbService.js                  # Database abstraction with fallback caching
│   │   ├── driverRegistry.js             # Automated vehicle & driver allocation
│   │   └── geoService.js                 # Haversine distance & road routing service
│   ├── package.json
│   └── server.js                         # Express server, REST endpoints & /api/tts proxy
├── frontend/
│   ├── public/                           # Logos, fonts, and static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingView.jsx           # Hero presentation & value proposition
│   │   │   ├── FarmerConfigView.jsx      # Farmer lot size, origin, and crop input
│   │   │   ├── AnalysisResultsView.jsx   # Results hub (Twist, Map, Audio, Leaderboard)
│   │   │   ├── MarketLeaderboard.jsx     # Bilingual Mandi rankings table
│   │   │   ├── MarketMap.jsx             # Leaflet GIS route visualizer
│   │   │   ├── TheTwistCard.jsx          # Mandi Trap comparative breakdown
│   │   │   ├── FarmerDispatchSlip.jsx    # Printable Gate Pass modal with return navigation
│   │   │   ├── SensitivityLab.jsx        # Real-time simulation sliders
│   │   │   └── Navbar.jsx                # Responsive header with language toggle
│   │   ├── hooks/
│   │   │   └── useVoiceAssistant.js      # Bilingual speech synthesis hook
│   │   ├── utils/
│   │   │   ├── kannadaLocalization.js    # APMC & district Kannada translation dictionary
│   │   │   └── voiceAssistant.js         # Top-2 Mandi comparison speech generator
│   │   ├── App.jsx                       # Multi-view application router
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── package.json                          # Workspace root script runner
└── README.md
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/status` | System health, MongoDB connection status, and cache metrics |
| `GET` | `/api/crops` | List of agricultural commodities, categories, and decay rates |
| `GET` | `/api/origins` | List of Karnataka districts, Kannada names, coordinates, and taluks |
| `GET` | `/api/transporters` | Vehicle catalog and verified regional transporter fleet |
| `POST` | `/api/analyze` | Core optimization engine: ranks mandis by true net in-hand payout |
| `GET` | `/api/tts` | High-quality multilingual TTS streaming proxy (Kannada, Hindi, English) |
| `GET` | `/api/saved-analyses` | Retrieve saved routes and scenario simulations |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
* **Node.js** (v18.0.0 or higher recommended)
* **npm** (v9.0.0 or higher)
* **MongoDB** (*Optional*: automatically operates in High-Speed Memory Cache mode if MongoDB is not running)

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/nagarajd11/ANVATHON.git
cd ANVATHON

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
cd ..
```

### 3. Run the Application

#### Option A: Unified Full-Stack Server (Recommended)
Builds the frontend and runs the unified server on port `5000`:
```bash
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

#### Option B: Independent Development Mode
Run the backend and frontend development servers concurrently:
```bash
# Terminal 1: Backend API (port 5000)
npm run dev:backend

# Terminal 2: Frontend Vite HMR (port 5173)
npm run dev:frontend
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 👥 Contributors & Hackathon Team
* **Project**: HarvestRoute (ANVATHON)
* **Theme**: Agriculture and Food Systems
* **Repository**: [https://github.com/nagarajd11/ANVATHON](https://github.com/nagarajd11/ANVATHON)
* **License**: MIT
