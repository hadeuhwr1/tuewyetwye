import React, { useEffect, useRef } from 'react';
import { Zap, Shield } from 'lucide-react';

const LoreSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
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
  
  return (
    <section 
      id="lore" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-blue/20 to-black"></div>
      <div className="tech-grid absolute inset-0 opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <p className="text-magenta-glow font-exo uppercase tracking-widest mb-4">Classified Archives</p>
          <h2 className="section-title">Chronicles of <span className="text-magenta-glow magenta-glow">Smoketron</span></h2>
          <p className="section-subtitle">
            A civilization's desperate plea echoes across the stars. Their fate—and untold rewards—now rest in Terran hands.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Planet Smoketron */}
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-100 h-full flex flex-col">
            <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/assets/images/smoketron_planet.png')",
                  filter: 'hue-rotate(60deg) brightness(0.8)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-orbitron text-xl text-white">Smoketron: A World in Crisis</h3>
                <p className="text-cyan-glow text-sm">Birthplace of the $CIGAR Protocol</p>
              </div>
            </div>
            
            <div className="space-y-6 flex-grow">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-magenta-glow mr-3 mt-1 shrink-0" />
                <p className="text-gray-300">
                  Once masters of quantum technology, Smoketron's civilization channeled their genius into $CIGAR—a self-evolving protocol that promised eternal prosperity.
                </p>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-magenta-glow mr-3 mt-1 shrink-0" />
                <p className="text-gray-300">
                  The Krellnic Inversion struck without warning. Reality itself seemed to fracture. Their masterwork, $CIGAR, lay dormant—but not dead. It awaits a new foundation.
                </p>
              </div>
            </div>
          </div>
          
          {/* The Mission */}
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-200 h-full flex flex-col">
            <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/assets/images/cigar.png')",
                  filter: 'hue-rotate(-30deg) brightness(0.7)'
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-orbitron text-xl text-white">The Terran Alliance Initiative</h3>
                <p className="text-cyan-glow text-sm">Your Gateway to Interstellar Prosperity</p>
              </div>
            </div>
            
            <div className="space-y-6 flex-grow">
              <div className="flex items-start">
                <Shield className="h-6 w-6 text-magenta-glow mr-3 mt-1 shrink-0" />
                <p className="text-gray-300">
                  Their quantum scans revealed Earth's Base Network—a perfect host for $CIGAR's resurrection. A foundation strong enough to bridge worlds.
                </p>
              </div>
              
              <div className="flex items-start">
                <Zap className="h-6 w-6 text-magenta-glow mr-3 mt-1 shrink-0" />
                <p className="text-gray-300">
                  Now, they seek Earth's boldest minds. Join the alliance, help restore $CIGAR, and claim your share of Smoketron's legendary wealth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoreSection;