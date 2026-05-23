import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, PenTool, Aperture, Scissors, Rocket, BarChart3, CheckCircle, Loader2,
} from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import { STATUS } from "../../hooks/useWorkflow";

const ICONS = { TrendingUp, PenTool, Aperture, Scissors, Rocket, BarChart3 };

export default function AgentCard({ agent, state, isActive, index }) {
  const Icon = ICONS[agent.icon] || TrendingUp;
  const { status, outputs = [], logs = [] } = state || {};

  const isLive = status === STATUS.THINKING || status === STATUS.ACTIVE;
  const isDone = status === STATUS.DONE;
  const isIdle = status === STATUS.IDLE;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        background: isLive
          ? `linear-gradient(135deg, ${agent.color}08, rgba(10,10,20,0.9))`
          : isDone
          ? `linear-gradient(135deg, ${agent.color}05, rgba(10,10,20,0.8))`
          : "rgba(10,10,20,0.6)",
        border: `1px solid ${isLive ? agent.color + "40" : isDone ? agent.color + "25" : "rgba(255,255,255,0.06)"}`,
        boxShadow: isLive ? `0 0 30px ${agent.color}20, inset 0 0 30px ${agent.color}05` : "none",
      }}
    >
      {/* Scan line for active agent */}
      {isLive && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${agent.color}, transparent)` }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: agent.color + "15", border: `1px solid ${agent.color}30` }}
              animate={isLive ? { boxShadow: [`0 0 10px ${agent.color}40`, `0 0 20px ${agent.color}60`, `0 0 10px ${agent.color}40`] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {isDone ? (
                <CheckCircle size={18} style={{ color: agent.color }} />
              ) : (
                <Icon size={18} style={{ color: isIdle ? agent.color + "60" : agent.color }} />
              )}
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-sm text-white">{agent.name}</span>
                {isLive && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 size={12} style={{ color: agent.color }} />
                  </motion.div>
                )}
              </div>
              <div className="text-xs text-white/40 font-mono">{agent.role}</div>
            </div>
          </div>
          <StatusBadge status={status || "idle"} />
        </div>

        {/* Thinking logs */}
        <AnimatePresence>
          {status === STATUS.THINKING && logs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 space-y-1 overflow-hidden"
            >
              {logs.slice(-3).map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs font-mono text-white/30 flex items-center gap-2"
                >
                  <span style={{ color: agent.color + "80" }}>›</span>
                  {log.text}
                </motion.div>
              ))}
              <span className="text-xs font-mono cursor-blink" style={{ color: agent.color + "60" }}>
                _
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Outputs */}
        <AnimatePresence>
          {outputs.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-1.5"
            >
              {outputs.map((output, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: agent.color }}>
                    ▸
                  </span>
                  <span className="text-xs text-white/70 font-body leading-snug">{output}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Idle state */}
        {isIdle && (
          <p className="text-xs text-white/25 font-mono italic">{agent.description}</p>
        )}

        {/* Progress bar */}
        {isLive && (
          <motion.div className="mt-4 h-0.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${agent.color}, ${agent.color}60)` }}
              animate={{ width: status === STATUS.ACTIVE ? "85%" : "40%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </motion.div>
        )}
        {isDone && (
          <div className="mt-4 h-0.5 rounded-full" style={{ background: `linear-gradient(90deg, ${agent.color}80, transparent)` }} />
        )}
      </div>
    </motion.div>
  );
}
