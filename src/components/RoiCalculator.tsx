import React, { useState } from "react";
import {
  Calculator,
  DollarSign,
  PhoneMissed,
  Clock,
  ArrowRight,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export function RoiCalculator() {
  const [weeklyCalls, setWeeklyCalls] = useState<number>(25);
  const [avgTicket, setAvgTicket] = useState<number>(450);
  const [closeRate, setCloseRate] = useState<number>(30);

  // Math calculation
  // Research shows ~30% of calls to local service businesses go unanswered or to voicemail
  const missedCallsPerMonth = Math.round(weeklyCalls * 4 * 0.3);
  const potentialLeadsLost = Math.round(missedCallsPerMonth * (closeRate / 100));
  const monthlyRevenueLost = potentialLeadsLost * avgTicket;
  const annualRevenueLost = monthlyRevenueLost * 12;

  return (
    <section
      id="calculator"
      data-agent="calculator"
      className="py-20 relative bg-slate-900/80 border-b border-slate-800"
    >
      <div className="wrap max-w-5xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <Calculator className="w-3.5 h-3.5" />
            Revenue Loss Calculator
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-display">
            What Are <span className="text-amber-400">Slow Replies & Missed Calls</span> Costing
            You?
          </h2>
          <p className="mt-3 text-slate-400 text-sm md:text-base">
            Adjust the sliders below to calculate how much revenue escapes your sales pipeline every
            single month due to unanswered calls and delayed lead follow-ups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-950/90 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Sliders Input */}
          <div className="lg:col-span-7 space-y-6">
            {/* Slider 1 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <PhoneMissed className="w-4 h-4 text-amber-400" />
                  Inbound Calls Received Per Week
                </label>
                <span className="text-sm font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                  {weeklyCalls} calls/wk
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={weeklyCalls}
                onChange={(e) => setWeeklyCalls(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 2 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  Average Customer Value / Ticket Price
                </label>
                <span className="text-sm font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  ${avgTicket.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="50"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            {/* Slider 3 */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Estimated Sales Close Rate
                </label>
                <span className="text-sm font-mono font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                  {closeRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                step="5"
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full accent-blue-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Industry average: 30% of incoming calls to local businesses go unanswered or go to
                voicemail during peak hours or after 5 PM.
              </span>
            </div>
          </div>

          {/* Results Output Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 to-slate-900 border border-amber-500/40 text-center flex flex-col justify-between h-full">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Estimated Lost Revenue
              </span>
              <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono mt-2 tracking-tight">
                ${monthlyRevenueLost.toLocaleString()}
                <span className="text-xs text-slate-400 font-normal block font-sans mt-1">
                  / month
                </span>
              </div>

              <div className="mt-4 pt-4 border-t border-amber-500/20 text-xs text-slate-300">
                <span className="text-slate-400">Annualized Leakage:</span>{" "}
                <strong className="text-slate-100 font-mono text-base ml-1">
                  ${annualRevenueLost.toLocaleString()} / yr
                </strong>
              </div>

              <div className="mt-4 text-xs text-slate-400 space-y-1 text-left bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <div className="flex justify-between">
                  <span>Estimated missed calls / mo:</span>
                  <strong className="text-slate-200">{missedCallsPerMonth} calls</strong>
                </div>
                <div className="flex justify-between">
                  <span>Lost customers / mo:</span>
                  <strong className="text-amber-400">{potentialLeadsLost} clients</strong>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                Plug This Revenue Leak Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
