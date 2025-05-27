// src/components/ui/AudioExperiencePopup.tsx
import React from 'react';
import Button from './Button';
import { Headphones } from 'lucide-react';

interface AudioExperiencePopupProps {
  onConfirm: () => void;
}

const AudioExperiencePopup: React.FC<AudioExperiencePopupProps> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[99999] p-4">
      <div className="bg-gray-900/70 border border-cyan-glow/50 p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto animate-fadeIn">
        <div className="flex justify-center mb-6">
          <div className="p-3 rounded-full bg-cyan-glow/10 border border-cyan-glow/30">
            <Headphones className="h-10 w-10 md:h-12 md:w-12 text-cyan-glow" />
          </div>
        </div>
        <h2 className="font-orbitron text-2xl md:text-3xl text-white mb-4 glow-text">
          IMMERSIVE AUDIO EXPERIENCE
        </h2>
        <p className="font-spaceMono text-gray-300 mb-8 text-sm md:text-base">
          The $CIGAR Protocol utilizes sound effects and background music for full mission immersion.
          Enable audio systems for the best experience?
        </p>
        <Button
          onClick={onConfirm}
          size="lg"
          className="w-full font-bold tracking-wider"
          glowColor="cyan"
        >
          ENGAGE AUDIO & PROCEED
        </Button>
        <p className="text-xs text-gray-500 mt-6">
          You can change audio settings anytime using the controls on screen.
        </p>
      </div>
    </div>
  );
};

export default AudioExperiencePopup;