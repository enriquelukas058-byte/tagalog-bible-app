import React from 'react';
import { Bookmark, Chapter } from '../types';
import { CHAPTERS } from '../data/bibleData';
import { X, Bookmark as BookmarkIcon, Trash2, ArrowRight, Play } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  onRemoveBookmark: (id: string) => void;
  onJumpToVerse: (chapter: Chapter, verseIndex: number) => void;
  onPlaySingle: (text: string, reference: string) => void;
  theme: string;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  onRemoveBookmark,
  onJumpToVerse,
  onPlaySingle,
  theme
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="bookmarks-drawer-panel"
        className={`w-full max-w-md h-full flex flex-col border-l shadow-2xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#1D1B19] border-[#383531] text-[#EAE6DF]'
            : theme === 'sepia'
            ? 'bg-[#FAF6EE] border-[#DCD4C5] text-[#3D342C]'
            : 'bg-white border-[#D1CEC7] text-[#2C2C2C]'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8E6E1] dark:border-[#383531] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xs bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000]">
              <BookmarkIcon className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#A09B93] uppercase tracking-[2px] block">Koleksyon</span>
              <h3 className="font-serif font-bold text-base text-[#2C2C2C] dark:text-[#EAE6DF]">Mga Naka-save na Talata</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xs border border-[#D1CEC7] dark:border-[#383531] flex items-center justify-center text-[#7A756D] hover:text-[#8B0000]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="text-center py-16 text-[#A09B93]">
              <BookmarkIcon className="w-10 h-10 mx-auto mb-3 opacity-30 text-[#8B0000]" />
              <p className="text-xs font-bold uppercase tracking-wider">Wala pang naka-save na talata</p>
              <p className="text-xs mt-1 max-w-xs mx-auto">
                Pindutin ang "I-save" o "Kulay" sa alinmang talata habang nagbabasa upang mai-save dito.
              </p>
            </div>
          ) : (
            bookmarks.map((b) => {
              const ch = CHAPTERS.find((c) => c.id === b.chapterId);
              const verseIdx = ch ? ch.verses.findIndex((v) => v.number === b.verseNumber) : 0;

              return (
                <div
                  key={b.id}
                  id={`bookmark-item-${b.id}`}
                  className="p-4 rounded-xs border border-[#E8E6E1] dark:border-[#383531] bg-white dark:bg-[#201E1C] hover:border-[#8B0000] transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-serif text-[#8B0000] dark:text-[#ff8585]">
                        {b.reference}
                      </span>
                      {b.versionName && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-xs bg-[#8B0000]/10 text-[#8B0000] dark:text-[#ff9999] border border-[#8B0000]/20">
                          {b.versionName}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {b.highlightColor && (
                        <span
                          className={`w-2.5 h-2.5 rounded-xs ${
                            b.highlightColor === 'yellow'
                              ? 'bg-[#8B0000]'
                              : b.highlightColor === 'green'
                              ? 'bg-emerald-600'
                              : b.highlightColor === 'blue'
                              ? 'bg-sky-600'
                              : 'bg-amber-500'
                          }`}
                        />
                      )}
                      <button
                        onClick={() => onRemoveBookmark(b.id)}
                        className="p-1 text-[#A09B93] hover:text-[#8B0000] transition-colors"
                        title="Alisin"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-serif italic text-stone-700 dark:text-stone-300 leading-relaxed">
                    "{b.text}"
                  </p>

                  <div className="pt-2.5 border-t border-[#F0EEEA] dark:border-[#302D2A] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onPlaySingle(b.text, b.reference)}
                      className="px-3 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider bg-[#8B0000]/10 hover:bg-[#8B0000] text-[#8B0000] hover:text-white dark:text-[#ff9999] transition-all flex items-center gap-1"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Pakinggan
                    </button>

                    {ch && (
                      <button
                        onClick={() => {
                          onJumpToVerse(ch, verseIdx >= 0 ? verseIdx : 0);
                          onClose();
                        }}
                        className="text-[11px] font-bold uppercase tracking-wider text-[#7A756D] hover:text-[#8B0000] flex items-center gap-1"
                      >
                        Puntahan
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
