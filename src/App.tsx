/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  DiaryEntry, 
  AvatarConfig, 
  EmotionType,
  UserRole,
  StudentProfile,
  TeacherProfile
} from './types';
import { 
  loadDiaryEntries, 
  saveDiaryEntries, 
  loadAvatarConfig, 
  saveAvatarConfig, 
  loadSettings, 
  saveSettings,
  loadUserRole,
  saveUserRole,
  loadStudentProfile,
  saveStudentProfile,
  loadTeacherProfile,
  saveTeacherProfile,
  UserSettings 
} from './utils/storage';
import { Navbar, ActiveTab } from './components/Navbar';
import { EmotionSelector } from './components/EmotionSelector';
import { DiaryTimeline } from './components/DiaryTimeline';
import { EmotionCalendar } from './components/EmotionCalendar';
import { EmotionCharts } from './components/EmotionCharts';
import { SelfDiscovery } from './components/SelfDiscovery';
import { ArticlesView } from './components/ArticlesView';
import { AvatarCreator } from './components/AvatarCreator';
import { CheerUpModal } from './components/CheerUpModal';
import { EmotionVideoModal } from './components/EmotionVideoModal';
import { CloudSyncModal } from './components/CloudSyncModal';
import { SupportSafetyModal } from './components/SupportSafetyModal';
import { AuthPortal } from './components/AuthPortal';
import { TeacherDashboard } from './components/TeacherDashboard';
import { sound } from './utils/audio';

