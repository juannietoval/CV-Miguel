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
  BookOpen,
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { PROFESSOR_DATA } from '../../data/professorData';
import { GlassEffect, GlassFilter } from '../ui/LiquidGlass';

export default function Header() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('perfil');

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Lógica de búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const normalizeText = (text: any): string => {
      if (typeof text !== 'string') return '';
      return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Deep text extraction for nested objects/arrays
    const extractAllText = (obj: any): string => {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      if (typeof obj === 'number') return String(obj);
      if (Array.isArray(obj)) {
        return obj.map(extractAllText).join(' ');
      }
      if (typeof obj === 'object') {
        const textParts = Object.entries(obj)
          .filter(([key]) => !['id', 'image', 'link', 'qr'].includes(key))
          .map(([_, val]) => extractAllText(val));
        return textParts.join(' ');
      }
      return '';
    };

    const queryTokens = normalizeText(searchQuery).split(' ').filter(Boolean);
    const results: any[] = [];

    const searchInData = (data: any[], sectionId: string, sectionName: string) => {
      if (!data) return;
      data.forEach((item) => {
        let score = 0;
        const titleStr = String(item.title || item.role || item.name || item.institution || item.type || "Sin título");
        const titleNorm = normalizeText(titleStr);
        const contentNorm = normalizeText(extractAllText(item));

        let tokensMatched = 0;
        queryTokens.forEach(token => {
          if (titleNorm.includes(token)) {
            score += 10;
            tokensMatched++;
          } else if (contentNorm.includes(token)) {
            score += 3;
            tokensMatched++;
          }
        });

        const matchRatio = tokensMatched / queryTokens.length;

        // Relaxed search condition: at least half of the words must match or score is high
        if (score > 0 && matchRatio >= 0.5) {
          
          let details = item.summary || item.purpose || item.description || "";
          if (!details && item.keywords) details = `Palabras clave: ${item.keywords}`;
          if (!details && item.activities) {
            // For experience activities
            details = extractAllText(item.activities).substring(0, 100) + "...";
          }

          results.push({
            score: score * matchRatio, // Boost items that matched more query tokens
            id: item.id || Math.random(),
            title: titleStr,
            subtitle: item.institution || item.type || item.year || item.date || item.publisher || item.journal || item.location || "",
            details: details,
            sectionId, 
            sectionName, 
            originalItem: item
          });
        }
      });
    };

    searchInData(PROFESSOR_DATA.cv, 'cv', 'Formación Académica');
    searchInData(PROFESSOR_DATA.experience, 'experience', 'Experiencia Profesional');
    searchInData(PROFESSOR_DATA.tutoring, 'tutoring', 'Tutorías de Tesis');
    searchInData(PROFESSOR_DATA.jury, 'jury', 'Jurados de Tesis');
    searchInData(PROFESSOR_DATA.events, 'events', 'Eventos y Congresos');
    searchInData(PROFESSOR_DATA.networks, 'networks', 'Redes de Investigación');
    searchInData(PROFESSOR_DATA.socialImpact, 'social', 'Impacto Social');
    searchInData(PROFESSOR_DATA.digitalContent, 'audiovisual', 'Producción Audiovisual');
    searchInData(PROFESSOR_DATA.articles, 'articles', 'Artículos Científicos');
    searchInData(PROFESSOR_DATA.nonScientificArticles, 'divulgation', 'Artículos de Divulgación');
    searchInData(PROFESSOR_DATA.divulgationBooks, 'divulgation-books', 'Libros');
    searchInData(PROFESSOR_DATA.researchReports, 'reports', 'Informes de Investigación');
    searchInData(PROFESSOR_DATA.artisticWorks, 'artistic', 'Obras Artísticas');
    searchInData(PROFESSOR_DATA.projects, 'projects', 'Proyectos de Investigación');
    searchInData(PROFESSOR_DATA.complementary, 'complementary', 'Cursos y Form. Complementaria');

    results.sort((a, b) => b.score - a.score);
    setSearchResults(results.slice(0, 20)); // Limit to 20 to allow rich groupings
  }, [searchQuery]);

  // Atajo de teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navGroups = [
    {
      label: 'Perfil', items: [
        { to: '/cv', label: 'Formación' },
        { to: '/experience', label: 'Experiencia' },
      ]
    },
    {
      label: 'Academia', items: [
        { to: '/tutoring', label: 'Tutorías' },
        { to: '/jury', label: 'Jurados' },
        { to: '/events', label: 'Eventos' },
        { to: '/networks', label: 'Redes' },
      ]
    },
    {
      label: 'Producción', items: [
        { to: '/articles', label: 'Artículos' },
        { to: '/divulgation', label: 'Divulgación' },
        { to: '/divulgation-books', label: 'Libros' },
        { to: '/reports', label: 'Informes' },
        { to: '/artistic', label: 'Obras' },
      ]
    },
    {
      label: 'Investigación', items: [
        { to: '/projects', label: 'Proyectos' },
        { to: '/social', label: 'Impacto Social' },
      ]
    },
  ];

  const mobileGroups = [
    {
      id: 'perfil', title: 'Perfil', items: [
        { to: '/cv', icon: GraduationCap, label: 'Formación' },
        { to: '/experience', icon: Briefcase, label: 'Experiencia' },
        { to: '/complementary', icon: BookOpen, label: 'Cursos' }
      ]
    },
    {
      id: 'academia', title: 'Academia', items: [
        { to: '/tutoring', icon: Users, label: 'Tutorías' },
        { to: '/jury', icon: Gavel, label: 'Jurados' },
        { to: '/events', icon: Calendar, label: 'Eventos' },
        { to: '/networks', icon: Globe, label: 'Redes' }
      ]
    },
    {
      id: 'produccion', title: 'Producción', items: [
        { to: '/articles', icon: FileText, label: 'Artículos' },
        { to: '/divulgation', icon: BookOpen, label: 'Divulgación' },
        { to: '/divulgation-books', icon: Book, label: 'Libros' },
        { to: '/reports', icon: Library, label: 'Informes' },
        { to: '/artistic', icon: Briefcase, label: 'Obras' }
      ]
    },
    {
      id: 'investigacion', title: 'Investigación', items: [
        { to: '/projects', icon: Briefcase, label: 'Proyectos' },
        { to: '/social', icon: Users, label: 'Impacto Social' },
        { to: '/audiovisual', icon: Globe, label: 'Audiovisual' }
      ]
    }
  ];

  return (
    <>
      {/* Filtro SVG global para el efecto Liquid Glass */}
      <GlassFilter />

      {/* Navegación */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'py-2 md:py-3' : 'py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <GlassEffect
            overflow={isMobileMenuOpen ? 'hidden' : 'visible'}
            className={`transition-all duration-300 ${isMobileMenuOpen ? 'rounded-3xl' : 'rounded-2xl md:rounded-full'} px-4 md:px-6 py-2 md:py-3`}
          >
            {/* Barra Principal */}
            <div className="flex justify-between items-center w-full">

              {/* Botón Home */}
              <Link
                to="/bio"
                title="Inicio"
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-indigo-700 hover:text-indigo-900 hover:bg-white/30 transition-all hover:scale-105"
              >
                <Home size={20} />
              </Link>

              {/* Menú Desktop */}
              <div className="hidden lg:flex items-center gap-4 xl:gap-8 text-[11px] xl:text-xs font-bold uppercase tracking-wider text-indigo-900/80">
                {navGroups.map((group) => (
                  <div key={group.label} className="relative group">
                    <button className="flex items-center gap-1 hover:text-indigo-700 transition-colors py-1">
                      {group.label} <ChevronDown size={12} />
                    </button>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 hidden group-hover:block z-[200]">
                      <GlassEffect overflow="hidden" className="rounded-2xl min-w-[150px] shadow-xl">
                        <div className="flex flex-col py-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.to}
                              to={item.to}
                              className="px-4 py-2.5 hover:bg-white/30 transition-colors text-indigo-900 normal-case font-medium text-sm whitespace-nowrap"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </GlassEffect>
                    </div>
                  </div>
                ))}

                <Link to="/audiovisual" className="hover:text-indigo-700 transition-colors py-1 normal-case">Audiovisual</Link>
                <Link to="/complementary" className="hover:text-indigo-700 transition-colors py-1 normal-case">Cursos</Link>
              </div>

              {/* Acciones (Búsqueda y Menú Móvil) */}
              <div className="flex items-center gap-2 ml-auto lg:ml-0">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-indigo-700 hover:bg-white/30 transition-all group"
                >
                  <Search size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-black hidden md:inline tracking-wider">BUSCAR</span>
                  <span className="text-[10px] text-indigo-400 hidden xl:inline border border-indigo-200/50 px-1.5 rounded ml-1 font-mono">⌘K</span>
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-indigo-900 hover:bg-white/30 rounded-full transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Menú Móvil (Acordeón) */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="pt-4 pb-6 flex flex-col gap-2 border-t border-white/20 mt-3 max-h-[70vh] overflow-y-auto custom-scrollbar px-1">
                    {mobileGroups.map((section) => (
                      <div key={section.id} className="rounded-2xl overflow-hidden bg-white/10 border border-white/20">
                        <button
                          onClick={() => setActiveAccordion(activeAccordion === section.id ? null : section.id)}
                          className="w-full flex items-center justify-between px-5 py-4 text-sm font-bold text-indigo-900 hover:bg-white/20 transition-colors"
                        >
                          <span className="uppercase tracking-wider text-[11px]">{section.title}</span>
                          <ChevronDown
                            size={16}
                            className={`text-indigo-500 transition-transform duration-300 ${activeAccordion === section.id ? 'rotate-180' : ''}`}
                          />
                        </button>

                        <AnimatePresence>
                          {activeAccordion === section.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-2 grid grid-cols-1 gap-1 bg-white/10">
                                {section.items.map((item, idx) => (
                                  <Link
                                    key={idx}
                                    to={item.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-indigo-900 hover:bg-white/30 rounded-xl transition-all active:scale-95"
                                  >
                                    <item.icon size={18} className="text-indigo-500" /> {item.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassEffect>
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
              className="absolute inset-0 bg-indigo-950/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl"
            >
              <GlassEffect className="rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/20">
                  <div className="flex items-center gap-4">
                    <Search className="text-indigo-600" size={24} />
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
                      className="p-2 hover:bg-white/30 rounded-full transition-colors text-gray-400"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-4">
                  {searchResults.length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(
                        searchResults.reduce((acc, result) => {
                          if (!acc[result.sectionName]) acc[result.sectionName] = [];
                          acc[result.sectionName].push(result);
                          return acc;
                        }, {} as Record<string, any[]>)
                      ).map(([sectionName, items]: [string, any], sectionIdx) => (
                        <div key={sectionIdx}>
                          <h3 className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-3 px-1 border-b border-white/10 pb-2">
                            {sectionName}
                          </h3>
                          <div className="grid grid-cols-1 gap-2">
                            {items.map((result: any, idx: number) => (
                              <Link
                                key={idx}
                                to={`/${result.sectionId}`}
                                onClick={() => { setIsSearchOpen(false); navigate(`/${result.sectionId}`); }}
                                className="flex flex-col p-4 bg-white/5 hover:bg-white/30 rounded-xl transition-all border border-transparent hover:border-white/30 group"
                              >
                                <div className="flex justify-between items-start">
                                  <h4 className="font-bold text-gray-800 text-sm group-hover:text-indigo-900 transition-colors leading-tight">{result.title}</h4>
                                  <ExternalLink size={14} className="text-gray-400 group-hover:text-indigo-500 transition-colors shrink-0 ml-3" />
                                </div>
                                {result.subtitle && <p className="text-[11px] font-bold text-indigo-500/80 uppercase mt-1.5">{result.subtitle}</p>}
                                {result.details && <p className="text-[11px] text-gray-600 mt-2 line-clamp-2 italic leading-relaxed">{result.details}</p>}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="py-12 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                        <Search size={32} className="text-gray-300" />
                      </div>
                      <p className="text-gray-600 font-medium">No se encontraron resultados para "{searchQuery}"</p>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <p className="text-gray-500 text-sm">Escribe algo para comenzar a buscar en el portafolio...</p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-white/10 border-t border-white/20 flex justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <div className="flex gap-4">
                    <span><kbd className="bg-white/50 border border-white/30 px-1 rounded shadow-sm">ESC</kbd> Cerrar</span>
                    <span><kbd className="bg-white/50 border border-white/30 px-1 rounded shadow-sm">↵</kbd> Seleccionar</span>
                  </div>
                  <span>{searchResults.length} resultados</span>
                </div>
              </GlassEffect>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
