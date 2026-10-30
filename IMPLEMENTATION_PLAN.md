# HarvestRoute: Implementation Plan
*Find the Market That Pays the Most After Costs*

---

## 1. Project Overview & Problem Statement
- **Domain**: Agriculture and Rural Development (Domain 3)
- **Theme**: Agriculture and Food Systems
- **Core Dilemma**: Farmers frequently chase the highest listed market (mandi) price—often at distant wholesale yards—only to discover that after paying heavy freight, transit spoilage on perishable crops, APMC commissions, and loading charges, their net in-hand return is drastically lower than selling at a closer, moderately-priced market.
- **The Twist**: Side-by-side presentation of **Nominal Price Winner** (The Mandi Trap) vs. **HarvestRoute Smart Choice** (Optimal Net Take-Home), explained in clear plain language with itemized financial deductions.

---

## 2. Key Architecture & Differentiators

```
+---------------------------------------------------------------------------------+
|                                 HarvestRoute UI                                 |
|  - Trilingual: English / ಕನ್ನಡ (Kannada) / हिन्दी (Hindi)                         |
|  - Farmer Lot Input: Crop, Quantity, Harvest Date/Freshness, Origin District    |
|  - Vehicle & Transporter Picker (Chota Hathi, Bolero, Canter, Reefer Van)       |
|  - Live Sensitivity Sliders (Fuel/km, Spoilage Multiplier, Mandi Cess, Delay)   |
+---------------------------------------------------------------------------------+
          |                                               ^
          v                                               | (REST API)
+---------------------------------------------------------------------------------+
|                            Express.js Backend API                               |
|  - Net Return Calculation Engine (Gross - Freight - Spoilage - APMC - Hamali)   |
|  - Geo-Distance & Transit Hours Engine (Haversine + 1.28x Road Tortuosity)      |
|  - Crop Perishability Dynamics (Non-linear decay curves: Tomato vs Pulses)      |
|  - Supply/Demand Capacity Risk Scoring                                          |
+---------------------------------------------------------------------------------+
          |                                               |
          v                                               v
+-------------------------------+               +---------------------------------+
|   MongoDB Database (Mongoose)  |               |  Dataset: 87,420 Records CSV    |
|  - Crops (28 types + decay)   |  <--(Seeder)- |  - 62 Karnataka APMC Mandis     |
|  - Markets (62 APMCs + coords)|               |  - Modal, Min, Max Prices       |
|  - MarketPrices (Live/Recent) |               |  - Arrivals & Capacity Est.     |
|  - Transporters (Fleet dir)   |               +---------------------------------+
|  - SavedAnalyses (No-auth)    |
+-------------------------------+
```

### Award-Winning Capabilities:
1. **Full Dataset Integration**:
   - Built on the provided `harvestroute_karnataka_market_crop.csv` (87,420 rows, 62 Karnataka APMCs, 28 crops across 31 districts).
2. **"The Mandi Trap" Engine (The Twist)**:
   - Identifies the nominal highest-price market and puts it directly against the true net-profit market.
   - Highlights the exact rupee difference and provides a conversational explanation (e.g., *"Why Bangalore Yard's ₹3,400/qtl is actually ₹12,800 worse for you than Davanagere's ₹2,900/qtl"*).
3. **Transport Vehicle & Logistics Fleet Optimizer**:
   - 4 realistic transport classes + Cold-Chain Reefer option:
     - 3-Wheeler Auto / Piaggio Ape (≤ 8 qtl, ₹18/km)
     - Tata Ace "Chota Hathi" (≤ 15 qtl, ₹24/km)
     - Mahindra Bolero Maxi (≤ 25 qtl, ₹28/km)
     - Eicher 14ft Canter (≤ 50 qtl, ₹38/km)
     - Reefer Cold-Van (≤ 35 qtl, ₹46/km — cuts perishability loss by 85%)
   - Transporter Directory with verified local transport contacts across Karnataka districts, vehicle availability, and instant booking modal.
4. **Interactive GIS Map (Leaflet / OpenStreetMap)**:
   - Visualizes farmer's origin with a distinct tractor marker.
   - Color-coded market pins:
     - 🟢 Golden Trophy = Best Net Return Market
     - 🔴 Warning Beacon = Highest Nominal Price (The Mandi Trap)
     - 🔵 Info Pin = Other competitive mandis within radius
   - Interactive driving routes with distance (km) and travel duration (hrs).
