import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import PatientPortal from './components/PatientPortal';
import BookingModule from './components/BookingModule';
import DoctorChecker from './components/DoctorChecker';
import DigitalTokenPass from './components/DigitalTokenPass';
import QueueTracker from './components/QueueTracker';
import NotificationCenter from './components/NotificationCenter';
import AdminDashboard from './components/AdminDashboard';
import ReceptionDashboard from './components/ReceptionDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import AISmartFeatures from './components/AISmartFeatures';
import EmergencyModal from './components/EmergencyModal';


import { INITIAL_DOCTORS, INITIAL_TOKENS, INITIAL_NOTIFICATIONS } from './data/hospitalData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('patient');
  const [darkMode, setDarkMode] = useState(false);

  // Core interactive state
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [tokens, setTokens] = useState(INITIAL_TOKENS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Modals state
  const [selectedTokenForModal, setSelectedTokenForModal] = useState(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Toggle dark class on root document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Web Audio chime simulator for token call
  const playCallChime = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5 note
      osc.frequency.exponentialRampToValueAtTime(659.25, audioCtx.currentTime + 0.3); // E5 note
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.log('Audio chime simulated');
    }
  };

  // BOOK APPOINTMENT SUCCESS HANDLER
  const handleBookSuccess = (newToken) => {
    setTokens(prev => [newToken, ...prev]);
    setSelectedTokenForModal(newToken);

    // Push notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Digital Token Issued',
      message: `Token ${newToken.tokenNumber} created for ${newToken.department}. Est wait: ${newToken.estWaitMins} mins.`,
      channel: 'SMS & App Pass',
      time: 'Just now',
      read: false,
      type: 'confirmation'
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveTab('patient-portal');
  };

  // ISSUE WALK-IN TOKEN HANDLER
  const handleIssueWalkInToken = (newToken) => {
    setTokens(prev => [newToken, ...prev]);
    const newNotif = {
      id: `notif-${Date.now()}`,
      title: 'Walk-In Token Generated',
      message: `Token ${newToken.tokenNumber} printed at Reception Desk #2.`,
      channel: 'Kiosk Slip',
      time: 'Just now',
      read: false,
      type: 'walkin'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // CALL NEXT TOKEN HANDLER (DOCTOR / QUEUE)
  const handleCallNextToken = (departmentName) => {
    playCallChime();

    setTokens(prevTokens => {
      // Find current calling or in-consultation token for this department and complete it
      let updated = prevTokens.map(t => {
        if (t.department === departmentName && (t.status === 'CALLING' || t.status === 'IN_CONSULTATION')) {
          return { ...t, status: 'COMPLETED', queuePosition: 0 };
        }
        return t;
      });

      // Find the first WAITING token in this department
      const nextWaiting = updated.find(t => t.department === departmentName && t.status === 'WAITING');

      if (nextWaiting) {
        updated = updated.map(t => {
          if (t.id === nextWaiting.id) {
            return { ...t, status: 'CALLING', queuePosition: 0, estWaitMins: 0 };
          }
          if (t.department === departmentName && t.status === 'WAITING' && t.queuePosition > 0) {
            return { ...t, queuePosition: t.queuePosition - 1, estWaitMins: Math.max(0, t.estWaitMins - 8) };
          }
          return t;
        });

        // Add notification
        const callNotif = {
          id: `notif-${Date.now()}`,
          title: `TOKEN CALLED: ${nextWaiting.tokenNumber}`,
          message: `Patient ${nextWaiting.patientName}, please proceed to Room ${nextWaiting.roomNo}!`,
          channel: 'Hospital Audio & SMS',
          time: 'Just now',
          read: false,
          type: 'alert'
        };
        setNotifications(n => [callNotif, ...n]);
      } else {
        alert(`No remaining waiting tokens in ${departmentName}.`);
      }

      return updated;
    });
  };

  // COMPLETE TOKEN HANDLER
  const handleCompleteToken = (tokenId) => {
    setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'COMPLETED', queuePosition: 0 } : t));
  };

  // SKIP TOKEN HANDLER
  const handleSkipToken = (tokenId) => {
    if (!tokenId) return;
    setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'SKIPPED', queuePosition: 99 } : t));
  };

  // CANCEL TOKEN HANDLER
  const handleCancelToken = (tokenId) => {
    setTokens(prev => prev.map(t => t.id === tokenId ? { ...t, status: 'CANCELLED' } : t));
    if (selectedTokenForModal?.id === tokenId) {
      setSelectedTokenForModal(null);
    }
  };

  // MARK ALL NOTIFICATIONS READ
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // TEST NOTIFICATION TRIGGER
  const handleTestNotification = () => {
    const testNotif = {
      id: `notif-${Date.now()}`,
      title: 'Queue Alert Demo',
      message: 'Token CARD-104 is 1 position away from entering Room 102.',
      channel: 'SMS (+1 555 999-0000)',
      time: 'Just now',
      read: false,
      type: 'test'
    };
    setNotifications(prev => [testNotif, ...prev]);
    playCallChime();
  };

  const activeUserToken = tokens.find(t => t.patientName.includes('Alex Morgan') || t.tokenNumber === 'CARD-104');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        unreadCount={unreadCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {activeTab === 'home' && (
          <LandingPage
            setActiveTab={setActiveTab}
            activeToken={activeUserToken}
            doctors={doctors}
          />
        )}

        {activeTab === 'patient-portal' && (
          <PatientPortal
            tokens={tokens}
            onCancelToken={handleCancelToken}
            onRescheduleToken={(id) => setActiveTab('booking')}
            setActiveTab={setActiveTab}
            onOpenQRModal={(token) => setSelectedTokenForModal(token)}
            notifications={notifications}
          />
        )}

        {activeTab === 'booking' && (
          <BookingModule
            doctors={doctors}
            onBookSuccess={handleBookSuccess}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'doctors' && (
          <DoctorChecker
            doctors={doctors}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'queue' && (
          <QueueTracker
            tokens={tokens}
            doctors={doctors}
            onCallNextToken={handleCallNextToken}
            onCompleteToken={handleCompleteToken}
            onSkipToken={handleSkipToken}
          />
        )}

        {activeTab === 'ai-features' && (
          <AISmartFeatures
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'admin-dashboard' && (
          <AdminDashboard
            tokens={tokens}
            doctors={doctors}
          />
        )}

        {activeTab === 'reception-dashboard' && (
          <ReceptionDashboard
            doctors={doctors}
            tokens={tokens}
            onIssueWalkInToken={handleIssueWalkInToken}
            onOpenQRModal={(token) => setSelectedTokenForModal(token)}
          />
        )}

        {activeTab === 'doctor-dashboard' && (
          <DoctorDashboard
            doctors={doctors}
            tokens={tokens}
            onCallNextToken={handleCallNextToken}
            onCompleteToken={handleCompleteToken}
            onSkipToken={handleSkipToken}
          />
        )}
      </main>

      {/* MODALS */}

      {/* Digital QR Token Pass Modal */}
      {selectedTokenForModal && (
        <DigitalTokenPass
          token={selectedTokenForModal}
          onClose={() => setSelectedTokenForModal(null)}
          onCancelToken={handleCancelToken}
        />
      )}

      {/* Emergency Hotline Modal */}
      {emergencyModalOpen && (
        <EmergencyModal
          onClose={() => setEmergencyModalOpen(false)}
        />
      )}



      {/* Notification Center Drawer */}
      {notificationsOpen && (
        <NotificationCenter
          notifications={notifications}
          onClose={() => setNotificationsOpen(false)}
          onMarkAllRead={handleMarkAllRead}
          onTestNotification={handleTestNotification}
        />
      )}

    </div>
  );
}
