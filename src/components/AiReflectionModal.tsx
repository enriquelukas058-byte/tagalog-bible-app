import React, { useState, useEffect } from 'react';
import { X, Sparkles, Volume2, Loader2 } from 'lucide-react';
import { Verse, Chapter, BibleVersionId } from '../types';
import { ttsEngine } from '../utils/ttsEngine';
import { getVerseText, BIBLE_VERSIONS } from '../data/bibleData';

interface AiReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  verse: Verse | null;
  chapter: Chapter | null;
  theme: string;
  selectedVersion: BibleVersionId;
}

export const AiReflectionModal: React.FC<AiReflectionModalProps> = ({
  isOpen,
  onClose,
  verse,
  chapter,
  theme,
  selectedVersion
}) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string>('');
  const [isSpeakingExplanation, setIsSpeakingExplanation] = useState(false);

  const currentVersionObj = BIBLE_VERSIONS.find(v => v.id === selectedVersion) || BIBLE_VERSIONS[0];
  const verseText = verse ? getVerseText(verse, selectedVersion) : '';

  useEffect(() => {
    if (!isOpen || !verse || !chapter) return;

    let isMounted = true;
    setLoading(true);
    setExplanation('');
    setIsSpeakingExplanation(false);

    const reference = `${chapter.bookName} ${chapter.chapterNumber}:${verse.number}`;

    const fetchExplanation = async () => {
      try {
        const response = await fetch('/api/explain-verse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reference,
            verseText,
            version: currentVersionObj.name
          })
        });

        if (!response.ok) {
          throw new Error('Network error');
        }

        const data = await response.json();
        if (isMounted) {
          setExplanation(data.explanation || data.fallback);
        }
      } catch (err) {
        if (isMounted) {
          // Robust high quality Tagalog fallback reflection
          setExplanation(
            `### Konteksto at Kahulugan\nAng talatang ito mula sa **${reference}** (${currentVersionObj.shortName}) ay nagpapahayag ng katotohanan ng Salita ng Diyos na nagbibigay-liwanag sa ating buhay.\n\n### Aplikasyon sa Buhay\n1. **Pagtitiwala**: Isuko ang mga pangamba at manangan sa Kaniyang mga pangako.\n2. **Pagsunod**: Isabuhay ang katuwiran at pag-ibig sa kapwa sa araw-araw.\n\n### Maikling Panalangin\n*Panginoon, salamat po sa Iyong Salita na nagiging ilawan sa aming mga paa. Tulungan Mo po kaming maging tapat at mamuhay ayon sa Iyong kalooban sa Ngalan ni Jesus, Amen.*`
          );
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchExplanation();

    return () => {
      isMounted = false;
      ttsEngine.stop();
    };
  }, [isOpen, verse, chapter, verseText, currentVersionObj]);

  if (!isOpen || !verse || !chapter) return null;

  const reference = `${chapter.bookName} ${chapter.chapterNumber}:${verse.number}`;

  const handleSpeakExplanation = () => {
    if (isSpeakingExplanation) {
      ttsEngine.stop();
      setIsSpeakingExplanation(false);
    } else {
      const cleanText = explanation.replace(/[#*_]/g, '');
      const explanationVerse: Verse = {
        number: 0,
        text: `Paliwanag para sa ${reference}. ${cleanText}`
      };
      ttsEngine.playSingle(explanationVerse);
      setIsSpeakingExplanation(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="reflection-modal-container"
        className={`w-full max-w-xl max-h-[85vh] flex flex-col rounded-xs border shadow-2xl overflow-hidden ${
          theme === 'dark'
            ? 'bg-[#1D1B19] border-[#383531] text-[#EAE6DF]'
            : theme === 'sepia'
            ? 'bg-[#FAF6EE] border-[#DCD4C5] text-[#3D342C]'
            : 'bg-white border-[#D1CEC7] text-[#2C2C2C]'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E6E1] dark:border-[#383531] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#A09B93] uppercase tracking-[2px] block">Aral at Gabay</span>
              <h3 className="font-serif font-bold text-base text-[#2C2C2C] dark:text-[#EAE6DF]">
                Paliwanag sa Talata
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              ttsEngine.stop();
              onClose();
            }}
            className="w-8 h-8 rounded-xs border border-[#D1CEC7] dark:border-[#383531] flex items-center justify-center text-[#7A756D] hover:text-[#8B0000]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Verse Reference Banner */}
        <div className="p-4 bg-[#FDFCF9] dark:bg-[#181716] border-b border-[#E8E6E1] dark:border-[#383531]">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#8B0000] dark:text-[#ff8585] font-serif">
              {reference}
            </div>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-[#8B0000]/10 text-[#8B0000] dark:text-[#ff9999] border border-[#8B0000]/20">
              {currentVersionObj.name}
            </span>
          </div>
          <p className="font-serif italic text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
            "{verseText}"
          </p>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-[#A09B93]">
              <Loader2 className="w-6 h-6 animate-spin text-[#8B0000]" />
              <p className="text-xs uppercase tracking-wider font-bold">
                Inihahanda ang paliwanag...
              </p>
            </div>
          ) : (
            <div className="prose dark:prose-invert prose-stone max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
              {explanation}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!loading && explanation && (
          <div className="p-4 border-t border-[#E8E6E1] dark:border-[#383531] flex items-center justify-between gap-3 bg-[#FDFCF9] dark:bg-[#181716]">
            <button
              id="tts-read-explanation-btn"
              onClick={handleSpeakExplanation}
              className={`px-3.5 py-2 rounded-xs text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all border ${
                isSpeakingExplanation
                  ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                  : 'bg-white dark:bg-[#282522] border-[#D1CEC7] dark:border-[#383531] text-[#8B0000] hover:bg-[#8B0000] hover:text-white hover:border-[#8B0000]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              {isSpeakingExplanation ? 'Ihinto' : 'Pakinggan ang Paliwanag'}
            </button>

            <button
              onClick={() => {
                ttsEngine.stop();
                onClose();
              }}
              className="px-4 py-2 rounded-xs bg-[#8B0000] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#700000] transition-colors"
            >
              Salamat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
