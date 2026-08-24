export type BibleVersionId = 'adb' | 'mbb' | 'snd';

export interface BibleVersion {
  id: BibleVersionId;
  name: string;
  shortName: string;
  subtitle: string;
  year: string;
  description: string;
}

export interface Verse {
  number: number;
  text: string;
  versions?: Partial<Record<BibleVersionId, string>>;
  englishText?: string;
  notes?: string;
}

export interface Chapter {
  id: string;
  bookId: string;
  bookName: string;
  chapterNumber: number;
  title: string;
  testament: 'Lumang Tipan' | 'Bagong Tipan';
  summary?: string;
  verses: Verse[];
}

export interface Book {
  id: string;
  name: string;
  testament: 'Lumang Tipan' | 'Bagong Tipan';
  category: 'Kasaysayan' | 'Ebanghelyo' | 'Mga Tula at Karunungan' | 'Mga Sulat' | 'Panghuhula';
  chaptersCount: number;
  availableChapters: number[];
}

export type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'stopped';
export type TTSEnginePreference = 'auto' | 'ai' | 'browser';
export type TTSActiveSource = 'ai' | 'browser';

export interface TTSFallbackEvent {
  reason: 'quota' | 'error' | 'no_key' | 'offline';
  message: string;
  timestamp: number;
}

export interface TTSState {
  status: PlaybackStatus;
  currentVerseIndex: number;
  totalVerses: number;
  rate: number; // 0.75, 1.0, 1.25, 1.5
  pitch: number; // 0.8, 1.0, 1.2
  volume: number;
  voice: SpeechSynthesisVoice | null;
  autoScroll: boolean;
  continuous: boolean;
  enginePreference: TTSEnginePreference;
  activeSource: TTSActiveSource;
}

export type ThemeMode = 'light' | 'sepia' | 'dark';
export type FontSize = 'sm' | 'md' | 'lg' | 'xl';

export interface Bookmark {
  id: string;
  chapterId: string;
  reference: string;
  verseNumber: number;
  text: string;
  versionId?: BibleVersionId;
  versionName?: string;
  dateAdded: string;
  highlightColor?: 'yellow' | 'green' | 'blue' | 'pink';
}
