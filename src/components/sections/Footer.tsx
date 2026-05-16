import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { PROFESSOR_DATA } from '../../data/professorData';

export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
      <div className="glass rounded-full px-6 md:px-8 py-3 md:py-4 inline-flex items-center gap-3">
        <p className="text-[10px] md:text-sm text-gray-500">
          © {new Date().getFullYear()} {PROFESSOR_DATA.name} — Humanidades & Arte
        </p>
        <div className="w-[1px] h-3 bg-gray-300" />
        <Link to="/admin" className="text-gray-400 hover:text-indigo-600 transition-colors p-1" title="Panel de Administración">
          <Settings size={14} className="animate-spin-slow" />
        </Link>
      </div>
    </footer>
  );
}

