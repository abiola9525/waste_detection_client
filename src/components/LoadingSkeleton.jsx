export default function LoadingSkeleton() {
  return (
    <div className="flex-1 p-8 ml-64 bg-slate-900 min-h-screen">
      <div className="mb-8">
        <div className="h-8 w-48 bg-slate-800 rounded-lg animate-pulse mb-3"></div>
        <div className="h-5 w-64 bg-slate-800 rounded-lg animate-pulse"></div>
      </div>
      
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-2">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-28 bg-slate-800 rounded-2xl animate-pulse"></div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
        <div className="col-span-1 lg:col-span-3 h-[400px] bg-slate-800 rounded-2xl animate-pulse"></div>
        <div className="col-span-1 lg:col-span-2 h-[400px] bg-slate-800 rounded-2xl animate-pulse"></div>
      </div>

      <div className="h-8 w-48 bg-slate-800 rounded-lg animate-pulse mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-44 bg-slate-800 rounded-2xl animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
