import { Award, Calendar, Gavel, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';



export default function ArtisticWorksSection() {
  return (
                <section id="artistic" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Award className="text-indigo-600" /> Obras o Productos
              </h2>
              
            </div>

            <div className="expandable-content">
              <div className="space-y-8">
                {PROFESSOR_DATA.artisticWorks.map((work, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Obra / Producto Artístico
                      </span>
                      <span className="text-xs font-bold text-gray-500">{work.date}</span>
                    </div>
                    <h3 className="font-semibold text-xl md:text-2xl group-hover:text-indigo-800 transition-colors mb-4">
                      {work.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6">
                      <span className="font-bold text-indigo-900/70">Disciplina:</span> {work.discipline}
                    </p>
                    
                    <div className="mt-6 border-t border-white/30 pt-6">
                      <h4 className="text-xs font-bold text-indigo-900/70 uppercase tracking-widest mb-4">Instancias de Valoración</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {work.validations.map((val, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/30 border border-white/40">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                              <Calendar size={16} />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-800">{val.event}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar size={12} /> {val.date}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Gavel size={12} /> {val.institution}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
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

