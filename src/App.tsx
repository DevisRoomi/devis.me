import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Header } from './components/Header';
import { HeroSection } from './sections/01_HeroSection';
import { useLenis } from './hooks/useLenis';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll once preloader finishes
  useLenis();

  return (
    <div className="relative min-h-screen bg-canvas-bg text-text-primary selection:bg-crimson selection:text-white">
      {/* Dennis Snellenberg Preloader */}
      {isLoading && (
        <Preloader onLoadingComplete={() => setIsLoading(false)} />
      )}

      {/* Main Portfolio Navigation */}
      <Header />

      {/* Hero Section */}
      <main className="w-full">
        <HeroSection isLoading={isLoading} />
      </main>
    </div>
  );
};

export default App;
