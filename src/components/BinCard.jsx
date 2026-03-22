import { MapPin, Clock } from 'lucide-react';

export default function BinCard({ bin, onClick }) {
  const fill = bin.fill_percentage;
  
  let colorClass = "bg-emerald-500";
  let textColor = "text-emerald-500";
  let bgLight = "bg-emerald-500/10";
  
  if (fill > 80) {
    colorClass = "bg-rose-500";
    textColor = "text-rose-500";
    bgLight = "bg-rose-500/10";
  } else if (fill >= 50) {
    colorClass = "bg-amber-400";
    textColor = "text-amber-400";
    bgLight = "bg-amber-400/10";
  }

  const timeUntilFull = bin.estimated_hours_until_full;
  const badgeText = timeUntilFull !== null 
    ? (timeUntilFull === 0 ? "Full" : `~${timeUntilFull}h until full`)
    : "Static";

  return (
    <div 
      onClick={onClick}
      className="bg-slate-800/40 backdrop-blur border border-slate-700 hover:border-slate-500 transition-all rounded-2xl p-5 cursor-pointer shadow-lg group relative overflow-hidden flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors uppercase tracking-wider text-sm">{bin.bin_id}</h4>
          <div className="flex items-center gap-1.5 text-slate-400 text-sm">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate max-w-[140px] leading-tight">{bin.location_name}</span>
          </div>
        </div>
        <div className={`text-[10px] font-bold px-2 py-1 rounded-full ${bgLight} ${textColor} whitespace-nowrap`}>
          {badgeText}
        </div>
      </div>

      <div className="flex items-end gap-6 h-28">
        {/* Vertical Progress Bar */}
        <div className="h-full w-6 bg-slate-900 rounded-full overflow-hidden relative border border-slate-700">
          <div 
            className={`absolute bottom-0 w-full transition-all duration-1000 ease-out ${colorClass}`}
            style={{ height: `${fill}%` }}
          />
        </div>
        
        <div className="flex-1 pb-1">
          <div className="flex items-baseline gap-1 mb-1">
             <span className="text-4xl font-bold text-white leading-none">{fill.toFixed(0)}</span>
             <span className="text-xl text-slate-400 font-medium">%</span>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-3">Fill Level</p>
          
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Updated: {bin.latest_reading ? new Date(bin.latest_reading.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Never'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
