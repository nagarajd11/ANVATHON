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
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg border border-slate-700 text-xs">
          <p className="font-bold text-sm mb-1">{data.fullName}</p>
          <p className="text-slate-400 mb-2">Gross: ₹{data.gross.toLocaleString()}</p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4 text-emerald-400 font-bold">
              <span>Net In-Hand Profit:</span>
              <span>₹{data["Net In-Hand Profit"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 text-rose-400">
              <span>Freight Cost:</span>
              <span>-₹{data["Freight Cost"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 text-amber-400">
              <span>Transit Spoilage Loss:</span>
              <span>-₹{data["Transit Spoilage Loss"].toLocaleString()}</span>
            </div>
            <div className="flex justify-between gap-4 text-slate-300">
              <span>Mandi Fees & Cess:</span>
              <span>-₹{data["Mandi Fees & Cess"].toLocaleString()}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 mb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.costBreakdownTitle}</h3>
            <p className="text-xs text-slate-500">
              Visual comparison of Gross Value vs. In-Hand Profit across Top Mandis
            </p>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
            />
            <Bar dataKey="Net In-Hand Profit" stackId="a" fill="#16a34a" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Freight Cost" stackId="a" fill="#f43f5e" />
            <Bar dataKey="Transit Spoilage Loss" stackId="a" fill="#f59e0b" />
            <Bar dataKey="Mandi Fees & Cess" stackId="a" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

