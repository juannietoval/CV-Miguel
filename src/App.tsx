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
import HeroSection from './components/sections/HeroSection';

// Suppress unused import warning — PROFESSOR_DATA is referenced by child components
void PROFESSOR_DATA;


import { Routes, Route } from 'react-router-dom';
import AdminPanel from './components/sections/AdminPanel';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Elementos Decorativos Flotantes */}
      <div className="floating-shape w-64 h-64 bg-indigo-400 top-20 -left-20" />
      <div className="floating-shape w-96 h-96 bg-pink-300 bottom-20 -right-20" style={{ animationDelay: '-5s' }} />
      <div className="floating-shape w-48 h-48 bg-blue-300 top-1/2 left-1/3" style={{ animationDelay: '-10s' }} />

      <Header />

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 space-y-8 md:space-y-12">
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/bio" element={<HeroSection />} />
          <Route path="/cv" element={<CvSection />} />
          <Route path="/experience" element={<ExperienceSection />} />
          
          <Route path="/tutoring" element={<TutoringSection />} />
          <Route path="/jury" element={<JurySection />} />
          <Route path="/events" element={<EventsSection />} />
          <Route path="/networks" element={<NetworksSection />} />

          <Route path="/social" element={<SocialImpactSection />} />
          <Route path="/audiovisual" element={<AudiovisualSection />} />
          <Route path="/articles" element={<ArticlesSection />} />
          <Route path="/divulgation" element={<DivulgationSection />} />
          <Route path="/divulgation-books" element={<DivulgationBooksSection />} />
          <Route path="/reports" element={<ReportsSection />} />
          <Route path="/artistic" element={<ArtisticWorksSection />} />
          <Route path="/projects" element={<ProjectsSection />} />
          <Route path="/complementary" element={<ComplementarySection />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
