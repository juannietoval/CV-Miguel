import React, { useState } from 'react';
import { 
  Download, Plus, Trash2, Edit3, ArrowUp, ArrowDown, Save, 
  Settings, Database, CheckCircle, HelpCircle, FileText, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFESSOR_DATA } from '../../data/professorData';

// Map sections to user-friendly titles
const SECTIONS_CONFIG: { [key: string]: { title: string; keys: string[] } } = {
  bio_info: {
    title: "Datos del Perfil (Biografía)",
    keys: ["name", "title", "profileImage", "bio", "email", "faculty", "department", "location"]
  },
  cv: {
    title: "Formación Académica",
    keys: ["year", "role", "institution", "description"]
  },
  experience: {
    title: "Experiencia Profesional",
    keys: ["institution", "dedication", "period"] // Activities handled separately due to nested structure
  },
  tutoring: {
    title: "Tutorías y Asesorías",
    keys: ["year", "title", "student", "program", "status"]
  },
  jury: {
    title: "Jurados de Tesis",
    keys: ["year", "type", "title", "student", "institution", "program"]
  },
  events: {
    title: "Eventos Académicos",
    keys: ["year", "type", "name", "institution", "role"]
  },
  networks: {
    title: "Redes y Asociaciones",
    keys: ["name", "role", "type"]
  },
  socialImpact: {
    title: "Impacto Social y Extensión",
    keys: ["year", "title", "description", "link"]
  },
  digitalContent: {
    title: "Producciones Audiovisuales y Contenido",
    keys: ["title", "platform", "type", "year", "link", "image", "description"]
  },
  articles: {
    title: "Artículos Científicos",
    keys: ["year", "title", "journal", "volume", "pages", "doi", "link"]
  },
  nonScientificArticles: {
    title: "Artículos de Divulgación",
    keys: ["year", "title", "medium", "link"]
  },
  divulgationBooks: {
    title: "Libros y Capítulos de Divulgación",
    keys: ["year", "title", "publisher", "isbn", "image", "description", "link", "type"]
  },
  researchReports: {
    title: "Informes de Investigación",
    keys: ["year", "title", "institution", "description"]
  },
  artisticWorks: {
    title: "Obras Artísticas",
    keys: ["year", "title", "type", "details", "link"]
  },
  projects: {
    title: "Proyectos de Investigación",
    keys: ["year", "title", "role", "status", "description", "code"]
  },
  complementary: {
    title: "Cursos y Formación Complementaria",
    keys: ["year", "title", "institution"]
  }
};

