import { motion } from "framer-motion";
import { Zap, ArrowRight, Users, TrendingUp, BarChart3 } from "lucide-react";
import GlowButton from "../ui/GlowButton";

const STATS = [
  { label: "Workflows Run", value: "2.4M+", icon: Zap },
  { label: "Creators", value: "18,000", icon: Users },
  { label: "Avg Virality Score", value: "84/100", icon: TrendingUp },
  { label: "Hours Saved/Week", value: "22hrs", icon: BarChart3 },
];

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemV = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroSection({ onLaunch }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        variants={containerV}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div variants={itemV} className="inline-flex items-center gap-2 mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/60" />
          <span className="text-xs font-mono tracking-[0.3em] text-cyan-400/80 uppercase">
            AI Agent OS for Creators
          </span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/60" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemV}
          className="font-display text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tight mb-6"
        >
          <span className="block text-white">Your content.</span>
          <span className="block gradient-text py-2">Orchestrated.</span>
          <span className="block text-white/50 text-5xl md:text-6xl font-light mt-2">
            Automated. Viral.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={itemV}
          className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body leading-relaxed"
        >
          Backstage deploys a team of specialized AI agents that research trends,
          write scripts, direct visuals, edit timelines, and publish — all from a
          single idea.
        </motion.p>

        {/* CTA */}
        <motion.div variants={itemV} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <GlowButton variant="solid" size="lg" onClick={onLaunch}>
            <span className="flex items-center gap-2">
              Launch Your Workflow
              <ArrowRight size={18} />
            </span>
          </GlowButton>
          <GlowButton variant="ghost" size="lg">
            Watch Demo
          </GlowButton>
        </motion.div>

        {/* Stats */}
        <motion.div variants={containerV} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(({ label, value, icon: Icon }) => (
            <motion.div
              key={label}
              variants={itemV}
              className="glass rounded-xl p-4 flex flex-col items-center gap-2"
              whileHover={{ scale: 1.03, borderColor: "rgba(0,245,255,0.2)" }}
            >
              <Icon size={18} className="text-cyan-400/60" />
              <div className="font-display font-bold text-xl text-white">{value}</div>
              <div className="text-xs text-white/40 font-mono">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500/40 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
