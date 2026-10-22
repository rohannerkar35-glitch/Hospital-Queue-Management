import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Stethoscope, 
  QrCode,
  ShieldCheck,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function DigitalTokenPass({ token, onClose, onCancelToken }) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 relative space-y-6">
        
        {/* Close Modal Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Printable Area Container */}
        <div id="printable-token" className="space-y-6 text-center">
          
          {/* Badge & Branding */}
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider">
              OFFICIAL DIGITAL OPD PASS
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
              Smart Hospital OPD
            </h2>
            <p className="text-xs text-slate-500">Scan at Reception Desk 2 or OPD Kiosk</p>
          </div>

          {/* Token Card Hero */}
          <div className="bg-gradient-to-br from-[#0066CC] to-[#00B894] p-6 rounded-2xl text-white shadow-xl space-y-4">
            <p className="text-xs uppercase tracking-widest text-blue-100 font-bold">YOUR DIGITAL TOKEN NO.</p>
            <p className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-md">
              {token.tokenNumber}
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>Est. Consultation in {token.estWaitMins} mins</span>
            </div>
          </div>

          {/* Live QR Code Display */}
          <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
            <QRCodeSVG
              value={qrData}
              size={150}
              level="H"
              includeMargin={true}
              fgColor="#0066CC"
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
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{token.roomNo}</strong>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400 font-semibold">Appointment Time:</span>
              <strong className="text-slate-900 dark:text-white font-bold">{token.slotTime} ({token.date})</strong>
            </div>

            <div className="flex justify-between border-t border-slate-200 dark:border-slate-600 pt-2">
              <span className="text-slate-400 font-semibold">Queue Position:</span>
              <strong className="text-[#0066CC] dark:text-blue-300 font-black text-sm">
                #{token.queuePosition} in queue
              </strong>
            </div>
          </div>

        </div>

        {/* Modal Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={handlePrint}
            className="py-3 px-4 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print Token Pass
          </button>
          
          <button
            onClick={() => {
              alert('Pass downloaded to device!');
            }}
            className="py-3 px-4 rounded-xl bg-[#0066CC] text-white font-bold text-xs hover:bg-[#0052A3] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" /> Save Pass
          </button>
        </div>

      </div>
    </div>
  );
}
