import React from 'react';
import { Volume2, VolumeX, Music, Music2 } from 'lucide-react';
import { useSoundContext } from '../../contexts/SoundContext';

const SoundControls: React.FC = () => {
  const {
    isSoundEffectsEnabled,
    isBackgroundMusicEnabled,
    toggleSoundEffects,
    toggleBackgroundMusic,
    playSound
  } = useSoundContext();

  const handleSoundEffectsToggle = () => {
    playSound('/assets/sounds/bleep.wav');
    toggleSoundEffects();
  };

  const handleBackgroundMusicToggle = () => {
    playSound('/assets/sounds/bleep.wav');
    toggleBackgroundMusic();
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 flex gap-2">
      <button
        onClick={handleSoundEffectsToggle}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-cyan-glow/30 bg-black/50 backdrop-blur-sm hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all duration-300"
        title={isSoundEffectsEnabled ? "Disable Sound Effects" : "Enable Sound Effects"}
      >
        {isSoundEffectsEnabled ? (
          <Volume2 className="w-5 h-5 text-cyan-glow" />
        ) : (
          <VolumeX className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      <button
        onClick={handleBackgroundMusicToggle}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-cyan-glow/30 bg-black/50 backdrop-blur-sm hover:border-cyan-glow hover:bg-cyan-glow/10 transition-all duration-300"
        title={isBackgroundMusicEnabled ? "Disable Background Music" : "Enable Background Music"}
      >
        {isBackgroundMusicEnabled ? (
          <Music className="w-5 h-5 text-cyan-glow" />
        ) : (
          <Music2 className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default SoundControls;