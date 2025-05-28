// src/components/sections/JoinMissionSection.tsx
import React, { useState, useEffect, useRef, useMemo } from 'react'; // Tambahkan useMemo
import Button from '../ui/Button';
import { Rocket, ChevronRight, CheckCircle, Copy as CopyIcon, Share2 } from 'lucide-react'; // Tambahkan CopyIcon dan Share2
import { useSoundContext } from '../../contexts/SoundContext'; // Impor jika ingin ada suara saat copy
import { toast } from 'sonner'; // Impor toast untuk notifikasi

const JoinMissionSection: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedWalletAddress, setSubmittedWalletAddress] = useState(''); // Simpan alamat yang disubmit
  const sectionRef = useRef<HTMLElement>(null);
  const { playSound } = useSoundContext(); // Dapatkan playSound dari context

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress) return;
    
    playSound('/assets/sounds/robot-click.wav');
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmittedWalletAddress(walletAddress); // Simpan alamat yang berhasil didaftarkan
      setIsSubmitting(false);
      setIsSubmitted(true);
      setWalletAddress(''); // Kosongkan input field setelah submit
    }, 1500);
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elementsToObserve = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elementsToObserve?.forEach((el) => {
      observer.observe(el);
    });
    
    return () => {
      elementsToObserve?.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Generate referral link berdasarkan alamat dompet yang disubmit
  const referralLink = useMemo(() => {
    if (!submittedWalletAddress) return '';
    // Ganti 'yourproject.com' dengan domain Anda
    // Anda bisa juga menggunakan encoder untuk walletAddress jika mengandung karakter spesial
    return `${window.location.origin}/join?ref=${submittedWalletAddress}`;
  }, [submittedWalletAddress]);

  const handleCopyReferralLink = async () => {
    if (!referralLink) return;
    playSound('/assets/sounds/robot-click.wav'); // Suara saat copy
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success('Referral link copied!', { position: 'bottom-center', duration: 2000 });
    } catch (err) {
      console.error('Failed to copy referral link: ', err);
      toast.error('Failed to copy link.', { position: 'bottom-center', duration: 2000 });
    }
  };
  
  return (
    <section 
      id="join" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-dark-blue/40 to-black"></div>
      <div className="tech-grid absolute inset-0 opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <Rocket className="h-12 w-12 text-cyan-glow mx-auto mb-4" />
            <h2 className="section-title">Join The <span className="text-cyan-glow glow-text">Mission</span></h2>
            <p className="section-subtitle">
            Answer the call to an interstellar quest. Secure your place in the $CIGAR airdrop, join a mission of mutual advancement, and earn your share.
            </p>
          </div>
          
          <div className="bg-gray-900/30 backdrop-blur-md border border-cyan-glow/30 rounded-lg p-8 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="wallet" className="block font-orbitron text-cyan-glow mb-2">Your Wallet Address</label>
                  <input 
                    type="text" 
                    id="wallet"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    className="w-full bg-black/50 border border-cyan-glow/50 text-gray-200 p-3 rounded-md focus:outline-none focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow font-spaceMono"
                    placeholder="0x..."
                    required
                  />
                </div>
                
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="text-gray-400 text-sm order-2 md:order-1">
                    By joining, you accept the call of duty within the Terran Alliance.
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto order-1 md:order-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Register for Airdrop</span>
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-cyan-glow mx-auto mb-4" />
                <h3 className="font-orbitron text-2xl text-white mb-2">Registration Complete!</h3>
                <p className="text-gray-300 mb-6">
                Welcome, Terran Ally! You're in the $CIGAR mission. Await news on the $CIGAR airdrop.
                </p>
                
                {/* Bagian Referral Link */}
                {referralLink && (
                  <div className="mt-8 pt-6 border-t border-cyan-glow/20">
                    <div className="flex items-center justify-center mb-3">
                        <Share2 className="h-5 w-5 text-magenta-glow mr-2"/>
                        <h4 className="font-orbitron text-lg text-magenta-glow">Share Your Referral Link!</h4>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">
                      Invite others to join the mission and earn potential rewards.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 bg-black/50 p-3 rounded-lg border border-magenta-glow/30">
                      <input 
                        type="text" 
                        value={referralLink} 
                        readOnly 
                        className="w-full sm:flex-grow bg-transparent text-gray-200 p-2 rounded font-spaceMono text-sm select-all"
                        onFocus={(e) => e.target.select()} // Agar mudah di-copy manual juga
                      />
                      <Button 
                        onClick={handleCopyReferralLink}
                        variant="secondary"
                        glowColor="magenta"
                        size="sm"
                        className="w-full sm:w-auto px-4 py-2 flex items-center"
                      >
                        <CopyIcon className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                    </div>
                  </div>
                )}
                {/* Akhir Bagian Referral Link */}

                <Button 
                  onClick={() => {
                    playSound('/assets/sounds/robot-click.wav');
                    setIsSubmitted(false); 
                    setSubmittedWalletAddress(''); // Reset alamat yang disubmit juga
                  }} 
                  className="mt-8"
                >
                  Register Another Wallet
                </Button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="tech-card animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200">
              <h3 className="font-orbitron text-lg text-cyan-glow mb-2">Connect</h3>
              <p className="text-gray-400 text-sm">
              Signal your intent to join the expedition. Register your comm-link to sync with the interstellar alliance network.
              </p>
            </div>
            
            <div className="tech-card animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
              <h3 className="font-orbitron text-lg text-cyan-glow mb-2">Pioneer Discovery</h3>
              <p className="text-gray-400 text-sm">
              Become a pioneer in discovery. Your unique signature helps chart new technological pathways on the Base Network.
              </p>
            </div>
            
            <div className="tech-card animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-400">
              <h3 className="font-orbitron text-lg text-cyan-glow mb-2">Mutual Prosperity</h3>
              <p className="text-gray-400 text-sm">
                Earn $CIGAR tokens as a valued partner, sharing the rewards of this vital interstellar quest.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinMissionSection;