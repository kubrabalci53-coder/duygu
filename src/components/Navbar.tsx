import React, { useState, useRef, useEffect } from 'react';
import { 
  Heart, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Sparkles, 
  BookMarked, 
  Smile, 
  User, 
  GraduationCap, 
  Volume2, 
  VolumeX, 
  Cloud, 
  PenTool, 
  LifeBuoy, 
  Share2, 
  ExternalLink,
  ChevronDown,
  FileText,
  Presentation
} from 'lucide-react';
import { AvatarConfig } from '../types';
import { AvatarIllustration } from './AvatarIllustration';
import { sound } from '../utils/audio';

export type ActiveTab = 
  | 'yaz' 
  | 'gunluk' 
  | 'takvim' 
  | 'grafik' 
  | 'kesfet' 
  | 'sozluk' 
  | 'moral' 
  | 'avatar' 
  | 'ogretmen';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  avatar: AvatarConfig;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  onOpenSync: () => void;
  onOpenSupport: () => void;
  streakCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  avatar,
  soundEnabled,
  setSoundEnabled,
  onOpenSync,
  onOpenSupport,
  streakCount
}) => {
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const shareDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareDropdownRef.current && !shareDropdownRef.current.contains(event.target as Node)) {
        setIsShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.setMuted(!next);
    if (next) {
      sound.playPop();
    }
  };

  const shareLinks = [
    {
      id: 'gamma-presentation',
      title: 'Çocuklarda Duygusal Gelişim',
      subtitle: 'Araştırma Temelli Yaklaşımlar (Gamma Sunumu)',
      url: 'https://gamma.app/docs/Cocuklarda-Duygusal-Gelisim-Arastrma-Temelli-Yaklasmlar-ax9x7wtrglwdx3w',
      badge: 'Sunum & Rehber',
      badgeColor: 'bg-orange-100 text-orange-800',
      icon: Presentation
    },
    {
      id: 'google-doc',
      title: 'Duygu Günlüğü Paylaşım Dokümanı',
      subtitle: 'Google Dokümanlar Notları & Çalışma Rehberi',
      url: 'https://docs.google.com/document/d/1wuHSoJ_6MV2SLI8f8WgW8SeikX3hyVGdF7FIl89b5yo/edit?usp=sharing',
      badge: 'Google Dokümanı',
      badgeColor: 'bg-sky-100 text-sky-800',
      icon: FileText
    }
  ];

  const navItems = [
    { id: 'yaz', label: 'Bugün Nasıl Hissediyorsun?', shortLabel: 'Günlük Yaz', icon: PenTool, color: 'text-orange-600 bg-orange-50' },
    { id: 'gunluk', label: 'Duygu Günlüğüm', shortLabel: 'Günlüğüm', icon: BookOpen, color: 'text-stone-700 bg-stone-100' },
    { id: 'takvim', label: 'Duygu Takvimi', shortLabel: 'Takvim', icon: Calendar, color: 'text-sky-700 bg-sky-50' },
    { id: 'grafik', label: 'Duygu Grafikleri & Analitik', shortLabel: 'Grafikler', icon: BarChart3, color: 'text-emerald-700 bg-emerald-50' },
    { id: 'kesfet', label: 'Kendimi Keşfediyorum', shortLabel: 'Keşfet', icon: Sparkles, color: 'text-amber-700 bg-amber-50' },
    { id: 'sozluk', label: 'Duygu Sözlüğü & Makaleler', shortLabel: 'Rehberler', icon: BookMarked, color: 'text-purple-700 bg-purple-50' },
    { id: 'moral', label: 'Moral & Gülümseme', shortLabel: 'Gülümse', icon: Smile, color: 'text-rose-700 bg-rose-50' },
    { id: 'avatar', label: 'Karakterim', shortLabel: 'Avatarım', icon: User, color: 'text-teal-700 bg-teal-50' },
    { id: 'ogretmen', label: 'Öğretmen Paneli', shortLabel: 'Öğretmen', icon: GraduationCap, color: 'text-stone-800 bg-stone-100' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Bar with Brand & Slogan */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left: Paylaşımlar Dropdown & Brand Logo */}
          <div className="flex items-center gap-2.5 sm:gap-4 flex-shrink-0">
            {/* Paylaşımlar Dropdown Container */}
            <div className="relative" ref={shareDropdownRef}>
              <button
                id="top-left-paylasimlar-btn"
                type="button"
                onClick={() => {
                  sound.playPop();
                  setIsShareOpen(!isShareOpen);
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer select-none group ${
                  isShareOpen ? 'ring-2 ring-orange-400 ring-offset-2' : ''
                }`}
                title="Paylaşılan kaynakları görüntüle"
                aria-expanded={isShareOpen}
              >
                <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Paylaşımlar</span>
                <span className="w-5 h-5 rounded-full bg-white/25 text-[10px] flex items-center justify-center font-extrabold ml-0.5">
                  {shareLinks.length}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isShareOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu Panel */}
              {isShareOpen && (
                <div className="absolute left-0 mt-2.5 w-72 sm:w-84 bg-white rounded-2xl shadow-xl border border-stone-200 py-2.5 z-50 animate-fadeIn">
                  <div className="px-3.5 py-1.5 border-b border-stone-100 mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                      Paylaşılan Kaynaklar & Rehberler
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">Yeni Sekmede Açılır</span>
                  </div>

                  <div className="space-y-1 px-1.5">
                    {shareLinks.map((link) => {
                      const IconComponent = link.icon;
                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            sound.playPop();
                            setIsShareOpen(false);
                          }}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-stone-50 transition-all group/item border border-transparent hover:border-stone-200/80"
                        >
                          <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-700 flex items-center justify-center flex-shrink-0 group-hover/item:scale-105 transition-transform shadow-2xs">
                            <IconComponent className="w-4.5 h-4.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs sm:text-sm font-bold text-stone-900 group-hover/item:text-orange-700 transition-colors truncate">
                                {link.title}
                              </span>
                              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover/item:text-orange-600 flex-shrink-0" />
                            </div>
                            <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                              {link.subtitle}
                            </p>
                            <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold ${link.badgeColor}`}>
                              {link.badge}
                            </span>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Logo & Slogan */}
            <div 
              id="brand-logo-button"
              onClick={() => {
                sound.playPop();
                setActiveTab('yaz');
              }}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-orange-200/50 group-hover:scale-105 transition-transform duration-200">
                <span className="text-xl sm:text-2xl">✨</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight text-stone-900">
                    Duygu Günlüğüm
                  </span>
                  <span className="hidden md:inline-block px-2 py-0.5 text-[11px] font-semibold bg-orange-100 text-orange-800 rounded-full">
                    Çocuk & Genç Dostu
                  </span>
                </div>
                <p className="hidden sm:block text-xs font-medium text-stone-500 tracking-wide italic">
                  “Duygularını fark et, kendini keşfet.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Action Icons & Avatar Pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Streak Badge */}
            <div 
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-full text-xs font-semibold shadow-xs"
              title={`${streakCount} gündür aralıksız duygu günlüğü tutuyorsun!`}
            >
              <span className="text-sm">🔥</span>
              <span>{streakCount} Günlük Seri</span>
            </div>

            {/* Support & Emergency Help Helplines Button */}
            <button
              id="nav-support-safety-btn"
              onClick={() => {
                sound.playPop();
                onOpenSupport();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-orange-800 bg-orange-100/90 hover:bg-orange-200 border border-orange-300 rounded-full transition-colors cursor-pointer"
              title="Güvenlik, Destek & Rehberlik Hatları (ALO 183 / 112)"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-orange-700 animate-pulse" />
              <span className="hidden sm:inline">Destek & Hatlar</span>
            </button>

            {/* Cloud Sync Button */}
            <button
              id="nav-cloud-sync-btn"
              onClick={() => {
                sound.playPop();
                onOpenSync();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors cursor-pointer"
              title="Bulut Senkronizasyonu & Yedekleme"
            >
              <Cloud className="w-3.5 h-3.5 text-sky-700" />
              <span className="hidden sm:inline">Yedekle / Eşitle</span>
            </button>

            {/* Sound Toggle */}
            <button
              id="nav-sound-toggle-btn"
              onClick={toggleSound}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                soundEnabled 
                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                  : 'bg-stone-100 text-stone-400 hover:bg-stone-200'
              }`}
              title={soundEnabled ? 'Ses Efektleri Açık' : 'Ses Efektleri Kapalı'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* User Avatar Mini Widget */}
            <button
              id="nav-avatar-btn"
              onClick={() => {
                sound.playPop();
                setActiveTab('avatar');
              }}
              className="flex items-center gap-2 p-1 pl-2 pr-3 bg-stone-100/90 hover:bg-stone-200/90 border border-stone-200 rounded-full transition-all cursor-pointer"
            >
              <AvatarIllustration config={avatar} size="sm" animate={false} />
              <span className="hidden sm:inline text-xs font-semibold text-stone-800 max-w-[80px] truncate">
                {avatar.name}
              </span>
            </button>
          </div>
        </div>

        {/* Horizontal Navigation Pills (Scrollable on mobile) */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar border-t border-stone-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-pill-${item.id}`}
                onClick={() => {
                  sound.playPop();
                  setActiveTab(item.id as ActiveTab);
                }}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs scale-102'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-stone-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
