import React, { useState, useEffect } from 'react';
import { 
  X, 
  Smile, 
  Wind, 
  Play, 
  Sparkles, 
  Heart, 
  Laugh, 
  RefreshCw,
  CheckCircle2,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';
import { EmotionType } from '../types';
import { CHEER_UP_ITEMS } from '../data/cheerUp';
import { sound } from '../utils/audio';

interface CheerUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggeredEmotion?: EmotionType;
}

export const CheerUpModal: React.FC<CheerUpModalProps> = ({
  isOpen,
  onClose,
  triggeredEmotion = 'uzgun'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'breathing' | 'cartoons' | 'jokes' | 'affirmation'>('breathing');
  const [breathePhase, setBreathePhase] = useState<'Nefes Al' | 'Tut' | 'Yavaşça Ver' | 'Dinlen'>('Nefes Al');
  const [breatheCount, setBreatheCount] = useState<number>(4);
  const [breatheRunning, setBreatheRunning] = useState<boolean>(true);
  const [selectedJokeIndex, setSelectedJokeIndex] = useState<number>(0);

  // Breathing loop timer
  useEffect(() => {
    if (!isOpen || !breatheRunning || activeSubTab !== 'breathing') return;

    const interval = setInterval(() => {
      setBreatheCount(prev => {
        if (prev <= 1) {
          // Switch phase
          setBreathePhase(current => {
            if (current === 'Nefes Al') {
              sound.playTone(330, 'sine', 0.8, 0.1);
              return 'Tut';
            }
            if (current === 'Tut') {
              sound.playTone(392, 'sine', 0.8, 0.1);
              return 'Yavaşça Ver';
            }
            if (current === 'Yavaşça Ver') {
              sound.playTone(261.6, 'sine', 0.8, 0.1);
              return 'Dinlen';
            }
            sound.playCalmZenBell();
            return 'Nefes Al';
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, breatheRunning, activeSubTab]);

  if (!isOpen) return null;

  const jokes = CHEER_UP_ITEMS.filter(item => item.type === 'joke');
  const cartoonsAndVideos = CHEER_UP_ITEMS.filter(item => item.type === 'cartoon' || item.type === 'video');
  const affirmations = CHEER_UP_ITEMS.filter(item => item.type === 'affirmation');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-700 via-orange-700 to-stone-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-xs">
              🌈
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl">
                Moralini Yükselt & Rahatla
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 font-medium">
                Zor duygular geçicidir. Kendine 2 dakika ayırıp rahatlayalım mı? 💖
              </p>
            </div>
          </div>
          <button
            id="close-cheer-up-modal-btn"
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex items-center gap-1.5 p-2.5 bg-stone-50 border-b border-stone-200 overflow-x-auto no-scrollbar">
          <button
            id="cheer-tab-breathing"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('breathing');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'breathing'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Nefes Balonu</span>
          </button>

          <button
            id="cheer-tab-cartoons"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('cartoons');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'cartoons'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Play className="w-4 h-4" />
            <span>Komik Karikatür & Video</span>
          </button>

          <button
            id="cheer-tab-jokes"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('jokes');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'jokes'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Laugh className="w-4 h-4" />
            <span>Neşeli Fıkralar</span>
          </button>

          <button
            id="cheer-tab-affirmation"
            onClick={() => {
              sound.playPop();
              setActiveSubTab('affirmation');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'affirmation'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Süper Güç Kartı</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: 3D Breathing Orb Exercise */}
          {activeSubTab === 'breathing' && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-4">
              <div className="space-y-1">
                <h4 className="font-heading font-extrabold text-xl text-stone-800">
                  4-4-4 Sakinleşme Nefesi
                </h4>
                <p className="text-xs sm:text-sm text-stone-500 max-w-md">
                  Balon büyürken burnundan derin bir nefes al, tepeye ulaştığında tut, küçülürken ağzından sakince üfle.
                </p>
              </div>

              {/* Animated Breathing Bubble Sphere */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
                {/* Background pulse rings */}
                <div className={`absolute inset-0 rounded-full bg-amber-100 opacity-60 ${
                  breathePhase === 'Nefes Al' ? 'scale-115 transition-transform duration-4000' : 'scale-90 transition-transform duration-4000'
                }`} />
                <div className={`absolute inset-4 rounded-full bg-amber-200/50 ${
                  breathePhase === 'Nefes Al' ? 'scale-110 transition-transform duration-4000' : 'scale-85 transition-transform duration-4000'
                }`} />

                {/* Central gradient sphere */}
                <div 
                  className={`w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 shadow-xl flex flex-col items-center justify-center text-white transition-all duration-1000 ${
                    breathePhase === 'Nefes Al' 
                      ? 'scale-110 shadow-amber-300/80' 
                      : breathePhase === 'Yavaşça Ver' 
                      ? 'scale-90 shadow-orange-200/50' 
                      : 'scale-100'
                  }`}
                >
                  <span className="text-3xl font-black font-heading tracking-wider">
                    {breatheCount}
                  </span>
                  <span className="text-sm font-bold mt-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                    {breathePhase}
                  </span>
                </div>
              </div>

              {/* Pause/Resume button */}
              <button
                id="breathe-toggle-btn"
                onClick={() => setBreatheRunning(!breatheRunning)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors cursor-pointer"
              >
                {breatheRunning ? 'Durdur' : 'Yeniden Başlat'}
              </button>
            </div>
          )}

          {/* TAB 2: Funny Cartoons & Video Animations */}
          {activeSubTab === 'cartoons' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h4 className="font-heading font-extrabold text-lg text-stone-800">
                  Gülümseten Sevimli Dostlar & Karikatürler 🎬
                </h4>
                <p className="text-xs text-stone-500">
                  Gülümsemek beyninde mutluluk hormonlarını anında harekete geçirir!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cartoonsAndVideos.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-200 space-y-3 hover:shadow-xs transition-all"
                  >
                    <div className="relative rounded-xl overflow-hidden h-36 bg-stone-200">
                      <img
                        src={item.url}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                        <span className="text-xs font-bold text-white flex items-center gap-1">
                          <Play className="w-3.5 h-3.5 text-amber-400" />
                          <span>İzle / Gülümse</span>
                        </span>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-xs sm:text-sm text-stone-800">
                        {item.title}
                      </h5>
                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Cheerful Jokes */}
          {activeSubTab === 'jokes' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-3xl mx-auto shadow-xs">
                😂
              </div>

              <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 max-w-lg mx-auto space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  {jokes[selectedJokeIndex]?.title || 'Günün Fıkrası'}
                </span>
                <p className="text-base sm:text-lg font-bold text-stone-800 whitespace-pre-line leading-relaxed">
                  {jokes[selectedJokeIndex]?.description}
                </p>
              </div>

              <button
                id="next-joke-btn"
                onClick={() => {
                  sound.playPop();
                  setSelectedJokeIndex((selectedJokeIndex + 1) % jokes.length);
                }}
                className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 shadow-md shadow-stone-300 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Başka Bir Fıkra Anlat!</span>
              </button>
            </div>
          )}

          {/* TAB 4: Positive Affirmations */}
          {activeSubTab === 'affirmation' && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-3xl mx-auto shadow-xs">
                🌟
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 max-w-lg mx-auto space-y-3 shadow-xs">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  {affirmations[0]?.title}
                </span>
                <p className="text-base sm:text-lg font-bold text-stone-800 leading-relaxed">
                  {affirmations[0]?.description}
                </p>
                <p className="text-xs text-amber-800 font-semibold pt-2">
                  "Bugün karşılaştığım her zorluk beni daha güçlü ve bilge yapıyor." 💫
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            Unutma: Zor duygular hissettiğinde bir büyüğünle veya rehberlik öğretmeninle konuşabilirsin.
          </p>
          <button
            id="close-cheer-up-footer-btn"
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-2 text-xs font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-all cursor-pointer"
          >
            Kendimi Daha İyi Hissediyorum ✨
          </button>
        </div>

      </div>
    </div>
  );
};
