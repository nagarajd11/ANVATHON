import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Trophy, AlertTriangle, Truck } from 'lucide-react';
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

// Custom HTML/SVG Pin Icons
const createCustomIcon = (type, label) => {
  let bgColor = '#3b82f6';
  let borderColor = '#1d4ed8';
  let iconSvg = '';

  if (type === 'ORIGIN') {
    bgColor = '#10b981';
    borderColor = '#047857';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L4 6v12l8 4 8-4V6l-8-4z"/></svg>`;
  } else if (type === 'OPTIMAL') {
    bgColor = '#16a34a';
    borderColor = '#14532d';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`;
  } else if (type === 'TRAP') {
    bgColor = '#dc2626';
    borderColor = '#991b1b';
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
  } else {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
  }

  const html = `
    <div style="
      background-color: ${bgColor};
      border: 2px solid ${borderColor};
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
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
      ${label ? `<span style="position: absolute; bottom: -18px; background: rgba(15,23,42,0.85); color: #fff; font-size: 10px; font-weight: 700; padding: 1px 5px; border-radius: 4px; white-space: nowrap;">${label}</span>` : ''}
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
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
      
      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 text-blue-700 rounded-lg">
              <Navigation className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.mapTitle}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{t.mapSub}</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-700 inline-block" />
            <span>{t.originLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-green-600 border border-green-900 inline-block" />
            <span>{t.optimalLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-600 border border-rose-900 inline-block" />
            <span>{t.trapLegend}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-blue-500 border border-blue-800 inline-block" />
            <span>{t.otherLegend}</span>
          </div>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="h-[440px] w-full rounded-xl overflow-hidden border border-slate-200 relative shadow-inner">
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
              <div className="p-1 text-slate-900">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                  Origin Location
                </span>
                <strong className="text-sm font-bold block">{originDistrict} District</strong>
                <span className="text-xs text-slate-500">Farmer Lot Departure Point</span>
              </div>
            </Popup>
          </Marker>

          {/* Market Markers & Route Lines */}
          {topMarkets.map((mkt, idx) => {
            const isBest = bestNetMarket && mkt.marketId === bestNetMarket.marketId;
            const isTrap = highestPriceMarket && mkt.marketId === highestPriceMarket.marketId && !isBest;
            const markerType = isBest ? 'OPTIMAL' : isTrap ? 'TRAP' : 'OTHER';
            const polylineColor = isBest ? '#16a34a' : isTrap ? '#dc2626' : '#94a3b8';
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
                    opacity: 0.8
                  }}
                />

                {/* Market Pin */}
                <Marker
                  position={[mkt.latitude, mkt.longitude]}
                  icon={createCustomIcon(markerType, `#${idx + 1}`)}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px] text-slate-900">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                          Rank #{idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {mkt.roadDistanceKm} km ({mkt.transitHours}h)
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mb-0.5">
                        {mkt.marketName}
                      </h4>
                      <p className="text-xs text-slate-500 mb-2">{mkt.district} District</p>
                      
                      <div className="bg-slate-50 p-2 rounded-lg space-y-1 text-xs border border-slate-200">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Mandi Price:</span>
                          <span className="font-bold">₹{mkt.modalPrice}/qtl</span>
                        </div>
                        <div className="flex justify-between text-rose-600">
                          <span>Freight Cost:</span>
                          <span>-₹{mkt.costs.transportCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-amber-600">
                          <span>Spoilage Loss:</span>
                          <span>-₹{mkt.costs.spoilageLoss.toLocaleString()} ({mkt.costs.spoilagePct}%)</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-1 text-emerald-700 font-black">
                          <span>Net In-Hand:</span>
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

