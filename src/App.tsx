/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

import { PROFESSOR_DATA } from './data/professorData';
import Footer from './components/sections/Footer';
import Header from './components/sections/Header';
import CvSection from './components/sections/CvSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ComplementarySection from './components/sections/ComplementarySection';
import TutoringSection from './components/sections/TutoringSection';
import JurySection from './components/sections/JurySection';
import EventsSection from './components/sections/EventsSection';
import NetworksSection from './components/sections/NetworksSection';
import SocialImpactSection from './components/sections/SocialImpactSection';
import AudiovisualSection from './components/sections/AudiovisualSection';
import ArticlesSection from './components/sections/ArticlesSection';
import DivulgationSection from './components/sections/DivulgationSection';
import DivulgationBooksSection from './components/sections/DivulgationBooksSection';
import ReportsSection from './components/sections/ReportsSection';
import ArtisticWorksSection from './components/sections/ArtisticWorksSection';
import ProjectsSection from './components/sections/ProjectsSection';
import ProductsSection from './components/sections/ProductsSection';
import HeroSection from './components/sections/HeroSection';

// Suppress unused import warning — PROFESSOR_DATA is referenced by child components
void PROFESSOR_DATA;


export default function App() {
  const [expandedSection, setExpandedSection] = useState<string | null>('bio');
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Elementos Decorativos Flotantes */}
      <div className="floating-shape w-64 h-64 bg-indigo-400 top-20 -left-20" />
      <div className="floating-shape w-96 h-96 bg-pink-300 bottom-20 -right-20" style={{ animationDelay: '-5s' }} />
      <div className="floating-shape w-48 h-48 bg-blue-300 top-1/2 left-1/3" style={{ animationDelay: '-10s' }} />

      <Header setExpandedSection={setExpandedSection} />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 space-y-8 md:space-y-12">
        
        <HeroSection />
        <CvSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <ExperienceSection expandedSection={expandedSection} toggleSection={toggleSection} />
        
        <TutoringSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <JurySection expandedSection={expandedSection} toggleSection={toggleSection} />
        <EventsSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <NetworksSection expandedSection={expandedSection} toggleSection={toggleSection} />

        <SocialImpactSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <AudiovisualSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <ArticlesSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <DivulgationSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <DivulgationBooksSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <ReportsSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <ArtisticWorksSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <ProjectsSection expandedSection={expandedSection} toggleSection={toggleSection} />
        <ComplementarySection expandedSection={expandedSection} toggleSection={toggleSection} />
        <ProductsSection />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
