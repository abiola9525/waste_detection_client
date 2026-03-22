import { useState, useEffect } from 'react';
import { getBinsStatus, postTelemetry, getBinHistory } from '../api';
import { Radio, Send, Activity, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function Simulator() {
  const [bins, setBins] = useState([]);
  const [selectedBinId, setSelectedBinId] = useState('');
  const [distance, setDistance] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // Fetch bins on load
  useEffect(() => {
    getBinsStatus().then(data => {
      setBins(data);
      if (data.length > 0) setSelectedBinId(data[0].bin_id);
    }).catch(err => console.error(err));
  }, []);

  // Fetch history when bin selected
  const fetchHistory = (binId) => {
    setLoadingHistory(true);
    getBinHistory(binId).then(data => {
      // Show only recent 30 items for rapid live view
      const recent = data.slice(0, 30);
      setHistory(recent.reverse()); 
    }).finally(() => setLoadingHistory(false));
  };

  useEffect(() => {
    if (selectedBinId) {
      fetchHistory(selectedBinId);
      // Auto refresh this specific page every 3 seconds for "live" feel
      const interval = setInterval(() => fetchHistory(selectedBinId), 3000);
      return () => clearInterval(interval);
    }
  }, [selectedBinId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!selectedBinId || !distance) return;

    setIsSending(true);
    try {
      await postTelemetry(selectedBinId, parseFloat(distance));
      setDistance('');
      // Refresh history immediately
      fetchHistory(selectedBinId);
    } catch (err) {
      alert("Error sending telemetry");
    } finally {
      setIsSending(false);
    }
  };

  const selectedBin = bins.find(b => b.bin_id === selectedBinId);
  const totalDepth = selectedBin ? selectedBin.total_depth_cm : 100;

  return (
    <div className="flex-1 p-6 md:p-8 ml-64 bg-slate-900 min-h-screen text-slate-200">
      <div className="flex justify-between items-end mb-8 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Radio className="text-emerald-500 w-8 h-8 animate-pulse" />
            Live Telemetry Console
          </h2>
          <p className="text-slate-400 mt-1">Simulate ESP32 ultrasonic sensor pings and monitor real-time data streaming in.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Simulator Form */}
        <div className="col-span-1">
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="text-emerald-500 w-5 h-5" />
              Sensor Payload Simulator
            </h3>
            
            <form onSubmit={handleSend} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Select Target Bin</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 focus:outline-none focus:border-emerald-500 transition-colors"
                  value={selectedBinId}
                  onChange={(e) => setSelectedBinId(e.target.value)}
                >
                  {bins.map(b => (
                    <option key={b.bin_id} value={b.bin_id}>{b.bin_id} - {b.location_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">
                  Ultrasonic Distance (cm)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.1"
                    min="0"
                    max={totalDepth}
                    required
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-3 pl-4 pr-12 focus:outline-none focus:border-emerald-500 transition-colors placeholder-slate-600"
                    placeholder={`e.g. 25.5 (Max: ${totalDepth})`}
                  />
                  <span className="absolute right-4 top-3.5 text-slate-500 text-sm">cm</span>
                </div>
                {selectedBin && (
                  <p className="text-xs text-slate-500 mt-2">
                    <span className="text-emerald-400 font-bold">0 cm</span> = Full (100%), <span className="text-emerald-400 font-bold">{totalDepth} cm</span> = Empty (0%)
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={isSending}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {isSending ? <Activity className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5" />}
                {isSending ? 'Transmitting...' : 'Transmit Payload'}
              </button>
            </form>
          </div>
        </div>

        {/* Live Chart */}
        <div className="col-span-1 lg:col-span-2">
           <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-xl h-full flex flex-col min-h-[400px]">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <Trash2 className="text-emerald-500 w-5 h-5" />
                 Live Incoming Data Stream
               </h3>
               {loadingHistory ? (
                 <span className="flex items-center gap-2 text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 border border-emerald-500/20 rounded-full">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Syncing
                 </span>
               ) : (
                 <span className="flex items-center gap-2 text-xs text-slate-500 px-2 py-1">
                   <span className="w-2 h-2 rounded-full bg-slate-500"></span> Idle
                 </span>
               )}
             </div>

             <div className="flex-1 w-full min-h-0 relative">
               {history.length === 0 ? (
                 <div className="absolute inset-0 flex items-center justify-center text-slate-500">No data received yet.</div>
               ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="#64748b" 
                      tickFormatter={(val) => new Date(val).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                      tick={{ fontSize: 11 }}
                      tickMargin={10}
                    />
                    <YAxis 
                      stroke="#64748b" 
                      domain={[0, 100]} 
                      tickFormatter={(val) => `${val}%`}
                      tick={{ fontSize: 11 }}
                      tickMargin={10}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '0.75rem' }}
                      itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                      labelFormatter={(val) => new Date(val).toLocaleString()}
                    />
                    <ReferenceLine y={80} stroke="#f43f5e" strokeDasharray="3 3" />
                    <Line 
                      type="stepAfter" 
                      dataKey="fill_percentage" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#1e293b', stroke: '#10b981', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
