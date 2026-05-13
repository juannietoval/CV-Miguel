import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';

interface SectionProps {
  expandedSection: string | null;
  toggleSection: (section: string) => void;
}

export default function ProjectsSection({ expandedSection, toggleSection }: SectionProps) {
  return (
                <section id="projects" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'projects' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Briefcase className="text-indigo-600" /> Proyectos
              </h2>
              <button 
                onClick={() => toggleSection('projects')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'projects' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-8">
                {PROFESSOR_DATA.projects.map((project, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
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
                    <div className="mt-4 p-4 md:p-6 rounded-xl bg-white/30 border border-white/40">
                      <h4 className="text-xs font-bold text-indigo-900/70 uppercase tracking-widest mb-3">Resumen del Proyecto</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
}
