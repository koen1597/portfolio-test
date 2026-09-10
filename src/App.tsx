/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { HowIWorkSection } from './components/HowIWorkSection';
import { ContactSection } from './components/ContactSection';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AdminModal } from './components/AdminModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#FAF9F6] text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans antialiased">
        {/* Navigation Bar */}
        <Header />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <ExperienceSection />
          <HowIWorkSection />
          <ContactSection />
        </main>

        {/* Interactive Modals */}
        <ProjectDetailModal />
        <AdminModal />
        <ResumeModal />
      </div>
    </PortfolioProvider>
  );
}
