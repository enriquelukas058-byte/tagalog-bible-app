import React from 'react';
import { Book, Chapter } from '../types';
import { BOOKS, CHAPTERS } from '../data/bibleData';
import { BookOpen, Sparkles, Check } from 'lucide-react';

interface ChapterSelectorProps {
  currentChapter: Chapter;
  onSelectChapter: (chapter: Chapter) => void;
  isSpeaking: boolean;
}

export const ChapterSelector: React.FC<ChapterSelectorProps> = ({
  currentChapter,
  onSelectChapter,
  isSpeaking
}) => {
  const [testament, setTestament] = React.useState<'Bagong Tipan' | 'Lumang Tipan'>(
    currentChapter.testament
  );

  const filteredBooks = BOOKS.filter((b) => b.testament === testament);

  const popularChapters = [
    { id: 'mateo-1', label: 'Mateo 1', subtitle: 'Kapanganakan ni Jesus' },
    { id: 'mateo-5', label: 'Mateo 5', subtitle: 'Ang mga Mapapalad' },
    { id: 'salmo-23', label: 'Salmo 23', subtitle: 'Ang Pastol' },
    { id: 'juan-3', label: 'Juan 3', subtitle: 'Pag-ibig ng Diyos' },
    { id: 'roma-8', label: 'Roma 8', subtitle: 'Espiritu' },
    { id: '1corinto-13', label: '1 Corinto 13', subtitle: 'Pag-ibig' },
    { id: 'genesis-1', label: 'Genesis 1', subtitle: 'Paglikha' },
    { id: 'filipos-4', label: 'Filipos 4', subtitle: 'Kalakasan' }
  ];

  return (
    <div id="chapter-selector-container" className="mb-6 space-y-4">
      {/* Quick Jump Chips (Geometric Balance) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[10px] font-bold text-[#A09B93] uppercase tracking-[2px] flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-[#8B0000] dark:text-[#ff8080]" />
          Mga Sikat:
        </span>
        {popularChapters.map((item) => {
          const isCurrent = currentChapter.id === item.id;
          return (
            <button
              key={item.id}
              id={`quick-jump-${item.id}`}
              onClick={() => {
                const target = CHAPTERS.find((c) => c.id === item.id);
                if (target) {
                  onSelectChapter(target);
                  setTestament(target.testament);
                }
              }}
              className={`px-3 py-1 rounded-xs text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 border ${
                isCurrent
                  ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                  : 'bg-white dark:bg-[#1E1C1A] border-[#D1CEC7] dark:border-[#383531] text-stone-700 dark:text-stone-300 hover:bg-[#F5F4F1] dark:hover:bg-[#282522]'
              }`}
            >
              <span>{item.label}</span>
              <span className={`text-[10px] ${isCurrent ? 'text-white/80' : 'text-[#7A756D]'}`}>
                • {item.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Chapter Navigation Card */}
      <div className="p-5 sm:p-6 rounded-xs bg-white dark:bg-[#1D1B19] border border-[#E8E6E1] dark:border-[#383531] shadow-xs relative">
        {/* Floating Tag */}
        <div className="absolute top-[-10px] left-6 px-3 bg-[#FDFCF9] dark:bg-[#151413] text-[10px] text-[#A09B93] uppercase tracking-[3px] font-bold">
          Aklat at Kabanata
        </div>

        {/* Testament Switch */}
        <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-[#F0EEEA] dark:border-[#302D2A]">
          <div className="flex items-center gap-1.5 bg-[#F5F4F1] dark:bg-[#242220] p-1 rounded-xs border border-[#D1CEC7] dark:border-[#383531]">
            <button
              id="testament-new-btn"
              onClick={() => setTestament('Bagong Tipan')}
              className={`px-3.5 py-1.5 rounded-xs text-xs font-bold transition-all uppercase tracking-wider ${
                testament === 'Bagong Tipan'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Bagong Tipan
            </button>
            <button
              id="testament-old-btn"
              onClick={() => setTestament('Lumang Tipan')}
              className={`px-3.5 py-1.5 rounded-xs text-xs font-bold transition-all uppercase tracking-wider ${
                testament === 'Lumang Tipan'
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              Lumang Tipan
            </button>
          </div>

          <div className="text-[11px] text-[#7A756D] uppercase tracking-wider font-semibold hidden md:block">
            Kasalukuyang Binabasa: <strong className="text-[#8B0000] dark:text-[#ff8080] font-serif italic">{currentChapter.bookName} {currentChapter.chapterNumber}</strong>
          </div>
        </div>

        {/* Books & Available Chapters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {filteredBooks.map((book) => {
            const isBookActive = currentChapter.bookId === book.id;
            return (
              <div
                key={book.id}
                id={`book-card-${book.id}`}
                className={`p-3.5 rounded-xs border transition-all ${
                  isBookActive
                    ? 'border-[#8B0000] bg-[#8B0000]/5 dark:bg-[#8B0000]/10'
                    : 'border-[#E8E6E1] dark:border-[#383531] bg-[#FDFCF9] dark:bg-[#201E1C] hover:border-[#D1CEC7]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5 uppercase tracking-tight">
                    <BookOpen className="w-3.5 h-3.5 text-[#8B0000] dark:text-[#ff8080]" />
                    {book.name}
                  </span>
                  <span className="text-[10px] text-[#A09B93] uppercase font-bold tracking-wider">
                    {book.category}
                  </span>
                </div>

                {/* Available Chapters Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {book.availableChapters.map((chNum) => {
                    const chId = `${book.id}-${chNum}`;
                    const isSelected = currentChapter.id === chId;
                    return (
                      <button
                        key={chNum}
                        id={`select-chapter-${chId}`}
                        onClick={() => {
                          const target = CHAPTERS.find((c) => c.id === chId);
                          if (target) onSelectChapter(target);
                        }}
                        className={`px-2.5 py-1 rounded-xs text-xs font-bold transition-all flex items-center gap-1 border ${
                          isSelected
                            ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                            : 'bg-white dark:bg-[#2A2724] border-[#D1CEC7] dark:border-[#383531] text-stone-700 dark:text-stone-300 hover:bg-[#F5F4F1]'
                        }`}
                        title={`Buksan ang ${book.name} Kabanata ${chNum}`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                        Kab. {chNum}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
