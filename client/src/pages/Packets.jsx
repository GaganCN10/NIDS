import React, { useState } from 'react';
import { Archive, Search, Download, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const Packets = () => {
  // Mock data to simulate historical DB fetch
  const mockPackets = Array.from({ length: 15 }).map((_, i) => ({
    id: `pkt_${10000 + i}`,
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    sourceIp: `192.168.1.${Math.floor(Math.random() * 255)}`,
    destIp: `10.0.0.${Math.floor(Math.random() * 255)}`,
    protocol: ['TCP', 'UDP', 'ICMP', 'DNS'][Math.floor(Math.random() * 4)],
    size: Math.floor(Math.random() * 1500 + 40),
    classification: Math.random() > 0.8 ? 'Anomaly' : 'Normal',
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Archive className="mr-3 text-slate-400" /> Historical Packets
        </h1>
        <button className="flex items-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition">
          <Download className="w-4 h-4 mr-2" /> Export PCAP
        </button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-700 flex flex-wrap gap-4 items-center bg-slate-800/80">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by IP, Protocol, or Classification..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500">
              <option>All Protocols</option>
              <option>TCP</option>
              <option>UDP</option>
              <option>ICMP</option>
            </select>
            
            <select className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Custom Range...</option>
            </select>
            
            <button className="flex items-center px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900 border-b border-slate-700 text-xs uppercase font-semibold text-slate-300">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Source IP</th>
                <th className="px-6 py-4">Destination IP</th>
                <th className="px-6 py-4">Protocol</th>
                <th className="px-6 py-4">Size (Bytes)</th>
                <th className="px-6 py-4">ML Class</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {mockPackets.map((packet, idx) => (
                <tr key={idx} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(packet.timestamp).toLocaleString()}</td>
                  <td className="px-6 py-4 font-mono text-blue-400">{packet.sourceIp}</td>
                  <td className="px-6 py-4 font-mono text-purple-400">{packet.destIp}</td>
                  <td className="px-6 py-4 font-mono">{packet.protocol}</td>
                  <td className="px-6 py-4">{packet.size}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      packet.classification === 'Anomaly' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {packet.classification}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-white transition">View Data</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-slate-700 flex justify-between items-center text-sm text-slate-400">
           <span>Showing 1 to 15 of 24,091 entries</span>
           <div className="flex space-x-1">
             <button className="px-2 py-1 bg-slate-900 border border-slate-700 rounded hover:bg-slate-800 flex items-center"><ChevronLeft className="w-4 h-4" /> Prev</button>
             <button className="px-3 py-1 bg-blue-600 border border-blue-500 text-white rounded">1</button>
             <button className="px-3 py-1 bg-slate-900 border border-slate-700 rounded hover:bg-slate-800">2</button>
             <button className="px-3 py-1 bg-slate-900 border border-slate-700 rounded hover:bg-slate-800">3</button>
             <button className="px-2 py-1 bg-slate-900 border border-slate-700 rounded hover:bg-slate-800 flex items-center">Next <ChevronRight className="w-4 h-4" /></button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Packets;