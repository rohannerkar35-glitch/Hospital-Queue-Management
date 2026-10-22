import React, { useState } from 'react';
import { 
  Activity, 
  Clock, 
  Calendar, 
  User, 
  Bell, 
  Search, 
  PhoneCall, 
  Moon, 
  Sun, 
  ShieldCheck, 
  Sparkles,
  ChevronDown,
  Stethoscope,
  LayoutDashboard,
  QrCode,
  Users,
  CheckCircle2,
  X
} from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  userRole, 
  setUserRole, 
  darkMode, 
  setDarkMode,
  notifications,
  unreadCount,
  onOpenNotifications,
  onOpenEmergencyModal
}) {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleLabels = {
    patient: 'Patient View',
    doctor: 'Doctor Console',
    reception: 'Reception Desk',
    admin: 'Admin Dashboard',
    public: 'Public Visitor'
  };

  const roleColors = {
    patient: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-900/40 dark:text-emerald-300',
    doctor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-300',
    reception: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/40 dark:text-purple-300',
    admin: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-900/40 dark:text-amber-300',
    public: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300'
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-xs">
      {/* Top Banner Alert / Emergency bar */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#00B894] text-white text-xs py-1.5 px-4 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 container mx-auto">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span><strong>OPD Real-Time System Active:</strong> Average queue wait time reduced by 78% today!</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs">
          <button 
            onClick={onOpenEmergencyModal} 
            className="bg-red-500 hover:bg-red-600 px-2.5 py-0.5 rounded-full font-bold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <PhoneCall className="w-3 h-3 animate-pulse" /> Emergency OPD Helpline
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#00B894] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Smart<span className="text-[#0066CC]">OPD</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-50 text-[#0066CC] dark:bg-blue-950/60 dark:text-blue-300 rounded-md border border-blue-200/50">
                  Hospital v2.4
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Real-Time Patient Flow & Queue Manager</p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-white dark:bg-slate-700 text-[#0066CC] dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'booking'
                  ? 'bg-white dark:bg-slate-700 text-[#0066CC] dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Book Appointment
            </button>
            <button
              onClick={() => setActiveTab('doctors')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'doctors'
                  ? 'bg-white dark:bg-slate-700 text-[#0066CC] dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Doctors & Availability
            </button>
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'queue'
                  ? 'bg-white dark:bg-slate-700 text-[#0066CC] dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Queue Tracker
            </button>
            <button
              onClick={() => setActiveTab('ai-features')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                activeTab === 'ai-features'
                  ? 'bg-white dark:bg-slate-700 text-[#0066CC] dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              AI Predictor
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">

            {/* Role Switcher Pill */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shadow-xs cursor-pointer ${roleColors[userRole]}`}
              >
                <span>{roleLabels[userRole]}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400">Switch System View Role</p>
                  </div>
                  <button
                    onClick={() => { setUserRole('patient'); setActiveTab('patient-portal'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                  >
                    <span className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-emerald-600" /> Patient Portal</span>
                    {userRole === 'patient' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => { setUserRole('doctor'); setActiveTab('doctor-dashboard'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                  >
                    <span className="flex items-center gap-2"><Stethoscope className="w-3.5 h-3.5 text-blue-600" /> Doctor Console</span>
                    {userRole === 'doctor' && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                  <button
                    onClick={() => { setUserRole('reception'); setActiveTab('reception-dashboard'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                  >
                    <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-purple-600" /> Reception Desk</span>
                    {userRole === 'reception' && <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />}
                  </button>
                  <button
                    onClick={() => { setUserRole('admin'); setActiveTab('admin-dashboard'); setRoleDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                  >
                    <span className="flex items-center gap-2"><LayoutDashboard className="w-3.5 h-3.5 text-amber-600" /> Admin Dashboard</span>
                    {userRole === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell Button */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="View Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>

            {/* Quick Portal Direct Button */}
            <button
              onClick={() => {
                if (userRole === 'patient') setActiveTab('patient-portal');
                else if (userRole === 'doctor') setActiveTab('doctor-dashboard');
                else if (userRole === 'reception') setActiveTab('reception-dashboard');
                else setActiveTab('admin-dashboard');
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#0066CC] hover:bg-[#0052A3] text-white transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              Go To Dashboard
            </button>

          </div>

        </div>
      </div>
    </header>
  );
}
