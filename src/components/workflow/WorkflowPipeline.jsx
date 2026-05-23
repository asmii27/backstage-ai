import { motion } from "framer-motion";
import { AGENTS } from "../../data/agents";
import { STATUS } from "../../hooks/useWorkflow";
import { TrendingUp, PenTool, Aperture, Scissors, Rocket, BarChart3 } from "lucide-react";

const ICONS = { TrendingUp, PenTool, Aperture, Scissors, Rocket, BarChart3 };

export default function WorkflowPipeline({ agentStates, activeAgentIndex, phase }) {
  const completedCount = Object.values(agentStates).filter((s) => s.status === STATUS.DONE).length;
  const progress = phase === "complete" ? 100 : Math.round((completedCount / AGENTS.length) * 100);

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-bold text-white">Pipeline</h3>
          <p className="text-xs text-white/40 font-mono mt-0.5">
            {phase === "idle" ? "Awaiting workflow" :
             phase === "complete" ? "All agents complete" :
             `Agent ${activeAgentIndex + 1} of ${AGENTS.length} active`}
          </p>
        </div>
        <div className="text-right">
          <div className="font-display font-bold text-2xl text-cyan-400">{progress}%</div>
          <div className="text-xs text-white/30 font-mono">complete</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-white/5 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, #00f5ff, #7c3aed, #10b981)" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Agent pipeline nodes */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {AGENTS.map((agent, i) => {
          const state = agentStates[agent.id];
          const status = state?.status || "idle";
          const isActive = i === activeAgentIndex;
          const isDone = status === STATUS.DONE;
          const isLive = status === STATUS.THINKING || status === STATUS.ACTIVE;
          const Icon = ICONS[agent.icon];

          return (
            <div key={agent.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center relative"
                  style={{
                    background: isDone || isLive ? agent.color + "20" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isDone || isLive ? agent.color + "50" : "rgba(255,255,255,0.08)"}`,
                  }}
                  animate={isLive ? {
                    boxShadow: [`0 0 0px ${agent.color}00`, `0 0 15px ${agent.color}60`, `0 0 0px ${agent.color}00`],
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Icon
                    size={16}
                    style={{ color: isDone || isLive ? agent.color : "rgba(255,255,255,0.2)" }}
                  />
                  {isLive && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                      style={{ background: agent.color }}
                      animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                    />
                  )}
                  {isDone && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 flex items-center justify-center"
                    >
                      <span className="text-[6px] text-black font-bold">✓</span>
                    </motion.div>
                  )}
                </motion.div>
                <span
                  className="text-[9px] font-mono text-center"
                  style={{ color: isDone || isLive ? agent.color + "cc" : "rgba(255,255,255,0.2)" }}
                >
                  {agent.name.replace(" AI", "")}
                </span>
              </div>

              {i < AGENTS.length - 1 && (
                <div className="flex-shrink-0 mx-1 mb-4">
                  <motion.div
                    className="w-6 h-px"
                    style={{
                      background: isDone
                        ? `linear-gradient(90deg, ${agent.color}60, ${AGENTS[i+1].color}40)`
                        : "rgba(255,255,255,0.08)",
                    }}
                    animate={isDone ? { opacity: [0.4, 1, 0.4] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
