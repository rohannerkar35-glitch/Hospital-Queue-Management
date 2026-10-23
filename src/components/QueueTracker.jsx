import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  Play, 
  SkipForward, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  TrendingDown, 
  Activity,
  Sparkles,
  ChevronRight,
  Stethoscope,
  Filter
} from 'lucide-react';
import { DEPARTMENTS } from '../data/hospitalData';

export default function QueueTracker({ 
  tokens, 
  doctors, 
  onCallNextToken, 
  onCompleteToken, 
  onSkipToken 
}) {
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('Cardiology');
  const [autoSimulate, setAutoSimulate] = useState(false);

  // Filter tokens by chosen department
  const deptTokens = tokens.filter(t => t.department === selectedDeptFilter);
  const currentlyServing = deptTokens.find(t => t.status === 'IN_CONSULTATION' || t.status === 'CALLING');
  const waitingTokens = deptTokens.filter(t => t.status === 'WAITING');
  const completedTokens = deptTokens.filter(t => t.status === 'COMPLETED');

  // Find demo patient token
  const myToken = deptTokens.find(t => t.patientName.includes('Om Kulkarni') || t.patientName.includes('Alex Morgan') || t.tokenNumber === 'CARD-104');

  const deptInfo = DEPARTMENTS.find(d => d.name === selectedDeptFilter) || DEPARTMENTS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live OPD Sync Active
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Real-Time OPD Queue Tracker
            </h1>
            <p className="text-sm text-slate-500">
              Public live display & patient tracking dashboard for OPD consultation rooms.
            </p>
          </div>

          {/* Department Filter Bar */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto">
            {DEPARTMENTS.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDeptFilter(dept.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDeptFilter === dept.name
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-md shadow-red-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-red-200'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>

        {/* TOP HERO DASHBOARD DISPLAY */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* NOW SERVING BIG MONITOR DISPLAY */}
          <div className="lg:col-span-8 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />
                <span className="text-xs font-bold tracking-widest uppercase text-slate-400">
                  PUBLIC OPD BOARD — {selectedDeptFilter.toUpperCase()}
                </span>
              </div>
              <span className="px-3 py-1 rounded-md bg-slate-800 text-red-400 text-xs font-mono font-bold">
                ROOM 102 (East Wing)
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 items-center">
              
              {/* Token Number Box */}
              <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-center space-y-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                  {currentlyServing?.status === 'CALLING' ? '🚨 NOW CALLING' : 'IN CONSULTATION'}
                </p>
                <p className="text-5xl sm:text-6xl font-black text-white tracking-tight drop-shadow-lg">
                  {currentlyServing ? currentlyServing.tokenNumber : 'WAITING'}
                </p>
                <p className="text-xs text-slate-300 font-semibold">
                  Patient: {currentlyServing ? currentlyServing.patientName : 'No patient in room'}
                </p>
              </div>

              {/* Consultation Info */}
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-1">
                  <p className="text-slate-400 font-semibold">Attending Physician</p>
                  <p className="text-base font-extrabold text-white">Dr. Sarah Jenkins</p>
                  <p className="text-emerald-400 font-bold">Consultation Speed: ~8 mins/patient</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <p className="text-slate-400">Remaining</p>
                    <p className="text-2xl font-black text-white mt-0.5">{waitingTokens.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <p className="text-slate-400">Avg Wait</p>
                    <p className="text-2xl font-black text-emerald-400 mt-0.5">{deptInfo.avgWaitTime}m</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Live Progress Bar */}
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-semibold">
                <span>Department Workflow Speed</span>
                <span className="text-emerald-400 font-bold">Queue Moving Smoothly (98% Velocity)</span>
              </div>
              <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 h-full rounded-full w-[75%] animate-pulse" />
              </div>
            </div>

            {/* Staff Interactive Controls inside Queue view */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-slate-400 font-semibold">OPD Staff Queue Controls:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onCallNextToken(selectedDeptFilter)}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" /> Call Next Patient Token
                </button>
                <button
                  onClick={() => onSkipToken(currentlyServing?.id)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700 cursor-pointer"
                >
                  Skip Token
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: YOUR POSITION PATIENT TRACKER */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-6">
            
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">PATIENT LIVE TRACKER</span>
                <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold">
                  Auto-Refreshing
                </span>
              </div>

              {myToken ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-slate-700/60 border border-red-100 dark:border-slate-600 space-y-2">
                    <p className="text-xs text-slate-500 font-semibold">Your Token Number</p>
                    <p className="text-3xl font-black text-red-600 dark:text-red-400">{myToken.tokenNumber}</p>
                    
                    <div className="pt-2 border-t border-red-100 dark:border-slate-600 flex justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-300">Your Position:</span>
                      <strong className="text-emerald-600 font-bold">#{myToken.queuePosition} in line</strong>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-600 dark:text-slate-300">Estimated Turn:</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{myToken.estWaitMins} mins</strong>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200/60 dark:border-slate-700 space-y-2 text-xs">
                    <p className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" /> AI Waiting Advice
                    </p>
                    <p className="text-slate-500 leading-relaxed">
                      You are 2 positions away. You can relax at the 1st floor cafe. We will send an SMS notification when you are next!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs space-y-2">
                  <Users className="w-8 h-8 mx-auto text-slate-300" />
                  <p>You have no active token in {selectedDeptFilter}.</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
              <p className="text-[11px] text-slate-400">Hospital Audio Announcer connected to speaker system</p>
            </div>

          </div>

        </div>

        {/* UPCOMING PATIENTS QUEUE TABLE */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
          
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-red-600" /> Next Tokens Waiting in Line ({waitingTokens.length})
            </h3>
            <span className="text-xs text-slate-400">Department: {selectedDeptFilter}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Pos #</th>
                  <th className="py-3 px-4">Token No</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Slot Time</th>
                  <th className="py-3 px-4">Est. Wait</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {deptTokens.map((t, idx) => (
                  <tr 
                    key={t.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-700/40 transition-colors ${
                      t.patientName.includes('Om Kulkarni') || t.patientName.includes('Alex Morgan') ? 'bg-red-50/60 dark:bg-slate-700/60 font-bold' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-500">#{idx + 1}</td>
                    <td className="py-3.5 px-4 font-mono font-black text-red-600 dark:text-red-400">{t.tokenNumber}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {t.patientName} {(t.patientName.includes('Om Kulkarni') || t.patientName.includes('Alex Morgan')) && '(YOU)'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{t.slotTime}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{t.estWaitMins} mins</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        t.status === 'CALLING' ? 'bg-emerald-100 text-emerald-800 animate-pulse' :
                        t.status === 'IN_CONSULTATION' ? 'bg-red-50 text-red-600 border border-red-200/60' :
                        t.status === 'COMPLETED' ? 'bg-slate-200 text-slate-700' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
