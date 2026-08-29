import React from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  HeartHandshake, 
  LifeBuoy, 
  X, 
  Lock, 
  ExternalLink,
  Users,
  AlertTriangle
} from 'lucide-react';
import { sound } from '../utils/audio';

interface SupportSafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupportSafetyModal: React.FC<SupportSafetyModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const emergencyHelplines = [
    {
      name: 'ALO 183 Sosyal Destek & Çocuk Hattı',
      tag: 'T.C. Aile ve Sosyal Hizmetler Bakanlığı',
      desc: 'Çocuk, genç, kadın ve aileye yönelik her türlü istismar, şiddet, ihmal veya zor durum desteği için 7/24 ücretsiz hat.',
      phone: '183',
      color: 'bg-rose-50 border-rose-200 text-rose-950',
      badgeColor: 'bg-rose-100 text-rose-800'
    },
    {
      name: '112 Acil Çağrı Merkezi',
      tag: 'Acil Durum & Sağlık',
      desc: 'Hayati tehlike, acil sağlık veya güvenlik tehdidi anında aranması gereken tek acil çağrı numarası.',
      phone: '112',
      color: 'bg-red-50 border-red-200 text-red-950',
      badgeColor: 'bg-red-100 text-red-800'
    },
    {
      name: 'Okul Rehberlik & PDR Servisi',
      tag: 'Okul & Eğitim Güvencesi',
      desc: 'Okulundaki psikolojik danışman ve rehber öğretmenler, seni dinlemek ve güvende hissetmeni sağlamak için daima yanındadır.',
      phone: 'Okul İdaresi / Rehberlik Odası',
      color: 'bg-amber-50 border-amber-200 text-amber-950',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      name: 'ALO 144 Sosyal Yardım Hattı',
      tag: 'Sosyal Destek',
      desc: 'İhtiyaç sahibi aileler ve gençler için sosyal destek ve yönlendirme hattı.',
      phone: '144',
      color: 'bg-orange-50 border-orange-200 text-orange-950',
      badgeColor: 'bg-orange-100 text-orange-800'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-orange-600 via-amber-600 to-stone-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-xs">
              🛡️
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg sm:text-xl">
                Güvenlik, Destek & Rehberlik Hatları
              </h3>
              <p className="text-xs sm:text-sm text-amber-100 font-medium">
                Yalnız değilsin! İhtiyaç duyduğun her an başvurabileceğin resmi ve güvenilir destek kanalları.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white cursor-pointer"
            title="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          
          {/* Important Pedagogical & Legal Disclaimer */}
          <div className="p-4.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Gizlilik, Güvenlik ve Pedagojik Sınırlar</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              <strong>Duygu Günlüğüm</strong>, çocukların ve gençlerin duygusal farkındalık geliştirmesi için tasarlanmış güvenli bir kişisel alandır. Uygulama kişisel günlük yazılarını gizlice izleyen bir gözetim sistemi veya klinik tanı aracı <u>değildir</u>. Kendini, bir arkadaşını veya çevreni tehlikede, baskı altında veya istismar durumunda hissediyorsan, lütfen doğrudan aşağıdaki resmi kurumlara veya güvenilir bir yetişkine başvur.
            </p>
          </div>

          {/* Emergency Helplines Grid */}
          <div className="space-y-3">
            <h4 className="font-heading font-extrabold text-sm text-stone-900 flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-orange-600" />
              <span>Resmi ve Ücretsiz Destek Kanalları</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {emergencyHelplines.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl border ${item.color} flex flex-col justify-between space-y-3 transition-all hover:shadow-xs`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                    </div>
                    <h5 className="font-heading font-bold text-sm text-stone-900">
                      {item.name}
                    </h5>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <PhoneCall className="w-3.5 h-3.5 text-stone-600" />
                      <span>{item.phone}</span>
                    </span>
                    {item.phone.match(/^\d+$/) && (
                      <a
                        href={`tel:${item.phone}`}
                        className="px-3 py-1 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800 transition-colors inline-flex items-center gap-1"
                      >
                        <span>Ara</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What to do in tough times */}
          <div className="p-4.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2.5">
            <h5 className="font-heading font-bold text-sm text-stone-900 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              <span>Zor Bir Durumda Neler Yapabilirsin?</span>
            </h5>
            <ul className="text-xs sm:text-sm text-stone-700 space-y-1.5 list-disc list-inside">
              <li>Güvendiğin bir ebeveyninle, öğretmeninle ya da okul rehberlik danışmanınla hissettiklerini paylaş.</li>
              <li>Haksızlığa, baskıya, ihmale veya zorbalığa uğradığında susma; yardım istemek bir cesaret göstergesidir.</li>
              <li>Acil ve hayati durumlarda çekinmeden <strong>112</strong> veya <strong>183</strong> hatlarını ara.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            Her çocuk ve genç güvende yaşama ve korunma hakkına sahiptir. 💙
          </span>
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="px-5 py-2 text-xs font-bold text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-all cursor-pointer"
          >
            Anladım, Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
