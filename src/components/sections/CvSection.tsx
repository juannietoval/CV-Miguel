import { GraduationCap, ChevronDown, ChevronUp, Award, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';
import { SectionCard, GlassLinkButton, GlassBadge } from '../ui/SectionCard';



export default function CvSection() {
  return (
    <section id="cv" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
              <div className="glass rounded-3xl p-6 md:p-12">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <GraduationCap className="text-indigo-600" /> Formación Académica
                  </h2>
                  
                </div>
    
                <div className="expandable-content">
                  <div className="space-y-4 md:space-y-6">
                    {PROFESSOR_DATA.cv.map((item, idx) => (
                      <SectionCard key={idx} delay={idx * 0.06} className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                          <span className="text-xs md:text-sm font-bold text-indigo-600 md:w-32 pt-1">{item.year}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors">{item.role}</h3>
                            <p className="text-sm md:text-base text-indigo-900/70 font-medium">{item.institution}</p>
                            {item.description && (
                              <p className="text-xs md:text-sm text-gray-600 mt-2 italic">
                                {item.description}
                              </p>
                            )}
                            {item.link && (
                              <div className="mt-3">
                                <GlassLinkButton href={item.link}>
                                  <ExternalLink className="w-3 h-3 text-indigo-650" />
                                  Ver Detalle
                                </GlassLinkButton>
                              </div>
                            )}
                          </div>
                          <Award className="hidden md:block text-indigo-200 group-hover:text-indigo-400 transition-colors shrink-0" size={24} />
                        </div>
                      </SectionCard>
                    ))}
                  </div>
                </div>
              </div>
            </section>
  );
}
