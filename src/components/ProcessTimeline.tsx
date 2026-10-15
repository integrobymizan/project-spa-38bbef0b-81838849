import React from "react";
import { PhoneCall, Code2, Rocket, CheckCircle } from "lucide-react";

export function ProcessTimeline() {
  const steps = [
    {
      num: "01",
      title: "Strategy & Voice Playbook",
      desc: "We analyze your business, FAQs, booking rules, and design a custom AI voice persona matched to your brand tone.",
      icon: PhoneCall,
      time: "Day 1 - 3",
    },
    {
      num: "02",
      title: "Snapshot & API Build",
      desc: "Our engineers configure your GoHighLevel pipelines, sub-60s SMS triggers, calendar integrations, and database scripts.",
      icon: Code2,
      time: "Day 4 - 8",
    },
    {
      num: "03",
      title: "Testing & Live Deployment",
      desc: "We conduct simulated call testing, phone line routing, team training, and launch your 24/7 AI workforce live.",
      icon: Rocket,
      time: "Day 9 - 14",
    },
  ];

  return (
    <section
      id="process"
      data-agent="process"
      className="py-20 relative bg-slate-950 border-b border-slate-800"
    >
      <div className="wrap max-w-5xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
            Speedy Onboarding
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100 mt-4 font-display">
            Live in Under <span className="text-amber-400">14 Business Days</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg">
            Our streamlined done-for-you deployment process gets your 24/7 AI receptionist and lead
            engines operational without interrupting your daily business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-amber-400">{s.num}</span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {s.time}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-slate-400 text-xs sm:text-sm leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  Done-For-You Execution
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
