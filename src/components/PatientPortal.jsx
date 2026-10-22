import React, { useState } from 'react';
import { 
  User, 
  Clock, 
  Calendar, 
  FileText, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  Download, 
  RefreshCw, 
  AlertCircle,
  Bell,
  Stethoscope,
  ChevronRight,
  Shield,
  Activity,
  Heart,
  Pencil,
  FileCheck
} from 'lucide-react';
import { MEDICAL_REPORTS } from '../data/hospitalData';

export default function PatientPortal({ 
  tokens, 
  onCancelToken, 
  onRescheduleToken, 
  setActiveTab,
  onOpenQRModal,
  notifications,
  authSession
}) {
  const [activeTab, setPortalTab] = useState('overview'); // overview, appointments, prescriptions, profile
  const [userProfile, setUserProfile] = useState({
    name: authSession?.name || 'Om Kulkarni',
    age: authSession?.age || 28,
    gender: authSession?.gender || 'Male',
    phone: authSession?.phone || '+91 98220 54321',
    email: authSession?.email || 'om@hospital.in',
    bloodGroup: authSession?.bloodGroup || 'B+',
    allergies: authSession?.allergies || 'None recorded',
    emergencyContact: authSession?.emergencyContact || 'Akash Kulkarni (+91 98220 11223)'
  });

  const activeToken = tokens.find(t => t.status === 'WAITING' || t.status === 'CALLING' || t.status === 'IN_CONSULTATION');
  const pastAppointments = tokens.filter(t => t.status === 'COMPLETED' || t.status === 'CANCELLED');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Profile Banner */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-red-900/10 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 text-2xl font-black shadow-inner">
                OK
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold">{userProfile.name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm border border-white/30">
                    Verified Patient
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-red-100 mt-1">
                  ID: <span className="font-mono font-bold">PAT-884920</span> • {userProfile.gender}, {userProfile.age} yrs • Blood: <span className="font-bold">{userProfile.bloodGroup}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('booking')}
                className="px-5 py-2.5 rounded-xl bg-white text-red-600 hover:bg-red-50 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" /> Book New Appointment
              </button>
            </div>
          </div>

          {/* Quick Sub-tabs */}
          <div className="flex gap-2 mt-8 pt-6 border-t border-white/20 text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => setPortalTab('overview')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'overview' ? 'bg-white text-red-600 shadow-xs' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setPortalTab('appointments')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'appointments' ? 'bg-white text-red-600 shadow-xs' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              My Tokens & History ({tokens.length})
            </button>
            <button
              onClick={() => setPortalTab('prescriptions')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'prescriptions' ? 'bg-white text-red-600 shadow-xs' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Prescriptions & Reports ({MEDICAL_REPORTS.length})
            </button>
            <button
              onClick={() => setPortalTab('profile')}
              className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'profile' ? 'bg-white text-red-600 shadow-xs' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              Medical Profile
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Top 4 Dashboard Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Active Token Card */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Token</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {activeToken ? activeToken.tokenNumber : 'None Active'}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center font-bold">
                    <QrCode className="w-5 h-5" />
                  </div>
                </div>
                {activeToken ? (
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                    <span className="text-red-600 font-bold">{activeToken.department}</span>
                    <button 
                      onClick={() => onOpenQRModal(activeToken)}
                      className="font-bold text-red-600 hover:underline"
                    >
                      Show QR Pass →
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 mt-4">No waiting token right now.</p>
                )}
              </div>

              {/* Queue Position */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Queue Position</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {activeToken ? `#${activeToken.queuePosition}` : '-'}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">
                  {activeToken ? `${activeToken.estWaitMins} mins estimated wait` : 'You are not in any queue'}
                </p>
              </div>

              {/* Doctor Consultation Room */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Assigned Room</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {activeToken ? activeToken.roomNo.split('-')[0] : 'Desk 1'}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-900/50 text-purple-600 flex items-center justify-center font-bold">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4 truncate">
                  {activeToken ? activeToken.doctorName : 'Select Doctor'}
                </p>
              </div>

              {/* Prescriptions Ready */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Prescriptions</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      {MEDICAL_REPORTS.length} Digital
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-900/50 text-amber-600 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-4">All reports archived & ready</p>
              </div>

            </div>

            {/* Active Token Live Status Hero Widget */}
            {activeToken ? (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-slate-100 dark:border-slate-700 gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                      <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">Live Active Queue Token</span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      Token <span className="text-red-600">{activeToken.tokenNumber}</span> — {activeToken.department}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onOpenQRModal(activeToken)}
                      className="px-4 py-2 rounded-xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 font-bold text-xs hover:bg-red-100 transition-all flex items-center gap-2 cursor-pointer border border-red-200/60"
                    >
                      <QrCode className="w-4 h-4" /> View QR Pass
                    </button>
                    <button
                      onClick={() => onCancelToken(activeToken.id)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer"
                    >
                      Cancel Token
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6 text-sm">
                  
                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-semibold">Consulting Physician</p>
                    <p className="font-extrabold text-slate-900 dark:text-white text-base">{activeToken.doctorName}</p>
                    <p className="text-xs text-slate-500">{activeToken.roomNo}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-400 font-semibold">Appointment Slot</p>
                    <p className="font-extrabold text-slate-900 dark:text-white text-base">{activeToken.slotTime} ({activeToken.date})</p>
                    <p className="text-xs text-slate-500">Booked via: {activeToken.bookedVia}</p>
                  </div>

                  <div className="space-y-1 bg-red-50/70 dark:bg-slate-700/60 p-4 rounded-2xl border border-red-100 dark:border-slate-600">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-700 dark:text-slate-200">Current Queue Position</span>
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-red-600 text-white">
                        {activeToken.status === 'CALLING' ? 'YOUR TURN NOW!' : `#${activeToken.queuePosition} in line`}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium">
                      Estimated consultation time: <span className="font-bold text-red-600">{activeToken.estWaitMins} mins</span>
                    </p>
                  </div>

                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 text-center border border-slate-200/80 dark:border-slate-700 space-y-4">
                <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-slate-700 text-red-600 mx-auto flex items-center justify-center">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Active Appointments Scheduled</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Need to consult a doctor today? Select a department and book an instant slot with a real-time digital token.
                </p>
                <button
                  onClick={() => setActiveTab('booking')}
                  className="px-6 py-3 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-600/20 transition-all cursor-pointer"
                >
                  Book Appointment Now
                </button>
              </div>
            )}

            {/* Prescriptions Quick Preview */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-600" /> Recent Prescriptions & Diagnostic Reports
                </h3>
                <button onClick={() => setPortalTab('prescriptions')} className="text-xs font-bold text-red-600 hover:underline">
                  View All →
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {MEDICAL_REPORTS.map((rep) => (
                  <div key={rep.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-600 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{rep.department}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">{rep.date}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">Doctor: {rep.doctor}</p>
                      <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">Diagnosis: {rep.diagnosis}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading Digital Prescription (${rep.fileSize})...`)}
                      className="p-2.5 rounded-xl bg-white dark:bg-slate-600 text-red-600 hover:bg-red-50 border border-slate-200 dark:border-slate-500 cursor-pointer"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: MY TOKENS & APPOINTMENT HISTORY */}
        {activeTab === 'appointments' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">All OPD Tokens & History</h2>

            <div className="space-y-4">
              {tokens.map((token) => (
                <div 
                  key={token.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-300 flex items-center justify-center font-black text-sm">
                      {token.tokenNumber.split('-')[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 dark:text-white text-base">{token.tokenNumber}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                          token.status === 'WAITING' ? 'bg-amber-100 text-amber-800' :
                          token.status === 'CALLING' ? 'bg-red-100 text-red-800 animate-pulse' :
                          token.status === 'COMPLETED' ? 'bg-slate-100 text-slate-800' :
                          'bg-slate-200 text-slate-700'
                        }`}>
                          {token.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-1">
                        {token.department} — {token.doctorName}
                      </p>
                      <p className="text-xs text-slate-500">
                        Date: {token.date} • Slot: {token.slotTime} • Room: {token.roomNo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {(token.status === 'WAITING' || token.status === 'CALLING') && (
                      <>
                        <button
                          onClick={() => onOpenQRModal(token)}
                          className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 cursor-pointer border border-red-200/60"
                        >
                          Show QR Pass
                        </button>
                        <button
                          onClick={() => onCancelToken(token.id)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {token.status === 'COMPLETED' && (
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Consulted
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PRESCRIPTIONS */}
        {activeTab === 'prescriptions' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Digital Prescriptions & Medical Reports</h2>
            
            <div className="space-y-6">
              {MEDICAL_REPORTS.map((report) => (
                <div key={report.id} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">{report.department} Consultation</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Attending Physician: {report.doctor} • Date: {report.date}</p>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading report for ${report.department}...`)}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-md shadow-red-600/20 transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Download Official PDF ({report.fileSize})
                    </button>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200/60 dark:border-slate-600 space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">Diagnosis Summary</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{report.diagnosis}</p>
                    
                    <p className="text-xs font-bold text-slate-400 uppercase pt-2">Prescribed Medications</p>
                    <ul className="space-y-1">
                      {report.prescription.map((m, idx) => (
                        <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
                          <strong>{m.med}</strong> — <span className="text-slate-500">{m.dosage}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MEDICAL PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Patient Medical Profile</h2>
              <span className="text-xs font-bold text-red-600 bg-red-50 dark:bg-red-950 px-3 py-1 rounded-full border border-red-200">
                Active Medical File
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4 bg-slate-50 dark:bg-slate-700/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-600">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-red-600" /> Personal Details
                </h3>
                <div className="space-y-2 text-xs">
                  <p><span className="text-slate-400 font-semibold">Full Name:</span> {userProfile.name}</p>
                  <p><span className="text-slate-400 font-semibold">Phone:</span> {userProfile.phone}</p>
                  <p><span className="text-slate-400 font-semibold">Email:</span> {userProfile.email}</p>
                  <p><span className="text-slate-400 font-semibold">Blood Group:</span> <strong className="text-red-500">{userProfile.bloodGroup}</strong></p>
                </div>
              </div>

              <div className="space-y-4 bg-slate-50 dark:bg-slate-700/40 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-600">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" /> Allergies & Emergency Contact
                </h3>
                <div className="space-y-2 text-xs">
                  <p><span className="text-slate-400 font-semibold">Known Allergies:</span> {userProfile.allergies}</p>
                  <p><span className="text-slate-400 font-semibold">Emergency Contact:</span> {userProfile.emergencyContact}</p>
                  <p><span className="text-slate-400 font-semibold">Insurance Carrier:</span> BlueCross HealthCare (ID: #884-902)</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
