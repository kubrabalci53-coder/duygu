import { DiaryEntry, AvatarConfig, EmotionType, UserRole, StudentProfile, TeacherProfile } from '../types';

const STORAGE_KEY_ENTRIES = 'duygu_gunlugum_entries_v1';
const STORAGE_KEY_AVATAR = 'duygu_gunlugum_avatar_v1';
const STORAGE_KEY_SETTINGS = 'duygu_gunlugum_settings_v1';
const STORAGE_KEY_ROLE = 'duygu_gunlugum_role_v1';
const STORAGE_KEY_STUDENT = 'duygu_gunlugum_student_v1';
const STORAGE_KEY_TEACHER = 'duygu_gunlugum_teacher_v1';

export const DEFAULT_STUDENT: StudentProfile = {
  id: 'student-demo',
  name: 'Duygu Gezgini',
  classGrade: '6-B',
  studentNumber: '412'
};

export const DEFAULT_TEACHER: TeacherProfile = {
  id: 'teacher-demo',
  name: 'Ayşe Yılmaz',
  title: 'PDR & Rehberlik Danışmanı',
  email: 'ayse.rehberlik@meb.k12.tr',
  schoolName: 'Atatürk Ortaokulu',
  assignedClasses: ['5-A', '6-B', '7-C', '8-A']
};

export function loadUserRole(): UserRole | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ROLE);
    if (!raw) return 'student'; // default to student
    return JSON.parse(raw);
  } catch {
    return 'student';
  }
}

export function saveUserRole(role: UserRole | null) {
  try {
    if (role === null) {
      localStorage.removeItem(STORAGE_KEY_ROLE);
    } else {
      localStorage.setItem(STORAGE_KEY_ROLE, JSON.stringify(role));
    }
  } catch (err) {
    console.error('Failed to save user role', err);
  }
}

export function loadStudentProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENT);
    if (!raw) return DEFAULT_STUDENT;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_STUDENT;
  }
}

export function saveStudentProfile(profile: StudentProfile) {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save student profile', err);
  }
}

export function loadTeacherProfile(): TeacherProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEACHER);
    if (!raw) return DEFAULT_TEACHER;
    return JSON.parse(raw);
  } catch {
    return DEFAULT_TEACHER;
  }
}

export function saveTeacherProfile(profile: TeacherProfile) {
  try {
    localStorage.setItem(STORAGE_KEY_TEACHER, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to save teacher profile', err);
  }
}

export const DEFAULT_AVATAR: AvatarConfig = {
  id: 'avatar-user',
  name: 'Sevgili Gezgin',
  genderOrStyle: 'friendly',
  faceColor: '#fed7aa',
  hairStyle: 'fluffy',
  accessory: 'star',
  outfitColor: '#38bdf8',
  companionPet: 'bunny'
};

export const INITIAL_DEMO_ENTRIES: DiaryEntry[] = [
  {
    id: 'demo-1',
    date: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
    time: '16:30',
    timestamp: Date.now() - 6 * 86400000,
    emotion: 'mutlu',
    intensity: 8,
    causes: ['🏫 Okul ve Sınavlar', '👫 Arkadaşlarım'],
    note: 'Bugün fen bilgisi dersinde yaptığımız deney çok eğlenceliydi! Grup arkadaşlarımla birlikte birinci olduk ve öğretmenimiz bizi tebrik etti.',
    selfDiscoveryNote: 'Arkadaşlarımla iş birliği yaptığımda kendimi çok daha enerjik hissediyorum.',
    gratitudeNote: 'Grup arkadaşım Elif bana yardım etti, ona teşekkür ederim.'
  },
  {
    id: 'demo-2',
    date: new Date(Date.now() - 5 * 86400000).toISOString().split('T')[0],
    time: '19:15',
    timestamp: Date.now() - 5 * 86400000,
    emotion: 'karisik',
    intensity: 6,
    causes: ['📚 Dersler ve Ödevler', '💭 Gelecek Düşünceleri'],
    note: 'Haftaya yapılacak matematik sınavı için biraz endişelendim ama sonra ablamla birlikte soru çözünce biraz rahatladım.',
    selfDiscoveryNote: 'Soruları tek tek adım adım çözünce korkum azalıyor.',
    gratitudeNote: 'Ablamın bana sabırla matematik anlatması.'
  },
  {
    id: 'demo-3',
    date: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
    time: '15:45',
    timestamp: Date.now() - 4 * 86400000,
    emotion: 'huzurlu',
    intensity: 9,
    causes: ['🎨 Sanat ve Müzik', '🐾 Evcil Hayvanım'],
    note: 'Okuldan sonra kedim Pamuk ile balkonda oturduk ve sulu boya ile gün batımını çizdim. Çok sessiz ve güzel bir akşamdı.',
    selfDiscoveryNote: 'Resim çizmek zihnimi dinlendiriyor ve beni sakinleştiriyor.',
    gratitudeNote: 'Güneşin batarken oluşturduğu muhteşem renkler.'
  },
  {
    id: 'demo-4',
    date: new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0],
    time: '18:00',
    timestamp: Date.now() - 3 * 86400000,
    emotion: 'ofkeli',
    intensity: 7,
    causes: ['👫 Arkadaşlarım', '🎮 Oyun ve Hobilerim'],
    note: 'Teneffüste yakantop oynarken bir arkadaşım kurallara uymadı ve haksızlık yaptı. Çok sinirlendim ama bağırmak yerine derin nefes alıp oyundan çıktım.',
    selfDiscoveryNote: 'Öfkelendiğimde önce biraz uzaklaşmak kavga etmemi önlüyor.',
    gratitudeNote: 'Beni dinleyen can dostum Kerem.'
  },
  {
    id: 'demo-5',
    date: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
    time: '20:30',
    timestamp: Date.now() - 2 * 86400000,
    emotion: 'heyecanli',
    intensity: 9,
    causes: ['⚽ Spor ve Hareket', '👫 Arkadaşlarım'],
    note: 'Hafta sonu yapılacak basketbol turnuvası için takım kaptanı seçildim! Kalbim heyecandan pır pır atıyor.',
    selfDiscoveryNote: 'Yeni sorumluluklar almak beni cesaretlendiriyor.',
    gratitudeNote: 'Bana güvenen takım arkadaşlarım ve beden eğitimi öğretmenimiz.'
  },
  {
    id: 'demo-6',
    date: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
    time: '17:20',
    timestamp: Date.now() - 1 * 86400000,
    emotion: 'uzgun',
    intensity: 5,
    causes: ['💤 Uyku ve Yorgunluk', '🌦️ Hava Durumu'],
    note: 'Bütün gün yağmur yağdı ve dışarı çıkamadık. Kendimi biraz yorgun ve hüzünlü hissettim. Battaniyeye sarılıp sıcak çikolata içtim.',
    selfDiscoveryNote: 'Bazen hiçbir şey yapmadan sadece dinlenmeye ihtiyacım olabiliyor.',
    gratitudeNote: 'Annemin hazırladığı sıcak içecek.'
  }
];

