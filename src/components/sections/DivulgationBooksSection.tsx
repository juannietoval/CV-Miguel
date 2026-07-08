import { Book, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';
import { SectionCard, GlassLinkButton, GlassBadge } from '../ui/SectionCard';



export default function DivulgationBooksSection() {
  return (
                <section id="divulgation-books" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 expanded`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Book className="text-indigo-600" /> Libros
              </h2>
              
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.divulgationBooks.map((book, idx) => (
                  <SectionCard key={idx} delay={idx * 0.06} className="p-4 md:p-6 flex flex-col md:flex-row gap-6">
                    {book.image && (
                      <div className="w-full md:w-1/4 flex-shrink-0">
                        <img src={book.image} alt={book.title} className="w-full h-auto rounded-xl object-cover shadow-sm group-hover:scale-[1.02] transition-transform" referrerPolicy="no-referrer" />
                      </div>
                    )}
                    <div className="flex-1 flex flex-col">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                        <GlassBadge>
                          {book.type || 'Libro de Divulgación / Compilación'}
                        </GlassBadge>
                        <span className="text-xs font-bold text-gray-500">{book.year}</span>
                      </div>
                      <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                        "{book.title}"
                      </h3>
                      {book.description && (
                        <p className="text-sm text-gray-600 mb-4 line-clamp-3 md:line-clamp-none">{book.description}</p>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base mt-auto">
                        <div className="space-y-2">
                          {book.isbn && book.isbn !== 'N/A' && <p className="text-gray-600"><span className="font-bold text-indigo-900/70">ISBN:</span> {book.isbn}</p>}
                          {book.medium && book.medium !== 'N/A' && <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Medio:</span> {book.medium}</p>}
                          {book.publisher && book.publisher !== 'N/A' && <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Editorial:</span> {book.publisher}</p>}
                        </div>
                        <div className="space-y-2">
                          {book.location && book.location !== 'N/A' && <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Lugar:</span> {book.location}</p>}
                          {book.areas && book.areas !== 'N/A' && <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {book.areas}</p>}
                        </div>
                      </div>
                      {(book.link || book.qr) && (
                        <div className="mt-4 pt-4 border-t border-white/40 flex flex-wrap gap-4 items-center justify-between">
                          {book.link && (
                            <GlassLinkButton href={book.link}>
                              Ver publicación <ExternalLink size={14} />
                            </GlassLinkButton>
                          )}
                          {book.qr && (
                            <div className="flex-shrink-0">
                               <img src={book.qr} alt="QR Code" className="w-20 h-20 rounded-lg object-contain shadow-sm border border-white/50" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </SectionCard>
                ))}
              </div>
            </div>
          </div>
        </section>
  );
}

