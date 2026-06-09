import { Briefcase, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';
import { motion } from 'motion/react';



export default function ExperienceSection() {
  return (
    <section id="experience" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
              <div className="glass rounded-3xl p-6 md:p-12">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <Briefcase className="text-indigo-600" /> Experiencia Profesional
                  </h2>
                  
                </div>
    
                <div className="expandable-content">
                  <div className="space-y-4 md:space-y-6">
                    {PROFESSOR_DATA.experience.map((exp, idx) => (
                      <div key={idx} className="relative pl-6 md:pl-8 border-l-2 border-indigo-100 pb-8 last:pb-0">
                        <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm z-10" />
                        
                        <motion.div 
                          whileHover={{ y: -4, scale: 1.01 }}
                          className="group relative bg-white/40 backdrop-blur-md border border-white/60 p-6 rounded-3xl shadow-sm hover:shadow-[0_8px_30px_rgba(31,38,135,0.08)] transition-all overflow-hidden"
                        >
                          {/* Resplandor interior en hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                              <div>
                                <h3 className="text-lg md:text-xl font-bold text-indigo-950">{exp.institution}</h3>
                                <p className="text-sm font-semibold text-indigo-600">{exp.period}</p>
                              </div>
                              <span className="inline-block px-3 py-1 bg-white/60 backdrop-blur text-indigo-700 text-[10px] md:text-xs font-bold rounded-full self-start shadow-sm border border-indigo-50">
                                {exp.dedication}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 bg-white/20 rounded-2xl p-4 border border-white/40">
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

                            {exp.link && (
                              <div className="mt-4 flex justify-end">
                                <a
                                  href={exp.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 shadow-md shadow-indigo-600/20"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                  Ver Soporte
                                </a>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
  );
}

