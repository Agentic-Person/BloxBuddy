import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Hero3D from './components/Hero3D';
import WhatIsBloxBuddy from './components/WhatIsBloxBuddy';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import FloatingAIAssistant from './components/FloatingAIAssistant';
import { SmoothScrollProvider } from './components/SmoothScrollProvider';

function App() {
  const [use3DHero, setUse3DHero] = useState(true);

  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-blox-gradient">
        <Navbar />
        <FloatingAIAssistant />
        <main className="pt-16"> {/* Padding top to account for fixed navbar */}
          {use3DHero ? <Hero3D /> : <Hero />}
          <WhatIsBloxBuddy />
          <CTASection />
        </main>
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}

export default App;