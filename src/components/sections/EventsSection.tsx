import { Calendar, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';



export default function EventsSection() {
  return (
    <section id="events" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
              <div className="glass rounded-3xl p-6 md:p-12">
                <div className="flex justify-between items-center mb-6 md:mb-8">
                  <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                    <Calendar className="text-indigo-600" /> Eventos Científicos
                  </h2>
                  
                </div>
    
                <div className="expandable-content">
                  <div className="space-y-3 md:space-y-4">
                    {PROFESSOR_DATA.events.map((event, idx) => (
                      <div key={idx} className="p-3 md:p-5 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                          <div className="flex flex-wrap gap-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                              {event.type}
                            </span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                              {event.scope}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-gray-500">{event.date}</span>
                        </div>
                        <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors mb-2">
                          {idx + 1}. {event.name}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                          <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Ubicación:</span> {event.location}</p>
                          <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Rol:</span> {event.role}</p>
                          {event.participants && event.participants.length > 0 && (
                            <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Participantes:</span> {event.participants.join(", ")}</p>
                          )}
                          {event.institutions && event.institutions.length > 0 && (
                            <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Instituciones:</span> {event.institutions.join(", ")}</p>
                          )}
                          {event.product && (
                            <p className="text-indigo-600 md:col-span-2 italic"><span className="font-bold text-indigo-900/70 not-italic">Producto:</span> {event.product}</p>
                          )}
                        </div>
                        {event.link && (
                          <div className="mt-3 flex justify-end">
                            <a
                              href={event.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-850 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 border border-indigo-200/30"
                            >
                              <ExternalLink className="w-3 h-3 text-indigo-650" />
                              Ver Soporte
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

