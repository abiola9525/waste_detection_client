import BinCard from './BinCard';

export default function BinGrid({ bins, onSelectBin }) {
  if (!bins || bins.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {bins.map(bin => (
        <BinCard 
          key={bin.bin_id} 
          bin={bin} 
          onClick={() => onSelectBin(bin)} 
        />
      ))}
    </div>
  );
}
