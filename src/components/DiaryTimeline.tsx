import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  Calendar, 
  Clock, 
  Smile, 
  Sparkles, 
  Lightbulb, 
  Printer, 
  AlertCircle,
  X,
  Check,
  ChevronDown
} from 'lucide-react';
import { DiaryEntry, EmotionType } from '../types';
import { EMOTIONS } from '../data/emotions';
import { sound } from '../utils/audio';

interface DiaryTimelineProps {
  entries: DiaryEntry[];
  onDeleteEntry: (id: string) => void;
  onUpdateEntry: (entry: DiaryEntry) => void;
  onNavigateToWrite: () => void;
}

export const DiaryTimeline: React.FC<DiaryTimelineProps> = ({
  entries,
  onDeleteEntry,
  onUpdateEntry,
  onNavigateToWrite
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterEmotion, setFilterEmotion] = useState<string>('all');
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Filtered and sorted entries (chronological - newest first)
  const filteredEntries = entries
    .filter(entry => {
      const matchesEmotion = filterEmotion === 'all' || entry.emotion === filterEmotion;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        entry.note.toLowerCase().includes(q) ||
        (entry.selfDiscoveryNote && entry.selfDiscoveryNote.toLowerCase().includes(q)) ||
        entry.causes.some(c => c.toLowerCase().includes(q)) ||
        (entry.customCause && entry.customCause.toLowerCase().includes(q));
      return matchesEmotion && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time || '00:00'}`).getTime();
      const dateB = new Date(`${b.date}T${b.time || '00:00'}`).getTime();
      return (dateB || b.timestamp || 0) - (dateA || a.timestamp || 0);
    });

  const handlePrint = () => {
    sound.playPop();
    window.print();
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;
    onUpdateEntry(editingEntry);
    sound.playSuccessFanfare();
    setEditingEntry(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Header & Controls Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
              Duygu Günlüğüm 📖
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Geçmiş duygularını, farkındalık notlarını ve duygu yoğunluklarını buradan inceleyebilirsin.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="print-diary-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              title="Günlüğü Yazdır / PDF Kaydet"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF</span>
            </button>

            <button
              id="add-new-entry-btn"
              onClick={() => {
                sound.playPop();
                onNavigateToWrite();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>+ Yeni Kayıt</span>
            </button>
          </div>
        </div>

        {/* Search & Filter bar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
          {/* Search Input */}
          <div className="sm:col-span-7 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="diary-search-input"
              type="text"
              placeholder="Günlük notlarında veya sebeplerde ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800"
            />
          </div>

          {/* Emotion Filter Dropdown */}
          <div className="sm:col-span-5 relative">
            <select
              id="emotion-filter-select"
              value={filterEmotion}
              onChange={(e) => {
                sound.playPop();
                setFilterEmotion(e.target.value);
              }}
              className="w-full pl-3.5 pr-8 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 appearance-none font-medium cursor-pointer"
            >
              <option value="all">Tüm Duygular ({entries.length})</option>
              {EMOTIONS.map(e => {
                const count = entries.filter(item => item.emotion === e.id).length;
                return (
                  <option key={e.id} value={e.id}>
                    {e.emoji} {e.label} ({count})
                  </option>
                );
              })}
            </select>
            <ChevronDown className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Entries List */}
      {filteredEntries.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-stone-200 text-center space-y-3 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-3xl flex items-center justify-center mx-auto">
            📝
          </div>
          <h3 className="font-heading font-bold text-lg text-stone-800">
            Henüz Eşleşen Kayıt Bulunamadı
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
            Arama filtreni değiştirebilir veya günün ilk duygu kaydını hemen oluşturabilirsin!
          </p>
          <button
            onClick={() => {
              sound.playPop();
              onNavigateToWrite();
            }}
            className="mt-2 px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-xs hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Günlük Yazmaya Başla ✨
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.map((entry) => {
            const emotionDef = EMOTIONS.find(e => e.id === entry.emotion) || EMOTIONS[0];
            const isDeleting = deleteConfirmId === entry.id;

            return (
              <div
                key={entry.id}
                id={`diary-card-${entry.id}`}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Entry Top Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {/* Big Emotion Emoji circle */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${emotionDef.bgGradient} border ${emotionDef.borderColor} flex items-center justify-center text-2xl shadow-xs`}>
                      {emotionDef.emoji}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-heading font-extrabold text-base sm:text-lg ${emotionDef.textColor}`}>
                          {emotionDef.label}
                        </span>
                        {/* Intensity Badge */}
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-700 border border-stone-200">
                          Yoğunluk: <strong className="text-orange-600">{entry.intensity}/10</strong>
                        </span>
                      </div>

                      {/* Date & Time */}
                      <div className="flex items-center gap-3 text-xs text-stone-400 mt-0.5 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          {new Date(entry.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          {entry.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions (Edit / Delete) */}
                  <div className="flex items-center gap-1">
                    <button
                      id={`edit-entry-${entry.id}`}
                      onClick={() => {
                        sound.playPop();
                        setEditingEntry(entry);
                      }}
                      className="p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
                      title="Kaydı Düzenle"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      id={`delete-entry-${entry.id}`}
                      onClick={() => {
                        sound.playPop();
                        setDeleteConfirmId(entry.id);
                      }}
                      className="p-2 rounded-xl text-stone-400 hover:text-orange-600 hover:bg-orange-50 transition-colors cursor-pointer"
                      title="Kaydı Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Causes & Tags */}
                {(entry.causes.length > 0 || entry.customCause) && (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.causes.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700">
                        {c}
                      </span>
                    ))}
                    {entry.customCause && (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                        ✨ {entry.customCause}
                      </span>
                    )}
                  </div>
                )}

                {/* Free Note Body */}
                <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-stone-200 text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {entry.note}
                </div>

                {/* Optional Self Discovery Box */}
                {entry.selfDiscoveryNote && (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-amber-950 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900 block text-xs">
                        Kendimle İlgili Fark Ettiğim Şey:
                      </span>
                      <p className="mt-0.5 text-stone-700">
                        {entry.selfDiscoveryNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Delete Confirmation Inline Overlay */}
                {isDeleting && (
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 flex flex-col sm:flex-row items-center justify-between gap-3 animate-fadeIn">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <span>Bu günlük kaydını silmek istediğinden emin misin?</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 cursor-pointer"
                      >
                        Vazgeç
                      </button>
                      <button
                        onClick={() => {
                          sound.playPop();
                          onDeleteEntry(entry.id);
                          setDeleteConfirmId(null);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-orange-600 text-white hover:bg-orange-700 shadow-xs cursor-pointer"
                      >
                        Evet, Sil
                      </button>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Edit Entry Modal */}
      {editingEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl border border-stone-200 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-heading font-extrabold text-lg text-stone-800">
                Günlük Kaydını Düzenle ✍️
              </h3>
              <button
                onClick={() => setEditingEntry(null)}
                className="p-1 rounded-full text-stone-400 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              {/* Emotion Selector */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  Duygu:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {EMOTIONS.map(e => (
                    <button
                      type="button"
                      key={e.id}
                      onClick={() => setEditingEntry({ ...editingEntry, emotion: e.id })}
                      className={`p-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                        editingEntry.emotion === e.id
                          ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <span>{e.emoji}</span>
                      <span>{e.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-stone-700">
                    Duygu Yoğunluğu (1-10):
                  </label>
                  <span className="text-xs font-bold text-orange-600">{editingEntry.intensity} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={editingEntry.intensity}
                  onChange={(e) => setEditingEntry({ ...editingEntry, intensity: Number(e.target.value) })}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Günlük Notun:
                </label>
                <textarea
                  rows={3}
                  value={editingEntry.note}
                  onChange={(e) => setEditingEntry({ ...editingEntry, note: e.target.value })}
                  className="w-full p-3 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-amber-500 text-stone-800"
                />
              </div>

              {/* Self discovery */}
              <div>
                <label className="block text-xs font-bold text-amber-950 mb-1">
                  Fark Ettiğim Şey:
                </label>
                <input
                  type="text"
                  value={editingEntry.selfDiscoveryNote || ''}
                  onChange={(e) => setEditingEntry({ ...editingEntry, selfDiscoveryNote: e.target.value })}
                  className="w-full p-2.5 text-xs sm:text-sm bg-amber-50/50 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setEditingEntry(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 shadow-xs cursor-pointer"
                >
                  Değişiklikleri Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
