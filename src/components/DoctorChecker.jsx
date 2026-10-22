import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin, 
  Calendar, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle,
  Users,
  Building2,
  ChevronRight
} from 'lucide-react';
import { DEPARTMENTS, PUNE_AREAS } from '../data/hospitalData';

export default function DoctorChecker({ doctors, setActiveTab }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptId, setSelectedDeptId] = useState('all');
  const [selectedArea, setSelectedArea] = useState('All Pune Areas');

  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = selectedDeptId === 'all' || doc.deptId === selectedDeptId;
    const matchesArea = selectedArea === 'All Pune Areas' || doc.area === selectedArea;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.qualification.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (doc.hospital && doc.hospital.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (doc.area && doc.area.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (doc.address && doc.address.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesArea && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 font-bold text-xs uppercase tracking-wider border border-red-200">
              <MapPin className="w-3.5 h-3.5" />
              Verified Pune Doctors & Hospitals Directory
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              Pune Doctor Availability & Clinic Checker
            </h1>
            <p className="text-sm text-slate-500">
              Live consultation status across Poona Hospital, Deenanath Mangeshkar, Jehangir, Inlaks & Budhrani, Medipoint, and top Pune clinics.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('booking')}
            className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all shadow-md shadow-red-600/20 cursor-pointer"
          >
            + Book Pune OPD Slot
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          
          <div className="grid md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search doctor, hospital (e.g. Deenanath, Inlaks, Poona Hospital), or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
              />
            </div>

            {/* Department Select Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedDeptId}
                onChange={(e) => setSelectedDeptId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold"
              >
                <option value="all">All Specialties ({DEPARTMENTS.length})</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>

            {/* Pune Area / Locality Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold"
              >
                {PUNE_AREAS.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Quick Area Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-semibold">
            <button
              onClick={() => setSelectedArea('All Pune Areas')}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedArea === 'All Pune Areas'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              All Pune ({doctors.length})
            </button>
            {PUNE_AREAS.filter(a => a !== 'All Pune Areas').map((a) => (
              <button
                key={a}
                onClick={() => setSelectedArea(a)}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedArea === a
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center text-xs text-slate-500 px-1">
          <span>Showing <strong>{filteredDoctors.length}</strong> Pune Doctors matching filters</span>
          <span>Source: Official Pune Doctor Directory</span>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => {
            const isAvailable = doc.status === 'Available';
            const inConsult = doc.status === 'In-Consultation';
            
            return (
              <div
                key={doc.id}
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  
                  {/* Top Badge & Status */}
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-300 text-[10px] font-bold uppercase tracking-wider border border-red-100">
                      {doc.department.split('&')[0]}
                    </span>

                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1 ${
                      isAvailable ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      inConsult ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isAvailable ? 'bg-emerald-500 animate-pulse' :
                        inConsult ? 'bg-red-500 animate-pulse' : 'bg-amber-500'
                      }`} />
                      {doc.status}
                    </span>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={doc.photo}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-700 shadow-xs"
                    />
                    <div>
                      <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{doc.name}</h3>
                      <p className="text-xs text-slate-500 font-medium">{doc.qualification}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold mt-0.5">
                        {doc.experience} Years Practice
                      </p>
                      
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold mt-1">
                        <Star className="w-3.5 h-3.5 fill-amber-500" />
                        <span>{doc.rating}</span>
                        <span className="text-slate-400 font-normal">({doc.reviewsCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Hospital & Location Details */}
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 space-y-2 text-xs">
                    <div className="p-3 rounded-xl bg-red-50/50 dark:bg-slate-700/50 border border-red-100/60 dark:border-slate-700 space-y-1">
                      <p className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-red-600" /> {doc.hospital}
                      </p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-red-500 shrink-0" /> {doc.address}
                      </p>
                    </div>

                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" /> Clinic Timings:</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 font-bold text-right truncate max-w-[180px]">{doc.timings}</strong>
                    </div>

                    <div className="flex justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400">Serving Token:</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 font-mono font-bold text-slate-800 dark:text-slate-200">
                        {doc.currentServingToken}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Footer Action */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400">Consultation Fee</span>
                    <p className="font-extrabold text-red-600 text-sm">₹{doc.fee}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('booking')}
                    className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md shadow-red-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" /> Book Token Pass
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
