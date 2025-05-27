// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/layout/Header';
import StoryIntro from './components/story/StoryIntro';
import SoundControls from './components/ui/SoundControls';
import MobileExperiencePopup from './components/ui/MobileExperiencePopup';
import AudioExperiencePopup from './components/ui/AudioExperiencePopup';
import { useSoundContext } from './contexts/SoundContext';
import { useViewport } from './hooks/useViewport';
import ParticleBackground from './components/ui/ParticleBackground';
import HeroSection from './components/sections/HeroSection';
import LoreSection from './components/sections/LoreSection';
import RoadmapSection from './components/sections/RoadmapSection';
import CommunitySection from './components/sections/CommunitySection';
import JoinMissionSection from './components/sections/JoinMissionSection';
import Footer from './components/layout/Footer';

// ... (rest of the code remains the same until the main application return)

if (currentStep === 'main_application') {
  return (
    <div className="relative min-h-screen bg-black text-white font-spaceMono overflow-hidden">
      <ParticleBackground />
      <div className="scanline-overlay"></div>
      <div className="relative z-10">
        <Header onStoryMenuReset={resetAppStateAndReload} />
        <main>
          <HeroSection />
          <LoreSection />
          <RoadmapSection />
          <CommunitySection />
          <JoinMissionSection />
        </main>
        <Footer />
        <button
          onClick={resetAppStateAndReload}
          className="fixed bottom-16 right-4 text-xs text-gray-500 hover:text-cyan-glow z-[10000] bg-black/70 backdrop-blur-sm px-2 py-1 rounded shadow-lg"
          title="Reset all popups and intro state"
        >
          Reset App State
        </button>
        <SoundControls />
      </div>
    </div>
  );
}

// ... (rest of the code remains the same)