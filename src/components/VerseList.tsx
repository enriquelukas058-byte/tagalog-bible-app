import React, { useRef, useEffect, useState } from 'react';
import { 
  Play, 
  Volume2, 
  Copy, 
  Bookmark as BookmarkIcon, 
  Sparkles, 
  Check, 
  Palette,
  Layers,
  ChevronDown
} from 'lucide-react';
import { Chapter, FontSize, ThemeMode, Verse, BibleVersionId } from '../types';
import { BIBLE_VERSIONS, getVerseText } from '../data/bibleData';

interface VerseListProps {
  chapter: Chapter;
  activeVerseIndex: number;
  isSpeaking: boolean;
  onPlayFromVerse: (index: number) => void;
  onPlaySingleVerse: (verse: Verse, index: number) => void;
  onExplainVerse: (verse: Verse) => void;
  onToggleBookmark: (verse: Verse, color?: 'yellow' | 'green' | 'blue' | 'pink') => void;
  isBookmarked: (verseNumber: number) => boolean;
  getHighlightColor: (verseNumber: number) => string | undefined;
  fontSize: FontSize;
  theme: ThemeMode;
  showEnglish: boolean;
  autoScroll: boolean;
  selectedVersion: BibleVersionId;
  onSelectVersion?: (version: BibleVersionId) => void;
}

