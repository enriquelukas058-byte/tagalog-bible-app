import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Sparkles, 
  Globe, 
  AlertTriangle, 
  X, 
  RotateCcw,
  Bot,
  Zap,
  Info
} from 'lucide-react';
import { 
  Chapter, 
  PlaybackStatus, 
  Verse, 
  BibleVersionId, 
  TTSEnginePreference, 
  TTSActiveSource, 
  TTSFallbackEvent 
} from '../types';
import { ttsEngine, TTSVoiceOption } from '../utils/ttsEngine';
import { BIBLE_VERSIONS } from '../data/bibleData';

interface AudioPlayerBarProps {
  currentChapter: Chapter;
  currentVerseIndex: number;
  playbackStatus: PlaybackStatus;
  onPlay: (startIndex?: number) => void;
  onPause: () => void;
  onResume: () => void;
  onStop: () => void;
  onNextVerse: () => void;
  onPrevVerse: () => void;
  rate: number;
  setRate: (rate: number) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  volume: number;
  setVolume: (volume: number) => void;
  autoScroll: boolean;
  setAutoScroll: (val: boolean) => void;
  continuous: boolean;
  setContinuous: (val: boolean) => void;
  selectedVoice: SpeechSynthesisVoice | null;
  setSelectedVoice: (voice: SpeechSynthesisVoice | null) => void;
  enginePreference: TTSEnginePreference;
  setEnginePreference: (pref: TTSEnginePreference) => void;
  activeSource: TTSActiveSource;
  aiVoice: string;
  setAIVoice: (voice: string) => void;
  fallbackEvent: TTSFallbackEvent | null;
  onClearFallbackEvent: () => void;
  onResetFallback: () => void;
  theme: string;
  selectedVersion?: BibleVersionId;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  currentChapter,
  currentVerseIndex,
  playbackStatus,
  onPlay,
  onPause,
  onResume,
  onStop,
  onNextVerse,
  onPrevVerse,
  rate,
  setRate,
  pitch,
  setPitch,
  volume,
  setVolume,
  autoScroll,
  setAutoScroll,
  continuous,
  setContinuous,
  selectedVoice,
  setSelectedVoice,
  enginePreference,
  setEnginePreference,
  activeSource,
  aiVoice,
  setAIVoice,
  fallbackEvent,
  onClearFallbackEvent,
  onResetFallback,
  theme,
  selectedVersion
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<TTSVoiceOption[]>([]);
  const isPlaying = playbackStatus === 'playing';
  const isPaused = playbackStatus === 'paused';

  const currentVersionObj = selectedVersion ? BIBLE_VERSIONS.find(v => v.id === selectedVersion) : null;
  const currentVerse: Verse | undefined = currentChapter.verses[currentVerseIndex];
  const progressPercent = currentChapter.verses.length > 0
    ? ((currentVerseIndex + 1) / currentChapter.verses.length) * 100
    : 0;

