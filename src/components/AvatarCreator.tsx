import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  Check, 
  Palette, 
  Smile, 
  Award,
  Crown,
  Heart
} from 'lucide-react';
import { AvatarConfig } from '../types';
import { AvatarIllustration } from './AvatarIllustration';
import { sound } from '../utils/audio';

interface AvatarCreatorProps {
  avatar: AvatarConfig;
  onSaveAvatar: (newAvatar: AvatarConfig) => void;
}

export const AvatarCreator: React.FC<AvatarCreatorProps> = ({ avatar, onSaveAvatar }) => {
  const [config, setConfig] = useState<AvatarConfig>(avatar);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const skinTones = [
    { color: '#fed7aa', label: 'Açık' },
    { color: '#fdba74', label: 'Buğday' },
    { color: '#fb923c', label: 'Güneş' },
    { color: '#d97706', label: 'Bronz' },
    { color: '#92400e', label: 'Koyu' }
  ];

  const outfitColors = [
    { color: '#38bdf8', label: 'Gökyüzü Mavisi' },
    { color: '#f43f5e', label: 'Gül Pembesi' },
    { color: '#10b981', label: 'Zümrüt Yeşili' },
    { color: '#f59e0b', label: 'Güneş Sarısı' },
    { color: '#8b5cf6', label: 'Mor Gece' },
    { color: '#0f172a', label: 'Gece Mavisi' }
  ];

  const hairStyles: { id: AvatarConfig['hairStyle']; label: string; icon: string }[] = [
    { id: 'fluffy', label: 'Yumuşak', icon: '👦' },
    { id: 'spiky', label: 'Diken', icon: '⚡' },
    { id: 'curls', label: 'Kıvırcık', icon: '🌀' },
    { id: 'cap', label: 'Şapkalı', icon: '🧢' },
    { id: 'crown', label: 'Taçlı', icon: '👑' },
    { id: 'headphones', label: 'Kulaklıklı', icon: '🎧' }
  ];

  const accessories: { id: AvatarConfig['accessory']; label: string; icon: string }[] = [
    { id: 'none', label: 'Sade', icon: '✨' },
    { id: 'glasses', label: 'Gözlük', icon: '👓' },
    { id: 'star', label: 'Yıldız Rozeti', icon: '⭐' },
    { id: 'heart', label: 'Sevgi Kalbi', icon: '💖' },
    { id: 'badge', label: 'Süper Rozet', icon: '🎖️' }
  ];

  const companionPets: { id: AvatarConfig['companionPet']; label: string; icon: string }[] = [
    { id: 'bunny', label: 'Tavşancık', icon: '🐰' },
    { id: 'cat', label: 'Mırnav Kedi', icon: '🐱' },
    { id: 'star', label: 'Işıltılı Yıldız', icon: '🌟' }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAvatar(config);
    sound.playSuccessFanfare();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
            🎨
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
              Duygu Arkadaşım & Karakterim
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Kendine özgü bir avatar tasarla! Uygulama boyunca sana eşlik etsin.
            </p>
          </div>
        </div>
      </div>

      {/* Main Designer Grid */}
      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Avatar Live Preview Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col items-center justify-center text-center space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Canlı Önizleme
            </span>
            <h3 className="font-heading font-extrabold text-xl text-stone-800">
              {config.name || 'İsimsiz Kahraman'}
            </h3>
          </div>

          {/* Big Interactive Avatar Stage */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl bg-[#FDFBF7] border border-stone-200 flex items-center justify-center shadow-inner">
            <AvatarIllustration config={config} size="xl" animate={true} />
          </div>

          {/* Avatar Name Input */}
          <div className="w-full space-y-1.5 text-left">
            <label htmlFor="avatar-name" className="text-xs font-bold text-stone-700">
              Karakterinin / Senin Adın:
            </label>
            <input
              id="avatar-name"
              type="text"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 text-stone-800 font-bold"
              placeholder="Örn: Deniz, Zeynep..."
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            id="save-avatar-btn"
            className="w-full py-3.5 px-6 rounded-2xl font-heading font-extrabold text-sm sm:text-base text-white bg-stone-900 hover:bg-stone-800 shadow-md shadow-stone-300 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span>Karakter Güncellendi! ✨</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Karakterimi Kaydet</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Customization Controls */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-6">
          
          {/* 1. Hair Style */}
          <div className="space-y-2.5">
            <label className="text-xs sm:text-sm font-extrabold text-stone-800 flex items-center gap-1.5">
              <span>💇</span>
              <span>Saç / Başlık Stili</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {hairStyles.map((item) => {
                const isSelected = config.hairStyle === item.id;
                return (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => {
                      sound.playPop();
                      setConfig({ ...config, hairStyle: item.id });
                    }}
                    className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-xs scale-102'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Skin Tone */}
          <div className="space-y-2.5">
            <label className="text-xs sm:text-sm font-extrabold text-stone-800 flex items-center gap-1.5">
              <span>🎨</span>
              <span>Ten Tonu</span>
            </label>
            <div className="flex items-center gap-2.5">
              {skinTones.map((tone, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    sound.playPop();
                    setConfig({ ...config, faceColor: tone.color });
                  }}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                    config.faceColor === tone.color
                      ? 'border-stone-900 scale-115 shadow-xs ring-2 ring-amber-300'
                      : 'border-white shadow-2xs hover:scale-105'
                  }`}
                  style={{ backgroundColor: tone.color }}
                  title={tone.label}
                >
                  {config.faceColor === tone.color && (
                    <Check className="w-4 h-4 text-stone-800 drop-shadow-xs" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Outfit Color */}
          <div className="space-y-2.5">
            <label className="text-xs sm:text-sm font-extrabold text-stone-800 flex items-center gap-1.5">
              <span>👕</span>
              <span>Kıyafet Rengi</span>
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              {outfitColors.map((outfit, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => {
                    sound.playPop();
                    setConfig({ ...config, outfitColor: outfit.color });
                  }}
                  className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer ${
                    config.outfitColor === outfit.color
                      ? 'border-stone-900 scale-115 shadow-xs ring-2 ring-amber-300'
                      : 'border-white shadow-2xs hover:scale-105'
                  }`}
                  style={{ backgroundColor: outfit.color }}
                  title={outfit.label}
                >
                  {config.outfitColor === outfit.color && (
                    <Check className="w-4 h-4 text-white drop-shadow-xs" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Accessories */}
          <div className="space-y-2.5">
            <label className="text-xs sm:text-sm font-extrabold text-stone-800 flex items-center gap-1.5">
              <span>⭐</span>
              <span>Aksesuar & Rozet</span>
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {accessories.map((acc) => {
                const isSelected = config.accessory === acc.id;
                return (
                  <button
                    type="button"
                    key={acc.id}
                    onClick={() => {
                      sound.playPop();
                      setConfig({ ...config, accessory: acc.id });
                    }}
                    className={`p-2.5 rounded-2xl border text-[11px] font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-lg">{acc.icon}</span>
                    <span className="truncate max-w-full">{acc.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Companion Pet */}
          <div className="space-y-2.5">
            <label className="text-xs sm:text-sm font-extrabold text-stone-800 flex items-center gap-1.5">
              <span>🐾</span>
              <span>Yanındaki Minik Dostun</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {companionPets.map((pet) => {
                const isSelected = config.companionPet === pet.id;
                return (
                  <button
                    type="button"
                    key={pet.id}
                    onClick={() => {
                      sound.playPop();
                      setConfig({ ...config, companionPet: pet.id });
                    }}
                    className={`p-2.5 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50 border-amber-600 text-amber-950 shadow-xs'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-xl">{pet.icon}</span>
                    <span>{pet.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </form>
    </div>
  );
};
