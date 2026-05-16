import { GraduationCap, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';



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
                      <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                        <span className="text-xs md:text-sm font-bold text-indigo-600 md:w-32 pt-1">{item.year}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors">{item.role}</h3>
                          <p className="text-sm md:text-base text-indigo-900/70 font-medium">{item.institution}</p>
                          {item.description && (
                            <p className="text-xs md:text-sm text-gray-600 mt-2 italic">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <Award className="hidden md:block text-indigo-200 group-hover:text-indigo-400 transition-colors" size={24} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
  );
}