export const VerseList: React.FC<VerseListProps> = ({
  chapter,
  activeVerseIndex,
  isSpeaking,
  onPlayFromVerse,
  onPlaySingleVerse,
  onExplainVerse,
  onToggleBookmark,
  isBookmarked,
  getHighlightColor,
  fontSize,
  theme,
  showEnglish,
  autoScroll,
  selectedVersion,
  onSelectVersion
}) => {
  const activeVerseRef = useRef<HTMLDivElement | null>(null);
  const [copiedVerseNum, setCopiedVerseNum] = useState<number | null>(null);
  const [colorPickerVerse, setColorPickerVerse] = useState<number | null>(null);
  const [comparingVerseNum, setComparingVerseNum] = useState<number | null>(null);

  // Auto-scroll to active verse when speaking
  useEffect(() => {
    if (autoScroll && activeVerseRef.current && isSpeaking) {
      activeVerseRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [activeVerseIndex, autoScroll, isSpeaking]);

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'sm':
        return { text: 'text-base leading-relaxed', verseNum: 'text-xs' };
      case 'md':
        return { text: 'text-lg leading-relaxed', verseNum: 'text-sm' };
      case 'lg':
        return { text: 'text-xl leading-loose', verseNum: 'text-base' };
      case 'xl':
        return { text: 'text-2xl leading-loose', verseNum: 'text-lg' };
      default:
        return { text: 'text-lg leading-relaxed', verseNum: 'text-sm' };
    }
  };

  const { text: textClass, verseNum: verseNumClass } = getFontSizeClasses();

  const currentVersionObj = BIBLE_VERSIONS.find(v => v.id === selectedVersion) || BIBLE_VERSIONS[0];

  const handleCopy = (verse: Verse) => {
    const textToCopy = getVerseText(verse, selectedVersion);
    const citation = `"${textToCopy}" — ${chapter.bookName} ${chapter.chapterNumber}:${verse.number} (${currentVersionObj.name})`;
    navigator.clipboard.writeText(citation);
    setCopiedVerseNum(verse.number);
    setTimeout(() => setCopiedVerseNum(null), 2000);
  };

  const highlightClassMap: Record<string, string> = {
    yellow: 'bg-amber-100/50 dark:bg-amber-950/30 border-l-3 border-[#8B0000] pl-3',
    green: 'bg-emerald-100/50 dark:bg-emerald-950/30 border-l-3 border-emerald-600 pl-3',
    blue: 'bg-sky-100/50 dark:bg-sky-950/30 border-l-3 border-sky-600 pl-3',
    pink: 'bg-rose-100/50 dark:bg-rose-950/30 border-l-3 border-rose-600 pl-3'
  };

  return (
    <div id="verse-list-container" className="space-y-4 pb-36">
      {/* Chapter Title & Header Banner */}
      <div 
        id="chapter-header-banner"
        className={`p-6 sm:p-8 rounded-xs mb-6 border relative transition-all shadow-xs ${
          theme === 'dark'
            ? 'bg-[#1D1B19] border-[#383531] text-[#EAE6DF]'
            : theme === 'sepia'
            ? 'bg-[#FAF6EE] border-[#DCD4C5] text-[#3D342C]'
            : 'bg-white border-[#E8E6E1] text-[#2C2C2C]'
        }`}
      >
        {/* Floating Geometric Section Badge */}
        <div className="absolute top-[-10px] left-6 px-3 bg-[#FDFCF9] dark:bg-[#151413] text-[10px] text-[#A09B93] uppercase tracking-[3px] font-bold">
          Banal na Kasulatan
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pt-1">
          <span className="text-[11px] font-bold uppercase tracking-[2px] text-[#8B0000] dark:text-[#ff8585]">
            {chapter.testament} • {chapter.bookName}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#8B0000]/10 text-[#8B0000] dark:text-[#ff9999] border border-[#8B0000]/20">
              {currentVersionObj.shortName} ({currentVersionObj.year})
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs bg-[#F5F4F1] dark:bg-[#282522] text-[#7A756D] border border-[#D1CEC7] dark:border-[#383531]">
              {chapter.verses.length} Talata
            </span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mb-1 text-[#2C2C2C] dark:text-[#EAE6DF]">
          {chapter.bookName} Kabanata {chapter.chapterNumber}
        </h2>
        
        <p className="text-base sm:text-lg font-serif italic text-[#8B0000] dark:text-[#ff8585] mb-3">
          {chapter.title}
        </p>

        {chapter.summary && (
          <p className="text-xs sm:text-sm text-[#57534E] dark:text-[#B5B0A8] max-w-3xl leading-relaxed">
            {chapter.summary}
          </p>
        )}

        {/* Quick Chapter Play Button & Translation Notice */}
        <div className="mt-4 pt-4 border-t border-[#F0EEEA] dark:border-[#302D2A] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              id="play-entire-chapter-btn"
              onClick={() => onPlayFromVerse(0)}
              className="px-4 py-2 rounded-xs bg-[#8B0000] hover:bg-[#700000] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Pakinggan ang Buong Kabanata
            </button>
            <span className="text-[11px] text-[#A09B93] uppercase tracking-wider font-semibold">
              Pindutin ang anumang talata upang doon magsimula.
            </span>
          </div>
        </div>
      </div>

      {/* Verses Container */}
      <div className="space-y-3">
        {chapter.verses.map((verse, index) => {
          const isActive = index === activeVerseIndex;
          const bookmarked = isBookmarked(verse.number);
          const highlightColor = getHighlightColor(verse.number);
          const customHighlight = highlightColor ? highlightClassMap[highlightColor] : '';
          const activeVerseText = getVerseText(verse, selectedVersion);
          const isComparing = comparingVerseNum === verse.number;

          return (
            <div
              key={verse.number}
              ref={isActive ? activeVerseRef : null}
              id={`verse-card-${verse.number}`}
              className={`group p-5 rounded-xs transition-all duration-200 relative border ${
                isActive
                  ? 'border-[#8B0000] bg-[#8B0000]/5 dark:bg-[#8B0000]/10 shadow-xs'
                  : 'border-[#E8E6E1] dark:border-[#383531] hover:border-[#D1CEC7] bg-white dark:bg-[#1D1B19]'
              } ${customHighlight}`}
            >
              {/* Active Verse Indicator Badge */}
              {isActive && (
                <div className="absolute -top-2.5 left-6 px-2.5 py-0.5 rounded-xs bg-[#8B0000] text-white text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
                  {isSpeaking ? (
                    <>
                      <Volume2 className="w-3 h-3 animate-pulse" />
                      Binabasa ({currentVersionObj.shortName})
                    </>
                  ) : (
                    <>
                      <Check className="w-3 h-3" />
                      Kasalukuyang Talata
                    </>
                  )}
                </div>
              )}

              <div className="flex items-start gap-3 sm:gap-4">
                {/* Verse Number Pill */}
                <button
                  id={`verse-num-btn-${verse.number}`}
                  onClick={() => onPlayFromVerse(index)}
                  className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xs flex items-center justify-center font-serif font-bold transition-colors border ${
                    isActive
                      ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                      : 'bg-[#F5F4F1] dark:bg-[#282522] border-[#D1CEC7] dark:border-[#383531] text-[#8B0000] dark:text-[#ff8585] group-hover:bg-[#8B0000] group-hover:text-white group-hover:border-[#8B0000]'
                  } ${verseNumClass}`}
                  title="I-play mula sa talatang ito"
                >
                  {verse.number}
                </button>

                {/* Verse Main Text */}
                <div className="flex-1 min-w-0">
                  <p 
                    onClick={() => onPlayFromVerse(index)}
                    className={`font-serif text-[#2C2C2C] dark:text-[#EAE6DF] cursor-pointer select-text transition-colors leading-relaxed ${textClass} ${
                      isActive ? 'font-medium text-[#1A1A1A] dark:text-white' : ''
                    }`}
                  >
                    {activeVerseText}
                  </p>

                  {/* Parallel English Text if enabled */}
                  {showEnglish && verse.englishText && (
                    <p className="mt-2 text-xs sm:text-sm text-[#7A756D] dark:text-[#A09B93] italic font-serif border-t border-[#F0EEEA] dark:border-[#302D2A] pt-2">
                      <span className="font-sans font-bold not-italic text-[10px] uppercase text-[#A09B93] mr-1.5 tracking-wider">
                        [EN]
                      </span>
                      {verse.englishText}
                    </p>
                  )}

                  {/* Version Comparison Section */}
                  {isComparing && verse.versions && (
                    <div 
                      id={`compare-versions-panel-${verse.number}`}
                      className="mt-3 p-3.5 bg-[#F9F8F5] dark:bg-[#22201D] border border-[#D1CEC7] dark:border-[#383531] rounded-xs space-y-2.5 animate-in fade-in duration-200"
                    >
                      <div className="flex items-center justify-between border-b border-[#E6E2DA] dark:border-[#33302C] pb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B0000] dark:text-[#ff9999] flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          Paghambing ng mga Salin ({chapter.bookName} {chapter.chapterNumber}:{verse.number})
                        </span>
                        <button
                          onClick={() => setComparingVerseNum(null)}
                          className="text-[10px] text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 font-bold"
                        >
                          Isara ✕
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        {BIBLE_VERSIONS.map((v) => {
                          const vText = verse.versions?.[v.id] || verse.text;
                          const isCurrent = v.id === selectedVersion;

                          return (
                            <div 
                              key={v.id}
                              className={`p-2 rounded-xs border transition-colors ${
                                isCurrent
                                  ? 'bg-white dark:bg-[#1A1816] border-[#8B0000] shadow-xs'
                                  : 'bg-white/60 dark:bg-[#1A1816]/60 border-[#E8E6E1] dark:border-[#33302C]'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-xs ${
                                  isCurrent
                                    ? 'bg-[#8B0000] text-white'
                                    : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                                }`}>
                                  {v.shortName} • {v.name}
                                </span>
                                {onSelectVersion && !isCurrent && (
                                  <button
                                    onClick={() => onSelectVersion(v.id)}
                                    className="text-[10px] text-[#8B0000] dark:text-[#ff9999] hover:underline font-semibold"
                                  >
                                    Piliin itong bersyon
                                  </button>
                                )}
                              </div>
                              <p className="font-serif text-stone-800 dark:text-stone-200 leading-relaxed">
                                {vText}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Verse Interactive Tool Bar */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-[#F0EEEA] dark:border-[#302D2A] opacity-90 group-hover:opacity-100 transition-opacity">
                    {/* Play From Here */}
                    <button
                      id={`play-from-btn-${verse.number}`}
                      onClick={() => onPlayFromVerse(index)}
                      className="px-2.5 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider bg-[#8B0000]/10 hover:bg-[#8B0000] text-[#8B0000] hover:text-white dark:text-[#ff9999] transition-all flex items-center gap-1"
                      title="Basahin nang sunud-sunod mula rito"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Mula rito</span>
                    </button>

                    {/* Play Only This Verse */}
                    <button
                      id={`play-single-btn-${verse.number}`}
                      onClick={() => onPlaySingleVerse(verse, index)}
                      className="px-2 py-1 rounded-xs text-[11px] font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-[#F5F4F1] dark:hover:bg-[#282522] transition-colors flex items-center gap-1"
                      title="Pakinggan lamang ang talatang ito"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Pakinggan ito</span>
                    </button>

                    {/* Compare Translations Button */}
                    <button
                      id={`compare-verse-btn-${verse.number}`}
                      onClick={() => setComparingVerseNum(isComparing ? null : verse.number)}
                      className={`px-2 py-1 rounded-xs text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                        isComparing
                          ? 'bg-[#8B0000] text-white font-bold'
                          : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-[#F5F4F1] dark:hover:bg-[#282522]'
                      }`}
                      title="Ihambing ang mga salin (ADB, MBB, SND)"
                    >
                      <Layers className="w-3 h-3" />
                      <span className="hidden sm:inline">Ihambing</span>
                    </button>

                    {/* Copy Button */}
                    <button
                      id={`copy-verse-btn-${verse.number}`}
                      onClick={() => handleCopy(verse)}
                      className="px-2 py-1 rounded-xs text-[11px] font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-[#F5F4F1] dark:hover:bg-[#282522] transition-colors flex items-center gap-1"
                      title="Kopyahin ang talata"
                    >
                      {copiedVerseNum === verse.number ? (
                        <>
                          <Check className="w-3 h-3 text-[#8B0000]" />
                          <span className="text-[#8B0000] font-bold">Nakopya!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="hidden sm:inline">Kopyahin</span>
                        </>
                      )}
                    </button>

                    {/* Bookmark / Favorite */}
                    <button
                      id={`bookmark-verse-btn-${verse.number}`}
                      onClick={() => onToggleBookmark(verse)}
                      className={`px-2 py-1 rounded-xs text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                        bookmarked
                          ? 'bg-[#8B0000] text-white font-bold'
                          : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-[#F5F4F1] dark:hover:bg-[#282522]'
                      }`}
                      title={bookmarked ? 'Alisin sa Bookmark' : 'I-bookmark ang talata'}
                    >
                      <BookmarkIcon className={`w-3 h-3 ${bookmarked ? 'fill-current' : ''}`} />
                      <span className="hidden sm:inline">
                        {bookmarked ? 'Naka-save' : 'I-save'}
                      </span>
                    </button>

                    {/* Color Highlight Picker Toggle */}
                    <div className="relative">
                      <button
                        id={`color-picker-toggle-${verse.number}`}
                        onClick={() =>
                          setColorPickerVerse(
                            colorPickerVerse === verse.number ? null : verse.number
                          )
                        }
                        className="px-2 py-1 rounded-xs text-[11px] font-semibold text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-[#F5F4F1] dark:hover:bg-[#282522] transition-colors flex items-center gap-1"
                        title="Kulayan / I-highlight"
                      >
                        <Palette className="w-3 h-3" />
                        <span className="hidden sm:inline">Kulay</span>
                      </button>

                      {/* Color Palette Dropdown */}
                      {colorPickerVerse === verse.number && (
                        <div className="absolute left-0 top-full mt-1 z-30 bg-white dark:bg-[#201E1C] p-1.5 rounded-xs shadow-lg border border-[#D1CEC7] dark:border-[#383531] flex items-center gap-1">
                          <button
                            onClick={() => {
                              onToggleBookmark(verse, 'yellow');
                              setColorPickerVerse(null);
                            }}
                            className="w-4 h-4 rounded-xs bg-[#8B0000] hover:scale-110 transition-transform"
                            title="Crimson"
                          />
                          <button
                            onClick={() => {
                              onToggleBookmark(verse, 'green');
                              setColorPickerVerse(null);
                            }}
                            className="w-4 h-4 rounded-xs bg-emerald-600 hover:scale-110 transition-transform"
                            title="Berde"
                          />
                          <button
                            onClick={() => {
                              onToggleBookmark(verse, 'blue');
                              setColorPickerVerse(null);
                            }}
                            className="w-4 h-4 rounded-xs bg-sky-600 hover:scale-110 transition-transform"
                            title="Asul"
                          />
                          <button
                            onClick={() => {
                              onToggleBookmark(verse, 'pink');
                              setColorPickerVerse(null);
                            }}
                            className="w-4 h-4 rounded-xs bg-amber-500 hover:scale-110 transition-transform"
                            title="Ginto"
                          />
                        </div>
                      )}
                    </div>

                    {/* AI Reflection / Explanation */}
                    <button
                      id={`explain-verse-btn-${verse.number}`}
                      onClick={() => onExplainVerse(verse)}
                      className="px-2 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider text-[#8B0000] dark:text-[#ff9999] bg-[#8B0000]/10 hover:bg-[#8B0000]/20 transition-colors flex items-center gap-1 ml-auto"
                      title="Kumuha ng maikling paliwanag at aral sa Tagalog"
                    >
                      <Sparkles className="w-3 h-3 text-[#8B0000] dark:text-[#ff9999]" />
                      <span>Paliwanag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
