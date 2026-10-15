import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
} from "lucide-react";
import { SERVICES_DATA, type ServiceItem } from "@/lib/services-data";

interface ServicesCarouselProps {
  onSelectService: (service: ServiceItem) => void;
}

export function ServicesCarousel({ onSelectService }: ServicesCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredServices =
    activeCategory === "all"
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  const total = filteredServices.length;
  const currentService = filteredServices[activeIndex % total] || filteredServices[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section
      id="services"
      data-agent="services"
      className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/80"
    >
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="wrap max-w-6xl mx-auto px-4 relative z-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5" />
            11 Done-For-You AI Systems
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-100 font-display">
            Interactive AI{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
              Service Carousel
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed">
            Drag, step through, or filter our 11 modular AI systems built to scale leads, respond in
            under 60 seconds, and automate your operations.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: "all", label: "All 11 Systems" },
              { id: "voice", label: "🎙️ Voice & Phone" },
              { id: "automation", label: "⚙️ CRM & Workflows" },
              { id: "ads", label: "📈 Paid Ads" },
              { id: "agency", label: "🤝 Agency Reseller" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setActiveIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105 font-bold"
                    : "bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Ring Stage Preview / Active Service Feature */}
        {currentService && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Card Stack / Stage */}
            <div className="lg:col-span-7 relative">
              <div className="relative aspect-[16/11] max-w-xl mx-auto rounded-3xl bg-slate-900/90 border border-amber-500/30 p-6 md:p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between group">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider">
                    {currentService.badge}
                  </span>
                  <span className="text-2xl font-black text-slate-600 font-mono">
                    #{currentService.num}
                  </span>
                </div>

                <div className="my-6">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {currentService.name}
                  </h3>
                  <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed">
                    {currentService.fullDesc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-800/80">
                    <p className="text-xs text-amber-400/90 font-medium italic flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0 text-amber-400" />"
                      {currentService.omniSays}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => onSelectService(currentService)}
                    className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-5 py-2.5 rounded-xl transition-all shadow-md hover:gap-3"
                  >
                    Explore System Breakdown
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                      aria-label="Previous Service"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-xs font-mono text-slate-400 px-1">
                      {activeIndex + 1}/{total}
                    </span>
                    <button
                      onClick={handleNext}
                      className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                      aria-label="Next Service"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: What's Included & Value Bullets */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                <h4 className="font-bold text-sm text-slate-200 uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  What's Included
                </h4>
                <ul className="space-y-3">
                  {currentService.includes.map((inc, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-xs md:text-sm text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <h4 className="font-semibold text-xs text-amber-400 uppercase tracking-wider font-mono mb-2">
                  Target Audience
                </h4>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {currentService.whoItsFor}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Thumbnail Grid Bar */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {filteredServices.map((srv, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveIndex(idx)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between h-24 ${
                  isSelected
                    ? "bg-slate-900 border-amber-400/80 shadow-lg shadow-amber-500/10 scale-105"
                    : "bg-slate-950/60 border-slate-850 hover:border-slate-700 text-slate-400"
                }`}
              >
                <span className="text-[10px] font-mono text-slate-400">#{srv.num}</span>
                <p
                  className={`text-xs font-bold line-clamp-2 ${isSelected ? "text-amber-300" : "text-slate-300"}`}
                >
                  {srv.name}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
