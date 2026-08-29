import React, { useState } from 'react';
import { 
  Play, 
  X, 
  Sparkles, 
  Film, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  RotateCcw,
  Smile,
  ExternalLink
} from 'lucide-react';
import { EmotionType, RecommendedVideo } from '../types';
import { EMOTIONS } from '../data/emotions';
import { RECOMMENDED_VIDEOS, getVideosForEmotion } from '../data/videoRecommendations';
import { sound } from '../utils/audio';

interface EmotionVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  emotion: EmotionType;
}

export const EmotionVideoModal: React.FC<EmotionVideoModalProps> = ({
  isOpen,
  onClose,
  emotion
}) => {
  const currentEmotionObj = EMOTIONS.find(e => e.id === emotion) || EMOTIONS[0];
  const emotionVideos = getVideosForEmotion(emotion);
  const [selectedVideo, setSelectedVideo] = useState<RecommendedVideo>(emotionVideos[0] || RECOMMENDED_VIDEOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Update selected video if emotion changes
  React.useEffect(() => {
    const videos = getVideosForEmotion(emotion);
    if (videos.length > 0) {
      setSelectedVideo(videos[0]);
      setIsPlaying(true);
    }
  }, [emotion]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow-xs">
              🎬
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base sm:text-lg">
                  Harika! Duygunu Kaydettin
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/25 text-white">
                  {currentEmotionObj.emoji} {currentEmotionObj.label} Modu
                </span>
              </div>
              <p className="text-xs text-amber-100 font-medium">
                Duygularını daha iyi anlaman ve iyi hissetmen için sana özel seçtiğimiz video!
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Main Video Screen & Player */}
          <div className="space-y-3">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-900 shadow-md border border-stone-200">
              {isPlaying ? (
                <iframe
                  src={`${selectedVideo.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="relative w-full h-full cursor-pointer group"
                >
                  <img
                    src={selectedVideo.thumbnailUrl}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center group-hover:bg-stone-950/30 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-orange-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-bold bg-stone-950/60 px-3 py-1.5 rounded-xl backdrop-blur-xs">
                    <span>{selectedVideo.title}</span>
                    <span>{selectedVideo.duration}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Video Title & Category */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                  {selectedVideo.category}
                </span>
                <h4 className="font-heading font-extrabold text-base sm:text-lg text-stone-900 mt-1">
                  {selectedVideo.title}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  {selectedVideo.description}
                </p>
              </div>

              <span className="text-xs font-semibold text-stone-400 self-start sm:self-auto flex items-center gap-1">
                ⏱️ {selectedVideo.duration}
              </span>
            </div>
          </div>

          {/* Educational Takeaways Box */}
          <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-amber-200 space-y-2.5">
            <div className="flex items-center gap-2 font-heading font-extrabold text-xs sm:text-sm text-amber-950">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Bu Videodan Neler Öğrenebilirsin?</span>
            </div>
            <ul className="space-y-1.5">
              {selectedVideo.takeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reflection Question Box */}
          <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-200 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-200 text-orange-800 flex items-center justify-center flex-shrink-0 text-sm">
              💭
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase text-orange-900 block">
                Günün Düşünme & Farkındalık Sorusu
              </span>
              <p className="text-xs sm:text-sm font-semibold text-stone-800 mt-0.5">
                "{selectedVideo.reflectionQuestion}"
              </p>
            </div>
          </div>

          {/* More Video Suggestions for this Emotion */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between">
              <span className="font-heading font-extrabold text-xs sm:text-sm text-stone-800 flex items-center gap-1.5">
                <Film className="w-4 h-4 text-orange-600" />
                <span>Bu Duyguya Özel Diğer Videolar:</span>
              </span>
              <span className="text-[11px] text-stone-400 font-medium">Seçip hemen izle</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {RECOMMENDED_VIDEOS.map((vid) => {
                const isCurrent = vid.id === selectedVideo.id;
                const isMatching = vid.targetEmotion === emotion;
                return (
                  <button
                    key={vid.id}
                    onClick={() => {
                      sound.playPop();
                      setSelectedVideo(vid);
                      setIsPlaying(true);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300'
                        : isMatching
                        ? 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                        : 'bg-white hover:bg-stone-50 border-stone-100 opacity-75'
                    }`}
                  >
                    <div className="w-12 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-stone-200 relative">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-stone-950/20 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 fill-white text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-stone-900 truncate">
                        {vid.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-stone-500">{vid.duration}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-200/80 text-stone-700 font-medium">
                          {vid.category}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500 hidden sm:inline">
            ✨ Kendine zaman ayırdığın için teşekkürler!
          </span>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-extrabold transition-colors ml-auto cursor-pointer"
          >
            Günlüğüme Dön ✨
          </button>
        </div>

      </div>
    </div>
  );
};