5. **Real-time "What-If" Sensitivity Simulator**:
   - Instant slider controls for Diesel/Freight rate, Spoilage severity (Summer heat vs. Monsoon), APMC commission rate, and Road condition.
   - Interactive Recharts bar/waterfall chart showing cost decomposition across candidate markets.
6. **No-Login Experience with Saved Scenarios**:
   - Zero-friction guest workflow.
   - Farmers or FPO managers can save a scenario with a single click and retrieve it via shareable token or history drawer.
7. **Farmer Dispatch Slip**:
   - 1-click printable receipt/invoice format for the driver with gate pass details, route checkpoints, transporter cost, and estimated net payout.

---

## 3. Financial Calculation Model

For every market $m$ and chosen vehicle $v$:

$$\text{Gross Revenue} = Q \times P_m$$

$$\text{Road Distance} = \text{Haversine}(O, M) \times 1.28$$

$$\text{Transit Time (hrs)} = \frac{\text{Road Distance}}{\text{Avg Speed (40 km/h)}}$$

$$\text{Transport Cost} = \text{Base Fare}_v + (\text{Road Distance} \times \text{Rate per km}_v) + \text{Toll Surcharge}$$

$$\text{Transit Spoilage Loss} = Q \times P_m \times \left( \text{Perishability Rate}(\text{crop}) \times \text{Transit Time} \times \text{Reefer Discount Factor} \right)$$

$$\text{Market Fees} = (\text{Gross Revenue} \times \text{APMC Cess Rate}) + (Q \times \text{Hamali Rate})$$

$$\text{Net In-Hand Return} = \text{Gross Revenue} - \text{Transport Cost} - \text{Transit Spoilage Loss} - \text{Market Fees}$$

---

## 4. Implementation Steps

1. **Step 1: Backend Setup & MongoDB Integration**
   - Initialize Node.js project with `express`, `mongoose`, `cors`, `dotenv`, `csv-parser`.
   - Create schemas: `Crop`, `Market`, `MarketPrice`, `Transporter`, `AnalysisTrip`.
   - Seed script to load the 62 APMCs, 28 crops, latest market prices from `harvestroute_karnataka_market_crop.csv`, and local transporters into MongoDB (with in-memory fallback for zero-downtime robustness).
2. **Step 2: Core Algorithm & REST APIs**
   - `/api/crops`: List of crops with categories, shelf lives, and perishability indices.
   - `/api/origins`: List of farmer origin districts and towns with geographic coordinates.
   - `/api/transporters`: Vehicle classes and verified local transporter contacts.
   - `/api/analyze`: Main engine computing multi-market rankings, route distances, transit hours, spoilage loss, net returns, "The Twist" comparison, and sensitivity analysis.
   - `/api/trips`: Save and retrieve analysis reports without requiring logins.
3. **Step 3: Frontend Build (React + Tailwind CSS + Lucide + Leaflet + Recharts)**
   - Header with Karnataka/Agri branding, domain badge, and Trilingual language switcher (EN / KN / HI).
   - Farmer Input Drawer: Crop selector, Quantity input (quintals), Harvest Freshness selector, Farmer Origin district dropdown, and Vehicle selection.
   - "The Twist" Hero Showcase: Side-by-side card comparing Nominal Price Winner vs. HarvestRoute Smart Winner with plain-language explanation and Rupee advantage.
   - Interactive Leaflet Map: Origin marker, route lines, color-coded market markers with financial scorecard tooltips.
   - Market Leaderboard Table: Detailed itemized breakdown (Gross, Freight, Spoilage, APMC Cess, Hamali, Net Profit, Margin %).
   - What-If Sensitivity Lab: Sliders for fuel price, transit delay, spoilage multiplier, and mandi fee.
   - Transporter Directory & Booking Drawer: Contact local fleet operators.
   - Printable "Farmer Dispatch Slip".
4. **Step 4: End-to-End Testing & Verification**
   - Verify calculation edge cases (e.g. perishable Tomato vs dry Paddy).
   - Verify sensitivity sliders immediately update ranking.
   - Test print/dispatch slip formatting.

