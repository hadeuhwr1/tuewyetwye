// src/App.tsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/layout/Header';
// ... (impor lainnya seperti sebelumnya) ...
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
import TechnologySection from './components/sections/TechnologySection';
import CommunitySection from './components/sections/CommunitySection';
import JoinMissionSection from './components/sections/JoinMissionSection';
import Footer from './components/layout/Footer';


const LOCAL_STORAGE_MOBILE_POPUP_SEEN_KEY = 'cigar_mobilePopupSeen_v3';
const LOCAL_STORAGE_AUDIO_POPUP_SEEN_DESKTOP_KEY = 'cigar_audioPopupSeenDesktop_v3';
const LOCAL_STORAGE_INTRO_COMPLETED_KEY = 'cigar_introCompleted_v5';

type AppStep = 'initial_load' | 'mobile_experience_popup' | 'audio_experience_popup_desktop' | 'story_intro' | 'main_application';

function App() {
  const { isMobile } = useViewport();
  const { markUserInteracted, userInteracted, playSound } = useSoundContext();

  const getLocalStorageItem = useCallback((key: string) => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) === 'true';
    }
    return false;
  }, []);

  const [mobilePopupWasSeen, setMobilePopupWasSeen] = useState(() => getLocalStorageItem(LOCAL_STORAGE_MOBILE_POPUP_SEEN_KEY));
  const [audioPopupDesktopWasSeen, setAudioPopupDesktopWasSeen] = useState(() => getLocalStorageItem(LOCAL_STORAGE_AUDIO_POPUP_SEEN_DESKTOP_KEY));
  const [introWasCompleted, setIntroWasCompleted] = useState(() => getLocalStorageItem(LOCAL_STORAGE_INTRO_COMPLETED_KEY));

  const [currentStep, setCurrentStep] = useState<AppStep>('initial_load');

  useEffect(() => {
    if (isMobile) {
      if (!mobilePopupWasSeen) {
        setCurrentStep('mobile_experience_popup');
      } else if (!introWasCompleted) {
        setCurrentStep('story_intro');
      } else {
        setCurrentStep('main_application');
      }
    } else { // Desktop
      if (!audioPopupDesktopWasSeen) {
        setCurrentStep('audio_experience_popup_desktop');
      } else if (!introWasCompleted) {
        setCurrentStep('story_intro');
      } else {
        setCurrentStep('main_application');
      }
    }
  }, [isMobile, mobilePopupWasSeen, audioPopupDesktopWasSeen, introWasCompleted, getLocalStorageItem]);

  useEffect(() => {
    const needsMobilePopup = isMobile && !mobilePopupWasSeen;
    const needsAudioPopupDesktop = !isMobile && !audioPopupDesktopWasSeen;
    const needsStoryIntro = !introWasCompleted;

    if (!needsMobilePopup && !needsAudioPopupDesktop && !needsStoryIntro && !userInteracted) {
      markUserInteracted();
    }
  }, [isMobile, mobilePopupWasSeen, audioPopupDesktopWasSeen, introWasCompleted, userInteracted, markUserInteracted]);


  const handleMobilePopupContinue = () => {
    playSound('/assets/sounds/robot-click.wav');
    localStorage.setItem(LOCAL_STORAGE_MOBILE_POPUP_SEEN_KEY, 'true');
    setMobilePopupWasSeen(true);
    if (!userInteracted) {
      markUserInteracted();
    }
  };

  const handleAudioPopupConfirmDesktop = () => {
    playSound('/assets/sounds/robot-click.wav');
    if (!userInteracted) {
      markUserInteracted();
    }
    localStorage.setItem(LOCAL_STORAGE_AUDIO_POPUP_SEEN_DESKTOP_KEY, 'true');
    setAudioPopupDesktopWasSeen(true);
  };

  const handleIntroComplete = () => {
    localStorage.setItem(LOCAL_STORAGE_INTRO_COMPLETED_KEY, 'true');
    setIntroWasCompleted(true);
    if (!userInteracted) {
        markUserInteracted();
    }
    setCurrentStep('main_application');
  };

  const resetAppStateAndReload = () => {
    playSound('/assets/sounds/robot-click.wav');
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_MOBILE_POPUP_SEEN_KEY);
      localStorage.removeItem(LOCAL_STORAGE_AUDIO_POPUP_SEEN_DESKTOP_KEY);
      localStorage.removeItem(LOCAL_STORAGE_INTRO_COMPLETED_KEY);
    }
    window.location.reload();
  };

  if (currentStep === 'initial_load') {
    return <div className="fixed inset-0 bg-black flex items-center justify-center"><p className="text-cyan-glow animate-pulse">Initializing Mission...</p></div>;
  }

  if (currentStep === 'mobile_experience_popup') {
    return (
      <>
        <MobileExperiencePopup onContinue={handleMobilePopupContinue} />
        <SoundControls />
      </>
    );
  }

  if (currentStep === 'audio_experience_popup_desktop') {
    return (
      <>
        <AudioExperiencePopup onConfirm={handleAudioPopupConfirmDesktop} />
        <SoundControls />
      </>
    );
  }

  if (currentStep === 'story_intro') {
    return (
      <>
        <StoryIntro onComplete={handleIntroComplete} />
        <SoundControls />
      </>
    );
  }

  if (currentStep === 'main_application') {
    return (
      <div className="relative min-h-screen bg-black text-white font-spaceMono overflow-hidden">
        <ParticleBackground />
        <div className="scanline-overlay"></div>
        <div className="relative z-10">
          {/* Kirim fungsi resetAppStateAndReload sebagai onStoryMenuReset */}
          <Header onStoryMenuReset={resetAppStateAndReload} />
          <main>
            <HeroSection />
            <LoreSection />
            <RoadmapSection />
            <TechnologySection />
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
  
  return <div className="fixed inset-0 bg-black flex items-center justify-center"><p className="text-red-500">Error: Reached unknown application step. Current step: {currentStep}</p></div>;
}

export default App;