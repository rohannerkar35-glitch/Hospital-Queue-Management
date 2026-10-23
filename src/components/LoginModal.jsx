import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  User, 
  Stethoscope, 
  Users, 
  LayoutDashboard, 
  Key, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { AUTH_ACCOUNTS, validateLogin } from '../data/authData';

export default function LoginModal({ 
  isOpen, 
  onClose, 
  targetRole = 'patient', 
  onLoginSuccess 
}) {
  const [selectedRole, setSelectedRole] = useState(targetRole || 'patient');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync selectedRole with targetRole whenever targetRole changes
  useEffect(() => {
    if (targetRole) {
      setSelectedRole(targetRole);
      setErrorMessage('');
    }
  }, [targetRole, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentAccountConfig = AUTH_ACCOUNTS[selectedRole] || AUTH_ACCOUNTS.patient;

  // Handle Form Submission
  const handleSubmit = (e) => {
    e?.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      const result = validateLogin(selectedRole, identifier, password);
      setIsLoading(false);

      if (result.success) {
        onLoginSuccess(result.account);
        onClose();
      } else {
        setErrorMessage(result.message);
      }
    }, 250);
  };

  // Quick Demo Autofill handler
  const handleAutoFill = (roleKey, autoSubmit = false) => {
    const acc = AUTH_ACCOUNTS[roleKey];
    if (!acc) return;
    setSelectedRole(roleKey);
    setIdentifier(acc.username);
    setPassword(acc.password);
    setErrorMessage('');

    if (autoSubmit) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess(acc);
        onClose();
      }, 250);
    }
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 relative space-y-6 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 dark:bg-slate-800 dark:text-red-400 mx-auto flex items-center justify-center shadow-inner border border-red-200/60">
            <Lock className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200/60 dark:bg-slate-800 dark:text-red-400 font-extrabold text-[11px] uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
            Protected Hospital Console
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Sign In to {currentAccountConfig.portalName}
          </h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Authorized access for patients, physicians, and hospital administration.
          </p>
        </div>

        {/* Portal Role Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl text-xs font-bold">
          <button
            type="button"
            onClick={() => handleAutoFill('patient', false)}
            className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
              selectedRole === 'patient'
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm shadow-red-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span className="text-[11px] whitespace-nowrap">Patient (Om)</span>
          </button>

          <button
            type="button"
            onClick={() => handleAutoFill('doctor', false)}
            className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
              selectedRole === 'doctor'
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm shadow-red-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            <span className="text-[11px] whitespace-nowrap">Doctor (Rohan)</span>
          </button>

          <button
            type="button"
            onClick={() => handleAutoFill('reception', false)}
            className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
              selectedRole === 'reception'
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm shadow-red-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="text-[11px] whitespace-nowrap">Reception (Akash)</span>
          </button>

          <button
            type="button"
            onClick={() => handleAutoFill('admin', false)}
            className={`py-2 px-2 rounded-xl transition-all flex flex-col items-center gap-1 cursor-pointer ${
              selectedRole === 'admin'
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm shadow-red-500/20'
                : 'text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="text-[11px] whitespace-nowrap">Admin (Rohan)</span>
          </button>
        </div>

        {/* Selected Role Info Card */}
        <div className="p-3.5 rounded-2xl bg-red-50/50 dark:bg-slate-800 border border-red-100 dark:border-slate-700 flex items-center justify-between text-xs">
          <div>
            <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>Logging in as:</span>
              <span className="text-red-600 dark:text-red-400 font-black">{currentAccountConfig.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 border border-red-200/60 dark:bg-slate-700 dark:text-red-300 font-bold">
                {currentAccountConfig.badge}
              </span>
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">{currentAccountConfig.description}</p>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
              Username or Registered Email
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder={`e.g. ${currentAccountConfig.username} or ${currentAccountConfig.email}`}
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-hidden"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all outline-hidden"
              />
              <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 active:scale-[0.99] text-white font-extrabold text-sm shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Verifying Credentials...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Sign In to {currentAccountConfig.portalName}
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Demo Credentials Quick-Fill Section */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Instant Demo Quick-Logins (Indian Names)
            </span>
            <span className="text-[10px] text-slate-400">Click any card to auto-sign in</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Om (Patient) */}
            <div 
              onClick={() => handleAutoFill('patient', true)}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-red-500/50 bg-slate-50 dark:bg-slate-800/60 hover:bg-red-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Om Kulkarni</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Patient)</span>
                </p>
                <p className="text-[11px] text-slate-500 font-mono">om / om123</p>
              </div>
              <span className="text-[11px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Sign in →
              </span>
            </div>

            {/* Dr. Rohan (Doctor) */}
            <div 
              onClick={() => handleAutoFill('doctor', true)}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-red-500/50 bg-slate-50 dark:bg-slate-800/60 hover:bg-red-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Dr. Rohan Nerkar</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Doctor)</span>
                </p>
                <p className="text-[11px] text-slate-500 font-mono">rohan / rohan123</p>
              </div>
              <span className="text-[11px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Sign in →
              </span>
            </div>

            {/* Akash Verma (Reception) */}
            <div 
              onClick={() => handleAutoFill('reception', true)}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-red-500/50 bg-slate-50 dark:bg-slate-800/60 hover:bg-red-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Akash Verma</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Reception)</span>
                </p>
                <p className="text-[11px] text-slate-500 font-mono">akash / akash123</p>
              </div>
              <span className="text-[11px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Sign in →
              </span>
            </div>

            {/* Rohan Nerkar (Admin) */}
            <div 
              onClick={() => handleAutoFill('admin', true)}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-red-500/50 bg-slate-50 dark:bg-slate-800/60 hover:bg-red-50/50 dark:hover:bg-slate-800 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div>
                <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Rohan Nerkar</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Admin)</span>
                </p>
                <p className="text-[11px] text-slate-500 font-mono">admin / admin123</p>
              </div>
              <span className="text-[11px] font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Sign in →
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
