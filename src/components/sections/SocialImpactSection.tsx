import { Users, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';

interface SectionProps {
  expandedSection: string | null;
  toggleSection: (section: string) => void;
}

export default function SocialImpactSection({ expandedSection, toggleSection }: SectionProps) {
  return (
                <section id="social" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'social' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Users className="text-indigo-600" /> Impacto Social y ApropiaciÃ³n del Conocimiento
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
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          ApropiaciÃ³n Social del Conocimiento
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                          InterÃ©s Social
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
                          VerificaciÃ³n <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
}

