import { FileText, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';
import { SectionCard, GlassLinkButton, GlassBadge } from '../ui/SectionCard';



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
                  <SectionCard key={idx} delay={idx * 0.06} className="p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <GlassBadge>
                        Producción Técnica - Informe
                      </GlassBadge>
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
                        <GlassLinkButton href={report.link}>
                          <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-650" />
                          Ver Informe
                        </GlassLinkButton>
                      </div>
                    )}
                  </SectionCard>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
}

