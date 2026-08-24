import React from 'react';
import { 
  Search, 
  Bookmark as BookmarkIcon, 
  Sun, 
  Moon, 
  BookMarked,
  Languages,
  Volume2
} from 'lucide-react';
import { ThemeMode, FontSize, Chapter, BibleVersionId } from '../types';
import { BibleVersionSelector } from './BibleVersionSelector';

interface HeaderProps {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  showEnglish: boolean;
  setShowEnglish: (show: boolean) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarksCount: number;
  isSpeaking: boolean;
  currentChapter?: Chapter;
  selectedVersion: BibleVersionId;
  onSelectVersion: (version: BibleVersionId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  setTheme,
  fontSize,
  setFontSize,
  showEnglish,
  setShowEnglish,
  onOpenSearch,
  onOpenBookmarks,
  bookmarksCount,
  isSpeaking,
  currentChapter,
  selectedVersion,
  onSelectVersion
}) => {
  const fontSizes: { id: FontSize; label: string; size: string }[] = [
    { id: 'sm', label: 'A-', size: 'Maliit' },
    { id: 'md', label: 'A', size: 'Katamtaman' },
    { id: 'lg', label: 'A+', size: 'Malaki' },
    { id: 'xl', label: 'A++', size: 'Napakalaki' },
  ];

  return (
    <header 
      id="app-header"
      className={`border-b sticky top-0 z-40 transition-colors duration-200 ${
        theme === 'dark' 
          ? 'bg-[#181716]/95 border-[#383531] text-[#EAE6DF]' 
          : theme === 'sepia'
          ? 'bg-[#FAF6EE]/95 border-[#DCD4C5] text-[#3D342C]'
          : 'bg-white/95 border-[#D1CEC7] text-[#2C2C2C]'
      } backdrop-blur-md`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between gap-4">
        {/* Brand & Geometric Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-[#8B0000] flex items-center justify-center rounded-xs shadow-xs text-white shrink-0">
            <span className="font-serif text-xl font-bold tracking-tight">B</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight uppercase">
                Ang Banal na Biblia
              </h1>
              {isSpeaking && (
                <span className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-xs bg-[#8B0000]/10 text-[#8B0000] dark:text-[#ff8080] font-bold animate-pulse border border-[#8B0000]/20">
                  <Volume2 className="w-3 h-3" />
                  Binabasa
                </span>
              )}
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#7A756D] font-semibold">
              Bersyong Tagalog • may TTS
            </p>
          </div>
        </div>

        {/* Center Chapter / Verse Indicators (Geometric Nav Balance) */}
        {currentChapter && (
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-[#A09B93] uppercase font-bold tracking-wider">Kabanata</span>
              <span className="text-base font-serif italic text-[#8B0000] font-bold">
                {currentChapter.bookName} {currentChapter.chapterNumber}
              </span>
            </div>
            <div className="h-7 w-[1px] bg-[#D1CEC7] dark:bg-[#383531]"></div>
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-[#A09B93] uppercase font-bold tracking-wider">Bersikulo</span>
              <span className="text-base font-serif italic text-stone-700 dark:text-stone-300">
                1 — {currentChapter.verses.length}
              </span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Bible Version Selector */}
          <BibleVersionSelector
            selectedVersion={selectedVersion}
            onSelectVersion={onSelectVersion}
            compact={true}
          />

          {/* Search Button */}
          <button
            id="search-btn"
            onClick={onOpenSearch}
            className="p-2 rounded-xs border border-[#D1CEC7] dark:border-[#383531] bg-[#FDFCF9] dark:bg-[#201E1C] hover:bg-[#F5F4F1] dark:hover:bg-[#2A2724] text-stone-700 dark:text-stone-300 transition-colors relative"
            title="Maghanap ng Talata o Salita"
            aria-label="Maghanap"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Bookmarks Button */}
          <button
            id="bookmarks-btn"
            onClick={onOpenBookmarks}
            className="p-2 rounded-xs border border-[#D1CEC7] dark:border-[#383531] bg-[#FDFCF9] dark:bg-[#201E1C] hover:bg-[#F5F4F1] dark:hover:bg-[#2A2724] text-stone-700 dark:text-stone-300 transition-colors relative"
            title="Mga Naka-save at Na-highlight na Talata"
            aria-label="Mga Bookmark"
          >
            <BookmarkIcon className="w-4 h-4" />
            {bookmarksCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#8B0000] text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                {bookmarksCount}
              </span>
            )}
          </button>

          {/* English Parallel Toggle */}
          <button
            id="toggle-english-btn"
            onClick={() => setShowEnglish(!showEnglish)}
            className={`px-2.5 py-1.5 text-xs rounded-xs font-semibold border transition-all flex items-center gap-1.5 ${
              showEnglish
                ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                : 'border-[#D1CEC7] dark:border-[#383531] bg-[#FDFCF9] dark:bg-[#201E1C] text-stone-700 dark:text-stone-300 hover:bg-[#F5F4F1] dark:hover:bg-[#2A2724]'
            }`}
            title="Ipakita o itago ang katumbas na Ingles"
          >
            <Languages className="w-3.5 h-3.5" />
            <span className="hidden md:inline">EN</span>
          </button>

          {/* Font Size Selector */}
          <div className="flex items-center bg-[#F5F4F1] dark:bg-[#242220] p-0.5 rounded-xs border border-[#D1CEC7] dark:border-[#383531]">
            {fontSizes.map((f) => (
              <button
                key={f.id}
                id={`font-size-${f.id}`}
                onClick={() => setFontSize(f.id)}
                className={`px-2 py-1 text-xs font-semibold rounded-xs transition-colors ${
                  fontSize === f.id
                    ? 'bg-white dark:bg-[#34312D] text-[#8B0000] dark:text-[#ff9999] shadow-xs font-bold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                }`}
                title={`Laki ng Titik: ${f.size}`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Theme Selector */}
          <div className="flex items-center bg-[#F5F4F1] dark:bg-[#242220] p-0.5 rounded-xs border border-[#D1CEC7] dark:border-[#383531]">
            <button
              id="theme-light-btn"
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-xs text-xs transition-colors ${
                theme === 'light'
                  ? 'bg-white text-[#8B0000] shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Liwanag (Geometric Light)"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-sepia-btn"
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded-xs text-xs transition-colors ${
                theme === 'sepia'
                  ? 'bg-[#EBDCCB] text-[#54382C] shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
              title="Sepia (Papel)"
            >
              <BookMarked className="w-3.5 h-3.5" />
            </button>
            <button
              id="theme-dark-btn"
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-xs text-xs transition-colors ${
                theme === 'dark'
                  ? 'bg-[#34312D] text-[#ff9999] shadow-xs'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Dilim (Gabi)"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
