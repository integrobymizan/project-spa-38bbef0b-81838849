import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  Bot,
  Sparkles,
  Phone,
  ArrowRight,
  ShieldCheck,
  Play,
  Award,
  Zap,
  PhoneCall,
  CheckCircle,
} from "lucide-react";
import { Omni3DScene } from "@/components/Omni3DScene";
import { OmniChat } from "@/components/OmniChat";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { ServiceModal } from "@/components/ServiceModal";
import { AudienceSection } from "@/components/AudienceSection";
import { RoiCalculator } from "@/components/RoiCalculator";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import type { ServiceItem } from "@/lib/services-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [selectedServicePrefill, setSelectedServicePrefill] = useState<string>("");
  const [currentSectionKey, setCurrentSectionKey] = useState<string>("core");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSelectService = (service: ServiceItem) => {
    setSelectedServiceModal(service);
  };

  const handleSelectForContact = (serviceName: string) => {
    setSelectedServicePrefill(serviceName);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative font-sans">
      {/* 3D Interactive Robot Guide Scene */}
      <Omni3DScene currentSectionKey={currentSectionKey} onOmniClick={() => setIsChatOpen(true)} />

      {/* Floating Chat Assistant */}
      <OmniChat
        onSelectService={handleSelectService}
        isOpenExternal={isChatOpen}
        onCloseExternal={() => setIsChatOpen(false)}
      />

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedServiceModal}
        onClose={() => setSelectedServiceModal(null)}
        onSelectForContact={handleSelectForContact}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="wrap max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Bot className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <span className="font-black text-lg font-display tracking-tight text-slate-100">
              Omni <span className="text-amber-400">AI Builders</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-slate-300">
            <a href="#services" className="hover:text-amber-400 transition-colors">
              11 Services
            </a>
            <a href="#audiences" className="hover:text-amber-400 transition-colors">
              Audiences
            </a>
            <a href="#calculator" className="hover:text-amber-400 transition-colors">
              ROI Calculator
            </a>
            <a href="#process" className="hover:text-amber-400 transition-colors">
              Timeline
            </a>
            <a href="#faq" className="hover:text-amber-400 transition-colors">
              FAQ
            </a>
          </nav>

          <a
            href="#contact"
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
          >
            Get AI Setup
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="hero"
        data-agent="core"
        className="relative py-20 lg:py-32 overflow-hidden border-b border-slate-800"
      >
        <div className="wrap max-w-6xl mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-6">
              <Sparkles className="w-4 h-4" />
              Meet "Omni" — Your 3D AI Assistant Guide
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-[1.1] font-display">
              24/7 AI Voice Receptionists &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                Done-For-You AI
              </span>{" "}
              Systems
            </h1>

            <p className="mt-6 text-slate-300 text-base sm:text-xl leading-relaxed">
              We deploy custom AI voice receptionists, sub-60-second speed-to-lead blitz engines,
              GoHighLevel workflows, and agency white-label products in under 14 days.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setIsChatOpen(true)}
                className="px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-extrabold text-sm sm:text-base hover:bg-amber-400 transition-all shadow-xl shadow-amber-500/25 flex items-center gap-2 hover:gap-3"
              >
                <Bot className="w-5 h-5" />
                Talk To Omni AI Assistant
              </button>

              <a
                href="#services"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-slate-200 font-bold text-sm sm:text-base hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                Explore 11 Services
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </a>
            </div>

            {/* Social Proof Trust Badges */}
            <div className="mt-12 pt-8 border-t border-slate-850 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>&lt; 500ms Voice Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>GoHighLevel Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>100% White-Label Agency</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D SERVICES CAROUSEL SECTION */}
      <ServicesCarousel onSelectService={handleSelectService} />

      {/* AUDIENCE SHOWCASE (Local Business vs Agency) */}
      <AudienceSection />

      {/* MISSED LEAD ROI CALCULATOR */}
      <RoiCalculator />

      {/* DEPLOYMENT PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* FAQ SECTION */}
      <FaqSection />

      {/* CONTACT & LEAD FORM */}
      <ContactSection selectedServicePrefill={selectedServicePrefill} />

      {/* FOOTER */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900 text-slate-500 text-xs text-center">
        <div className="wrap max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-display font-bold text-slate-300 text-sm">
            <Bot className="w-4 h-4 text-amber-400" />
            Omni AI Builders © 2026. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#services" className="hover:text-slate-300">
              Services
            </a>
            <a href="#calculator" className="hover:text-slate-300">
              ROI Calculator
            </a>
            <a href="#contact" className="hover:text-slate-300">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