  useEffect(() => {
    const updateVoices = () => {
      const voices = ttsEngine.getAvailableVoices();
      setAvailableVoices(voices);
      if (!selectedVoice && voices.length > 0) {
        const pref = ttsEngine.getPreferredTagalogVoice();
        if (pref) {
          setSelectedVoice(pref);
        }
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [selectedVoice, setSelectedVoice]);

  const rates = [0.75, 1.0, 1.25, 1.5];

  const aiVoiceOptions = [
    { id: 'Kore', name: 'Kore', label: 'Mainit & Mahinahon (Warm/Natural)' },
    { id: 'Puck', name: 'Puck', label: 'Banayad & Magalang (Gentle)' },
    { id: 'Fenrir', name: 'Fenrir', label: 'Malalim & Pormal (Deep/Reverent)' },
    { id: 'Zephyr', name: 'Zephyr', label: 'Malinaw & Masigla (Clear/Vibrant)' }
  ];

  return (
    <div
      id="audio-player-bar"
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 shadow-2xl border-t ${
        theme === 'dark'
          ? 'bg-[#181716]/98 border-[#383531] text-[#EAE6DF]'
          : theme === 'sepia'
          ? 'bg-[#FAF6EE]/98 border-[#DCD4C5] text-[#3D342C]'
          : 'bg-white/98 border-[#D1CEC7] text-[#2C2C2C]'
      } backdrop-blur-md`}
    >
      {/* Fallback Notification Banner */}
      {fallbackEvent && (
        <div
          id="tts-fallback-notification"
          className="bg-amber-500/15 border-b border-amber-500/30 px-3 sm:px-6 py-2 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200 animate-in slide-in-from-bottom-2 duration-300"
        >
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <div className="truncate">
              <span className="font-bold">Awtomatikong Fallback: </span>
              <span>{fallbackEvent.message}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="tts-retry-ai-btn"
              onClick={onResetFallback}
              className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-xs bg-[#8B0000] text-white hover:bg-[#700000] active:scale-95 transition-all shadow-xs"
              title="Subukan muling gamitin ang AI Audio API"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Subukan Uli ang AI</span>
            </button>
            <button
              id="tts-dismiss-fallback-btn"
              onClick={onClearFallbackEvent}
              className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded-xs text-amber-800 dark:text-amber-300 transition-colors"
              title="Isara ang abiso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Chapter Playback Progress Line */}
      <div className="w-full bg-[#E8E6E1] dark:bg-[#2C2926] h-1 relative overflow-hidden">
        <div
          className="h-full bg-[#8B0000] transition-all duration-300 relative"
          style={{ width: `${progressPercent}%` }}
        >
          {isPlaying && (
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/70 animate-pulse" />
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-2.5 sm:py-3 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Current Playing Verse Status & Audio Engine Badges */}
          <div className="flex items-center gap-3 w-full md:w-1/3 min-w-0">
            {/* Visualizer / Play Icon Badge */}
            <div className="w-10 h-10 rounded-xs bg-[#F5F4F1] dark:bg-[#242220] border border-[#D1CEC7] dark:border-[#383531] flex items-center justify-center shrink-0">
              {isPlaying ? (
                <div className="flex items-end gap-0.5 h-4 px-1">
                  <span className="w-1 bg-[#8B0000] animate-[bounce_0.6s_infinite_100ms] h-3.5" />
                  <span className="w-1 bg-[#8B0000] animate-[bounce_0.6s_infinite_300ms] h-4" />
                  <span className="w-1 bg-[#8B0000] animate-[bounce_0.6s_infinite_200ms] h-2.5" />
                  <span className="w-1 bg-[#8B0000] animate-[bounce_0.6s_infinite_400ms] h-4" />
                </div>
              ) : isPaused ? (
                <Pause className="w-4 h-4 text-[#8B0000]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#7A756D]" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#A09B93]">Binabasa:</span>
                <span className="font-serif italic font-bold text-xs sm:text-sm text-[#8B0000] dark:text-[#ff8585] truncate">
                  {currentChapter.bookName} {currentChapter.chapterNumber}:{currentVerse?.number || 1}
                </span>
                
                {/* Bible Version Short Tag */}
                {currentVersionObj && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-xs bg-[#8B0000]/10 text-[#8B0000] dark:text-[#ff9999] border border-[#8B0000]/20">
                    {currentVersionObj.shortName}
                  </span>
                )}

                {/* Active Voice Engine Tag */}
                {activeSource === 'ai' ? (
                  <span 
                    className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                    title="Gumagamit ng AI Voice (Gemini TTS API)"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
                    AI Voice ({aiVoice})
                  </span>
                ) : (
                  <span 
                    className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded-xs bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/30"
                    title="Gumagamit ng Libreng Web Speech API ng Browser (Offline/Uncapped)"
                  >
                    <Globe className="w-2.5 h-2.5 text-blue-600 dark:text-blue-400" />
                    Browser TTS (Libre)
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#A09B93] uppercase tracking-wider font-semibold mt-0.5">
                <span>Talata {currentVerseIndex + 1} ng {currentChapter.verses.length}</span>
                <span className="font-mono text-[9px]">
                  Mode: {enginePreference === 'auto' ? 'Awtomatiko (Fallback)' : enginePreference === 'ai' ? 'AI Lamang' : 'Browser Lamang'}
                </span>
              </div>
            </div>
          </div>

          {/* Core Transport Controls */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 w-full md:w-auto">
            {/* Previous Verse Button */}
            <button
              id="tts-prev-btn"
              onClick={onPrevVerse}
              disabled={currentVerseIndex <= 0}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#D1CEC7] dark:border-[#383531] rounded-full text-[#7A756D] hover:bg-[#F5F4F1] dark:hover:bg-[#2A2724] disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-95"
              title="Nakaraang Talata (Previous Verse)"
              aria-label="Nakaraang Talata"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Stop Button */}
            <button
              id="tts-stop-btn"
              onClick={onStop}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#D1CEC7] dark:border-[#383531] rounded-full text-[#7A756D] hover:text-[#8B0000] hover:border-[#8B0000]/40 hover:bg-[#F5F4F1] dark:hover:bg-[#2A2724] transition-all active:scale-95"
              title="Ihinto ang Pagbasa (Stop TTS)"
              aria-label="Ihinto"
            >
              <Square className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* Main Center Play / Pause Button */}
            {isPlaying ? (
              <button
                id="tts-pause-btn"
                onClick={onPause}
                className="w-13 h-13 sm:w-14 sm:h-14 flex items-center justify-center bg-[#8B0000] hover:bg-[#700000] text-white rounded-full shadow-lg shadow-[#8B000033] transition-transform active:scale-95"
                title="I-pause ang Pagbasa"
                aria-label="I-pause"
              >
                <Pause className="w-6 h-6 fill-current" />
              </button>
            ) : isPaused ? (
              <button
                id="tts-resume-btn"
                onClick={onResume}
                className="w-13 h-13 sm:w-14 sm:h-14 flex items-center justify-center bg-[#8B0000] hover:bg-[#700000] text-white rounded-full shadow-lg shadow-[#8B000033] transition-transform active:scale-95"
                title="Ipagpatuloy ang Pagbasa (Resume)"
                aria-label="Ipagpatuloy"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
            ) : (
              <button
                id="tts-play-btn"
                onClick={() => onPlay(currentVerseIndex)}
                className="w-13 h-13 sm:w-14 sm:h-14 flex items-center justify-center bg-[#8B0000] hover:bg-[#700000] text-white rounded-full shadow-lg shadow-[#8B000033] transition-transform active:scale-95"
                title="Basahin nang Malakas (Play TTS)"
                aria-label="Play"
              >
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </button>
            )}

            {/* Next Verse Button */}
            <button
              id="tts-next-btn"
              onClick={onNextVerse}
              disabled={currentVerseIndex >= currentChapter.verses.length - 1}
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border border-[#D1CEC7] dark:border-[#383531] rounded-full text-[#7A756D] hover:bg-[#F5F4F1] dark:hover:bg-[#2A2724] disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-95"
              title="Susunod na Talata (Next Verse)"
              aria-label="Susunod na Talata"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Side Controls: Speed & TTS Engine / Voice Settings Toggle */}
          <div className="flex items-center justify-end gap-3 w-full md:w-1/3">
            {/* Speed Control */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#A09B93] uppercase tracking-wider hidden xs:inline">Bilis</span>
              <div className="flex items-center bg-[#F5F4F1] dark:bg-[#242220] p-0.5 rounded-xs border border-[#D1CEC7] dark:border-[#383531]">
                {rates.map((r) => (
                  <button
                    key={r}
                    id={`tts-rate-${r}x`}
                    onClick={() => {
                      setRate(r);
                      ttsEngine.setRate(r);
                    }}
                    className={`px-1.5 py-0.5 text-[11px] font-bold rounded-xs transition-colors ${
                      rate === r
                        ? 'bg-white dark:bg-[#34312D] text-[#8B0000] dark:text-[#ff9999] shadow-xs'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                    }`}
                    title={`Bilis: ${r}x`}
                  >
                    {r}x
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Engine & Voice Settings Button */}
            <button
              id="tts-settings-btn"
              onClick={() => setShowSettings(!showSettings)}
              className={`px-2.5 py-1.5 rounded-xs flex items-center gap-1.5 border text-xs font-semibold transition-all ${
                showSettings
                  ? 'bg-[#8B0000] text-white border-[#8B0000] shadow-xs'
                  : 'bg-[#F5F4F1] dark:bg-[#242220] border-[#D1CEC7] dark:border-[#383531] text-[#8B0000] dark:text-[#ff9999] hover:bg-[#EBE8E3]'
              }`}
              title="Mga Setting ng AI Voice, Fallback, at Browser TTS"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="text-[11px]">Tinig & Engine</span>
            </button>
          </div>
        </div>

        {/* Audio / Voice & Fallback Customization Drawer */}
        {showSettings && (
          <div
            id="tts-settings-drawer"
            className="mt-3 pt-3 border-t border-[#D1CEC7] dark:border-[#383531] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs animate-in fade-in duration-200"
          >
            {/* Column 1: TTS Engine & Fallback System Preferences */}
            <div className="space-y-2">
              <label className="font-bold block text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#8B0000]" />
                TTS Engine & Fallback Mode:
              </label>
              
              <div className="space-y-1.5">
                {/* Auto Mode */}
                <button
                  id="tts-engine-auto-btn"
                  onClick={() => {
                    setEnginePreference('auto');
                    ttsEngine.setEnginePreference('auto');
                  }}
                  className={`w-full text-left p-2 rounded-xs border transition-all text-xs flex flex-col ${
                    enginePreference === 'auto'
                      ? 'border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000] dark:text-[#ff9999] font-bold'
                      : 'border-[#D1CEC7] dark:border-[#383531] bg-white dark:bg-[#201E1C] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      Awtomatiko (Inirerekomenda)
                    </span>
                    {enginePreference === 'auto' && <span className="text-[10px] text-emerald-600 font-mono">Aktibo</span>}
                  </div>
                  <span className="text-[10px] text-[#7A756D] dark:text-[#A09B93] font-normal mt-0.5">
                    Susubukang gamitin ang AI Voice muna; awtomatikong mag-fallback sa libreng Web Speech API kapag may error o naubos ang quota.
                  </span>
                </button>

                {/* AI Only Mode */}
                <button
                  id="tts-engine-ai-btn"
                  onClick={() => {
                    setEnginePreference('ai');
                    ttsEngine.setEnginePreference('ai');
                  }}
                  className={`w-full text-left p-2 rounded-xs border transition-all text-xs flex flex-col ${
                    enginePreference === 'ai'
                      ? 'border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000] dark:text-[#ff9999] font-bold'
                      : 'border-[#D1CEC7] dark:border-[#383531] bg-white dark:bg-[#201E1C] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-emerald-600" />
                      Palaging AI Voice (Gemini TTS)
                    </span>
                    {enginePreference === 'ai' && <span className="text-[10px] text-emerald-600 font-mono">Aktibo</span>}
                  </div>
                  <span className="text-[10px] text-[#7A756D] dark:text-[#A09B93] font-normal mt-0.5">
                    De-kalidad at makataong boses sa bawat talata.
                  </span>
                </button>

                {/* Browser Only Mode (Free / Offline) */}
                <button
                  id="tts-engine-browser-btn"
                  onClick={() => {
                    setEnginePreference('browser');
                    ttsEngine.setEnginePreference('browser');
                  }}
                  className={`w-full text-left p-2 rounded-xs border transition-all text-xs flex flex-col ${
                    enginePreference === 'browser'
                      ? 'border-[#8B0000] bg-[#8B0000]/5 text-[#8B0000] dark:text-[#ff9999] font-bold'
                      : 'border-[#D1CEC7] dark:border-[#383531] bg-white dark:bg-[#201E1C] text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" />
                      Browser Voice (100% Libre / Offline)
                    </span>
                    {enginePreference === 'browser' && <span className="text-[10px] text-blue-600 font-mono">Aktibo</span>}
                  </div>
                  <span className="text-[10px] text-[#7A756D] dark:text-[#A09B93] font-normal mt-0.5">
                    Web Speech API ng device. Walang quota limit at tuloy-tuloy kahit offline.
                  </span>
                </button>
              </div>
            </div>

            {/* Column 2: Voice Models (AI Character & Browser Voice) */}
            <div className="space-y-3">
              {/* AI Voice Selection */}
              <div>
                <label className="font-bold block mb-1 text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[10px] flex items-center justify-between">
                  <span>AI Voice Karakter:</span>
                  <span className="text-emerald-600 font-mono text-[9px]">Gemini 3.1 Flash TTS</span>
                </label>
                <select
                  id="tts-ai-voice-select"
                  value={aiVoice}
                  onChange={(e) => {
                    setAIVoice(e.target.value);
                    ttsEngine.setAIVoice(e.target.value);
                  }}
                  className="w-full p-2 rounded-xs border border-[#D1CEC7] dark:border-[#383531] bg-white dark:bg-[#201E1C] text-stone-800 dark:text-stone-100 focus:border-[#8B0000] focus:outline-none text-xs"
                >
                  {aiVoiceOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name} — {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Browser Web Speech Voice Selection */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[10px]">
                    Browser Fallback Voice (Web Speech API):
                  </label>
                  <span className="text-[9px] font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-1 py-0.5 rounded-xs border border-blue-200 dark:border-blue-800">
                    fil-PH / tl-PH
                  </span>
                </div>
                <select
                  id="tts-voice-select"
                  value={selectedVoice?.name || ''}
                  onChange={(e) => {
                    const targetVoice = availableVoices.find(
                      (v) => v.voice.name === e.target.value
                    );
                    if (targetVoice) {
                      setSelectedVoice(targetVoice.voice);
                      ttsEngine.setVoice(targetVoice.voice);
                    }
                  }}
                  className="w-full p-2 rounded-xs border border-[#D1CEC7] dark:border-[#383531] bg-white dark:bg-[#201E1C] text-stone-800 dark:text-stone-100 focus:border-[#8B0000] focus:outline-none truncate text-xs"
                >
                  {availableVoices.length === 0 && (
                    <option value="">Default Tagalog Engine (fil-PH)</option>
                  )}
                  {availableVoices.map((item, idx) => (
                    <option key={`${item.voice.name}-${idx}`} value={item.voice.name}>
                      {item.displayName}
                    </option>
                  ))}
                </select>
                <p className="text-[9px] text-[#7A756D] dark:text-[#A09B93] mt-1 italic">
                  Naka-set sa Tagalog language locale ('fil-PH') upang tumpak at natural ang pagbigkas ng bawat salita.
                </p>
              </div>

              {/* Pitch Slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[10px]">
                    Tono ng Boses (Pitch):
                  </label>
                  <span className="text-stone-500 font-mono text-[11px]">{pitch.toFixed(1)}</span>
                </div>
                <input
                  id="tts-pitch-slider"
                  type="range"
                  min="0.7"
                  max="1.3"
                  step="0.1"
                  value={pitch}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setPitch(val);
                    ttsEngine.setPitch(val);
                  }}
                  className="w-full accent-[#8B0000] cursor-pointer"
                />
              </div>
            </div>

            {/* Column 3: Playback Behavior & Reset */}
            <div className="space-y-3">
              <label className="font-bold block text-stone-700 dark:text-stone-300 uppercase tracking-wider text-[10px]">
                Mga Opsyon sa Pagbabasa:
              </label>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    id="tts-autoscroll-toggle"
                    type="checkbox"
                    checked={autoScroll}
                    onChange={(e) => setAutoScroll(e.target.checked)}
                    className="rounded-xs border-[#D1CEC7] text-[#8B0000] focus:ring-[#8B0000] w-4 h-4 accent-[#8B0000]"
                  />
                  <label htmlFor="tts-autoscroll-toggle" className="cursor-pointer text-stone-700 dark:text-stone-300 text-xs">
                    Auto-Scroll sa binabasang talata
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="tts-continuous-toggle"
                    type="checkbox"
                    checked={continuous}
                    onChange={(e) => {
                      setContinuous(e.target.checked);
                      ttsEngine.setContinuous(e.target.checked);
                    }}
                    className="rounded-xs border-[#D1CEC7] text-[#8B0000] focus:ring-[#8B0000] w-4 h-4 accent-[#8B0000]"
                  />
                  <label htmlFor="tts-continuous-toggle" className="cursor-pointer text-stone-700 dark:text-stone-300 text-xs">
                    Sunud-sunod na pagbasa ng buong kabanata
                  </label>
                </div>
              </div>

              {/* Status Info Box */}
              <div className="p-2.5 rounded-xs bg-[#F5F4F1] dark:bg-[#242220] border border-[#D1CEC7] dark:border-[#383531] text-[11px] text-stone-600 dark:text-stone-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-800 dark:text-stone-100">
                  <Info className="w-3.5 h-3.5 text-[#8B0000]" />
                  <span>Impormasyon sa Audio:</span>
                </div>
                <p className="text-[10px] text-[#7A756D] dark:text-[#A09B93] leading-relaxed">
                  Kapag naubos ang AI token/quota sa server, walang tigil na magpapatuloy ang pagbasa gamit ang built-in voice synthesizer ng iyong browser nang 100% libre.
                </p>
                {ttsEngine.isFallbackActive() && (
                  <button
                    onClick={onResetFallback}
                    className="w-full mt-2 py-1 px-2 rounded-xs bg-[#8B0000] text-white text-[10px] font-bold hover:bg-[#700000] active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    I-reset at Subukan Uli ang AI Audio
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
