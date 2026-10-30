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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              Saved Mandi Route Scenarios (No Login Required)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List Body */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {isLoading ? (
            <div className="py-12 text-center text-xs text-slate-400">
              Loading scenarios from MongoDB...
            </div>
          ) : savedList.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No saved scenarios found yet. Run an analysis and click "Save Scenario"!
            </div>
          ) : (
            savedList.map((item) => (
              <div
                key={item.analysis_id}
                className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-all flex items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-sm text-slate-900">
                      {item.crop_name}
                    </span>
                    <span className="font-semibold text-slate-500">
                      ({item.quantity_quintals} qtl)
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {item.origin_district}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-600 flex items-center gap-2">
                    <span className="font-bold text-emerald-700">
                      Best: {item.recommended_market?.market_name} (₹{item.recommended_market?.net_return_inr?.toLocaleString()})
                    </span>
                    {item.price_trap_delta_inr > 0 && (
                      <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
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
                  className="px-3 py-1.5 rounded-lg bg-agri-600 hover:bg-agri-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer shrink-0"
                >
                  <span>Load</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

