import { EmotionOption } from '../types';

export const EMOTIONS: EmotionOption[] = [
  {
    id: 'mutlu',
    label: 'Mutlu',
    emoji: '😊',
    color: '#059669',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    bgGradient: 'from-emerald-50 to-stone-50',
    badgeBg: 'bg-emerald-100 text-emerald-900',
    description: 'İçinde neşe, enerji ve tebessüm hissettiğin, her şeyin yolunda gittiği harika bir an!',
    soothingNote: 'Bu güzel enerjiyi sevdiğin insanlarla paylaşmak mutluluğunu ikiye katlayabilir!',
    soundPitch: 523.25, // C5
  },
  {
    id: 'uzgun',
    label: 'Üzgün',
    emoji: '😢',
    color: '#0284c7',
    textColor: 'text-sky-800',
    borderColor: 'border-sky-200',
    bgGradient: 'from-sky-50 to-stone-50',
    badgeBg: 'bg-sky-100 text-sky-900',
    description: 'Bazen işler istediğimiz gibi gitmeyebilir. Üzülmek çok doğal bir duygudur ve kalbimizi dinlendirmemiz gerektiğini hatırlatır.',
    soothingNote: 'Unutma, bulutlar yağmurunu bıraktıktan sonra hava hep açar. Kendine şefkatli davran.',
    soundPitch: 329.63, // E4
  },
  {
    id: 'ofkeli',
    label: 'Öfkeli',
    emoji: '😡',
    color: '#ea580c',
    textColor: 'text-orange-900',
    borderColor: 'border-orange-200',
    bgGradient: 'from-orange-50 to-stone-50',
    badgeBg: 'bg-orange-100 text-orange-900',
    description: 'Bir şey haksız veya zor geldiğinde içindeki enerji yanardağ gibi yükselebilir. Öfke bir alarm zilidir!',
    soothingNote: 'Derin bir nefes al, 4 saniye tut ve üfle. Öfke enerjisini güvenli bir harekete veya yazıya dönüştürebilirsin.',
    soundPitch: 220.00, // A3
  },
  {
    id: 'korkmus',
    label: 'Korkmuş',
    emoji: '😨',
    color: '#7c3aed',
    textColor: 'text-violet-900',
    borderColor: 'border-violet-200',
    bgGradient: 'from-violet-50 to-stone-50',
    badgeBg: 'bg-violet-100 text-violet-900',
    description: 'Bilinmeyen veya tehlikeli hissettiren durumlarda beynimizin bizi korumak için çaldığı süper kahraman alarmıdır.',
    soothingNote: 'Şu an güvendesin. Etrafında gördüğün 5 mavi nesneyi sayarak zihnini sakinleştirebilirsin.',
    soundPitch: 293.66, // D4
  },
  {
    id: 'huzurlu',
    label: 'Huzurlu',
    emoji: '😌',
    color: '#0d9488',
    textColor: 'text-teal-900',
    borderColor: 'border-teal-200',
    bgGradient: 'from-teal-50 to-stone-50',
    badgeBg: 'bg-teal-100 text-teal-900',
    description: 'Deniz kenarında ılık bir rüzgar gibi sakin, sessiz ve kendinle barışık olduğun anlar.',
    soothingNote: 'Bu dinginliğin tadını çıkar, bedeninin ne kadar gevşediğini hisset.',
    soundPitch: 440.00, // A4
  },
  {
    id: 'karisik',
    label: 'Karışık',
    emoji: '😕',
    color: '#d97706',
    textColor: 'text-amber-900',
    borderColor: 'border-amber-200',
    bgGradient: 'from-amber-50 to-stone-50',
    badgeBg: 'bg-amber-100 text-amber-900',
    description: 'Aynı anda hem sevinç hem endişe ya da ne hissettiğini tam çözemediğin bir duygu yumağı.',
    soothingNote: 'Duygularının karışık olması çok normal! Onları bir ip yumağını çözer gibi tek tek yazıp adlandırabilirsin.',
    soundPitch: 369.99, // F#4
  },
  {
    id: 'heyecanli',
    label: 'Heyecanlı',
    emoji: '😍',
    color: '#e11d48',
    textColor: 'text-rose-900',
    borderColor: 'border-rose-200',
    bgGradient: 'from-rose-50 to-stone-50',
    badgeBg: 'bg-rose-100 text-rose-900',
    description: 'Kalbinin hızlı attığı, yeni bir maceraya veya güzel bir habere sabırsızlandığın kıpır kıpır anlar!',
    soothingNote: 'Bu coşkulu enerjiyi yeni şeyler öğrenmek ve eğlenmek için kullanabilirsin!',
    soundPitch: 587.33, // D5
  },
  {
    id: 'yalniz',
    label: 'Yalnız',
    emoji: '😔',
    color: '#78716c',
    textColor: 'text-stone-800',
    borderColor: 'border-stone-200',
    bgGradient: 'from-stone-100 to-[#FDFBF7]',
    badgeBg: 'bg-stone-200 text-stone-900',
    description: 'Anlaşılmadığını hissettiğin veya yanında bir dost aradığın sessiz anlar.',
    soothingNote: 'Unutma ki senin gibi hisseden milyonlarca insan var. Bir arkadaşına merhaba demek veya sevdiğin bir aktiviteye sarılmak sana iyi gelebilir.',
    soundPitch: 261.63, // C4
  },
];

export const COMMON_CAUSES = [
  '🏫 Okul ve Sınavlar',
  '👫 Arkadaşlarım',
  '🏡 Ailem ve Evim',
  '🎮 Oyun ve Hobilerim',
  '📚 Dersler ve Ödevler',
  '⚽ Spor ve Hareket',
  '💤 Uyku ve Yorgunluk',
  '🎨 Sanat ve Müzik',
  '🐾 Evcil Hayvanım',
  '💭 Gelecek Düşünceleri',
  '📱 Sosyal Medya & Ekran',
  '🌦️ Hava Durumu'
];

export const SENSITIVE_KEYWORDS = [
  'kendime zarar',
  'ölmek',
  'intihar',
  'yaşamak istemiyorum',
  'canımı yakmak',
  'dövüyorlar',
  'şiddet',
  'korkunç tehdit',
  'kendimi öldür',
  'zarar vermek'
];
