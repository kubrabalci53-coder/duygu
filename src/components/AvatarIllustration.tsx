import React from 'react';
import { AvatarConfig, EmotionType } from '../types';

interface AvatarProps {
  config: AvatarConfig;
  currentEmotion?: EmotionType;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export const AvatarIllustration: React.FC<AvatarProps> = ({
  config,
  currentEmotion = 'mutlu',
  size = 'md',
  className = '',
  animate = true
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36'
  };

  const getEyeExpression = () => {
    switch (currentEmotion) {
      case 'mutlu':
      case 'heyecanli':
        return (
          <>
            <path d="M 32 44 Q 38 38 44 44" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 56 44 Q 62 38 68 44" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        );
      case 'uzgun':
      case 'yalniz':
        return (
          <>
            <circle cx="38" cy="44" r="4" fill="#1e293b" />
            <circle cx="62" cy="44" r="4" fill="#1e293b" />
            <path d="M 35 48 Q 36 54 38 52" stroke="#38bdf8" strokeWidth="2.5" fill="#38bdf8" />
          </>
        );
      case 'ofkeli':
        return (
          <>
            <path d="M 32 39 L 44 44" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" />
            <path d="M 68 39 L 56 44" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="38" cy="46" r="3" fill="#991b1b" />
            <circle cx="62" cy="46" r="3" fill="#991b1b" />
          </>
        );
      case 'korkmus':
        return (
          <>
            <circle cx="38" cy="42" r="5" fill="#1e293b" />
            <circle cx="62" cy="42" r="5" fill="#1e293b" />
            <circle cx="36" cy="40" r="1.5" fill="#ffffff" />
            <circle cx="60" cy="40" r="1.5" fill="#ffffff" />
          </>
        );
      case 'huzurlu':
        return (
          <>
            <path d="M 32 43 Q 38 47 44 43" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 56 43 Q 62 47 68 43" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        );
      default: // karisik
        return (
          <>
            <circle cx="38" cy="44" r="4" fill="#1e293b" />
            <path d="M 56 42 Q 62 46 68 42" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />
          </>
        );
    }
  };

  const getMouthExpression = () => {
    switch (currentEmotion) {
      case 'mutlu':
      case 'heyecanli':
        return <path d="M 38 56 Q 50 68 62 56" stroke="#1e293b" strokeWidth="3.5" strokeLinecap="round" fill="#f43f5e" />;
      case 'uzgun':
      case 'yalniz':
        return <path d="M 40 62 Q 50 54 60 62" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />;
      case 'ofkeli':
        return <path d="M 40 60 Q 50 56 60 60" stroke="#991b1b" strokeWidth="3.5" strokeLinecap="round" fill="none" />;
      case 'korkmus':
        return <ellipse cx="50" cy="58" rx="5" ry="6" fill="#1e293b" />;
      case 'huzurlu':
        return <path d="M 42 57 Q 50 63 58 57" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />;
      default: // karisik
        return <path d="M 40 59 Q 45 56 50 59 T 60 59" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" fill="none" />;
    }
  };

  const getCheekBlush = () => {
    if (currentEmotion === 'mutlu' || currentEmotion === 'heyecanli' || currentEmotion === 'huzurlu') {
      return (
        <>
          <circle cx="28" cy="52" r="5" fill="#fda4af" opacity="0.6" />
          <circle cx="72" cy="52" r="5" fill="#fda4af" opacity="0.6" />
        </>
      );
    }
    if (currentEmotion === 'ofkeli') {
      return (
        <>
          <circle cx="28" cy="52" r="6" fill="#f87171" opacity="0.7" />
          <circle cx="72" cy="52" r="6" fill="#f87171" opacity="0.7" />
        </>
      );
    }
    return null;
  };

  const getHairStyle = () => {
    switch (config.hairStyle) {
      case 'spiky':
        return (
          <path
            d="M 22 35 Q 26 12 38 18 Q 50 8 62 18 Q 74 12 78 35 Q 60 22 22 35"
            fill="#78350f"
          />
        );
      case 'curls':
        return (
          <path
            d="M 20 38 C 15 20, 35 10, 50 12 C 65 10, 85 20, 80 38 C 88 45, 82 55, 78 50 C 65 30, 35 30, 22 50 C 18 55, 12 45, 20 38 Z"
            fill="#451a03"
          />
        );
      case 'crown':
        return (
          <>
            <path d="M 24 32 Q 50 20 76 32 Z" fill="#b45309" />
            <polygon points="35,18 42,26 50,15 58,26 65,18 62,30 38,30" fill="#facc15" stroke="#eab308" strokeWidth="1.5" />
            <circle cx="50" cy="18" r="2" fill="#ef4444" />
          </>
        );
      case 'cap':
        return (
          <>
            <path d="M 24 35 C 24 15 76 15 76 35 Z" fill="#3b82f6" />
            <ellipse cx="62" cy="34" rx="24" ry="6" fill="#2563eb" />
          </>
        );
      case 'headphones':
        return (
          <>
            <path d="M 26 35 C 26 18 74 18 74 35 Z" fill="#374151" />
            <path d="M 18 40 C 18 10 82 10 82 40" stroke="#4b5563" strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="14" y="36" width="8" height="18" rx="4" fill="#06b6d4" />
            <rect x="78" y="36" width="8" height="18" rx="4" fill="#06b6d4" />
          </>
        );
      default: // fluffy
        return (
          <path
            d="M 22 36 C 20 18, 40 12, 50 14 C 60 12, 80 18, 78 36 C 70 24, 30 24, 22 36 Z"
            fill="#92400e"
          />
        );
    }
  };

  const getAccessory = () => {
    switch (config.accessory) {
      case 'glasses':
        return (
          <>
            <circle cx="38" cy="44" r="9" stroke="#0284c7" strokeWidth="2.5" fill="none" />
            <circle cx="62" cy="44" r="9" stroke="#0284c7" strokeWidth="2.5" fill="none" />
            <path d="M 47 44 L 53 44" stroke="#0284c7" strokeWidth="2.5" />
          </>
        );
      case 'star':
        return (
          <path
            d="M 74 24 L 76 29 L 81 30 L 77 34 L 78 39 L 74 36 L 70 39 L 71 34 L 67 30 L 72 29 Z"
            fill="#facc15"
            stroke="#eab308"
            strokeWidth="1"
          />
        );
      case 'heart':
        return (
          <path
            d="M 75 28 A 3 3 0 0 0 72 25 A 3 3 0 0 0 69 28 Q 69 32 72 35 L 72 35 Q 75 32 75 28 Z"
            fill="#f43f5e"
          />
        );
      case 'badge':
        return (
          <circle cx="72" cy="74" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
        );
      default:
        return null;
    }
  };

  const getPet = () => {
    switch (config.companionPet) {
      case 'cat':
        return (
          <g transform="translate(68, 62) scale(0.35)">
            <circle cx="20" cy="20" r="16" fill="#fb923c" />
            <polygon points="6,12 12,2 18,10" fill="#ea580c" />
            <polygon points="22,10 28,2 34,12" fill="#ea580c" />
            <circle cx="14" cy="18" r="2.5" fill="#1e293b" />
            <circle cx="26" cy="18" r="2.5" fill="#1e293b" />
            <path d="M 17 24 Q 20 27 23 24" stroke="#1e293b" strokeWidth="2" fill="none" />
          </g>
        );
      case 'bunny':
        return (
          <g transform="translate(68, 60) scale(0.35)">
            <ellipse cx="14" cy="6" rx="4" ry="10" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
            <ellipse cx="26" cy="6" rx="4" ry="10" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1" />
            <circle cx="20" cy="20" r="14" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
            <circle cx="16" cy="18" r="2" fill="#1e293b" />
            <circle cx="24" cy="18" r="2" fill="#1e293b" />
            <circle cx="20" cy="22" r="2" fill="#f43f5e" />
          </g>
        );
      case 'star':
      default:
        return (
          <g transform="translate(68, 64) scale(0.35)">
            <circle cx="20" cy="20" r="14" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
            <circle cx="15" cy="18" r="2" fill="#1e293b" />
            <circle cx="25" cy="18" r="2" fill="#1e293b" />
            <path d="M 16 23 Q 20 27 24 23" stroke="#1e293b" strokeWidth="2" fill="none" />
          </g>
        );
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${animate ? 'animate-float' : ''} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-sm select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Aura/Glow */}
        <circle cx="50" cy="50" r="48" fill={config.outfitColor} opacity="0.12" />

        {/* Body/Outfit */}
        <path
          d="M 28 72 C 28 62, 72 62, 72 72 L 78 96 C 78 98, 22 98, 22 96 Z"
          fill={config.outfitColor || '#38bdf8'}
        />
        {/* Collar */}
        <path d="M 40 70 L 50 78 L 60 70" stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round" />

        {/* Head */}
        <circle cx="50" cy="48" r="28" fill={config.faceColor || '#fed7aa'} />

        {/* Hair Back/Front */}
        {getHairStyle()}

        {/* Cheeks */}
        {getCheekBlush()}

        {/* Eyes */}
        {getEyeExpression()}

        {/* Mouth */}
        {getMouthExpression()}

        {/* Accessory */}
        {getAccessory()}

        {/* Pet Companion */}
        {getPet()}
      </svg>
    </div>
  );
};
