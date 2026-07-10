import { FileText, ChevronDown, ChevronUp, ExternalLink, MapPin, Clock, User, Tag, Briefcase } from 'lucide-react';
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
                      <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full group">
                        
                        {/* Header: Year, Title, Institution */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-sm shrink-0 border border-indigo-100/50 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                              {item.year}
                            </div>
                            <div className="pt-0.5">
                              <h4 className="text-base font-bold text-slate-800 leading-tight mb-1">{item.title}</h4>
                              <p className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider">{item.institution}</p>
                            </div>
                          </div>
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all active:scale-95 border border-indigo-100 shrink-0"
                              title="Ver Curso"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        {/* Description (Purpose) */}
                        {item.purpose && (
                          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                            {item.purpose}
                          </p>
                        )}

                        <div className="mt-auto space-y-4">
                          {/* Metadata Row: Participation, Duration, Location */}
                          {(item.participation || item.duration || item.location) && (
                            <div className="flex flex-wrap gap-x-4 gap-y-2">
                              {item.participation && (
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                  <User className="w-3.5 h-3.5 text-indigo-400" />
                                  {item.participation}
                                </div>
                              )}
                              {item.duration && (
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                                  {item.duration}
                                </div>
                              )}
                              {item.location && (
                                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                                  {item.location}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Hidden Metadata for SEO/Searchability */}
                          <div className="hidden">
                            {/* Keywords as Pills */}
                            {item.keywords && (
                              <div className="flex flex-wrap gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1 mt-0.5" />
                                {item.keywords.split(',').map((kw: string, i: number) => {
                                  const keyword = kw.trim();
                                  if (!keyword) return null;
                                  return (
                                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold">
                                      {keyword}
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                            
                            {/* Areas & Sectors */}
                            {(item.areas || item.sectors) && (
                              <div className="pt-3 border-t border-slate-100 flex flex-col gap-1.5">
                                {item.areas && (
                                  <p className="text-[10px] text-slate-500 leading-snug">
                                    <span className="font-bold text-slate-700">Áreas:</span> {item.areas}
                                  </p>
                                )}
                                {item.sectors && (
                                  <p className="text-[10px] text-slate-500 leading-snug">
                                    <span className="font-bold text-slate-700">Sectores:</span> {item.sectors}
                                  </p>
                                )}
                              </div>
                            )}
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

