import React, { useState } from 'react';
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
  AreaChart, 
  Area,
  CartesianGrid,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  PieChart as PieIcon, 
  Activity, 
  Sparkles, 
  Smile, 
  Calendar,
  Award,
  Compass
} from 'lucide-react';
import { DiaryEntry, EmotionType } from '../types';
import { EMOTIONS } from '../data/emotions';
import { sound } from '../utils/audio';

interface EmotionChartsProps {
  entries: DiaryEntry[];
}

export const EmotionCharts: React.FC<EmotionChartsProps> = ({ entries }) => {
  const [timeRange, setTimeRange] = useState<'7' | '30' | 'all'>('7');

  // Filter entries based on time range
  const now = Date.now();
  const rangeDays = timeRange === '7' ? 7 : timeRange === '30' ? 30 : 365;
  const filteredEntries = entries.filter(e => {
    const entryDate = new Date(e.date).getTime();
    return now - entryDate <= rangeDays * 86400000;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // 1. Emotion distribution calculation (Pie chart data)
  const emotionCounts: Record<EmotionType, number> = {
    mutlu: 0,
    uzgun: 0,
    ofkeli: 0,
    korkmus: 0,
    huzurlu: 0,
    karisik: 0,
    heyecanli: 0,
    yalniz: 0
  };

  filteredEntries.forEach(e => {
    if (emotionCounts[e.emotion] !== undefined) {
      emotionCounts[e.emotion] += 1;
    }
  });

  const pieData = Object.entries(emotionCounts)
    .filter(([_, count]) => count > 0)
    .map(([key, count]) => {
      const def = EMOTIONS.find(e => e.id === key);
      return {
        name: def?.label || key,
        value: count,
        color: def?.color || '#94a3b8',
        emoji: def?.emoji || '✨'
      };
    });

  // 2. Timeline Intensity chart data
  const intensityData = filteredEntries.map(e => {
    const def = EMOTIONS.find(em => em.id === e.emotion);
    const dateObj = new Date(e.date);
    return {
      date: `${dateObj.getDate()} ${dateObj.toLocaleDateString('tr-TR', { month: 'short' })}`,
      yoğunluk: e.intensity,
      duygu: def?.label || e.emotion,
      emoji: def?.emoji
    };
  });

  // 3. Most frequent emotion
  let mostFrequentEmotion = EMOTIONS[0];
  let maxCount = 0;
  Object.entries(emotionCounts).forEach(([key, count]) => {
    if (count > maxCount) {
      maxCount = count;
      const found = EMOTIONS.find(e => e.id === key);
      if (found) mostFrequentEmotion = found;
    }
  });

  // 4. Positive vs Reflective ratio
  const positiveCount = (emotionCounts.mutlu || 0) + (emotionCounts.huzurlu || 0) + (emotionCounts.heyecanli || 0);
  const totalInPeriod = filteredEntries.length || 1;
  const positivityPercent = Math.round((positiveCount / totalInPeriod) * 100);

  // Average intensity
  const avgIntensity = (
    filteredEntries.reduce((acc, curr) => acc + curr.intensity, 0) / totalInPeriod
  ).toFixed(1);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
              Duygu Grafikleri & Analitik 📊
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Duygularının zaman içindeki yolculuğunu, iniş çıkışlarını ve en sık yaşadığın hisleri keşfet.
          </p>
        </div>

        {/* Time Filter Pills */}
        <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl self-start sm:self-auto">
          {[
            { id: '7', label: 'Son 7 Gün' },
            { id: '30', label: 'Son 30 Gün' },
            { id: 'all', label: 'Tüm Zamanlar' }
          ].map(tab => (
            <button
              key={tab.id}
              id={`chart-range-${tab.id}`}
              onClick={() => {
                sound.playPop();
                setTimeRange(tab.id as '7' | '30' | 'all');
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                timeRange === tab.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stat Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Most frequent */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex items-center gap-4">
          <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${mostFrequentEmotion.bgGradient} flex items-center justify-center text-3xl shadow-xs flex-shrink-0`}>
            {mostFrequentEmotion.emoji}
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              En Sık Hissedilen
            </span>
            <h4 className="font-heading font-extrabold text-lg text-stone-800">
              {mostFrequentEmotion.label}
            </h4>
            <p className="text-xs text-stone-500">{maxCount} kez kaydedildi</p>
          </div>
        </div>

        {/* Positivity / Sunshine Ratio */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs flex-shrink-0">
            ☀️
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Neşeli & Huzurlu Günler
            </span>
            <h4 className="font-heading font-extrabold text-lg text-amber-950">
              %{positivityPercent}
            </h4>
            <p className="text-xs text-stone-500">Pozitif enerji oranı</p>
          </div>
        </div>

        {/* Average Intensity */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-orange-100 text-orange-800 flex items-center justify-center text-2xl shadow-xs flex-shrink-0">
            ⚡
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
              Ortalama Yoğunluk
            </span>
            <h4 className="font-heading font-extrabold text-lg text-stone-900">
              {avgIntensity} <span className="text-xs font-medium text-stone-400">/ 10</span>
            </h4>
            <p className="text-xs text-stone-500">Duygu derinliği puanı</p>
          </div>
        </div>
      </div>

      {/* Chart 1: Emotion Intensity Timeline (Wave / Area) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-600" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-800">
              Duygu Yoğunluğu Değişimi 🌊
            </h3>
          </div>
          <span className="text-xs text-stone-400 font-medium">1 (Hafif) — 10 (Çok Yoğun)</span>
        </div>

        <p className="text-xs text-stone-500">
          Zaman içinde duygularının ne kadar güçlü yükselip indiğini gösteren dalga grafiği.
        </p>

        {intensityData.length > 0 ? (
          <div className="h-64 sm:h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intensityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="intensityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#ea580c" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f4" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#a8a29e" 
                  fontSize={11} 
                  tickLine={false} 
                />
                <YAxis 
                  domain={[0, 10]} 
                  stroke="#a8a29e" 
                  fontSize={11} 
                  tickLine={false} 
                  ticks={[2, 4, 6, 8, 10]} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: '1px solid #e7e5e4', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)', 
                    fontSize: '12px',
                    fontWeight: 600,
                    backgroundColor: '#ffffff'
                  }}
                  formatter={(value: any, name: any, item: any) => [
                    `${value} / 10 (${item.payload.emoji} ${item.payload.duygu})`, 
                    'Yoğunluk'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="yoğunluk" 
                  stroke="#ea580c" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#intensityGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-xs text-stone-400">
            Grafik oluşturmak için en az 1 günlük kaydı gerekiyor.
          </div>
        )}
      </div>

      {/* Chart 2 & 3: Emotion Distribution Donut & Most Frequent Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Donut Distribution */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-orange-600" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-800">
              Duygu Dağılımı 🎨
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            Seçilen dönemde hangi duyguları ne oranda yaşadığının renkli dairesi.
          </p>

          {pieData.length > 0 ? (
            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', fontSize: '12px', fontWeight: 600, border: '1px solid #e7e5e4' }}
                    formatter={(val: any) => [`${val} kez`, 'Adet']}
                  />
                  <Legend 
                    formatter={(val) => <span className="text-xs font-semibold text-stone-700">{val}</span>} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-xs text-stone-400">
              Veri yok.
            </div>
          )}
        </div>

        {/* Emotion Frequency Bar Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Smile className="w-5 h-5 text-amber-600" />
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-800">
              Duygu Sayıları 📊
            </h3>
          </div>
          <p className="text-xs text-stone-500">
            Hissedilen duyguların tekrar adetleri:
          </p>

          <div className="space-y-2.5 pt-2">
            {EMOTIONS.map(e => {
              const count = emotionCounts[e.id] || 0;
              const percent = totalInPeriod > 0 ? Math.round((count / totalInPeriod) * 100) : 0;
              return (
                <div key={e.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-700">
                    <span className="flex items-center gap-1.5">
                      <span>{e.emoji}</span>
                      <span>{e.label}</span>
                    </span>
                    <span className="text-stone-500">{count} gün (%{percent})</span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${percent}%`, 
                        backgroundColor: e.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
