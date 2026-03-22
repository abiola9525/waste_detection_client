import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

export default function BinMap({ bins, selectedBinId, onSelectBin }) {
  // Default center (e.g. general NYC location if bins have those lats/lngs)
  const defaultCenter = [40.7505, -73.9934];
  
  // Calculate average center from bins
  const validBins = bins.filter(b => b.latitude && b.longitude);
  const mapCenter = validBins.length > 0 
    ? [
        validBins.reduce((acc, b) => acc + b.latitude, 0) / validBins.length,
        validBins.reduce((acc, b) => acc + b.longitude, 0) / validBins.length
      ]
    : defaultCenter;

  const getColor = (fill) => {
    if (fill > 80) return '#f43f5e'; // rose-500
    if (fill >= 50) return '#fbbf24'; // amber-400
    return '#10b981'; // emerald-500
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl shadow-xl overflow-hidden h-[400px] flex flex-col relative z-0">
      <div className="p-4 border-b border-slate-700 bg-slate-800/80 z-10 absolute top-0 w-full backdrop-blur-md">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <MapPin className="text-emerald-500 w-5 h-5" />
          Live City Map
        </h3>
      </div>
      <div className="flex-1 pt-14">
        <MapContainer center={mapCenter} zoom={11} style={{ height: '100%', width: '100%' }} zoomControl={false}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; CARTO'
          />
          {validBins.map(bin => {
            const isSelected = selectedBinId === bin.bin_id;
            return (
              <CircleMarker
                key={bin.bin_id}
                center={[bin.latitude, bin.longitude]}
                radius={isSelected ? 10 : 6}
                pathOptions={{ 
                  fillColor: getColor(bin.fill_percentage),
                  fillOpacity: 1,
                  color: isSelected ? '#ffffff' : '#0f172a',
                  weight: isSelected ? 3 : 1
                }}
                eventHandlers={{
                  click: () => onSelectBin(bin),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1">
                    <h4 className="font-bold text-sm text-slate-900 mb-0.5">{bin.bin_id}</h4>
                    <p className="text-xs text-slate-600 mb-1">{bin.location_name}</p>
                    <p className="text-xs font-bold" style={{ color: getColor(bin.fill_percentage) }}>
                      Fill: {bin.fill_percentage}%
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
