import { useState, useCallback, useRef } from "react";
import { AGENTS } from "../data/agents";

export const STATUS = {
  IDLE: "idle",
  THINKING: "thinking",
  ACTIVE: "active",
  DONE: "done",
  WAITING: "waiting",
};

const THINKING_PHRASES = [
  "Initializing neural pathways...",
  "Connecting to live data streams...",
  "Analyzing signal patterns...",
  "Cross-referencing audience data...",
  "Running inference model v4.2...",
  "Syncing with adjacent agents...",
  "Generating output vectors...",
  "Calibrating confidence thresholds...",
  "Task complete — passing relay.",
];

export function useWorkflow() {
  const [phase, setPhase] = useState("idle"); // idle | running | complete
  const [agentStates, setAgentStates] = useState(
    Object.fromEntries(AGENTS.map((a) => [a.id, { status: STATUS.IDLE, outputs: [], logs: [] }]))
  );
  const [globalLogs, setGlobalLogs] = useState([]);
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);
  const timeouts = useRef([]);

  const clearAll = () => timeouts.current.forEach(clearTimeout);

  const addGlobalLog = (msg, type = "info") => {
    setGlobalLogs((prev) => [
      { id: Date.now() + Math.random(), msg, type, ts: new Date().toLocaleTimeString("en", { hour12: false }) },
      ...prev,
    ].slice(0, 40));
  };

  const setAgentState = (id, patchOrFn) => {
    setAgentStates((prev) => {
      const current = prev[id] || { status: STATUS.IDLE, outputs: [], logs: [] };
      const patch = typeof patchOrFn === "function" ? patchOrFn(current) : patchOrFn;
      return { ...prev, [id]: { ...current, ...patch } };
    });
  };

  const runAgent = (agentIndex) => {
    if (agentIndex >= AGENTS.length) {
      setPhase("complete");
      addGlobalLog("All agents completed. Workflow success. 🎉", "success");
      return;
    }

    const agent = AGENTS[agentIndex];
    setActiveAgentIndex(agentIndex);
    addGlobalLog(`Activating ${agent.name}...`, "agent");

    // Set thinking
    setAgentState(agent.id, { status: STATUS.THINKING, outputs: [], logs: [] });

    // Add thinking logs progressively
    const phrases = THINKING_PHRASES.sort(() => 0.5 - Math.random()).slice(0, 4);
    phrases.forEach((phrase, i) => {
      const t = setTimeout(() => {
        setAgentState(agent.id, (prev) => ({
          logs: [...(prev.logs || []), { id: Date.now() + i, text: phrase }],
        }));
      }, i * 600);
      timeouts.current.push(t);
    });

    // Go active, show outputs
    const activeT = setTimeout(() => {
      setAgentState(agent.id, { status: STATUS.ACTIVE });
      addGlobalLog(`${agent.name} processing...`, "process");

      agent.outputs.forEach((output, i) => {
        const t = setTimeout(() => {
          setAgentState(agent.id, (prev) => ({
            outputs: [...(prev.outputs || []), output],
          }));
          if (i === 0) addGlobalLog(`${agent.name}: ${output}`, "output");
        }, i * 500);
        timeouts.current.push(t);
      });

      // Done, move to next
      const doneT = setTimeout(() => {
        setAgentState(agent.id, { status: STATUS.DONE });
        addGlobalLog(`${agent.name} complete ✓`, "success");
        const nextT = setTimeout(() => runAgent(agentIndex + 1), 800);
        timeouts.current.push(nextT);
      }, agent.outputs.length * 500 + 1200);
      timeouts.current.push(doneT);
    }, phrases.length * 600 + 400);
    timeouts.current.push(activeT);
  };

  const startWorkflow = useCallback((idea) => {
    clearAll();
    setPhase("running");
    setActiveAgentIndex(-1);
    setGlobalLogs([]);
    setAgentStates(
      Object.fromEntries(AGENTS.map((a) => [a.id, { status: STATUS.IDLE, outputs: [], logs: [] }]))
    );
    addGlobalLog(`Workflow initiated: "${idea}"`, "init");
    const t = setTimeout(() => runAgent(0), 600);
    timeouts.current.push(t);
  }, []);

  const reset = useCallback(() => {
    clearAll();
    setPhase("idle");
    setActiveAgentIndex(-1);
    setGlobalLogs([]);
    setAgentStates(
      Object.fromEntries(AGENTS.map((a) => [a.id, { status: STATUS.IDLE, outputs: [], logs: [] }]))
    );
  }, []);

  return { phase, agentStates, globalLogs, activeAgentIndex, startWorkflow, reset };
}
