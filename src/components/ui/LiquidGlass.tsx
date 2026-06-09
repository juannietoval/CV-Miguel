import React from "react";

// SVG Filter — montar una sola vez en el DOM (ya está en Header.tsx)
export const GlassFilter: React.FC = () => (
  <svg style={{ display: "none", position: "absolute" }} aria-hidden="true">
    <defs>
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves="1"
          seed="17"
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
          <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale="5"
          specularConstant="1"
          specularExponent="100"
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x="-200" y="-200" z="300" />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale="60"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
);

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Permite que los hijos desborden (necesario para dropdowns) */
  overflow?: "hidden" | "visible";
}

export const GlassEffect: React.FC<GlassEffectProps> = ({
  children,
  className = "",
  style = {},
  overflow = "hidden",
}) => {
  return (
    <div
      className={`relative transition-all duration-700 ${className}`}
      style={{
        overflow,
        boxShadow:
          "0 6px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(255,255,255,0.18) inset",
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        ...style,
      }}
    >
      {/* Capa 1: blur + distorsión — pointer-events:none para no bloquear clics */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
          zIndex: 0,
        }}
      />

      {/* Capa 2: tinte semitransparente — pointer-events:none */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          background: "rgba(255, 255, 255, 0.18)",
          zIndex: 1,
        }}
      />

      {/* Capa 3: bisel / reflejo interno — pointer-events:none */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255,255,255,0.55), inset -1px -1px 1px 1px rgba(255,255,255,0.25)",
          zIndex: 2,
        }}
      />

      {/* Contenido — sobre todas las capas decorativas */}
      <div className="relative" style={{ zIndex: 3 }}>
        {children}
      </div>
    </div>
  );
};
