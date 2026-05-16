import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';



export default function DivulgationSection() {
  return (
                <section id="divulgation" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <BookOpen className="text-indigo-600" /> Publicaciones de Divulgación
              </h2>
              
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.nonScientificArticles.map((article, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Artículo de Divulgación
                      </span>
                      <span className="text-xs font-bold text-gray-500">{article.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      "{article.title}"
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Autores:</span> {article.authors}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Revista:</span> {article.journal}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">ISSN:</span> {article.issn}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Volumen:</span> {article.volume}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Páginas:</span> {article.pages}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">País:</span> {article.location}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {article.areas}</p>
                      </div>
                      {article.keywords && (
                        <div className="md:col-span-2 mt-2">
                          <p className="text-xs font-bold text-indigo-900/70 mb-2">Palabras clave:</p>
                          <div className="flex flex-wrap gap-2">
                            {article.keywords.map((word, i) => (
                              <span key={i} className="text-[10px] bg-white/40 px-2 py-1 rounded-full border border-white/50 text-gray-700">
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>
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

