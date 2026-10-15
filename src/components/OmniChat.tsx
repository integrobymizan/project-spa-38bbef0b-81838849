import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  Sparkles,
  Volume2,
  VolumeX,
  CheckCircle,
  ChevronRight,
  User,
} from "lucide-react";
import { SERVICES_DATA, type ServiceItem } from "@/lib/services-data";

interface OmniChatProps {
  onSelectService?: (service: ServiceItem) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

interface Message {
  id: string;
  sender: "omni" | "user";
  text: string;
  options?: { label: string; action: () => void; highlight?: boolean }[];
  recommendedServices?: ServiceItem[];
  timestamp: string;
}

export function OmniChat({ onSelectService, isOpenExternal, onCloseExternal }: OmniChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [userRole, setUserRole] = useState<"business" | "agency" | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          sender: "omni",
          text: "Hi! I'm Omni, your AI guide to Omni AI Builders. We set up 24/7 AI Receptionists, GoHighLevel CRM workflows, and agency white-label solutions. Are you exploring for your business or an agency?",
          options: [
            {
              label: "🏢 Local Business Owner",
              action: () => handleRoleSelect("business"),
              highlight: true,
            },
            {
              label: "🚀 Marketing Agency Partner",
              action: () => handleRoleSelect("agency"),
              highlight: true,
            },
            {
              label: "⚡ View All 11 Services",
              action: () => handleShowAllServices(),
            },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const speakText = (text: string) => {
    if (!voiceEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[\u{1F600}-\u{1F64F}]/gu, ""));
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
    if (msg.sender === "omni") {
      speakText(msg.text);
    }
  };

  const handleRoleSelect = (role: "business" | "agency") => {
    setUserRole(role);
    const roleLabel = role === "business" ? "Local Business Owner" : "Marketing Agency Partner";

    addMessage({
      id: Date.now().toString(),
      sender: "user",
      text: `I'm a ${roleLabel}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    setTimeout(() => {
      if (role === "business") {
        addMessage({
          id: (Date.now() + 1).toString(),
          sender: "omni",
          text: "Awesome! What's currently costing your business the most revenue right now?",
          options: [
            {
              label: "📞 Missed calls after-hours / busy jobs",
              action: () => handleProblemSelect("ai-voice-agent"),
            },
            {
              label: "⏱️ Slow lead follow-up (> 5 minutes)",
              action: () => handleProblemSelect("speed-to-lead-engine"),
            },
            {
              label: "⭐ Lack of 5-star Google Reviews",
              action: () => handleProblemSelect("google-review-booster"),
            },
            {
              label: "💸 Wasted ad budget on cold leads",
              action: () => handleProblemSelect("paid-ads-management"),
            },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      } else {
        addMessage({
          id: (Date.now() + 1).toString(),
          sender: "omni",
          text: "Welcome Agency Partner! We help agencies scale recurring revenue without technical overhead. What's your primary focus?",
          options: [
            {
              label: "🤖 Resell Knock Knock AI widget to clients",
              action: () => handleProblemSelect("knock-knock-ai"),
            },
            {
              label: "🛠️ White-Label AI fulfillment for client builds",
              action: () => handleProblemSelect("agency-white-label"),
            },
            {
              label: "🔥 Done-for-you GoHighLevel Snapshots",
              action: () => handleProblemSelect("gohl-automation"),
            },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }
    }, 600);
  };

  const handleProblemSelect = (serviceId: string) => {
    const service = SERVICES_DATA.find((s) => s.id === serviceId);
    if (!service) return;

    addMessage({
      id: Date.now().toString(),
      sender: "user",
      text: `Interested in solving: ${service.problemSolved}`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        sender: "omni",
        text: `Here is our top recommendation for you: **${service.name}**. ${service.omniSays}`,
        recommendedServices: [service],
        options: [
          {
            label: `👉 View ${service.name} Details`,
            action: () => {
              if (onSelectService) onSelectService(service);
            },
            highlight: true,
          },
          {
            label: "📋 Select in Contact Form",
            action: () => {
              const contactForm = document.getElementById("contact");
              if (contactForm) contactForm.scrollIntoView({ behavior: "smooth" });
            },
          },
          {
            label: "🔄 Start Over",
            action: () => handleReset(),
          },
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }, 600);
  };

  const handleShowAllServices = () => {
    addMessage({
      id: Date.now().toString(),
      sender: "user",
      text: "Show me all 11 AI automation services.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        sender: "omni",
        text: "Here is our complete roster of 11 AI systems designed to grow revenue & automate operations:",
        recommendedServices: SERVICES_DATA,
        options: [
          {
            label: "🎯 Help Me Pick The Best One",
            action: () => handleReset(),
          },
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      });
    }, 600);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "omni",
        text: "Let's start fresh! Are you exploring solutions for your local business or marketing agency?",
        options: [
          {
            label: "🏢 Local Business Owner",
            action: () => handleRoleSelect("business"),
            highlight: true,
          },
          {
            label: "🚀 Marketing Agency Partner",
            action: () => handleRoleSelect("agency"),
            highlight: true,
          },
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userQuery = inputText.trim();
    setInputText("");

    addMessage({
      id: Date.now().toString(),
      sender: "user",
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });

    setTimeout(() => {
      const q = userQuery.toLowerCase();
      let matched: ServiceItem[] = SERVICES_DATA.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q) ||
          s.badge.toLowerCase().includes(q),
      );

      const findS = (id: string): ServiceItem | null =>
        SERVICES_DATA.find((item) => item.id === id) || null;

      if (q.includes("call") || q.includes("voice") || q.includes("phone")) {
        const item = findS("ai-voice-agent");
        if (item) matched = [item];
      } else if (q.includes("ghl") || q.includes("gohighlevel") || q.includes("crm")) {
        const item = findS("gohl-automation");
        if (item) matched = [item];
      } else if (q.includes("chat") || q.includes("bot")) {
        const item = findS("ai-website-chat");
        if (item) matched = [item];
      } else if (q.includes("agency") || q.includes("white label") || q.includes("resell")) {
        const i1 = findS("knock-knock-ai");
        const i2 = findS("agency-white-label");
        const list: ServiceItem[] = [];
        if (i1) list.push(i1);
        if (i2) list.push(i2);
        matched = list;
      } else if (q.includes("ads") || q.includes("facebook") || q.includes("google")) {
        const item = findS("paid-ads-management");
        if (item) matched = [item];
      }

      if (matched.length > 0) {
        addMessage({
          id: (Date.now() + 1).toString(),
          sender: "omni",
          text: `Based on your question about "${userQuery}", here is what matches best:`,
          recommendedServices: matched,
          options: [
            {
              label: "📝 Request Custom Setup",
              action: () => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              },
              highlight: true,
            },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      } else {
        addMessage({
          id: (Date.now() + 1).toString(),
          sender: "omni",
          text: `Great question! Omni AI Builders custom-engineers AI voice agents, GoHighLevel workflows, and marketing bots. Would you like me to guide you based on your business type?`,
          options: [
            {
              label: "🏢 Guide My Local Business",
              action: () => handleRoleSelect("business"),
              highlight: true,
            },
            {
              label: "🚀 Agency Solutions",
              action: () => handleRoleSelect("agency"),
            },
          ],
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }
    }, 700);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-amber-500 text-slate-950 font-semibold shadow-2xl hover:bg-amber-400 transition-all hover:scale-105 group border border-amber-300/40"
          aria-label="Open Omni AI Chat Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
          </div>
          <span className="text-sm font-bold tracking-wide">Talk to Omni AI</span>
          <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded-full font-mono">24/7</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 left-4 z-50 w-[92vw] max-w-[420px] h-[580px] max-h-[82vh] bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                  Omni Guide
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                  Website Guide & AI Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  voiceEnabled
                    ? "text-amber-400 bg-amber-500/10"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title={voiceEnabled ? "Mute Speech" : "Enable Speech Synthesis"}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={handleClose}
                className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {msg.sender === "omni" ? (
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-amber-400" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}

                <div className="space-y-2 max-w-[82%]">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-amber-500 text-slate-950 font-medium rounded-tr-none"
                        : "bg-slate-800/90 text-slate-100 border border-slate-700/60 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {msg.recommendedServices && (
                    <div className="space-y-2 pt-1">
                      {msg.recommendedServices.map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => {
                            if (onSelectService) onSelectService(srv);
                          }}
                          className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30 hover:border-amber-400/80 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              {srv.badge}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">#{srv.num}</span>
                          </div>
                          <h4 className="font-bold text-xs text-slate-100 group-hover:text-amber-300 flex items-center justify-between">
                            {srv.name}
                            <ChevronRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                          </h4>
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                            {srv.shortDesc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.options && (
                    <div className="flex flex-col gap-1.5 pt-1">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={opt.action}
                          className={`text-left text-xs px-3 py-2 rounded-xl border transition-all flex items-center justify-between ${
                            opt.highlight
                              ? "bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/40 text-amber-300 font-medium"
                              : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <ChevronRight className="w-3 h-3 opacity-60" />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-slate-500 block px-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-slate-950/90 border-t border-slate-800 flex gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Omni about services, pricing, voice bots..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500/60"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-amber-500 text-slate-950 rounded-xl disabled:opacity-40 hover:bg-amber-400 transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
