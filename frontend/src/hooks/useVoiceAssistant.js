import { useState, useEffect, useCallback } from 'react';
import { voiceAssistant } from '../utils/voiceAssistant';

export function useVoiceAssistant(lang = 'en') {
  const [voiceState, setVoiceState] = useState({
    isPlaying: voiceAssistant.isPlaying,
    activeSpeechId: voiceAssistant.activeSpeechId,
    isListening: voiceAssistant.isListening
  });

  useEffect(() => {
    const unsubscribe = voiceAssistant.subscribe((newState) => {
      setVoiceState(newState);
    });
    return unsubscribe;
  }, []);

  const speak = useCallback((text, speechId = 'custom', overrideLang = null, onComplete = null) => {
    voiceAssistant.speak(text, overrideLang || lang, speechId, onComplete);
  }, [lang]);

  const stop = useCallback(() => {
    voiceAssistant.stop();
  }, []);

  const startListening = useCallback((callbacks) => {
    voiceAssistant.startListening({ lang, ...callbacks });
  }, [lang]);

  const stopListening = useCallback(() => {
    voiceAssistant.stopListening();
  }, []);

  return {
    speak,
    stop,
    startListening,
    stopListening,
    isPlaying: voiceState.isPlaying,
    activeSpeechId: voiceState.activeSpeechId,
    isListening: voiceState.isListening
  };
}
