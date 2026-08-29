import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Download, 
  Upload, 
  ShieldCheck, 
  RefreshCw, 
  Check, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { DiaryEntry, AvatarConfig } from '../types';
import { UserSettings, INITIAL_DEMO_ENTRIES } from '../utils/storage';
import { sound } from '../utils/audio';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: DiaryEntry[];
  avatar: AvatarConfig;
  settings: UserSettings;
  onRestoreData: (entries: DiaryEntry[], avatar?: AvatarConfig) => void;
  onUpdateSettings: (settings: UserSettings) => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  entries,
  avatar,
  settings,
  onRestoreData,
  onUpdateSettings
}) => {
  const [syncInProgress, setSyncInProgress] = useState<boolean>(false);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);
  const [importErrorMessage, setImportErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Export JSON file download
  const handleExportJSON = () => {
    sound.playPop();
    const backupData = {
      app: 'Duygu Günlüğüm',
      version: '1.0',
      exportedAt: new Date().toISOString(),
      avatar,
      entriesCount: entries.length,
      entries
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Duygu_Gunlugum_Yedek_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    sound.playSuccessFanfare();
    setSyncSuccessMessage('Yedek dosyan başarıyla indirildi! 📥');
    setTimeout(() => setSyncSuccessMessage(null), 3000);
  };

  // Import JSON file upload
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.entries && Array.isArray(parsed.entries)) {
          onRestoreData(parsed.entries, parsed.avatar);
          sound.playSuccessFanfare();
          setSyncSuccessMessage(`Başarılı! ${parsed.entries.length} adet günlük kaydı geri yüklendi.`);
          setImportErrorMessage(null);
          setTimeout(() => setSyncSuccessMessage(null), 4000);
        } else {
          setImportErrorMessage('Geçersiz dosya formatı. Lütfen "Duygu Günlüğüm" yedek dosyası seçin.');
        }
      } catch (err) {
        setImportErrorMessage('Dosya okunamadı. Lütfen geçerli bir JSON dosyası yükleyin.');
      }
    };
    reader.readAsText(file);
  };

  // Simulated Cloud Sync
  const handleTriggerCloudSync = () => {
    sound.playPop();
    setSyncInProgress(true);
    setTimeout(() => {
      setSyncInProgress(false);
      sound.playSuccessFanfare();
      const updatedDate = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString('tr-TR');
      onUpdateSettings({
        ...settings,
        lastCloudBackupDate: updatedDate
      });
      setSyncSuccessMessage(`Bulut senkronizasyonu tamamlandı (${updatedDate}). ☁️`);
      setTimeout(() => setSyncSuccessMessage(null), 3500);
    }, 1500);
  };

  // Reset to Demo data
  const handleResetDemoData = () => {
    sound.playPop();
    if (window.confirm('Örnek okul projesi verilerine sıfırlamak istiyor musun?')) {
      onRestoreData(INITIAL_DEMO_ENTRIES);
      sound.playSuccessFanfare();
      setSyncSuccessMessage('Örnek sunum verileri başarıyla yüklendi!');
      setTimeout(() => setSyncSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
              ☁️
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg">
                Bulut Senkronizasyonu & Yedekleme
              </h3>
              <p className="text-xs text-amber-200/90 font-medium">
                Duygu günlüğünü güvende tut ve istediğin zaman geri yükle.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Notification Messages */}
          {syncSuccessMessage && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{syncSuccessMessage}</span>
            </div>
          )}

          {importErrorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>{importErrorMessage}</span>
            </div>
          )}

          {/* Cloud Sync Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FDFBF7] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-stone-900 block">
                  Güvenli Bulut Yedekleme
                </span>
                <span className="text-xs text-stone-500">
                  Son yedekleme: {settings.lastCloudBackupDate || 'Henüz yapılmadı'}
                </span>
              </div>
              <button
                id="cloud-sync-trigger-btn"
                onClick={handleTriggerCloudSync}
                disabled={syncInProgress}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-900 text-white hover:bg-stone-800 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncInProgress ? 'animate-spin' : ''}`} />
                <span>{syncInProgress ? 'Eşitleniyor...' : 'Şimdi Eşitle'}</span>
              </button>
            </div>
          </div>

          {/* Export / Import Section */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-sm text-stone-800">
              Manuel Yedekleme Seçenekleri
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Export JSON */}
              <button
                id="export-json-backup-btn"
                onClick={handleExportJSON}
                className="p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left space-y-1 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <Download className="w-5 h-5 text-amber-700 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">JSON</span>
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-stone-800 block">Yedeği İndir</span>
                  <span className="text-[11px] text-stone-500">{entries.length} kayıt içerir</span>
                </div>
              </button>

              {/* Import JSON */}
              <label
                htmlFor="import-json-file"
                className="p-4 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-left space-y-1 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div className="flex items-center justify-between w-full">
                  <Upload className="w-5 h-5 text-stone-700 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-800">Geri Yükle</span>
                </div>
                <div>
                  <span className="font-bold text-xs sm:text-sm text-stone-800 block">Dosyadan Yükle</span>
                  <span className="text-[11px] text-stone-500">Yedek dosyasını seç</span>
                </div>
                <input
                  id="import-json-file"
                  type="file"
                  accept=".json"
                  onChange={handleImportJSON}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Reset Demo Data Button */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500">Sunum için örnek veriler:</span>
            <button
              id="reset-demo-data-btn"
              onClick={handleResetDemoData}
              className="text-xs font-bold text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              Örnek Verileri Yükle
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-stone-700 bg-white border border-stone-200 rounded-xl hover:bg-stone-100 transition-colors cursor-pointer"
          >
            Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
