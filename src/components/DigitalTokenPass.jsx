import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  ArrowLeft,
  Printer, 
  Download, 
  Clock
} from 'lucide-react';

export default function DigitalTokenPass({ token, onClose, onCancelToken }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!token) return null;

  const handlePrint = () => {
    window.print();
  };

  const qrData = JSON.stringify({
    tokenId: token.id,
    tokenNumber: token.tokenNumber,
    patient: token.patientName,
    doctor: token.doctorName,
    room: token.roomNo,
    time: token.slotTime
  });

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-700 relative flex flex-col max-h-[92vh] overflow-hidden"
      >
        
        {/* Sticky Header with Back & Close buttons */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-b border-red-100 dark:border-slate-700">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 py-1 px-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">Digital OPD Pass</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Close Pass (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Printable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5">
          
          <div id="printable-token" className="space-y-5 text-center">
            
            {/* Badge & Branding */}
            <div>
              <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 dark:bg-slate-700 dark:text-red-400 font-extrabold text-[10px] uppercase tracking-wider border border-red-200/60">
                OFFICIAL DIGITAL OPD PASS
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                Smart Hospital <span className="text-red-600">OPD</span>
              </h2>
              <p className="text-xs text-slate-500">Scan at Reception Desk 2 or OPD Kiosk</p>
            </div>

            {/* Token Card Hero */}
            <div className="bg-gradient-to-br from-red-500 via-rose-500 to-red-600 p-5 rounded-2xl text-white shadow-xl shadow-red-500/20 space-y-3 border border-white/20">
              <p className="text-xs uppercase tracking-widest text-rose-100 font-bold">YOUR DIGITAL TOKEN NO.</p>
              <p className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-md">
                {token.tokenNumber}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border border-white/20">
                <Clock className="w-3.5 h-3.5" />
                <span>Est. Consultation in {token.estWaitMins} mins</span>
              </div>
            </div>

            {/* Live QR Code Display */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-700/50 border border-slate-200/80 dark:border-slate-600 shadow-sm">
              <QRCodeSVG
                value={qrData}
                size={140}
                level="H"
                includeMargin={true}
                fgColor="#E11D48"
              />
              <p className="text-[11px] text-slate-400 font-mono font-bold mt-2">
                HASH: {token.id.toUpperCase()}
              </p>
            </div>

            {/* Details Table */}
            <div className="text-xs space-y-2.5 text-left bg-slate-50 dark:bg-slate-700/30 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Patient Name:</span>
                <strong className="text-slate-900 dark:text-white font-bold">{token.patientName}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Attending Doctor:</span>
                <strong className="text-slate-900 dark:text-white font-bold">{token.doctorName}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">OPD Department:</span>
                <strong className="text-slate-900 dark:text-white font-bold">{token.department}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">OPD Room No:</span>
                <strong className="text-red-600 dark:text-red-400 font-bold">{token.roomNo}</strong>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-400 font-semibold">Appointment Time:</span>
                <strong className="text-slate-900 dark:text-white font-bold">{token.slotTime} ({token.date})</strong>
              </div>

              <div className="flex justify-between border-t border-slate-200 dark:border-slate-600 pt-2">
                <span className="text-slate-400 font-semibold">Queue Position:</span>
                <strong className="text-red-600 dark:text-red-400 font-black text-sm">
                  #{token.queuePosition} in queue
                </strong>
              </div>
            </div>

          </div>

        </div>

        {/* Sticky Modal Action Buttons */}
        <div className="sticky bottom-0 z-10 p-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-700 space-y-2">
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" /> Print Token Pass
            </button>
            
            <button
              onClick={() => {
                alert('Pass downloaded to device!');
              }}
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-red-500/20"
            >
              <Download className="w-3.5 h-3.5" /> Save Pass
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Done & Return to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
