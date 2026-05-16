import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';



export default function ComplementarySection() {
  return (
    <section id="complementary" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
              <div className="glass rounded-3xl p-6 md:p-12">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <FileText className="text-indigo-600" /> Formación Complementaria
                  </h2>
                  
                </div>
    
                <div className="expandable-content">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PROFESSOR_DATA.complementary.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/20 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                          {item.year.slice(-2)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold">{item.title}</h4>
                          <p className="text-xs text-gray-500">{item.institution}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
  );
}

