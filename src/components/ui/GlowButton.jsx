import { motion } from "framer-motion";

export default function GlowButton({ children, onClick, variant = "primary", className = "", disabled = false, size = "md" }) {
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };

  const variants = {
    primary: {
      base: "bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400",
      glow: "0 0 20px rgba(0,245,255,0.3)",
      hoverGlow: "0 0 40px rgba(0,245,255,0.5), 0 0 80px rgba(0,245,255,0.2)",
    },
    plasma: {
      base: "bg-violet-500/10 border border-violet-500/40 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400",
      glow: "0 0 20px rgba(124,58,237,0.3)",
      hoverGlow: "0 0 40px rgba(124,58,237,0.5)",
    },
    solid: {
      base: "bg-gradient-to-r from-cyan-500/80 to-violet-600/80 text-white border border-white/10 hover:from-cyan-400/90 hover:to-violet-500/90",
      glow: "0 0 30px rgba(0,245,255,0.3)",
      hoverGlow: "0 0 50px rgba(0,245,255,0.5), 0 0 100px rgba(124,58,237,0.3)",
    },
    ghost: {
      base: "border border-white/10 text-white/60 hover:text-white hover:border-white/30",
      glow: "none",
      hoverGlow: "none",
    },
  };

  const v = variants[variant];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02, boxShadow: v.hoverGlow }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      initial={{ boxShadow: v.glow }}
      className={`
        relative font-display font-semibold tracking-wide rounded-lg
        transition-all duration-300 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        ${sizes[size]} ${v.base} ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
