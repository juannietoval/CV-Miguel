import { Library, MapPin, Globe, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';
import { SectionCard, GlassLinkButton, GlassBadge } from '../ui/SectionCard';



export default function AudiovisualSection() {
  return (
                <section id="audiovisual" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Library className="text-indigo-600" /> Producciones Audiovisuales
              </h2>
              
            </div>

            <div className="expandable-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROFESSOR_DATA.digitalContent.map((item, idx) => (
                  <SectionCard key={idx} delay={idx * 0.06} className="p-6 flex flex-col">
                    {item.image && (
                      <div className="w-full h-40 mb-4 overflow-hidden rounded-xl">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <div className="flex justify-between items-start mb-4">
                      <GlassBadge>
                        {item.type || 'Cápsula de Video'}
                      </GlassBadge>
                      <span className="text-xs font-bold text-gray-500">{item.date !== 'N/A' ? item.date : ''}</span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-indigo-800 transition-colors mb-4 flex-grow">
                      {item.title}
                    </h3>
                    <div className="space-y-3 mt-auto">
                      {item.location && item.location !== 'N/A' && (
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <MapPin size={14} className="text-indigo-400" />
                          <span>{item.location}</span>
                        </div>
                      )}
                      {item.circulation && item.circulation !== 'N/A' && (
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Globe size={14} className="text-blue-400" />
                          <span>Circulación {item.circulation}</span>
                        </div>
                      )}
                      {item.project && (
                        <p className="text-[10px] text-gray-500 italic line-clamp-3">
                          <span className="font-bold not-italic">Proyecto / Descripción:</span> {item.project}
                        </p>
                      )}
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full py-2 rounded-xl bg-indigo-600 text-white text-center text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_2px_10px_rgba(79,70,229,0.3)] hover:shadow-[0_4px_15px_rgba(79,70,229,0.4)]"
                        >
                          Ver Producción <ExternalLink size={14} />
                        </a>
                      )}
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
}

