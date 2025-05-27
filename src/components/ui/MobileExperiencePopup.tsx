// src/components/ui/MobileExperiencePopup.tsx
import React from 'react';
import Button from './Button';
import { Smartphone, Monitor } from 'lucide-react';

interface MobileExperiencePopupProps {
  onContinue: () => void;
}

const MobileExperiencePopup: React.FC<MobileExperiencePopupProps> = ({ onContinue }) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[100000] p-4">
      <div className="bg-gray-900/70 border border-magenta-glow/50 p-6 md:p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto animate-fadeIn">
        <div className="flex justify-center mb-6 space-x-4">
          <div className="p-3 rounded-full bg-magenta-glow/10 border border-magenta-glow/30">
            <Smartphone className="h-10 w-10 md:h-12 md:w-12 text-magenta-glow" />
          </div>
          <div className="p-3 rounded-full bg-cyan-glow/10 border border-cyan-glow/30">
            <Monitor className="h-10 w-10 md:h-12 md:w-12 text-cyan-glow" />
          </div>
        </div>
        <h2 className="font-orbitron text-xl md:text-2xl text-white mb-4 magenta-glow">
          Mobile Experience Notice
        </h2>
        <p className="font-spaceMono text-gray-300 mb-6 text-sm md:text-base">
          For the optimal $CIGAR Protocol experience, including all visual and interactive elements,
          we recommend using a desktop browser.
        </p>
        <p className="font-spaceMono text-gray-400 mb-8 text-xs md:text-sm">
          You can continue on mobile, but some features might be limited or not display as intended.
        </p>
        <Button
          onClick={onContinue}
          size="lg"
          className="w-full font-bold tracking-wider mb-3"
          glowColor="cyan"
        >
          CONTINUE ON MOBILE
        </Button>
      </div>
    </div>
  );
};

export default MobileExperiencePopup;