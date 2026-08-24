import React, { useState } from 'react';
import { Search, X, BookOpen, ArrowRight } from 'lucide-react';
import { CHAPTERS, getVerseText, BIBLE_VERSIONS } from '../data/bibleData';
import { Chapter, Verse, BibleVersionId } from '../types';

interface SearchResult {
  chapter: Chapter;
  verse: Verse;
  matchIndex: number;
  matchedVersionLabel?: string;
}

interface VerseSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (chapter: Chapter, verseIndex: number) => void;
  theme: string;
  selectedVersion: BibleVersionId;
}

export const VerseSearchModal: React.FC<VerseSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
  theme,
  selectedVersion
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const currentVersionObj = BIBLE_VERSIONS.find(v => v.id === selectedVersion) || BIBLE_VERSIONS[0];

  const quickSearchTags = [
    'Pag-ibig',
    'Jesus',
    'Pananampalataya',
    'Kapayapaan',
    'Pastol',
    'Buhay',
    'Langit',
    'Liwanag',
    'Espiritu',
    'Panginoon'
  ];

  const results: SearchResult[] = [];
  const cleanQuery = query.trim().toLowerCase();

  if (cleanQuery.length >= 2) {
    CHAPTERS.forEach((chapter) => {
      chapter.verses.forEach((verse, verseIdx) => {
        const textLower = verse.text.toLowerCase();
        const engLower = (verse.englishText || '').toLowerCase();
        const refLower = `${chapter.bookName} ${chapter.chapterNumber}:${verse.number}`.toLowerCase();
        
        let matchFound = false;
        let matchedVersionLabel: string | undefined = undefined;

        // Check active version text first
        const activeText = getVerseText(verse, selectedVersion).toLowerCase();
        if (activeText.includes(cleanQuery)) {
          matchFound = true;
          matchedVersionLabel = currentVersionObj.shortName;
        } else if (verse.versions) {
          // Check other versions
          for (const vKey of Object.keys(verse.versions) as BibleVersionId[]) {
            const vText = verse.versions[vKey]?.toLowerCase() || '';
            if (vText.includes(cleanQuery)) {
              matchFound = true;
              const vObj = BIBLE_VERSIONS.find(b => b.id === vKey);
              matchedVersionLabel = vObj ? vObj.shortName : vKey.toUpperCase();
              break;
            }
          }
        }

        if (!matchFound && (textLower.includes(cleanQuery) || engLower.includes(cleanQuery) || refLower.includes(cleanQuery))) {
          matchFound = true;
        }

        if (matchFound) {
          results.push({
            chapter,
            verse,
            matchIndex: verseIdx,
            matchedVersionLabel
          });
        }
      });
    });
  }

  const highlightMatches = (text: string, search: string) => {
    if (!search) return text;
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={i} className="bg-[#8B0000]/15 text-[#8B0000] dark:text-[#ff8585] font-bold px-0.5 rounded-xs">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="search-modal-container"
        className={`w-full max-w-2xl max-h-[85vh] flex flex-col rounded-xs border shadow-2xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#1D1B19] border-[#383531] text-[#EAE6DF]'
            : theme === 'sepia'
            ? 'bg-[#FAF6EE] border-[#DCD4C5] text-[#3D342C]'
            : 'bg-white border-[#D1CEC7] text-[#2C2C2C]'
        }`}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E8E6E1] dark:border-[#383531] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8B0000] shrink-0" />
          <input
            id="bible-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Maghanap ng salita, talata, o tema (hal. 'pag-ibig', 'Salmo 23', 'Mateo 1')..."
            autoFocus
            className="flex-1 bg-transparent text-sm sm:text-base outline-none placeholder:text-[#A09B93]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-xs text-[#7A756D] hover:text-[#8B0000]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs bg-[#F5F4F1] dark:bg-[#282522] hover:bg-[#EBE8E3] text-stone-700 dark:text-stone-300 border border-[#D1CEC7] dark:border-[#383531]"
          >
            Isara
          </button>
        </div>

        {/* Quick Keyword Chips */}
        <div className="px-4 py-2 bg-[#FDFCF9] dark:bg-[#181716] border-b border-[#E8E6E1] dark:border-[#383531] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-bold text-[#A09B93] uppercase tracking-wider shrink-0">Subukan:</span>
          {quickSearchTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2.5 py-0.5 rounded-xs text-xs bg-white dark:bg-[#22201D] border border-[#D1CEC7] dark:border-[#383531] text-stone-700 dark:text-stone-300 hover:border-[#8B0000] hover:text-[#8B0000] shrink-0 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cleanQuery.length < 2 ? (
            <div className="text-center py-12 text-[#A09B93]">
              <BookOpen className="w-10 h-10 mx-auto mb-2 opacity-40 text-[#8B0000]" />
              <p className="text-sm font-bold uppercase tracking-wider">Mag-type ng hindi bababa sa 2 letra</p>
              <p className="text-xs mt-1">Maaari kang maghanap sa buong Tagalog Biblia ({currentVersionObj.name}).</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 text-[#A09B93]">
              <p className="text-sm font-bold">Walang natagpuang talata para sa "{query}".</p>
              <p className="text-xs mt-1">Subukang maghanap ng ibang salita gaya ng "Jesus" o "kapayapaan".</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between text-[11px] text-[#A09B93] uppercase tracking-wider font-bold mb-2">
                <span>
                  Natagpuan: <strong className="text-[#8B0000] dark:text-[#ff8585]">{results.length}</strong> talata
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-xs bg-[#8B0000]/10 text-[#8B0000] dark:text-[#ff9999] border border-[#8B0000]/20">
                  {currentVersionObj.shortName}
                </span>
              </div>
              {results.map(({ chapter, verse, matchIndex, matchedVersionLabel }) => {
                const verseDisplay = getVerseText(verse, selectedVersion);
                return (
                  <div
                    key={`${chapter.id}-${verse.number}`}
                    onClick={() => {
                      onSelectResult(chapter, matchIndex);
                      onClose();
                    }}
                    className="p-3.5 rounded-xs border border-[#E8E6E1] dark:border-[#383531] hover:border-[#8B0000] bg-white dark:bg-[#201E1C] hover:bg-[#8B0000]/5 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#8B0000] dark:text-[#ff8585] font-serif">
                          {chapter.bookName} {chapter.chapterNumber}:{verse.number}
                        </span>
                        {matchedVersionLabel && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-300 dark:border-stone-700">
                            {matchedVersionLabel}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#A09B93] group-hover:text-[#8B0000] flex items-center gap-1 font-bold uppercase tracking-wider">
                        Buksan
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <p className="text-sm font-serif text-stone-800 dark:text-stone-200 line-clamp-2 leading-relaxed">
                      {highlightMatches(verseDisplay, cleanQuery)}
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
