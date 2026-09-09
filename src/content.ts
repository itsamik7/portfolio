// ============================================================
//  content.ts — ALL EDITABLE PERSONAL INFORMATION LIVES HERE.
//
//  To edit the website, change values in THIS file only.
//  To change a photo: drop the file into public/images/
//  and reference only its filename below (e.g. "thynaa.jpg").
// ============================================================

// Builds correct image URLs on GitHub Pages (respects Vite base path).
export const imagePath = (filename: string) =>
  `${import.meta.env.BASE_URL}images/${filename}`;

export interface Metric {
  value: string;
  label: string;
}

export interface CaseBlock {
  heading: string;
  body: string;
}

export interface Project {
  id: string;
  index: string;
  title: string;
  category: string;
  image: string; // filename only, file lives in public/images/
  description: string;
  metrics: Metric[];
  caseStudy: CaseBlock[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  location: string;
  focus?: string[];
  impact?: string[];
}

export const portfolio = {
  personal: {
    initials: "AK",
    name: "Amitesh Kumar",
    firstName: "AMITESH",
    lastName: "KUMAR",
    role: "Founder’s Office | Strategy | Growth",
    email: "amitesh.kumar2027@mastersunion.org",
    phone: "+91 7209804402",
    linkedin: "https://www.linkedin.com/in/amiteshku",
    linkedinLabel: "linkedin.com/in/amiteshku",
  },

  nav: {
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Work", href: "#work" },
      { label: "Experience", href: "#experience" },
      { label: "Ventures", href: "#ventures" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Let’s Connect",
  },

  hero: {
    label: "01 / HELLO",
    headline: "I build businesses, solve problems & turn ideas into execution.",
    profileImage: "profile.jpg",
    annotations: ["Build", "Solve", "Learn", "Repeat"],
    education: {
      school: "Masters’ Union",
      program: "PGP in Human Resources & Organizational Strategy",
      dates: "2026 — Present",
      location: "Gurugram",
    },
    cta: "Explore My Work",
  },

  marquee: [
    "Strategy",
    "Growth",
    "Execution",
    "Operations",
    "Analytics",
    "0 → 1 Building",
    "Customer Insights",
  ],

  about: {
    label: "02 / ABOUT",
    headlineTop: "A builder, operator",
    headlineBottom: "and a curious learner.",
    description:
      "I’m a Founder’s Office and Strategy professional who has driven 0→1 business launches, scaled operations, and led growth initiatives across a startup and a family business. At Thynaa Healthy Naturally, I helped launch a 300-family pilot with the founders and turned 500+ prospect insights into customer profiles. At ISKCON Prayagraj, I led front-office operations across 630+ accommodations with 40+ staff. At Shivam Handloom, our family wholesale business, I’ve driven 20% revenue growth through demand forecasting and supply chain coordination. I’m currently pursuing the PGP in Human Resources & Organizational Strategy at Masters’ Union, and I co-founded The Bowl & Beyond. I do my best work where strategy meets execution — using analytics to solve real business problems.",
    cycle: ["THINK", "BUILD", "TEST", "LEARN", "SCALE"],
    manifesto: [
      {
        n: "01",
        title: "Build from zero.",
        text: "0→1 launches — from a 300-family pilot to a co-founded food venture, taken from concept to market.",
      },
      {
        n: "02",
        title: "Operate at scale.",
        text: "Systems that hold under pressure: 630+ accommodations, 40+ staff, a 2,000+ member community.",
      },
      {
        n: "03",
        title: "Learn relentlessly.",
        text: "Analytics, user intent and customer insights turned into decisions — 500+ prospect insights at a time.",
      },
    ],
  },

  work: {
    label: "03 / SELECTED WORK",
    headlineTop: "Real Problems.",
    headlineBottom: "Real Impact.",
  },

  projects: [
    {
      id: "thynaa",
      index: "01",
      title: "THYNAA HEALTHY NATURALLY",
      category: "Strategy / GTM / Customer Insights",
      image: "thynaa.jpg",
      description:
        "Launched Aarogya Bhoomi’s 300-family pilot in collaboration with the founders. Converted 500+ prospect insights from 10+ workshops into customer profiles, and converted ~15% of 100+ trial kit recipients into subscribers through one-on-one product demonstrations.",
      metrics: [
        { value: "300+", label: "families in pilot" },
        { value: "500+", label: "prospect insights" },
        { value: "~15%", label: "trial-to-subscription conversion" },
      ],
      caseStudy: [
        {
          heading: "THE PROBLEM",
          body: "Take Aarogya Bhoomi from concept to market: a 0→1 pilot reaching 300 families, run in collaboration with the founders.",
        },
        {
          heading: "WHAT I DID",
          body: "Launched the 300-family pilot, drove the market rollout, and ran one-on-one product demonstrations for 100+ trial kit recipients.",
        },
        {
          heading: "APPROACH",
          body: "Converted 500+ prospect insights gathered across 10+ workshops into customer profiles, enabling pain-point-based targeting.",
        },
        {
          heading: "OUTCOME",
          body: "~15% of 100+ trial kit recipients converted into subscribers.",
        },
        {
          heading: "LEARNING",
          body: "Pain-point-based targeting works — insights from 500+ real prospects directly shaped who converted and why.",
        },
      ],
    },
    {
      id: "iskcon",
      index: "02",
      title: "ISKCON PRAYAGRAJ",
      category: "Operations / Systems / Scale",
      image: "iskcon.jpg",
      description:
        "Led front office operations across 630+ accommodations, coordinating with 40+ staff to maintain near-100% occupancy over 2 months. Designed a centralized tracking system that reduced unresolved complaints from 150+ to approximately 20 daily.",
      metrics: [
        { value: "630+", label: "accommodations" },
        { value: "40+", label: "staff coordinated" },
        { value: "150+ → ~20", label: "daily unresolved complaints" },
      ],
      caseStudy: [
        {
          heading: "THE PROBLEM",
          body: "Front-office operations spanned 630+ accommodations, with unresolved guest complaints piling up to 150+ daily.",
        },
        {
          heading: "WHAT I DID",
          body: "Led front office operations, coordinated with 40+ staff, and designed a centralized complaint tracking system.",
        },
        {
          heading: "APPROACH",
          body: "Resource allocation and cross-functional execution on the ground, plus process optimization through centralized tracking.",
        },
        {
          heading: "OUTCOME",
          body: "Near-100% occupancy maintained over 2 months; unresolved complaints dropped from 150+ to ~20 daily.",
        },
        {
          heading: "LEARNING",
          body: "A simple centralized system can turn operational chaos into a manageable daily queue.",
        },
      ],
    },
    {
      id: "scaler",
      index: "03",
      title: "SCALER",
      category: "Content / Process / Execution",
      image: "scaler.jpg",
      description:
        "Reviewed and published 400+ technical learning modules, improving content quality, SEO and learner experience. Optimized the review process, reducing editing and reviewing time by approximately 25% while maintaining quality standards.",
      metrics: [
        { value: "400+", label: "modules published" },
        { value: "~25%", label: "faster review process" },
      ],
      caseStudy: [
        {
          heading: "THE PROBLEM",
          body: "Technical learning modules needed consistent quality, SEO and learner-experience review at high volume.",
        },
        {
          heading: "WHAT I DID",
          body: "Reviewed and published 400+ technical learning modules as a Technical Content Reviewer & Publisher.",
        },
        {
          heading: "APPROACH",
          body: "Optimized the review process end to end while holding quality standards constant.",
        },
        {
          heading: "OUTCOME",
          body: "Editing and reviewing time reduced by ~25%, with improved content quality, SEO and learner experience.",
        },
        {
          heading: "LEARNING",
          body: "Process optimization compounds — small review improvements saved ~25% of time across 400+ modules.",
        },
      ],
    },
    {
      id: "google-search",
      index: "04",
      title: "GOOGLE SEARCH LAB",
      category: "Research / User Intent / Quality",
      image: "google-search.jpg",
      description:
        "Created and reviewed 300+ Search Notes submissions, evaluating user intent and quality to strengthen search trust. Recognized as the 3rd fastest contributor while consistently maintaining quality and compliance standards.",
      metrics: [
        { value: "300+", label: "Search Notes submissions" },
        { value: "3rd", label: "fastest contributor" },
      ],
      caseStudy: [
        {
          heading: "THE PROBLEM",
          body: "Search quality depends on accurately evaluating user intent and submission quality at scale.",
        },
        {
          heading: "WHAT I DID",
          body: "Created and reviewed 300+ Search Notes submissions, evaluating user intent and quality.",
        },
        {
          heading: "APPROACH",
          body: "Held quality and compliance standards constant while contributing at speed.",
        },
        {
          heading: "OUTCOME",
          body: "Recognized as the 3rd fastest contributor while consistently maintaining quality and compliance standards.",
        },
        {
          heading: "LEARNING",
          body: "Speed and quality aren’t a trade-off when the evaluation criteria are clear.",
        },
      ],
    },
  ] as Project[],

  experience: {
    label: "04 / EXPERIENCE",
    headlineTop: "A journey of building,",
    headlineBottom: "learning and contributing.",
    primary: [
      {
        company: "THYNAA HEALTHY NATURALLY",
        role: "Founder’s Office Associate",
        dates: "Feb 2026 – Apr 2026",
        location: "Ghaziabad",
        focus: ["Strategy", "Execution", "Operations"],
        impact: ["0 → 1 pilot", "300+ families", "500+ prospect insights", "~15% conversion"],
      },
      {
        company: "SHIVAM HANDLOOM",
        role: "Business Operations, Sales Forecasting & Supply Chain",
        dates: "2020 – Present",
        location: "Madhubani",
        focus: ["Family Wholesale Business"],
        impact: ["20% revenue growth", "45 → 21 days payment cycle", "25%+ sales growth"],
      },
    ] as ExperienceItem[],
    earlier: [
      {
        company: "THYNAA HEALTHY NATURALLY",
        role: "Community Manager Intern",
        dates: "Jun 2025 – Jan 2026",
        location: "Ghaziabad",
      },
      {
        company: "ISKCON PRAYAGRAJ",
        role: "Front Office Lead Intern",
        dates: "Jan 2025 – Feb 2026",
        location: "Prayagraj",
      },
      {
        company: "TRAINITY",
        role: "Data Analytics Virtual Intern",
        dates: "May 2024 – Jun 2024",
        location: "Remote",
      },
    ] as ExperienceItem[],
  },

  ventures: {
    label: "05 / VENTURES",
    headlineTop: "Some things",
    headlineBottom: "I built.",
    venture: {
      name: "THE BOWL & BEYOND",
      role: "Co-Founder",
      dates: "Aug 2026 – Present",
      location: "Gurugram",
      image: "bowl-beyond.jpg",
      annotation: "More than just a meal.",
      facts: [
        "Co-founded The Bowl & Beyond, developing brand strategy and a 1:5 community meal initiative from concept to execution.",
        "Conducted 20+ food and menu trials, iterating on recipes and offerings to finalize the launch menu.",
      ],
      metrics: [
        { value: "20+", label: "Food & menu trials" },
        { value: "1:5", label: "Community meal initiative" },
        { value: "0 → 1", label: "Concept to execution" },
      ] as Metric[],
    },
  },

  achievements: {
    label: "06 / ACHIEVEMENTS",
    headline: "Moments that motivate.",
    items: [
      {
        big: "TOP 5",
        lines: ["Among 1,000+ participants", "University-level CTF competition"],
      },
      {
        big: "TOP 100",
        lines: ["From 5,000+ applicants", "Information Security Conference Scholarship"],
      },
      {
        big: "1ST PLACE",
        lines: [
          "One-night Website Development Hackathon",
          "Led a 4-member team",
          "Among 1,000+ participants",
        ],
      },
      {
        big: "3RD",
        lines: ["Among 3,000+ participants", "University-level Aptitude Competition"],
      },
    ],
  },

  leadership: {
    label: "LEADERSHIP",
    items: [
      {
        org: "GOOGLE DEVELOPER STUDENT CLUB",
        role: "Social Media Lead",
        dates: "Aug 2022 – Aug 2023",
        location: "Prayagraj",
        highlights: [
          "Selected among 60+ applicants to lead a 4-member volunteer team",
          "Drove execution of 15+ technical events, with 100% delivery within 24 hours",
        ],
      },
      {
        org: "DEVFEST PRAYAGRAJ",
        role: "Core Team Member",
        dates: "Oct 2023 – Dec 2023",
        location: "Prayagraj",
        highlights: [
          "Achieved 100% ticket occupancy, leading GTM efforts across 10+ colleges",
          "Delivered seamless execution for 300+ attendees",
        ],
      },
    ],
  },

  skills: {
    label: "07 / SKILLS",
    headlineTop: "A mix of skills",
    headlineBottom: "for a multidimensional journey.",
    business: [
      "Stakeholder Management",
      "End-to-End Ownership",
      "GTM Execution",
      "Customer Insights",
      "Customer Acquisition",
      "Demand Forecasting",
      "Vendor Coordination",
      "CRM Management",
      "Process Optimization",
    ],
    technical: [
      "Excel",
      "SQL",
      "Python",
      "Power BI",
      "Data Analysis",
      "KPI Tracking",
      "Dashboarding",
      "Zoho CRM",
      "Canva",
    ],
  },

  beyond: {
    label: "08 / BEYOND WORK",
    items: [
      { title: "Yoga & Meditation", note: "Regular practitioner for the past 2+ years." },
      { title: "Cooking & Cuisine", note: "Exploring cuisines through experimentation." },
    ],
  },

  contact: {
    label: "09 / GET IN TOUCH",
    headlineTop: "Let’s",
    headlineBottom: "Connect.",
    copy: "Always open for a good conversation — about opportunities, ideas, or interesting problems to solve.",
    note: ["Good Ideas", "Better Systems", "Brighter People"],
  },

  footer: {
    name: "AMITESH KUMAR",
    tagline: "Build / Solve / Learn / Repeat",
  },

  // Visitor counter (GoatCounter — free, privacy-friendly, no API key).
  // One-time setup: create a free account at https://www.goatcounter.com/signup,
  // then in GoatCounter settings enable "Allow adding visitor counts on your website".
  // Paste your account name below (e.g. "amiteshkumar") and the live
  // visitor count appears in the footer. Leave empty to keep it disabled.
  analytics: {
    goatCounterSite: "",
  },
};
