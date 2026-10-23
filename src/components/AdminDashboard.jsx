import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Activity, 
  TrendingDown, 
  Calendar, 
  Stethoscope, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart2, 
  PieChart as PieChartIcon, 
  Download,
  Filter,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { ADMIN_ANALYTICS, DEPARTMENTS } from '../data/hospitalData';

export default function AdminDashboard({ tokens, doctors, authSession }) {
  const [adminTab, setAdminTab] = useState('analytics'); // analytics, doctors, queue, departments

  const COLORS = ['#F43F5E', '#E11D48', '#FB7185', '#FDA4AF', '#F43F5E', '#BE123C', '#E52E42'];
  const adminName = authSession?.name || 'Rohan Nerkar';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-extrabold text-xs uppercase tracking-wider">
                ADMINISTRATION & ANALYTICS CONSOLE
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs">
                Director: <strong className="text-red-600">{adminName}</strong>
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Hospital OPD Command Center
            </h1>
            <p className="text-sm text-slate-500">
              Real-time patient flow analytics, doctor utilization metrics, and OPD queue throughput.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => alert('Exporting OPD Analytics Report PDF...')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:border dark:border-slate-700 font-bold text-xs hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export Executive PDF
            </button>
          </div>
        </div>

        {/* 4 Core Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Today Visits</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">540 Patients</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-4 flex items-center gap-1">
              ↑ 18% increase vs yesterday
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg OPD Wait Time</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">11.4 Mins</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-4 flex items-center gap-1">
              ↓ 78% reduction target achieved
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Doctor Utilization</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">94.2%</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center font-bold">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">7 Rooms active concurrently</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Patient CSAT Score</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">4.9 / 5.0</p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/50 text-amber-500 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-4">Based on 1,280 feedback ratings</p>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`pb-3 px-4 transition-all cursor-pointer ${
              adminTab === 'analytics'
                ? 'border-b-2 border-red-600 text-red-600 dark:text-red-400'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Analytics & Charts
          </button>
          <button
            onClick={() => setAdminTab('doctors')}
            className={`pb-3 px-4 transition-all cursor-pointer ${
              adminTab === 'doctors'
                ? 'border-b-2 border-red-600 text-red-600 dark:text-red-400'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Doctor Roster & Load ({doctors.length})
          </button>
          <button
            onClick={() => setAdminTab('queue')}
            className={`pb-3 px-4 transition-all cursor-pointer ${
              adminTab === 'queue'
                ? 'border-b-2 border-red-600 text-red-600 dark:text-red-400'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Queue Surge & Overcrowding Controls
          </button>
        </div>

        {/* TAB 1: CHARTS & ANALYTICS */}
        {adminTab === 'analytics' && (
          <div className="space-y-8">
            
            {/* Chart Grid 1: Daily Visits Bar & Wait Time Area */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Daily Visits Hourly Chart */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Daily OPD Hourly Traffic</h3>
                  <span className="text-xs text-slate-400">Today</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ADMIN_ANALYTICS.dailyVisits}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                      <Bar dataKey="visits" fill="#DC2626" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Waiting Time Trends Area Chart */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">Waiting Time Trends (Minutes)</h3>
                  <span className="text-xs text-red-600 font-bold">Peak at 10 AM (18m)</span>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ADMIN_ANALYTICS.dailyVisits}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="hour" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} />
                      <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                      <Area type="monotone" dataKey="waitMins" stroke="#DC2626" fill="#DC2626" fillOpacity={0.2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Chart Grid 2: Department Load & Doctor Utilization */}
            <div className="grid lg:grid-cols-12 gap-8">
              
              {/* Department Load Distribution */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Department OPD Patient Load Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={ADMIN_ANALYTICS.departmentLoad}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" stroke="#94a3b8" fontSize={11} />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} width={90} />
                      <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                      <Bar dataKey="patients" fill="#DC2626" radius={[0, 6, 6, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Monthly Trend Pie Chart */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Monthly Patient Growth</h3>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={ADMIN_ANALYTICS.monthlyVisits}
                        dataKey="count"
                        nameKey="month"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {ADMIN_ANALYTICS.monthlyVisits.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DOCTOR MANAGEMENT */}
        {adminTab === 'doctors' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Active Doctor Roster & Utilization</h3>
              <button 
                onClick={() => alert('Doctor Addition Form Modal...')}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-600/20 cursor-pointer"
              >
                + Add Doctor to Roster
              </button>
            </div>

            <div className="space-y-4">
              {doctors.map((doc) => (
                <div key={doc.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30 flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <img src={doc.photo} alt={doc.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-extrabold text-slate-900 dark:text-white text-sm">{doc.name}</p>
                      <p className="text-slate-500">{doc.department} • Room {doc.roomNo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[10px]">
                      {doc.status}
                    </span>
                    <p className="text-slate-400 mt-1">Avg consultation: {doc.avgConsultationMins} mins</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: QUEUE SURGE CONTROLS */}
        {adminTab === 'queue' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI OPD Overcrowding Risk Controls</h3>
            
            <div className="p-6 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 font-extrabold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>General Medicine Waiting Room Surge Warning</span>
              </div>
              <p className="text-xs text-amber-900 dark:text-amber-300">
                General Medicine currently has 142 patient bookings today. AI Queue Optimizer recommends enabling Express Triage Desk 2 to fast-track non-critical flu consultations.
              </p>
              <button 
                onClick={() => alert('Express Triage Desk Activated!')}
                className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 cursor-pointer"
              >
                Enable Express Fast-Track Desk Now
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
