import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Download, Plus, Trash2, Edit3, ArrowUp, ArrowDown, Save, 
  Settings, Database, CheckCircle, HelpCircle, FileText, ArrowRight, ArrowLeft,
  Lock, Eye, EyeOff, LogOut, ExternalLink, Loader2, AlertTriangle, Shield, Check, X, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFESSOR_DATA } from '../../data/professorData';

// Map sections to user-friendly titles
const SECTIONS_CONFIG: { [key: string]: { title: string; keys: string[] } } = {
  bio_info: {
    title: "Datos del Perfil (Biografía)",
    keys: ["name", "title", "profileImage", "bio", "email", "faculty", "department", "location", "social_linkedin", "social_scholar", "social_researchgate", "social_academia", "social_repository"]
  },
  cv: {
    title: "Formación Académica",
    keys: ["year", "role", "institution", "description", "link"]
  },
  experience: {
    title: "Experiencia Profesional",
    keys: ["institution", "dedication", "period", "link"] // Activities handled separately due to nested structure
  },
  tutoring: {
    title: "Tutorías y Asesorías",
    keys: ["type", "year", "title", "institution", "status", "student", "role", "link"]
  },
  jury: {
    title: "Jurados de Tesis",
    keys: ["year", "type", "title", "student", "institution", "program", "link"]
  },
  events: {
    title: "Eventos Académicos",
    keys: ["name", "type", "scope", "date", "location", "role", "product", "link", "participants", "institutions"]
  },
  networks: {
    title: "Redes y Asociaciones",
    keys: ["name", "type", "date", "location", "link"]
  },
  socialImpact: {
    title: "Impacto Social y Extensión",
    keys: ["title", "date", "license", "format", "project", "verification", "link"]
  },
  digitalContent: {
    title: "Producciones Audiovisuales y Contenido",
    keys: ["title", "type", "date", "location", "circulation", "project", "link", "image"]
  },
  articles: {
    title: "Artículos Científicos",
    keys: ["year", "title", "authors", "journal", "issn", "publisher", "details", "location", "link"]
  },
  nonScientificArticles: {
    title: "Artículos de Divulgación",
    keys: ["year", "title", "authors", "journal", "issn", "volume", "pages", "location", "areas", "link", "keywords"]
  },
  divulgationBooks: {
    title: "Libros",
    keys: ["year", "title", "type", "description", "isbn", "medium", "publisher", "location", "areas", "link", "image", "qr"]
  },
  researchReports: {
    title: "Informes de Investigación",
    keys: ["year", "title", "authors", "location", "areas", "link"]
  },
  artisticWorks: {
    title: "Obras Artísticas",
    keys: ["title", "discipline", "date", "link"] // validations handled separately
  },
  projects: {
    title: "Proyectos de Investigación",
    keys: ["type", "start", "end", "title", "summary", "link"]
  },
  complementary: {
    title: "Cursos y Formación Complementaria",
    keys: ["year", "title", "institution", "link"]
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

  // Custom validations state for artisticWorks section
  const [artValidations, setArtValidations] = useState<any[]>([]);
  const [newValEvent, setNewValEvent] = useState<string>("");
  const [newValDate, setNewValDate] = useState<string>("");
  const [newValInst, setNewValInst] = useState<string>("");

  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);

  // Sync bio_info fields from dataState to formState
  useEffect(() => {
    if (selectedSection === 'bio_info') {
      const initialForm: any = {};
      SECTIONS_CONFIG.bio_info.keys.forEach(k => {
        if (k.startsWith('social_')) {
          const socialKey = k.replace('social_', '');
          initialForm[k] = dataState.social?.[socialKey] || '';
        } else {
          initialForm[k] = dataState[k] || '';
        }
      });
      setFormState(initialForm);
    }
  }, [selectedSection, dataState]);

  // --- NUEVO: Estados de Autenticación y GitHub API ---
  const [token, setToken] = useState<string>(() => {
    return sessionStorage.getItem('github_pat') || localStorage.getItem('github_pat') || '';
  });
  const [rememberToken, setRememberToken] = useState<boolean>(() => {
    return !!localStorage.getItem('github_pat');
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!(sessionStorage.getItem('github_pat') || localStorage.getItem('github_pat'));
  });
  const [isValidatingToken, setIsValidatingToken] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Estados de Sincronización GitHub
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [publishStep, setPublishStep] = useState<'idle' | 'verifying' | 'preparing' | 'submitting' | 'success' | 'error'>('idle');
  const [publishError, setPublishError] = useState<string>('');
  const [createdCommitUrl, setCreatedCommitUrl] = useState<string>('');

  // Contador de Cambios locales pendientes
  const countDifferences = () => {
    let diffCount = 0;
    
    // Comparar información biográfica
    const bioKeys = SECTIONS_CONFIG.bio_info.keys;
    bioKeys.forEach(k => {
      if (k.startsWith('social_')) {
        const socialKey = k.replace('social_', '');
        if ((PROFESSOR_DATA.social?.[socialKey] || "") !== (dataState.social?.[socialKey] || "")) {
          diffCount++;
        }
      } else {
        if (PROFESSOR_DATA[k] !== dataState[k]) {
          diffCount++;
        }
      }
    });
    
    // Comparar otras secciones
    Object.keys(SECTIONS_CONFIG).forEach(sec => {
      if (sec === 'bio_info') return;
      const originalLength = PROFESSOR_DATA[sec]?.length || 0;
      const currentLength = dataState[sec]?.length || 0;
      
      if (originalLength !== currentLength) {
        diffCount += Math.abs(originalLength - currentLength);
      } else {
        for (let i = 0; i < originalLength; i++) {
          if (JSON.stringify(PROFESSOR_DATA[sec][i]) !== JSON.stringify(dataState[sec][i])) {
            diffCount++;
          }
        }
      }
    });
    
    return diffCount;
  };

  const handleAuthError = () => {
    localStorage.removeItem('github_pat');
    sessionStorage.removeItem('github_pat');
    setToken('');
    setIsAuthenticated(false);
    setLoginError('Tu token de GitHub ha expirado, es inválido o no tiene permisos de escritura en juannietoval/CV-Miguel.');
  };

  // Validar Token al hacer Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setLoginError('Por favor ingresa un token de GitHub válido.');
      return;
    }

    setIsValidatingToken(true);
    setLoginError('');

    try {
      // Hacer un GET al archivo actual para validar tanto el token como el acceso al repo
      const response = await fetch(
        'https://api.github.com/repos/juannietoval/CV-Miguel/contents/src/data/professorData.json',
        {
          headers: {
            'Authorization': `token ${token.trim()}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (response.status === 401 || response.status === 403) {
        setLoginError('Token inválido o expirado. Asegúrate de que tenga permisos para este repositorio.');
        setIsValidatingToken(false);
        return;
      }

      if (!response.ok) {
        setLoginError(`El repositorio no responde. Código: ${response.status} (${response.statusText})`);
        setIsValidatingToken(false);
        return;
      }

      // Login exitoso
      if (rememberToken) {
        localStorage.setItem('github_pat', token.trim());
        sessionStorage.removeItem('github_pat');
      } else {
        sessionStorage.setItem('github_pat', token.trim());
        localStorage.removeItem('github_pat');
      }
      setIsAuthenticated(true);
    } catch (error: any) {
      setLoginError(`Error de red o conexión: ${error.message || error}`);
    } finally {
      setIsValidatingToken(false);
    }
  };

  // Cerrar Sesión de forma segura
  const handleLogout = () => {
    if (!window.confirm("¿Seguro que deseas cerrar la sesión de administración?")) return;
    localStorage.removeItem('github_pat');
    sessionStorage.removeItem('github_pat');
    setToken('');
    setIsAuthenticated(false);
    setLoginError('');
  };

  // Publicar Cambios en GitHub mediante la API REST
  const handlePublish = async () => {
    if (!token) {
      handleAuthError();
      return;
    }

    if (countDifferences() === 0) {
      alert("No hay cambios locales pendientes por publicar en GitHub.");
      return;
    }

    setIsPublishing(true);
    setPublishStep('verifying');
    setPublishError('');
    setCreatedCommitUrl('');

    try {
      // 1. Verificando: Obtener metadatos actuales del archivo en GitHub para el SHA
      const getRes = await fetch(
        'https://api.github.com/repos/juannietoval/CV-Miguel/contents/src/data/professorData.json',
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (getRes.status === 401 || getRes.status === 403) {
        handleAuthError();
        setIsPublishing(false);
        return;
      }

      if (!getRes.ok) {
        throw new Error(`No se pudo obtener el SHA actual del archivo en GitHub (${getRes.status})`);
      }

      const fileData = await getRes.json();
      const currentSha = fileData.sha;

      // 2. Preparando: Validar integridad estructural local del JSON
      setPublishStep('preparing');
      let jsonContentString = '';
      try {
        jsonContentString = JSON.stringify(dataState, null, 2);
        JSON.parse(jsonContentString); // Test de parsing
      } catch (err) {
        throw new Error('El JSON local contiene errores estructurales y no se puede codificar.');
      }

      // 3. Subiendo: Realizar PUT en la API con codificación segura UTF-8 -> Base64
      setPublishStep('submitting');
      const base64Content = btoa(unescape(encodeURIComponent(jsonContentString)));

      const putRes = await fetch(
        'https://api.github.com/repos/juannietoval/CV-Miguel/contents/src/data/professorData.json',
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: 'Actualización automática del CV de Miguel Puentes desde el panel de administración',
            content: base64Content,
            sha: currentSha,
            branch: 'main'
          })
        }
      );

      if (putRes.status === 401 || putRes.status === 403) {
        handleAuthError();
        setIsPublishing(false);
        return;
      }

      if (!putRes.ok) {
        const errorJson = await putRes.json().catch(() => ({}));
        throw new Error(errorJson.message || `Error en la escritura de GitHub (${putRes.status})`);
      }

      const putData = await putRes.json();
      setCreatedCommitUrl(putData.commit.html_url);
      setPublishStep('success');

      // Actualizar el valor original local en memoria para que concuerde y limpie el contador
      // Nota: React no sobreescribirá el archivo JSON importado localmente en tiempo de compilación directo en el disco,
      // pero actualiza el conteo visual de diferencias del usuario en la sesión actual.
      // Opcional: Podríamos refrescar la página tras una recarga, pero dejarlo así en memoria da una transición fluida.
      
    } catch (error: any) {
      setPublishError(error.message || 'Ocurrió un error inesperado al intentar publicar en GitHub.');
      setPublishStep('error');
    } finally {
      setIsPublishing(false);
    }
  };

  // --- FIN DE NUEVO CÓDIGO ---

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

  // Format Google Drive image URLs to direct links
  const formatImageUrl = (url: string) => {
    if (!url) return url;
    
    // Match drive.google.com/file/d/FILE_ID/...
    const fileIdMatch = url.match(/drive\.google\.com\/file\/d\/([-\w]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
    
    // Match drive.google.com/open?id=FILE_ID
    const openIdMatch = url.match(/drive\.google\.com\/open\?id=([-\w]+)/);
    if (openIdMatch && openIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${openIdMatch[1]}`;
    }

    return url;
  };

  // Handle generic input change
  const handleInputChange = (key: string, value: string) => {
    let finalValue = value;
    if (key === 'image' || key === 'profileImage' || key === 'qr') {
      finalValue = formatImageUrl(value);
    }
    setFormState((prev: any) => ({ ...prev, [key]: finalValue }));
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

  // Download data as JSON file (Manual Fallback)
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

  const pendingChanges = countDifferences();

  // --- VISTA DE ACCESO SI NO ESTÁ AUTENTICADO ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50/30 via-slate-100/30 to-blue-50/30">
        <div className="max-w-md w-full space-y-8 glass rounded-3xl p-8 border-white/60 bg-white/70 shadow-2xl relative overflow-hidden">
          
          {/* Fondo estético decorativo */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl -mr-6 -mt-6"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
          
          <div className="text-center relative z-10">
            <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
              <Shield className="h-6 w-6" />
            </div>
            <h2 className="serif text-2xl font-black text-slate-800">Acceso Administrador</h2>
            <p className="mt-2 text-xs font-semibold text-indigo-500 uppercase tracking-wider">
              juannietoval / CV-Miguel
            </p>
            <p className="mt-3 text-xs text-slate-500 leading-relaxed">
              Para realizar cambios de forma directa y automática, utiliza tu **Token de Acceso Personal (PAT)** de GitHub como contraseña de acceso.
            </p>
          </div>

          <form className="mt-8 space-y-6 relative z-10" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Token de Acceso Personal</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 focus:border-indigo-400 focus:outline-none rounded-2xl bg-white/50 text-slate-800 text-sm font-medium transition-all"
                    placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxx"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Checkbox Recordar Sesión con Alerta */}
              <div className="space-y-3 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberToken}
                    onChange={(e) => setRememberToken(e.target.checked)}
                    className="w-4.5 h-4.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-semibold text-slate-600">Recordar token en este navegador</span>
                </label>

                {rememberToken && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex gap-2 p-3 bg-amber-50/70 border border-amber-200/50 rounded-xl text-[11px] text-amber-800 leading-relaxed font-medium"
                  >
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      **Advertencia:** Al activar esta opción, el token se guardará en `localStorage`. No lo utilices en computadoras públicas o de uso compartido.
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {loginError && (
              <div className="flex gap-2 p-3 bg-rose-50 border border-rose-100 rounded-2xl text-xs text-rose-800 font-medium">
                <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isValidatingToken}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm transition-all shadow-lg hover:shadow-indigo-500/20 active:scale-98 disabled:opacity-50 disabled:pointer-events-none group"
              >
                {isValidatingToken ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Validando permisos...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    Conectarse con GitHub
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Acordeón de Instrucciones */}
          <div className="border-t border-slate-100 pt-5 mt-4">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-wider py-1"
            >
              <span className="flex items-center gap-1.5"><HelpCircle className="w-4 h-4" /> ¿Cómo crear tu token de GitHub?</span>
              <span className="text-slate-400">{showInstructions ? '▲' : '▼'}</span>
            </button>
            
            <AnimatePresence>
              {showInstructions && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 pb-1 text-slate-600 text-xs space-y-2 leading-relaxed">
                    <p>Tu token nos permite subir cambios en tu nombre sin guardar contraseñas permanentes.</p>
                    <ol className="list-decimal list-inside space-y-1.5 text-[11px] pl-1">
                      <li>Ingresa a tu cuenta de **GitHub**.</li>
                      <li>Ve a **Settings (Configuración)** desde tu foto de perfil.</li>
                      <li>Haz clic abajo a la izquierda en **Developer settings**.</li>
                      <li>Selecciona **Personal access tokens** &gt; **Fine-grained tokens** (Recomendado).</li>
                      <li>Haz clic en **Generate new token**.</li>
                      <li>Nómbralo (ej. *CV-Admin*), selecciona el repositorio **juannietoval/CV-Miguel**.</li>
                      <li>En **Repository permissions**, selecciona **Contents** y asígnale permisos de **Read and write (Lectura y Escritura)**.</li>
                      <li>Presiona **Generate token**, cópialo y pégalo en el campo superior.</li>
                    </ol>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    );
  }

  // --- VISTA PRINCIPAL DEL PANEL (AUTENTICADO) ---
  return (
    <div className="min-h-screen py-10 px-4 md:px-8 bg-gradient-to-br from-indigo-50/50 via-slate-100/50 to-blue-50/50">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera de Sincronización y Acciones */}
        {isPublishing || publishStep !== 'idle' ? (
          <div className="mb-6 p-5 glass rounded-3xl border-white/60 bg-white/80 shadow-md">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                {publishStep === 'success' ? (
                  <Check className="w-5 h-5 text-emerald-600" />
                ) : publishStep === 'error' ? (
                  <X className="w-5 h-5 text-rose-600" />
                ) : (
                  <RefreshCw className="w-5 h-5 animate-spin text-indigo-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-slate-800">
                  {publishStep === 'verifying' && 'Paso 1: Verificando repositorio y SHA en GitHub...'}
                  {publishStep === 'preparing' && 'Paso 2: Validando archivos locales...'}
                  {publishStep === 'submitting' && 'Paso 3: Subiendo cambios directamente a GitHub...'}
                  {publishStep === 'success' && '¡Éxito! Publicado correctamente en GitHub'}
                  {publishStep === 'error' && 'Fallo en la publicación'}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {publishStep === 'verifying' && 'Estableciendo comunicación segura con la API de GitHub en juannietoval/CV-Miguel.'}
                  {publishStep === 'preparing' && 'Asegurando que la estructura JSON de tus datos sea válida para no corromper la página.'}
                  {publishStep === 'submitting' && 'Codificando tus datos en UTF-8 Base64 y realizando commit en la rama main.'}
                  {publishStep === 'success' && 'Los cambios han sido guardados en el repositorio de GitHub de forma exitosa.'}
                  {publishStep === 'error' && `Detalle: ${publishError}`}
                </p>

                {publishStep === 'success' && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {createdCommitUrl && (
                      <a 
                        href={createdCommitUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-colors border border-emerald-200/50"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver Commit en GitHub
                      </a>
                    )}
                    <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                      Los cambios pueden tardar 1 o 2 minutos en aparecer en el sitio público mientras se compila.
                    </span>
                    <button 
                      onClick={() => setPublishStep('idle')} 
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors ml-auto"
                    >
                      Aceptar
                    </button>
                  </div>
                )}

                {publishStep === 'error' && (
                  <div className="mt-3 flex gap-2">
                    <button 
                      onClick={handlePublish}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Reintentar
                    </button>
                    <button 
                      onClick={() => setPublishStep('idle')}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}

        {/* Header del Panel */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 glass rounded-3xl p-6 border-white/60 bg-white/70 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-md">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="serif text-2xl md:text-3xl font-black text-slate-800">Panel de Administración</h1>
                
                {/* Status Badge */}
                <div 
                  className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/50 text-[10px] text-emerald-700 font-bold ml-1 cursor-help"
                  title="Conexión activa y segura con GitHub"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Conectado
                </div>
              </div>
              <p className="text-xs md:text-sm font-semibold text-indigo-500 uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                <Database className="w-3.5 h-3.5" /> Gestor de Contenido Automatizado
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Cerrar Sesión */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors"
              title="Cerrar sesión de administración"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>

            {/* Descarga Manual (Fallback) */}
            <button 
              onClick={downloadJSON}
              className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-all"
              title="Descargar JSON para guardar de forma manual si es necesario"
            >
              <Download className="w-4 h-4" />
              Respaldar JSON
            </button>

            {/* PUBLICAR EN GITHUB */}
            <button 
              onClick={handlePublish}
              disabled={pendingChanges === 0 || isPublishing}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 group ${
                pendingChanges > 0 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/20' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <Loader2 className={`w-4 h-4 animate-spin ${isPublishing ? 'block' : 'hidden'}`} />
              {!isPublishing && <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />}
              🚀 Publicar en GitHub
            </button>
          </div>
        </div>

        {/* Notificaciones de éxito local */}
        <AnimatePresence>
          {showSaveSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-5 py-3 rounded-2xl mb-6 shadow-sm"
            >
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <span className="text-sm font-semibold">Cambios guardados localmente. ¡Recuerda hacer clic en "🚀 Publicar en GitHub" arriba para subirlos a Internet!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicador de Cambios Pendientes */}
        {pendingChanges > 0 && (
          <div className="flex items-center gap-3 p-4 bg-indigo-50/70 border border-indigo-100 rounded-2xl mb-6 shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></div>
            <div className="text-xs font-semibold text-indigo-950/95 flex-1">
              Tienes **{pendingChanges}** cambio{pendingChanges > 1 ? 's' : ''} local{pendingChanges > 1 ? 'es' : ''} pendiente{pendingChanges > 1 ? 's' : ''} de guardar en el servidor. Presiona **Publicar en GitHub** para subirlos a producción.
            </div>
            <button 
              onClick={handlePublish}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow"
            >
              Publicar Ahora
            </button>
          </div>
        )}

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
                          <div className="flex flex-col gap-2">
                            <input
                              type="text"
                              value={formState[key] || ""}
                              onChange={(e) => handleInputChange(key, e.target.value)}
                              className="px-4 py-3 rounded-2xl border border-slate-200 focus:border-indigo-400 focus:outline-none bg-white/50 text-slate-800 text-sm font-medium transition-all"
                              placeholder={`Escribe aquí el campo ${key}...`}
                            />
                            {(key === 'image' || key === 'profileImage' || key === 'qr') && formState[key] && (
                              <div className="mt-1 flex flex-col items-start gap-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Vista Previa:</span>
                                <div className="p-2 bg-white/80 border border-slate-200 rounded-xl inline-block max-w-full overflow-hidden">
                                  <img 
                                    src={formState[key]} 
                                    alt="Preview" 
                                    className="max-h-32 object-contain rounded-lg"
                                    onError={(e) => {
                                      const target = e.currentTarget;
                                      target.style.display = 'none';
                                      if (target.nextElementSibling) {
                                        (target.nextElementSibling as HTMLElement).style.display = 'flex';
                                      }
                                    }}
                                    onLoad={(e) => {
                                      const target = e.currentTarget;
                                      target.style.display = 'block';
                                      if (target.nextElementSibling) {
                                        (target.nextElementSibling as HTMLElement).style.display = 'none';
                                      }
                                    }}
                                  />
                                  <div className="hidden items-center gap-1.5 text-xs text-rose-500 font-medium p-1">
                                    <AlertTriangle className="w-3.5 h-3.5" /> Enlace de imagen no válido o roto
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
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

