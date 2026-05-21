import { FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';



export default function ReportsSection() {
  return (
                <section id="reports" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <FileText className="text-indigo-600" /> Informes de Investigación
              </h2>
              
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.researchReports.map((report, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Producción Técnica - Informe
                      </span>
                      <span className="text-xs font-bold text-gray-500">{report.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      {report.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Autores:</span> {report.authors}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">País:</span> {report.location}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {report.areas}</p>
                      </div>
                    </div>
                    {report.link && (
                      <div className="mt-4 flex justify-end">
                        <a
                          href={report.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-850 rounded-xl text-xs md:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 border border-indigo-200/30"
                        >
                          <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-650" />
                          Ver Informe
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

