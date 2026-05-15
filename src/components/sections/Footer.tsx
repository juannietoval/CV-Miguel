import { PROFESSOR_DATA } from '../../data/professorData';

export default function Footer() {
  return (
          <footer className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
            <div className="glass rounded-full px-6 md:px-8 py-3 md:py-4 inline-block">
              <p className="text-[10px] md:text-sm text-gray-500">
                Â© {new Date().getFullYear()} {PROFESSOR_DATA.name} — Humanidades & Arte
              </p>
            </div>
          </footer>
  );
}

