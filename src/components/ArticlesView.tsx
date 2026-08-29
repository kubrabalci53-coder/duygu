import React, { useState } from 'react';
import { 
  BookMarked, 
  Sparkles, 
  Brain, 
  Flame, 
  CloudRain, 
  Sun, 
  Heart, 
  CheckCircle2, 
  ChevronRight, 
  UserCheck, 
  Activity,
  ArrowLeft
} from 'lucide-react';
import { PSYCHO_ARTICLES } from '../data/articles';
import { EMOTIONS } from '../data/emotions';
import { PsychoArticle } from '../types';
import { sound } from '../utils/audio';

export const ArticlesView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<PsychoArticle | null>(null);
  const [activeTab, setActiveTab] = useState<'makaleler' | 'sozluk'>('makaleler');

  const handleSelectArticle = (article: PsychoArticle) => {
    sound.playPop();
    setSelectedArticle(article);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-12">
      
      {/* Header & Sub-Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
              📚
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-heading">
                Duygu Sözlüğü & Uzman Rehberleri
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Uzman çocuk psikologları ve nörobilimcilerin hazırladığı eğlenceli ve bilimsel rehberler.
              </p>
            </div>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl self-start sm:self-auto">
            <button
              id="articles-tab-guides"
              onClick={() => {
                sound.playPop();
                setActiveTab('makaleler');
                setSelectedArticle(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'makaleler'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Uzman Makaleleri ({PSYCHO_ARTICLES.length})
            </button>
            <button
              id="articles-tab-dictionary"
              onClick={() => {
                sound.playPop();
                setActiveTab('sozluk');
                setSelectedArticle(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sozluk'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Duygu Sözlüğü ({EMOTIONS.length})
            </button>
          </div>
        </div>
      </div>

      {/* ARTICLE DETAIL VIEW */}
      {selectedArticle ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-fadeIn">
          {/* Back button */}
          <button
            id="back-to-articles-btn"
            onClick={() => {
              sound.playPop();
              setSelectedArticle(null);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Makalelere Geri Dön</span>
          </button>

          {/* Article Header */}
          <div className="space-y-2 border-b border-stone-100 pb-5">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                ⏱️ {selectedArticle.readTime}
              </span>
            </div>

            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-stone-900 leading-snug">
              {selectedArticle.title}
            </h3>
            <p className="text-sm font-medium text-amber-950">
              {selectedArticle.subtitle}
            </p>

            {/* Author Credit */}
            <div className="flex items-center gap-2.5 pt-2 text-xs text-stone-500">
              <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 flex items-center justify-center font-bold">
                👩‍⚕️
              </div>
              <div>
                <span className="font-bold text-stone-800 block">{selectedArticle.expertAuthor}</span>
                <span>{selectedArticle.expertTitle}</span>
              </div>
            </div>
          </div>

          {/* Article Summary Quote */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs sm:text-sm font-medium italic leading-relaxed">
            💡 "{selectedArticle.summary}"
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            {selectedArticle.content.map((p, idx) => (
              <p key={idx} className="whitespace-pre-line">
                {p}
              </p>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <h4 className="font-heading font-extrabold text-sm text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Aklında Kalması Gereken Önemli Noktalar:</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
              {selectedArticle.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span>•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fun 2-Minute Somatic Activity */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Activity className="w-4 h-4 text-amber-700" />
              <span>Evde/Sınıfta Yapabileceğin 2 Dakikalık Egzersiz: <strong>{selectedArticle.funActivity.title}</strong></span>
            </div>
            <p className="text-xs sm:text-sm text-stone-700">
              {selectedArticle.funActivity.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {selectedArticle.funActivity.stepList.map((step, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs font-semibold text-amber-950">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 inline-flex items-center justify-center mr-1.5 text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

        </div>
      ) : activeTab === 'makaleler' ? (
        /* ARTICLES LIST GRID */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PSYCHO_ARTICLES.map((article) => (
            <div
              key={article.id}
              id={`article-card-${article.id}`}
              onClick={() => handleSelectArticle(article)}
              className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                    {article.category}
                  </span>
                  <span className="text-xs text-stone-400 font-medium">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-base sm:text-lg text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-500">
                  ✍️ {article.expertAuthor}
                </span>
                <span className="text-orange-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Rehberi Oku</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EMOTION DICTIONARY LIST */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EMOTIONS.map((e) => (
            <div
              key={e.id}
              className={`p-5 rounded-3xl bg-gradient-to-br ${e.bgGradient} border ${e.borderColor} space-y-3 shadow-xs`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{e.emoji}</span>
                <div>
                  <h3 className={`font-heading font-extrabold text-lg ${e.textColor}`}>
                    {e.label}
                  </h3>
                  <span className="text-xs font-semibold text-stone-500">
                    Temel İnsani Duygu
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {e.description}
              </p>

              <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-xs text-xs text-stone-700 border border-stone-200/60 font-medium">
                💡 <strong>Ne Yapmalı?</strong> {e.soothingNote}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
