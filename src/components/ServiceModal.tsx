import React from "react";
import { X, CheckCircle2, ArrowRight, Shield, HelpCircle, Bot } from "lucide-react";
import type { ServiceItem } from "@/lib/services-data";

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectForContact: (serviceName: string) => void;
}

export function ServiceModal({ service, onClose, onSelectForContact }: ServiceModalProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 bg-slate-950/80 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold">
                {service.badge}
              </span>
              <span className="text-xs font-mono text-slate-400">System #{service.num}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-100 font-display">
              {service.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-100 bg-slate-800/60 hover:bg-slate-800 rounded-full transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Overview */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-amber-400 mb-2 font-bold">
              System Overview
            </h4>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          {/* Omni Quote */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start">
            <Bot className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-300 block">Omni AI Insight</span>
              <p className="text-xs sm:text-sm text-slate-200 italic mt-0.5">
                "{service.omniSays}"
              </p>
            </div>
          </div>

          {/* Includes Grid */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-3 font-bold">
              What Is Included In Setup
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.includes.map((inc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-300">{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Steps */}
          <div>
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-3 font-bold">
              Deployment Roadmap
            </h4>
            <div className="space-y-2.5">
              {service.howItWorks.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/40 border border-slate-850"
                >
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Who It's For */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">Ideal For</h4>
            <p className="text-xs sm:text-sm text-slate-200">{service.whoItsFor}</p>
          </div>

          {/* FAQs */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-200 mb-3 font-bold flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                    <p className="font-bold text-xs sm:text-sm text-slate-100">{faq.q}</p>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Deploy in <span className="text-amber-400 font-bold font-mono">3-5 business days</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs sm:text-sm font-semibold hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelectForContact(service.name);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              Select for Setup Inquiry
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
