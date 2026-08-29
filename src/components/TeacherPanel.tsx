import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  BarChart3, 
  TrendingUp, 
  Lock, 
  Unlock, 
  Printer, 
  Sparkles, 
  Smile, 
  AlertCircle,
  HelpCircle,
  Download
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
import { DiaryEntry, EmotionType } from '../types';
import { generateTeacherClassStats } from '../utils/storage';
import { EMOTIONS } from '../data/emotions';
import { sound } from '../utils/audio';

interface TeacherPanelProps {
  entries: DiaryEntry[];
}

export const TeacherPanel: React.FC<TeacherPanelProps> = ({ entries }) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(true);
  const [passcode, setPasscode] = useState<string>('');
  const [activeClassTab, setActiveClassTab] = useState<'overview' | 'triggers' | 'pedagogy'>('overview');

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
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Teacher Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
              🏫
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
                  Öğretmen & Rehberlik Paneli
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                  {stats.className}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Sınıfın genel duygu iklimini anonim ve toplu olarak analiz eden rehberlik gösterge paneli.
              </p>
            </div>
          </div>

          <button
            id="print-class-report-btn"
            onClick={handlePrintReport}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Sınıf İklim Raporunu Yazdır</span>
          </button>
        </div>

        {/* KVKK / GDPR & Student Privacy Guarantee Banner */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <p className="font-extrabold text-emerald-900">
              🔒 Öğrenci Gizliliği & Güvenliği Taahhüdü
            </p>
            <p className="text-emerald-800 leading-relaxed">
              Öğrencilerin yazdığı özel günlük metinleri ve kişisel notlar <strong>öğretmen ekranında asla gösterilmez</strong>. 
              Panel yalnızca pedagojik rehberlik ve sınıf iklimini değerlendirmek amacıyla <em>tamamen anonimleştirilmiş toplu istatistikleri</em> sunar.
            </p>
          </div>
        </div>
      </div>

      {/* Class Level Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Total Students */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Öğrenci Sayısı</span>
            <Users className="w-4 h-4 text-stone-600" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900 font-heading">
            {stats.totalStudents} <span className="text-xs font-medium text-stone-400">Aktif</span>
          </p>
          <span className="text-[11px] text-stone-500">Kayıtlı öğrenci mevcudu</span>
        </div>

        {/* Most Frequent Emotion */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Haftanın Hissi</span>
            <span className="text-xl">{mostFrequentDef.emoji}</span>
          </div>
          <p className="text-xl font-extrabold text-stone-900 font-heading">
            {mostFrequentDef.label}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold">Sınıfta en çok bildirilen</span>
        </div>

        {/* Positivity Index */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Pozitif İklim</span>
            <Smile className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-extrabold text-amber-950 font-heading">
            %{stats.positivityRatio}
          </p>
          <span className="text-[11px] text-stone-500">Mutlu/Huzurlu/Heyecanlı payı</span>
        </div>

        {/* Avg Emotional Depth */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Duygu Yoğunluğu</span>
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-2xl font-extrabold text-stone-900 font-heading">
            {stats.weeklyAverageIntensity} <span className="text-xs font-medium text-stone-400">/ 10</span>
          </p>
          <span className="text-[11px] text-stone-500">Sınıf ortalaması</span>
        </div>

      </div>

      {/* Class Emotion Distribution Bar Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-stone-700" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-800">
              Haftalık Anonim Duygu Dağılımı 📊
            </h3>
          </div>
          <span className="text-xs text-stone-400">Toplam {stats.totalEntriesRecorded} anonim bildirim</span>
        </div>

        <div className="h-64 sm:h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={distributionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" vertical={false} />
              <XAxis dataKey="name" stroke="#a8a29e" fontSize={11} tickLine={false} />
              <YAxis stroke="#a8a29e" fontSize={11} tickLine={false} allowDecimals={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '14px', fontSize: '12px', fontWeight: 600, border: '1px solid #e7e5e4' }}
                formatter={(val: any) => [`${val} öğrenci bildirimi`, 'Adet']}
              />
              <Bar dataKey="adet" radius={[8, 8, 0, 0]}>
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Triggers & Pedagogical Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Triggers Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-800 flex items-center gap-2">
            <span>🎯</span>
            <span>Sınıf Duygularını En Çok Etkileyen Faktörler</span>
          </h3>

          <div className="space-y-3 pt-2">
            {stats.topTriggers.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-stone-700">
                  <span>{item.trigger}</span>
                  <span className="text-orange-700">%{item.percentage}</span>
                </div>
                <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pedagogical Guidance for Teachers */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-800 flex items-center gap-2">
            <span>💡</span>
            <span>Öğretmen & Rehberlik İçin Haftalık Tavsiyeler</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-stone-700">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
              <span className="text-base">🧘</span>
              <p>
                <strong>Ders Başında 1 Dk Nefes:</strong> Sınav veya zorlu dersler öncesi sınıfla birlikte 4-4-4 nefes egzersizi yapmak odaklanmayı artırır.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
              <span className="text-base">🤝</span>
              <p>
                <strong>İş Birlikçi Oyunlar:</strong> Arkadaşlık temalı grup çalışmaları sınıftaki 'yalnız' veya 'karışık' hissetme oranlarını azaltır.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 flex items-start gap-2.5">
              <span className="text-base">📢</span>
              <p>
                <strong>Güvenli İletişim Hatırlatması:</strong> Zor duygular yaşayan öğrencilere rehberlik servisinin kapısının her zaman açık olduğunu hatırlatın.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
