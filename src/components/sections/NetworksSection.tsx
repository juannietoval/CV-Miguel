import { Globe, MapPin, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';



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
                      <div key={idx} className="p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group flex flex-col justify-between">
                        <div>
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
                        {network.link && (
                          <div className="mt-4 flex justify-end">
                            <a
                              href={network.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-850 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 border border-indigo-200/30"
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-indigo-650" />
                              Ver Red
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
  );
}