export default function AdminPanel() {
  const [dataState, setDataState] = useState<any>({ ...PROFESSOR_DATA });
  const [selectedSection, setSelectedSection] = useState<string>("bio_info");
  const [editingItemIdx, setEditingItemIdx] = useState<number | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [formState, setFormState] = useState<any>({});
  
  // Custom activities state for experience section
  const [expActivities, setExpActivities] = useState<any>({ admin: [], teaching: [], research: [] });
  const [newActivityText, setNewActivityText] = useState<{ [key: string]: string }>({ admin: "", teaching: "", research: "" });

  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);

  // Switch category and reset editing state
  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
    setEditingItemIdx(null);
    setIsAdding(false);
    setFormState({});
  };

  // Start adding new item
  const startAdd = () => {
    setIsAdding(true);
    setEditingItemIdx(null);
    const initialForm: any = {};
    SECTIONS_CONFIG[selectedSection].keys.forEach(k => {
      initialForm[k] = "";
    });
    setFormState(initialForm);
    setExpActivities({ admin: [], teaching: [], research: [] });
  };

  // Start editing existing item
  const startEdit = (idx: number) => {
    setEditingItemIdx(idx);
    setIsAdding(false);
    const item = dataState[selectedSection][idx];
    setFormState({ ...item });

    if (selectedSection === 'experience') {
      setExpActivities({
        admin: item.activities?.admin || [],
        teaching: item.activities?.teaching || [],
        research: item.activities?.research || []
      });
    }
  };

  // Handle generic input change
  const handleInputChange = (key: string, value: string) => {
    setFormState((prev: any) => ({ ...prev, [key]: value }));
  };

  // Handle nested lists for experience activities
  const addActivity = (type: 'admin' | 'teaching' | 'research') => {
    const text = newActivityText[type].trim();
    if (!text) return;
    setExpActivities((prev: any) => ({
      ...prev,
      [type]: [...prev[type], text]
    }));
    setNewActivityText((prev: any) => ({ ...prev, [type]: "" }));
  };

  const removeActivity = (type: 'admin' | 'teaching' | 'research', idx: number) => {
    setExpActivities((prev: any) => ({
      ...prev,
      [type]: prev[type].filter((_: any, i: number) => i !== idx)
    }));
  };

  // Save changes locally to React state
  const saveForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSection === "bio_info") {
      setDataState((prev: any) => ({
        ...prev,
        ...formState
      }));
    } else {
      const currentList = [...(dataState[selectedSection] || [])];
      let updatedItem = { ...formState };

      if (selectedSection === 'experience') {
        updatedItem.activities = { ...expActivities };
      }

      if (isAdding) {
        currentList.unshift(updatedItem); // Put new items at the top
      } else if (editingItemIdx !== null) {
        currentList[editingItemIdx] = updatedItem;
      }

      setDataState((prev: any) => ({
        ...prev,
        [selectedSection]: currentList
      }));
    }

    setEditingItemIdx(null);
    setIsAdding(false);
    setFormState({});
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  // Delete item from list
  const deleteItem = (idx: number) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este elemento?")) return;
    const currentList = [...dataState[selectedSection]];
    currentList.splice(idx, 1);
    setDataState((prev: any) => ({
      ...prev,
      [selectedSection]: currentList
    }));
  };

  // Reorder list items (Move Up/Down)
  const moveItem = (idx: number, direction: 'up' | 'down') => {
    const currentList = [...dataState[selectedSection]];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= currentList.length) return;

    // Swap elements
    const temp = currentList[idx];
    currentList[idx] = currentList[targetIdx];
    currentList[targetIdx] = temp;

    setDataState((prev: any) => ({
      ...prev,
      [selectedSection]: currentList
    }));
  };

  // Download data as JSON file
  const downloadJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(dataState, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "professorData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-gradient-to-br from-indigo-50/50 via-slate-100/50 to-blue-50/50">
      <div className="max-w-6xl mx-auto">
        {/* Header del Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 glass rounded-3xl p-6 border-white/60 bg-white/70 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="serif text-2xl md:text-3xl font-black text-slate-800">Panel de Administración</h1>
              <p className="text-xs md:text-sm font-semibold text-indigo-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                <Database className="w-3.5 h-3.5" /> Gestor Estático del Portafolio
              </p>
            </div>
          </div>
          <button 
            onClick={downloadJSON}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-95 group"
          >
            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
            Descargar professorData.json
          </button>
        </div>

        {/* Notificación de éxito */}
        <AnimatePresence>
          {showSaveSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3 rounded-2xl mb-6 shadow-sm"
            >
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-semibold">Cambios aplicados temporalmente. ¡No olvides descargar el archivo y guardarlo en el editor!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Guía de Uso */}
        <div className="glass bg-indigo-50/50 border-indigo-100 rounded-3xl p-6 mb-8 text-indigo-950/80">
          <h2 className="font-bold text-base flex items-center gap-2 mb-2 text-indigo-950">
            <HelpCircle className="w-5 h-5 text-indigo-500" /> ¿Cómo aplicar tus cambios en la web?
          </h2>
          <ol className="list-decimal list-inside text-sm space-y-1.5 pl-1">
            <li>Modifica tus datos a continuación (añade, edita, borra o reordena).</li>
            <li>Haz clic en el botón de arriba <strong>"Descargar professorData.json"</strong>.</li>
            <li>Reemplaza el archivo <strong>`src/data/professorData.json`</strong> de tu editor con el archivo descargado.</li>
            <li>Haz un <strong>git commit & push</strong> en tu terminal para que los cambios se suban automáticamente a <strong>GitHub Pages</strong>.</li>
          </ol>
        </div>

        {/* Cuerpo Principal del Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Barra Lateral de Categorías */}
          <div className="lg:col-span-4 flex flex-col gap-2.5">
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest pl-3">Secciones del Portafolio</span>
            <div className="glass rounded-3xl p-3 border-white/60 bg-white/70 shadow-md flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible custom-scrollbar">
              {Object.entries(SECTIONS_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleSectionChange(key)}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-between gap-3 whitespace-nowrap lg:whitespace-normal ${
                    selectedSection === key 
                      ? 'bg-indigo-600 text-white shadow-md' 
                      : 'hover:bg-slate-100/80 text-slate-700'
                  }`}
                >
                  <span>{config.title}</span>
                  {selectedSection === key && <ArrowRight className="w-4 h-4 hidden lg:block" />}
                </button>
              ))}
            </div>
          </div>

          {/* Área de Edición y Listado */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {editingItemIdx !== null || isAdding || selectedSection === "bio_info" ? (
                // Formulario de Edición o Agregar
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-3xl p-6 md:p-8 border-white/60 bg-white/80 shadow-lg"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="serif text-xl font-bold text-slate-800">
                      {selectedSection === "bio_info" ? "Editar Perfil Principal" : isAdding ? "Añadir Nuevo Elemento" : "Editar Elemento"}
                    </h3>
                    {selectedSection !== "bio_info" && (
                      <button 
                        onClick={() => { setEditingItemIdx(null); setIsAdding(false); }}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>

                  <form onSubmit={saveForm} className="space-y-5">
                    {/* Campos de texto dinámicos según las llaves configuradas */}
                    {SECTIONS_CONFIG[selectedSection].keys.map((key) => (
                      <div key={key} className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">{key}</label>
                        {key === 'bio' || key === 'description' ? (
                          <textarea
                            rows={4}
                            value={formState[key] || ""}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-400 focus:outline-none bg-white/50 text-slate-800 text-sm font-medium transition-all"
                            placeholder={`Escribe aquí el campo ${key}...`}
                          />
                        ) : (
                          <input
                            type="text"
                            value={formState[key] || ""}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className="px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-400 focus:outline-none bg-white/50 text-slate-800 text-sm font-medium transition-all"
                            placeholder={`Escribe aquí el campo ${key}...`}
                          />
                        )}
                      </div>
                    ))}

                    {/* Manejador especial de actividades para Experiencia */}
                    {selectedSection === 'experience' && (
                      <div className="border-t border-slate-100 pt-6 mt-6 space-y-6">
                        <h4 className="font-bold text-slate-800 text-sm">Actividades y Responsabilidades</h4>
                        
                        {(['admin', 'teaching', 'research'] as const).map((type) => (
                          <div key={type} className="space-y-3">
                            <label className="text-xs font-bold text-indigo-500 uppercase tracking-widest pl-1">
                              {type === 'admin' ? 'Gestión y Administración' : type === 'teaching' ? 'Docencia (Materias)' : 'Investigación (Proyectos)'}
                            </label>
                            
                            {/* Listado de actividades existentes */}
                            <ul className="space-y-2">
                              {expActivities[type]?.map((act: string, idx: number) => (
                                <li key={idx} className="flex items-center justify-between gap-3 bg-indigo-50/30 border border-indigo-100/50 p-3 rounded-xl text-xs font-medium text-slate-700">
                                  <span>{act}</span>
                                  <button
                                    type="button"
                                    onClick={() => removeActivity(type, idx)}
                                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </li>
                              ))}
                            </ul>

                            {/* Agregar nueva actividad */}
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newActivityText[type]}
                                onChange={(e) => setNewActivityText((prev: any) => ({ ...prev, [type]: e.target.value }))}
                                className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:border-indigo-400 focus:outline-none bg-white/50 text-xs font-medium"
                                placeholder={`Añadir nueva actividad de ${type}...`}
                              />
                              <button
                                type="button"
                                onClick={() => addActivity(type)}
                                className="px-4 py-2 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-200 transition-colors text-xs font-bold"
                              >
                                Añadir
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Botón de Guardado local */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                      {selectedSection !== "bio_info" && (
                        <button
                          type="button"
                          onClick={() => { setEditingItemIdx(null); setIsAdding(false); }}
                          className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors"
                        >
                          Cancelar
                        </button>
                      )}
                      <button
                        type="submit"
                        className="flex items-center gap-1.5 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-indigo-500/10 active:scale-95 transition-all"
                      >
                        <Save className="w-4 h-4" />
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                // Listado de Elementos Existentes
                <motion.div
                  key="list"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="glass rounded-3xl p-6 border-white/60 bg-white/70 shadow-lg"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="serif text-xl font-bold text-slate-800">
                      {SECTIONS_CONFIG[selectedSection].title}
                    </h3>
                    <button
                      onClick={startAdd}
                      className="flex items-center gap-1 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl font-bold text-xs transition-colors group"
                    >
                      <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Añadir Elemento
                    </button>
                  </div>

                  {/* Listado */}
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    {(!dataState[selectedSection] || dataState[selectedSection].length === 0) ? (
                      <div className="py-12 text-center text-slate-400 font-medium">
                        No hay elementos en esta sección todavía. ¡Añade uno nuevo!
                      </div>
                    ) : (
                      dataState[selectedSection].map((item: any, idx: number) => (
                        <div 
                          key={idx} 
                          className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white/60 border border-slate-100 hover:bg-white/90 hover:border-slate-200/80 transition-all group"
                        >
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-800 text-sm line-clamp-1">
                              {item.title || item.role || item.name || item.institution || "Sin título"}
                            </h4>
                            <p className="text-xs text-indigo-500 font-medium mt-0.5">
                              {item.year || item.period || item.type || ""} {item.institution ? `— ${item.institution}` : ""}
                            </p>
                          </div>

                          {/* Botones de acción */}
                          <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                            {/* Ordenamiento */}
                            <button
                              disabled={idx === 0}
                              onClick={() => moveItem(idx, 'up')}
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              title="Subir"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              disabled={idx === dataState[selectedSection].length - 1}
                              onClick={() => moveItem(idx, 'down')}
                              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                              title="Bajar"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>

                            {/* Edición */}
                            <button
                              onClick={() => startEdit(idx)}
                              className="p-1.5 hover:bg-indigo-50 rounded-lg text-indigo-400 hover:text-indigo-600 transition-colors"
                              title="Editar"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>

                            {/* Eliminación */}
                            <button
                              onClick={() => deleteItem(idx)}
                              className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 hover:text-red-600 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
