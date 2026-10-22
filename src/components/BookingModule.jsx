import React, { useState } from 'react';
import { 
  Stethoscope, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  Sparkles,
  QrCode,
  ShieldCheck,
  Star,
  MapPin,
  Building2,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DEPARTMENTS, PUNE_AREAS } from '../data/hospitalData';

export default function BookingModule({ doctors, onBookSuccess, setActiveTab }) {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState(null);
  const [selectedArea, setSelectedArea] = useState('All Pune Areas');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2026-10-05');
  const [selectedSlot, setSelectedSlot] = useState('');
  
  // Patient details form
  const [patientForm, setPatientForm] = useState({
    name: 'Sanjay Kulkarni',
    age: 48,
    gender: 'Male',
    phone: '+91 98220 12345',
    symptoms: 'Routine consultation & follow-up test review'
  });

  const availableSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '04:00 PM', '04:30 PM', 
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
  ];

  const filteredDoctors = doctors.filter(d => {
    const matchesDept = selectedDept ? d.deptId === selectedDept.id : true;
    const matchesArea = selectedArea === 'All Pune Areas' ? true : d.area === selectedArea;
    return matchesDept && matchesArea;
  });

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    if (!selectedSlot) return alert('Please select a time slot!');

    // Trigger confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log(err);
    }

    const tokenCode = `${selectedDept ? selectedDept.code : 'OPD'}-${Math.floor(100 + Math.random() * 900)}`;

    const newToken = {
      id: `token-${Date.now()}`,
      tokenNumber: tokenCode,
      patientName: patientForm.name,
      patientAge: parseInt(patientForm.age),
      patientGender: patientForm.gender,
      patientPhone: patientForm.phone,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      department: selectedDept.name,
      hospital: selectedDoctor.hospital,
      area: selectedDoctor.area,
      roomNo: selectedDoctor.roomNo,
      slotTime: selectedSlot,
      status: 'WAITING',
      queuePosition: Math.floor(Math.random() * 3) + 1,
      estWaitMins: (Math.floor(Math.random() * 3) + 1) * selectedDoctor.avgConsultationMins,
      date: selectedDate,
      bookedVia: 'Online SmartOPD Pune Portal',
      symptoms: patientForm.symptoms
    };

    onBookSuccess(newToken);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Step Indicator Header */}
        <div className="text-center space-y-2">
          <span className="px-3.5 py-1 rounded-full bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 font-bold text-xs uppercase tracking-wider border border-red-200">
            Pune Hospital OPD Appointment Booking
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Book Appointment & Get Instant Token Pass
          </h1>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            Select a specialty department, choose from verified doctors across Pune hospitals & clinics, pick a slot, and receive your digital QR token pass immediately.
          </p>
        </div>

        {/* Wizard Progress Bar */}
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-xs">
          <div className="grid grid-cols-4 text-center text-xs font-bold">
            
            <div className={`py-2 px-1 rounded-xl transition-all ${step === 1 ? 'bg-red-600 text-white shadow-sm shadow-red-600/30' : step > 1 ? 'text-red-700 dark:text-red-400' : 'text-slate-400'}`}>
              <span className="hidden sm:inline">1. </span>Department
            </div>

            <div className={`py-2 px-1 rounded-xl transition-all ${step === 2 ? 'bg-red-600 text-white shadow-sm shadow-red-600/30' : step > 2 ? 'text-red-700 dark:text-red-400' : 'text-slate-400'}`}>
              <span className="hidden sm:inline">2. </span>Pune Doctor
            </div>

            <div className={`py-2 px-1 rounded-xl transition-all ${step === 3 ? 'bg-red-600 text-white shadow-sm shadow-red-600/30' : step > 3 ? 'text-red-700 dark:text-red-400' : 'text-slate-400'}`}>
              <span className="hidden sm:inline">3. </span>Date & Slot
            </div>

            <div className={`py-2 px-1 rounded-xl transition-all ${step === 4 ? 'bg-red-600 text-white shadow-sm shadow-red-600/30' : 'text-slate-400'}`}>
              <span className="hidden sm:inline">4. </span>Confirm Pass
            </div>

          </div>
        </div>

        {/* STEP 1: SELECT DEPARTMENT */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Step 1: Select Medical Specialty</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DEPARTMENTS.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => {
                    setSelectedDept(dept);
                    setStep(2);
                  }}
                  className={`bg-white dark:bg-slate-800 p-6 rounded-3xl border transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1 ${
                    selectedDept?.id === dept.id
                      ? 'border-red-600 ring-2 ring-red-500/20 shadow-lg'
                      : 'border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-300 font-bold flex items-center justify-center text-xs border border-red-100">
                      {dept.code}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-extrabold text-[10px] uppercase">
                      {dept.avgWaitTime} mins wait
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-lg">{dept.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{dept.description}</p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs text-slate-600 dark:text-slate-300">
                    <span>Head: {dept.headDoctor}</span>
                    <ChevronRight className="w-4 h-4 text-red-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT DOCTOR */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Change Specialty ({selectedDept?.name})
              </button>

              {/* Area filter */}
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
              >
                {PUNE_AREAS.map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Step 2: Choose Specialist Doctor & Hospital</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredDoctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoctor(doc);
                    setStep(3);
                  }}
                  className={`bg-white dark:bg-slate-800 p-6 rounded-3xl border transition-all cursor-pointer hover:shadow-xl ${
                    selectedDoctor?.id === doc.id
                      ? 'border-red-600 ring-2 ring-red-500/20 shadow-lg'
                      : 'border-slate-200/80 dark:border-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-red-500/20"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{doc.name}</h3>
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{doc.qualification}</p>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-red-600" /> {doc.hospital}
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" /> {doc.area} ({doc.address})
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-slate-400">Consultation Fee</p>
                      <p className="font-extrabold text-red-600 text-sm">₹{doc.fee}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Next Slot</p>
                      <p className="font-bold text-emerald-600 text-sm">{doc.nextAvailableSlot}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: DATE & SLOT SELECTION */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Change Doctor ({selectedDoctor?.name})
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Step 3: Select Date & Time Slot</h2>

            <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-6">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Consultation Slots</label>
                  <span className="text-xs text-slate-400">Doctor Hours: {selectedDoctor?.timings}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                        selectedSlot === slot
                          ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20'
                          : 'bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-red-50'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  disabled={!selectedSlot}
                  onClick={() => setStep(4)}
                  className="px-8 py-3.5 rounded-2xl bg-red-600 text-white font-bold text-sm shadow-md shadow-red-600/20 disabled:opacity-50 hover:bg-red-700 transition-all cursor-pointer"
                >
                  Proceed to Patient Verification →
                </button>
              </div>

            </div>
          </div>
        )}

        {/* STEP 4: PATIENT DETAILS & CONFIRMATION */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Change Time Slot ({selectedSlot})
              </button>
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Step 4: Patient Details & Confirm Token</h2>

            <form onSubmit={handleCompleteBooking} className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 space-y-6">
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={patientForm.name}
                    onChange={(e) => setPatientForm({ ...patientForm, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Mobile Number (for SMS & WhatsApp Token)</label>
                  <input
                    type="text"
                    required
                    value={patientForm.phone}
                    onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Age</label>
                  <input
                    type="number"
                    required
                    value={patientForm.age}
                    onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Gender</label>
                  <select
                    value={patientForm.gender}
                    onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">Symptoms / Reason for Visit</label>
                <textarea
                  rows="3"
                  value={patientForm.symptoms}
                  onChange={(e) => setPatientForm({ ...patientForm, symptoms: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                />
              </div>

              {/* Summary Box */}
              <div className="bg-red-50/70 dark:bg-slate-700/60 p-5 rounded-2xl border border-red-100 dark:border-slate-600 space-y-2 text-xs">
                <p className="font-bold text-red-600 dark:text-red-300 text-sm">Pune OPD Booking Summary</p>
                <div className="grid sm:grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <p><strong>Department:</strong> {selectedDept?.name}</p>
                  <p><strong>Doctor:</strong> {selectedDoctor?.name}</p>
                  <p><strong>Hospital / Clinic:</strong> {selectedDoctor?.hospital}</p>
                  <p><strong>Area:</strong> {selectedDoctor?.area} ({selectedDoctor?.address})</p>
                  <p><strong>Date & Slot:</strong> {selectedDate} at {selectedSlot}</p>
                  <p><strong>Consultation Fee:</strong> ₹{selectedDoctor?.fee}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-base shadow-xl shadow-red-600/30 hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5" /> Generate Pune OPD Digital Token Pass
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
