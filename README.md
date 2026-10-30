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

### 4. 👥 NEW FEATURE: Farmer Crop Pooling & Group Freight Sharing (ರೈತರ ಸಂಯುಕ್ತ ಸಾಗಣೆ)
* **Solves the Small-Lot Transport Penalty**: Smallholder farmers with 4–10 quintals frequently pay for an entire vehicle alone (₹2,500–₹3,500 freight), suffering astronomical costs of ₹400–₹600/qtl that destroy profitability.
* **Collaborative Pooling Board**:
  * Farmers can post a pool request or browse and join existing vehicles departing from their district/village to the same APMC.
  * Real-time visual capacity bar displaying occupied vs. available space (quintals).
* **Proportional Weight-Based Expense Split**:
  * Freight is distributed transparently based on each farmer's load weight (quintals).
  * Delivers up to **75% freight savings** per farmer!
* **In-Person Cash Settlement Slip**:
  * Generates a printable, WhatsApp-shareable manifest detailing each farmer's share in rupees to settle cash in person directly with the vehicle driver or host upon loading or arrival at the APMC gate.

### 5. 🚛 Vehicle Fleet & Transporter Directory
* Real-world transport vehicle classes:
  * **Auto / Piaggio Ape** (≤ 8 qtl, ₹18/km)
  * **Tata Ace (Chota Hathi)** (≤ 15 qtl, ₹24/km)
  * **Mahindra Bolero Maxi Truck** (≤ 25 qtl, ₹28/km)
  * **Eicher 14ft Canter** (≤ 50 qtl, ₹38/km)
  * **Cold-Chain Reefer Van** (≤ 35 qtl, ₹46/km — *eliminates 85% of transit spoilage!*)
* Directory of verified local Karnataka transporters with direct phone call and WhatsApp linkage.

### 6. 🗺️ Interactive GIS Route Map (Leaflet)
* Visualizes the farmer's origin with a tractor icon.
* Color-coded market beacons (🟢 Recommended Net Winner, 🔴 Nominal Price Trap, 🔵 Other Mandis).
* Driving route polylines with road distance (km) and travel duration (hrs).
* Interactive popups with instant financial scorecards.

### 7. 🎛️ Real-Time "What-If" Sensitivity Simulator
* Live slider controls to adjust:
  * **Fuel / Freight Rate Modifier** (0.7x to 2.0x)
  * **Spoilage / Weather Severity** (Summer heatwave vs Winter cool)
  * **APMC Cess Rate** (0.5% to 3.5%)
  * **Truck Transit Speed / Road Delay** (20 km/h to 65 km/h)
* Instantaneous recalculation of rankings and cost breakdown chart without page refresh.

### 8. 📄 Printable Farmer Dispatch Slip & Mandi Gate Pass
* 1-click printable manifest for the farmer to hand over to the truck driver, complete with GPS route distance, agreed transporter charges, gate pass details, and itemized deduction ledger.

### 9. 🍃 Zero-Login MongoDB Integration
* Built with MongoDB (Mongoose) storing crops, markets, prices, transporter fleets, pool requests, and saved simulations.
* Zero-friction guest experience: farmers can use the platform immediately without sign-up, save routes, and retrieve past simulations.
* Built-in high-speed pre-indexed JSON cache ensures resilient, lightning-fast execution in any environment.

---

## 🧮 Mathematical & Economic Formulation

$$\text{Gross Nominal Revenue} = Q \times P_m$$

$$\text{Road Distance (km)} = \text{Haversine}(\text{Origin}, \text{Market}) \times 1.28$$

$$\text{Transit Time (hrs)} = \frac{\text{Road Distance}}{\text{Avg Speed (40 km/h)}} + 0.25$$

$$\text{Transport Cost} = (\text{Base Fare}_v + \text{Distance} \times \text{Rate}_v \times \text{Fuel Multiplier} + \text{Toll}) \times \lceil Q / \text{Cap}_v \rceil$$

$$\text{Spoilage Loss} = \text{Gross Revenue} \times \left( \text{Base Decay}(\text{crop}) \times \text{Transit Hours} \times \text{Freshness Factor} \times (1 - \text{Reefer Discount}) \right)$$

$$\text{Pooled Share}(\text{Farmer}_i) = \text{Total Vehicle Freight} \times \left( \frac{Q_i}{\sum Q_k} \right)$$

$$\text{Net In-Hand Return} = \text{Gross} - \text{Transport Cost} - \text{Spoilage Loss} - \text{APMC Cess} - \text{Hamali Charges}$$

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- Git
- MongoDB (Optional: automatically falls back to High-Speed JSON Cache if MongoDB is offline)

### 2. Run the Full-Stack Application
```bash
# 1. Start the backend server (runs on port 5000, serves frontend automatically)
npm start

# Or run frontend and backend independently in development mode:
npm run dev:backend
npm run dev:frontend
```
Open your browser at `http://localhost:5000` to interact with HarvestRoute!
