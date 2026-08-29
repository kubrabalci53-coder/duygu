import React, { useState } from 'react';
import { 
  GraduationCap, 
  Sparkles, 
  User, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Smile, 
  BookOpen, 
  Heart,
  School,
  KeyRound
} from 'lucide-react';
import { UserRole, StudentProfile, TeacherProfile, AvatarConfig } from '../types';
import { AvatarIllustration } from './AvatarIllustration';
import { sound } from '../utils/audio';

interface AuthPortalProps {
  onLoginStudent: (profile: StudentProfile) => void;
  onLoginTeacher: (profile: TeacherProfile) => void;
  currentAvatar: AvatarConfig;
}

export const AuthPortal: React.FC<AuthPortalProps> = ({
  onLoginStudent,
  onLoginTeacher,
  currentAvatar
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  
  // Student form state
  const [studentName, setStudentName] = useState<string>('Duygu Gezgini');
  const [studentClass, setStudentClass] = useState<string>('6-B');
  const [studentNumber, setStudentNumber] = useState<string>('412');

  // Teacher form state
  const [teacherEmail, setTeacherEmail] = useState<string>('ayse.rehberlik@meb.k12.tr');
  const [teacherPassword, setTeacherPassword] = useState<string>('1234');
  const [teacherName, setTeacherName] = useState<string>('Ayşe Öğretmen');
  const [teacherTitle, setTeacherTitle] = useState<string>('PDR & Rehberlik Danışmanı');
  const [teacherSchool, setTeacherSchool] = useState<string>('Atatürk Ortaokulu');
  const [authError, setAuthError] = useState<string>('');

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setAuthError('Lütfen bir isim veya takma ad giriniz.');
      return;
    }
    sound.playSuccessFanfare();
    onLoginStudent({
      id: 'student-' + Date.now(),
      name: studentName.trim(),
      studentNumber: studentNumber.trim() || undefined,
      classGrade: studentClass,
      avatarConfig: currentAvatar
    });
  };

  const handleTeacherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherEmail.trim()) {
      setAuthError('Lütfen öğretmen e-posta adresinizi giriniz.');
      return;
    }
    if (!teacherPassword.trim()) {
      setAuthError('Lütfen şifrenizi giriniz.');
      return;
    }
    sound.playSuccessFanfare();
    onLoginTeacher({
      id: 'teacher-' + Date.now(),
      name: teacherName.trim() || 'Rehber Öğretmen',
      title: teacherTitle,
      email: teacherEmail.trim(),
      schoolName: teacherSchool,
      assignedClasses: ['5-A', '6-B', '7-C', '8-A']
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDF9] via-[#FFF8EE] to-[#FEF2E8] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Energetic Warm Bursts */}
      <div className="fixed top-10 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* App Title & Slogan Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 text-white text-3xl shadow-lg shadow-orange-300/50 mb-1">
            ✨
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-heading tracking-tight">
            Duygu Günlüğüm
          </h1>
          <p className="text-sm sm:text-base font-medium text-stone-600 max-w-md mx-auto italic">
            “Duygularını fark et, kendini keşfet.”
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Güvenli, Çocuk ve Eğitimci Dostu Alan</span>
          </div>
        </div>

        {/* Role Switcher Tabs */}
        <div className="flex justify-center">
          <div className="bg-stone-200/80 p-1.5 rounded-2xl flex items-center gap-2 shadow-inner max-w-md w-full">
            <button
              type="button"
              id="role-select-student-tab"
              onClick={() => {
                sound.playPop();
                setSelectedRole('student');
                setAuthError('');
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-heading font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-white text-stone-900 shadow-md scale-102'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span className="text-lg">🧒</span>
              <span>Öğrenci Girişi</span>
            </button>

            <button
              type="button"
              id="role-select-teacher-tab"
              onClick={() => {
                sound.playPop();
                setSelectedRole('teacher');
                setAuthError('');
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-heading font-extrabold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === 'teacher'
                  ? 'bg-white text-stone-900 shadow-md scale-102'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <GraduationCap className="w-4.5 h-4.5 text-amber-700" />
              <span>Öğretmen Girişi</span>
            </button>
          </div>
        </div>

        {authError && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold text-center">
            {authError}
          </div>
        )}

        {/* --- STUDENT LOGIN CARD --- */}
        {selectedRole === 'student' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl max-w-xl mx-auto space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center text-2xl shadow-xs">
                  🎒
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 font-heading">
                    Öğrenci Giriş Portalı
                  </h2>
                  <p className="text-xs text-stone-500">
                    Kişisel günlüğüne yazmak ve duygularını keşfetmek için giriş yap.
                  </p>
                </div>
              </div>

              {/* Avatar Preview */}
              <div className="flex flex-col items-center">
                <AvatarIllustration config={currentAvatar} currentEmotion="mutlu" size="sm" />
                <span className="text-[10px] font-bold text-stone-500 mt-1">{currentAvatar.name}</span>
              </div>
            </div>

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Adın veya Takma Adın:
                </label>
                <input
                  type="text"
                  id="student-name-input"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Örn: Deniz, Can, Rüya..."
                  className="w-full px-4 py-3 bg-[#FDFBF7] border border-stone-200 rounded-xl font-bold text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Sınıfın:
                  </label>
                  <select
                    id="student-class-select"
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                    className="w-full px-3.5 py-3 bg-[#FDFBF7] border border-stone-200 rounded-xl font-bold text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="4-A">4-A Sınıfı</option>
                    <option value="5-A">5-A Sınıfı</option>
                    <option value="5-B">5-B Sınıfı</option>
                    <option value="6-A">6-A Sınıfı</option>
                    <option value="6-B">6-B Sınıfı</option>
                    <option value="7-A">7-A Sınıfı</option>
                    <option value="7-B">7-B Sınıfı</option>
                    <option value="8-A">8-A Sınıfı</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Okul Numaran (İsteğe Bağlı):
                  </label>
                  <input
                    type="text"
                    id="student-number-input"
                    value={studentNumber}
                    onChange={(e) => setStudentNumber(e.target.value)}
                    placeholder="Örn: 412"
                    className="w-full px-3.5 py-3 bg-[#FDFBF7] border border-stone-200 rounded-xl font-bold text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-stone-500 block mb-1.5">
                  Hızlı Demo Profilleri:
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Duygu Gezgini', 'Ali Yıldız (6-B)', 'Zeynep Kaya (5-A)', 'Kerem Demir (7-B)'].map((name, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        const cleanName = name.split(' (')[0];
                        setStudentName(cleanName);
                      }}
                      className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 rounded-lg transition-colors cursor-pointer"
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Privacy Reassurance */}
              <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-[11px] text-amber-950 flex items-center gap-2">
                <span className="text-base">🔒</span>
                <span>Yazdığın günlükler tamamen sana özeldir ve güvenle saklanır.</span>
              </div>

              <button
                type="submit"
                id="submit-student-login-btn"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-amber-700 text-white font-heading font-extrabold text-base shadow-md hover:shadow-lg hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Duygu Dünyama Giriş Yap ✨</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

          </div>
        )}

        {/* --- TEACHER / COUNSELOR LOGIN CARD --- */}
        {selectedRole === 'teacher' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xl max-w-xl mx-auto space-y-6 animate-fadeIn">
            
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl shadow-xs">
                  🏫
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 font-heading">
                      Öğretmen & Rehberlik Giriş Portalı
                    </h2>
                  </div>
                  <p className="text-xs text-stone-500">
                    Sınıf iklim analizi, duygu dağılımları ve pedagojik raporlama dashboard'u.
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                PDR & Yönetim
              </span>
            </div>

            <form onSubmit={handleTeacherSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Öğretmen E-Posta / MEBBİS Kodu:
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="teacher-email-input"
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="ornek.ogretmen@meb.k12.tr"
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-stone-200 rounded-xl font-bold text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <User className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Öğretmen Giriş Şifresi:
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="teacher-password-input"
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#FDFBF7] border border-stone-200 rounded-xl font-bold text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    required
                  />
                  <KeyRound className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
                </div>
                <p className="text-[11px] text-stone-400 mt-1">
                  Demo için herhangi bir şifre veya varsayılan <span className="font-mono font-bold text-stone-600">1234</span> kullanabilirsiniz.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Ad Soyad:
                  </label>
                  <input
                    type="text"
                    id="teacher-name-input"
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-stone-200 rounded-xl font-bold text-xs sm:text-sm text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Görevi / Branşı:
                  </label>
                  <input
                    type="text"
                    id="teacher-title-input"
                    value={teacherTitle}
                    onChange={(e) => setTeacherTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FDFBF7] border border-stone-200 rounded-xl font-bold text-xs sm:text-sm text-stone-900"
                  />
                </div>
              </div>

              {/* Fast 1-Click Demo Fill */}
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
                <span className="text-xs text-stone-600 font-medium">
                  Hızlı Demo Öğretmen Hesabı:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    sound.playPop();
                    setTeacherEmail('ayse.rehberlik@meb.k12.tr');
                    setTeacherName('Ayşe Yılmaz');
                    setTeacherTitle('PDR & Rehberlik Danışmanı');
                    setTeacherPassword('1234');
                  }}
                  className="px-3 py-1 bg-white border border-stone-300 text-stone-800 text-xs font-bold rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                >
                  Bilgileri Doldur
                </button>
              </div>

              {/* Legal / KVKK Privacy Guarantee */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-950 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>Öğretmen paneli, öğrencilerin kişisel günlük metinlerini değil, yalnızca anonim ve sınıf genel duygu dağılımlarını gösterir.</span>
              </div>

              <button
                type="submit"
                id="submit-teacher-login-btn"
                className="w-full py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-heading font-extrabold text-base shadow-md hover:shadow-lg hover:scale-101 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 text-amber-400" />
                <span>Öğretmen Dashboard'una Giriş Yap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
