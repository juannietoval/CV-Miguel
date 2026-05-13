/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  Gavel,
  Calendar,
  MapPin,
  Linkedin,
  Twitter,
  Globe,
  Search,
  Users,
  Book,
  Briefcase,
  Library,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AcademiaIcon, GoogleScholarIcon, ResearchGateIcon } from './components/CustomIcons';

import { PROFESSOR_DATA } from './data/professorData';
import Footer from './components/sections/Footer';
import Header from './components/sections/Header';
import HeroSection from './components/sections/HeroSection';


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
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 space-y-8 md:space-y-12">
        
        <HeroSection />
        {/* Sección Trayectoria (CV) */}
        <section id="cv" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'cv' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="text-indigo-600" /> Formación Académica
              </h2>
              <button 
                onClick={() => toggleSection('cv')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'cv' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-4 md:space-y-6">
                {PROFESSOR_DATA.cv.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                    <span className="text-xs md:text-sm font-bold text-indigo-600 md:w-32 pt-1">{item.year}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors">{item.role}</h3>
                      <p className="text-sm md:text-base text-indigo-900/70 font-medium">{item.institution}</p>
                      {item.description && (
                        <p className="text-xs md:text-sm text-gray-600 mt-2 italic">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Award className="hidden md:block text-indigo-200 group-hover:text-indigo-400 transition-colors" size={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Experiencia Profesional */}
        <section id="experience" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'experience' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Briefcase className="text-indigo-600" /> Experiencia Profesional
              </h2>
              <button 
                onClick={() => toggleSection('experience')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'experience' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6 md:space-y-8">
                {PROFESSOR_DATA.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 md:pl-8 border-l-2 border-indigo-100 pb-6 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-indigo-950">{exp.institution}</h3>
                        <p className="text-sm font-semibold text-indigo-600">{exp.period}</p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] md:text-xs font-bold rounded-full self-start">
                        {exp.dedication}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {exp.activities.admin && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Administración</h4>
                          <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                            {exp.activities.admin.map((a, i) => <li key={i} className="flex gap-2"><span>•</span> {a}</li>)}
                          </ul>
                        </div>
                      )}
                      {exp.activities.teaching && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Docencia</h4>
                          <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                            {exp.activities.teaching.map((t, i) => <li key={i} className="flex gap-2"><span>•</span> {t}</li>)}
                          </ul>
                        </div>
                      )}
                      {exp.activities.research && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Investigación</h4>
                          <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                            {exp.activities.research.map((r, i) => <li key={i} className="flex gap-2"><span>•</span> {r}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección Trabajos Dirigidos / Tutorías */}
        <section id="tutoring" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'tutoring' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Users className="text-indigo-600" /> Trabajos Dirigidos / Tutorías
              </h2>
              <button 
                onClick={() => toggleSection('tutoring')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'tutoring' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-4 md:space-y-6">
                {PROFESSOR_DATA.tutoring.map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{item.year}</span>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Institución:</span> {item.institution}</p>
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Estado:</span> {item.status}</p>
                      {item.student && (
                        <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Persona(s) orientada(s):</span> {item.student}</p>
                      )}
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Rol:</span> {item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Jurado en comités de evaluación */}
        <section id="jury" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'jury' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Gavel className="text-indigo-600" /> Jurado en Comités de Evaluación
              </h2>
              <button 
                onClick={() => toggleSection('jury')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'jury' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-4 md:space-y-6">
                {PROFESSOR_DATA.jury.map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Institución:</span> {item.institution}</p>
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Programa:</span> {item.program}</p>
                      {item.student && (
                        <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Persona(s) orientada(s):</span> {item.student}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Eventos Científicos */}
        <section id="events" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'events' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Calendar className="text-indigo-600" /> Eventos Científicos
              </h2>
              <button 
                onClick={() => toggleSection('events')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'events' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-4 md:space-y-6">
                {PROFESSOR_DATA.events.map((event, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {event.type}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {event.scope}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-500">{event.date}</span>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors mb-2">
                      {idx + 1}. {event.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Ubicación:</span> {event.location}</p>
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Rol:</span> {event.role}</p>
                      {event.participants && event.participants.length > 0 && (
                        <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Participantes:</span> {event.participants.join(", ")}</p>
                      )}
                      {event.institutions && event.institutions.length > 0 && (
                        <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Instituciones:</span> {event.institutions.join(", ")}</p>
                      )}
                      {event.product && (
                        <p className="text-indigo-600 md:col-span-2 italic"><span className="font-bold text-indigo-900/70 not-italic">Producto:</span> {event.product}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Redes de Conocimiento Especializado */}
        <section id="networks" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'networks' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Globe className="text-indigo-600" /> Redes de Conocimiento Especializado
              </h2>
              <button 
                onClick={() => toggleSection('networks')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'networks' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROFESSOR_DATA.networks.map((network, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${network.type === 'Real' ? 'text-indigo-600 bg-indigo-50' : 'text-purple-600 bg-purple-50'}`}>
                        Red {network.type}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{network.date}</span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-indigo-800 transition-colors mb-4">
                      {network.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-indigo-400" />
                      <span>{network.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Impacto Social y Apropiación del Conocimiento */}
        <section id="social" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'social' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Users className="text-indigo-600" /> Impacto Social y Apropiación del Conocimiento
              </h2>
              <button 
                onClick={() => toggleSection('social')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'social' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.socialImpact.map((item, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          Apropiación Social del Conocimiento
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                          Interés Social
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      {item.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Licencia:</span> {item.license}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Formato:</span> {item.format}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Proyecto:</span> {item.project}</p>
                        <a 
                          href={item.verification} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
                        >
                          Verificación <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Producciones de Contenido Digital Audiovisual */}
        <section id="audiovisual" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'audiovisual' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Library className="text-indigo-600" /> Producciones Audiovisuales
              </h2>
              <button 
                onClick={() => toggleSection('audiovisual')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'audiovisual' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROFESSOR_DATA.digitalContent.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Cápsula de Video
                      </span>
                      <span className="text-xs font-bold text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-indigo-800 transition-colors mb-4 flex-grow">
                      {item.title}
                    </h3>
                    <div className="space-y-3 mt-auto">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin size={14} className="text-indigo-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Globe size={14} className="text-blue-400" />
                        <span>Circulación {item.circulation}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 italic line-clamp-2">
                        <span className="font-bold not-italic">Proyecto:</span> {item.project}
                      </p>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl bg-indigo-600 text-white text-center text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                      >
                        Ver en YouTube <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Artículos */}
        <section id="articles" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'articles' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <FileText className="text-indigo-600" /> Artículos
              </h2>
              <button 
                onClick={() => toggleSection('articles')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'articles' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.articles.map((article, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Artículo Publicado
                      </span>
                      <span className="text-xs font-bold text-gray-500">{article.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      "{article.title}"
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Autores:</span> {article.authors}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Revista:</span> {article.journal}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">ISSN:</span> {article.issn}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Editorial:</span> {article.publisher}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Detalles:</span> {article.details}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">País:</span> {article.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Textos en publicaciones no científicas */}
        <section id="divulgation" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'divulgation' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <BookOpen className="text-indigo-600" /> Publicaciones de Divulgación
              </h2>
              <button 
                onClick={() => toggleSection('divulgation')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'divulgation' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.nonScientificArticles.map((article, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Artículo de Divulgación
                      </span>
                      <span className="text-xs font-bold text-gray-500">{article.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      "{article.title}"
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Autores:</span> {article.authors}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Revista:</span> {article.journal}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">ISSN:</span> {article.issn}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Volumen:</span> {article.volume}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Páginas:</span> {article.pages}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">País:</span> {article.location}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {article.areas}</p>
                      </div>
                      {article.keywords && (
                        <div className="md:col-span-2 mt-2">
                          <p className="text-xs font-bold text-indigo-900/70 mb-2">Palabras clave:</p>
                          <div className="flex flex-wrap gap-2">
                            {article.keywords.map((word, i) => (
                              <span key={i} className="text-[10px] bg-white/40 px-2 py-1 rounded-full border border-white/50 text-gray-700">
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Libros de divulgación y/o Compilación de divulgación */}
        <section id="divulgation-books" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'divulgation-books' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Book className="text-indigo-600" /> Libros de Divulgación
              </h2>
              <button 
                onClick={() => toggleSection('divulgation-books')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'divulgation-books' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.divulgationBooks.map((book, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Libro de Divulgación / Compilación
                      </span>
                      <span className="text-xs font-bold text-gray-500">{book.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      "{book.title}"
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">ISBN:</span> {book.isbn}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Medio:</span> {book.medium}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Editorial:</span> {book.publisher}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Lugar:</span> {book.location}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {book.areas}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Informes de Investigación */}
        <section id="reports" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'reports' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <FileText className="text-indigo-600" /> Informes de Investigación
              </h2>
              <button 
                onClick={() => toggleSection('reports')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'reports' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.researchReports.map((report, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Producción Técnica - Informe
                      </span>
                      <span className="text-xs font-bold text-gray-500">{report.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      {report.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Autores:</span> {report.authors}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">País:</span> {report.location}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {report.areas}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Obras o productos */}
        <section id="artistic" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'artistic' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Award className="text-indigo-600" /> Obras o Productos
              </h2>
              <button 
                onClick={() => toggleSection('artistic')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'artistic' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-8">
                {PROFESSOR_DATA.artisticWorks.map((work, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Obra / Producto Artístico
                      </span>
                      <span className="text-xs font-bold text-gray-500">{work.date}</span>
                    </div>
                    <h3 className="font-semibold text-xl md:text-2xl group-hover:text-indigo-800 transition-colors mb-4">
                      {work.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6">
                      <span className="font-bold text-indigo-900/70">Disciplina:</span> {work.discipline}
                    </p>
                    
                    <div className="mt-6 border-t border-white/30 pt-6">
                      <h4 className="text-xs font-bold text-indigo-900/70 uppercase tracking-widest mb-4">Instancias de Valoración</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {work.validations.map((val, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/30 border border-white/40">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                              <Calendar size={16} />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-800">{val.event}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar size={12} /> {val.date}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Gavel size={12} /> {val.institution}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Proyectos */}
        <section id="projects" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'projects' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Briefcase className="text-indigo-600" /> Proyectos
              </h2>
              <button 
                onClick={() => toggleSection('projects')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'projects' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-8">
                {PROFESSOR_DATA.projects.map((project, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {project.type}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        {project.start} — {project.end}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl md:text-2xl group-hover:text-indigo-800 transition-colors mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <div className="mt-4 p-4 md:p-6 rounded-xl bg-white/30 border border-white/40">
                      <h4 className="text-xs font-bold text-indigo-900/70 uppercase tracking-widest mb-3">Resumen del Proyecto</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Formación Complementaria */}
        <section id="complementary" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'complementary' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <FileText className="text-indigo-600" /> Formación Complementaria
              </h2>
              <button 
                onClick={() => toggleSection('complementary')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'complementary' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROFESSOR_DATA.complementary.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/20 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {item.year.slice(-2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Hub de Productos (Publicaciones) */}
        <section id="products" className="scroll-mt-20 md:scroll-mt-28">
          <div className="glass rounded-3xl p-6 md:p-12">
            <h2 className="serif text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-3">
              <BookOpen className="text-indigo-600" /> Publicaciones
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {PROFESSOR_DATA.products.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="group relative glass rounded-2xl overflow-hidden flex flex-col sm:flex-row h-full"
                >
                  <div className="w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <a 
                      href={product.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-6 md:p-8 flex-1 flex flex-col justify-start group/content"
                    >
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-3 block">
                        {product.type}
                      </span>
                      <h3 className="serif text-xl md:text-2xl font-bold mb-4 group-hover/content:text-indigo-600 transition-colors leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 line-clamp-3 md:line-clamp-4 leading-relaxed">
                        {product.description}
                      </p>
                    </a>
                    <a 
                      href={product.link} 
                      className="w-full py-4 md:py-5 bg-indigo-600/5 hover:bg-indigo-600/10 border-t border-white/40 text-indigo-700 font-bold flex items-center justify-center gap-3 transition-all duration-300 group/btn"
                    >
                      Ver más <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
  );
}
