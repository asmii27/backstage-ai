import { motion } from "framer-motion";
import { Cpu, ArrowRight } from "lucide-react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import GlowButton from "../ui/GlowButton";

function Navbar({ onLaunch }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500/40 to-violet-600/40 border border-cyan-500/30 flex items-center justify-center">
            <Cpu size={14} className="text-cyan-300" />
          </div>
          <span className="font-display font-bold text-white tracking-tight">Backstage</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="text-sm text-white/40 hover:text-white transition-colors font-body hidden sm:block">
            Docs
          </a>
          <a href="#" className="text-sm text-white/40 hover:text-white transition-colors font-body hidden sm:block">
            Pricing
          </a>
          <GlowButton variant="primary" size="sm" onClick={onLaunch}>
            Open Dashboard
          </GlowButton>
        </div>
      </div>
    </nav>
  );
}

function CTASection({ onLaunch }) {
  return (
    <section className="py-32 px-6 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Your next viral piece
            <span className="block gradient-text">starts with one idea.</span>
          </h2>
          <p className="text-white/50 text-lg mb-10 font-body">
            Six AI agents. One workflow. Infinite content.
          </p>
          <GlowButton variant="solid" size="lg" onClick={onLaunch}>
            <span className="flex items-center gap-2">
              Launch Free Workflow
              <ArrowRight size={18} />
            </span>
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-cyan-400/40" />
          <span className="font-display text-sm text-white/30">Backstage</span>
        </div>
        <span className="text-xs font-mono text-white/20">The AI OS for Creators</span>
      </div>
    </footer>
  );
}

export default function LandingPage({ onLaunch }) {
  return (
    <div className="noise-overlay scanline">
      <Navbar onLaunch={onLaunch} />
      <HeroSection onLaunch={onLaunch} />
      <FeaturesSection />
      <CTASection onLaunch={onLaunch} />
      <Footer />
    </div>
  );
}
