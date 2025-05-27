import React, { useEffect, useRef } from 'react';
import { Map, CheckCircle2, Clock, Timer } from 'lucide-react';

interface RoadmapPhaseProps {
  title: string;
  subtitle: string;
  items: Array<{
    text: string;
    status: 'LAUNCHED' | 'ACTIVE' | 'ONGOING' | 'IN PROGRESS' | 'UPCOMING';
  }>;
  estimatedDate?: string;
  delay: number;
}

const RoadmapPhase: React.FC<RoadmapPhaseProps> = ({ title, subtitle, items, estimatedDate, delay }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LAUNCHED':
        return 'text-green-400';
      case 'ACTIVE':
        return 'text-cyan-glow';
      case 'ONGOING':
        return 'text-yellow-400';
      case 'IN PROGRESS':
        return 'text-magenta-glow';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'LAUNCHED':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'ACTIVE':
        return <Timer className="h-4 w-4" />;
      case 'ONGOING':
      case 'IN PROGRESS':
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`tech-card animate-on-scroll opacity-0 translate-y-10 transition-all duration-700`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <h3 className="font-orbitron text-xl text-cyan-glow mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{subtitle}</p>
      {estimatedDate && (
        <p className="text-electric-blue text-xs mb-4">{estimatedDate}</p>
      )}
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className={`flex-shrink-0 mt-1 ${getStatusColor(item.status)}`}>
              {getStatusIcon(item.status)}
            </span>
            <span className={`text-sm ${getStatusColor(item.status)}`}>
              [{item.status}] {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const RoadmapSection: React.FC = () => {
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
  
  const phases = [
    {
      title: "PHASE 0: THE SIGNAL & THE CALL",
      subtitle: "Alliance Formation & Foundation",
      items: [
        { text: "Official Website & Story Intro v1", status: "LAUNCHED" },
        { text: "Social Media Channels Activated", status: "LAUNCHED" },
        { text: "Alliance Airdrop Registration Open", status: "ACTIVE" },
        { text: "Core Community Building & Engagement", status: "ONGOING" },
        { text: "Whitepaper v1 & Detailed Tokenomics", status: "IN PROGRESS" },
        { text: "Base Network Integration Research", status: "IN PROGRESS" }
      ]
    },
    {
      title: "PHASE 1: FIRST CONTACT & ALLIANCE FORGED",
      subtitle: "Early Airdrop Distribution & Technical Foundations",
      estimatedDate: "Est. Qx 202X",
      items: [
        { text: "$CIGAR Token Contract Audit", status: "UPCOMING" },
        { text: "Alliance Airdrop - Stage 1 Distribution", status: "UPCOMING" },
        { text: "$CIGAR Core Module for Base (Testnet)", status: "UPCOMING" },
        { text: "Full Whitepaper Release", status: "UPCOMING" },
        { text: "'Alliance Emissaries' Program Launch", status: "UPCOMING" }
      ]
    },
    {
      title: "PHASE 2: IGNITING $CIGAR",
      subtitle: "TGE, DEX Listing & Initial Utility Rollout",
      estimatedDate: "Est. Qx 202X - Qy 202X",
      items: [
        { text: "Token Generation Event (TGE) on Base", status: "UPCOMING" },
        { text: "Initial DEX Listing & First Token Burn", status: "UPCOMING" },
        { text: "Exclusive NFT Collection Launch", status: "UPCOMING" },
        { text: "Staking & LP Rewards Program", status: "UPCOMING" },
        { text: "Community Dashboard & Holder Tools v1", status: "UPCOMING" }
      ]
    },
    {
      title: "PHASE 3: GALACTIC EXPANSION",
      subtitle: "$CIGARverse, DAO Governance & Long-Term Growth",
      estimatedDate: "Est. Qy 202X Onwards",
      items: [
        { text: "$CIGARverse Concept Unveiling", status: "UPCOMING" },
        { text: "'Degen' Mini-Games Launch", status: "UPCOMING" },
        { text: "DAO Governance Implementation", status: "UPCOMING" },
        { text: "Strategic CEX Listing Considerations", status: "UPCOMING" },
        { text: "Inter-Chain Growth Planning", status: "UPCOMING" }
      ]
    }
  ];

  return (
    <section 
      id="roadmap" 
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-blue/20 to-black"></div>
      <div className="tech-grid absolute inset-0 opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <div className="flex items-center justify-center mb-4">
            <Map className="h-8 w-8 text-electric-blue mr-2" />
          </div>
          <p className="text-electric-blue font-exo uppercase tracking-widest mb-4">Mission Timeline</p>
          <h2 className="section-title">Interstellar Alliance <span className="text-electric-blue electric-blue-glow">Roadmap</span></h2>
          <p className="section-subtitle">
            A strategic timeline for the Earth-Smoketron partnership, from initial contact to full technological integration.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {phases.map((phase, index) => (
            <RoadmapPhase
              key={index}
              title={phase.title}
              subtitle={phase.subtitle}
              items={phase.items}
              estimatedDate={phase.estimatedDate}
              delay={100 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;