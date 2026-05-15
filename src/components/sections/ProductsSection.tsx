import { BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFESSOR_DATA } from '../../data/professorData';

export default function ProductsSection() {
  return (
                <section id="products" className="scroll-mt-20 md:scroll-mt-28">
          <div className="glass rounded-3xl p-6 md:p-12">
            <h2 className="serif text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-3">
              <BookOpen className="text-indigo-600" /> Publicaciones
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {PROFESSOR_DATA.products.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="group relative glass rounded-2xl overflow-hidden flex flex-col sm:flex-row h-full"
                >
                  <div className="w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <a 
                      href={product.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 md:p-6 flex-1 flex flex-col justify-start group/content"
                    >
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-3 block">
                        {product.type}
                      </span>
                      <h3 className="serif text-xl md:text-2xl font-bold mb-4 group-hover/content:text-indigo-600 transition-colors leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 line-clamp-3 md:line-clamp-4 leading-relaxed">
                        {product.description}
                      </p>
                    </a>
                    <a 
                      href={product.link} 
                      className="w-full py-4 md:py-5 bg-indigo-600/5 hover:bg-indigo-600/10 border-t border-white/40 text-indigo-700 font-bold flex items-center justify-center gap-3 transition-all duration-300 group/btn"
                    >
                      Ver mÃ¡s <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  );
}