export default function App() {
  // Auth & Roles State
  const [userRole, setUserRole] = useState<UserRole | null>(() => loadUserRole());
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => loadStudentProfile());
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile>(() => loadTeacherProfile());

  // Student Navigation & Data State
  const [activeTab, setActiveTab] = useState<ActiveTab>('yaz');
  const [entries, setEntries] = useState<DiaryEntry[]>(() => loadDiaryEntries());
  const [avatar, setAvatar] = useState<AvatarConfig>(() => loadAvatarConfig());
  const [settings, setSettings] = useState<UserSettings>(() => loadSettings());

  // Modals state
  const [isCheerUpOpen, setIsCheerUpOpen] = useState<boolean>(false);
  const [cheerUpEmotion, setCheerUpEmotion] = useState<EmotionType>('uzgun');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [videoModalEmotion, setVideoModalEmotion] = useState<EmotionType>('mutlu');
  const [isSyncOpen, setIsSyncOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);

  // Sync settings with sound engine
  useEffect(() => {
    sound.setMuted(!settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Auth actions
  const handleLoginStudent = (profile: StudentProfile) => {
    setStudentProfile(profile);
    saveStudentProfile(profile);
    setUserRole('student');
    saveUserRole('student');
    setActiveTab('yaz');
  };

  const handleLoginTeacher = (profile: TeacherProfile) => {
    setTeacherProfile(profile);
    saveTeacherProfile(profile);
    setUserRole('teacher');
    saveUserRole('teacher');
  };

  const handleLogout = () => {
    setUserRole(null);
    saveUserRole(null);
  };

  // Persist entries
  const handleSaveEntry = (newEntryData: Omit<DiaryEntry, 'id' | 'timestamp'>) => {
    const newEntry: DiaryEntry = {
      ...newEntryData,
      id: 'entry-' + Date.now(),
      timestamp: Date.now()
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    saveDiaryEntries(updated);
  };

  const handleUpdateEntry = (updatedEntry: DiaryEntry) => {
    const updated = entries.map(e => e.id === updatedEntry.id ? updatedEntry : e);
    setEntries(updated);
    saveDiaryEntries(updated);
  };

  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    saveDiaryEntries(updated);
  };

  const handleSaveAvatar = (newAvatar: AvatarConfig) => {
    setAvatar(newAvatar);
    saveAvatarConfig(newAvatar);
  };

  const handleRestoreData = (newEntries: DiaryEntry[], newAvatar?: AvatarConfig) => {
    setEntries(newEntries);
    saveDiaryEntries(newEntries);
    if (newAvatar) {
      setAvatar(newAvatar);
      saveAvatarConfig(newAvatar);
    }
  };

  const handleUpdateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const openCheerUpModal = (emotion: EmotionType = 'uzgun') => {
    setCheerUpEmotion(emotion);
    setIsCheerUpOpen(true);
  };

  const openVideoRecommendations = (emotion: EmotionType = 'mutlu') => {
    setVideoModalEmotion(emotion);
    setIsVideoModalOpen(true);
  };

  // Calculate Streak count
  const calculateStreak = (): number => {
    if (entries.length === 0) return 0;
    const uniqueDates = Array.from(new Set(entries.map(e => e.date))).sort().reverse();
    return Math.max(1, uniqueDates.length);
  };

  const streakCount = calculateStreak();

  // If user is not logged in, render the Auth Portal (Student / Teacher Login separation)
  if (!userRole) {
    return (
      <AuthPortal
        onLoginStudent={handleLoginStudent}
        onLoginTeacher={handleLoginTeacher}
        currentAvatar={avatar}
      />
    );
  }

  // --- TEACHER VIEW ---
  if (userRole === 'teacher') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EE] to-[#FEF2E8] text-stone-800 flex flex-col selection:bg-amber-300 selection:text-amber-950 relative overflow-x-hidden">
        
        {/* Energetic Background light bursts */}
        <div className="fixed top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="fixed bottom-1/4 left-10 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Teacher Top Navigation */}
        <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center text-white text-xl shadow-xs">
                ✨
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-heading font-extrabold text-lg text-stone-900">
                    Duygu Günlüğüm
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    Öğretmen & Rehberlik Modu
                  </span>
                </div>
                <p className="text-xs text-stone-500 italic">
                  “Duygularını fark et, kendini keşfet.”
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sound.playPop();
                  setUserRole('student');
                  saveUserRole('student');
                }}
                className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                title="Öğrenci arayüzünü incele"
              >
                <span>🧒 Öğrenci Görünümüne Geç</span>
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  handleLogout();
                }}
                className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </header>

        {/* Dedicated Teacher Dashboard */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <TeacherDashboard
            entries={entries}
            teacherProfile={teacherProfile}
            onLogout={handleLogout}
            onSwitchToStudent={() => {
              setUserRole('student');
              saveUserRole('student');
            }}
          />
        </main>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-xs border-t border-stone-200 mt-auto py-6 text-center text-xs text-stone-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span>Duygu Günlüğüm — Öğretmen & Rehberlik Portalı</span>
            <span>🔒 KVKK Uyumlu & Anonim İklim Analitiği</span>
          </div>
        </footer>

      </div>
    );
  }

  // --- STUDENT VIEW ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EE] to-[#FEF2E8] text-stone-800 flex flex-col selection:bg-amber-300 selection:text-amber-950 relative overflow-x-hidden">
      
      {/* Subtle energetic warm light bursts */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 left-10 w-80 h-80 bg-orange-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Navigation Bar with Logo, Slogan, Student Profile & Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        avatar={avatar}
        studentProfile={studentProfile}
        soundEnabled={settings.soundEnabled}
        setSoundEnabled={(val) => handleUpdateSettings({ ...settings, soundEnabled: val })}
        onOpenSync={() => setIsSyncOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onLogout={handleLogout}
        streakCount={streakCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'yaz' && (
          <EmotionSelector
            onSaveEntry={handleSaveEntry}
            avatar={avatar}
            onOpenCheerUp={openCheerUpModal}
            onOpenVideoRecommendations={openVideoRecommendations}
          />
        )}

        {activeTab === 'gunluk' && (
          <DiaryTimeline
            entries={entries}
            onDeleteEntry={handleDeleteEntry}
            onUpdateEntry={handleUpdateEntry}
            onNavigateToWrite={() => setActiveTab('yaz')}
          />
        )}

        {activeTab === 'takvim' && (
          <EmotionCalendar
            entries={entries}
            onSelectDateToAdd={(_dateStr) => {
              setActiveTab('yaz');
            }}
          />
        )}

        {activeTab === 'grafik' && (
          <EmotionCharts entries={entries} />
        )}

        {activeTab === 'kesfet' && (
          <SelfDiscovery entries={entries} />
        )}

        {activeTab === 'sozluk' && (
          <ArticlesView />
        )}

        {activeTab === 'moral' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-stone-200 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center text-3xl mx-auto shadow-xs">
                🌈
              </div>
              <h2 className="text-2xl font-extrabold text-stone-900 font-heading">
                Moral, Video & Gülümseme Köşesi
              </h2>
              <p className="text-sm text-stone-500 max-w-md mx-auto">
                Bazen hepimiz yorulur ya da üzülebiliriz. Nefes egzersizleri, eğitici sevimli videolar, karikatürler ve neşeli fıkralarla moralini yükseltmek için aşağıdaki araçları kullanabilirsin!
              </p>
              
              <div className="flex items-center justify-center gap-3 flex-wrap pt-2">
                <button
                  onClick={() => openVideoRecommendations('mutlu')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-extrabold text-sm shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>🎬 Duygu & Rehberlik Videoları</span>
                </button>

                <button
                  onClick={() => openCheerUpModal('uzgun')}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-extrabold text-sm shadow-md hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Gülümseme & Rahatlama Aracını Aç ✨</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'avatar' && (
          <AvatarCreator
            avatar={avatar}
            onSaveAvatar={handleSaveAvatar}
          />
        )}
      </main>

      {/* Recommended Video Suggestion Modal (Triggered after emotion entry or via buttons) */}
      <EmotionVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        emotion={videoModalEmotion}
      />

      {/* Cheer Up Modal */}
      <CheerUpModal
        isOpen={isCheerUpOpen}
        onClose={() => setIsCheerUpOpen(false)}
        triggeredEmotion={cheerUpEmotion}
      />

      {/* Cloud Sync & Backup Modal */}
      <CloudSyncModal
        isOpen={isSyncOpen}
        onClose={() => setIsSyncOpen(false)}
        entries={entries}
        avatar={avatar}
        settings={settings}
        onRestoreData={handleRestoreData}
        onUpdateSettings={handleUpdateSettings}
      />

      {/* Official Safety & Emergency Support Modal */}
      <SupportSafetyModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xs border-t border-stone-200 mt-auto py-8 text-center text-xs text-stone-500 space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-extrabold text-stone-800 text-sm">
              Duygu Günlüğüm
            </span>
            <span>—</span>
            <span className="italic font-medium text-stone-600">
              “Duygularını fark et, kendini keşfet.”
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-500 flex-wrap justify-center">
            <button
              onClick={() => {
                sound.playPop();
                setIsSupportOpen(true);
              }}
              className="text-orange-700 hover:text-orange-900 font-bold underline cursor-pointer"
            >
              🆘 Destek & Rehberlik Hatları (ALO 183 / 112)
            </button>
            <span>•</span>
            <span>🔒 Çocuk Dostu & KVKK Uyumlu Güvenli Alan</span>
            <span>•</span>
            <span>🌱 Pedagojik Farkındalık Aracı</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
