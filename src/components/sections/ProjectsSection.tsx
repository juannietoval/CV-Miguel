import { Briefcase, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';



export default function ProjectsSection() {
  return (
                <section id="projects" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Briefcase className="text-indigo-600" /> Proyectos
              </h2>
              
            </div>

            <div className="expandable-content">
              <div className="space-y-8">
                {PROFESSOR_DATA.projects.map((project, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {project.type}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        {project.start} — {project.end}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl md:text-2xl group-hover:text-indigo-800 transition-colors mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <div className="mt-4 p-3 md:p-5 rounded-xl bg-white/30 border border-white/40">
                      <h4 className="text-xs font-bold text-indigo-900/70 uppercase tracking-widest mb-3">Resumen del Proyecto</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                        {project.summary}
                      </p>
                    </div>
                    {project.link && (
                      <div className="mt-4 flex justify-end">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-850 rounded-xl text-xs md:text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95 border border-indigo-200/30"
                        >
                          <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-650" />
                          Ver Proyecto
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

