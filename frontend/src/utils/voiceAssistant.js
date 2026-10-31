/**
 * Zero-Cost Multilingual Voice Assistant Service
 * Supporting: English ('en' / 'en-IN'), Kannada ('kn' / 'kn-IN'), Hindi ('hi' / 'hi-IN')
 * 
 * Features:
 * 1. Text-to-Speech (TTS) using high-fidelity backend proxy (/api/tts) for natural Indic speech.
 * 2. Instant fallback to Web Speech API (speechSynthesis) if offline.
 * 3. Text chunking for long sentences ensuring smooth, continuous audio playback.
 * 4. Speech-to-Text (STT) Voice Command Recognition via Web Speech API.
 */

class VoiceAssistantService {
  constructor() {
    this.currentAudio = null;
    this.audioQueue = [];
    this.isPlaying = false;
    this.activeSpeechId = null;
    this.onStateChangeCallbacks = new Set();
    this.recognition = null;
    this.isListening = false;
  }

  // Subscribe to playback / listening state updates
  subscribe(callback) {
    this.onStateChangeCallbacks.add(callback);
    return () => this.onStateChangeCallbacks.delete(callback);
  }

  notifyStateChange() {
    this.onStateChangeCallbacks.forEach(cb => {
      try {
        cb({
          isPlaying: this.isPlaying,
          activeSpeechId: this.activeSpeechId,
          isListening: this.isListening
        });
      } catch (err) {
        console.error('Voice state callback error:', err);
      }
    });
  }

  // Map internal lang codes ('en', 'kn', 'hi') to TTS and BCP-47 speech locales
  getLocaleInfo(lang = 'en') {
    switch (lang) {
      case 'kn':
        return { tl: 'kn', locale: 'kn-IN', name: 'Kannada' };
      case 'hi':
        return { tl: 'hi', locale: 'hi-IN', name: 'Hindi' };
      case 'en':
      default:
        return { tl: 'en', locale: 'en-IN', name: 'English' };
    }
  }

  // Split text into chunks <= 140 chars along natural phrase boundaries
  chunkText(text, maxLen = 140) {
    if (!text || text.length <= maxLen) return [text];
    
    // Split by sentence terminators or clauses
    const rawTokens = text.match(/[^.,!?।;:\n]+[.,!?।;:\n]?/g) || [text];
    const chunks = [];
    let current = '';

    for (const token of rawTokens) {
      if ((current + ' ' + token).trim().length <= maxLen) {
        current = (current + ' ' + token).trim();
      } else {
        if (current) chunks.push(current);
        if (token.length > maxLen) {
          // Fallback split on words
          const words = token.split(' ');
          let sub = '';
          for (const w of words) {
            if ((sub + ' ' + w).trim().length <= maxLen) {
              sub = (sub + ' ' + w).trim();
            } else {
              if (sub) chunks.push(sub);
              sub = w;
            }
          }
          current = sub;
        } else {
          current = token.trim();
        }
      }
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [text];
  }

  // Play audio chunks sequentially using backend /api/tts streaming proxy
  playAudioChunks(chunks, tl, speechId, onComplete, fullFallbackText) {
    if (!chunks || chunks.length === 0) {
      this.isPlaying = false;
      this.activeSpeechId = null;
      this.notifyStateChange();
      if (onComplete) onComplete();
      return;
    }

    const currentText = chunks[0];
    const remaining = chunks.slice(1);
    const audioUrl = `/api/tts?text=${encodeURIComponent(currentText)}&lang=${tl}`;

    const audio = new Audio(audioUrl);
    this.currentAudio = audio;
    this.isPlaying = true;
    this.activeSpeechId = speechId;
    this.notifyStateChange();

    audio.onended = () => {
      this.playAudioChunks(remaining, tl, speechId, onComplete, fullFallbackText);
    };

    audio.onerror = (e) => {
      console.warn('Backend TTS stream failed, attempting browser speechSynthesis fallback:', e);
      // Fallback immediately to browser SpeechSynthesis
      this.speakWithSpeechSynthesis(fullFallbackText || currentText, tl, speechId, onComplete);
    };

    audio.play().catch(err => {
      console.warn('Audio play error, falling back to browser SpeechSynthesis:', err);
      this.speakWithSpeechSynthesis(fullFallbackText || currentText, tl, speechId, onComplete);
    });
  }

  // Fallback to browser SpeechSynthesis API
  speakWithSpeechSynthesis(text, tl, speechId, onComplete) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      this.stop();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const locale = tl === 'kn' ? 'kn-IN' : tl === 'hi' ? 'hi-IN' : 'en-IN';
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = locale;
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices() || [];
      const matchingVoice = voices.find(v => v.lang === locale) || 
                            voices.find(v => v.lang.toLowerCase().startsWith(tl.toLowerCase()));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        this.isPlaying = true;
        this.activeSpeechId = speechId;
        this.notifyStateChange();
      };

