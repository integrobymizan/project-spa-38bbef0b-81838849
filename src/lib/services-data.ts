export interface ServiceItem {
  id: string;
  num: string;
  name: string;
  badge: string;
  shortDesc: string;
  fullDesc: string;
  includes: string[];
  howItWorks: string[];
  whoItsFor: string;
  faqs: { q: string; a: string }[];
  omniSays: string;
  problemSolved: string;
  category: "automation" | "voice" | "ads" | "agency";
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "ai-voice-agent",
    num: "01",
    name: "24/7 AI Voice Receptionist",
    badge: "Voice & Phone",
    shortDesc:
      "Never miss a customer call again. Custom AI receptionist answers in human voice, qualifies leads, schedules appointments directly into your calendar.",
    fullDesc:
      "Our 24/7 AI Voice Receptionist handles inbound calls with zero latency and ultra-realistic human tone. It answers FAQs, filters out spam, captures caller details, and books appointments directly onto Google Calendar or GoHighLevel CRM.",
    includes: [
      "Custom voice persona & accent matching",
      "Instant calendar booking & availability sync",
      "Lead qualification script & branch logic",
      "Call transcription & instant SMS summary to owner",
      "Phone number routing & existing PBX integration",
    ],
    howItWorks: [
      "We design your custom voice model and conversation playbook",
      "We train the AI on your price list, hours, and booking rules",
      "We forward your phone line or assign a new dedicated number",
      "Omni handles 100+ concurrent calls with zero wait times",
    ],
    whoItsFor:
      "Dental clinics, plumbers, HVAC, lawyers, medspas & home service companies losing revenue from missed calls.",
    faqs: [
      {
        q: "Does it sound like a real person?",
        a: "Yes, powered by natural sub-500ms voice synthesis with natural pauses and warm tone.",
      },
      {
        q: "Can it handle complex booking rules?",
        a: "Absoluty. It syncs real-time calendar slots and handles reschedule requests.",
      },
    ],
    omniSays:
      "Missed calls cost average local businesses $4,200/month. My voice receptionist handles calls 24/7!",
    problemSolved: "Missed phone calls after hours or during busy jobs",
    category: "voice",
  },
  {
    id: "gohl-automation",
    num: "02",
    name: "GoHighLevel CRM Setup & Workflows",
    badge: "CRM & Automation",
    shortDesc:
      "Complete end-to-end GoHighLevel buildout: pipelines, automated SMS/email follow-ups, miss-call text-back, and review request automation.",
    fullDesc:
      "We turn GoHighLevel into an automated sales machine for your business. From custom snapshots and pipeline stages to multi-channel nurture campaigns that turn cold leads into paid clients while you sleep.",
    includes: [
      "Custom sub-account setup & domain setup",
      "Missed-Call Text-Back automation (< 60s response)",
      "Multi-channel drip campaigns (SMS, Email, WhatsApp)",
      "Automated Google Review request engine",
      "Pipeline stage tracking & revenue dashboards",
    ],
    howItWorks: [
      "Map out your sales journey & lead source integrations",
      "Build custom triggers, email templates & SMS copy",
      "Launch automated lead nurture & review booster",
      "Train your team with 1-on-1 video walkthroughs",
    ],
    whoItsFor:
      "Local businesses needing structured lead follow-up & marketing agencies seeking scalable GHL snapshots.",
    faqs: [
      {
        q: "What if I already have GoHighLevel?",
        a: "We audit, optimize, or rebuild existing snapshots for maximum conversion.",
      },
      {
        q: "How fast is Missed-Call Text-Back?",
        a: "Fires instantly within 15 seconds of an unanswered call.",
      },
    ],
    omniSays:
      "5minute follow-up increases lead conversion by 391%. Let's build your automatic lead engine!",
    problemSolved: "Slow lead follow-up & disorganized CRM pipelines",
    category: "automation",
  },
  {
    id: "ai-website-chat",
    num: "03",
    name: "AI Web Chatbot & Lead Capture",
    badge: "Chatbot & Web",
    shortDesc:
      "Smart AI widget embedded on your website to answer questions, capture qualified contact details, and trigger CRM workflows live.",
    fullDesc:
      "Turn anonymous web visitors into high-intent leads. Our AI chatbot is trained on your exact business knowledgebase, services, and pricing to guide visitors seamlessly into your sales funnel.",
    includes: [
      "Custom AI chatbot matching your brand aesthetic",
      "Direct integration with GHL, Hubspot, or webhook",
      "Live human agent handoff notification",
      "Multi-language support (English, Spanish, etc.)",
      "Interactive product & quote selector",
    ],
    howItWorks: [
      "Ingest your website content, FAQs, and brochures",
      "Define intent routing & lead qualification rules",
      "Embed lightweight single script snippet on your site",
      "Monitor conversations and review monthly sentiment reports",
    ],
    whoItsFor:
      "Any business with web traffic looking to convert 3x-5x more visitors into booked appointments.",
    faqs: [
      {
        q: "Can it handle custom pricing questions?",
        a: "Yes! It provides estimate ranges or collects specifics for a custom quote.",
      },
      {
        q: "Will it work on WordPress/Shopify/Wix?",
        a: "Works on every website platform with a simple 1-line script tag.",
      },
    ],
    omniSays:
      "I can answer customer questions 24/7 on your site and collect phone numbers automatically!",
    problemSolved: "High website bounce rate & lost visitor leads",
    category: "automation",
  },
  {
    id: "paid-ads-management",
    num: "04",
    name: "Paid Meta & Google Ads Campaigns",
    badge: "Paid Ads",
    shortDesc:
      "High-ROI Facebook, Instagram & Google Search campaigns coupled directly with AI speed-to-lead instant response.",
    fullDesc:
      "Stop burning ad budget on un-followed leads. We build high-converting ad copy, visual assets, and pair ad clicks directly to immediate AI follow-up so every dollar yields trackable revenue.",
    includes: [
      "Campaign strategy, ad creative & copy generation",
      "Hyper-local geo-targeting & demographic tuning",
      "Direct integration to AI instant SMS/Voice follow-up",
      "A/B split testing on ad angles & audience hooks",
      "Transparent ROI dashboard with cost-per-lead breakdown",
    ],
    howItWorks: [
      "Identify your highest profit services & audience offers",
      "Build high-converting ad assets and landing hooks",
      "Hook ad leads directly into instant AI conversation",
      "Scale budget on winning ad sets weekly",
    ],
    whoItsFor: "Businesses ready to scale revenue predictably through paid acquisition.",
    faqs: [
      {
        q: "What is the recommended ad budget?",
        a: "We suggest starting with $1,000 - $3,000/mo in ad spend for local markets.",
      },
      {
        q: "How quickly do we see leads?",
        a: "Campaigns typically start generating qualified leads within 48 hours of launch.",
      },
    ],
    omniSays:
      "Ads without instant follow-up waste 60% of budget. We connect ads straight into instant AI booking!",
    problemSolved: "Wasted ad budget and cold lead conversion",
    category: "ads",
  },
  {
    id: "knock-knock-ai",
    num: "05",
    name: "Knock Knock AI (Agency Product)",
    badge: "Agency Fulfillment",
    shortDesc:
      "Turnkey sales agent widget for marketing agencies to white-label and resell to all their local business clients.",
    fullDesc:
      "Knock Knock AI puts intelligent sales agents directly on your clients' websites. Agency partners rebrand it, set their own pricing, and generate monthly recurring revenue (MRR) effortlessly.",
    includes: [
      "100% White-label agency dashboard & custom domain",
      "Client sub-account management & usage caps",
      "Automated sales demo script & pitch deck",
      "Stripe integration for automated client billing",
      "24/7 technical support & SLA guarantee",
    ],
    howItWorks: [
      "We set up your white-label agency portal",
      "Deploy Knock Knock widget snippets to client websites",
      "Set your client pricing ($199 - $499/mo per client)",
      "Collect monthly subscription revenue automatically",
    ],
    whoItsFor:
      "Marketing agencies, GHL SaaS resellers, and digital consultants wanting high-margin recurring SaaS income.",
    faqs: [
      {
        q: "Can we rebrand the chat widget?",
        a: "Yes, custom logo, colors, avatar, domain, and widget labels.",
      },
      {
        q: "Is there a limit on client accounts?",
        a: "Scalable tiers from 5 accounts up to unlimited agency licenses.",
      },
    ],
    omniSays: "Agencies love Knock Knock AI! It's an instant $300+/month MRR add-on per client.",
    problemSolved: "Low agency margins & client churn",
    category: "agency",
  },
  {
    id: "speed-to-lead-engine",
    num: "06",
    name: "Speed-To-Lead Engine (< 60s)",
    badge: "Lead Speed",
    shortDesc:
      "Multi-channel blitz system triggering SMS, email, and AI voice calls within 60 seconds of form submission.",
    fullDesc:
      "The probability of qualifying a lead is 21 times higher when contacted within 5 minutes. Our system triggers an instant multi-touch sequence the exact second a web form or ad lead arrives.",
    includes: [
      "Sub-60-second automated initial contact trigger",
      "Intelligent lead distribution to sales reps or AI caller",
      "Automatic voicemail drop & SMS follow-up",
      "Lead status tracking & notification alerts",
      "Fallback retry schedule over 7 days",
    ],
    howItWorks: [
      "Connect all web forms, Facebook Lead Ads, and landing pages",
      "Deploy sub-minute SMS + AI Voice call-out logic",
      "Connect live callers instantly to business reps",
      "Log conversion performance metrics in real time",
    ],
    whoItsFor: "High-ticket service businesses, real estate, roofing, and financial services.",
    faqs: [
      {
        q: "What if the lead submits at 2 AM?",
        a: "Custom AI rules answer immediately or queue an early morning priority SMS.",
      },
    ],
    omniSays: "Leads contacted under 60 seconds convert 78% of the time! Speed is everything.",
    problemSolved: "Leads cooling off while waiting for manual call backs",
    category: "automation",
  },
  {
    id: "google-review-booster",
    num: "07",
    name: "Automated Google Review Booster",
    badge: "Reputation",
    shortDesc:
      "Automate post-service review requests via SMS & WhatsApp to dominate your local Google Maps 3-Pack.",
    fullDesc:
      "Higher Google ratings mean more organic calls. Automatically request reviews right after job completion, filter feedback, and build a 5-star reputation on autopilot.",
    includes: [
      "Triggered review requests after invoice payment or job done",
      "Smart feedback filter (private routing for unhappy customers)",
      "Direct Google Business Profile link generation",
      "Automated follow-up reminder if review isn't left",
      "Reputation monitoring dashboard",
    ],
    howItWorks: [
      "Sync with your CRM or job completion system",
      "Send personalized SMS request with 1-click Google link",
      "Collect 5-star reviews directly on Google Maps",
      "Escalate any sub-4 star feedback directly to manager",
    ],
    whoItsFor: "Local service providers who want to rank #1 on Google Maps in their city.",
    faqs: [
      {
        q: "Does this violate Google policies?",
        a: "No, it complies fully with Google review guidelines while optimizing customer experience.",
      },
    ],
    omniSays: "Google Maps 3-Pack drives 70% of local calls. Let's get you 50+ new 5-star reviews!",
    problemSolved: "Low review count and poor Google Maps visibility",
    category: "automation",
  },
  {
    id: "agency-white-label",
    num: "08",
    name: "Agency White-Label AI Fulfillment",
    badge: "Agency Fulfillment",
    shortDesc:
      "We build, deploy, and maintain AI voice agents, chatbots & GHL workflows for your agency's clients behind the scenes.",
    fullDesc:
      "Sell high-ticket AI automation services to your clients while we handle 100% of technical fulfillment. We operate as your invisible backend engineering team.",
    includes: [
      "Invisible backend build & support under your agency brand",
      "Client onboarding assistance & technical scoping",
      "Done-for-you GHL snapshot installation & testing",
      "Dedicated Slack/Discord channel with our engineering team",
      "Fixed wholesale pricing so you keep 50%+ margins",
    ],
    howItWorks: [
      "You pitch & close your client on AI automation",
      "Submit client requirements to your dedicated Slack channel",
      "Our team builds and delivers the complete setup in 3-5 days",
      "You present the live solution and charge recurring fees",
    ],
    whoItsFor:
      "Marketing agencies wanting to offer cutting-edge AI without hiring expensive developers.",
    faqs: [
      {
        q: "Will our clients ever see Omni AI branding?",
        a: "Never. Everything is 100% white-labeled with your agency logos and domain.",
      },
    ],
    omniSays:
      "We do all the heavy lifting! Expand your agency offer without hiring full-time AI engineers.",
    problemSolved: "Lack of technical in-house team to deliver complex AI builds",
    category: "agency",
  },
  {
    id: "database-reactivation",
    num: "09",
    name: "AI Database Reactivation Campaign",
    badge: "Lead Generation",
    shortDesc:
      "Revive dead contact lists with AI SMS conversations to book 15-30 appointments in under 7 days without ad spend.",
    fullDesc:
      "Your past lead database is a goldmine. We launch conversational AI SMS campaigns to past inquiries and past clients to generate instant high-margin sales without spending a dime on ads.",
    includes: [
      "List cleansing & phone number verification",
      "Conversational AI SMS campaign script design",
      "Automated handling of replies, objections & scheduling",
      "Calendar integration for automatic slot booking",
      "Compliance TCPA opt-out management",
    ],
    howItWorks: [
      "Upload your old lead CSV or connect your existing database",
      "Craft compelling re-engagement offer (e.g., special promo)",
      "AI contacts leads in batches with natural human conversation",
      "Watch your calendar fill up with booked appointments",
    ],
    whoItsFor: "Businesses with 500+ past leads or inactive customer lists.",
    faqs: [
      {
        q: "How many bookings can we expect?",
        a: "Typically 3% to 7% of past lists convert into booked appointments within 5 days.",
      },
    ],
    omniSays: "Unlocking hidden revenue in your old database is the fastest ROI you can get!",
    problemSolved: "Dormant lead lists sitting idle in CRM",
    category: "automation",
  },
  {
    id: "social-media-auto-responder",
    num: "10",
    name: "IG & FB ManyChat AI Automations",
    badge: "Social Media",
    shortDesc:
      "Turn Instagram comments, DM keywords, and Facebook messages into instant lead bookings automatically.",
    fullDesc:
      "Never leave social comments on 'read'. When users comment a keyword on your reels or posts, our AI instantly sends a DM, provides value, and collects contact details.",
    includes: [
      "Instagram DM & Reels comment keyword triggers",
      "Facebook Messenger lead funnels",
      "Instant lead magnet delivery via DM",
      "Phone & email capture inside social messages",
      "Sync directly into GHL pipeline",
    ],
    howItWorks: [
      "Connect your business social accounts",
      "Set up keyword triggers (e.g. comment 'DEMO' for link)",
      "AI initiates personalized DM conversation instantly",
      "Captures lead info and syncs with your CRM",
    ],
    whoItsFor: "Coaches, consultants, agencies & local brands active on social media.",
    faqs: [
      {
        q: "Is this compliant with Instagram policies?",
        a: "100% Meta-approved API integrations.",
      },
    ],
    omniSays: "Convert social engagement straight into revenue while your content goes viral!",
    problemSolved: "Manual social media DM responses and lost social leads",
    category: "automation",
  },
  {
    id: "custom-ai-workflow-dev",
    num: "11",
    name: "Custom AI Stack & API Integrations",
    badge: "Custom Engineering",
    shortDesc:
      "Tailored Python/Node integrations connecting custom LLMs, Make.com, n8n, Webhooks, and internal tools.",
    fullDesc:
      "When off-the-shelf software isn't enough, we engineer custom AI workflows. Connect proprietary databases, custom OpenAI/Claude endpoints, and legacy back-office tools seamlessly.",
    includes: [
      "Custom API development & webhook orchestration",
      "Make.com / n8n enterprise flow builds",
      "Custom RAG knowledgebase vector database setup",
      "Custom dashboard reporting & admin controls",
      "Ongoing maintenance & system uptime Monitoring",
    ],
    howItWorks: [
      "Architecture scoping call & technical spec definition",
      "Custom code & API middleware development",
      "Rigorous testing in sandbox environment",
      "Deployment with monitoring & team documentation",
    ],
    whoItsFor: "Enterprise accounts, SaaS startups & complex business operations.",
    faqs: [
      {
        q: "What tech stack do you use?",
        a: "TanStack Start, Node.js, Python, Supabase, OpenAI, Claude, n8n, Make.",
      },
    ],
    omniSays: "Have a complex workflow vision? If it has an API, we can automate it with AI!",
    problemSolved: "Disconnected software systems and repetitive manual data entry",
    category: "automation",
  },
];
