import React, { useState } from 'react';
import { 
  Sparkles, 
  Heart, 
  Sun, 
  Compass, 
  Smile, 
  HelpCircle, 
  Feather, 
  CheckCircle2, 
  Plus,
  Trash2
} from 'lucide-react';
import { DiaryEntry, EmotionType } from '../types';
import { EMOTIONS } from '../data/emotions';
import { sound } from '../utils/audio';

interface SelfDiscoveryProps {
  entries: DiaryEntry[];
}

export const SelfDiscovery: React.FC<SelfDiscoveryProps> = ({ entries }) => {
  const [gratitudeList, setGratitudeList] = useState<string[]>([
    'Bugün gökyüzünde gördüğüm rengarenk gökkuşağı 🌈',
    'Arkadaşımın bana gülümsediği o tatlı an 😊',
    'Akşam yediğim lezzetli sıcak çorba 🍲'
  ]);
  const [newGratitudeText, setNewGratitudeText] = useState<string>('');
  
  // Reflection responses
  const [answers, setAnswers] = useState<Record<string, string>>({
    happyTrigger: 'Arkadaşlarımla resim yapmak ve bahçede koşmak!',
    peaceTrigger: 'Kedimle otururken ve odamda sevdiğim müziği dinlerken.',
    selfGift: 'Bugün kendime bir bardak ılık süt yapıp biraz dinlendim.'
  });

  // Calculate most frequent recent emotion
  const recentEntries = entries.slice(0, 7);
  const emotionCounts: Partial<Record<EmotionType, number>> = {};
  recentEntries.forEach(e => {
    emotionCounts[e.emotion] = (emotionCounts[e.emotion] || 0) + 1;
  });

  let topEmotion: EmotionType = 'mutlu';
  let maxCount = 0;
  Object.entries(emotionCounts).forEach(([k, v]) => {
    if (v && v > maxCount) {
      maxCount = v;
      topEmotion = k as EmotionType;
    }
  });

  const topEmotionDef = EMOTIONS.find(e => e.id === topEmotion) || EMOTIONS[0];

  const handleAddGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGratitudeText.trim()) return;
    sound.playSuccessFanfare();
    setGratitudeList([newGratitudeText.trim(), ...gratitudeList]);
    setNewGratitudeText('');
  };

  const handleDeleteGratitude = (index: number) => {
    sound.playPop();
    setGratitudeList(gratitudeList.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Section Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
            ✨
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
              Kendimi Keşfediyorum 🧭
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Duygularını tanımak süper bir güçtür! Aşağıdaki farkındalık sorularıyla kendini daha yakından tanı.
            </p>
          </div>
        </div>

        {/* Child Safety & Non-clinical pedagogical disclaimer */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#FDFBF7] border border-stone-200 text-stone-600 text-xs flex items-center gap-2">
          <span className="text-sm">🌱</span>
          <span>
            <strong>Pedagojik Not:</strong> Bu bölüm sadece kişisel farkındalık ve öz değerlendirme içindir; kesinlikle klinik veya tıbbi teşhis amacı taşımaz.
          </span>
        </div>
      </div>

      {/* Dynamic Emotion Insight Card */}
      <div className={`p-6 sm:p-7 rounded-3xl bg-gradient-to-r ${topEmotionDef.bgGradient} border ${topEmotionDef.borderColor} shadow-xs space-y-3`}>
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-stone-500">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Kayıtlarından Çıkan Farkındalık</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-stone-900">
              Son günlerde en sık <strong>"{topEmotionDef.label}"</strong> hissettin {topEmotionDef.emoji}
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 max-w-xl leading-relaxed">
              {topEmotionDef.description}
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-white/80 backdrop-blur-xs text-xs font-bold text-stone-800 shadow-xs border border-stone-200 self-start sm:self-auto">
            {maxCount} kez kaydedildi
          </div>
        </div>
      </div>

      {/* Guided Reflection Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Question 1: Seni en çok ne mutlu ediyor? */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center text-lg">
              💖
            </span>
            <h4 className="font-heading font-bold text-sm sm:text-base text-stone-800">
              Seni en çok ne mutlu ediyor?
            </h4>
          </div>
          <p className="text-xs text-stone-500">
            Düşün bakalım: Hangi anlarda gözlerinin içi parlıyor?
          </p>
          <textarea
            rows={3}
            value={answers.happyTrigger}
            onChange={(e) => setAnswers({ ...answers, happyTrigger: e.target.value })}
            className="w-full p-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 text-stone-800 transition-all"
            placeholder="Beni en çok mutlu eden şeyler..."
          />
        </div>

        {/* Question 2: Hangi durumlarda kendini huzurlu hissediyorsun? */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-lg">
              🕊️
            </span>
            <h4 className="font-heading font-bold text-sm sm:text-base text-stone-800">
              Hangi durumlarda kendini daha huzurlu hissediyorsun?
            </h4>
          </div>
          <p className="text-xs text-stone-500">
            Sessiz bir an, bir kitap sayfası ya da doğada bir yürüyüş mü?
          </p>
          <textarea
            rows={3}
            value={answers.peaceTrigger}
            onChange={(e) => setAnswers({ ...answers, peaceTrigger: e.target.value })}
            className="w-full p-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 text-stone-800 transition-all"
            placeholder="Kendimi huzurlu hissettiğim ortamlar..."
          />
        </div>

        {/* Question 3: Bugün kendin için yaptığın güzel bir şey neydi? */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-3 md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-lg">
              🎁
            </span>
            <h4 className="font-heading font-bold text-sm sm:text-base text-stone-800">
              Bugün kendin için yaptığın güzel bir şey neydi?
            </h4>
          </div>
          <p className="text-xs text-stone-500">
            Kendine verdiğin bir dinlenme molası, sevdiğin bir müziği açmak veya bir başarıyı kutlamak olabilir!
          </p>
          <textarea
            rows={2}
            value={answers.selfGift}
            onChange={(e) => setAnswers({ ...answers, selfGift: e.target.value })}
            className="w-full p-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 text-stone-800 transition-all"
            placeholder="Bugün kendime bir iyilik yaptım..."
          />
        </div>

      </div>

      {/* Şükran Kavanozu (Gratitude Jar) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
              🍯
            </span>
            <div>
              <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-800">
                Şükran ve Mutluluk Kavanozu
              </h3>
              <p className="text-xs text-stone-500">
                Hayatındaki küçük güzellikleri not alıp kavanoza bırak!
              </p>
            </div>
          </div>
        </div>

        {/* Add new gratitude item form */}
        <form onSubmit={handleAddGratitude} className="flex gap-2">
          <input
            id="new-gratitude-input"
            type="text"
            placeholder="Bugün minnettar olduğun küçük bir şey yaz (ör. 'Güneşin doğuşu', 'Dostumun yardımı')..."
            value={newGratitudeText}
            onChange={(e) => setNewGratitudeText(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 text-stone-800"
          />
          <button
            type="submit"
            id="add-gratitude-btn"
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Kavanoza At</span>
          </button>
        </form>

        {/* Gratitude Notes Pills */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {gratitudeList.map((item, idx) => (
            <div
              key={idx}
              className="group px-3.5 py-2 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium flex items-center gap-2 shadow-2xs hover:shadow-xs transition-all"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleDeleteGratitude(idx)}
                className="opacity-0 group-hover:opacity-100 text-stone-400 hover:text-stone-700 transition-opacity p-0.5 cursor-pointer"
                title="Sil"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
