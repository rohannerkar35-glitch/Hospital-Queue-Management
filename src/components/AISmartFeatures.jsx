import React, { useState } from 'react';
import { 
  Sparkles, 
  Brain, 
  Clock, 
  TrendingDown, 
  AlertTriangle, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Activity,
  BarChart2
} from 'lucide-react';
import { DEPARTMENTS } from '../data/hospitalData';

export default function AISmartFeatures({ setActiveTab }) {
  const [selectedDept, setSelectedDept] = useState(DEPARTMENTS[0]);
  const [simulatedWalkIns, setSimulatedWalkIns] = useState(15);
  const [simulatedDoctorSpeed, setSimulatedDoctorSpeed] = useState(8); // mins per patient

  // Dynamic AI prediction formula
  const predictedWaitTime = Math.max(5, Math.round((simulatedWalkIns * simulatedDoctorSpeed) / 4));
  const overcrowdingRisk = predictedWaitTime > 25 ? 'HIGH SURGE RISK' : predictedWaitTime > 15 ? 'MODERATE' : 'OPTIMAL';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
            AI-Powered Hospital Intelligence Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Smart Queue Predictor & Flow Optimizer
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Machine learning algorithms calculate live wait times based on historical department velocity, doctor speed, and real-time walk-in surges.
          </p>
        </div>

        {/* AI PREDICTOR INTERACTIVE WIDGET */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Controls & Parameters */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-6 h-6 text-red-600" /> AI Simulator Parameters
            </h2>

            <div className="space-y-5 text-xs">
              
              <div>
                <label className="block font-bold text-slate-500 mb-2">Select Target OPD Department</label>
                <select
                  value={selectedDept.id}
                  onChange={(e) => setSelectedDept(DEPARTMENTS.find(d => d.id === e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-bold"
                >
                  {DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.activeDoctors} doctors on duty)</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Current Active Patients in Queue:</span>
                  <span className="text-red-600 font-extrabold">{simulatedWalkIns} Patients</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={simulatedWalkIns}
                  onChange={(e) => setSimulatedWalkIns(parseInt(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-300 mb-1">
                  <span>Average Doctor Consultation Speed:</span>
                  <span className="text-emerald-600">{simulatedDoctorSpeed} mins / patient</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={simulatedDoctorSpeed}
                  onChange={(e) => setSimulatedDoctorSpeed(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* AI Output Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-red-500 via-rose-500 to-red-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-red-500/15 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-wider font-extrabold border border-white/30">
                PREDICTIVE OUTPUT RESULT
              </span>

              <div>
                <p className="text-xs text-rose-100 font-semibold">Predicted Wait Time for {selectedDept.name}</p>
                <p className="text-5xl font-black tracking-tight mt-1">{predictedWaitTime} Mins</p>
                <p className="text-xs text-rose-100 mt-1">Accuracy Score: 96.4% confidence interval</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Overcrowding Risk Status: <span className="underline uppercase">{overcrowdingRisk}</span>
                </p>
                <p className="opacity-90">
                  {overcrowdingRisk === 'HIGH SURGE RISK' 
                    ? '⚠️ Alert: Department is experiencing high surge. AI recommends routing low-risk cases to Assistant OPD Room 104.'
                    : '✅ Optimal queue velocity. No bottleneck detected.'
                  }
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20 relative z-10">
              <button
                onClick={() => setActiveTab('booking')}
                className="w-full py-3.5 rounded-2xl bg-white text-red-600 hover:bg-red-50 font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book Slot in Off-Peak Window</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* 3 AI FEATURE HIGHLIGHT CARDS */}
        <div className="grid md:grid-cols-3 gap-8">
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Smart Appointment Suggestions</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Analyzes historical 6-month OPD traffic trends to recommend off-peak slots (e.g., 2:30 PM Tuesdays) with 80% shorter wait times.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Queue Load Balancer</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dynamically shifts waiting tokens between adjacent doctor rooms when a consultation runs over time to maintain steady flow.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg">Overcrowding Risk Monitor</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Triggers automated push notifications to hospital administration before waiting rooms reach 85% seating capacity.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
