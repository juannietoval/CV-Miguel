import { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  GraduationCap,
  Gavel,
  Calendar,
  Globe,
  Search,
  Users,
  Book,
  Briefcase,
  Library,
  Menu,
  X,
  FileText,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFESSOR_DATA } from '../../data/professorData';

interface HeaderProps {
  setExpandedSection: (section: string | null) => void;
}

export default function Header({ setExpandedSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cerrar menÃº mÃ³vil al redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll cuando el menÃº mÃ³vil estÃ¡ abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // LÃ³gica de bÃºsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: any[] = [];

    // FunciÃ³n auxiliar para buscar en objetos
    const searchInData = (data: any[], sectionId: string, sectionName: string) => {
      data.forEach((item: any) => {
        const textToSearch = JSON.stringify(item).toLowerCase();
        if (textToSearch.includes(query)) {
          results.push({
            id: item.id || Math.random(),
            title: item.title || item.role || item.name || item.institution || "Sin tÃ­tulo",
            subtitle: item.institution || item.type || item.year || "",
            sectionId,
            sectionName,
            originalItem: item
          });
        }
      });
    };

    // Indexar datos
    searchInData(PROFESSOR_DATA.cv, 'cv', 'FormaciÃ³n');
    searchInData(PROFESSOR_DATA.experience, 'experience', 'Experiencia');
    searchInData(PROFESSOR_DATA.tutoring, 'tutoring', 'TutorÃ­as');
    searchInData(PROFESSOR_DATA.jury, 'jury', 'Jurados');
    searchInData(PROFESSOR_DATA.events, 'events', 'Eventos');
    searchInData(PROFESSOR_DATA.networks, 'networks', 'Redes');
    searchInData(PROFESSOR_DATA.socialImpact, 'social', 'Impacto Social');
    searchInData(PROFESSOR_DATA.digitalContent, 'audiovisual', 'Audiovisual');
    searchInData(PROFESSOR_DATA.articles, 'articles', 'ArtÃ­culos');
    searchInData(PROFESSOR_DATA.nonScientificArticles, 'divulgation', 'DivulgaciÃ³n');
    searchInData(PROFESSOR_DATA.divulgationBooks, 'divulgation-books', 'Libros Div.');
    searchInData(PROFESSOR_DATA.researchReports, 'reports', 'Informes');
    searchInData(PROFESSOR_DATA.artisticWorks, 'artistic', 'Obras');
    searchInData(PROFESSOR_DATA.projects, 'projects', 'Proyectos');
    searchInData(PROFESSOR_DATA.complementary, 'complementary', 'Cursos');
    searchInData(PROFESSOR_DATA.products, 'products', 'Publicaciones');

    setSearchResults(results.slice(0, 10)); // Limitar a 10 resultados para rendimiento
  }, [searchQuery]);

  // Atajo de teclado para bÃºsqueda (Ctrl+K y ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
        {/* NavegaciÃ³n */}
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'py-2 md:py-3' : 'py-4 md:py-6'}`}>
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className={`glass transition-all duration-300 ${isMobileMenuOpen ? 'rounded-3xl' : 'rounded-2xl md:rounded-full'} px-4 md:px-6 py-2 md:py-3 flex flex-col bg-gradient-to-r from-indigo-100/70 via-white/80 to-blue-100/70 border-white/40 shadow-lg shadow-indigo-200/20`}>
              
              {/* Barra Principal */}
              <div className="flex justify-between items-center w-full">
                {/* Logo o Nombre */}
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-6 bg-indigo-500 rounded-full hidden sm:block" />
                  <div className="font-bold text-indigo-950 text-sm md:text-base tracking-tight">
                    M.A. PUENTES CASTRO
                  </div>
                </div>
  
                {/* MenÃº Desktop (Oculto en mÃ³vil/tablet pequeÃ±a) */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-8 text-[11px] xl:text-xs font-bold uppercase tracking-wider">
                  {/* Grupo Perfil */}
                  <div className="relative group">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                      Perfil <ChevronDown size={12} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                      <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[140px] flex flex-col gap-1">
                        <a href="#bio" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">BiografÃ­a</a>
                        <a href="#cv" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">FormaciÃ³n</a>
                        <a href="#experience" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Experiencia</a>
                      </div>
                    </div>
                  </div>
  
                  {/* Grupo Academia */}
                  <div className="relative group">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                      Academia <ChevronDown size={12} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                      <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[140px] flex flex-col gap-1">
                        <a href="#tutoring" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">TutorÃ­as</a>
                        <a href="#jury" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Jurados</a>
                        <a href="#events" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Eventos</a>
                        <a href="#networks" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Redes</a>
                      </div>
                    </div>
                  </div>
  
                  {/* Grupo ProducciÃ³n */}
                  <div className="relative group">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                      ProducciÃ³n <ChevronDown size={12} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                      <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[160px] flex flex-col gap-1">
                        <a href="#articles" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">ArtÃ­culos</a>
                        <a href="#divulgation" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">DivulgaciÃ³n</a>
                        <a href="#divulgation-books" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Libros Div.</a>
                        <a href="#reports" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Informes</a>
                        <a href="#artistic" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Obras</a>
                        <a href="#products" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Publicaciones</a>
                      </div>
                    </div>
                  </div>
  
                  {/* Grupo InvestigaciÃ³n */}
                  <div className="relative group">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                      InvestigaciÃ³n <ChevronDown size={12} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                      <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[140px] flex flex-col gap-1">
                        <a href="#projects" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Proyectos</a>
                        <a href="#social" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Impacto Social</a>
                      </div>
                    </div>
                  </div>
  
                  <a href="#audiovisual" className="hover:text-indigo-600 transition-colors py-1">Audiovisual</a>
                  <a href="#complementary" className="hover:text-indigo-600 transition-colors py-1">Cursos</a>
                </div>
  
                {/* Acciones (BÃºsqueda y MenÃº MÃ³vil) */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/50 hover:bg-white text-indigo-600 rounded-full transition-all border border-indigo-100 hover:border-indigo-200 shadow-sm hover:shadow-md group"
                  >
                    <Search size={18} className="group-hover:scale-110 transition-transform text-indigo-500" />
                    <span className="text-xs font-black hidden md:inline tracking-wider">BUSCAR</span>
                    <span className="text-[10px] text-indigo-300 hidden xl:inline border border-indigo-100 px-1.5 rounded ml-1 font-mono">âŒ˜K</span>
                  </button>
  
                  <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="lg:hidden p-2 text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors"
                  >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                  </button>
                </div>
              </div>
  
              {/* MenÃº MÃ³vil (Expandible) */}
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden lg:hidden"
                  >
                    <div className="pt-4 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-indigo-100 mt-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Perfil</h3>
                        <div className="grid grid-cols-1 gap-1">
                          <a href="#bio" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Users size={18} className="text-indigo-400" /> BiografÃ­a
                          </a>
                          <a href="#cv" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <GraduationCap size={18} className="text-indigo-400" /> FormaciÃ³n
                          </a>
                          <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Briefcase size={18} className="text-indigo-400" /> Experiencia
                          </a>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Academia</h3>
                        <div className="grid grid-cols-1 gap-1">
                          <a href="#tutoring" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Users size={18} className="text-indigo-400" /> TutorÃ­as
                          </a>
                          <a href="#jury" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Gavel size={18} className="text-indigo-400" /> Jurados
                          </a>
                          <a href="#events" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Calendar size={18} className="text-indigo-400" /> Eventos
                          </a>
                          <a href="#networks" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Globe size={18} className="text-indigo-400" /> Redes
                          </a>
                        </div>
                      </div>
  
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">ProducciÃ³n</h3>
                        <div className="grid grid-cols-1 gap-1">
                          <a href="#articles" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <FileText size={18} className="text-indigo-400" /> ArtÃ­culos
                          </a>
                          <a href="#divulgation" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <BookOpen size={18} className="text-indigo-400" /> DivulgaciÃ³n
                          </a>
                          <a href="#reports" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Library size={18} className="text-indigo-400" /> Informes
                          </a>
                          <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Book size={18} className="text-indigo-400" /> Publicaciones
                          </a>
                        </div>
                      </div>
  
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">InvestigaciÃ³n</h3>
                        <div className="grid grid-cols-1 gap-1">
                          <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Briefcase size={18} className="text-indigo-400" /> Proyectos
                          </a>
                          <a href="#social" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Users size={18} className="text-indigo-400" /> Impacto Social
                          </a>
                          <a href="#audiovisual" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Globe size={18} className="text-indigo-400" /> Audiovisual
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
  
        {/* Modal de BÃºsqueda */}
        <AnimatePresence>
          {isSearchOpen && (
            <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSearchOpen(false)}
                className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="relative w-full max-w-2xl glass bg-white/95 rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <Search className="text-indigo-500" size={24} />
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Busca proyectos, artÃ­culos, eventos..."
                      className="w-full bg-transparent text-xl outline-none text-gray-800 placeholder:text-gray-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                    >
                      <ChevronUp size={20} className="rotate-90" />
                    </button>
                  </div>
                </div>
  
                <div className="max-h-[60vh] overflow-y-auto p-4">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.map((result, idx) => (
                        <a 
                          key={idx}
                          href={`#${result.sectionId}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setExpandedSection(result.sectionId);
                          }}
                          className="flex flex-col p-4 hover:bg-indigo-50 rounded-2xl transition-all border border-transparent hover:border-indigo-100 group"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{result.sectionName}</span>
                            <ExternalLink size={14} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                          </div>
                          <h4 className="font-bold text-gray-800 group-hover:text-indigo-900 transition-colors line-clamp-1">{result.title}</h4>
                          <p className="text-sm text-gray-500 line-clamp-2">{result.subtitle}</p>
                        </a>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="py-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                        <Search size={32} className="text-gray-300" />
                      </div>
                      <p className="text-gray-500 font-medium">No se encontraron resultados para "{searchQuery}"</p>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-gray-400 text-sm">Escribe algo para comenzar a buscar en el portafolio...</p>
                    </div>
                  )}
                </div>
  
                <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex gap-4">
                    <span><kbd className="bg-white border border-gray-200 px-1 rounded shadow-sm">ESC</kbd> Cerrar</span>
                    <span><kbd className="bg-white border border-gray-200 px-1 rounded shadow-sm">â†µ</kbd> Seleccionar</span>
                  </div>
                  <span>{searchResults.length} resultados encontrados</span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    </>
  );
}

