import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CHAPTERS, BIBLE_VERSIONS, getVerseText } from './data/bibleData';
import { 
  Chapter, 
  FontSize, 
  PlaybackStatus, 
  ThemeMode, 
  Verse, 
  Bookmark, 
  BibleVersionId,
  TTSEnginePreference,
  TTSActiveSource,
  TTSFallbackEvent
} from './types';
import { ttsEngine } from './utils/ttsEngine';
import { Header } from './components/Header';
import { ChapterSelector } from './components/ChapterSelector';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { VerseList } from './components/VerseList';
import { DevotionalCard } from './components/DevotionalCard';
import { VerseSearchModal } from './components/VerseSearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AiReflectionModal } from './components/AiReflectionModal';

export default function App() {
  // Default to Mateo 1 as highlighted in user prompt
  const [currentChapter, setCurrentChapter] = useState<Chapter>(() => {
    return CHAPTERS.find((c) => c.id === 'mateo-1') || CHAPTERS[0];
  });

  const [currentVerseIndex, setCurrentVerseIndex] = useState<number>(0);
  const [playbackStatus, setPlaybackStatus] = useState<PlaybackStatus>('idle');

  // Bible Version Selector State
  const [selectedVersion, setSelectedVersion] = useState<BibleVersionId>(() => {
    const saved = localStorage.getItem('tagalog_bible_version');
    if (saved && ['adb', 'mbb', 'snd'].includes(saved)) {
      return saved as BibleVersionId;
    }
    return 'adb';
  });

  // Reading & Display Preferences
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('tagalog_bible_theme');
    return (saved as ThemeMode) || 'light';
  });

  const [fontSize, setFontSize] = useState<FontSize>(() => {
    const saved = localStorage.getItem('tagalog_bible_fontsize');
    return (saved as FontSize) || 'md';
  });

  const [showEnglish, setShowEnglish] = useState<boolean>(() => {
    return localStorage.getItem('tagalog_bible_show_en') === 'true';
  });

  // Audio / TTS Preferences & Engine Modes
  const [enginePreference, setEnginePreference] = useState<TTSEnginePreference>(() => {
    const saved = localStorage.getItem('tagalog_bible_tts_pref');
    if (saved && ['auto', 'ai', 'browser'].includes(saved)) {
      return saved as TTSEnginePreference;
    }
    return 'auto';
  });

  const [activeSource, setActiveSource] = useState<TTSActiveSource>('ai');
  const [aiVoice, setAIVoice] = useState<string>('Kore');
  const [fallbackEvent, setFallbackEvent] = useState<TTSFallbackEvent | null>(null);

  const [rate, setRate] = useState<number>(1.0);
  const [pitch, setPitch] = useState<number>(1.0);
  const [volume, setVolume] = useState<number>(1.0);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);
  const [continuous, setContinuous] = useState<boolean>(true);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  // Bookmarks & Highlights
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('tagalog_bible_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [reflectionVerse, setReflectionVerse] = useState<Verse | null>(null);

  // Save Preferences
  useEffect(() => {
    localStorage.setItem('tagalog_bible_version', selectedVersion);
  }, [selectedVersion]);

  useEffect(() => {
    localStorage.setItem('tagalog_bible_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('tagalog_bible_fontsize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('tagalog_bible_show_en', showEnglish ? 'true' : 'false');
  }, [showEnglish]);

  useEffect(() => {
    localStorage.setItem('tagalog_bible_tts_pref', enginePreference);
  }, [enginePreference]);

  useEffect(() => {
    localStorage.setItem('tagalog_bible_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Bind TTS Callbacks & Sync Initial Config
  useEffect(() => {
    ttsEngine.setEnginePreference(enginePreference);
    ttsEngine.setAIVoice(aiVoice);
    ttsEngine.setRate(rate);
    ttsEngine.setPitch(pitch);
    ttsEngine.setVolume(volume);
    ttsEngine.setContinuous(continuous);

    ttsEngine.setCallbacks({
      onVerseChange: (index) => {
        setCurrentVerseIndex(index);
      },
      onStatusChange: (status) => {
        setPlaybackStatus(status);
      },
      onSourceChange: (source) => {
        setActiveSource(source);
      },
      onFallbackActivated: (evt) => {
        setFallbackEvent(evt);
        setActiveSource('browser');
      },
      onError: (msg) => {
        console.warn('TTS Error:', msg);
      }
    });
  }, [enginePreference, aiVoice, rate, pitch, volume, continuous]);

  // Reset fallback and retry AI TTS
  const handleResetFallback = useCallback(() => {
    ttsEngine.resetFallback();
    setFallbackEvent(null);
    setActiveSource(enginePreference === 'browser' ? 'browser' : 'ai');
  }, [enginePreference]);

  // Clear Fallback Notice Banner
  const handleClearFallbackEvent = useCallback(() => {
    setFallbackEvent(null);
  }, []);

  // Verses formatted with the active Bible version for TTS and display
  const activeVersionedVerses = useMemo(() => {
    return currentChapter.verses.map((v) => ({
      ...v,
      text: getVerseText(v, selectedVersion)
    }));
  }, [currentChapter, selectedVersion]);

  // Playback Control Handlers
  const handlePlay = useCallback((startIndex?: number) => {
    const idx = startIndex !== undefined ? startIndex : currentVerseIndex;
    ttsEngine.playList(activeVersionedVerses, idx);
  }, [activeVersionedVerses, currentVerseIndex]);

  const handlePause = useCallback(() => {
    ttsEngine.pause();
  }, []);

  const handleResume = useCallback(() => {
    ttsEngine.resume();
  }, []);

  const handleStop = useCallback(() => {
    ttsEngine.stop();
  }, []);

  const handleNextVerse = useCallback(() => {
    ttsEngine.next();
  }, []);

  const handlePrevVerse = useCallback(() => {
    ttsEngine.previous();
  }, []);

  const handlePlayFromVerse = useCallback((index: number) => {
    setCurrentVerseIndex(index);
    ttsEngine.playList(activeVersionedVerses, index);
  }, [activeVersionedVerses]);

  const handlePlaySingleVerse = useCallback((verse: Verse, index: number) => {
    setCurrentVerseIndex(index);
    const versionedSingle: Verse = {
      ...verse,
      text: getVerseText(verse, selectedVersion)
    };
    ttsEngine.playSingle(versionedSingle);
  }, [selectedVersion]);

  const handlePlayDevotional = useCallback((text: string, reference: string) => {
    ttsEngine.playSingle({
      number: 0,
      text: `${reference}. ${text}`
    });
  }, []);

  // Chapter Selection
  const handleSelectChapter = useCallback((chapter: Chapter, targetVerseIndex?: number) => {
    ttsEngine.stop();
    setCurrentChapter(chapter);
    setCurrentVerseIndex(targetVerseIndex || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Change Version Handler
  const handleSelectVersion = useCallback((versionId: BibleVersionId) => {
    setSelectedVersion(versionId);
    // If currently playing, stop TTS cleanly
    if (ttsEngine.getStatus() === 'playing') {
      ttsEngine.stop();
    }
  }, []);

  // Bookmark and Highlight toggles
  const handleToggleBookmark = useCallback((verse: Verse, color?: 'yellow' | 'green' | 'blue' | 'pink') => {
    const currentVersionObj = BIBLE_VERSIONS.find(v => v.id === selectedVersion) || BIBLE_VERSIONS[0];
    const reference = `${currentChapter.bookName} ${currentChapter.chapterNumber}:${verse.number}`;
    const textForBookmark = getVerseText(verse, selectedVersion);

    setBookmarks((prev) => {
      const existing = prev.find(
        (b) => b.chapterId === currentChapter.id && b.verseNumber === verse.number
      );

      if (existing) {
        if (color && existing.highlightColor !== color) {
          // Update color
          return prev.map((b) => (b.id === existing.id ? { ...b, highlightColor: color } : b));
        }
        // Remove
        return prev.filter((b) => b.id !== existing.id);
      } else {
        // Add
        const newBookmark: Bookmark = {
          id: `${currentChapter.id}-${verse.number}-${Date.now()}`,
          chapterId: currentChapter.id,
          reference,
          verseNumber: verse.number,
          text: textForBookmark,
          dateAdded: new Date().toLocaleDateString('fil-PH'),
          highlightColor: color || 'yellow',
          versionId: selectedVersion,
          versionName: currentVersionObj.shortName
        };
        return [newBookmark, ...prev];
      }
    });
  }, [currentChapter, selectedVersion]);

  const isVerseBookmarked = useCallback((verseNumber: number) => {
    return bookmarks.some(
      (b) => b.chapterId === currentChapter.id && b.verseNumber === verseNumber
    );
  }, [bookmarks, currentChapter]);

  const getVerseHighlightColor = useCallback((verseNumber: number) => {
    const found = bookmarks.find(
      (b) => b.chapterId === currentChapter.id && b.verseNumber === verseNumber
    );
    return found?.highlightColor;
  }, [bookmarks, currentChapter]);

  const handleRemoveBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (playbackStatus === 'playing') {
          handlePause();
        } else if (playbackStatus === 'paused') {
          handleResume();
        } else {
          handlePlay();
        }
      } else if (e.code === 'ArrowRight') {
        handleNextVerse();
      } else if (e.code === 'ArrowLeft') {
        handlePrevVerse();
      } else if (e.code === 'Escape') {
        handleStop();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playbackStatus, handlePlay, handlePause, handleResume, handleStop, handleNextVerse, handlePrevVerse]);

  // Dynamic Theme Background Styling
  const getThemeBackground = () => {
    switch (theme) {
      case 'dark':
        return 'bg-[#151413] text-[#EBE8E3]';
      case 'sepia':
        return 'bg-[#F9F5EC] text-[#3D342C]';
      case 'light':
      default:
        return 'bg-[#FDFCF9] text-[#2C2C2C]';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${getThemeBackground()} flex flex-col font-sans selection:bg-[#8B0000]/20 selection:text-[#8B0000]`}>
      {/* Top Header */}
      <Header
        theme={theme}
        setTheme={setTheme}
        fontSize={fontSize}
        setFontSize={setFontSize}
        showEnglish={showEnglish}
        setShowEnglish={setShowEnglish}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        bookmarksCount={bookmarks.length}
        isSpeaking={playbackStatus === 'playing'}
        currentChapter={currentChapter}
        selectedVersion={selectedVersion}
        onSelectVersion={handleSelectVersion}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 pt-5 sm:pt-7 pb-28">
        {/* Daily Devotional Card */}
        <DevotionalCard
          onSelectVerse={(chapter, verseNum) => {
            const verseIdx = chapter.verses.findIndex((v) => v.number === verseNum);
            handleSelectChapter(chapter, verseIdx >= 0 ? verseIdx : 0);
          }}
          onPlayDevotional={handlePlayDevotional}
          theme={theme}
          selectedVersion={selectedVersion}
        />

        {/* Chapter & Book Navigation */}
        <ChapterSelector
          currentChapter={currentChapter}
          onSelectChapter={handleSelectChapter}
          isSpeaking={playbackStatus === 'playing'}
        />

        {/* Verses Reading View */}
        <VerseList
          chapter={currentChapter}
          activeVerseIndex={currentVerseIndex}
          isSpeaking={playbackStatus === 'playing'}
          onPlayFromVerse={handlePlayFromVerse}
          onPlaySingleVerse={handlePlaySingleVerse}
          onExplainVerse={(verse) => setReflectionVerse(verse)}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isVerseBookmarked}
          getHighlightColor={getVerseHighlightColor}
          fontSize={fontSize}
          theme={theme}
          showEnglish={showEnglish}
          autoScroll={autoScroll}
          selectedVersion={selectedVersion}
          onSelectVersion={handleSelectVersion}
        />
      </main>

      {/* Sticky Bottom Audio TTS Player Bar with AI & Browser Fallback System */}
      <AudioPlayerBar
        currentChapter={currentChapter}
        currentVerseIndex={currentVerseIndex}
        playbackStatus={playbackStatus}
        onPlay={handlePlay}
        onPause={handlePause}
        onResume={handleResume}
        onStop={handleStop}
        onNextVerse={handleNextVerse}
        onPrevVerse={handlePrevVerse}
        rate={rate}
        setRate={setRate}
        pitch={pitch}
        setPitch={setPitch}
        volume={volume}
        setVolume={setVolume}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        continuous={continuous}
        setContinuous={setContinuous}
        selectedVoice={selectedVoice}
        setSelectedVoice={setSelectedVoice}
        enginePreference={enginePreference}
        setEnginePreference={setEnginePreference}
        activeSource={activeSource}
        aiVoice={aiVoice}
        setAIVoice={setAIVoice}
        fallbackEvent={fallbackEvent}
        onClearFallbackEvent={handleClearFallbackEvent}
        onResetFallback={handleResetFallback}
        theme={theme}
        selectedVersion={selectedVersion}
      />

      {/* Search Modal */}
      <VerseSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(chapter, verseIndex) => {
          handleSelectChapter(chapter, verseIndex);
        }}
        theme={theme}
        selectedVersion={selectedVersion}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarks={bookmarks}
        onRemoveBookmark={handleRemoveBookmark}
        onJumpToVerse={(chapter, verseIndex) => {
          handleSelectChapter(chapter, verseIndex);
        }}
        onPlaySingle={handlePlayDevotional}
        theme={theme}
      />

      {/* AI Explanation / Reflection Modal */}
      <AiReflectionModal
        isOpen={!!reflectionVerse}
        onClose={() => setReflectionVerse(null)}
        verse={reflectionVerse}
        chapter={currentChapter}
        theme={theme}
        selectedVersion={selectedVersion}
      />
    </div>
  );
}
