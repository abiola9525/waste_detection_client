import { LayoutDashboard, Map, Settings, Trash2, Bell, Radio } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const getTabClass = (tabId) => 
    activeTab === tabId 
      ? "w-full flex items-center gap-3 px-4 py-3 bg-slate-700/50 text-emerald-400 rounded-xl transition-colors border border-slate-700"
      : "w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-xl transition-colors border border-transparent";

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-slate-800 border-r border-slate-700 flex flex-col z-20">
      <div className="p-6 flex items-center gap-3 border-b border-slate-700">
        <Trash2 className="w-8 h-8 text-emerald-500" />
        <h1 className="text-xl font-bold tracking-tight text-white">WasteSmart</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <button onClick={() => setActiveTab('dashboard')} className={getTabClass('dashboard')}>
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </button>
        <button onClick={() => setActiveTab('simulator')} className={getTabClass('simulator')}>
          <Radio className="w-5 h-5" />
          <span className="font-medium">Live Telemetry</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-xl transition-colors border border-transparent">
          <Map className="w-5 h-5" />
          <span className="font-medium">City Map</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-xl transition-colors border border-transparent">
          <Bell className="w-5 h-5" />
          <span className="font-medium">Alerts</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700/30 rounded-xl transition-colors border border-transparent">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-slate-400">City Operator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
