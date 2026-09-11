import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  Camera,
  FileCheck,
  User,
  Shield,
  Sparkles,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Eye,
  Trash2,
} from 'lucide-react';
import { SAMPLE_DOCUMENT_PRESETS, SampleDocPreset } from '../data/sampleDocuments';
import { VerificationRequest } from '../types';
import { RotatingEmblemLogo } from './RotatingEmblemLogo';

interface VerificationLabProps {
  onRunVerification: (request: VerificationRequest) => void;
  isVerifying: boolean;
  activeStep: number;
}

const PIPELINE_STEPS = [
  { id: 1, label: 'Document Ingestion & Image Quality', detail: 'Resolution, perspective deskew, lighting analysis' },
  { id: 2, label: 'Multimodal OCR & Field Extraction', detail: 'Extracting VIZ, MRZ, dates, and identifiers' },
  { id: 3, label: 'Cross-Field & Checksum Verification', detail: 'ICAO 9303 check digits & chronological logic' },
  { id: 4, label: 'Forensic Tampering & Splicing Analysis', detail: 'Font anomaly, edge splicing, guilloche disruption' },
  { id: 5, label: '1:1 Biometric Facial Comparison', detail: 'Cosine similarity between portrait & live selfie' },
  { id: 6, label: 'Explainable Risk Assessment & Audit Signing', detail: 'Synthesizing verdict, reasons & SHA-256 fingerprint' },
];

