import React from 'react';
import { Map, Activity, Globe } from 'lucide-react';

const GeoMap = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Globe className="mr-3 text-blue-400" /> Geo-IP Threat Intelligence
        </h1>
        <div className="flex space-x-2 text-sm">
           <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300 flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span> Live Sync Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-[0]">
         {/* Map placeholder */}
         <div className="lg:col-span-3 bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden relative">
            {/* Overlay grid mimicking a radar / map background */}
            <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center opacity-10 filter invert"></div>
            <div className="absolute inset-0 bg-slate-900/60 z-0"></div>
            
            <div className="relative z-10 p-6 flex flex-col items-center justify-center flex-1">
               <Activity className="w-12 h-12 text-blue-400 opacity-50 mb-4" />
               <h3 className="text-xl font-medium text-slate-300">Global Map Visualization</h3>
               <p className="text-slate-500 mt-2 max-w-md text-center">
                 The 3D interactive WebGL globe requires heavy assets. For now, alerts are localized via MaxMind GeoIP mappings and pushed to regional threat cards.
               </p>
            </div>

            {/* Mock overlay nodes */}
            <div className="absolute top-[30%] left-[20%] z-10 flex flex-col items-center group cursor-pointer">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
              <div className="mt-2 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                DDoS Attack - Seattle, US
              </div>
            </div>
            
            <div className="absolute top-[45%] right-[25%] z-10 flex flex-col items-center group cursor-pointer">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
              <div className="mt-2 bg-slate-900 border border-slate-700 px-2 py-1 rounded text-[10px] text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Anomalous SSH - Beijing, CN
              </div>
            </div>
         </div>

         {/* Region List */}
         <div className="bg-slate-800 rounded-xl border border-slate-700 p-5 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-300 uppercase mb-4 border-b border-slate-700 pb-2">Active Threat Regions</h3>
            <div className="space-y-4 overflow-y-auto pr-2 flex-1">
               {[
                 { region: 'North America', ips: '2,401', percent: '42%', color: 'bg-red-500' },
                 { region: 'East Asia', ips: '1,833', percent: '31%', color: 'bg-orange-500' },
                 { region: 'Eastern Europe', ips: '840', percent: '15%', color: 'bg-yellow-500' },
                 { region: 'Western Europe', ips: '402', percent: '8%', color: 'bg-blue-500' },
                 { region: 'South America', ips: '110', percent: '4%', color: 'bg-slate-500' },
               ].map((item, i) => (
                 <div key={i} className="flex flex-col">
                   <div className="flex justify-between text-sm mb-1">
                     <span className="text-slate-300">{item.region}</span>
                     <span className="text-slate-500 font-mono text-xs">{item.ips} threats</span>
                   </div>
                   <div className="w-full bg-slate-900 rounded-full h-1.5">
                     <div className={`h-1.5 rounded-full ${item.color}`} style={{ width: item.percent }}></div>
                   </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default GeoMap;