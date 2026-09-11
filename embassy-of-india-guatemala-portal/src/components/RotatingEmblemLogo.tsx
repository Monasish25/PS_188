import React from 'react';

interface RotatingEmblemLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  speed?: 'slow' | 'normal' | 'fast';
  showSkeletonRings?: boolean;
  showPedestalShadow?: boolean;
  showShimmer?: boolean;
  className?: string;
  subText?: string;
}

export const RotatingEmblemLogo: React.FC<RotatingEmblemLogoProps> = ({
  size = 'lg',
  speed = 'normal',
  showSkeletonRings = true,
  showPedestalShadow = true,
  showShimmer = true,
  className = '',
  subText,
}) => {
  // Dimension definitions
  const dimensions = {
    xs: { container: 'w-12 h-14', img: 'w-10 h-12', ring: 'w-16 h-16', shadow: 'w-10 h-3' },
    sm: { container: 'w-16 h-20', img: 'w-14 h-18', ring: 'w-24 h-24', shadow: 'w-14 h-4' },
    md: { container: 'w-28 h-32', img: 'w-24 h-28', ring: 'w-36 h-36', shadow: 'w-24 h-6' },
    lg: { container: 'w-40 h-48', img: 'w-36 h-42', ring: 'w-52 h-52', shadow: 'w-36 h-8' },
    xl: { container: 'w-56 h-64', img: 'w-48 h-56', ring: 'w-72 h-72', shadow: 'w-48 h-10' },
  }[size];

  const speedClass =
    speed === 'slow'
      ? 'duration-[7000ms]'
      : speed === 'fast'
      ? 'duration-[2500ms]'
      : 'duration-[4500ms]';

  return (
    <div
      id="rotating-emblem-3d-wrapper"
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* 1. Holographic Orbital Skeleton Rings */}
      {showSkeletonRings && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Outer Gyro Ring */}
          <div
            className={`absolute ${dimensions.ring} rounded-full border border-amber-500/20 border-dashed animate-spin duration-[12000ms]`}
            style={{
              transform: 'rotateX(68deg) rotateY(12deg)',
            }}
          />
          {/* Middle Glowing Ring */}
          <div
            className={`absolute ${dimensions.ring} scale-90 rounded-full border border-cyan-400/25 animate-spin duration-[8000ms]`}
            style={{
              animationDirection: 'reverse',
              transform: 'rotateX(68deg) rotateY(-15deg)',
            }}
          />
          {/* Inner Accent Ring */}
          <div
            className={`absolute ${dimensions.ring} scale-75 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin duration-[5000ms]`}
            style={{
              transform: 'rotateX(72deg)',
            }}
          />
        </div>
      )}

      {/* 2. Central 3D Rotating Emblem Container */}
      <div
        className={`relative ${dimensions.container} flex items-center justify-center`}
        style={{ perspective: '1200px' }}
      >
        {/* Ambient Golden Radial Glow */}
        <div className="absolute w-full h-full rounded-full bg-radial from-amber-500/25 via-amber-600/10 to-transparent blur-xl pointer-events-none animate-pulse" />

        {/* 3D Rotating Element */}
        <div
          className={`relative ${dimensions.img} flex items-center justify-center animate-rotate-3d preserve-3d`}
          style={{
            animationDuration: speed === 'slow' ? '8s' : speed === 'fast' ? '3s' : '5s',
          }}
        >
          {/* Specular Glint Sweep (Skeleton Shimmer Effect) */}
          {showShimmer && (
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none z-30">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer" />
            </div>
          )}

          {/* Front Face: Ashoka Lion Capital (Prismatically highlighted) */}
          <div
            className="absolute inset-0 flex items-center justify-center backface-hidden z-20"
            style={{ transform: 'translateZ(6px)' }}
          >
            <img
              src="/emblem.png"
              alt="State Emblem of India"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_18px_rgba(217,119,6,0.45)] drop-shadow-[0_0_12px_rgba(245,158,11,0.35)]"
              onError={(e) => {
                // Fallback if /emblem.png is loading
                (e.currentTarget as HTMLImageElement).src =
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/512px-Emblem_of_India.svg.png';
              }}
            />
          </div>

          {/* Depth Extrusion Simulation Layer (Mid Layer) */}
          <div
            className="absolute inset-0 flex items-center justify-center opacity-70 filter brightness-75 sepia"
            style={{ transform: 'translateZ(0px) scale(0.98)' }}
          >
            <img
              src="/emblem.png"
              alt="Emblem Depth Mid"
              className="w-full h-full object-contain filter contrast-125"
            />
          </div>

          {/* Back Face: Mirrored Golden Ashoka Emblem */}
          <div
            className="absolute inset-0 flex items-center justify-center backface-hidden z-10"
            style={{
              transform: 'rotateY(180deg) translateZ(6px)',
            }}
          >
            <img
              src="/emblem.png"
              alt="State Emblem of India Reverse"
              className="w-full h-full object-contain filter drop-shadow-[0_10px_18px_rgba(217,119,6,0.45)] drop-shadow-[0_0_12px_rgba(245,158,11,0.35)] scale-x-[-1]"
            />
          </div>
        </div>
      </div>

      {/* 3. Pulsing Pedestal Reflection / Shadow */}
      {showPedestalShadow && (
        <div className="relative mt-2 flex flex-col items-center">
          {/* Circular Ground Shadow */}
          <div
            className={`${dimensions.shadow} rounded-full bg-amber-500/20 blur-md animate-pedestal`}
            style={{ transform: 'rotateX(75deg)' }}
          />
          {/* Concentric Base Ring */}
          <div
            className={`${dimensions.shadow} rounded-full border border-amber-500/40 opacity-40 scale-125`}
            style={{ transform: 'rotateX(75deg)' }}
          />
        </div>
      )}

      {/* 4. Optional Sub-Text */}
      {subText && (
        <div className="mt-3 text-center">
          <span className="text-3xs font-mono font-bold uppercase tracking-widest text-amber-400/90 bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-500/30">
            {subText}
          </span>
        </div>
      )}
    </div>
  );
};
