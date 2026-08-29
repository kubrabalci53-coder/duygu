export type EmotionType = 
  | 'mutlu' 
  | 'uzgun' 
  | 'ofkeli' 
  | 'korkmus' 
  | 'huzurlu' 
  | 'karisik' 
  | 'heyecanli' 
  | 'yalniz';

export interface EmotionOption {
  id: EmotionType;
  label: string;
  emoji: string;
  color: string;
  textColor: string;
  borderColor: string;
  bgGradient: string;
  badgeBg: string;
  description: string;
  soothingNote: string;
  soundPitch: number;
}

export interface DiaryEntry {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  timestamp: number;
  emotion: EmotionType;
  intensity: number; // 1-10
  causes: string[];
  customCause?: string;
  note: string;
  selfDiscoveryNote?: string;
  gratitudeNote?: string;
  voiceNoteSimulated?: boolean;
  avatarMood?: string;
}

export interface AvatarConfig {
  id: string;
  name: string;
  genderOrStyle: 'cosmic' | 'nature' | 'sparkle' | 'explorer' | 'friendly' | 'superhero';
  faceColor: string;
  hairStyle: 'fluffy' | 'spiky' | 'curls' | 'cap' | 'crown' | 'headphones';
  accessory: 'glasses' | 'star' | 'badge' | 'heart' | 'sparkle' | 'none';
  outfitColor: string;
  companionPet: 'cat' | 'dog' | 'bird' | 'bunny' | 'dragon' | 'robot' | 'star';
}

export interface MindfulnessQuestion {
  id: string;
  question: string;
  category: 'reflection' | 'gratitude' | 'strength' | 'calm';
  iconName: string;
  placeholder: string;
}

export interface PsychoArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Gelişim & Beyin' | 'Duygu Yönetimi' | 'Okul & Arkadaşlık' | 'Rahatlama';
  readTime: string;
  expertAuthor: string;
  expertTitle: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  funActivity: {
    title: string;
    description: string;
    stepList: string[];
  };
  comicImageUrl?: string;
}

export interface CheerUpItem {
  id: string;
  title: string;
  type: 'cartoon' | 'video' | 'joke' | 'affirmation' | 'breathing';
  description: string;
  url?: string;
  authorOrSource?: string;
  tags: string[];
}

export interface ClassAnonymousData {
  classId: string;
  className: string;
  totalStudents: number;
  activeEntriesCount: number;
  weeklyDistribution: Record<EmotionType, number>;
  mostFrequentEmotion: EmotionType;
  topTriggers: { trigger: string; percentage: number }[];
  weeklyMoodScoreAvg: number; // 1-10
  stressAlertCount: number; // anonymous aggregate
}
