import React, { useState } from 'react';
import { 
  UserPlus, 
  QrCode, 
  Printer, 
  Search, 
  CheckCircle2, 
  Clock, 
  Users, 
  Plus, 
  Sparkles,
  Stethoscope,
  Scan
} from 'lucide-react';
import { DEPARTMENTS } from '../data/hospitalData';

export default function ReceptionDashboard({ 
  doctors, 
  tokens, 
  onIssueWalkInToken, 
  onOpenQRModal,
  authSession
}) {
  const [activeSubTab, setActiveSubTab] = useState('walk-in'); // walk-in, verify, desk-queue
  
  // Walk-in form state
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('30');
  const [patientPhone, setPatientPhone] = useState('+91 98');
  const [selectedDeptCode, setSelectedDeptCode] = useState('GEN');
  const [symptoms, setSymptoms] = useState('General checkup / walk-in');

  const [searchTokenInput, setSearchTokenInput] = useState('');
  const [scannedResult, setScannedResult] = useState(null);

  const operatorName = authSession?.name || 'Akash Verma';
  const operatorId = authSession?.operatorId || 'REC-AKASH-04';

  const handleIssueToken = (e) => {
    e.preventDefault();
    if (!patientName.trim()) return alert('Please enter patient name');

    const deptObj = DEPARTMENTS.find(d => d.code === selectedDeptCode) || DEPARTMENTS[0];
    const docObj = doctors.find(d => d.deptId === deptObj.id) || doctors[0];

    const newTokenNumber = `${deptObj.code}-${Math.floor(100 + Math.random() * 900)}`;

    const newToken = {
      id: `token-${Date.now()}`,
      tokenNumber: newTokenNumber,
      patientName: patientName,
      patientAge: parseInt(patientAge),
      patientGender: 'Male',
      patientPhone: patientPhone,
      doctorId: docObj.id,
      doctorName: docObj.name,
      department: deptObj.name,
      roomNo: docObj.roomNo,
      slotTime: 'Walk-In Immediate',
      status: 'WAITING',
      queuePosition: Math.floor(Math.random() * 3) + 1,
      estWaitMins: 10,
      date: '2026-10-05',
      bookedVia: `Reception Desk (#2 - ${operatorName})`,
      symptoms: symptoms
    };

    onIssueWalkInToken(newToken);
    alert(`Express Token ${newTokenNumber} issued for ${patientName}!`);
    setPatientName('');
  };

  const handleVerifySearch = (e) => {
    e.preventDefault();
    const found = tokens.find(t => t.tokenNumber.toLowerCase() === searchTokenInput.trim().toLowerCase());
    setScannedResult(found || 'NOT_FOUND');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200/60 dark:bg-slate-700 dark:text-red-400 font-extrabold text-xs uppercase tracking-wider">
                OPD RECEPTION DESK #2
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs">
                Operator: <strong className="text-red-600">{operatorName}</strong> ({operatorId})
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Reception & Walk-in Token Counter
            </h1>
            <p className="text-sm text-slate-500">
              Register walk-in patients, scan QR digital passes, and issue instant physical tokens.
            </p>
          </div>
        </div>

        {/* Action Tabs */}
        <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('walk-in')}
            className={`pb-3 px-4 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'walk-in'
                ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <UserPlus className="w-4 h-4" /> Issue Walk-In Token
          </button>
          
          <button
            onClick={() => setActiveSubTab('verify')}
            className={`pb-3 px-4 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'verify'
                ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Scan className="w-4 h-4" /> Verify QR Token Pass
          </button>

          <button
            onClick={() => setActiveSubTab('desk-queue')}
            className={`pb-3 px-4 transition-all cursor-pointer flex items-center gap-1.5 ${
              activeSubTab === 'desk-queue'
                ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            <Users className="w-4 h-4" /> Active Desk Queue ({tokens.length})
          </button>
        </div>

        {/* SUBTAB 1: WALK-IN TOKEN REGISTRATION */}
        {activeSubTab === 'walk-in' && (
          <div className="grid lg:grid-cols-12 gap-8">
            
            <form onSubmit={handleIssueToken} className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-purple-600" /> Walk-In Patient Express Token Form
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael Scott"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Age</label>
                  <input
                    type="number"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-500 mb-1">Select Department</label>
                  <select
                    value={selectedDeptCode}
                    onChange={(e) => setSelectedDeptCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold"
                  >
                    {DEPARTMENTS.map((d) => (
                      <option key={d.code} value={d.code}>{d.name} ({d.avgWaitTime}m wait)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-500 text-xs mb-1">Reason for Walk-in Visit</label>
                <textarea
                  rows="2"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-sm shadow-lg hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" /> Issue & Print Physical Token Slip
              </button>
            </form>

            {/* Quick Status Bar */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Walk-In Capacity Status</h3>
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 text-xs space-y-2">
                  <p className="font-bold text-purple-900 dark:text-purple-300">Fast-Track Kiosk Operating</p>
                  <p className="text-purple-700 dark:text-purple-400">Average token generation time: 15 seconds per walk-in patient.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* SUBTAB 2: VERIFY QR PASS */}
        {activeSubTab === 'verify' && (
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 max-w-2xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-purple-600" /> Verify Patient Digital Pass or Token #
            </h2>

            <form onSubmit={handleVerifySearch} className="flex gap-3">
              <input
                type="text"
                placeholder="Enter Token No (e.g. CARD-104)..."
                value={searchTokenInput}
                onChange={(e) => setSearchTokenInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 cursor-pointer"
              >
                Scan / Verify
              </button>
            </form>

            {scannedResult === 'NOT_FOUND' && (
              <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-bold">
                ❌ Token not found in hospital database!
              </div>
            )}

            {scannedResult && scannedResult !== 'NOT_FOUND' && (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">✅ VALID OPD PASS VERIFIED</span>
                  <button 
                    onClick={() => onOpenQRModal(scannedResult)}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    View QR Pass Modal
                  </button>
                </div>
                <div className="text-xs space-y-1 text-slate-800 dark:text-slate-200">
                  <p><strong>Token No:</strong> {scannedResult.tokenNumber}</p>
                  <p><strong>Patient:</strong> {scannedResult.patientName}</p>
                  <p><strong>Doctor:</strong> {scannedResult.doctorName} ({scannedResult.roomNo})</p>
                  <p><strong>Status:</strong> {scannedResult.status}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SUBTAB 3: DESK QUEUE TABLE */}
        {activeSubTab === 'desk-queue' && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Hospital Tokens</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-3 px-4">Token No</th>
                    <th className="py-3 px-4">Patient</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Doctor</th>
                    <th className="py-3 px-4">Room</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {tokens.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <td className="py-3 px-4 font-mono font-black text-red-600">{t.tokenNumber}</td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{t.patientName}</td>
                      <td className="py-3 px-4 text-slate-500">{t.department}</td>
                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-semibold">{t.doctorName}</td>
                      <td className="py-3 px-4 text-slate-500">{t.roomNo}</td>
                      <td className="py-3 px-4 font-extrabold text-emerald-600">{t.status}</td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => onOpenQRModal(t)}
                          className="px-2.5 py-1 rounded bg-red-50 text-red-600 font-bold text-[11px] hover:bg-red-100 cursor-pointer"
                        >
                          Print Pass
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
