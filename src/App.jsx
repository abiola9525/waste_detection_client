import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Simulator from './pages/Simulator';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-900 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'dashboard' && <Dashboard />}
      {activeTab === 'simulator' && <Simulator />}
    </div>
  );
}

export default App;
