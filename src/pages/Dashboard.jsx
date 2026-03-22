import { useState, useEffect } from 'react';
import { useBinsStatus } from '../hooks/useBinsStatus';
import HeroStats from '../components/HeroStats';
import BinGrid from '../components/BinGrid';
import BinMap from '../components/BinMap';
import FillHistoryChart from '../components/FillHistoryChart';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { RefreshCw } from 'lucide-react';

export default function Dashboard() {
  const { bins, loading, error } = useBinsStatus(30000);
  const [selectedBin, setSelectedBin] = useState(null);

  // Auto-select first bin when data loads if none selected
  useEffect(() => {
    if (bins.length > 0 && !selectedBin) {
      setSelectedBin(bins[0]);
    }
  }, [bins, selectedBin]);

  if (loading && bins.length === 0) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="flex-1 p-6 md:p-8 ml-64 bg-slate-900 min-h-screen text-slate-200">
      <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4 relative z-10">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">IoT Waste Dashboard</h2>
          <p className="text-slate-400 mt-1">Real-time telemetry and management system</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-500' : ''}`} />
          {loading ? 'Syncing...' : 'Live Synced'}
        </div>
      </div>

      {error && (
        <div className="bg-rose-500/10 border border-rose-500/50 text-rose-500 p-4 rounded-xl mb-6 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
          <div>
            <p className="font-bold text-sm">Offline / API Error Mode</p>
            <p className="text-xs opacity-90">{error}. Is the Django backend running?</p>
          </div>
        </div>
      )}

      <HeroStats bins={bins} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
        <div className="col-span-1 lg:col-span-3">
          <BinMap 
            bins={bins} 
            selectedBinId={selectedBin?.bin_id}
            onSelectBin={setSelectedBin}
          />
        </div>
        <div className="col-span-1 lg:col-span-2">
          <FillHistoryChart bin={selectedBin} />
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Active Bins ({bins.length})</h3>
      </div>
      
      <BinGrid bins={bins} onSelectBin={setSelectedBin} />
    </div>
  );
}
