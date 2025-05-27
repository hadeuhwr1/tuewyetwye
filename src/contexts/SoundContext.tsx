// src/contexts/SoundContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface SoundContextType {
  isSoundEffectsEnabled: boolean;
  isBackgroundMusicEnabled: boolean;
  userInteracted: boolean;
  toggleSoundEffects: () => void;
  toggleBackgroundMusic: () => void;
  playSound: (soundPath: string) => void;
  markUserInteracted: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const useSoundContext = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider');
  }
  return context;
};

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(true);
  const [isBackgroundMusicEnabled, setIsBackgroundMusicEnabled] = useState(true);
  const [userInteracted, setUserInteracted] = useState(false);
  const [backgroundMusic, setBackgroundMusic] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/assets/sounds/backsound.mp3');
    audio.loop = true;
    setBackgroundMusic(audio);
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const markUserInteracted = useCallback(() => {
    if (!userInteracted) {
        setUserInteracted(true);
    }
  }, [userInteracted]);

  useEffect(() => {
    if (!backgroundMusic) return;
    if (isBackgroundMusicEnabled && userInteracted) {
      const playPromise = backgroundMusic.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing background music (useEffect):", error);
        });
      }
    } else {
      backgroundMusic.pause();
    }
  }, [isBackgroundMusicEnabled, backgroundMusic, userInteracted]);

  const toggleSoundEffects = useCallback(() => {
    if (!userInteracted) markUserInteracted();
    setIsSoundEffectsEnabled(prev => !prev);
  }, [userInteracted, markUserInteracted]);

  const toggleBackgroundMusic = useCallback(() => {
    if (!backgroundMusic) return;
    if (!userInteracted) markUserInteracted();
    setIsBackgroundMusicEnabled(prevEnabled => {
      const nextEnabledState = !prevEnabled;
      if (nextEnabledState) {
         if (userInteracted) {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                console.error("Error playing background music on toggle ON:", error);
                });
            }
        }
      } else {
        backgroundMusic.pause();
      }
      return nextEnabledState;
    });
  }, [backgroundMusic, userInteracted, markUserInteracted]);

  const playSound = useCallback((soundPath: string) => {
    if (!userInteracted) markUserInteracted();
    if (isSoundEffectsEnabled) {
      const audio = new Audio(soundPath);
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Error playing sound:", soundPath, error);
        });
      }
    }
  }, [isSoundEffectsEnabled, userInteracted, markUserInteracted]);

  return (
    <SoundContext.Provider value={{
      isSoundEffectsEnabled,
      isBackgroundMusicEnabled,
      userInteracted,
      toggleSoundEffects,
      toggleBackgroundMusic,
      playSound,
      markUserInteracted
    }}>
      {children}
    </SoundContext.Provider>
  );
};