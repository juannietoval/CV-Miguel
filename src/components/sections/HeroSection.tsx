import { MapPin, Mail, Linkedin, Library } from 'lucide-react';
import { AcademiaIcon, GoogleScholarIcon, ResearchGateIcon } from '../CustomIcons';
import { PROFESSOR_DATA } from '../../data/professorData';
import { motion } from 'motion/react';

export default function HeroSection() {
  return (
            <section id="bio" className="scroll-mt-20 md:scroll-mt-28">
              <div className="rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
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
    
                  {/* Redes Sociales "Liquid Glass" (Inspirado en 21st.dev) */}
                  <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {[
                      { icon: Linkedin, url: PROFESSOR_DATA.social.linkedin, color: '#0077b5', label: 'LinkedIn' },
                      { icon: GoogleScholarIcon, url: PROFESSOR_DATA.social.scholar, color: '#4285F4', label: 'Scholar' },
                      { icon: ResearchGateIcon, url: PROFESSOR_DATA.social.researchgate, color: '#00ccbb', label: 'ResearchGate' },
                      { icon: AcademiaIcon, url: PROFESSOR_DATA.social.academia, color: '#313535', label: 'Academia' },
                      { icon: Library, url: PROFESSOR_DATA.social.repository, color: '#4f46e5', label: 'Repositorio' },
                    ].map((item, idx) => (
                      <motion.a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover="hover"
                        initial="initial"
                        className="group relative flex items-center justify-center p-4 rounded-2xl bg-white/20 backdrop-blur-md border border-white/40 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(31,38,135,0.15)]"
                        style={{ color: item.color }}
                      >
                        {/* Brillo Interior / Resplandor (Glow) */}
                        <motion.div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `radial-gradient(circle at center, ${item.color}20 0%, transparent 70%)`
                          }}
                        />
                        
                        {/* Fondo que se expande */}
                        <motion.div
                          variants={{
                            initial: { y: '100%', opacity: 0 },
                            hover: { y: 0, opacity: 1 }
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className="absolute inset-0 z-0"
                          style={{ backgroundColor: item.color }}
                        />

                        {/* Icono y Etiqueta */}
                        <div className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                          <item.icon size={24} />
                          <motion.span 
                            variants={{
                              initial: { width: 0, opacity: 0, marginLeft: 0 },
                              hover: { width: 'auto', opacity: 1, marginLeft: 4 }
                            }}
                            className="overflow-hidden whitespace-nowrap text-sm font-bold tracking-wide"
                          >
                            {item.label}
                          </motion.span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
    
                  {/* Biografía (Siempre Visible) */}
                  <div className="border-t border-indigo-100 pt-8">
                    <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Perfil Profesional</h3>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 text-center whitespace-pre-line max-w-2xl mx-auto">
                      {PROFESSOR_DATA.bio}
                    </p>
                  </div>
                </div>
              </div>
            </section>
    
  );
}

