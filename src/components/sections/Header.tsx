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
import { Link, useNavigate } from 'react-router-dom';
import { PROFESSOR_DATA } from '../../data/professorData';



export default function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cerrar menú móvil al redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Lógica de búsqueda mejorada (con tokenización y puntuación)
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const normalizeText = (text) => {
      if (typeof text !== 'string') return '';
      return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const queryTokens = normalizeText(searchQuery).split(' ').filter(Boolean);
    const results = [];

    const searchInData = (data, sectionId, sectionName) => {
      if (!data) return;
      data.forEach((item) => {
        let score = 0;
        const titleStr = String(item.title || item.role || item.name || item.institution || "");
        const titleNorm = normalizeText(titleStr);
        
        // Obtenemos solo los valores ignorando propiedades de sistema como id o links de imágenes
        const valuesToSearch = Object.entries(item)
          .filter(([key, val]) => key !== 'id' && key !== 'image' && key !== 'link' && typeof val === 'string')
          .map(([key, val]) => val);
        
        const contentNorm = normalizeText(valuesToSearch.join(' '));

        let allTokensMatched = true;
        queryTokens.forEach(token => {
          let tokenMatched = false;
          if (titleNorm.includes(token)) {
            score += 10; 
            tokenMatched = true;
          } else if (contentNorm.includes(token)) {
            score += 2;
            tokenMatched = true;
          }
          if (!tokenMatched) allTokensMatched = false;
        });

        if (score > 0 && allTokensMatched) {
          results.push({
            score,
            id: item.id || Math.random(),
            title: titleStr || "Sin título",
            subtitle: item.institution || item.type || item.year || item.date || item.publisher || item.journal || "",
            sectionId,
            sectionName,
            originalItem: item
          });
        }
      });
    };

    // Indexar datos
    searchInData(PROFESSOR_DATA.cv, 'cv', 'Formación');
    searchInData(PROFESSOR_DATA.experience, 'experience', 'Experiencia');
    searchInData(PROFESSOR_DATA.tutoring, 'tutoring', 'Tutorías');
    searchInData(PROFESSOR_DATA.jury, 'jury', 'Jurados');
    searchInData(PROFESSOR_DATA.events, 'events', 'Eventos');
    searchInData(PROFESSOR_DATA.networks, 'networks', 'Redes');
    searchInData(PROFESSOR_DATA.socialImpact, 'social', 'Impacto Social');
    searchInData(PROFESSOR_DATA.digitalContent, 'audiovisual', 'Audiovisual');
    searchInData(PROFESSOR_DATA.articles, 'articles', 'Artículos');
    searchInData(PROFESSOR_DATA.nonScientificArticles, 'divulgation', 'Divulgación');
    searchInData(PROFESSOR_DATA.divulgationBooks, 'divulgation-books', 'Libros Div.');
    searchInData(PROFESSOR_DATA.researchReports, 'reports', 'Informes');
    searchInData(PROFESSOR_DATA.artisticWorks, 'artistic', 'Obras');
    searchInData(PROFESSOR_DATA.projects, 'projects', 'Proyectos');
    searchInData(PROFESSOR_DATA.complementary, 'complementary', 'Cursos');

    // Ordenar por relevancia y limitar a 10
    results.sort((a, b) => b.score - a.score);
    setSearchResults(results.slice(0, 10));
  }, [searchQuery]);

  // Atajo de teclado para búsqueda (Ctrl+K y ESC)
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
        {/* Navegación */}
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
  
                {/* Menú Desktop (Oculto en móvil/tablet pequeña) */}
                <div className="hidden lg:flex items-center gap-4 xl:gap-8 text-[11px] xl:text-xs font-bold uppercase tracking-wider">
                  {/* Grupo Perfil */}
                  <div className="relative group">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                      Perfil <ChevronDown size={12} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                      <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[140px] flex flex-col gap-1">
                        <Link to="/bio" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Biografía</Link>
                        <Link to="/cv" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Formación</Link>
                        <Link to="/experience" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Experiencia</Link>
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
                        <Link to="/tutoring" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Tutorías</Link>
                        <Link to="/jury" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Jurados</Link>
                        <Link to="/events" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Eventos</Link>
                        <Link to="/networks" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Redes</Link>
                      </div>
                    </div>
                  </div>
  
                  {/* Grupo Producción */}
                  <div className="relative group">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                      Producción <ChevronDown size={12} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                      <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[160px] flex flex-col gap-1">
                        <Link to="/articles" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Artículos</Link>
                        <Link to="/divulgation" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Divulgación</Link>
                        <Link to="/divulgation-books" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Libros Div.</Link>
                        <Link to="/reports" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Informes</Link>
                        <Link to="/artistic" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Obras</Link>
                      </div>
                    </div>
                  </div>
  
                  {/* Grupo Investigación */}
                  <div className="relative group">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                      Investigación <ChevronDown size={12} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                      <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[140px] flex flex-col gap-1">
                        <Link to="/projects" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Proyectos</Link>
                        <Link to="/social" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Impacto Social</Link>
                      </div>
                    </div>
                  </div>
  
                  <Link to="/audiovisual" className="hover:text-indigo-600 transition-colors py-1">Audiovisual</Link>
                  <Link to="/complementary" className="hover:text-indigo-600 transition-colors py-1">Cursos</Link>
                </div>
  
                {/* Acciones (Búsqueda y Menú Móvil) */}
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
  
              {/* Menú Móvil (Expandible) */}
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
                          <Link to="/bio" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Users size={18} className="text-indigo-400" /> Biografía
                          </Link>
                          <Link to="/cv" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <GraduationCap size={18} className="text-indigo-400" /> Formación
                          </Link>
                          <Link to="/experience" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Briefcase size={18} className="text-indigo-400" /> Experiencia
                          </Link>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Academia</h3>
                        <div className="grid grid-cols-1 gap-1">
                          <Link to="/tutoring" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Users size={18} className="text-indigo-400" /> Tutorías
                          </Link>
                          <Link to="/jury" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Gavel size={18} className="text-indigo-400" /> Jurados
                          </Link>
                          <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Calendar size={18} className="text-indigo-400" /> Eventos
                          </Link>
                          <Link to="/networks" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Globe size={18} className="text-indigo-400" /> Redes
                          </Link>
                        </div>
                      </div>
  
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Producción</h3>
                        <div className="grid grid-cols-1 gap-1">
                          <Link to="/articles" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <FileText size={18} className="text-indigo-400" /> Artículos
                          </Link>
                          <Link to="/divulgation" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <BookOpen size={18} className="text-indigo-400" /> Divulgación
                          </Link>
                          <Link to="/reports" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Library size={18} className="text-indigo-400" /> Informes
                          </Link>
                        </div>
                      </div>
  
                      <div className="space-y-1">
                        <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Investigación</h3>
                        <div className="grid grid-cols-1 gap-1">
                          <Link to="/projects" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Briefcase size={18} className="text-indigo-400" /> Proyectos
                          </Link>
                          <Link to="/social" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Users size={18} className="text-indigo-400" /> Impacto Social
                          </Link>
                          <Link to="/audiovisual" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                            <Globe size={18} className="text-indigo-400" /> Audiovisual
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </nav>
  
        {/* Modal de Búsqueda */}
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
                      placeholder="Busca proyectos, artículos, eventos..."
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
                        <Link 
                          key={idx}
                          to={`/${result.sectionId}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            navigate(`/${result.sectionId}`);
                          }}
                          className="flex flex-col p-4 hover:bg-indigo-50 rounded-2xl transition-all border border-transparent hover:border-indigo-100 group"
                        >
                          <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{result.sectionName}</span>
                            <ExternalLink size={14} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                          </div>
                          <h4 className="font-bold text-gray-800 group-hover:text-indigo-900 transition-colors line-clamp-1">{result.title}</h4>
                          <p className="text-sm text-gray-500 line-clamp-2">{result.subtitle}</p>
                        </Link>
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

