import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsBloxBuddy from './components/WhatIsBloxBuddy';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import FloatingAIAssistant from './components/FloatingAIAssistant';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';

function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-blox-gradient">
        <Navbar />
        <FloatingAIAssistant />
        <main className="pt-16"> {/* Padding top to account for fixed navbar */}
          <Hero />
          <WhatIsBloxBuddy />
          <CTASection />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;