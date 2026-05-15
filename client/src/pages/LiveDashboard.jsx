import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { addLivePacket } from '../store/slices/packetSlice';
import { Activity, ShieldAlert, Wifi, Shield, AlertOctagon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDistanceToNow } from 'date-fns';

const SOCKET_URL = 'http://localhost:5000';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex items-center">
    <div className={`p-4 rounded-lg bg-slate-900 ${colorClass}`}>
      <Icon className="h-6 w-6" />
    </div>
    <div className="ml-5">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </div>
  </div>
);

const getSeverityDetails = (score) => {
  if (score >= 90) return { label: 'CRITICAL', color: 'bg-purple-900/50 text-purple-400 border-purple-500', barInfo: 'bg-purple-500' };
  if (score >= 71) return { label: 'HIGH', color: 'bg-red-900/50 text-red-400 border-red-500', barInfo: 'bg-red-500' };
  if (score >= 46) return { label: 'MEDIUM', color: 'bg-orange-900/50 text-orange-400 border-orange-500', barInfo: 'bg-orange-500' };
  if (score >= 21) return { label: 'LOW', color: 'bg-yellow-900/50 text-yellow-400 border-yellow-500', barInfo: 'bg-yellow-500' };
  return { label: 'SAFE', color: 'bg-green-900/50 text-green-400 border-green-500', barInfo: 'bg-green-500' };
};

const LiveDashboard = () => {
  const dispatch = useDispatch();
  const { livePackets, stats } = useSelector((state) => state.packets);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedPacket, setSelectedPacket] = useState(null);

  useEffect(() => {
    const socket = io(SOCKET_URL);
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    socket.on('packet:new', (packet) => {
      dispatch(addLivePacket(packet));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const attackData = React.useMemo(() => [
    { name: 'Critical', count: stats.critical, fill: '#a855f7' },
    { name: 'High', count: stats.high, fill: '#ef4444' },
    { name: 'Med', count: stats.medium, fill: '#f97316' },
  ], [stats.critical, stats.high, stats.medium]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Live Traffic Analysis</h1>
        <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
          <div className={`h-3 w-3 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-slate-300">
            {isConnected ? 'Engine Online' : 'Simulator Mode'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Processed Packets" value={stats.safe + stats.low + stats.medium + stats.high + stats.critical} icon={Activity} colorClass="text-blue-500" />
        <StatCard title="Critical Threat" value={stats.critical} icon={AlertOctagon} colorClass="text-purple-500" />
        <StatCard title="High Threat" value={stats.high} icon={ShieldAlert} colorClass="text-red-500" />
        <StatCard title="Safe Traffic" value={stats.safe} icon={Shield} colorClass="text-green-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-96">
        <div className="col-span-1 lg:col-span-2 bg-slate-800 rounded-xl border border-slate-700 flex flex-col overflow-hidden min-h-[400px]">
          <div className="p-4 border-b border-slate-700 bg-slate-800/80 font-medium text-slate-200">
            Live Packet Feed
          </div>
          <div className="flex-1 overflow-x-auto p-4">
            <table className="w-full min-w-[700px] text-left text-sm text-slate-300">
              <thead className="text-xs uppercase bg-slate-900 border-b border-slate-700 text-slate-400 sticky top-0">
                <tr>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Source IP</th>
                  <th className="px-4 py-3">Dest IP</th>
                  <th className="px-4 py-3">Protocol</th>
                  <th className="px-4 py-3">Score</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {livePackets.map((packet, index) => {
                  const severity = getSeverityDetails(packet.adversityScore);
                  return (
                    <tr key={packet._id || `${packet.timestamp}-${index}`} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap">{formatDistanceToNow(new Date(packet.timestamp))}</td>
                      <td className="px-4 py-3 font-mono">{packet.sourceIp}</td>
                      <td className="px-4 py-3 font-mono">{packet.destIp}</td>
                      <td className="px-4 py-3"><span className="bg-slate-700 px-2 py-1 rounded text-xs">{packet.protocol}</span></td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${severity.color}`}>
                          {packet.adversityScore} • {severity.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button 
                          onClick={() => setSelectedPacket(packet)}
                          className="text-blue-400 hover:text-blue-300 font-medium px-2 py-1 bg-blue-900/20 rounded shadow-sm hover:bg-blue-800/40 transition-colors"
                        >
                          Inspect
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 shrink-0 flex flex-col">
          <h3 className="font-medium text-slate-200 mb-4">Threat Distribution</h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attackData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Packet Inspection Modal */}
      {selectedPacket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-slate-700 bg-slate-900">
              <h3 className="text-lg font-semibold text-white">Packet Details</h3>
              <button 
                onClick={() => setSelectedPacket(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
                  <p className="text-xs text-slate-400 uppercase">Routing</p>
                  <div className="mt-2 space-y-1 text-sm font-mono text-slate-200">
                    <p>SRC: {selectedPacket.sourceIp} : {selectedPacket.sourcePort || 'Any'}</p>
                    <p>DST: {selectedPacket.destIp} : {selectedPacket.destPort || 'Any'}</p>
                    <p>TTL: {selectedPacket.ttl || 'N/A'}</p>
                  </div>
                </div>
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg">
                  <p className="text-xs text-slate-400 uppercase">Payload & ML Output</p>
                  <div className="mt-2 space-y-1 text-sm text-slate-200">
                    <p>Protocol: <span className="font-mono text-blue-400">{selectedPacket.protocol}</span></p>
                    <p>Size: {selectedPacket.size} Bytes</p>
                    <p className="text-yellow-400">Class: {selectedPacket.classification}</p>
                    <p>Flags: {selectedPacket.flags || 'None'}</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Machine Learning SHAP Values</h4>
                  <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-400">
                     {selectedPacket.shapValues ? JSON.stringify(selectedPacket.shapValues, null, 2) : 'No Explainability Array Provided.'}
                  </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-700 bg-slate-900 flex justify-end space-x-3">
               <button onClick={() => setSelectedPacket(null)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 text-sm">Close</button>
               <button className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded text-white text-sm font-medium">Add to Blocklist</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LiveDashboard;