export function loadDiaryEntries(): DiaryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ENTRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(INITIAL_DEMO_ENTRIES));
      return INITIAL_DEMO_ENTRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_ENTRIES;
  } catch {
    return INITIAL_DEMO_ENTRIES;
  }
}

export function saveDiaryEntries(entries: DiaryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY_ENTRIES, JSON.stringify(entries));
  } catch (err) {
    console.error('Failed to save entries', err);
  }
}

export function loadAvatarConfig(): AvatarConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AVATAR);
    if (!raw) return DEFAULT_AVATAR;
    return { ...DEFAULT_AVATAR, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_AVATAR;
  }
}

export function saveAvatarConfig(avatar: AvatarConfig) {
  try {
    localStorage.setItem(STORAGE_KEY_AVATAR, JSON.stringify(avatar));
  } catch (err) {
    console.error('Failed to save avatar', err);
  }
}

export interface UserSettings {
  soundEnabled: boolean;
  dailyReminderEnabled: boolean;
  reminderTime: string; // "19:00"
  userName: string;
  cloudSyncEnabled: boolean;
  lastCloudBackupDate?: string;
}

export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) {
      return {
        soundEnabled: true,
        dailyReminderEnabled: true,
        reminderTime: '19:00',
        userName: 'Öğrenci',
        cloudSyncEnabled: true,
        lastCloudBackupDate: new Date().toLocaleDateString('tr-TR')
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      soundEnabled: true,
      dailyReminderEnabled: true,
      reminderTime: '19:00',
      userName: 'Öğrenci',
      cloudSyncEnabled: true
    };
  }
}

export function saveSettings(settings: UserSettings) {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (err) {
    console.error('Failed to save settings', err);
  }
}

// Generate sample aggregated class data for Teacher Panel (ensuring privacy)
export function generateTeacherClassStats(entries: DiaryEntry[]) {
  const emotionCounts: Record<EmotionType, number> = {
    mutlu: 14,
    huzurlu: 9,
    heyecanli: 7,
    karisik: 6,
    uzgun: 4,
    ofkeli: 3,
    korkmus: 2,
    yalniz: 1
  };

  // blend with current student entries
  entries.forEach(e => {
    if (emotionCounts[e.emotion] !== undefined) {
      emotionCounts[e.emotion] += 1;
    }
  });

  const total = Object.values(emotionCounts).reduce((a, b) => a + b, 0);
  let mostFreq: EmotionType = 'mutlu';
  let maxCount = 0;

  (Object.keys(emotionCounts) as EmotionType[]).forEach(k => {
    if (emotionCounts[k] > maxCount) {
      maxCount = emotionCounts[k];
      mostFreq = k;
    }
  });

  return {
    className: '6-B Sınıfı Rehberlik Grubu',
    totalStudents: 28,
    totalEntriesRecorded: total,
    weeklyDistribution: emotionCounts,
    mostFrequentEmotion: mostFreq,
    positivityRatio: Math.round(((emotionCounts.mutlu + emotionCounts.huzurlu + emotionCounts.heyecanli) / total) * 100),
    topTriggers: [
      { trigger: 'Dersler ve Sınav Dönemi', percentage: 38 },
      { trigger: 'Arkadaş İlişkileri ve Paylaşım', percentage: 29 },
      { trigger: 'Oyun, Spor ve Hobiler', percentage: 21 },
      { trigger: 'Aile ve Ev Ortamı', percentage: 12 }
    ],
    weeklyAverageIntensity: 6.8
  };
}
