import React from 'react';
import { Settings as SettingsIcon, Shield, Server, Bell, Database, UserCheck, KeySquare } from 'lucide-react';

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <SettingsIcon className="mr-3 text-slate-400" /> System Settings
        </h1>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition font-medium">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { icon: Shield, label: 'ML Engine Config', active: true },
            { icon: Server, label: 'Data Processing', active: false },
            { icon: Bell, label: 'Notifications & Alerts', active: false },
            { icon: Database, label: 'Database & Retention', active: false },
            { icon: UserCheck, label: 'Role-Based Access', active: false },
            { icon: KeySquare, label: 'API Keys', active: false },
          ].map((item, index) => (
            <button key={index} className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition ${item.active ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <item.icon className={`w-5 h-5 mr-3 ${item.active ? 'text-blue-400' : 'text-slate-500'}`} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Setting Panels */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-4 mb-4">Machine Learning Engine</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-200 font-medium">Inference Threshold</h3>
                  <p className="text-sm text-slate-400">Minimum probability score to trigger an Alert.</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-slate-400 text-sm">85%</span>
                  <input type="range" min="50" max="99" defaultValue="85" className="w-32 accent-blue-500" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-slate-200 font-medium">Automatic Blocking</h3>
                  <p className="text-sm text-slate-400">Block IPs instantly if threat confidence &gt; 95%.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex flex-col space-y-2">
                <label className="text-slate-200 font-medium">Active Classification Model</label>
                <select className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-blue-500">
                  <option>RandomForest_CICIDS2017_v2.pkl (Production)</option>
                  <option>XGBoost_Fast_v1.pkl (Performance)</option>
                  <option>Autoencoder_Anomaly_v1 (Experimental)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6">
             <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-4 mb-4">Packet Processor</h2>
             <div className="space-y-4">
               <div className="flex flex-col space-y-2">
                  <label className="text-slate-200 font-medium">Capture Interface Name (Sniffer)</label>
                  <input type="text" defaultValue="Ethernet0" className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-blue-500" />
                  <p className="text-xs text-slate-500">Requires restarting the python sniffing service.</p>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;