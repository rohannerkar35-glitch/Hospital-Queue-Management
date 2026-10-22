import React from 'react';
import { Bell, X, Check, MessageSquare, Mail, Smartphone, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NotificationCenter({ 
  notifications, 
  onClose, 
  onMarkAllRead,
  onTestNotification
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 w-full max-w-md h-full shadow-2xl p-6 border-l border-slate-200 dark:border-slate-700 flex flex-col justify-between animate-in slide-in-from-right">
        
        <div>
          {/* Header */}
          <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">OPD Notification Center</h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-900 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center justify-between py-3 text-xs border-b border-slate-100 dark:border-slate-700">
            <button
              onClick={onMarkAllRead}
              className="text-red-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Mark all read
            </button>

            <button
              onClick={onTestNotification}
              className="text-emerald-600 hover:underline font-bold flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Trigger Test Token SMS
            </button>
          </div>

          {/* Notification List */}
          <div className="mt-4 space-y-3 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-4 rounded-2xl border transition-all ${
                  notif.read
                    ? 'bg-slate-50 dark:bg-slate-700/30 border-slate-200/60 dark:border-slate-700'
                    : 'bg-red-50/70 dark:bg-slate-700/70 border-red-200 dark:border-red-900 shadow-xs'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs">{notif.title}</h3>
                  <span className="text-[10px] text-slate-400 font-medium">{notif.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {notif.message}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-600/50 flex justify-between items-center text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-red-600">
                    <Smartphone className="w-3 h-3" /> Sent via {notif.channel}
                  </span>
                  {!notif.read && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-center">
          <p className="text-[11px] text-slate-400">Integrated with Twilio SMS, SendGrid Email & Web Push</p>
        </div>

      </div>
    </div>
  );
}
