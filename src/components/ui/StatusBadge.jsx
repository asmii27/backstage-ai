import { motion } from "framer-motion";

const configs = {
  idle: { label: "Idle", color: "text-white/30", dot: "bg-white/20", pulse: false },
  waiting: { label: "Queued", color: "text-white/40", dot: "bg-white/30", pulse: false },
  thinking: { label: "Thinking", color: "text-amber-300", dot: "bg-amber-400", pulse: true },
  active: { label: "Processing", color: "text-cyan-300", dot: "bg-cyan-400", pulse: true },
  done: { label: "Complete", color: "text-emerald-300", dot: "bg-emerald-400", pulse: false },
};

export default function StatusBadge({ status }) {
  const c = configs[status] || configs.idle;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-mono ${c.color}`}>
      <span className="relative flex h-2 w-2">
        {c.pulse && (
          <motion.span
            className={`absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-75`}
            animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${c.dot}`} />
      </span>
      {c.label}
    </span>
  );
}
