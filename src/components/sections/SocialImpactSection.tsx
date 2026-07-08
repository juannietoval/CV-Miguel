import { Users, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';
import { SectionCard, GlassLinkButton, GlassBadge } from '../ui/SectionCard';



export default function SocialImpactSection() {
  return (
                <section id="social" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Users className="text-indigo-600" /> Impacto Social y Apropiación del Conocimiento
              </h2>
              
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.socialImpact.map((item, idx) => (
                  <SectionCard key={idx} delay={idx * 0.06} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div className="flex flex-wrap gap-2">
                        <GlassBadge>
                          Apropiación Social del Conocimiento
                        </GlassBadge>
                        <GlassBadge color="pink">
                          Interés Social
                        </GlassBadge>
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
                        {item.verification && (
                          <a 
                            href={item.verification} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors mt-1"
                          >
                            Verificación <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                    {item.link && (
                      <div className="mt-4 flex justify-end">
                        <GlassLinkButton href={item.link}>
                          <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-650" />
                          Ver Recurso
                        </GlassLinkButton>
                      </div>
                    )}
                  </SectionCard>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
}

