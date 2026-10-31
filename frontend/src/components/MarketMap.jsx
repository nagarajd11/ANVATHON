import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, Trophy, AlertTriangle, Truck, MapPin, RotateCcw } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

// Helper component to auto-fit map bounds when markets change
function MapBoundsUpdater({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [bounds, map]);
  return null;
}

// In-map interactive controller for Reset Bounds
function MapActionControls({ bounds }) {
  const map = useMap();

  return (
    <div className="leaflet-top leaflet-right" style={{ pointerEvents: 'auto', zIndex: 1000, margin: '14px' }}>
      <button
        onClick={() => map.fitBounds(bounds, { padding: [40, 40], animate: true })}
        className="btn-subtle shadow-md"
        title="Reset zoom to view all routes and mandis"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset View</span>
      </button>
    </div>
  );
}

// Custom Organic Botanical Pin Icons
const createCustomIcon = (type, label) => {
  let bgColor = '#059669';
  let borderColor = '#022c22';
  let iconSvg = '';

  if (type === 'ORIGIN') {
    bgColor = '#041610';
    borderColor = '#10b981';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6v12l8 4 8-4V6l-8-4z"/></svg>`;
  } else if (type === 'OPTIMAL') {
    bgColor = '#047857';
    borderColor = '#34d399';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`;
  } else if (type === 'TRAP') {
    bgColor = '#c2410c';
    borderColor = '#ea580c';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  } else {
    bgColor = '#064e3b';
    borderColor = '#34d399';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }

  const html = `
    <div style="
      background-color: ${bgColor};
      border: 2px solid ${borderColor};
      box-shadow: 0 8px 24px rgba(0,0,0,0.45);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: transform 0.2s ease;
    ">
      ${iconSvg}
      ${label ? `<span style="position: absolute; bottom: -18px; background: rgba(3,16,11,0.92); color: #ecfdf5; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 4px; white-space: nowrap; border: 1px solid rgba(255,255,255,0.2);">${label}</span>` : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

export default function MarketMap({ analysis, lang }) {
  if (!analysis) return null;

  const t = TRANSLATIONS[lang];
  const { originCoordinates, originDistrict, rankedMarkets, bestNetMarket, highestPriceMarket } = analysis;

  const originLat = originCoordinates.lat;
  const originLon = originCoordinates.lon;

  // Take top 10 candidate markets and ensure both optimal winner and price trap are always mapped
  const candidates = rankedMarkets ? [...rankedMarkets.slice(0, 10)] : [];
  if (highestPriceMarket && !candidates.some(m => m.marketId === highestPriceMarket.marketId)) {
    candidates.push(highestPriceMarket);
  }
  if (bestNetMarket && !candidates.some(m => m.marketId === bestNetMarket.marketId)) {
    candidates.push(bestNetMarket);
  }
  const topMarkets = candidates;

  // Compute bounds
  const bounds = [
    [originLat, originLon],
    ...topMarkets.map(m => [m.latitude, m.longitude])
  ];

  return (
    <div id="map-section" className="glass-card rounded-3xl p-6 sm:p-8 mb-8 hover-lift">
      
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
              <Navigation className="w-4 h-4 text-emerald-300" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-emerald-300 font-mono">
              Live Mandi Network
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white text-crisp">
            {t.mapTitle}
          </h3>
          <p className="text-xs text-white/70 mt-1 font-sans">
            {t.mapSub}
          </p>
        </div>

        {/* Legend with interactive hover glow pills */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold text-white/90">
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-md hover-glow-pill cursor-pointer">
            <span className="w-3 h-3 rounded-full bg-pine border border-emerald-400 inline-block" />
            <span className="font-sans">{t.originLegend}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-emerald-400/30 backdrop-blur-md hover-glow-pill cursor-pointer text-emerald-300">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-300 inline-block" />
            <span className="font-sans">{t.optimalLegend}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-terracotta-400/30 backdrop-blur-md hover-glow-pill cursor-pointer text-terracotta-300">
            <span className="w-3 h-3 rounded-full bg-terracotta-600 border border-terracotta-300 inline-block" />
            <span className="font-sans">{t.trapLegend}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/15 backdrop-blur-md hover-glow-pill cursor-pointer text-white/80">
            <span className="w-3 h-3 rounded-full bg-[#064e3b] border border-emerald-400 inline-block" />
            <span className="font-sans">{t.otherLegend}</span>
          </div>
          
        </div>
      </div>

      {/* Map Canvas with Active Mouse Wheel Scroll Zoom enabled */}
      <div className="h-[440px] w-full rounded-2xl overflow-hidden border border-white/20 relative shadow-2xl">
        <MapContainer
          center={[originLat, originLon]}
          zoom={8}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          touchZoom={true}
          dragging={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapBoundsUpdater bounds={bounds} />
          <MapActionControls bounds={bounds} />

          {/* Farmer Origin Marker */}
          <Marker 
            position={[originLat, originLon]} 
            icon={createCustomIcon('ORIGIN', originDistrict)}
          >
            <Popup>
              <div className="p-1 text-slate-900 font-sans">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block">
                  Departure Hub
                </span>
                <strong className="text-sm font-bold block">{originDistrict} District</strong>
                <span className="text-xs text-slate-600">Farm lot dispatch node</span>
              </div>
            </Popup>
          </Marker>

          {/* Market Markers & Route Lines */}
          {topMarkets.map((mkt, idx) => {
            const isBest = bestNetMarket && mkt.marketId === bestNetMarket.marketId;
            const isTrap = highestPriceMarket && mkt.marketId === highestPriceMarket.marketId && !isBest;
            const markerType = isBest ? 'OPTIMAL' : isTrap ? 'TRAP' : 'OTHER';
            const polylineColor = isBest ? '#059669' : isTrap ? '#ea580c' : '#0f4c3a';
            const polylineDash = isBest ? undefined : '6, 6';
            const polylineWidth = isBest ? 4 : isTrap ? 3 : 2;

            return (
              <React.Fragment key={mkt.marketId}>
                {/* Route Line from Origin to Market */}
                <Polyline
                  positions={[
                    [originLat, originLon],
                    [mkt.latitude, mkt.longitude]
                  ]}
                  pathOptions={{
                    color: polylineColor,
                    weight: polylineWidth,
                    dashArray: polylineDash,
                    opacity: 0.85
                  }}
                />

                {/* Market Pin */}
                <Marker
                  position={[mkt.latitude, mkt.longitude]}
                  icon={createCustomIcon(markerType, `#${idx + 1}`)}
                >
                  <Popup>
                    <div className="p-2 min-w-[210px] text-slate-900 font-sans">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Rank #{idx + 1}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-slate-600 font-semibold">
                          {mkt.roadDistanceKm} km ({mkt.transitHours}h)
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                        {mkt.marketName}
                      </h4>
                      <p className="text-xs text-slate-600 mb-2">{mkt.district} District</p>
                      
                      <div className="bg-slate-50 p-2.5 rounded-xl space-y-1 text-xs border border-slate-200 font-mono tabular-nums">
                        <div className="flex justify-between">
                          <span className="text-slate-500 font-sans">Mandi Price:</span>
                          <span className="font-bold text-slate-900">₹{mkt.modalPrice}/qtl</span>
                        </div>
                        <div className="flex justify-between text-terracotta-700">
                          <span className="font-sans">Freight Cost:</span>
                          <span>-₹{mkt.costs.transportCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-terracotta-800">
                          <span className="font-sans">Spoilage Loss:</span>
                          <span>-₹{mkt.costs.spoilageLoss.toLocaleString()} ({mkt.costs.spoilagePct}%)</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-1 text-emerald-700 font-extrabold text-sm">
                          <span className="font-sans">Net In-Hand:</span>
                          <span>₹{mkt.netReturnInr.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            );
          })}
        </MapContainer>
      </div>

    </div>
  );
}
