import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import { TRANSLATIONS } from '../translations';
import { toLocalizedMandiName } from '../utils/kannadaLocalization';

export default function CostBreakdownChart({ analysis, lang }) {
  if (!analysis || !analysis.rankedMarkets) return null;

  const t = TRANSLATIONS[lang];
  const topMarkets = analysis.rankedMarkets.slice(0, 6);

  // Prepare chart data
  const chartData = topMarkets.map((mkt) => ({
    name: toLocalizedMandiName(mkt.marketName, lang).replace(' ಎಪಿಎಂಸಿ', '').replace(' ಮಾರುಕಟ್ಟೆ', '').replace(' APMC', '').replace(' Market Yard', ''),
    fullName: toLocalizedMandiName(mkt.marketName, lang),
    "Cash in Pocket": mkt.netReturnInr,
    "Freight & Fuel": mkt.costs.transportCost,
    "Produce Decay": mkt.costs.spoilageLoss,
    "Mandi Fees": mkt.costs.marketFees,
    gross: mkt.grossRevenue
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-dark-card rounded-2xl p-4 shadow-xl border border-white/15 text-xs text-white font-mono backdrop-blur-sm">
          <p className="font-sans font-bold text-sm mb-1 text-emerald-300">{data.fullName}</p>
          <p className="text-white/60 mb-2 tabular-nums font-mono">Gross Total: ₹{data.gross.toLocaleString()}</p>
          <div className="space-y-1.5 tabular-nums">
            <div className="flex justify-between gap-5 text-emerald-300 font-bold border-b border-white/10 pb-1">
              <span className="font-sans">Cash in Pocket:</span>
              <span>₹{data["Cash in Pocket"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-5 text-amber-200">
              <span className="font-sans">Freight & Fuel:</span>
              <span>-₹{data["Freight & Fuel"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-5 text-amber-300">
              <span className="font-sans">Produce Decay:</span>
              <span>-₹{data["Produce Decay"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-5 text-white/70">
              <span className="font-sans">Mandi Fees:</span>
              <span>-₹{data["Mandi Fees"].toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-7 mb-8 hover-lift">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">
              <BarChart3 className="w-4 h-4 text-emerald-300" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-emerald-300 font-mono">
              Earnings Breakdown
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white text-crisp">
            {t.costBreakdownTitle}
          </h3>
          <p className="text-xs text-white/70 mt-0.5 font-sans">
            Comparing advertised gross value against the actual cash left in your hands.
          </p>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-72 w-full font-mono">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 15, right: 25, left: 15, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#e2e8f0', fontWeight: 500 }}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '12px', fontSize: '12px', fontFamily: '"Plus Jakarta Sans", sans-serif', color: '#ffffff' }} 
            />
            <Bar dataKey="Cash in Pocket" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Freight & Fuel" stackId="a" fill="#d97706" />
            <Bar dataKey="Produce Decay" stackId="a" fill="#c2410c" />
            <Bar dataKey="Mandi Fees" stackId="a" fill="#64748b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-white/60 font-sans">
        <div>
          <span className="font-bold text-emerald-300">Green = What stays in your pocket</span> • Warm Amber = Sunk travel and decay costs
        </div>
        <div className="text-xs text-white/50 font-mono">
          Top 6 Mandis Compared
        </div>
      </div>

    </div>
  );
}
