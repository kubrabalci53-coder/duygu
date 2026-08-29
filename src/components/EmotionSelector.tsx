import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  HelpCircle, 
  ShieldAlert, 
  Heart, 
  Lightbulb, 
  Info,
  CheckCircle2,
  Smile,
  RefreshCw,
  Compass
} from 'lucide-react';
import { EmotionType, DiaryEntry, AvatarConfig } from '../types';
import { EMOTIONS, COMMON_CAUSES, SENSITIVE_KEYWORDS } from '../data/emotions';
import { DAILY_QUOTES, DAILY_QUESTIONS } from '../data/cheerUp';
import { sound } from '../utils/audio';
import { AvatarIllustration } from './AvatarIllustration';

interface EmotionSelectorProps {
  onSaveEntry: (entry: Omit<DiaryEntry, 'id' | 'timestamp'>) => void;
  avatar: AvatarConfig;
  onOpenCheerUp: (emotion: EmotionType) => void;
}

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  onSaveEntry,
  avatar,
  onOpenCheerUp
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>('mutlu');
  const [intensity, setIntensity] = useState<number>(7);
  const [selectedCauses, setSelectedCauses] = useState<string[]>([]);
  const [customCause, setCustomCause] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [selfDiscoveryNote, setSelfDiscoveryNote] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [safetyAlertVisible, setSafetyAlertVisible] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [randomQuoteIndex, setRandomQuoteIndex] = useState<number>(0);
  const [randomQuestionIndex, setRandomQuestionIndex] = useState<number>(0);

  // Pick daily thoughts & questions on mount
  useEffect(() => {
    const daySeed = new Date().getDate();
    setRandomQuoteIndex(daySeed % DAILY_QUOTES.length);
    setRandomQuestionIndex((daySeed + 2) % DAILY_QUESTIONS.length);
  }, []);

  // Monitor note for sensitive keywords
  useEffect(() => {
    const textLower = (note + ' ' + selfDiscoveryNote + ' ' + customCause).toLowerCase();
    const hasTrigger = SENSITIVE_KEYWORDS.some(word => textLower.includes(word));
    setSafetyAlertVisible(hasTrigger);
  }, [note, selfDiscoveryNote, customCause]);

  const currentEmotionObj = EMOTIONS.find(e => e.id === selectedEmotion) || EMOTIONS[0];

  const handleSelectEmotion = (emotion: EmotionType) => {
    setSelectedEmotion(emotion);
    const target = EMOTIONS.find(e => e.id === emotion);
    if (target) {
      sound.playChime(target.soundPitch);
    }
  };

  const toggleCause = (cause: string) => {
    sound.playPop();
    if (selectedCauses.includes(cause)) {
      setSelectedCauses(selectedCauses.filter(c => c !== cause));
    } else {
      setSelectedCauses([...selectedCauses, cause]);
    }
  };

  const handleSimulateVoice = () => {
    sound.playPop();
    if (!isRecording) {
      setIsRecording(true);
      // Voice simulation or actual web speech if available
      setTimeout(() => {
        setIsRecording(false);
        setNote(prev => prev + (prev ? ' ' : '') + 'Bugün kendimi dinlemeyi ve duygularımı açıkça ifade etmeyi öğrendim.');
        sound.playPop();
      }, 2500);
    } else {
      setIsRecording(false);
    }
  };

  const handleIntensityChange = (val: number) => {
    setIntensity(val);
    sound.playTone(300 + val * 40, 'triangle', 0.05, 0.08);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

    const newEntry: Omit<DiaryEntry, 'id' | 'timestamp'> = {
      date: dateStr,
      time: timeStr,
      emotion: selectedEmotion,
      intensity,
      causes: selectedCauses,
      customCause: customCause.trim() || undefined,
      note: note.trim() || `${currentEmotionObj.label} hissediyorum (${intensity}/10).`,
      selfDiscoveryNote: selfDiscoveryNote.trim() || undefined,
      avatarMood: selectedEmotion
    };

    onSaveEntry(newEntry);
    sound.playSuccessFanfare();

    // Trigger colorful celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Confetti fallback
    }

    setSaveSuccess(true);

    // If emotion is tough (uzgun, ofkeli, korkmus, yalniz), offer cheer up modal
    const toughEmotions: EmotionType[] = ['uzgun', 'ofkeli', 'korkmus', 'yalniz'];
    if (toughEmotions.includes(selectedEmotion)) {
      setTimeout(() => {
        onOpenCheerUp(selectedEmotion);
      }, 900);
    }

    // Reset fields after gentle delay
    setTimeout(() => {
      setSaveSuccess(false);
      setNote('');
      setSelfDiscoveryNote('');
      setCustomCause('');
      setSelectedCauses([]);
    }, 2800);
  };

  const getIntensityLabel = (level: number) => {
    if (level <= 2) return 'Çok Hafif (1-2) — Neredeyse fark edilmiyor';
    if (level <= 4) return 'Hafif (3-4) — Sakin bir şekilde hissediyorum';
    if (level <= 6) return 'Orta (5-6) — Belirgin ve fark edilir';
    if (level <= 8) return 'Güçlü (7-8) — Bütün bedenimde hissediyorum';
    return 'Çok Yoğun (9-10) — İçimden taşıyor!';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Daily Motivation & Question Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Daily Positive Thought */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 text-xl shadow-xs">
            ☀️
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Günün Olumlu Düşüncesi
              </span>
              <button 
                onClick={() => setRandomQuoteIndex((randomQuoteIndex + 1) % DAILY_QUOTES.length)}
                className="text-stone-500 hover:text-stone-800 text-xs flex items-center gap-1 font-medium transition-colors cursor-pointer"
                title="Yeni Düşünce Getir"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Yenile</span>
              </button>
            </div>
            <p className="text-sm font-medium text-stone-700 mt-1 italic">
              "{DAILY_QUOTES[randomQuoteIndex].quote}"
            </p>
            <p className="text-xs text-stone-500 mt-1 font-semibold">
              — {DAILY_QUOTES[randomQuoteIndex].author}
            </p>
          </div>
        </div>

        {/* Today's Mindfulness Question */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center flex-shrink-0 text-xl shadow-xs">
            🧭
          </div>
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-900">
                Bugünün Sorusu
              </span>
              <button 
                onClick={() => setRandomQuestionIndex((randomQuestionIndex + 1) % DAILY_QUESTIONS.length)}
                className="text-stone-500 hover:text-stone-800 text-xs flex items-center gap-1 font-medium transition-colors cursor-pointer"
                title="Yeni Soru Getir"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Değiştir</span>
              </button>
            </div>
            <p className="text-sm font-semibold text-stone-800 mt-1">
              {DAILY_QUESTIONS[randomQuestionIndex]}
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Bu soruyu günlüğüne yazarken düşünebilirsin! ✨
            </p>
          </div>
        </div>
      </div>

      {/* Main Journaling Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-8">
        
        {/* Step 1: Header & Emotion Selection */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-orange-100 text-orange-800">
                  Adım 1 / 4
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
                  Bugün nasıl hissediyorsun?
                </h2>
              </div>
              <p className="text-sm text-stone-500 mt-1">
                İçindeki hisse en yakın gelen sevimli duyguyu seç. Hiçbir duygu yanlış veya kötü değildir!
              </p>
            </div>

            {/* Current Companion Avatar Reaction */}
            <div className="flex items-center gap-3 bg-[#FDFBF7] border border-stone-200 rounded-2xl p-2.5 self-start sm:self-auto">
              <AvatarIllustration config={avatar} currentEmotion={selectedEmotion} size="sm" />
              <div className="text-left pr-1">
                <p className="text-[11px] font-semibold text-stone-500">Arkadaşın {avatar.name}</p>
                <p className="text-xs font-bold text-stone-800">{currentEmotionObj.label} modunda!</p>
              </div>
            </div>
          </div>

          {/* 8 Big Expressive Emotion Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
            {EMOTIONS.map((emotion) => {
              const isSelected = selectedEmotion === emotion.id;
              return (
                <button
                  type="button"
                  key={emotion.id}
                  id={`emotion-btn-${emotion.id}`}
                  onClick={() => handleSelectEmotion(emotion.id)}
                  className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer text-center group ${
                    isSelected
                      ? `bg-gradient-to-b ${emotion.bgGradient} ${emotion.borderColor} shadow-sm scale-103 border-current`
                      : 'bg-stone-50/80 border-stone-200 hover:bg-stone-100/90 hover:border-stone-300'
                  }`}
                >
                  {/* Floating emoji icon */}
                  <span className={`text-4xl sm:text-5xl mb-2 transition-transform duration-300 ${
                    isSelected ? 'scale-115 animate-bounce' : 'group-hover:scale-110'
                  }`}>
                    {emotion.emoji}
                  </span>
                  <span className={`font-heading font-bold text-base sm:text-lg ${
                    isSelected ? emotion.textColor : 'text-stone-700'
                  }`}>
                    {emotion.label}
                  </span>
                  {isSelected && (
                    <span className="absolute top-2 right-2 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Emotion Description & Warm Soothing Tip */}
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${currentEmotionObj.bgGradient} border ${currentEmotionObj.borderColor} flex items-start gap-3 mt-3 animate-fadeIn`}>
            <span className="text-2xl flex-shrink-0">{currentEmotionObj.emoji}</span>
            <div className="text-xs sm:text-sm">
              <p className="font-bold text-stone-800">
                {currentEmotionObj.label}: {currentEmotionObj.description}
              </p>
              <p className="text-stone-600 mt-1 font-medium">
                💡 <span className="font-semibold text-stone-700">Tavsiye:</span> {currentEmotionObj.soothingNote}
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Emotion Intensity Slider (1-10) */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-stone-100 text-stone-800">
                Adım 2 / 4
              </span>
              <label htmlFor="intensity-range" className="text-base sm:text-lg font-bold text-stone-900">
                Bu duyguyu ne kadar yoğun hissediyorsun?
              </label>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-orange-600 font-heading">
                {intensity} <span className="text-xs font-medium text-stone-400">/ 10</span>
              </span>
            </div>
          </div>

          <p className="text-xs font-semibold text-stone-600">
            {getIntensityLabel(intensity)}
          </p>

          <div className="space-y-2">
            <input
              id="intensity-range"
              type="range"
              min="1"
              max="10"
              step="1"
              value={intensity}
              onChange={(e) => handleIntensityChange(Number(e.target.value))}
              className="w-full h-3 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600 transition-all"
            />
            {/* Number buttons for direct tactile tap */}
            <div className="flex justify-between items-center gap-1 pt-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  type="button"
                  key={num}
                  id={`intensity-step-${num}`}
                  onClick={() => handleIntensityChange(num)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                    intensity === num
                      ? 'bg-stone-900 text-white shadow-xs scale-110'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Trigger / Cause Selection */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800">
              Adım 3 / 4
            </span>
            <label className="text-base sm:text-lg font-bold text-stone-900">
              Bugün bu duyguyu yaşamana ne sebep oldu?
            </label>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">
            Aşağıdaki hazır durumlardan bir veya birkaçını seçebilir ya da kendi cümleni ekleyebilirsin:
          </p>

          {/* Cause Chips */}
          <div className="flex flex-wrap gap-2">
            {COMMON_CAUSES.map((cause) => {
              const isSelected = selectedCauses.includes(cause);
              return (
                <button
                  type="button"
                  key={cause}
                  id={`cause-chip-${cause.slice(0, 4)}`}
                  onClick={() => toggleCause(cause)}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-xs scale-102'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  <span>{cause}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>

          {/* Custom Cause Input */}
          <input
            id="custom-cause-input"
            type="text"
            placeholder="Başka bir sebep varsa buraya yazabilirsin (ör. 'Yeni bir kitap okudum')..."
            value={customCause}
            onChange={(e) => setCustomCause(e.target.value)}
            className="w-full px-4 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all text-stone-800"
          />
        </div>

        {/* Step 4: Free Journaling Text Area & Self Discovery */}
        <div className="space-y-4 pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-stone-100 text-stone-800">
                Adım 4 / 4
              </span>
              <label htmlFor="diary-note" className="text-base sm:text-lg font-bold text-stone-900">
                Gününün Notu (Serbest Yazı Alanı)
              </label>
            </div>
            {/* Simulated Voice input */}
            <button
              type="button"
              id="voice-dictation-btn"
              onClick={handleSimulateVoice}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isRecording
                  ? 'bg-orange-600 text-white animate-pulse'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
              title="Konuşarak Dikte Et"
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
              <span>{isRecording ? 'Dinleniyor...' : 'Sesle Yaz'}</span>
            </button>
          </div>

          {/* Text Area */}
          <textarea
            id="diary-note"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Bugün aklından neler geçti? Neler yaşadın? Kalbinden gelen her şeyi özgürce buraya dökebilirsin..."
            className="w-full p-4 text-sm sm:text-base bg-[#FDFBF7] border border-stone-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 transition-all placeholder:text-stone-400"
          />

          {/* Optional: "Bugün kendimle ilgili fark ettiğim şey" */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-700" />
              <label htmlFor="self-discovery-input" className="text-xs sm:text-sm font-bold text-amber-950">
                İsteğe Bağlı: “Bugün kendimle ilgili fark ettiğim şey”
              </label>
            </div>
            <input
              id="self-discovery-input"
              type="text"
              value={selfDiscoveryNote}
              onChange={(e) => setSelfDiscoveryNote(e.target.value)}
              placeholder="Örn: 'Zorlandığımda pes etmek yerine derin nefes alırsam sakinleşebiliyorum...'"
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Sensitive Safety Reassurance Box (Triggered on sensitive keywords without diagnosis) */}
        {safetyAlertVisible && (
          <div className="p-4 rounded-2xl bg-orange-50 border-2 border-orange-300 text-orange-950 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-sm">
              <ShieldAlert className="w-5 h-5 text-orange-700 flex-shrink-0" />
              <span>Sen Çok Değerlisin, Yalnız Değilsin! 💙</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-orange-900">
              Bazen zor ve ağır duygular yaşamak çok doğaldır. Böyle anlarda bir yetişkinden destek almak güç ve cesaret göstergesidir. 
              Lütfen ailenden güvendiğin birine veya <strong>Okul Rehberlik Servisi</strong> / öğretmenine hislerini anlatmaktan çekinme.
            </p>
          </div>
        )}

        {/* Submit & Cheer-Up Button Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-stone-500 flex items-center gap-1.5">
            <span className="text-emerald-600">🔒</span>
            <span>Verilerin varsayılan olarak tamamen özel ve cihazında saklanır.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Quick Cheer Up Tool */}
            <button
              type="button"
              id="quick-cheer-up-btn"
              onClick={() => {
                sound.playPop();
                onOpenCheerUp(selectedEmotion);
              }}
              className="px-4 py-3 text-xs sm:text-sm font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-2xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Smile className="w-4 h-4 text-orange-500" />
              <span>Gülümse & Rahatla</span>
            </button>

            {/* Save Diary Button */}
            <button
              type="submit"
              id="save-diary-entry-btn"
              disabled={saveSuccess}
              className={`flex-1 sm:flex-none px-7 py-3.5 rounded-2xl font-heading font-extrabold text-sm sm:text-base text-white shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-700 scale-102'
                  : 'bg-stone-900 hover:bg-stone-800 active:scale-98'
              }`}
            >
              {saveSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-white animate-pulse" />
                  <span>Harika! Günlük Kaydedildi ✨</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Günlüğü Kaydet</span>
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};
