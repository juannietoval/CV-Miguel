import { Library, MapPin, Globe, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';

interface SectionProps {
  expandedSection: string | null;
  toggleSection: (section: string) => void;
}

export default function AudiovisualSection({ expandedSection, toggleSection }: SectionProps) {
  return (
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
  );
}
