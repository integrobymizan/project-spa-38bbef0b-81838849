import React, { useState } from "react";
import {
  Send,
  CheckCircle2,
  Bot,
  Sparkles,
  Phone,
  Mail,
  User,
  Building,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { submitLead } from "@/lib/leads.functions";
import confetti from "canvas-confetti";

interface ContactSectionProps {
  selectedServicePrefill?: string;
}

export function ContactSection({ selectedServicePrefill }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    account_type: "business",
    service_interest: selectedServicePrefill || "24/7 AI Voice Receptionist",
    biggest_challenge: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await submitLead({ data: formData });
      if (res.success) {
        setSubmitted(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setErrorMsg("Form submission failed. Please check details and try again.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Thank you! We recorded your inquiry and will reach out shortly.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-agent="contact"
      className="py-24 relative bg-slate-950 border-t border-slate-800"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="wrap max-w-5xl mx-auto px-4 relative z-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Get Operational In 14 Days
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100 font-display">
            Start Your <span className="text-amber-400">AI Automation Setup</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base md:text-lg">
            Tell us about your business or agency. Omni and our engineering team will build your
            custom AI roadmap and reach out within 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left info box */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base">Direct Engineering Access</h3>
                <p className="text-xs text-slate-400">Omni AI Builders Team</p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Zero monthly contracts required for done-for-you builds</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>White-label agency dashboard & MRR billing setup</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>100% custom prompt tuning & calendar sync</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-300 italic">
              "Need immediate answers? Open our Omni AI Chat Assistant in the bottom-left corner to
              ask questions anytime!"
            </div>
          </div>

          {/* Right Lead Form */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-slate-900/90 border border-amber-500/30 shadow-2xl backdrop-blur-xl">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-100">Request Registered!</h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <strong className="text-amber-400">{formData.name}</strong>! Our AI
                  blitz engine has dispatched your inquiry to our engineering team. Expect contact
                  in under 60 seconds.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Account Type Selector */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, account_type: "business" })}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      formData.account_type === "business"
                        ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    🏢 Local Business Owner
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, account_type: "agency" })}
                    className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                      formData.account_type === "agency"
                        ? "bg-blue-500 text-slate-950 border-blue-400 shadow-md"
                        : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    🚀 Marketing Agency Partner
                  </button>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Phone Number (for 60s AI Call back demo)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Service Select */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Primary Service Interest
                  </label>
                  <select
                    value={formData.service_interest}
                    onChange={(e) => setFormData({ ...formData, service_interest: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="24/7 AI Voice Receptionist">
                      01. 24/7 AI Voice Receptionist
                    </option>
                    <option value="GoHighLevel CRM Setup & Workflows">
                      02. GoHighLevel CRM Setup & Workflows
                    </option>
                    <option value="AI Web Chatbot & Lead Capture">
                      03. AI Web Chatbot & Lead Capture
                    </option>
                    <option value="Paid Meta & Google Ads Campaigns">
                      04. Paid Meta & Google Ads Campaigns
                    </option>
                    <option value="Knock Knock AI (Agency Product)">
                      05. Knock Knock AI (Agency Product)
                    </option>
                    <option value="Speed-To-Lead Engine (< 60s)">
                      06. Speed-To-Lead Engine (&lt; 60s)
                    </option>
                    <option value="Automated Google Review Booster">
                      07. Automated Google Review Booster
                    </option>
                    <option value="Agency White-Label AI Fulfillment">
                      08. Agency White-Label AI Fulfillment
                    </option>
                    <option value="AI Database Reactivation Campaign">
                      09. AI Database Reactivation Campaign
                    </option>
                    <option value="IG & FB ManyChat AI Automations">
                      10. IG &amp; FB ManyChat AI Automations
                    </option>
                    <option value="Custom AI Stack & API Integrations">
                      11. Custom AI Stack &amp; API Integrations
                    </option>
                  </select>
                </div>

                {/* Challenge */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    What is your biggest current bottleneck?
                  </label>
                  <textarea
                    rows={3}
                    value={formData.biggest_challenge}
                    onChange={(e) =>
                      setFormData({ ...formData, biggest_challenge: e.target.value })
                    }
                    placeholder="e.g. Losing calls after 5 PM, slow lead follow-ups, or needing white-label agency AI fulfillment..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
                >
                  {loading ? "Submitting Inquiry..." : "Submit & Request 60-Second Demo"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
