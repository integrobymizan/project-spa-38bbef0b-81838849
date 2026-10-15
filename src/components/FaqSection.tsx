import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the 24/7 AI Voice Receptionist work?",
      a: "Our AI voice receptionist connects directly to your business phone line or PBX. When someone calls after-hours or during busy times, the AI answers instantly with natural human sub-500ms voice, answers questions, qualifies callers, and books appointments onto your calendar.",
    },
    {
      q: "What is Knock Knock AI for marketing agencies?",
      a: "Knock Knock AI is our white-label sales agent widget built for digital agencies. Agencies rebrand the widget, install it on client websites, and charge clients a monthly subscription ($199 - $499/mo) for automated website lead capture.",
    },
    {
      q: "How fast is the Missed-Call Text-Back & Speed-to-Lead?",
      a: "Our automated blitz engine fires an instant SMS or voice call within 15 to 60 seconds of a missed call or new web form submission. Studies show contacting leads within 5 minutes increases conversion rates by 391%.",
    },
    {
      q: "Do I need technical skills or a dedicated developer?",
      a: "Not at all. Omni AI Builders delivers 100% done-for-you builds. We handle system setup, prompt engineering, GHL snapshot configuration, and calendar sync. You get full video walkthroughs and team onboarding.",
    },
    {
      q: "How long does deployment take?",
      a: "Standard setups (voice agents, GHL workflows, review boosters) take between 3 and 14 business days from kickoff call to live operational status.",
    },
  ];

  return (
    <section
      id="faq"
      data-agent="faq"
      className="py-20 relative bg-slate-900/60 border-b border-slate-800"
    >
      <div className="wrap max-w-4xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            Common Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-100 font-display">
            Frequently Asked <span className="text-amber-400">Questions</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm md:text-base">
            Everything you need to know about our AI voice receptionists, agency white-label
            fulfillment, and deployment timelines.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-950/80 border border-slate-800 overflow-hidden transition-colors hover:border-slate-700"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-100 hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