export const VerificationLab: React.FC<VerificationLabProps> = ({
  onRunVerification,
  isVerifying,
  activeStep,
}) => {
  const [docImage, setDocImage] = useState<string>('');
  const [docType, setDocType] = useState<string>('Auto-Detect');
  const [selfieImage, setSelfieImage] = useState<string>('');
  const [applicantName, setApplicantName] = useState<string>('');
  const [docReference, setDocReference] = useState<string>('');
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraMode, setCameraMode] = useState<'doc' | 'selfie'>('doc');
  const [dragActive, setDragActive] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const selfieInputRef = useRef<HTMLInputElement | null>(null);

  // Load a preset
  const handleLoadPreset = (preset: SampleDocPreset) => {
    setDocImage(preset.documentImage);
    setSelfieImage(preset.selfieImage);
    setDocType(preset.documentType);
    if (preset.id.includes('authentic')) {
      setApplicantName('ALEXANDER DOE');
      setDocReference('PAS-2023-8891');
    } else if (preset.id.includes('tampered')) {
      setApplicantName('MARCUS STERLING');
      setDocReference('DL-CAL-7719');
    } else if (preset.id.includes('photoswap')) {
      setApplicantName('CONOR O\'BRIEN');
      setDocReference('NID-IRL-4491');
    } else {
      setApplicantName('ELENA ROSTOVA');
      setDocReference('PR-CAN-2204');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'doc' | 'selfie') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          if (target === 'doc') setDocImage(reader.result);
          else setSelfieImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setDocImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Webcam camera capture
  const startCamera = async (mode: 'doc' | 'selfie') => {
    setCameraMode(mode);
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: mode === 'selfie' ? 'user' : 'environment' },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Unable to access webcam:', err);
      alert('Camera access was not granted. Please upload an image file or choose a preset.');
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        if (cameraMode === 'doc') setDocImage(dataUrl);
        else setSelfieImage(dataUrl);
      }
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const handleExecute = () => {
    if (!docImage) return;
    onRunVerification({
      documentImage: docImage,
      documentType: docType,
      selfieImage: selfieImage || undefined,
      applicantName: applicantName || undefined,
      documentReference: docReference || undefined,
    });
  };

  const handleReset = () => {
    setDocImage('');
    setSelfieImage('');
    setApplicantName('');
    setDocReference('');
    setDocType('Auto-Detect');
  };

  return (
    <div className="w-full py-6 sm:py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-6">
      {/* Top action header with quick presets */}
      <div className="bg-white border border-orange-200/90 rounded-2xl p-4 sm:p-6 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-3xs font-mono font-bold uppercase tracking-wider text-[#E45D24] bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
                Step 1: Document &amp; Biometric Intake
              </span>
              <span className="text-3xs text-slate-500 font-mono">
                Multimodal Screening Pipeline
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 tracking-tight">
              Screen Identity Document For Tampering &amp; Fraud
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Upload an ID, passport, or visa. The AI pipeline will extract structured fields, verify MRZ checksums, detect typography anomalies &amp; splicing, and compare facial biometrics.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer border border-slate-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              id="execute-screening-btn"
              type="button"
              disabled={!docImage || isVerifying}
              onClick={handleExecute}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-md ${
                !docImage || isVerifying
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-gradient-to-r from-[#E45D24] via-[#ea6c3b] to-[#F28B57] hover:from-[#d54e17] hover:to-[#e47640] text-white shadow-orange-500/20 active:scale-98'
              }`}
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-200" />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4 text-amber-200" />
                  <span>Execute Forensic Screening</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Test Presets Pills */}
        <div className="pt-3 border-t border-orange-100 flex items-center gap-2 flex-wrap">
          <span className="text-2xs font-mono text-slate-600 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#E45D24]" />
            Quick Presets:
          </span>
          {SAMPLE_DOCUMENT_PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => handleLoadPreset(p)}
              className="px-2.5 py-1 rounded-lg text-3xs font-medium bg-[#FFFDF9] hover:bg-orange-50 text-slate-700 border border-orange-200 hover:border-[#E45D24] transition cursor-pointer flex items-center gap-1.5"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  p.expectedRisk === 'HIGH'
                    ? 'bg-red-500'
                    : p.expectedRisk === 'MEDIUM'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
              />
              <span>{p.name.split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Document Upload & Biometric Selfie Capture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Document Upload & Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white border border-orange-200/90 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#E45D24]" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Primary Identity Document
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="bg-white border border-slate-300 text-slate-800 text-xs rounded-lg px-2.5 py-1.5 font-mono focus:ring-1 focus:ring-orange-400 focus:border-[#E45D24] outline-hidden shadow-2xs"
                >
                  <option value="Auto-Detect">Auto-Detect Document Type</option>
                  <option value="Passport">Passport (ICAO 9303)</option>
                  <option value="Driving License">Driving License</option>
                  <option value="National ID Card">National ID Card</option>
                  <option value="Residence Permit">Residence Permit</option>
                </select>
              </div>
            </div>

            {/* Upload Area / Image Canvas */}
            {!docImage ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all flex flex-col items-center justify-center gap-3 cursor-pointer ${
                  dragActive
                    ? 'border-[#E45D24] bg-orange-50'
                    : 'border-orange-200/90 hover:border-[#E45D24] bg-[#FFFDF9]'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-100 border border-orange-300/80 flex items-center justify-center text-[#E45D24] shadow-xs">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Click to upload document or drag &amp; drop
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports high-resolution JPG, PNG, PDF scans (Passport, Driver&apos;s License, National ID)
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera('doc');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 shadow-2xs cursor-pointer"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-300" />
                    <span>Scan with Camera</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 max-h-[420px] flex items-center justify-center group">
                <img
                  src={docImage}
                  alt="Uploaded document for inspection"
                  className="max-h-[420px] w-full object-contain"
                />
                {/* Floating controls */}
                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDocImage('')}
                    className="p-2 rounded-lg bg-black/70 hover:bg-red-600 text-white text-xs backdrop-blur-xs transition cursor-pointer"
                    title="Remove image"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs px-3 py-1 rounded-md text-3xs font-mono text-amber-300 border border-amber-500/30">
                  Document Ready for Forensic Scanning
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => handleFileUpload(e, 'doc')}
            />

            {/* Document Metadata Fields (Optional context) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-3xs font-mono uppercase tracking-wider text-slate-600 block mb-1">
                  Applicant Legal Name (Optional Verification Benchmark)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ALEXANDER DOE"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 font-mono focus:border-[#E45D24] focus:ring-1 focus:ring-orange-300 outline-hidden"
                />
              </div>

              <div>
                <label className="text-3xs font-mono uppercase tracking-wider text-slate-600 block mb-1">
                  Internal Case / File Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g. CASE-2023-GUA-901"
                  value={docReference}
                  onChange={(e) => setDocReference(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder-slate-400 font-mono focus:border-[#E45D24] focus:ring-1 focus:ring-orange-300 outline-hidden"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 1:1 Face Biometric Comparison Intake (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-orange-200/90 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#E45D24]" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                    Live Face Biometrics
                  </h3>
                </div>
                <span className="text-3xs font-mono uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Optional 1:1 Match
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Provide a live selfie to perform facial landmark cross-verification with the document portrait.
              </p>

              {/* Selfie preview / upload area */}
              {!selfieImage ? (
                <div
                  onClick={() => selfieInputRef.current?.click()}
                  className="border border-dashed border-orange-300/90 hover:border-[#E45D24] rounded-xl p-6 text-center bg-[#FFFDF9] flex flex-col items-center justify-center gap-2 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-[#E45D24] group-hover:scale-105 transition-transform">
                    <User className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-slate-800">Upload Live Selfie</span>
                  <span className="text-3xs text-slate-500">JPG, PNG front-facing portrait</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera('selfie');
                    }}
                    className="mt-1 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-2xs font-semibold flex items-center gap-1 border border-slate-700 cursor-pointer"
                  >
                    <Camera className="w-3 h-3 text-amber-300" />
                    <span>Take Selfie</span>
                  </button>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 aspect-square flex items-center justify-center group">
                  <img
                    src={selfieImage}
                    alt="Applicant live selfie"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSelfieImage('')}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white text-xs transition cursor-pointer"
                    title="Remove selfie"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-xs px-2 py-1 rounded text-3xs font-mono text-emerald-400 text-center border border-slate-700">
                    Facial Geometry Locked
                  </div>
                </div>
              )}

              <input
                ref={selfieInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 'selfie')}
              />
            </div>

            {/* Privacy note */}
            <div className="p-3 bg-orange-50/70 rounded-xl border border-orange-200/80 space-y-1 text-3xs text-slate-600">
              <div className="flex items-center gap-1 text-slate-800 font-semibold font-mono">
                <Lock className="w-3 h-3 text-[#E45D24]" />
                <span>Zero-Retention Privacy Mode</span>
              </div>
              <p className="leading-snug">
                Biometric vectors are evaluated in-memory for mathematical comparison only and purged post-verification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Pipeline Progress (When verifying) */}
      {isVerifying && (
        <div className="bg-[#090e18] border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Skeleton Shimmer Wave Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/5 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-4 border-b border-slate-800">
            {/* 3D Rotating Emblem in Skeleton Mode */}
            <div className="flex items-center gap-5">
              <RotatingEmblemLogo
                size="md"
                speed="normal"
                showSkeletonRings={true}
                showPedestalShadow={true}
                showShimmer={true}
                subText="Forensic Core Active"
              />
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span className="text-3xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2.5 py-0.5 rounded border border-amber-800">
                    SKELETON PIPELINE ANALYSIS
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                  Autonomous Cryptographic Screening
                </h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Evaluating ICAO 9303 checksums, font micro-kerning, security fibers, and photo tamper vectors.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-3.5 py-1.5 rounded-lg border border-amber-800 flex items-center gap-2 shadow-sm">
                <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                <span>Stage 0{activeStep} of 06 In Progress</span>
              </span>
              <span className="text-3xs font-mono text-slate-400">
                Resolution: 300 DPI Substrate Matrix
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {PIPELINE_STEPS.map((step) => {
              const isPast = activeStep > step.id;
              const isCurrent = activeStep === step.id;

              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-amber-950/40 border-amber-400 text-white shadow-md'
                      : isPast
                      ? 'bg-slate-900/90 border-emerald-500/40 text-slate-300'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-3xs font-mono font-bold uppercase">
                      Stage 0{step.id}
                    </span>
                    {isPast ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isCurrent ? (
                      <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold font-sans line-clamp-1">{step.label}</h4>
                  <p className="text-3xs text-slate-400 line-clamp-1 mt-0.5">{step.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Webcam Modal if active */}
      {isCameraActive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white font-mono flex items-center gap-2">
                <Camera className="w-4 h-4 text-cyan-400" />
                <span>{cameraMode === 'doc' ? 'Capture Document Scan' : 'Capture Live Selfie'}</span>
              </h3>
              <button
                type="button"
                onClick={stopCamera}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                Close
              </button>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex items-center justify-center border border-slate-700">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              {/* Guidance frame */}
              <div className="absolute inset-6 border-2 border-dashed border-cyan-400/60 rounded-xl pointer-events-none" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-3xs text-slate-400">Position clearly inside the frame</span>
              <button
                type="button"
                onClick={capturePhoto}
                className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                Capture Frame
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
