import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cpu, CheckCircle2 } from "lucide-react";
import { AGENTS } from "../../data/agents";
import { useWorkflow } from "../../hooks/useWorkflow";
import AgentCard from "../agents/AgentCard";
import WorkflowPipeline from "../workflow/WorkflowPipeline";
import EventLog from "./EventLog";
import AnalyticsPanel from "./AnalyticsPanel";
import InputPanel from "./InputPanel";
import GlowButton from "../ui/GlowButton";

export default function Dashboard({ onBack }) {
  const { phase, agentStates, globalLogs, activeAgentIndex, startWorkflow, reset } = useWorkflow();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <header className="sticky top-0 z-50 glass border-b border-white/6">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-white/40 hover:text-white flex items-center gap-1.5 text-sm transition-colors cursor-pointer font-mono"
            >
              <ArrowLeft size={14} />
              Back
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <Cpu size={12} className="text-cyan-400" />
              </div>
              <span className="font-display font-bold text-white">Backstage</span>
              <span className="text-xs font-mono text-white/30">Command Center</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {phase === "complete" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 text-xs font-mono text-emerald-400"
              >
                <CheckCircle2 size={13} />
                Workflow Complete
              </motion.div>
            )}
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
            </div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <main className="flex-1 max-w-screen-xl mx-auto w-full px-6 py-6">
        <div className="grid grid-cols-12 gap-4 h-full">

          {/* Left col: Input + Pipeline + Logs */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
            <InputPanel onStart={startWorkflow} onReset={reset} phase={phase} />
            <WorkflowPipeline agentStates={agentStates} activeAgentIndex={activeAgentIndex} phase={phase} />
            <div className="flex-1 min-h-64">
              <EventLog logs={globalLogs} />
            </div>
          </div>

          {/* Center: Agent cards */}
          <div className="col-span-12 lg:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
              {AGENTS.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  state={agentStates[agent.id]}
                  isActive={index === activeAgentIndex}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Right: Analytics */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            <AnalyticsPanel agentStates={agentStates} phase={phase} />

            {/* Quick tips */}
            <div className="glass rounded-2xl p-5">
              <div className="text-xs font-mono text-white/30 mb-3">SYSTEM</div>
              <div className="space-y-2">
                {[
                  { k: "Agents", v: `${AGENTS.length} active` },
                  { k: "Model", v: "BS-4.2 Ultra" },
                  { k: "Data sources", v: "50M+ signals" },
                  { k: "Latency", v: "~1.2s avg" },
                ].map(({ k, v }) => (
                  <div key={k} className="flex justify-between text-xs">
                    <span className="font-mono text-white/30">{k}</span>
                    <span className="font-mono text-white/60">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
