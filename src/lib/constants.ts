import type { NavItem, ServiceItem, CaseStudy, Testimonial, FAQItem, TimelineStep, Industry, TechItem } from "@/types";

export const SITE = {
  name: "Ai Solutions",
  domain: "aisolutions.in",
  tagline: "Enterprise AI Solutions & Business Automation",
  description:
    "Ai Solutions designs and deploys enterprise-grade artificial intelligence systems that automate complex business processes, reduce operational costs, and unlock new revenue streams.",
  email: "hey@aisolutions.in",
  location: "Bangalore, India",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Who We Are", href: "#who-we-are" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Solutions", href: "#solutions" },
  { label: "Process", href: "#process" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES: ServiceItem[] = [
  {
    title: "Custom AI Development",
    description:
      "Bespoke machine learning models and AI systems engineered for your specific business challenges. From data pipeline architecture to model deployment, every component is purpose-built.",
    icon: "cpu",
  },
  {
    title: "Business Process Automation",
    description:
      "End-to-end automation of complex operational workflows. We identify high-ROI processes, redesign them for AI integration, and deploy autonomous systems that reduce manual work by up to 80%.",
    icon: "workflow",
  },
  {
    title: "AI Agents",
    description:
      "Autonomous agents that reason, plan, and execute multi-step tasks across your existing tools and systems. Built with guardrails for enterprise safety and observability.",
    icon: "bot",
  },
  {
    title: "AI Consulting",
    description:
      "Strategic advisory for organizations navigating AI adoption. We assess readiness, identify quick wins, build roadmaps, and provide technical due diligence for AI investments.",
    icon: "lightbulb",
  },
  {
    title: "Workflow Automation",
    description:
      "Intelligent workflow orchestration that connects your CRM, ERP, comms tools, and databases into a single automated pipeline with human-in-the-loop checkpoints.",
    icon: "git-branch",
  },
  {
    title: "Enterprise AI Integration",
    description:
      "Integrating AI capabilities into existing enterprise systems including SAP, Salesforce, ServiceNow, and custom legacy platforms without disrupting current operations.",
    icon: "puzzle",
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: "Automated Underwriting Engine",
    industry: "Insurance",
    challenge:
      "A mid-market insurer processed 12,000 applications monthly with a 14-day average turnaround. Manual underwriting created bottlenecks and inconsistent risk assessment.",
    solution:
      "We deployed a multi-model AI system combining NLP for document extraction, gradient-boosted trees for risk scoring, and an LLM-powered recommendation engine for underwriters.",
    results: [
      "Average turnaround reduced from 14 days to 4 hours",
      "Risk prediction accuracy improved 23% over human baseline",
      "Straight-through processing rate reached 64%",
    ],
    metric: "94%",
    metricLabel: "faster processing",
  },
  {
    title: "Supply Chain Forecasting",
    industry: "Manufacturing",
    challenge:
      "A manufacturer with 17 plants across 8 countries faced $42M in annual waste from demand-supply mismatches. Spreadsheet-based forecasting couldn't handle 14,000 SKUs with seasonal patterns.",
    solution:
      "We built a hierarchical time-series forecasting system using transformer-based models, integrated with their ERP for real-time inventory optimization across the supply chain.",
    results: [
      "Waste reduced by $18M in the first year",
      "Stockout incidents dropped 71%",
      "Inventory holding costs decreased 34%",
    ],
    metric: "$18M",
    metricLabel: "annual waste reduction",
  },
  {
    title: "Intelligent Document Processing",
    industry: "Financial Services",
    challenge:
      "A bank processed 50,000+ documents daily across loan applications, KYC, and compliance. 200+ staff performed manual data entry with a 3.2% error rate and 48-hour SLA.",
    solution:
      "We deployed a computer vision and NLP pipeline that classifies, extracts, validates, and routes documents automatically. The system learns from corrections and improves over time.",
    results: [
      "Manual processing reduced by 87%",
      "Error rate dropped to 0.4%",
      "Processing SLA improved to under 2 minutes",
    ],
    metric: "87%",
    metricLabel: "reduction in manual work",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Ai Solutions didn't just deliver a model. They redesigned our entire loan origination process around what AI could do. The results exceeded every projection we had.",
    author: "Priya Sharma",
    role: "CTO",
    company: "Fortune 500 Bank",
  },
  {
    quote:
      "We evaluated six firms before selecting Ai Solutions. Their technical depth, enterprise maturity, and refusal to overpromise set them apart. Eighteen months later, we're still impressed.",
    author: "Rajesh Krishnan",
    role: "VP of Engineering",
    company: "Global Manufacturing Corp",
  },
  {
    quote:
      "The AI agents they built handle 60% of our customer service volume now. Our team focuses on complex cases that actually need human judgment. CSAT went up while costs went down.",
    author: "Ananya Patel",
    role: "Head of Digital",
    company: "E-commerce Platform",
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "What distinguishes Ai Solutions from other AI consultancies?",
    answer:
      "We are engineers first. Every engagement is led by senior practitioners who have built and deployed AI systems at scale. We don't produce slide decks and hand them off. We write code, train models, design architectures, and stay until the system is live and delivering measurable results.",
  },
  {
    question: "How long does a typical AI implementation take?",
    answer:
      "A proof-of-concept typically delivers results in 4 to 6 weeks. Full production deployments range from 3 to 9 months depending on complexity, data readiness, and integration requirements. We structure every engagement with measurable milestones so you see progress continuously.",
  },
  {
    question: "Do you work with our existing technology stack?",
    answer:
      "Yes. We design solutions that integrate with your current infrastructure rather than demanding replacement. We have experience integrating with SAP, Salesforce, ServiceNow, AWS, Azure, GCP, and most major enterprise platforms and databases.",
  },
  {
    question: "How do you handle data privacy and security?",
    answer:
      "Data never leaves your environment without explicit authorization. We deploy within your VPC or on-premises infrastructure. All solutions follow enterprise security protocols including encryption at rest and in transit, role-based access control, and comprehensive audit logging. We are SOC 2 compliant and support HIPAA and GDPR requirements.",
  },
  {
    question: "What does an engagement typically cost?",
    answer:
      "Our engagements typically start at $100,000 and scale based on scope and complexity. We structure pricing around outcomes rather than hours, with clear deliverables at each phase. Every proposal includes a detailed ROI projection so you understand the expected return before committing.",
  },
  {
    question: "Do you provide ongoing support after deployment?",
    answer:
      "Yes. Every production deployment includes a support and maintenance agreement with defined SLAs, model monitoring, performance optimization, and continuous improvement. We treat each engagement as a long-term partnership, not a one-time project.",
  },
];

export const TIMELINE_STEPS: TimelineStep[] = [
  {
    phase: "01",
    title: "Discovery & Assessment",
    description:
      "Deep dive into your business processes, data landscape, and technology stack. We identify the highest-ROI automation opportunities and define success metrics before writing a single line of code.",
  },
  {
    phase: "02",
    title: "Solution Architecture",
    description:
      "We design the complete system architecture including data pipelines, model selection, integration points, and deployment strategy. You receive a detailed technical blueprint with clear milestones.",
  },
  {
    phase: "03",
    title: "Proof of Concept",
    description:
      "A focused 4 to 6 week build that validates the approach with real data. You see working software, not mockups. We measure results against the success criteria defined in discovery.",
  },
  {
    phase: "04",
    title: "Production Engineering",
    description:
      "Full-scale development with enterprise-grade engineering. Monitoring, alerting, failover, logging, access control, and everything else required for production systems handling real business operations.",
  },
  {
    phase: "05",
    title: "Deployment & Integration",
    description:
      "Controlled rollout with comprehensive testing, user training, and parallel running where needed. We deploy incrementally and verify each integration point before proceeding.",
  },
  {
    phase: "06",
    title: "Optimization & Scale",
    description:
      "Continuous monitoring, performance tuning, model retraining pipelines, and systematic expansion to additional use cases. Your AI capabilities grow with your business.",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    name: "Financial Services",
    description:
      "Fraud detection, credit scoring, automated underwriting, regulatory compliance, and intelligent document processing.",
    icon: "landmark",
  },
  {
    name: "Manufacturing",
    description:
      "Predictive maintenance, supply chain optimization, quality control automation, and production scheduling.",
    icon: "factory",
  },
  {
    name: "Healthcare",
    description:
      "Clinical decision support, medical imaging analysis, patient flow optimization, and automated claims processing.",
    icon: "heart-pulse",
  },
  {
    name: "Insurance",
    description:
      "Automated claims processing, risk modeling, fraud detection, and personalized policy recommendations.",
    icon: "shield-check",
  },
  {
    name: "E-commerce & Retail",
    description:
      "Demand forecasting, inventory optimization, personalization engines, and customer service automation.",
    icon: "shopping-cart",
  },
  {
    name: "Logistics",
    description:
      "Route optimization, warehouse automation, demand prediction, and fleet management intelligence.",
    icon: "truck",
  },
];

export const TECH_STACK: TechItem[] = [
  { name: "Python", category: "Languages", icon: "code" },
  { name: "TypeScript", category: "Languages", icon: "code" },
  { name: "PyTorch", category: "ML Frameworks", icon: "cpu" },
  { name: "TensorFlow", category: "ML Frameworks", icon: "cpu" },
  { name: "LangChain", category: "LLM Tooling", icon: "bot" },
  { name: "LlamaIndex", category: "LLM Tooling", icon: "bot" },
  { name: "Kubernetes", category: "Infrastructure", icon: "container" },
  { name: "Docker", category: "Infrastructure", icon: "container" },
  { name: "AWS", category: "Cloud", icon: "cloud" },
  { name: "Azure", category: "Cloud", icon: "cloud" },
  { name: "GCP", category: "Cloud", icon: "cloud" },
  { name: "PostgreSQL", category: "Databases", icon: "database" },
  { name: "Redis", category: "Databases", icon: "database" },
  { name: "Kafka", category: "Data Streaming", icon: "git-branch" },
  { name: "Weaviate", category: "Vector DB", icon: "database" },
  { name: "MLflow", category: "MLOps", icon: "workflow" },
];

export const BENEFITS = [
  {
    title: "Measurable ROI",
    description:
      "Every engagement starts with a quantified business case. We track results against baseline metrics throughout the engagement and report real numbers, not vanity metrics.",
  },
  {
    title: "Enterprise Security",
    description:
      "SOC 2 compliant infrastructure. Data stays in your environment. Full audit trails, encryption at rest and in transit, RBAC, and compliance with HIPAA, GDPR, and industry regulations.",
  },
  {
    title: "No Lock-In",
    description:
      "All code, models, and documentation are yours. We build with open standards and provide complete knowledge transfer. Your team can maintain and extend everything independently.",
  },
  {
    title: "Production Grade",
    description:
      "We build for production from day one. Monitoring, alerting, failover, logging, and error handling are not afterthoughts. Every system ships with operational runbooks.",
  },
  {
    title: "Speed to Value",
    description:
      "Proof of concept in 4 to 6 weeks. Measurable business impact in 90 days. We compress timelines through experience: we have solved these problems before and know what works.",
  },
  {
    title: "Full Stack AI",
    description:
      "From data engineering to model training to production deployment. We handle the entire pipeline. No need to coordinate multiple vendors or bridge gaps between consultants.",
  },
] as const;

export const SOLUTIONS = [
  {
    title: "Intelligent Document Processing",
    description:
      "Extract, classify, validate, and route documents automatically. Reduce manual data entry by 85%+ while improving accuracy and compliance.",
    category: "Automation",
  },
  {
    title: "Predictive Analytics Platform",
    description:
      "Custom forecasting models for demand, revenue, risk, and operations. Integrated with your data warehouse for real-time predictions.",
    category: "Analytics",
  },
  {
    title: "Conversational AI Agents",
    description:
      "Autonomous agents that handle customer service, internal IT support, and employee onboarding across voice, chat, and email channels.",
    category: "Agents",
  },
  {
    title: "Fraud Detection System",
    description:
      "Real-time anomaly detection across transactions, claims, and user behavior. Self-learning models that adapt to new fraud patterns without manual retraining.",
    category: "Security",
  },
  {
    title: "Supply Chain Optimization",
    description:
      "End-to-end supply chain intelligence from demand forecasting to logistics optimization. Reduce inventory costs while improving service levels.",
    category: "Operations",
  },
  {
    title: "AI-Powered Underwriting",
    description:
      "Automated risk assessment for insurance and lending. Multi-model architecture combining structured data, document analysis, and external data sources.",
    category: "Finance",
  },
] as const;