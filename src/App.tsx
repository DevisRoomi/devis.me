import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { HeroSection } from './sections/01_HeroSection';
import { WorkSection } from './sections/02_WorkSection';
import { NexusSection } from './sections/03_NexusSection';
import { useLenis } from './hooks/useLenis';

export const App: React.FC = () => {
  const isOnlyWork = typeof window !== 'undefined' && window.location.search.includes('onlyWork');

  const [isLoading, setIsLoading] = useState(() => {
    if (isOnlyWork) return false;
    if (typeof window !== 'undefined' && window.location.search.includes('skipPreloader')) {
      return false;
    }
    return true;
  });

  // Initialize Lenis smooth scroll
  useLenis();

  // URL scroll helper for testing & visual verification
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const scrollTarget = params.get('scroll');
      if (scrollTarget) {
        const y = parseInt(scrollTarget, 10);
        setTimeout(() => {
          const win = window as unknown as { __lenis?: { scrollTo: (target: number, opts: { immediate: boolean }) => void } };
          if (win.__lenis) {
            win.__lenis.scrollTo(y, { immediate: true });
          } else {
            window.scrollTo({ top: y, behavior: 'instant' });
          }
        }, 150);
      }
    }
  }, []);

  if (isOnlyWork) {
    return (
      <div className="relative min-h-screen bg-[#EAF3FD]">
        <WorkSection />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#070b14] text-text-primary selection:bg-sky-400 selection:text-black">
      {/* Preloader with Hello / Multilingual Greetings */}
      {isLoading && (
        <Preloader onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* Floating Pill Capsule Navbar */}
      <Header />

      {/* Main Flow: Hero -> WorkSection -> NexusSection */}
      <main className="relative w-full">
        <HeroSection isLoading={isLoading} />
        <WorkSection />
        <NexusSection />
      </main>
    </div>
  );
};

export default App;
