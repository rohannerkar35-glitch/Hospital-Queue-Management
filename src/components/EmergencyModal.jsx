import React, { useEffect } from 'react';
import { X, PhoneCall, HeartPulse, ArrowLeft } from 'lucide-react';

export default function EmergencyModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-700 relative space-y-6 max-h-[90vh] overflow-y-auto"
      >
        
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 border border-red-200/60 dark:bg-slate-700 dark:text-red-400 mx-auto flex items-center justify-center animate-bounce shadow-xs">
            <PhoneCall className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Emergency OPD Assistance</h2>
          <p className="text-xs text-slate-500">For life-threatening or urgent trauma care, call emergency dispatch immediately.</p>
        </div>

        <div className="space-y-3 text-xs">
          <a
            href="tel:911"
            className="p-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-extrabold flex items-center justify-between transition-all cursor-pointer shadow-lg shadow-red-500/20"
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

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Close & Return
        </button>

      </div>
    </div>
  );
}
