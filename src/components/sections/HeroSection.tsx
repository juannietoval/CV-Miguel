import { MapPin, Mail, Linkedin, Library } from 'lucide-react';
import { AcademiaIcon, GoogleScholarIcon, ResearchGateIcon } from '../CustomIcons';
import { PROFESSOR_DATA } from '../../data/professorData';

export default function HeroSection() {
  return (
            <section id="bio" className="scroll-mt-20 md:scroll-mt-28">
              <div className="glass rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
                {/* Foto de Perfil Centrada */}
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/50 shadow-xl mb-8 flex-shrink-0">
                  <img 
                    src={PROFESSOR_DATA.profileImage} 
                    alt={PROFESSOR_DATA.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
    
                {/* Información Principal */}
                <div className="max-w-3xl mx-auto">
                  <h1 className="serif text-3xl md:text-5xl font-bold mb-3 text-indigo-950 leading-tight">
                    {PROFESSOR_DATA.name}
                  </h1>
                  <p className="text-lg md:text-xl text-indigo-600 font-medium mb-6 italic serif">
                    {PROFESSOR_DATA.title}
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                    <span className="flex items-center gap-2 text-xs md:text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-full border border-white/30 shadow-sm">
                      <MapPin size={14} className="text-indigo-500" /> {PROFESSOR_DATA.location}
                    </span>
                    <span className="flex items-center gap-2 text-xs md:text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-full border border-white/30 shadow-sm">
                      <Mail size={14} className="text-indigo-500" /> {PROFESSOR_DATA.email}
                    </span>
                  </div>
    
                  {/* Redes Sociales Centradas */}
                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <a 
                      href={PROFESSOR_DATA.social.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      data-tooltip="LinkedIn" 
                      className="social-btn group p-4 glass rounded-2xl hover:bg-[#0077b5] hover:scale-110 text-[#0077b5] hover:text-white shadow-sm transition-all"
                    >
                      <Linkedin size={22} />
                    </a>
                    <a 
                      href={PROFESSOR_DATA.social.scholar} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      data-tooltip="Google Scholar" 
                      className="social-btn group p-4 glass rounded-2xl hover:bg-[#4285F4] hover:scale-110 text-[#4285F4] hover:text-white shadow-sm transition-all"
                    >
                      <GoogleScholarIcon size={22} />
                    </a>
                    <a 
                      href={PROFESSOR_DATA.social.researchgate} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      data-tooltip="ResearchGate" 
                      className="social-btn group p-4 glass rounded-2xl hover:bg-[#00ccbb] hover:scale-110 text-[#00ccbb] hover:text-white shadow-sm transition-all"
                    >
                      <ResearchGateIcon size={22} />
                    </a>
                    <a 
                      href={PROFESSOR_DATA.social.academia} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      data-tooltip="Academia.edu" 
                      className="social-btn group p-4 glass rounded-2xl hover:bg-[#313535] hover:scale-110 text-[#313535] hover:text-white shadow-sm transition-all"
                    >
                      <AcademiaIcon size={22} />
                    </a>
                    <a 
                      href={PROFESSOR_DATA.social.repository} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      data-tooltip="Repositorio UTP" 
                      className="social-btn group p-4 glass rounded-2xl hover:bg-indigo-600 hover:scale-110 text-indigo-600 hover:text-white shadow-sm transition-all"
                    >
                      <Library size={22} />
                    </a>
                  </div>
    
                  {/* Biografía (Siempre Visible) */}
                  <div className="border-t border-indigo-100 pt-8">
                    <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Perfil Profesional</h3>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 text-left whitespace-pre-line">
                      {PROFESSOR_DATA.bio}
                    </p>
                  </div>
                </div>
              </div>
            </section>
    
  );
}
