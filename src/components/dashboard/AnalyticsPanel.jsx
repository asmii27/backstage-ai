import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Eye, Heart, Share2, TrendingUp, Zap } from "lucide-react";
import { STATUS } from "../../hooks/useWorkflow";
import { AGENTS } from "../../data/agents";

const METRICS = [
  { label: "Predicted Views (48h)", value: "180K–340K", icon: Eye, color: "#00f5ff" },
  { label: "Est. Retention Rate", value: "73%", icon: TrendingUp, color: "#10b981" },
  { label: "Share Probability", value: "HIGH", icon: Share2, color: "#7c3aed" },
  { label: "Follower Conversion", value: "~2.3%", icon: Heart, color: "#ec4899" },
];

function ViralityMeter({ score }) {
  const pct = score / 100;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <motion.circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 42}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - pct) }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="font-display font-extrabold text-2xl"
            style={{ color }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {score}
          </motion.span>
          <span className="text-[9px] font-mono text-white/40">/ 100</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="font-display font-bold text-sm text-white">Virality Score</div>
        <div className="text-xs font-mono" style={{ color }}>
          {score >= 80 ? "🔥 VIRAL POTENTIAL" : score >= 60 ? "⚡ STRONG" : "📈 MODERATE"}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPanel({ agentStates, phase }) {
  const analyticsDone = agentStates?.analytics?.status === STATUS.DONE;
  const isComplete = phase === "complete";
  const showData = analyticsDone || isComplete;

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 size={14} className="text-pink-400/60" />
        <span className="font-display font-bold text-sm text-white">Analytics Forecast</span>
        {showData && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-auto text-xs font-mono text-emerald-400"
          >
            Prediction ready
          </motion.span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!showData ? (
          <motion.div key="empty" exit={{ opacity: 0 }} className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <Zap size={20} className="text-white/20" />
            </div>
            <p className="text-xs font-mono text-white/25">Analytics available after workflow completes</p>
          </motion.div>
        ) : (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-6">
              <ViralityMeter score={87} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {METRICS.map(({ label, value, icon: Icon, color }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="rounded-xl p-3"
                  style={{ background: color + "08", border: `1px solid ${color}20` }}
                >
                  <Icon size={12} style={{ color }} className="mb-1.5" />
                  <div className="font-display font-bold text-sm text-white">{value}</div>
                  <div className="text-[10px] text-white/40 font-mono leading-tight mt-0.5">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
