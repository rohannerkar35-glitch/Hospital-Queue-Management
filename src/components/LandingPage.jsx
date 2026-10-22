import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Users, 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  QrCode, 
  Bell, 
  Stethoscope, 
  TrendingDown, 
  Building2, 
  Heart, 
  ChevronRight, 
  Star,
  Zap,
  PhoneCall,
  Mail,
  MapPin,
  Smartphone,
  Play
} from 'lucide-react';
import { DEPARTMENTS } from '../data/hospitalData';

export default function LandingPage({ setActiveTab, activeToken, doctors }) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      num: '01',
      title: 'Select Department',
      desc: 'Browse through Cardiology, Orthopedics, General Medicine, Pediatrics and more with live workload indicators.',
      icon: Stethoscope,
      bg: 'bg-red-600'
    },
    {
      num: '02',
      title: 'Choose Doctor',
      desc: 'Compare doctors by specialization, experience, patient ratings, and estimated consultation time.',
      icon: Users,
      bg: 'bg-rose-600'
    },
    {
      num: '03',
      title: 'Book Appointment',
      desc: 'Pick your preferred date and convenient time slot with real-time slot reservation.',
      icon: Calendar,
      bg: 'bg-red-500'
    },
    {
      num: '04',
      title: 'Receive Digital Token',
      desc: 'Get an instant digital token pass with QR code sent to your phone and saved in your patient portal.',
      icon: QrCode,
      bg: 'bg-rose-500'
    },
    {
      num: '05',
      title: 'Track Queue Live',
      desc: 'Monitor live queue movement on your smartphone from home or hospital lounge with real-time alerts.',
      icon: Clock,
      bg: 'bg-red-700'
    },
    {
      num: '06',
      title: 'Meet Doctor',
      desc: 'Walk into the consultation room directly when your token is called without sitting in long waiting halls.',
      icon: CheckCircle2,
      bg: 'bg-rose-700'
    }
  ];

  const benefits = [
    {
      title: '78% Reduced Waiting Time',
      desc: 'Algorithms dynamic queue balancing eliminates static waiting hall overcrowding.',
      icon: TrendingDown,
      color: 'from-red-600 to-rose-500'
    },
    {
      title: 'Seamless Digital Tokens',
      desc: 'No paper slips. QR-coded digital tokens automatically update your estimated turn.',
      icon: QrCode,
      color: 'from-rose-600 to-red-600'
    },
    {
      title: 'Real-Time Queue Alerts',
      desc: 'Receive SMS & push notifications when your turn is 2 slots away so you arrive right on time.',
      icon: Bell,
      color: 'from-red-500 to-orange-500'
    },
    {
      title: 'Doctor Availability Matrix',
      desc: 'Check live status of doctors, OPD room numbers, and next available slots instantly.',
      icon: Stethoscope,
      color: 'from-rose-500 to-red-700'
    },
    {
      title: 'Smart Hospital Workflow',
      desc: 'Integrates reception desk, doctor consultation console, and patient portal into one flow.',
      icon: Activity,
      color: 'from-red-600 to-rose-700'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-16 lg:pb-28 bg-gradient-to-b from-red-50/40 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
        
        {/* Background decorative glow elements */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-red-400/10 via-rose-400/10 to-red-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 border border-red-200/80 dark:border-red-800/60 text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                <span>Next-Gen Smart Hospital OPD Queue System</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]">
                Skip Long Queues. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                  Get Treated Faster.
                </span>
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                Book appointments, track waiting times in real-time, get digital tokens, and consult doctors efficiently without waiting hours in crowded hospital corridors.
              </p>

              {/* Action CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setActiveTab('booking')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-600/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveTab('queue')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-base border border-slate-200 dark:border-slate-700 shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                  <span>Check Live Queue Status</span>
                </button>
              </div>

              {/* Hero highlights */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> Instant Digital Pass
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-red-500" /> Real-Time Queue Sync
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" /> AI Wait Predictor
                </span>
              </div>

            </div>

            {/* Right Interactive Hero Illustration Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-red-100/60 dark:border-slate-700 relative overflow-hidden">
                
                {/* Decorative header of card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <span className="text-xs font-bold text-slate-400 ml-2">OPD LIVE DIGITAL MONITOR</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-red-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                    Live Syncing
                  </span>
                </div>

                {/* Simulated active token card */}
                <div className="py-5 space-y-4">
                  
                  <div className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 rounded-2xl p-5 text-white shadow-lg shadow-red-600/20 relative overflow-hidden">
                    <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                    
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[11px] font-semibold text-rose-100 uppercase tracking-wider">Active Token Pass</p>
                        <p className="text-3xl font-black tracking-tight mt-1">{activeToken ? activeToken.tokenNumber : 'CARD-104'}</p>
                      </div>
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center font-bold text-white">
                        <QrCode className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/20 text-xs">
                      <div>
                        <p className="text-rose-100 text-[10px]">Department</p>
                        <p className="font-bold">{activeToken ? activeToken.department : 'Cardiology'}</p>
                      </div>
                      <div>
                        <p className="text-rose-100 text-[10px]">Doctor</p>
                        <p className="font-bold">{activeToken ? activeToken.doctorName : 'Dr. Rohan Nerkar'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Live Queue Progress Visualizer inside Hero */}
                  <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center text-xs mb-2">
                      <span className="font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-red-600" /> Queue Progress
                      </span>
                      <span className="font-bold text-red-600 dark:text-red-400">
                        {activeToken ? `${activeToken.estWaitMins} mins wait` : '12 mins wait'}
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-600 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-red-600 to-rose-500 h-full w-[70%] rounded-full animate-pulse"></div>
                    </div>

                    <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
                      <span>Serving: #CARD-101</span>
                      <span className="text-red-600 font-bold">Your Position: #3</span>
                    </div>
                  </div>

                  {/* Quick doctor room status */}
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                        104
                      </div>
                      <div>
                        <p className="font-bold">Room 104 - Cardiac Wing</p>
                        <p className="text-[10px] opacity-80">Dr. Rohan Nerkar in consultation</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-emerald-600 text-white rounded-md font-bold text-[10px]">
                      Moving Fast
                    </span>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-12 bg-white dark:bg-slate-800/80 border-y border-slate-200/70 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-2xl bg-red-50/60 dark:bg-slate-700/40 border border-red-100 dark:border-slate-600">
              <p className="text-3xl sm:text-4xl font-extrabold text-red-600 dark:text-red-400">12,450+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">Patients Served</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Across all OPD wards</p>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50/60 dark:bg-slate-700/40 border border-rose-100 dark:border-slate-600">
              <p className="text-3xl sm:text-4xl font-extrabold text-red-600 dark:text-red-400">12 Mins</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">Average Wait Time</p>
              <p className="text-[11px] text-red-600 dark:text-red-400 font-bold mt-0.5">↓ 78% from 65 Mins</p>
            </div>

            <div className="p-6 rounded-2xl bg-red-50/40 dark:bg-slate-700/40 border border-red-100/60 dark:border-slate-600">
              <p className="text-3xl sm:text-4xl font-extrabold text-red-700 dark:text-red-300">48 Active</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">Specialist Doctors</p>
              <p className="text-[11px] text-slate-400 mt-0.5">7 Departments on duty</p>
            </div>

            <div className="p-6 rounded-2xl bg-rose-50/40 dark:bg-slate-700/40 border border-rose-100/60 dark:border-slate-600">
              <p className="text-3xl sm:text-4xl font-extrabold text-rose-700 dark:text-rose-300">350+</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">Daily Appointments</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Online & Walk-in combined</p>
            </div>

          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-red-600 dark:text-red-400">
            Why Choose Smart Hospital OPD
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Designed for Maximum Patient Comfort & Hospital Efficiency
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-base">
            Our intelligent queue management platform streamlines every phase of outpatient care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((b, idx) => {
            const IconComp = b.icon;
            return (
              <div 
                key={idx}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${b.color} text-white flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{b.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-slate-100/70 dark:bg-slate-800/40 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs uppercase font-extrabold tracking-widest text-red-600">
              Simplified Patient Flow
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              How It Works: 6 Quick Steps
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-base">
              From online booking to direct consultation in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((step) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={step.num}
                  onClick={() => setActiveStep(parseInt(step.num))}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer ${
                    activeStep === parseInt(step.num)
                      ? 'bg-white dark:bg-slate-800 border-red-600 shadow-xl ring-2 ring-red-500/20'
                      : 'bg-white/80 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black tracking-wider text-slate-400">STEP {step.num}</span>
                    <div className={`w-10 h-10 rounded-xl ${step.bg} text-white flex items-center justify-center shadow-xs`}>
                      <StepIcon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveTab('booking')}
              className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Start Booking Experience</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* DEPARTMENT PREVIEW SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Active OPD Departments</h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">Real-time doctor counts and current estimated wait times.</p>
          </div>
          <button
            onClick={() => setActiveTab('doctors')}
            className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
          >
            View All Doctors <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEPARTMENTS.slice(0, 4).map((dept) => (
            <div 
              key={dept.id}
              className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-300 text-[10px] font-bold uppercase tracking-wider border border-red-100">
                  {dept.code}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {dept.avgWaitTime} mins wait
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{dept.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Head: {dept.headDoctor}</p>
              
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                <span className="text-slate-500">{dept.activeDoctors} Doctors Available</span>
                <button
                  onClick={() => setActiveTab('booking')}
                  className="font-bold text-red-600 hover:underline"
                >
                  Book Slot →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-red-500">Patient Feedback</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">Rated 4.9/5 by 10,000+ Hospital Visitors</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "I booked Cardiology appointment for my father from home. We reached the hospital 10 minutes before our token was called. No sitting in crowded halls!"
              </p>
              <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Rohan Shinde</p>
                  <p className="text-slate-400 text-[10px]">Patient Son (Cardiology)</p>
                </div>
                <span className="text-emerald-400 font-bold text-[10px]">Verified Visit</span>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "The live queue tracking feature on WhatsApp & browser is revolutionary. I drank coffee at the cafeteria while watching my queue position move live!"
              </p>
              <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Pooja Deshmukh</p>
                  <p className="text-slate-400 text-[10px]">Orthopedics Patient</p>
                </div>
                <span className="text-emerald-400 font-bold text-[10px]">Verified Visit</span>
              </div>
            </div>

            <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 space-y-4">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "As a doctor, this system has transformed my OPD consultations. Patients arrive right on time, and my queue is smooth without reception bottlenecks."
              </p>
              <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-white">Dr. Rohan Nerkar</p>
                  <p className="text-slate-400 text-[10px]">Chief of Cardiology</p>
                </div>
                <span className="text-red-400 font-bold text-[10px]">Hospital Staff</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
            
            <div className="col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-lg text-white">Smart OPD Management System</span>
              </div>
              <p className="text-slate-400 max-w-sm">
                Empowering healthcare institutions with AI-assisted queue management, digital tokens, and streamlined outpatient care.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold text-[10px]">
                  ● System Operational (99.9% Uptime)
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Quick Navigation</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-white">Home</button></li>
                <li><button onClick={() => setActiveTab('booking')} className="hover:text-white">Book Appointment</button></li>
                <li><button onClick={() => setActiveTab('doctors')} className="hover:text-white">Find Doctor</button></li>
                <li><button onClick={() => setActiveTab('queue')} className="hover:text-white">Live Queue</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Staff Portals</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('patient-portal')} className="hover:text-white">Patient Portal</button></li>
                <li><button onClick={() => setActiveTab('doctor-dashboard')} className="hover:text-white">Doctor Console</button></li>
                <li><button onClick={() => setActiveTab('reception-dashboard')} className="hover:text-white">Reception Desk</button></li>
                <li><button onClick={() => setActiveTab('admin-dashboard')} className="hover:text-white">Admin Dashboard</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Emergency Contacts</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2"><PhoneCall className="w-3.5 h-3.5 text-red-500" /> Helpline: 1-800-SMART-OPD</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-red-400" /> opd@smarthospital.org</li>
                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-rose-400" /> Medical Center Wing A</li>
              </ul>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© 2026 Smart Hospital OPD Management System. All rights reserved.</p>
            <div className="flex gap-4 text-slate-500">
              <span className="hover:underline cursor-pointer">Privacy Policy</span>
              <span className="hover:underline cursor-pointer">Terms of Service</span>
              <span className="hover:underline cursor-pointer">HIPAA Compliance</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
