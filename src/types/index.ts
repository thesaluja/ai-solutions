export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface CaseStudy {
  title: string;
  slug: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metric: string;
  metricLabel: string;
  fullContent: {
    overview: string;
    approach: string;
    architecture: string;
    stack: string[];
    timeline: string;
    outcome: string;
  };
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimelineStep {
  title: string;
  description: string;
  phase: string;
}

export interface Industry {
  name: string;
  description: string;
  icon: string;
}

export interface TechItem {
  name: string;
  category: string;
  icon: string;
}