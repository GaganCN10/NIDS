import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { Bell, User, LogOut, Settings, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 md:px-6 z-10 w-full shrink-0">
      <div className="flex items-center">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 text-slate-400 hover:text-white md:hidden focus:outline-none"
        >
          {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <div className="text-lg md:text-xl font-semibold text-slate-200 truncate pr-4">
          AI-Powered NIDS Dashboard
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button className="text-slate-400 hover:text-slate-100 relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div className="relative flex items-center space-x-3 border-l border-slate-700 pl-6">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-900/50 border border-blue-700 hover:bg-blue-800/50 transition-colors">
              <User className="h-4 w-4 text-blue-300" />
            </div>
            <span className="text-sm font-medium text-slate-300 hidden sm:block hover:text-white transition-colors">
              {userInfo?.username || 'Analyst'}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-10 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1 border border-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-4 py-2 border-b border-slate-700">
                <p className="text-xs text-slate-400">Signed in as</p>
                <p className="text-sm font-medium text-slate-200 truncate">{userInfo?.username}</p>
                <p className="text-xs text-blue-400 mt-1">{userInfo?.role}</p>
              </div>
              <Link to="/settings" onClick={() => setProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                <Settings className="mr-2 h-4 w-4" /> Settings
              </Link>
              <button onClick={handleLogout} className="flex w-full items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-700">
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;