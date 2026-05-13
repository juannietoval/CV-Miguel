import { Gavel, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';

interface SectionProps {
  expandedSection: string | null;
  toggleSection: (section: string) => void;
}

export default function JurySection({ expandedSection, toggleSection }: SectionProps) {
  return (
    <section id="jury" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'jury' ? 'expanded' : ''}`}>
              <div className="glass rounded-3xl p-6 md:p-12">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <Gavel className="text-indigo-600" /> Jurado en Comités de Evaluación
                  </h2>
                  <button 
                    onClick={() => toggleSection('jury')}
                    className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
                  >
                    {expandedSection === 'jury' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
                  </button>
                </div>
    
                <div className="expandable-content">
                  <div className="space-y-4 md:space-y-6">
                    {PROFESSOR_DATA.jury.map((item, idx) => (
                      <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                          <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            {item.type}
                          </span>
                        </div>
                        <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors mb-2">
                          {item.title}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                          <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Institución:</span> {item.institution}</p>
                          <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Programa:</span> {item.program}</p>
                          {item.student && (
                            <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Persona(s) orientada(s):</span> {item.student}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
  );
}
