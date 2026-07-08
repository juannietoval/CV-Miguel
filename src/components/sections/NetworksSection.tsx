import { Globe, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';
import { SectionCard, GlassLinkButton, GlassBadge } from '../ui/SectionCard';



export default function NetworksSection() {
  return (
    <section id="networks" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
              <div className="glass rounded-3xl p-6 md:p-12">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <Globe className="text-indigo-600" /> Redes de Conocimiento Especializado
                  </h2>
                  
                </div>
    
                <div className="expandable-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROFESSOR_DATA.networks.map((network, idx) => (
                      <SectionCard key={idx} delay={idx * 0.06} className="p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <GlassBadge color={network.type === 'Real' ? 'indigo' : 'pink'}>
                              Red {network.type}
                            </GlassBadge>
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
                        {network.link && (
                          <div className="mt-4 flex justify-end">
                            <GlassLinkButton href={network.link}>
                              <ExternalLink className="w-3.5 h-3.5 text-indigo-650" />
                              Ver Red
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

