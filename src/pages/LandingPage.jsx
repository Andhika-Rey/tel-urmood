import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TransitionOverlay from '../components/TransitionOverlay';
import HeroSection from '../components/landing/HeroSection';
import WhatIsSection from '../components/landing/WhatIsSection';
import ContextsSection from '../components/landing/ContextsSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import MoodMapPreview from '../components/landing/MoodMapPreview';
import FinalCTASection from '../components/landing/FinalCTASection';

export default function LandingPage() {
  const [showTransition, setShowTransition] = useState(false);

  function handleStartTest() {
    setShowTransition(true);
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Global ambient background layers */}
      <div className="fixed inset-0 -z-30 pointer-events-none">
        {/* Base mint wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-mint-pale via-white to-mint-pale" />
        {/* Large floating glow orbs */}
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full bg-mint/25 blur-[120px]" />
        <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] rounded-full bg-teal/10 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[350px] h-[350px] rounded-full bg-mint/20 blur-[110px]" />
      </div>

      {/* Subtle wave decoration */}
      <div className="fixed top-0 left-0 right-0 h-[800px] -z-20 overflow-hidden pointer-events-none">
        <svg className="absolute bottom-0 w-full opacity-[0.05]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#4f9f96" d="M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,165.3C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
        <svg className="absolute bottom-0 w-full opacity-[0.03]" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#813a88" d="M0,256L48,245.3C96,235,192,213,288,192C384,171,480,149,576,165.3C672,181,768,235,864,234.7C960,235,1056,181,1152,170.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Faint grid mesh overlay */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #4f9f96 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {showTransition && <TransitionOverlay />}

      <Navbar onStartTest={handleStartTest} />

      <main className="flex-1">
        <HeroSection onStartTest={handleStartTest} />
        <WhatIsSection />
        <ContextsSection />
        <HowItWorksSection />
        <MoodMapPreview />
        <FinalCTASection onStartTest={handleStartTest} />
      </main>

      <Footer />
    </div>
  );
}
