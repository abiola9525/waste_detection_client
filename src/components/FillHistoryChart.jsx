import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useBinHistory } from '../hooks/useBinHistory';

export default function FillHistoryChart({ bin }) {
  const { history, loading, error } = useBinHistory(bin?.bin_id);

  if (!bin) {
    return (
      <div className="h-[400px] flex items-center justify-center text-slate-500 bg-slate-800/20 rounded-2xl border border-slate-700/50">
        <p>Select a bin from the map or list to view fill history</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center text-slate-400 bg-slate-800/20 rounded-2xl border border-slate-700/50 animate-pulse">
        <p>Loading {bin.bin_id} history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[400px] flex items-center justify-center text-rose-500 bg-slate-800/20 rounded-2xl border border-slate-700/50">
        <p>{error}</p>
      </div>
    );
  }

  const customTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-700 p-3 rounded-xl shadow-xl">
          <p className="text-slate-300 text-sm mb-1">{new Date(label).toLocaleString()}</p>
          <p className="text-emerald-400 font-bold">
            Fill Level: {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl w-full h-[400px] flex flex-col">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-emerald-500">{bin.bin_id}</span> 
        <span className="text-slate-400 text-sm font-normal">Fill History (24h)</span>
      </h3>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis 
              dataKey="timestamp" 
              stroke="#64748b" 
              tickFormatter={(val) => new Date(val).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis 
              stroke="#64748b" 
              domain={[0, 100]} 
              tickFormatter={(val) => `${val}%`}
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <Tooltip content={customTooltip} />
            <ReferenceLine y={80} stroke="#f43f5e" strokeDasharray="3 3" label={{ position: 'top', value: 'Threshold', fill: '#f43f5e', fontSize: 10 }} />
            <Line 
              type="monotone" 
              dataKey="fill_percentage" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
