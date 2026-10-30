import React, { useState, useEffect } from 'react';
import { 
  Bookmark, 
  X, 
  TrendingUp, 
  Calendar, 
  ArrowRight, 
  Wheat, 
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function SavedAnalysesModal({
  isOpen,
  onClose,
  onLoadScenario
}) {
  const [savedList, setSavedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSaved();
    }
  }, [isOpen]);

  const fetchSaved = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/saved-analyses');
      if (res.ok) {
        const data = await res.json();
        setSavedList(data);
      }
    } catch (e) {
      console.error('Failed to load saved analyses:', e);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-dark-card rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-white/20 max-h-[85vh] flex flex-col text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white font-sans">
              Saved Mandi Route Scenarios (No Login Required)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-white/50 font-mono">
              Loading scenarios from MongoDB...
            </div>
          ) : savedList.length === 0 ? (
            <div className="py-12 text-center text-xs text-white/50 font-mono">
              No saved scenarios found yet. Run an analysis and save it to revisit!
            </div>
          ) : (
            savedList.map((item) => (
              <div
                key={item.analysis_id}
                className="p-3.5 rounded-xl border border-white/15 hover:border-emerald-500/40 bg-white/5 hover:bg-white/10 transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-sm text-white">
                      {item.crop_name}
                    </span>
                    <span className="font-semibold text-white/60 font-mono">
                      ({item.quantity_quintals} qtl)
                    </span>
                    <span className="text-[10px] text-white/50 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {item.origin_district}
                    </span>
                  </div>

                  <div className="text-[11px] text-white/70 flex items-center gap-2 font-mono">
                    <span className="font-bold text-emerald-300">
                      Best: {item.recommended_market?.market_name} (₹{item.recommended_market?.net_return_inr?.toLocaleString()})
                    </span>
                    {item.price_trap_delta_inr > 0 && (
                      <span className="font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-400/30">
                        +₹{item.price_trap_delta_inr.toLocaleString()} extra
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onLoadScenario(item);
                    onClose();
                  }}
                  className="btn-shimmer px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-pine font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
                >
                  <span>Load</span>
                  <ArrowRight className="w-3.5 h-3.5 text-pine" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
