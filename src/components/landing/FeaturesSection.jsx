import { motion } from "framer-motion";
import { TrendingUp, PenTool, Aperture, Scissors, Rocket, BarChart3 } from "lucide-react";

const FEATURES = [
  {
    icon: TrendingUp,
    title: "TrendScout AI",
    desc: "Scans 50M+ signals across TikTok, YouTube, and Instagram to detect what's about to blow up.",
    color: "#00f5ff",
    delay: 0,
  },
  {
    icon: PenTool,
    title: "ScriptWriter AI",
    desc: "Generates scroll-stopping hooks, full scripts, and captions engineered for maximum retention.",
    color: "#7c3aed",
    delay: 0.08,
  },
  {
    icon: Aperture,
    title: "CreativeDirector AI",
    desc: "Defines the entire visual language — mood, transitions, pacing, B-roll, and color palette.",
    color: "#10b981",
    delay: 0.16,
  },
  {
    icon: Scissors,
    title: "Editor AI",
    desc: "Builds a scene-by-scene editing timeline with precise cut timing and audio cue placement.",
    color: "#f59e0b",
    delay: 0.24,
  },
  {
    icon: Rocket,
    title: "Publish AI",
    desc: "Computes the optimal posting window per platform and generates distribution strategies.",
    color: "#f97316",
    delay: 0.32,
  },
  {
    icon: BarChart3,
    title: "Analytics AI",
    desc: "Predicts virality, retention, and reach using ML models trained on 10M+ videos.",
    color: "#ec4899",
    delay: 0.40,
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-violet-500/60" />
            <span className="text-xs font-mono tracking-[0.3em] text-violet-400/80 uppercase">The Agent Network</span>
            <div className="h-px w-8 bg-violet-500/60" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Six agents. One pipeline.
            <span className="block text-white/40 font-light text-3xl mt-1">Zero manual work.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color, delay }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="glass rounded-2xl p-6 cursor-default group"
              style={{ borderColor: color + "20" }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: color + "15", border: `1px solid ${color}30` }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <h3 className="font-display font-bold text-white mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>

              <motion.div
                className="mt-4 h-0.5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}60, transparent)` }}
                initial={{ width: "20%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: delay + 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
