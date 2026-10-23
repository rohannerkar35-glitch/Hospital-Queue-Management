import React, { useState } from 'react';
import { 
  Stethoscope, 
  Play, 
  CheckCircle2, 
  SkipForward, 
  User, 
  FileText, 
  Clock, 
  Plus, 
  Download, 
  AlertCircle,
  Volume2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { MEDICAL_REPORTS } from '../data/hospitalData';

export default function DoctorDashboard({ 
  doctors, 
  tokens, 
  onCallNextToken, 
  onCompleteToken, 
  onSkipToken,
  authSession
}) {
  const [selectedDoctorId, setSelectedDoctorId] = useState(authSession?.doctorId || 'pune-doc-8');
  const activeDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors.find(d => d.id === 'pune-doc-8') || doctors[0];

  const doctorTokens = tokens.filter(t => t.doctorId === activeDoctor.id || t.doctorName === activeDoctor.name);
  const currentConsultation = doctorTokens.find(t => t.status === 'IN_CONSULTATION' || t.status === 'CALLING');
  const waitingQueue = doctorTokens.filter(t => t.status === 'WAITING');

  // Prescription writer state
  const [diagnosisText, setDiagnosisText] = useState('Mild sinus arrhythmia & mild fatigue');
  const [medInput, setMedInput] = useState('');
  const [dosageInput, setDosageInput] = useState('');
  const [medList, setMedList] = useState([
    { med: 'Omega-3 Fish Oil 1000mg', dosage: '1 capsule daily with food' },
    { med: 'Coenzyme Q10 100mg', dosage: '1 tablet after breakfast' }
  ]);

  const handleAddMedication = () => {
    if (!medInput.trim()) return;
    setMedList([...medList, { med: medInput, dosage: dosageInput || 'Once daily' }]);
    setMedInput('');
    setDosageInput('');
  };

  const handleCompleteCurrentConsultation = () => {
    if (!currentConsultation) return;
    onCompleteToken(currentConsultation.id);
    alert(`Consultation completed for ${currentConsultation.patientName}. Digital prescription archived & sent to patient portal!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Doctor Profile Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={activeDoctor.photo} 
              alt={activeDoctor.name} 
              className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500/20"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">{activeDoctor.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 font-extrabold text-[10px] uppercase">
                  {activeDoctor.department}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Room: <span className="font-bold text-slate-800 dark:text-slate-200">{activeDoctor.roomNo}</span> • Qualification: {activeDoctor.qualification}
              </p>
            </div>
          </div>

          {/* Switch Doctor Profile Select */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Switch Doctor View:</span>
            <select
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold"
            >
              {doctors.map(d => (
                <option key={d.id} value={d.id}>{d.name} ({d.department})</option>
              ))}
            </select>
          </div>
        </div>

        {/* CONSULTATION HERO QUEUE ACTIONS */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Active Patient Consultation Box */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700 shadow-md space-y-6">
            
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-red-600" /> OPD Consultation Desk Console
              </h2>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                currentConsultation ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
              }`}>
                {currentConsultation ? `Active: Token ${currentConsultation.tokenNumber}` : 'Room Idle'}
              </span>
            </div>

            {/* Quick Action Queue Buttons */}
            <div className="grid sm:grid-cols-3 gap-3">
              <button
                onClick={() => onCallNextToken(activeDoctor.department)}
                className="py-4 px-4 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-black text-xs shadow-lg shadow-red-500/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Volume2 className="w-5 h-5 text-amber-300 animate-pulse" /> CALL NEXT PATIENT
              </button>

              <button
                onClick={handleCompleteCurrentConsultation}
                disabled={!currentConsultation}
                className="py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-5 h-5" /> COMPLETE & ARCHIVE
              </button>

              <button
                onClick={() => onSkipToken(currentConsultation?.id)}
                disabled={!currentConsultation}
                className="py-4 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <SkipForward className="w-5 h-5" /> SKIP / DELAY TOKEN
              </button>
            </div>

            {/* Active Patient Details View */}
            {currentConsultation ? (
              <div className="space-y-6 pt-2">
                
                <div className="p-6 rounded-2xl bg-red-50/70 dark:bg-slate-700/50 border border-red-100 dark:border-slate-600 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-red-600 dark:text-red-300">PATIENT IN CONSULTATION ROOM</p>
                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{currentConsultation.patientName}</h3>
                      <p className="text-xs text-slate-500">{currentConsultation.patientGender}, {currentConsultation.patientAge} yrs • Phone: {currentConsultation.patientPhone}</p>
                    </div>
                    <span className="text-3xl font-black text-red-600">{currentConsultation.tokenNumber}</span>
                  </div>

                  <div className="pt-3 border-t border-red-200/60 dark:border-slate-600 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <p className="text-slate-400">Blood Pressure</p>
                      <p className="font-bold text-slate-900 dark:text-white">{currentConsultation.vitals?.bp || '120/80'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Pulse Rate</p>
                      <p className="font-bold text-slate-900 dark:text-white">{currentConsultation.vitals?.pulse || '72 bpm'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Temperature</p>
                      <p className="font-bold text-slate-900 dark:text-white">{currentConsultation.vitals?.temp || '98.6°F'}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Weight</p>
                      <p className="font-bold text-slate-900 dark:text-white">{currentConsultation.vitals?.weight || '70 kg'}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Chief Complaint / Symptoms:</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 italic mt-0.5">"{currentConsultation.symptoms}"</p>
                  </div>
                </div>

                {/* Prescription Writer */}
                <div className="space-y-4 pt-2">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-600" /> Digital Prescription & Clinical Notes
                  </h4>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Diagnosis</label>
                    <input
                      type="text"
                      value={diagnosisText}
                      onChange={(e) => setDiagnosisText(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold"
                    />
                  </div>

                  {/* Add Medication Row */}
                  <div className="grid sm:grid-cols-12 gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Medication Name (e.g. Amoxicillin 500mg)..."
                      value={medInput}
                      onChange={(e) => setMedInput(e.target.value)}
                      className="sm:col-span-6 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700"
                    />
                    <input
                      type="text"
                      placeholder="Dosage instruction..."
                      value={dosageInput}
                      onChange={(e) => setDosageInput(e.target.value)}
                      className="sm:col-span-4 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700"
                    />
                    <button
                      type="button"
                      onClick={handleAddMedication}
                      className="sm:col-span-2 py-2 px-3 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>

                  {/* Added Medications List */}
                  <ul className="space-y-2 text-xs">
                    {medList.map((m, idx) => (
                      <li key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 flex justify-between items-center">
                        <div>
                          <strong className="text-slate-900 dark:text-white">{m.med}</strong>
                          <span className="text-slate-500 ml-2 font-medium">({m.dosage})</span>
                        </div>
                        <button 
                          onClick={() => setMedList(medList.filter((_, i) => i !== idx))}
                          className="text-red-500 hover:underline font-bold text-[11px]"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs space-y-3">
                <Stethoscope className="w-10 h-10 mx-auto text-slate-300" />
                <p className="font-bold text-slate-700 dark:text-slate-300">No Patient Currently in Consultation</p>
                <p>Click <strong>"CALL NEXT PATIENT"</strong> to trigger audio chime and bring the next patient into your room.</p>
              </div>
            )}

          </div>

          {/* Today's Queue List for Doctor */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-6">
            
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Waiting Room Queue ({waitingQueue.length})</h3>
              <span className="text-xs text-emerald-600 font-bold">Live Sync</span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {waitingQueue.map((t, idx) => (
                <div key={t.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200/60 dark:border-slate-700 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-mono font-black text-red-600 dark:text-red-400 text-sm">{t.tokenNumber}</span>
                    <span className="text-[10px] font-bold text-slate-400">Slot: {t.slotTime}</span>
                  </div>
                  <p className="font-bold text-slate-900 dark:text-white text-xs">{t.patientName}</p>
                  <p className="text-[11px] text-slate-500 truncate">Complaints: {t.symptoms}</p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
