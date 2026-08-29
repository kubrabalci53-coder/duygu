import { CheerUpItem } from '../types';

export const CHEER_UP_ITEMS: CheerUpItem[] = [
  {
    id: 'cute-panda-roll',
    title: 'Kaydıraktan Kayan Neşeli Yavru Panda 🐼',
    type: 'video',
    description: 'Beceriksizce kaydıraktan yuvarlanan ve hemen kalkıp gülen sevimli yavru pandanın neşesi!',
    url: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=800&q=80',
    authorOrSource: 'Doğa ve Sevimli Dostlar',
    tags: ['komik', 'hayvanlar', 'tebessüm']
  },
  {
    id: 'cat-box-cartoon',
    title: 'Kutuya Sığmaya Çalışan Tombul Kedi Çizgi Karikatürü 🐱',
    type: 'cartoon',
    description: 'Küçücük bir kutuya sığabileceğine inanan inatçı ama aşırı tatlı kedinin maceraları!',
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=800&q=80',
    authorOrSource: 'Mizah & Çizgi Köşesi',
    tags: ['karikatür', 'kedi', 'eğlence']
  },
  {
    id: 'penguin-slip',
    title: 'Buzda Kayıp Dans Eden Penguenler 🐧',
    type: 'video',
    description: 'Buzda kayıp takla atan ama hemen arkadaşına sarılıp yürümeye devam eden tatlı penguen grubu.',
    url: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=800&q=80',
    authorOrSource: 'Buzlar Ülkesi Maceraları',
    tags: ['dans', 'penguen', 'neşe']
  },
  {
    id: 'joke-1',
    title: 'Günün Fıkrası: Bilgisayar Neden Üşümüş? 💻',
    type: 'joke',
    description: '— Bilgisayar neden üşümüş?\n— Çünkü pencerelerini (Windows) açık unutmuş! 😂',
    authorOrSource: 'Gülümseme Kulübü',
    tags: ['fıkra', 'kahkaha', 'zeka']
  },
  {
    id: 'joke-2',
    title: 'Günün Fıkrası: En Kibar Gezegen Hangisidir? 🪐',
    type: 'joke',
    description: '— En kibar gezegen hangisidir?\n— Tabii ki "Lüt-fen" (Plüton)! 🌟',
    authorOrSource: 'Gülümseme Kulübü',
    tags: ['fıkra', 'uzay', 'neşeli']
  },
  {
    id: 'affirmation-sun',
    title: 'Günün Süper Gücü: Sen Eşsizsin! ☀️',
    type: 'affirmation',
    description: 'Dünya üzerinde senin gibi düşünen, senin gibi gülen başka hiç kimse yok. Bugün sadece kendin olman bile harika bir başarı!',
    authorOrSource: 'İçimdeki Kahraman',
    tags: ['özgüven', 'sevgi', 'cesaret']
  }
];

export const DAILY_QUOTES = [
  {
    quote: "Duyguların tıpkı denizdeki dalgalar gibidir; onları durduramazsın ama üstlerinde sörf yapmayı öğrenebilirsin.",
    author: "Jon Kabat-Zinn"
  },
  {
    quote: "Her duygu seni daha yakından tanıman için sana gelen bir mektuptur.",
    author: "Duygu Rehberi"
  },
  {
    quote: "Bugün gökyüzü bulutlu olabilir ama güneş her zaman bulutların arkasında parlamaya devam eder.",
    author: "Farkındalık Kulübü"
  },
  {
    quote: "Hata yapmak beynimizin yeni yollar inşa etme şeklidir. Kendine her gün teşekkür etmeyi unutma.",
    author: "Pedagojik Gelişim"
  },
  {
    quote: "Küçük bir tebessüm, gününün tüm havasını değiştirebilecek sihirli bir başlangıçtır.",
    author: "Pozitif Düşünce"
  }
];

export const DAILY_QUESTIONS = [
  "Bugün seni en çok ne gülümsetti?",
  "Bugün karşılaştığın bir zorluk karşısında ne kadar cesur davrandın?",
  "Bugün bir arkadaşına ya da ailene yaptığın en tatlı iyilik neydi?",
  "Bugün kendini en çok nerede güvende ve rahat hissettin?",
  "Bugün öğrendiğin en ilginç veya şaşırtıcı şey ne oldu?",
  "Bedenin şu an sana ne söylüyor? Dinlenmeye mi yoksa harekete mi ihtiyacı var?"
];
