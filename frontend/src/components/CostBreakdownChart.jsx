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

export default function CostBreakdownChart({ analysis, lang }) {
  if (!analysis || !analysis.rankedMarkets) return null;

  const t = TRANSLATIONS[lang];
  const topMarkets = analysis.rankedMarkets.slice(0, 6);

  // Prepare chart data
  const chartData = topMarkets.map((mkt) => ({
    name: mkt.marketName.replace(' APMC', '').replace(' Market Yard', ''),
    fullName: mkt.marketName,
    "Net In-Hand Profit": mkt.netReturnInr,
    "Freight Cost": mkt.costs.transportCost,
    "Transit Spoilage Loss": mkt.costs.spoilageLoss,
    "Mandi Fees & Cess": mkt.costs.marketFees,
    gross: mkt.grossRevenue
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="glass-dark-card rounded-2xl p-4 shadow-xl border border-white/10 text-xs text-white font-mono">
          <p className="font-sans font-bold text-sm mb-1 text-emerald-300">{data.fullName}</p>
          <p className="text-white/60 mb-2 tabular-nums font-mono">Gross Modal Value: ₹{data.gross.toLocaleString()}</p>
          <div className="space-y-1.5 tabular-nums">
            <div className="flex justify-between gap-5 text-emerald-400 font-bold border-b border-white/10 pb-1">
              <span className="font-sans">Net Take-Home:</span>
              <span>₹{data["Net In-Hand Profit"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-5 text-terracotta-300">
              <span className="font-sans">Freight Cost:</span>
              <span>-₹{data["Freight Cost"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-5 text-terracotta-400">
              <span className="font-sans">Transit Spoilage Loss:</span>
              <span>-₹{data["Transit Spoilage Loss"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-5 text-white/70">
              <span className="font-sans">Mandi Fees & Cess:</span>
              <span>-₹{data["Mandi Fees & Cess"].toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 border border-emerald-900/10 shadow-[0_16px_45px_-10px_rgba(4,47,46,0.22),inset_0_1px_1px_0_rgba(255,255,255,0.9)]">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-chlorophyll/10 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-md bg-emerald-500/10 text-emerald-800">
              <BarChart3 className="w-4 h-4 text-emerald-700" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-chlorophyll/60">
              Financial Decomposition Ledger
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-chlorophyll tracking-wide">
            {t.costBreakdownTitle}
          </h3>
          <p className="text-xs text-chlorophyll/70 mt-1 font-sans">
            Stacked visualization comparing Gross Auction Value against Real In-Hand Farmer Cash
          </p>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full font-mono">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(9,38,28,0.06)" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: '#09261C', fontWeight: 600 }}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#09261C' }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '14px', fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            />
            <Bar dataKey="Net In-Hand Profit" stackId="a" fill="#059669" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Freight Cost" stackId="a" fill="#ea580c" />
            <Bar dataKey="Transit Spoilage Loss" stackId="a" fill="#c2410c" />
            <Bar dataKey="Mandi Fees & Cess" stackId="a" fill="#52796f" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
