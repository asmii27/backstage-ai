import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, ChevronRight } from "lucide-react";
import GlowButton from "../ui/GlowButton";

const SUGGESTIONS = [
  "Viral productivity reel for students",
  "Morning routine transformation for young professionals",
  "Budget travel hacks under $500",
  "AI tools that changed my workflow forever",
  "5 mistakes every new gym-goer makes",
  "The truth about passive income in 2025",
];

export default function InputPanel({ onStart, onReset, phase }) {
  const [idea, setIdea] = useState("");
  const [suggIdx, setSuggIdx] = useState(0);

  const useSuggestion = () => {
    setIdea(SUGGESTIONS[suggIdx]);
    setSuggIdx((i) => (i + 1) % SUGGESTIONS.length);
  };

  const isRunning = phase === "running";
  const isComplete = phase === "complete";

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={14} className="text-cyan-400/60" />
        <span className="font-display font-bold text-sm text-white">Content Idea</span>
        {isRunning && (
          <motion.div
            className="ml-auto flex items-center gap-1.5"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono text-cyan-400">LIVE</span>
          </motion.div>
        )}
      </div>

      <div className="relative mb-4">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          disabled={isRunning}
          placeholder="Describe your content idea..."
          rows={3}
          className="w-full border rounded-xl px-4 py-3 text-sm font-body resize-none
            focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{
            background: "rgba(15, 15, 30, 0.8)",
            color: "rgba(255, 255, 255, 0.85)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            caretColor: "#00f5ff",
          }}
          onFocus={(e) => { e.target.style.borderColor = "rgba(0,245,255,0.4)"; }}
          onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
        />
        {/* Placeholder color via global CSS workaround */}
        <style>{`textarea::placeholder { color: rgba(255,255,255,0.25); }`}</style>
        {isRunning && (
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ border: "1px solid rgba(0,245,255,0.2)", boxShadow: "inset 0 0 20px rgba(0,245,255,0.03)" }} />
        )}
      </div>

      <AnimatePresence>
        {!isRunning && !isComplete && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={useSuggestion}
            className="flex items-center gap-1.5 text-xs text-white/30 hover:text-cyan-400/70
              font-mono mb-4 transition-colors cursor-pointer"
          >
            <ChevronRight size={12} />
            Try: "{SUGGESTIONS[suggIdx].slice(0, 40)}..."
          </motion.button>
        )}
      </AnimatePresence>

      <div className="flex gap-3">
        {isComplete ? (
          <GlowButton
            variant="ghost"
            className="flex-1"
            onClick={() => { onReset(); setIdea(""); }}
          >
            <span className="flex items-center justify-center gap-2">
              <RefreshCw size={14} />
              New Workflow
            </span>
          </GlowButton>
        ) : (
          <GlowButton
            variant="solid"
            className="flex-1"
            disabled={!idea.trim() || isRunning}
            onClick={() => onStart(idea)}
          >
            <span className="flex items-center justify-center gap-2">
              {isRunning ? (
                <>
                  <motion.div
                    className="w-3 h-3 rounded-full border border-white/60 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  Running...
                </>
              ) : (
                <>
                  <Sparkles size={14} />
                  Launch Workflow
                </>
              )}
            </span>
          </GlowButton>
        )}
      </div>

      <AnimatePresence>
        {(isRunning || isComplete) && idea && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-3 rounded-lg"
            style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.12)" }}
          >
            <div className="text-xs font-mono text-cyan-400/60 mb-1">Active Brief</div>
            <div className="text-xs font-body" style={{ color: "rgba(255,255,255,0.7)" }}>{idea}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