      utterance.onend = () => {
        this.isPlaying = false;
        this.activeSpeechId = null;
        this.notifyStateChange();
        if (onComplete) onComplete();
      };

      utterance.onerror = (err) => {
        console.warn('SpeechSynthesis error:', err);
        this.stop();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error('SpeechSynthesis exception:', err);
      this.stop();
    }
  }

  /**
   * Speak text in the requested language
   * @param {string} text - text to speak
   * @param {string} lang - 'en' | 'kn' | 'hi'
   * @param {string} speechId - identifier for UI active icon state
   * @param {Function} onComplete - callback when speech ends
   */
  speak(text, lang = 'en', speechId = 'generic', onComplete = null) {
    if (!text || typeof text !== 'string') return;

    // Toggle off if clicking the already playing speech item
    if (this.isPlaying && this.activeSpeechId === speechId) {
      this.stop();
      return;
    }

    this.stop();

    const { tl } = this.getLocaleInfo(lang);
    const chunks = this.chunkText(text, 140);
    this.playAudioChunks(chunks, tl, speechId, onComplete, text);
  }

  // Halt all audio and speech synthesis
  stop() {
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {}
      this.currentAudio = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    this.isPlaying = false;
    this.activeSpeechId = null;
    this.notifyStateChange();
  }

  // --- Speech-to-Text (STT) Voice Command Recognition ---
  startListening({
    lang = 'en',
    onResult,
    onError,
    onStart,
    onEnd
  }) {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (onError) {
        onError({
          message: 'Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.'
        });
      }
      return;
    }

    // If already listening, stop first
    if (this.recognition && this.isListening) {
      this.stopListening();
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      this.recognition = recognition;
      const { locale } = this.getLocaleInfo(lang);

      recognition.lang = locale;
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.maxAlternatives = 5;

      recognition.onstart = () => {
        this.isListening = true;
        this.notifyStateChange();
        if (onStart) onStart();
      };

      recognition.onresult = (event) => {
        if (event.results && event.results.length > 0) {
          const alternatives = [];
          for (let i = 0; i < event.results[0].length; i++) {
            const item = event.results[0][i];
            if (item && item.transcript) {
              alternatives.push(item.transcript);
            }
          }
          const primaryTranscript = alternatives[0] || '';
          if (onResult) onResult(primaryTranscript, event, alternatives);
        }
      };

      recognition.onerror = (event) => {
        console.warn('SpeechRecognition error:', event.error);
        this.isListening = false;
        this.notifyStateChange();
        let message = 'Microphone error. Please allow microphone permissions in your browser.';
        if (event.error === 'not-allowed') {
          message = 'Microphone access denied. Please click the lock or camera icon in your browser address bar to allow microphone access.';
        } else if (event.error === 'no-speech') {
          message = 'No speech detected. Please try again and speak clearly.';
        } else if (event.error === 'network') {
          message = 'Network error during speech recognition. Please check your internet connection.';
        }
        if (onError) onError({ error: event.error, message });
      };

      recognition.onend = () => {
        this.recognition = null;
        this.isListening = false;
        this.notifyStateChange();
        if (onEnd) onEnd();
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      this.isListening = false;
      this.notifyStateChange();
      if (onError) onError(err);
    }
  }

  stopListening() {
    if (this.recognition) {
      try {
        this.recognition.abort();
      } catch {}
      this.recognition = null;
    }
    this.isListening = false;
    this.notifyStateChange();
  }
}

export const voiceAssistant = new VoiceAssistantService();
