import React from "react";
import {
  Building2,
  Rocket,
  PhoneCall,
  Layers,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export function AudienceSection() {
  return (
    <section
      id="audiences"
      data-agent="audiences"
      className="py-20 relative bg-slate-950 border-b border-slate-800"
    >
      <div className="wrap max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1 rounded-full border border-amber-500/20">
            Tailored Solutions
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100 mt-4 font-display">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
              Local Businesses
            </span>{" "}
            &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
              Marketing Agencies
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg">
            Whether you want to stop losing calls in your local business or scale high-margin AI
            packages for agency clients, Omni AI Builders has your exact blueprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Local Business Owners */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 shadow-2xl relative overflow-hidden group hover:border-amber-400/60 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              For Local Businesses
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mt-1">
              Stop Missed Calls & Automate Lead Conversion
            </h3>
            <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed">
              Never let an after-hours call or busy job site cost you thousands in lost business.
              Our 24/7 AI Voice Receptionists answer in seconds, qualify leads, and book calendar
              appointments automatically.
            </p>

            <ul className="mt-6 space-y-3 border-t border-slate-800/80 pt-6">
              {[
                "24/7 Sub-500ms AI Voice Phone Receptionist",
                "Sub-60s Missed-Call Text-Back automation",
                "Automated 5-Star Google Review Booster",
                "High-ROI Meta & Google Ads paired to instant AI booking",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-5 py-2.5 rounded-xl transition-all shadow-md"
              >
                Schedule Local Business Call
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Marketing Agencies */}
          <div
            id="kk"
            data-agent="kk"
            className="p-8 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/30 shadow-2xl relative overflow-hidden group hover:border-blue-400/60 transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6" />
            </div>

            <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
              For Marketing Agencies
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-100 mt-1">
              White-Label AI Fulfillment & Knock Knock AI
            </h3>
            <p className="mt-3 text-slate-300 text-sm md:text-base leading-relaxed">
              Expand your agency's product menu instantly. Resell Knock Knock AI widget on client
              sites for $299+/mo MRR, or let our backend team handle 100% of complex AI builds
              white-labeled.
            </p>

            <ul className="mt-6 space-y-3 border-t border-slate-800/80 pt-6">
              {[
                "Knock Knock AI white-label sales agent widget",
                "100% Done-For-You AI fulfillment under your brand",
                "Custom GoHighLevel snapshot builds & automations",
                "Dedicated Slack channel with backend AI engineers",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-slate-100 bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-2.5 rounded-xl transition-all"
              >
                Apply for Agency Partner Program
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
