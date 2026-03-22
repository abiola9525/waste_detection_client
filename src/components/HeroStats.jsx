import { Trash2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function HeroStats({ bins }) {
  const total = bins.length;
  const needsPickup = bins.filter(b => b.needs_pickup).length;
  const avgFill = total > 0 ? (bins.reduce((acc, b) => acc + b.fill_percentage, 0) / total).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-2">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">Total Bins</p>
            <h3 className="text-3xl font-bold text-white mt-1">{total}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-blue-500" />
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">Needs Pickup</p>
            <h3 className="text-3xl font-bold text-white mt-1">{needsPickup}</h3>
          </div>
          <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-rose-500" />
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium">Avg City Fill Level</p>
            <h3 className="text-3xl font-bold text-white mt-1">{avgFill}%</h3>
          </div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-emerald-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
