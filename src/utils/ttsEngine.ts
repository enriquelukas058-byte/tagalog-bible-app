import { Verse, PlaybackStatus, TTSEnginePreference, TTSActiveSource, TTSFallbackEvent } from '../types';
import { pcmBase64ToWavBlob } from './audioUtils';

export interface TTSVoiceOption {
  voice: SpeechSynthesisVoice;
  isTagalog: boolean;
  displayName: string;
}

export interface TTSEventCallbacks {
  onVerseChange?: (index: number, verse: Verse) => void;
  onStatusChange?: (status: PlaybackStatus) => void;
  onSourceChange?: (source: TTSActiveSource) => void;
  onFallbackActivated?: (event: TTSFallbackEvent) => void;
  onWordBoundary?: (word: string, charIndex: number) => void;
  onError?: (error: string) => void;
}

class TTSEngine {
  // Web Speech API synthesis
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private chromeKeepAliveTimer: any = null;

  // AI Audio element
  private audioElement: HTMLAudioElement | null = null;
  private currentAudioUrl: string | null = null;
  private abortController: AbortController | null = null;
  private audioCache: Map<string, string> = new Map(); // verse text -> blob URL

  // Engine state
  private verses: Verse[] = [];
  private currentIndex: number = 0;
  private status: PlaybackStatus = 'idle';
  private rate: number = 1.0;
  private pitch: number = 1.0;
  private volume: number = 1.0;
  private continuous: boolean = true;
  private selectedBrowserVoice: SpeechSynthesisVoice | null = null;
  private selectedAIVoice: string = 'Kore'; // 'Kore' (Warm), 'Puck' (Gentle), 'Fenrir' (Deep), 'Zephyr' (Clear)

