import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Printer, 
  Sparkles, 
  Smile, 
  AlertCircle,
  HelpCircle,
  Download,
  Calendar,
  Layers,
  HeartHandshake,
  Lightbulb,
  CheckCircle2,
  Filter,
  LogOut,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid,
  Legend
} from 'recharts';
import { DiaryEntry, EmotionType, TeacherProfile } from '../types';
import { generateTeacherClassStats } from '../utils/storage';
import { EMOTIONS } from '../data/emotions';
import { sound } from '../utils/audio';

interface TeacherDashboardProps {
  entries: DiaryEntry[];
  teacherProfile: TeacherProfile;
  onLogout: () => void;
  onSwitchToStudent?: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  entries,
  teacherProfile,
  onLogout,
  onSwitchToStudent
}) => {
  const [selectedClass, setSelectedClass] = useState<string>('6-B');
  const [activeTab, setActiveTab] = useState<'overview' | 'triggers' | 'pedagogy' | 'anonymizedEntries'>('overview');
  const [dateRange, setDateRange] = useState<'thisWeek' | 'thisMonth' | 'allTime'>('thisWeek');

  const stats = generateTeacherClassStats(entries);
  const mostFrequentDef = EMOTIONS.find(e => e.id === stats.mostFrequentEmotion) || EMOTIONS[0];

  const distributionData = Object.entries(stats.weeklyDistribution).map(([key, count]) => {
    const def = EMOTIONS.find(e => e.id === key);
    return {
      name: def?.label || key,
      adet: count,
      emoji: def?.emoji || '✨',
      fill: def?.color || '#3b82f6'
    };
  });

  const handlePrintReport = () => {
    sound.playPop();
    window.print();
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16">
      
      {/* Teacher Top Welcome & Profile Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-3xl shadow-xs">
              🏫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
                  Öğretmen & Rehberlik Dashboard'u
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  {teacherProfile.schoolName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Hoş geldiniz, <strong>{teacherProfile.name}</strong> ({teacherProfile.title})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Class Selector */}
            <div className="flex items-center gap-1.5 bg-[#FDFBF7] border border-stone-200 px-3 py-1.5 rounded-xl">
              <span className="text-xs font-bold text-stone-600">Sınıf:</span>
              <select
                value={selectedClass}
                onChange={(e) => {
                  sound.playPop();
                  setSelectedClass(e.target.value);
                }}
                className="font-bold text-xs bg-transparent text-stone-900 focus:outline-none cursor-pointer"
              >
                {teacherProfile.assignedClasses.map((cls) => (
                  <option key={cls} value={cls}>{cls} Sınıfı</option>
                ))}
              </select>
            </div>

            {/* Print Report */}
            <button
              onClick={handlePrintReport}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              title="Sınıf Raporunu Yazdır / PDF Al"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Rapor Yazdır</span>
            </button>

            {/* Switch / Logout */}
            <button
              onClick={() => {
                sound.playPop();
                onLogout();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              title="Oturumu Kapat"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>

        {/* KVKK / GDPR & Student Privacy Guarantee Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <span className="font-bold block">Öğrenci Mahremiyeti ve Pedagojik Güvenlik İlkesi</span>
            <p className="text-emerald-900 leading-relaxed">
              Öğretmen paneli, öğrencilerin kişisel günlük yazılarını kesinlikle deşifre etmez. Yalnızca <strong>{selectedClass} sınıfının</strong> toplu, anonimleştirilmiş duygu frekanslarını ve çevresel tetikleyicileri göstererek rehberlik ve sınıf içi destek stratejileri geliştirmenize yardımcı olur.
            </p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 pt-2 overflow-x-auto">
          {[
            { id: 'overview', label: '📊 Sınıf İklimi & Dağılım', icon: BarChart3 },
            { id: 'triggers', label: '🎯 Tetikleyici Analizi', icon: Layers },
            { id: 'pedagogy', label: '💡 Pedagojik Eylem Planı', icon: Lightbulb },
            { id: 'anonymizedEntries', label: '📝 Anonim İhtiyaç Özetleri', icon: BookOpen }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPop();
                setActiveTab(tab.id as any);
              }}
              className={`pb-3 px-3.5 text-xs sm:text-sm font-heading font-extrabold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'border-amber-600 text-amber-900'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

      </div>

      {/* --- TAB 1: OVERVIEW & CLIMATE STATS --- */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4.5 border border-stone-200 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Sınıf Mevcudu / Aktif Katılım
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-stone-900 font-heading">
                  {stats.totalStudents}
                </span>
                <span className="text-xs text-stone-500">öğrenci ({stats.totalEntriesRecorded} kayıt)</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4.5 border border-stone-200 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Genel Pozitiflik Oranı
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-emerald-700 font-heading">
                  %{stats.positivityRatio}
                </span>
                <span className="text-xs text-emerald-600 font-medium">İyi durumda ☀️</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4.5 border border-stone-200 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                En Baskın Duygu
              </span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{mostFrequentDef.emoji}</span>
                <span className="text-lg font-extrabold text-stone-800 font-heading">
                  {mostFrequentDef.label}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4.5 border border-stone-200 shadow-2xs space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Haftalık Duygu Şiddeti Ortalaması
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-amber-700 font-heading">
                  {stats.weeklyAverageIntensity} / 10
                </span>
                <span className="text-xs text-stone-500">orta-yüksek</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Bar Chart */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-heading font-extrabold text-base text-stone-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-600" />
                <span>{selectedClass} Sınıfı Duygu Dağılımı (Kayıt Adedi)</span>
              </h3>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-25} textAnchor="end" />
                    <YAxis tick={{ fontSize: 11, fill: '#64748b' }} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }}
                      formatter={(val: number) => [`${val} Giriş`, 'Sıklık']}
                    />
                    <Bar dataKey="adet" radius={[6, 6, 0, 0]}>
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
              <h3 className="font-heading font-extrabold text-base text-stone-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span>Duygu İklimi Yüzdelik Oranı</span>
              </h3>
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      dataKey="adet"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      innerRadius={40}
                      paddingAngle={3}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`pie-cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* --- TAB 2: TRIGGERS ANALYSIS --- */}
      {activeTab === 'triggers' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-stone-900">
              Sınıf Genelinde En Çok Etkili Olan Tetikleyiciler
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Öğrencilerin günlüklere kaydettiği duyguların altında yatan ana neden kategorileri.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            {stats.topTriggers.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm font-bold text-stone-800">
                  <span>{item.trigger}</span>
                  <span className="text-amber-800">%{item.percentage}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-stone-100 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm leading-relaxed">
            <strong>Rehberlik Yorumu:</strong> Sınav dönemlerinde ders kaygısı %38 seviyesine ulaşmaktadır. Bu süreçte sınıf rehberlik saatlerinde zaman yönetimi ve sınav kaygısını azaltıcı nefes çalışmaları yapılması önerilir.
          </div>
        </div>
      )}

      {/* --- TAB 3: PEDAGOGICAL ACTION PLAN --- */}
      {activeTab === 'pedagogy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-stone-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              <span>Haftalık Pedagojik Sınıf Eylem & Etkinlik Planı</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Mevcut duygu dağılımına göre sınıf içi uygulanabilecek 15-20 dakikalık rehberlik etkinlikleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4.5 rounded-2xl bg-[#FDFBF7] border border-stone-200 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-xs font-bold">1. Etkinlik</span>
                <h4 className="font-heading font-bold text-sm text-stone-900">Duygu Çemberi ve Empati Paylaşımı</h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Her öğrencinin konuşma nesnesini alıp günün bir kelimelik hissini ve nedenini yargılanmadan paylaştığı 15 dakikalık sabah çemberi.
              </p>
              <div className="text-[11px] font-semibold text-stone-500 pt-1">
                🎯 Kazanım: Akran empatisini güçlendirme ve kabul hissi.
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#FDFBF7] border border-stone-200 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-bold">2. Etkinlik</span>
                <h4 className="font-heading font-bold text-sm text-stone-900">Sınıf Başarı & Şükran Ağacı</h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Öğrencilerin birbirlerine teşekkür ettikleri ya da derste başardıkları küçük bir anı yaprak şeklindeki kağıtlara yazıp panoya astıkları etkinlik.
              </p>
              <div className="text-[11px] font-semibold text-stone-500 pt-1">
                🎯 Kazanım: Olumlu sınıf iklimi ve aidiyet duygusu.
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#FDFBF7] border border-stone-200 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-xs font-bold">3. Etkinlik</span>
                <h4 className="font-heading font-bold text-sm text-stone-900">3 Dakikalık Balon Nefesi Molası</h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ders geçişlerinde veya sınav öncesinde tüm sınıfın gözlerini kapatıp ritmik 4-4-4 nefes egzersizi uygulaması.
              </p>
              <div className="text-[11px] font-semibold text-stone-500 pt-1">
                🎯 Kazanım: Fizyolojik regülasyon ve odaklanma.
              </div>
            </div>

            <div className="p-4.5 rounded-2xl bg-[#FDFBF7] border border-stone-200 space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-bold">4. Etkinlik</span>
                <h4 className="font-heading font-bold text-sm text-stone-900">Öfkeyi Resmetme ve Dönüştürme</h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Zorlayıcı duyguları renkler ve çizgilerle kağıda döküp ardından arkasına çözüm adımı yazma sanatsal çalışması.
              </p>
              <div className="text-[11px] font-semibold text-stone-500 pt-1">
                🎯 Kazanım: Duygusal dışavurum ve problem çözme.
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- TAB 4: ANONYMIZED THEMES --- */}
      {activeTab === 'anonymizedEntries' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-stone-900">
              Sınıf İçi Öne Çıkan Duygusal İhtiyaç Alanları (Anonim Özet)
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Öğrencilerin isimleri gizli tutularak derlenen ortak gelişim temaları.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                theme: 'Akran Kabulü ve Grup Oyunlarında Dışlanma Endişesi',
                frequency: 'Yüksek (8 öğrenci bildirdi)',
                recommendation: 'Beden eğitimi ve serbest etkinlik saatlerinde karma takımlar kurularak rotasyonlu oyunlar planlanmalı.',
                tag: 'Sosyal Uyum'
              },
              {
                theme: 'Hata Yapma Korkusu & Mükemmeliyetçilik',
                frequency: 'Orta (5 öğrenci bildirdi)',
                recommendation: '"Hata yapmak beynin öğrenme şeklidir" temalı beyin gelişimi semineri önerilir.',
                tag: 'Özgüven'
              },
              {
                theme: 'Turnuva ve Gösteri Öncesi Pozitif Heyecan',
                frequency: 'Yüksek (12 öğrenci bildirdi)',
                recommendation: 'Takım motivasyonunu pekiştirecek tebrik panosu hazırlanabilir.',
                tag: 'Başarı & Neşe'
              }
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-200 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-heading font-bold text-sm text-stone-900">
                    {item.theme}
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-medium">
                  <strong>Sıklık:</strong> {item.frequency}
                </p>
                <p className="text-xs text-stone-700 bg-white p-2.5 rounded-xl border border-stone-200/60">
                  <strong>Önerilen Rehberlik Müdahalesi:</strong> {item.recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
