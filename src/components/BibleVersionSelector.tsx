import React, { useState, useRef, useEffect } from 'react';
import { BookOpen, Check, ChevronDown, Sparkles } from 'lucide-react';
import { BibleVersion, BibleVersionId } from '../types';
import { BIBLE_VERSIONS } from '../data/bibleData';

interface BibleVersionSelectorProps {
  selectedVersion: BibleVersionId;
  onSelectVersion: (versionId: BibleVersionId) => void;
  compact?: boolean;
}

export const BibleVersionSelector: React.FC<BibleVersionSelectorProps> = ({
  selectedVersion,
  onSelectVersion,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeVersion = BIBLE_VERSIONS.find(v => v.id === selectedVersion) || BIBLE_VERSIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (versionId: BibleVersionId) => {
    onSelectVersion(versionId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        id="bible-version-selector-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-xs border font-semibold transition-all ${
          compact
            ? 'px-2.5 py-1.5 text-xs bg-[#FDFCF9] dark:bg-[#201E1C] border-[#D1CEC7] dark:border-[#383531] text-stone-800 dark:text-stone-200 hover:bg-[#F5F4F1] dark:hover:bg-[#2A2724]'
            : 'px-3 py-2 text-xs sm:text-sm bg-[#FDFCF9] dark:bg-[#201E1C] border-[#D1CEC7] dark:border-[#383531] text-stone-800 dark:text-stone-200 hover:border-[#8B0000] shadow-xs'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title="Pumili ng Bersyon ng Banal na Kasulatan"
      >
        <BookOpen className="w-3.5 h-3.5 text-[#8B0000] dark:text-[#ff8080] shrink-0" />
        <span className="font-bold text-[#8B0000] dark:text-[#ff9999] tracking-wide">
          {activeVersion.shortName}
        </span>
        <span className="hidden sm:inline text-stone-600 dark:text-stone-300 font-normal">
          • {activeVersion.subtitle}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div 
          id="bible-version-dropdown"
          className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 w-72 sm:w-84 origin-top-left bg-[#FDFCF9] dark:bg-[#1E1C1A] border border-[#D1CEC7] dark:border-[#383531] rounded-xs shadow-xl z-50 p-2 space-y-1.5 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-1.5 border-b border-[#E6E2DA] dark:border-[#2D2A26] flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B0000] dark:text-[#ff9999]">
              Mga Bersyon ng Biblia
            </span>
            <span className="text-[10px] text-stone-400 font-medium">
              Tagalog Translations
            </span>
          </div>

          <div className="space-y-1 pt-1">
            {BIBLE_VERSIONS.map((version) => {
              const isSelected = version.id === selectedVersion;
              return (
                <button
                  key={version.id}
                  id={`select-version-${version.id}`}
                  onClick={() => handleSelect(version.id)}
                  className={`w-full text-left p-2.5 rounded-xs transition-all flex items-start justify-between gap-3 border ${
                    isSelected
                      ? 'bg-[#8B0000]/8 dark:bg-[#8B0000]/20 border-[#8B0000] text-stone-900 dark:text-stone-100'
                      : 'border-transparent hover:border-[#D1CEC7] dark:hover:border-[#383531] hover:bg-[#F5F4F1] dark:hover:bg-[#272421] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-xs tracking-wider ${
                        isSelected
                          ? 'bg-[#8B0000] text-white'
                          : 'bg-[#EAE6DF] dark:bg-[#2F2C28] text-stone-700 dark:text-stone-300'
                      }`}>
                        {version.shortName}
                      </span>
                      <span className="text-xs font-bold font-serif text-stone-900 dark:text-stone-100">
                        {version.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-snug">
                      {version.description}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                      <span>{version.subtitle}</span>
                      <span>•</span>
                      <span>{version.year}</span>
                    </div>
                  </div>

                  <div className="pt-0.5 shrink-0">
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-[#8B0000] text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border border-stone-300 dark:border-stone-700" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-1.5 mt-1 border-t border-[#E6E2DA] dark:border-[#2D2A26] px-2 text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#8B0000] shrink-0" />
            <span>Ang Text-to-Speech ay babasahin ang napiling bersyon.</span>
          </div>
        </div>
      )}
    </div>
  );
};
