'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import UnlockScreen    from '@/components/UnlockScreen';
import Navbar          from '@/components/Navbar';
import HeroSection     from '@/components/hero/HeroSection';
import ProjectsSection from '@/components/projects/ProjectsSection';
import ContactForm     from '@/components/ContactForm';
import Footer          from '@/components/Footer';

export default function Home() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      {/* Fingerprint entry overlay — exits upward when scan completes */}
      <AnimatePresence>
        {!unlocked && (
          <UnlockScreen onUnlock={() => setUnlocked(true)} />
        )}
      </AnimatePresence>

      {/* Main site — fades in after unlock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: unlocked ? 1 : 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Navbar />
        <main>
          <HeroSection />
          <ProjectsSection />
          <ContactForm />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}
