import React, { useState, useRef } from 'react';
import { Mail, Eye, EyeOff, X, Image as ImageIcon, Upload, Check, RefreshCw } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (email: string) => void;
}

// Default high-quality MHA North Block assets provided by user
const DEFAULT_BG_IMAGE = '/mha-bg.jpeg'; // MHA North Block background
const DEFAULT_SIDE_IMAGE = '/ga.jpeg'; // MHA vertical portrait panel with Ashoka emblem

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Image customizer slots (allows user to easily plug in their uploaded background and side panel images)
  const [bgImage, setBgImage] = useState<string>(DEFAULT_BG_IMAGE);
  const [sideImage, setSideImage] = useState<string>(DEFAULT_SIDE_IMAGE);
  const [showImageCustomizer, setShowImageCustomizer] = useState(false);

  const bgInputRef = useRef<HTMLInputElement>(null);
  const sideInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your official email and password.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      if (onLoginSuccess) {
        onLoginSuccess(email);
      }
      setTimeout(() => {
        setLoginSuccess(false);
        onClose();
      }, 1200);
    }, 900);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'bg' | 'side') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          if (target === 'bg') {
            setBgImage(event.target.result as string);
          } else {
            setSideImage(event.target.result as string);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImages = () => {
    setBgImage(DEFAULT_BG_IMAGE);
    setSideImage(DEFAULT_SIDE_IMAGE);
  };

  return (
    <div
      id="login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300"
    >
      {/* 1. Cinematic Raisina Hill / Ministry Background with soft depth-of-field blur */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url(${bgImage})`,
          filter: 'blur(4px) brightness(0.92)',
          transform: 'scale(1.05)',
        }}
      />
      {/* Dark & atmospheric tint overlay */}
      <div className="absolute inset-0 bg-slate-900/35 backdrop-blur-[3px]" />

      {/* Top Floating Controls: Image Slots Customizer & Close Button */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowImageCustomizer(!showImageCustomizer)}
          className="px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-semibold shadow-md flex items-center gap-1.5 transition cursor-pointer backdrop-blur-sm"
          title="Customize Background & Side Panel Images"
        >
          <ImageIcon className="w-3.5 h-3.5 text-[#1e3a8a]" />
          <span>{showImageCustomizer ? 'Close Image Slots' : 'Image Slots'}</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center shadow-md transition cursor-pointer backdrop-blur-sm"
          title="Close Login Window"
          aria-label="Close Login Modal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Image Slots Customizer Drawer (Allows user to provide their images directly) */}
      {showImageCustomizer && (
        <div className="absolute top-16 right-4 z-20 w-80 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 text-xs text-slate-800 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h4 className="font-bold font-serif text-slate-900">Custom Image Slots</h4>
            <button
              type="button"
              onClick={handleResetImages}
              className="text-2xs text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Defaults</span>
            </button>
          </div>

          {/* Slot 1: Background Image */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">1. Background Image (Raisina Hill / Landscape)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={bgImage}
                onChange={(e) => setBgImage(e.target.value)}
                placeholder="Paste background image URL..."
                className="flex-1 px-2.5 py-1.5 text-2xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => bgInputRef.current?.click()}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 text-2xs font-semibold cursor-pointer border border-slate-300"
                title="Upload file"
              >
                <Upload className="w-3 h-3" />
                <span>Upload</span>
              </button>
              <input
                type="file"
                ref={bgInputRef}
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'bg')}
                className="hidden"
              />
            </div>
          </div>

          {/* Slot 2: Side Panel Image */}
          <div className="space-y-1">
            <label className="font-semibold text-slate-700 block">2. Side Panel Image (Ministry of Home Affairs)</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={sideImage}
                onChange={(e) => setSideImage(e.target.value)}
                placeholder="Paste side panel image URL..."
                className="flex-1 px-2.5 py-1.5 text-2xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => sideInputRef.current?.click()}
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1 text-2xs font-semibold cursor-pointer border border-slate-300"
                title="Upload file"
              >
                <Upload className="w-3 h-3" />
                <span>Upload</span>
              </button>
              <input
                type="file"
                ref={sideInputRef}
                accept="image/*"
                onChange={(e) => handleFileUpload(e, 'side')}
                className="hidden"
              />
            </div>
          </div>

          <p className="text-3xs text-slate-500 italic pt-1 border-t border-slate-100">
            Tip: You can upload your local JPEG/PNG files directly or paste web URLs.
          </p>
        </div>
      )}

      {/* 2. Central Floating Card (Exact Match to IMG_2837.JPEG) */}
      <div
        id="login-card-container"
        className="relative z-10 w-full max-w-4xl bg-white rounded-3xl sm:rounded-[32px] shadow-2xl overflow-hidden border-[3px] border-blue-600/90 ring-4 ring-white/80 transition-all duration-300"
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT COLUMN: Clean Authentication Form ("Welcome home") */}
          <div className="p-8 sm:p-12 flex flex-col justify-center bg-white border-b md:border-b-0 md:border-r border-red-600/40 relative">
            {/* Top House Icon */}
            <div className="flex flex-col items-center text-center space-y-1.5 mb-6 sm:mb-8">
              <div className="text-2xl sm:text-3xl filter drop-shadow-xs select-none">
                🏠
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
                Welcome home
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal">
                Please enter your details.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs text-center font-medium">
                {errorMessage}
              </div>
            )}

            {/* Success Message */}
            {loginSuccess && (
              <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs text-center font-semibold flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Verification successful! Access granted.</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <input
                  id="login-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
                  required
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
              </div>

              {/* Password Input */}
              <div className="relative">
                <input
                  id="login-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Remember for 30 days & Forgot Password */}
              <div className="flex items-center justify-between text-2xs sm:text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input
                    id="remember-me-checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>Remember for 30 days</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your registered official address.')}
                  className="text-slate-400 hover:text-blue-600 font-medium transition cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Deep Navy Blue Login Button (matching reference image) */}
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl sm:rounded-2xl bg-[#172554] hover:bg-[#1e3a8a] active:scale-[0.99] text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>

            {/* "or" Divider */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-3 text-2xs text-slate-400 lowercase">
                or
              </span>
            </div>

            {/* Social / Identity SSO Icons (Apple, Google, Facebook in clean circular pills) */}
            <div className="flex items-center justify-center gap-3">
              {/* Apple */}
              <button
                type="button"
                onClick={() => alert('Apple ID verification initiated')}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs cursor-pointer active:scale-95"
                title="Sign in with Apple"
              >
                {/* Clean Apple SVG */}
                <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.43-6.19-9.36-10.9-19.8-14.13-31.33-3.23-11.53-4.85-22.18-4.85-31.95 0-14.13 3.69-25.96 11.06-35.49 7.37-9.52 16.5-14.38 27.4-14.58 4.79 0 10.15 1.25 16.08 3.75 5.93 2.5 9.87 3.78 11.82 3.84 1.74 0 5.86-1.39 12.37-4.16 6.51-2.77 12.08-3.97 16.71-3.6 12.39.76 22.36 5.17 29.91 13.23-10.87 6.64-16.19 15.66-15.96 27.07.22 8.92 3.64 16.48 10.27 22.68 6.63 6.2 14.52 9.77 23.67 10.7-2.61 7.83-5.87 15.65-9.78 23.47zM119.22 31.84c0-7.07 2.61-13.72 7.83-19.95 5.22-6.23 11.75-10.18 19.59-11.89.65 3.04.87 5.76.65 8.16-.65 7.18-3.48 13.84-8.49 19.97-5.01 6.13-11.43 10.02-19.26 11.67-.32-2.61-.32-5.26-.32-7.96z" />
                </svg>
              </button>

              {/* Google */}
              <button
                type="button"
                onClick={() => alert('Google Identity SSO initiated')}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-800 hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs cursor-pointer active:scale-95"
                title="Sign in with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={() => alert('Official Portal ID verification initiated')}
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-[#1877F2] hover:bg-slate-50 hover:border-slate-300 transition shadow-2xs cursor-pointer active:scale-95"
                title="Sign in with Portal ID"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Ministry of Home Affairs Thematic Panel (Exact Match to IMG_2837.JPEG) */}
          <div className="relative min-h-[360px] sm:min-h-[460px] flex flex-col items-center justify-center p-8 overflow-hidden bg-slate-900">
            {/* Background Building Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-500"
              style={{
                backgroundImage: `url(${sideImage})`,
              }}
            />
            {/* Subtle dark gradient overlay to ensure the golden emblem and text pop */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/35" />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-xs">
              {/* Golden 3D Ashoka Lion Capital Emblem with soft glow */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-xl animate-pulse" />
                <img
                  src="/emblem.png"
                  alt="State Emblem of India"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] brightness-110 contrast-110"
                  onError={(e) => {
                    // Fallback to SVG representation if file not loaded
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = document.getElementById('mha-emblem-svg-fallback');
                    if (fallback) fallback.style.display = 'block';
                  }}
                />

                {/* SVG Fallback */}
                <div id="mha-emblem-svg-fallback" className="hidden w-24 h-24 text-amber-400">
                  <svg viewBox="0 0 100 120" className="w-full h-full fill-current">
                    <circle cx="50" cy="20" r="8" />
                    <rect x="35" y="32" width="30" height="35" rx="3" />
                    <rect x="25" y="70" width="50" height="10" rx="2" />
                    <circle cx="50" cy="75" r="4" fill="#06038D" />
                  </svg>
                </div>
              </div>

              {/* Classical Bronze/Gold Serif Typography: "MINISTRY OF HOME AFFAIRS" */}
              <div className="space-y-0.5 pt-2">
                <h3
                  className="text-xl sm:text-2xl font-extrabold uppercase font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0D0] via-[#E2B773] to-[#B8860B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                >
                  MINISTRY OF
                </h3>
                <h3
                  className="text-2xl sm:text-3xl font-extrabold uppercase font-serif tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#FFF0D0] via-[#E2B773] to-[#B8860B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                >
                  HOME AFFAIRS
                </h3>
              </div>

              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pt-1" />

              <p className="text-3xs sm:text-2xs text-amber-200/90 tracking-wider uppercase font-medium">
                Government of India
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
