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
import LoginModal from './components/LoginModal';
import { INITIAL_DOCTORS, INITIAL_TOKENS, INITIAL_NOTIFICATIONS } from './data/hospitalData';

// Global Error Boundary to catch any runtime errors gracefully
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Portal ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-2xl font-bold">
              !
            </div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Portal Display Error</h2>
            <p className="text-xs text-slate-500">
              {this.state.error?.message || 'An error occurred while loading this view.'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="px-6 py-2.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-all cursor-pointer shadow-md"
            >
              Reload Portal
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('patient');
  const [darkMode, setDarkMode] = useState(false);

  // Authentication session state
  const [authSession, setAuthSession] = useState(() => {
    try {
      const saved = localStorage.getItem('smartopd_auth');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginTargetRole, setLoginTargetRole] = useState('patient');

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

  // Auth gate navigation handler
  const handleNavigateTab = (targetTab) => {
    if (targetTab === 'patient-portal') {
      if (!authSession || authSession.role !== 'patient') {
        // If user already has created or active tokens, let them view their patient portal
        if (tokens && tokens.length > 0) {
          setActiveTab('patient-portal');
          return;
        }
        setLoginTargetRole('patient');
        setLoginModalOpen(true);
        return;
      }
    }
    if (targetTab === 'doctor-dashboard' && (!authSession || authSession.role !== 'doctor')) {
      setLoginTargetRole('doctor');
      setLoginModalOpen(true);
      return;
    }
    if (targetTab === 'reception-dashboard' && (!authSession || authSession.role !== 'reception')) {
      setLoginTargetRole('reception');
      setLoginModalOpen(true);
      return;
    }
    if (targetTab === 'admin-dashboard' && (!authSession || authSession.role !== 'admin')) {
      setLoginTargetRole('admin');
      setLoginModalOpen(true);
      return;
    }
    setActiveTab(targetTab);
  };

  const handleLoginSuccess = (account) => {
    setAuthSession(account);
    setUserRole(account.role);
    setActiveTab(account.targetTab);
    try {
      localStorage.setItem('smartopd_auth', JSON.stringify(account));
    } catch (e) {}

    const welcomeNotif = {
      id: `notif-${Date.now()}`,
      title: `Logged in as ${account.name}`,
      message: `Access granted to ${account.portalName}. Welcome back!`,
      channel: 'System Security',
      time: 'Just now',
      read: false,
      type: 'confirmation'
    };
    setNotifications(prev => [welcomeNotif, ...prev]);
  };

  const handleLogout = () => {
    setAuthSession(null);
    setUserRole('patient');
    setActiveTab('home');
    try {
      localStorage.removeItem('smartopd_auth');
    } catch (e) {}

    const logoutNotif = {
      id: `notif-${Date.now()}`,
      title: 'Signed Out Successfully',
      message: 'You have been logged out of the portal.',
      channel: 'System Security',
      time: 'Just now',
      read: false,
      type: 'reminder'
    };
    setNotifications(prev => [logoutNotif, ...prev]);
  };

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

    // Auto-create or ensure patient session so Patient Portal is active and personalized
    if (!authSession) {
      const patientSession = {
        role: 'patient',
        portalName: 'Patient Portal',
        name: newToken.patientName || 'Om Kulkarni',
        displayName: newToken.patientName || 'Om Kulkarni',
        username: (newToken.patientName || 'patient').toLowerCase().replace(/\s+/g, ''),
        email: `${(newToken.patientName || 'patient').toLowerCase().replace(/\s+/g, '')}@hospital.in`,
        targetTab: 'patient-portal',
        badge: 'Verified Patient',
        patientId: `PAT-${Math.floor(100000 + Math.random() * 900000)}`,
        phone: newToken.patientPhone || '+91 98220 54321',
        age: newToken.patientAge || 28,
        gender: newToken.patientGender || 'Male',
        bloodGroup: 'B+',
        allergies: 'None recorded',
        emergencyContact: 'Emergency Contact Available'
      };
      setAuthSession(patientSession);
      setUserRole('patient');
      try {
        localStorage.setItem('smartopd_auth', JSON.stringify(patientSession));
      } catch (e) {}
    } else {
      setUserRole('patient');
    }

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

  const activeUserToken = tokens.find(t => t.patientName.includes('Om Kulkarni') || t.patientName.includes('Alex Morgan') || t.tokenNumber === 'CARD-104');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        userRole={userRole}
        setUserRole={setUserRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        notifications={notifications}
        unreadCount={unreadCount}
        onOpenNotifications={() => setNotificationsOpen(true)}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
        authSession={authSession}
        onOpenLoginModal={(role) => {
          setLoginTargetRole(role || 'patient');
          setLoginModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <ErrorBoundary>
        <main>
          {activeTab === 'home' && (
            <LandingPage
              setActiveTab={handleNavigateTab}
              activeToken={activeUserToken}
              doctors={doctors}
            />
          )}

          {activeTab === 'patient-portal' && (
            <PatientPortal
              tokens={tokens}
              onCancelToken={handleCancelToken}
              onRescheduleToken={(id) => handleNavigateTab('booking')}
              setActiveTab={handleNavigateTab}
              onOpenQRModal={(token) => setSelectedTokenForModal(token)}
              notifications={notifications}
              authSession={authSession}
            />
          )}

          {activeTab === 'booking' && (
            <BookingModule
              doctors={doctors}
              onBookSuccess={handleBookSuccess}
              setActiveTab={handleNavigateTab}
            />
          )}

          {activeTab === 'doctors' && (
            <DoctorChecker
              doctors={doctors}
              setActiveTab={handleNavigateTab}
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
              setActiveTab={handleNavigateTab}
            />
          )}

          {activeTab === 'admin-dashboard' && (
            <AdminDashboard
              tokens={tokens}
              doctors={doctors}
              authSession={authSession}
            />
          )}

          {activeTab === 'reception-dashboard' && (
            <ReceptionDashboard
              doctors={doctors}
              tokens={tokens}
              onIssueWalkInToken={handleIssueWalkInToken}
              onOpenQRModal={(token) => setSelectedTokenForModal(token)}
              authSession={authSession}
            />
          )}

          {activeTab === 'doctor-dashboard' && (
            <DoctorDashboard
              doctors={doctors}
              tokens={tokens}
              onCallNextToken={handleCallNextToken}
              onCompleteToken={handleCompleteToken}
              onSkipToken={handleSkipToken}
              authSession={authSession}
            />
          )}
        </main>
      </ErrorBoundary>

      {/* MODALS */}

      {/* Authentication Login Modal Gate */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        targetRole={loginTargetRole}
        onLoginSuccess={handleLoginSuccess}
      />

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
