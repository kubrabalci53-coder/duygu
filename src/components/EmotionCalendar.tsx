import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Info,
  Clock,
  Heart,
  Plus
} from 'lucide-react';
import { DiaryEntry, EmotionType } from '../types';
import { EMOTIONS } from '../data/emotions';
import { sound } from '../utils/audio';

interface EmotionCalendarProps {
  entries: DiaryEntry[];
  onSelectDateToAdd: (dateStr: string) => void;
}

export const EmotionCalendar: React.FC<EmotionCalendarProps> = ({
  entries,
  onSelectDateToAdd
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDayEntries, setSelectedDayEntries] = useState<DiaryEntry[] | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string>(new Date().toISOString().split('T')[0]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const daysOfWeek = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  const handlePrevMonth = () => {
    sound.playPop();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    sound.playPop();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Generate calendar grid
  const firstDayOfMonth = new Date(year, month, 1);
  // Monday is 0 in Turkish calendar standard
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Create date cells
  const calendarCells: {
    dayNum: number;
    isCurrentMonth: boolean;
    dateString: string;
    entries: DiaryEntry[];
  }[] = [];

  // Previous month padding
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i;
    const prevMonthDate = new Date(year, month - 1, d);
    const dateStr = prevMonthDate.toISOString().split('T')[0];
    calendarCells.push({
      dayNum: d,
      isCurrentMonth: false,
      dateString: dateStr,
      entries: entries.filter(e => e.date === dateStr)
    });
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    const curDate = new Date(year, month, d);
    // Format YYYY-MM-DD safely
    const monthFormatted = String(month + 1).padStart(2, '0');
    const dayFormatted = String(d).padStart(2, '0');
    const dateStr = `${year}-${monthFormatted}-${dayFormatted}`;
    calendarCells.push({
      dayNum: d,
      isCurrentMonth: true,
      dateString: dateStr,
      entries: entries.filter(e => e.date === dateStr)
    });
  }

  // Next month padding to complete 35 or 42 grid cells
  const remainingCells = 35 - calendarCells.length;
  if (remainingCells > 0) {
    for (let d = 1; d <= remainingCells; d++) {
      const nextMonthDate = new Date(year, month + 1, d);
      const dateStr = nextMonthDate.toISOString().split('T')[0];
      calendarCells.push({
        dayNum: d,
        isCurrentMonth: false,
        dateString: dateStr,
        entries: entries.filter(e => e.date === dateStr)
      });
    }
  }

  const handleCellClick = (cell: typeof calendarCells[0]) => {
    sound.playPop();
    setSelectedDateStr(cell.dateString);
    if (cell.entries.length > 0) {
      setSelectedDayEntries(cell.entries);
    } else {
      setSelectedDayEntries([]);
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];

  // Month stats
  const currentMonthEntries = entries.filter(e => {
    const d = new Date(e.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Calendar Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <CalendarIcon className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
                Duygu Takvimi 📅
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Her günün ana duygusunu renkli emojilerle takip et, günlere tıklayarak notlarını oku.
            </p>
          </div>

          {/* Month Switcher */}
          <div className="flex items-center gap-2 bg-stone-100 p-1.5 rounded-2xl self-start sm:self-auto">
            <button
              id="prev-month-btn"
              onClick={handlePrevMonth}
              className="p-2 rounded-xl hover:bg-white text-stone-600 transition-colors cursor-pointer"
              title="Önceki Ay"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-extrabold text-stone-800 px-3 font-heading min-w-[120px] text-center">
              {monthNames[month]} {year}
            </span>
            <button
              id="next-month-btn"
              onClick={handleNextMonth}
              className="p-2 rounded-xl hover:bg-white text-stone-600 transition-colors cursor-pointer"
              title="Sonraki Ay"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Emotion Color Legend */}
        <div className="flex flex-wrap items-center gap-2 pt-5 border-t border-stone-100 mt-5">
          <span className="text-xs font-bold text-stone-500 mr-1">Duygu Renkleri:</span>
          {EMOTIONS.map(e => (
            <span
              key={e.id}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${e.badgeBg}`}
            >
              <span>{e.emoji}</span>
              <span>{e.label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid View & Day Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Calendar Grid (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-3">
          
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-heading font-extrabold text-xs text-stone-400 pb-2">
            {daysOfWeek.map((day, idx) => (
              <div key={idx} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Cells */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarCells.map((cell, idx) => {
              const isToday = cell.dateString === todayStr;
              const isSelected = cell.dateString === selectedDateStr;
              const primaryEntry = cell.entries[0];
              const emotionDef = primaryEntry ? EMOTIONS.find(e => e.id === primaryEntry.emotion) : null;

              return (
                <div
                  key={idx}
                  id={`calendar-cell-${cell.dateString}`}
                  onClick={() => handleCellClick(cell)}
                  className={`min-h-[64px] sm:min-h-[78px] p-1.5 sm:p-2 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none relative ${
                    isSelected
                      ? 'border-orange-600 bg-orange-50/60 ring-2 ring-orange-500/20 shadow-xs'
                      : cell.isCurrentMonth
                      ? 'bg-stone-50/70 border-stone-200 hover:bg-stone-100/90 hover:border-stone-300'
                      : 'bg-stone-100/30 border-transparent text-stone-300 opacity-60'
                  }`}
                >
                  {/* Day Number + Today Badge */}
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${
                      isToday
                        ? 'w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]'
                        : cell.isCurrentMonth
                        ? 'text-stone-700'
                        : 'text-stone-400'
                    }`}>
                      {cell.dayNum}
                    </span>

                    {cell.entries.length > 1 && (
                      <span className="text-[9px] font-bold px-1 rounded bg-stone-200 text-stone-700">
                        +{cell.entries.length}
                      </span>
                    )}
                  </div>

                  {/* Emotion Emoji and indicator */}
                  {emotionDef ? (
                    <div className="flex flex-col items-center justify-center py-0.5">
                      <span className="text-xl sm:text-2xl drop-shadow-xs transition-transform hover:scale-125">
                        {emotionDef.emoji}
                      </span>
                      <span className={`text-[10px] font-bold truncate max-w-full hidden sm:block ${emotionDef.textColor}`}>
                        {emotionDef.label}
                      </span>
                    </div>
                  ) : (
                    cell.isCurrentMonth && (
                      <div className="h-5 flex items-center justify-center opacity-0 hover:opacity-100 text-stone-300">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>

          {/* Month Summary Bar */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-3 border-t border-stone-100">
            <span>
              Bu ay toplam <strong>{currentMonthEntries.length}</strong> gün günlüğüne duygu yazdın! 🌟
            </span>
            <span className="font-semibold text-orange-700">
              Başarı Oranı: %{Math.min(100, Math.round((currentMonthEntries.length / daysInMonth) * 100))}
            </span>
          </div>
        </div>

        {/* Selected Day Details Panel (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs space-y-4 flex flex-col">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Seçilen Günün Detayı
            </span>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-800">
              {new Date(selectedDateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </h3>
          </div>

          {/* Entries for that day */}
          {selectedDayEntries && selectedDayEntries.length > 0 ? (
            <div className="space-y-3 overflow-y-auto max-h-[360px] pr-1">
              {selectedDayEntries.map((entry) => {
                const emotionDef = EMOTIONS.find(e => e.id === entry.emotion) || EMOTIONS[0];
                return (
                  <div
                    key={entry.id}
                    className={`p-4 rounded-2xl bg-gradient-to-br ${emotionDef.bgGradient} border ${emotionDef.borderColor} space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{emotionDef.emoji}</span>
                        <div>
                          <span className={`font-bold text-sm ${emotionDef.textColor}`}>
                            {emotionDef.label}
                          </span>
                          <span className="text-[10px] text-stone-400 block font-medium">
                            Saat {entry.time}
                          </span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-white/80 text-stone-700">
                        {entry.intensity}/10
                      </span>
                    </div>

                    {/* Note */}
                    <p className="text-xs text-stone-700 bg-white/70 p-2.5 rounded-xl leading-relaxed whitespace-pre-wrap">
                      {entry.note}
                    </p>

                    {/* Self discovery note if any */}
                    {entry.selfDiscoveryNote && (
                      <p className="text-[11px] text-amber-950 bg-amber-100/60 p-2 rounded-lg font-medium">
                        💡 {entry.selfDiscoveryNote}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 text-stone-400 flex items-center justify-center text-2xl">
                🍃
              </div>
              <p className="text-xs sm:text-sm text-stone-500 font-medium">
                Bu gün için henüz bir duygu kaydı bulunmuyor.
              </p>
              <button
                id="add-entry-for-date-btn"
                onClick={() => {
                  sound.playPop();
                  onSelectDateToAdd(selectedDateStr);
                }}
                className="px-4 py-2 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              >
                + Bu Güne Günlük Ekle
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
