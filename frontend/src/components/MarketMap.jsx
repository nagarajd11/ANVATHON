import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, Trophy, AlertTriangle, Truck, MapPin } from 'lucide-react';
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

// Custom Organic Botanical Pin Icons
const createCustomIcon = (type, label) => {
  let bgColor = '#059669';
  let borderColor = '#022c22';
  let iconSvg = '';

  if (type === 'ORIGIN') {
    bgColor = '#09261C';
    borderColor = '#10b981';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6ee7b7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6v12l8 4 8-4V6l-8-4z"/></svg>`;
  } else if (type === 'OPTIMAL') {
    bgColor = '#047857';
    borderColor = '#10b981';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`;
  } else if (type === 'TRAP') {
    bgColor = '#c2410c';
    borderColor = '#ea580c';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  } else {
    bgColor = '#0f4c3a';
    borderColor = '#34d399';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }

  const html = `
    <div style="
      background-color: ${bgColor};
      border: 2px solid ${borderColor};
      box-shadow: 0 8px 24px rgba(4,47,46,0.35);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    ">
      ${iconSvg}
      ${label ? `<span style="position: absolute; bottom: -18px; background: rgba(9,38,28,0.92); color: #ecfdf5; font-family: 'JetBrains Mono', monospace; font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 4px; white-space: nowrap; border: 1px solid rgba(255,255,255,0.15);">${label}</span>` : ''}
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

  // Take top 8 markets for map visualization to prevent cluttering
  const topMarkets = rankedMarkets.slice(0, 8);

  // Compute bounds
  const bounds = [
    [originLat, originLon],
    ...topMarkets.map(m => [m.latitude, m.longitude])
  ];

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-emerald-900/10 shadow-[0_16px_45px_-10px_rgba(4,47,46,0.22),inset_0_1px_1px_0_rgba(255,255,255,0.9)]">
      
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-chlorophyll/10 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-800">
              <Navigation className="w-4 h-4 text-emerald-700" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-chlorophyll/60">
              GIS Transit Geodesics
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-chlorophyll tracking-wide">
            {t.mapTitle}
          </h3>
          <p className="text-xs text-chlorophyll/70 mt-1 font-sans">
            {t.mapSub}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-chlorophyll/80 bg-white/70 px-3 py-2 rounded-xl border border-chlorophyll/10">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-chlorophyll border border-emerald-400 inline-block" />
            <span className="font-sans">{t.originLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-emerald-300 inline-block" />
            <span className="font-sans">{t.optimalLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-terracotta-600 border border-terracotta-300 inline-block" />
            <span className="font-sans">{t.trapLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#0f4c3a] border border-emerald-400 inline-block" />
            <span className="font-sans">{t.otherLegend}</span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="h-[440px] w-full rounded-2xl overflow-hidden border border-chlorophyll/15 relative shadow-inner">
        <MapContainer
          center={[originLat, originLon]}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapBoundsUpdater bounds={bounds} />

          {/* Farmer Origin Marker */}
          <Marker 
            position={[originLat, originLon]} 
            icon={createCustomIcon('ORIGIN', originDistrict)}
          >
            <Popup>
              <div className="p-1 text-chlorophyll font-sans">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 block">
                  Departure Hub
                </span>
                <strong className="text-sm font-bold block">{originDistrict} District</strong>
                <span className="text-xs text-chlorophyll/60">Farm lot dispatch node</span>
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
                    <div className="p-2 min-w-[210px] text-chlorophyll font-sans">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Rank #{idx + 1}
                        </span>
                        <span className="text-xs font-mono tabular-nums text-chlorophyll/70 font-semibold">
                          {mkt.roadDistanceKm} km ({mkt.transitHours}h)
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-chlorophyll mb-0.5">
                        {mkt.marketName}
                      </h4>
                      <p className="text-xs text-chlorophyll/60 mb-2">{mkt.district} District</p>
                      
                      <div className="bg-white/90 p-2.5 rounded-xl space-y-1 text-xs border border-chlorophyll/10 font-mono tabular-nums">
                        <div className="flex justify-between">
                          <span className="text-chlorophyll/60 font-sans">Mandi Price:</span>
                          <span className="font-bold text-chlorophyll">₹{mkt.modalPrice}/qtl</span>
                        </div>
                        <div className="flex justify-between text-terracotta-600">
                          <span className="font-sans">Freight Cost:</span>
                          <span>-₹{mkt.costs.transportCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-terracotta-700">
                          <span className="font-sans">Spoilage Loss:</span>
                          <span>-₹{mkt.costs.spoilageLoss.toLocaleString()} ({mkt.costs.spoilagePct}%)</span>
                        </div>
                        <div className="flex justify-between border-t border-chlorophyll/10 pt-1 text-emerald-800 font-extrabold text-sm">
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
