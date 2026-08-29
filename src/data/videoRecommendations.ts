import { RecommendedVideo } from '../types';

export const RECOMMENDED_VIDEOS: RecommendedVideo[] = [
  // --- ÜZGÜN (SAD) ---
  {
    id: 'vid-inside-out-sadness',
    title: 'Ters Yüz: Üzüntünün Değeri ve Bizi Güçlendirmesi 🌧️',
    description: 'Bazen üzülmek çok doğaldır. Üzüntümüzü saklamak yerine kabul ettiğimizde kalbimiz nasıl rahatlar?',
    duration: '4:15 dk',
    targetEmotion: 'uzgun',
    category: 'Duygu Farkındalığı',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/t685HM34358',
    takeaways: [
      'Üzüntü kötü bir duygu değildir, kalbimizin dinlenmeye ihtiyacı olduğunu fısıldar.',
      'Ağlamak ve hislerini paylaşmak insanı hafifletir.',
      'Zor günlerin ardından güneş yeniden doğar.'
    ],
    reflectionQuestion: 'Bugün sana sıcacık bir sarılma gibi gelecek en güzel şey ne olurdu?'
  },
  {
    id: 'vid-panda-smile',
    title: 'Sevimli Pandanın Neşeli Kaydırak Macerası 🐼',
    description: 'Yere düşse bile neşesini hiç kaybetmeyen tatlı yavru pandanın yüzünü güldürecek halleri!',
    duration: '2:40 dk',
    targetEmotion: 'uzgun',
    category: 'Eğlenceli Mola',
    thumbnailUrl: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/s2v3N2k55m8',
    takeaways: [
      'Küçük komik anlar bazen bütün günümüzün havasını değiştirebilir.',
      'Gülümsemek beynimize mutluluk hormonu salgılatır.'
    ],
    reflectionQuestion: 'Seni en çok güldüren komik bir anını hatırlayabilir misin?'
  },

  // --- ÖFKELİ (ANGRY) ---
  {
    id: 'vid-anger-volcano',
    title: 'Öfke Volkanını Sakinleştirme Rehberi 🌋',
    description: 'İçindeki öfke bir volkan gibi kaynamaya başladığında 3 adımda nasıl sakinleşebileceğini öğren!',
    duration: '3:50 dk',
    targetEmotion: 'ofkeli',
    category: 'Sakinleşme & Nefes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/Z0b7y4f7_iU',
    takeaways: [
      'Öfke hissetmek doğaldır, ancak öfkeyle başkalarına zarar vermemek bizim seçimimizdir.',
      'Derin nefes alıp 5\'e kadar saymak volkanı söndürür.',
      'Öfkelendiğin ortamdan birkaç dakika uzaklaşmak sihirli bir güçtür.'
    ],
    reflectionQuestion: 'Öfkelendiğinde bedeninde (ellerinde, kalbinde) ne gibi değişiklikler hissediyorsun?'
  },
  {
    id: 'vid-balloon-breathing',
    title: 'Sihirli Balon Nefesi ile Sakinleşme Egzersizi 🎈',
    description: 'Karnında rengarenk bir balon hayal et ve nefesinle onu yavaşça şişirip boşaltarak rahatla.',
    duration: '3:10 dk',
    targetEmotion: 'ofkeli',
    category: 'Sakinleşme & Nefes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/cy9g34c3rSg',
    takeaways: [
      'Derin nefesler kalp atışını yavaşlatır.',
      'Balon nefesi zihni berraklaştırır.'
    ],
    reflectionQuestion: 'Nefes aldıktan sonra omuzlarının nasıl gevşediğini fark ettin mi?'
  },

  // --- KORKMUŞ / KAYGILI (SCARED) ---
  {
    id: 'vid-brave-lion',
    title: 'Cesur Aslanın Hikayesi: Korkularımız Bizi Nasıl Korur? 🦁',
    description: 'Korku bir düşman değil, bizi tehlikelerden koruyan bir bekçidir. Onu dinleyip cesaretimizi nasıl buluruz?',
    duration: '4:30 dk',
    targetEmotion: 'korkmus',
    category: 'Cesaret & Özgüven',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/7p1e9eZc2wQ',
    takeaways: [
      'Cesaret hiç korkmamak değil, korkuya rağmen adım atabilmektir.',
      'Korkularımızı güvendiğimiz biriyle paylaştığımızda boyutları küçülür.',
      'Her zorluğun üstesinden adım adım gelinebilir.'
    ],
    reflectionQuestion: 'Bugün korktuğun şey için sana yardım edebilecek en güvenilir kişi kim?'
  },
  {
    id: 'vid-calm-ocean',
    title: 'Güvenli Liman & Sakin Deniz Dalgaları Meditasyonu 🌊',
    description: 'Gözlerini kapat ve güvenli bir sahilde dalgaların ritmini dinleyerek gevşe.',
    duration: '5:00 dk',
    targetEmotion: 'korkmus',
    category: 'Sakinleşme & Nefes',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/2vB1x3G7vP0',
    takeaways: [
      'Şu anda buradasın ve tamamen güvendesin.',
      'Bedenini gevşetmek zihnindeki kaygıları dağıtır.'
    ],
    reflectionQuestion: 'Zihnindeki en güvenli ve huzurlu yer neresi?'
  },

  // --- MUTLU / HEYECANLI (HAPPY / EXCITED) ---
  {
    id: 'vid-kindness-chain',
    title: 'İyilik Zinciri: Mutluluk Paylaştıkça Nasıl Büyür? ✨',
    description: 'Küçük bir tebessüm ve tatlı bir yardımın bütün şehri nasıl neşeyle doldurduğunu izle.',
    duration: '3:45 dk',
    targetEmotion: 'mutlu',
    category: 'Arkadaşlık & İletişim',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/nwAYpLVyeFU',
    takeaways: [
      'Mutluluk paylaşıldığında katlanarak çoğalır.',
      'Bugün bir arkadaşına söyleyeceğin güzel bir söz onun da gününü aydınlatır.'
    ],
    reflectionQuestion: 'Bugün mutluluğunu kiminle paylaşmak istersin?'
  },
  {
    id: 'vid-celebration-dance',
    title: 'Enerji & Neşe Dolu Dans Molası 🕺',
    description: 'İçindeki heyecanı ve sevinci ritimle kutlamak için 2 dakikalık kıpır kıpır dans!',
    duration: '2:15 dk',
    targetEmotion: 'heyecanli',
    category: 'Eğlenceli Mola',
    thumbnailUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/5IFZf_oGv3I',
    takeaways: [
      'Hareket etmek enerjiyi dengeler ve mutluluğu pekiştirir.',
      'Kendinle gurur duymak harika bir duygudur!'
    ],
    reflectionQuestion: 'Bugün seni bu kadar heyecanlandıran en güzel detay neydi?'
  },

  // --- HUZURLU (PEACEFUL) ---
  {
    id: 'vid-forest-calm',
    title: 'Büyülü Orman ve Doğanın Dinlendirici Sesleri 🌲',
    description: 'Kuş sesleri, hafif rüzgar ve akan derenin sesi eşliğinde zihnini dinlendir.',
    duration: '4:20 dk',
    targetEmotion: 'huzurlu',
    category: 'Duygu Farkındalığı',
    thumbnailUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/1ZYbU88DEz4',
    takeaways: [
      'Huzur anları ruhumuzu besleyen en değerli zamanlardır.',
      'Sakinlik anında kendini dinlemek yaratıcılığı artırır.'
    ],
    reflectionQuestion: 'Şu anki huzurlu hissini bir renge benzetseydin hangi renk olurdu?'
  },

  // --- YALNIZ (LONELY) ---
  {
    id: 'vid-invisible-string',
    title: 'Görünmez İp: Sevdiklerimize Kalpten Bağlıyız 🧵',
    description: 'Fiziksel olarak yalnız olsak bile sevdiklerimizle kalpten görünmez iplerle bağlı olduğumuzu anlatan sıcacık hikaye.',
    duration: '4:00 dk',
    targetEmotion: 'yalniz',
    category: 'Arkadaşlık & İletişim',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/W2K58XqWcW8',
    takeaways: [
      'Kendini yalnız hissettiğinde bile seni seven insanların olduğunu hatırla.',
      'Bir arkadaşa ilk adımı atmak veya "Merhaba" demek yeni bağlar kurar.',
      'Sen çok değerlisin ve dünyada sana yer var.'
    ],
    reflectionQuestion: 'Bugün kalpten bağlı hissettiğin birine küçük bir selam vermek ister misin?'
  },

  // --- KARIŞIK (MIXED / CONFUSED) ---
  {
    id: 'vid-color-monster',
    title: 'Renk Canavarı: Karışmış Duyguları Ayırma ve Anlama 🎨',
    description: 'İçinde aynı anda birden fazla duygu varken onları renklerine göre kavanozlara koyup tanımayı öğrenelim!',
    duration: '4:45 dk',
    targetEmotion: 'karisik',
    category: 'Duygu Farkındalığı',
    thumbnailUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    embedUrl: 'https://www.youtube-nocookie.com/embed/Ih0iu80u04Y',
    takeaways: [
      'Aynı anda hem sevinç hem endişe hissetmek çok normaldir.',
      'Duygularımızı adlandırdığımızda içimizdeki karmaşa çözülmeye başlar.'
    ],
    reflectionQuestion: 'Şu anda içinde en belirgin olan iki duygu hangileri?'
  }
];

export function getVideosForEmotion(emotion: string): RecommendedVideo[] {
  const filtered = RECOMMENDED_VIDEOS.filter(v => v.targetEmotion === emotion);
  if (filtered.length > 0) return filtered;
  return RECOMMENDED_VIDEOS.slice(0, 3);
}
