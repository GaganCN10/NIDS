import React from 'react';
import { Briefcase, Plus, Clock, User, MessageSquare } from 'lucide-react';

const Cases = () => {
  const cases = [
    { id: 'CAS-9001', title: 'Suspicious SSH Brute Force via 45.33.12.99', status: 'Open', priority: 'High', assignee: 'Jane Doe', comments: 4, updated: '2 hours ago' },
    { id: 'CAS-9002', title: 'Malware Beaconing - Subnet C', status: 'In Progress', priority: 'Critical', assignee: 'John Smith', comments: 12, updated: '15 mins ago' },
    { id: 'CAS-9003', title: 'Unusual Data Exfiltration to AWS', status: 'In Progress', priority: 'High', assignee: 'Alice Johnson', comments: 2, updated: '1 day ago' },
    { id: 'CAS-9004', title: 'Internal Port Scanning', status: 'Closed', priority: 'Low', assignee: 'Jane Doe', comments: 1, updated: '3 days ago' },
  ];

  const priorityColors = {
    Critical: 'text-red-400 bg-red-400/10',
    High: 'text-orange-400 bg-orange-400/10',
    Low: 'text-slate-400 bg-slate-400/10'
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white flex items-center">
          <Briefcase className="mr-3 text-blue-400" /> Investigation Cases
        </h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition font-medium">
          <Plus className="w-4 h-4 mr-2" /> New Case
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {['Open', 'In Progress', 'Pending Review', 'Closed'].map((column) => (
          <div key={column} className="bg-slate-800 border border-slate-700 rounded-xl p-4 min-h-[500px]">
            <h2 className="text-sm font-semibold text-slate-300 uppercase mb-4 px-2 tracking-wider flex justify-between">
              {column}
              <span className="bg-slate-700 text-slate-300 rounded-full px-2 py-0.5 text-xs">
                {cases.filter(c => c.status === column).length}
              </span>
            </h2>
            
            <div className="space-y-3">
              {cases.filter(c => c.status === column).map((kase) => (
                <div key={kase.id} className="bg-slate-900 border border-slate-700 p-4 rounded-lg hover:border-blue-500/50 transition cursor-pointer shadow-sm group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-blue-400">{kase.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${priorityColors[kase.priority]}`}>
                      {kase.priority}
                    </span>
                  </div>
                  <h3 className="text-slate-200 font-medium text-sm leading-snug mb-3 group-hover:text-blue-300 transition-colors">
                    {kase.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-4 border-t border-slate-700/50 pt-3">
                    <div className="flex items-center space-x-2">
                       <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                          <User className="w-3 h-3 text-slate-400" />
                       </div>
                       <span>{kase.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center"><MessageSquare className="w-3 h-3 mr-1" /> {kase.comments}</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {kase.updated.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cases;