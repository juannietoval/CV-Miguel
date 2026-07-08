import React from "react";
import { motion } from "motion/react";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay en segundos para el stagger de entrada
}

/**
 * Tarjeta reutilizable con estilo Liquid Glass + animaciones Framer Motion.
 * Reemplaza el patrón: bg-white/20 border border-white/30 hover:bg-white/40
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -3, scale: 1.005 }}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${className}`}
      style={{
        boxShadow:
          "0 2px 12px rgba(31,38,135,0.06), 0 0 0 1px rgba(255,255,255,0.3) inset",
      }}
    >
      {/* Fondo de cristal */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          backdropFilter: "blur(8px) saturate(150%)",
          WebkitBackdropFilter: "blur(8px) saturate(150%)",
          background: "rgba(255,255,255,0.18)",
          zIndex: 0,
        }}
      />

      {/* Inner glow en hover */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(99,102,241,0.08) 0%, transparent 60%)",
          zIndex: 1,
        }}
      />

      {/* Bisel */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          boxShadow:
            "inset 1px 1px 0px rgba(255,255,255,0.5), inset -1px -1px 0px rgba(255,255,255,0.15)",
          zIndex: 2,
        }}
      />

      {/* Contenido */}
      <div className="relative" style={{ zIndex: 3 }}>
        {children}
      </div>
    </motion.div>
  );
};

/**
 * Botón de enlace externo estilizado con Liquid Glass.
 * Reemplaza el patrón: bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-200/30
 */
export const GlassLinkButton: React.FC<{
  href: string;
  children: React.ReactNode;
}> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-[1.02] active:scale-95 text-indigo-700 hover:text-white hover:bg-indigo-600"
    style={{
      background: "rgba(99,102,241,0.1)",
      border: "1px solid rgba(99,102,241,0.2)",
      boxShadow: "0 1px 4px rgba(99,102,241,0.08)",
    }}
  >
    {children}
  </a>
);

/**
 * Badge de tipo/categoría estilizado con cristal.
 * Reemplaza el patrón: bg-indigo-50 text-indigo-600
 */
export const GlassBadge: React.FC<{
  children: React.ReactNode;
  color?: "indigo" | "blue" | "pink" | "green";
}> = ({ children, color = "indigo" }) => {
  const colorMap = {
    indigo: "text-indigo-700 bg-indigo-500/10 border-indigo-300/30",
    blue: "text-blue-700 bg-blue-500/10 border-blue-300/30",
    pink: "text-pink-700 bg-pink-500/10 border-pink-300/30",
    green: "text-green-700 bg-green-500/10 border-green-300/30",
  };
  return (
    <span
      className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border backdrop-blur-sm ${colorMap[color]}`}
    >
      {children}
    </span>
  );
};
