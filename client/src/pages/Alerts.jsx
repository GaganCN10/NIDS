import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, Clock, Filter, Search } from 'lucide-react';

const Alerts = () => {
  // Mock Alert Data
  const [alerts, setAlerts] = useState([
    { id: 'ALT-1042', severity: 'High', type: 'DDoS Attempt', source: '192.168.1.105', dest: '10.0.0.5', time: '10 minutes ago', status: 'Unacknowledged' },
    { id: 'ALT-1041', severity: 'Critical', type: 'Botnet C2 Traffic', source: '45.33.12.99', dest: '192.168.1.50', time: '25 minutes ago', status: 'Investigating' },
    { id: 'ALT-1040', severity: 'Medium', type: 'Port Scan', source: '10.0.0.12', dest: '192.168.1.1', time: '1 hour ago', status: 'Resolved' },
    { id: 'ALT-1039', severity: 'Low', type: 'Unusual SSH Login', source: '192.168.1.20', dest: '192.168.1.100', time: '2 hours ago', status: 'Resolved' },
  ]);

  const severityColors = {
    Critical: 'bg-red-500/20 text-red-400 border-red-500/50',
    High: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    Low: 'bg-blue-500/20 text-blue-400 border-blue-500/50'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <ShieldAlert className="mr-3 text-red-500" /> Security Alerts
        </h1>
        <div className="flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700 transition">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition font-medium">
             Export CSV
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Active Alerts', value: '24', color: 'text-white' },
          { label: 'Critical Threats', value: '3', color: 'text-red-500' },
          { label: 'High Severity', value: '8', color: 'text-orange-500' },
          { label: 'Auto-Resolved', value: '142', color: 'text-emerald-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-lg">
             <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
             <p className={`text-3xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search alerts..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900 border-b border-slate-700 text-xs uppercase font-semibold text-slate-300">
              <tr>
                <th className="px-6 py-4">Alert ID</th>
                <th className="px-6 py-4">Severity</th>
                <th className="px-6 py-4">Threat Type</th>
                <th className="px-6 py-4">Source / Dest</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {alerts.map((alert, index) => (
                <tr key={index} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-300">{alert.id}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${severityColors[alert.severity]}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">{alert.type}</td>
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs">
                      <span className="text-blue-400">{alert.source}</span>
                      <span className="text-slate-500 mx-2">→</span>
                      <span className="text-purple-400">{alert.dest}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex items-center">
                    <Clock className="w-3 h-3 mr-2 text-slate-500" /> {alert.time}
                  </td>
                  <td className="px-6 py-4">
                    {alert.status === 'Resolved' ? (
                      <span className="flex items-center text-emerald-400 text-xs"><CheckCircle className="w-3 h-3 mr-1" /> Resolved</span>
                    ) : (
                      <span className="flex items-center text-yellow-400 text-xs"><AlertTriangle className="w-3 h-3 mr-1" /> {alert.status}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Alerts;