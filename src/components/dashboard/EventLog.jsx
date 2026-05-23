import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

const TYPE_COLORS = {
  init: "#00f5ff",
  agent: "#7c3aed",
  process: "#f59e0b",
  output: "#10b981",
  success: "#10b981",
  info: "rgba(255,255,255,0.4)",
  error: "#ef4444",
};

const TYPE_PREFIXES = {
  init: "INIT",
  agent: "AGNT",
  process: "PROC",
  output: "OUT ",
  success: "DONE",
  info: "INFO",
  error: "ERR ",
};

export default function EventLog({ logs }) {
  return (
    <div className="glass rounded-2xl p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Terminal size={14} className="text-cyan-400/60" />
        <span className="font-display font-bold text-sm text-white">Live Logs</span>
        {logs.length > 0 && (
          <motion.div
            className="ml-auto w-2 h-2 rounded-full bg-cyan-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 min-h-0">
        {logs.length === 0 ? (
          <div className="text-xs font-mono text-white/20 italic">
            Awaiting workflow initialization...
            <span className="cursor-blink">_</span>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-2 font-mono text-xs"
              >
                <span className="text-white/20 flex-shrink-0">{log.ts}</span>
                <span className="flex-shrink-0 font-bold" style={{ color: TYPE_COLORS[log.type] }}>
                  [{TYPE_PREFIXES[log.type] || "INFO"}]
                </span>
                <span className="text-white/60 leading-relaxed break-words min-w-0">{log.msg}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