  // Dual-engine and Fallback configuration
  private enginePreference: TTSEnginePreference = 'auto'; // 'auto' | 'ai' | 'browser'
  private activeSource: TTSActiveSource = 'ai';
  private fallbackActivated: boolean = false;
  private callbacks: TTSEventCallbacks = {};

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
      this.audioElement = new Audio();
      this.audioElement.preload = 'auto';
    }
  }

  public setCallbacks(callbacks: TTSEventCallbacks) {
    this.callbacks = callbacks;
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined';
  }

  // --- Voice Configurations ---

  public getAvailableVoices(): TTSVoiceOption[] {
    if (!this.synth) return [];
    const voices = this.synth.getVoices();
    return voices.map((v) => {
      const langLower = (v.lang || '').toLowerCase();
      const nameLower = (v.name || '').toLowerCase();
      const isTagalog =
        langLower.startsWith('fil') ||
        langLower.startsWith('tl') ||
        langLower.includes('fil-') ||
        langLower.includes('tl-') ||
        langLower.includes('fil_') ||
        langLower.includes('tl_') ||
        nameLower.includes('tagalog') ||
        nameLower.includes('filipino') ||
        nameLower.includes('pilipino');

      let displayName = `${v.name} (${v.lang})`;
      if (isTagalog) {
        displayName = `🇵🇭 ${v.name} (Tagalog / Filipino)`;
      }

      return {
        voice: v,
        isTagalog,
        displayName
      };
    }).sort((a, b) => {
      if (a.isTagalog && !b.isTagalog) return -1;
      if (!a.isTagalog && b.isTagalog) return 1;
      return a.displayName.localeCompare(b.displayName);
    });
  }

  public getPreferredTagalogVoice(): SpeechSynthesisVoice | null {
    const all = this.getAvailableVoices();
    // 1st Priority: Native Filipino / Tagalog voice (e.g. fil-PH, tl-PH, Google Filipino, Microsoft Blessica / Angelo)
    const exactTagalog = all.find((v) => {
      const lang = (v.voice.lang || '').toLowerCase();
      const name = (v.voice.name || '').toLowerCase();
      return (
        lang === 'fil-ph' ||
        lang === 'tl-ph' ||
        lang === 'fil_ph' ||
        lang === 'tl_ph' ||
        name.includes('filipino') ||
        name.includes('tagalog')
      );
    });
    if (exactTagalog) return exactTagalog.voice;

    const anyTagalog = all.find((v) => v.isTagalog);
    if (anyTagalog) return anyTagalog.voice;

    // 2nd Priority: Austronesian phonetics (Indonesian/Malay) which closely match Tagalog vowel sounds
    const austronesian = all.find((v) => {
      const lang = (v.voice.lang || '').toLowerCase();
      return lang.includes('id') || lang.includes('ms');
    });
    if (austronesian) return austronesian.voice;

    return all[0]?.voice || null;
  }

  public setVoice(voice: SpeechSynthesisVoice | null) {
    this.selectedBrowserVoice = voice;
  }

  public setAIVoice(voiceName: string) {
    this.selectedAIVoice = voiceName;
  }

  public getAIVoice(): string {
    return this.selectedAIVoice;
  }

  // --- Engine Preference & Fallback Controls ---

  public setEnginePreference(pref: TTSEnginePreference) {
    this.enginePreference = pref;
    if (pref === 'browser') {
      this.activeSource = 'browser';
      this.callbacks.onSourceChange?.('browser');
    } else if (pref === 'ai') {
      this.fallbackActivated = false;
      this.activeSource = 'ai';
      this.callbacks.onSourceChange?.('ai');
    } else {
      // auto
      if (!this.fallbackActivated) {
        this.activeSource = 'ai';
        this.callbacks.onSourceChange?.('ai');
      }
    }
  }

  public getEnginePreference(): TTSEnginePreference {
    return this.enginePreference;
  }

  public getActiveSource(): TTSActiveSource {
    return this.activeSource;
  }

  public isFallbackActive(): boolean {
    return this.fallbackActivated;
  }

  public resetFallback() {
    this.fallbackActivated = false;
    if (this.enginePreference !== 'browser') {
      this.activeSource = 'ai';
      this.callbacks.onSourceChange?.('ai');
    }
  }

  // --- Audio Parameters ---

  public setRate(rate: number) {
    this.rate = Math.max(0.5, Math.min(2.0, rate));
    if (this.audioElement) {
      this.audioElement.playbackRate = this.rate;
    }
  }

  public setPitch(pitch: number) {
    this.pitch = Math.max(0.5, Math.min(1.5, pitch));
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
  }

  public setContinuous(continuous: boolean) {
    this.continuous = continuous;
  }

  public getStatus(): PlaybackStatus {
    return this.status;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  // --- Playback Entry Points ---

  public playList(verses: Verse[], startIndex: number = 0) {
    if (verses.length === 0) return;
    this.stop();
    this.verses = verses;
    this.currentIndex = Math.max(0, Math.min(verses.length - 1, startIndex));
    this.speakCurrentVerse();
  }

  public playSingle(verse: Verse) {
    this.stop();
    this.verses = [verse];
    this.currentIndex = 0;
    this.speakCurrentVerse(false);
  }

  private cleanTextForSpeech(text: string): string {
    return text
      .replace(/(\d+):(\d+)/g, '$1 talata $2')
      .replace(/[—–]/g, ', ')
      .trim();
  }

  /**
   * Main Dispatcher: Decides whether to try AI TTS first or use Browser Web Speech API.
   */
  private async speakCurrentVerse(shouldContinue: boolean = this.continuous) {
    if (this.currentIndex < 0 || this.currentIndex >= this.verses.length) {
      this.status = 'idle';
      this.callbacks.onStatusChange?.('idle');
      return;
    }

    const verse = this.verses[this.currentIndex];
    this.stopCurrentOutputs();

    // Check if we should use Browser Web Speech API directly
    const useBrowserDirectly = 
      this.enginePreference === 'browser' || 
      (this.enginePreference === 'auto' && this.fallbackActivated);

    if (useBrowserDirectly) {
      this.activeSource = 'browser';
      this.callbacks.onSourceChange?.('browser');
      this.speakWithBrowserWebSpeech(verse, shouldContinue);
      return;
    }

    // Attempt AI API Voice first
    this.activeSource = 'ai';
    this.callbacks.onSourceChange?.('ai');
    this.status = 'playing';
    this.callbacks.onStatusChange?.('playing');
    this.callbacks.onVerseChange?.(this.currentIndex, verse);

    const textToSpeak = `Talata ${verse.number}. ${this.cleanTextForSpeech(verse.text)}`;

    try {
      const audioBlobUrl = await this.fetchAIAudio(textToSpeak);
      if (this.status !== 'playing' && this.status !== 'idle') {
        // Was stopped while fetching
        return;
      }
      this.playAudioBlob(audioBlobUrl, verse, shouldContinue);
    } catch (err: any) {
      console.warn('AI TTS failed, activating Web Speech API fallback:', err);
      this.triggerFallback(err, verse, shouldContinue);
    }
  }

  /**
   * Fetches AI audio from server with caching
   */
  private async fetchAIAudio(text: string): Promise<string> {
    const cacheKey = `${this.selectedAIVoice}_${text}`;
    if (this.audioCache.has(cacheKey)) {
      return this.audioCache.get(cacheKey)!;
    }

    this.abortController = new AbortController();
    const timeoutId = setTimeout(() => this.abortController?.abort(), 12000); // 12s timeout

    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        voiceName: this.selectedAIVoice
      }),
      signal: this.abortController.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const isQuota = response.status === 429 || errData.isQuota || errData.code === 'QUOTA_EXCEEDED';
      const error = new Error(errData.error || `HTTP ${response.status} mula sa AI Voice API`);
      (error as any).isQuota = isQuota;
      (error as any).status = response.status;
      throw error;
    }

    const data = await response.json();
    if (!data.audio) {
      throw new Error('Walang audio data mula sa AI server');
    }

    const wavBlob = pcmBase64ToWavBlob(data.audio, data.sampleRate || 24000, 1);
    const blobUrl = URL.createObjectURL(wavBlob);
    this.audioCache.set(cacheKey, blobUrl);
    return blobUrl;
  }

  /**
   * Plays the generated WAV audio blob
   */
  private playAudioBlob(blobUrl: string, verse: Verse, shouldContinue: boolean) {
    if (!this.audioElement) return;

    this.currentAudioUrl = blobUrl;
    this.audioElement.src = blobUrl;
    this.audioElement.playbackRate = this.rate;
    this.audioElement.volume = this.volume;

    this.audioElement.onplay = () => {
      this.status = 'playing';
      this.callbacks.onStatusChange?.('playing');
      this.callbacks.onVerseChange?.(this.currentIndex, verse);

      // Prefetch next verse in background for seamless flow
      if (shouldContinue && this.currentIndex + 1 < this.verses.length) {
        const nextVerse = this.verses[this.currentIndex + 1];
        const nextText = `Talata ${nextVerse.number}. ${this.cleanTextForSpeech(nextVerse.text)}`;
        this.prefetchNextVerse(nextText);
      }
    };

    this.audioElement.onended = () => {
      if (this.status === 'stopped' || this.status === 'idle') return;

      if (shouldContinue && this.currentIndex + 1 < this.verses.length) {
        this.currentIndex++;
        setTimeout(() => {
          if (this.status === 'playing') {
            this.speakCurrentVerse(shouldContinue);
          }
        }, 350);
      } else {
        this.status = 'idle';
        this.callbacks.onStatusChange?.('idle');
      }
    };

    this.audioElement.onerror = (e) => {
      console.warn('HTMLAudioElement error during playback:', e);
      this.triggerFallback(new Error('Audio playback error'), verse, shouldContinue);
    };

    this.audioElement.play().catch((playErr) => {
      console.warn('Audio play() was prevented or failed:', playErr);
      this.triggerFallback(playErr, verse, shouldContinue);
    });
  }

  private async prefetchNextVerse(text: string) {
    const cacheKey = `${this.selectedAIVoice}_${text}`;
    if (this.audioCache.has(cacheKey)) return;
    try {
      await this.fetchAIAudio(text);
    } catch {
      // Ignore background prefetch errors
    }
  }

  /**
   * Activates Fallback to Web Speech API (window.speechSynthesis)
   */
  private triggerFallback(err: any, verse: Verse, shouldContinue: boolean) {
    const isQuota = err?.isQuota || err?.status === 429 || String(err?.message || '').toLowerCase().includes('quota');
    const isNoKey = err?.status === 503;

    this.fallbackActivated = true;
    this.activeSource = 'browser';
    this.callbacks.onSourceChange?.('browser');

    let fallbackMessage = 'Awtomatikong lumipat sa Web Speech API ng browser para sa tuloy-tuloy at libreng pagbasa.';
    let reason: 'quota' | 'error' | 'no_key' | 'offline' = 'error';

    if (isQuota) {
      reason = 'quota';
      fallbackMessage = '⚠️ Naubos ang AI Voice quota. Awtomatikong lumipat sa Web Speech API ng browser para sa tuloy-tuloy at libreng pagbasa!';
    } else if (isNoKey) {
      reason = 'no_key';
      fallbackMessage = 'Walang AI API key na natukoy. Ginagamit ang Web Speech API ng browser para sa libreng pagbasa.';
    } else if (!navigator.onLine) {
      reason = 'offline';
      fallbackMessage = 'Walang koneksyon sa internet. Gumagamit ng Web Speech API ng browser (offline).';
    }

    this.callbacks.onFallbackActivated?.({
      reason,
      message: fallbackMessage,
      timestamp: Date.now()
    });

    // Seamlessly speak current verse with browser Web Speech API
    this.speakWithBrowserWebSpeech(verse, shouldContinue);
  }

  /**
   * Web Speech API (window.speechSynthesis) Player
   */
  private speakWithBrowserWebSpeech(verse: Verse, shouldContinue: boolean = this.continuous) {
    if (!this.synth) {
      this.status = 'idle';
      this.callbacks.onStatusChange?.('idle');
      this.callbacks.onError?.('Hindi suportado ang speech synthesis sa iyong browser.');
      return;
    }

    this.synth.cancel();
    clearInterval(this.chromeKeepAliveTimer);

    const textToSpeak = `Talata ${verse.number}. ${this.cleanTextForSpeech(verse.text)}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Strictly configure the voice and enforce Tagalog language ('fil-PH' or 'tl-PH')
    if (this.selectedBrowserVoice) {
      utterance.voice = this.selectedBrowserVoice;
      const vLang = (this.selectedBrowserVoice.lang || '').toLowerCase();
      if (vLang.includes('tl') || vLang.includes('fil')) {
        utterance.lang = this.selectedBrowserVoice.lang;
      } else {
        utterance.lang = 'fil-PH';
      }
    } else {
      const preferred = this.getPreferredTagalogVoice();
      if (preferred) {
        utterance.voice = preferred;
        const vLang = (preferred.lang || '').toLowerCase();
        if (vLang.includes('tl') || vLang.includes('fil')) {
          utterance.lang = preferred.lang;
        } else {
          utterance.lang = 'fil-PH';
        }
      } else {
        utterance.lang = 'fil-PH';
      }
    }

    // Explicit fallback: Guarantee Tagalog language locale for the synthesis phonetics engine
    if (!utterance.lang) {
      utterance.lang = 'fil-PH';
    }
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = this.volume;

    utterance.onstart = () => {
      this.status = 'playing';
      this.callbacks.onStatusChange?.('playing');
      this.callbacks.onVerseChange?.(this.currentIndex, verse);

      // Chrome keep-alive bugfix
      this.chromeKeepAliveTimer = setInterval(() => {
        if (this.synth?.speaking && !this.synth.paused) {
          this.synth.pause();
          this.synth.resume();
        }
      }, 10000);
    };

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const spokenWord = textToSpeak.substring(event.charIndex, event.charIndex + (event.charLength || 10));
        this.callbacks.onWordBoundary?.(spokenWord, event.charIndex);
      }
    };

    utterance.onend = () => {
      clearInterval(this.chromeKeepAliveTimer);
      if (this.status === 'stopped' || this.status === 'idle') return;

      if (shouldContinue && this.currentIndex + 1 < this.verses.length) {
        this.currentIndex++;
        setTimeout(() => {
          if (this.status === 'playing') {
            this.speakCurrentVerse(shouldContinue);
          }
        }, 350);
      } else {
        this.status = 'idle';
        this.callbacks.onStatusChange?.('idle');
      }
    };

    utterance.onerror = (e) => {
      clearInterval(this.chromeKeepAliveTimer);
      if (e.error === 'interrupted' || e.error === 'canceled') {
        return;
      }
      console.warn('SpeechSynthesis error:', e);
      this.callbacks.onError?.(`May aberya sa pagsasalita: ${e.error}`);
      this.status = 'idle';
      this.callbacks.onStatusChange?.('idle');
    };

    this.currentUtterance = utterance;
    this.status = 'playing';
    this.callbacks.onStatusChange?.('playing');
    this.synth.speak(utterance);
  }

  private stopCurrentOutputs() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.src = '';
    }
    if (this.synth) {
      this.synth.cancel();
    }
    clearInterval(this.chromeKeepAliveTimer);
  }

  public pause() {
    if (this.status === 'playing') {
      if (this.activeSource === 'ai' && this.audioElement) {
        this.audioElement.pause();
      } else if (this.synth) {
        this.synth.pause();
      }
      this.status = 'paused';
      this.callbacks.onStatusChange?.('paused');
    }
  }

  public resume() {
    if (this.status === 'paused') {
      if (this.activeSource === 'ai' && this.audioElement && this.audioElement.src) {
        this.audioElement.play().catch(() => this.speakCurrentVerse());
      } else if (this.synth && this.synth.paused) {
        this.synth.resume();
      } else {
        this.speakCurrentVerse();
      }
      this.status = 'playing';
      this.callbacks.onStatusChange?.('playing');
    } else if (this.status === 'stopped' || this.status === 'idle') {
      this.speakCurrentVerse();
    }
  }

  public stop() {
    this.stopCurrentOutputs();
    this.status = 'stopped';
    this.callbacks.onStatusChange?.('stopped');
  }

  public next() {
    if (this.currentIndex + 1 < this.verses.length) {
      this.currentIndex++;
      this.speakCurrentVerse();
    }
  }

  public previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.speakCurrentVerse();
    }
  }

  public jumpToVerse(index: number) {
    if (index >= 0 && index < this.verses.length) {
      this.currentIndex = index;
      this.speakCurrentVerse();
    }
  }
}

export const ttsEngine = new TTSEngine();
