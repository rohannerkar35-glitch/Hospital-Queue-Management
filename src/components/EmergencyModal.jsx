import React from 'react';
import { X, PhoneCall, ShieldAlert, HeartPulse, MapPin } from 'lucide-react';

export default function EmergencyModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-red-200 dark:border-red-900 relative space-y-6">
        
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 mx-auto flex items-center justify-center animate-bounce">
            <PhoneCall className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Emergency OPD Assistance</h2>
          <p className="text-xs text-slate-500">For life-threatening or urgent trauma care, call emergency dispatch immediately.</p>
        </div>

        <div className="space-y-3 text-xs">
          <a
            href="tel:911"
            className="p-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-extrabold flex items-center justify-between transition-all cursor-pointer shadow-md"
          >
            <span className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> Hospital Emergency Ambulance Dispatch</span>
            <span className="font-mono text-sm">CALL 911 / 102</span>
          </a>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 space-y-2">
            <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <HeartPulse className="w-4 h-4 text-red-500" /> Triage Trauma Room Direct Hotline
            </p>
            <p className="text-slate-500">Ext: #9904 (Central Trauma Block)</p>
          </div>
        </div>

      </div>
    </div>
  );
}
