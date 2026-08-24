import React from 'react';
import { DAILY_VERSES, CHAPTERS, BIBLE_VERSIONS } from '../data/bibleData';
import { Sparkles, Play, ArrowRight } from 'lucide-react';
import { Chapter, BibleVersionId } from '../types';

interface DevotionalCardProps {
  onSelectVerse: (chapter: Chapter, verseNumber: number) => void;
  onPlayDevotional: (text: string, reference: string) => void;
  theme: string;
  selectedVersion: BibleVersionId;
}

export const DevotionalCard: React.FC<DevotionalCardProps> = ({
  onSelectVerse,
  onPlayDevotional,
  theme,
  selectedVersion
}) => {
  // Rotate or pick a featured daily verse based on day of month
  const today = new Date();
  const dayIndex = today.getDate() % DAILY_VERSES.length;
  const daily = DAILY_VERSES[dayIndex];

  const currentVersionObj = BIBLE_VERSIONS.find(v => v.id === selectedVersion) || BIBLE_VERSIONS[0];
  const verseText = daily.versions?.[selectedVersion] || daily.text;

  const handleReadChapter = () => {
    const targetChapter = CHAPTERS.find((c) => c.id === daily.chapterId);
    if (targetChapter) {
      onSelectVerse(targetChapter, daily.verseNumber);
    }
  };

  return (
    <div
      id="daily-devotional-card"
      className={`mb-6 p-6 sm:p-7 rounded-xs border shadow-xs relative transition-all ${
        theme === 'dark'
          ? 'bg-[#1D1B19] border-[#383531] text-[#EAE6DF]'
          : theme === 'sepia'
          ? 'bg-[#FAF6EE] border-[#DCD4C5] text-[#3D342C]'
          : 'bg-white border-[#E8E6E1] text-[#2C2C2C]'
      }`}
    >
      {/* Floating Geometric Section Badge */}
      <div className="absolute top-[-10px] left-6 px-3 bg-[#FDFCF9] dark:bg-[#151413] text-[10px] text-[#A09B93] uppercase tracking-[3px] font-bold">
        Pagbubulay
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pt-1">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B0000] dark:text-[#ff8585] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8B0000] dark:text-[#ff8585]" />
              Talata sa Araw na Ito
            </span>
            <span className="text-[11px] text-[#7A756D] uppercase tracking-wider font-semibold">
              — {daily.theme}
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-[#8B0000]/10 text-[#8B0000] dark:text-[#ff9999] border border-[#8B0000]/20">
              {currentVersionObj.shortName}
            </span>
          </div>

          <blockquote className="font-serif italic text-base sm:text-lg text-[#3D3D3D] dark:text-[#E0DDD8] leading-relaxed">
            "{verseText}"
          </blockquote>

          <div className="text-xs font-serif font-bold text-[#8B0000] dark:text-[#ff8585]">
            — {daily.reference} ({currentVersionObj.shortName})
          </div>
        </div>

        <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
          <button
            id="play-daily-verse-btn"
            onClick={() => onPlayDevotional(verseText, `${daily.reference} (${currentVersionObj.shortName})`)}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xs bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Pakinggan
          </button>
          <button
            id="jump-to-daily-chapter-btn"
            onClick={handleReadChapter}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xs bg-[#F5F4F1] dark:bg-[#282522] hover:bg-[#EBE8E3] dark:hover:bg-[#322F2B] text-stone-800 dark:text-stone-200 border border-[#D1CEC7] dark:border-[#383531] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Basahin</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
