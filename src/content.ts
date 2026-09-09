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
  link?: string;
  focus?: string[];
  impact?: string[];
  points?: string[];
}

export const portfolio = {
  personal: {
    initials: "AK",
    name: "Amitesh Kumar",
    firstName: "AMITESH",
    lastName: "KUMAR",
    role: "Founder’s Office | Strategy | Growth",
    email: "amitesh.kumar2027@mastersunion.org",
    instagram: "https://www.instagram.com/itsamik",
    instagramLabel: "instagram.com/itsamik",
    linkedin: "https://www.linkedin.com/in/amiteshku",
    linkedinLabel: "linkedin.com/in/amiteshku",
  },

  nav: {
    links: [
      { label: "Home", href: "#home" },
      { label: "About", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Ventures", href: "#ventures" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Let’s Connect",
  },

  hero: {
    label: "HELLO",
    headline: "I build businesses, solve problems & turn ideas into execution.",
    profileImage: "profile.jpg",
    annotations: ["Build", "Solve", "Learn", "Repeat"],
    education: {
      school: "Masters’ Union",
      program: "PGP in Human Resources & Organizational Strategy",
      dates: "2026 — Present",
      location: "Gurugram",
    },
    cta: "Explore My Experience",
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
    label: "ABOUT",
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

  experience: {
    label: "EXPERIENCE",
    headlineTop: "A journey of building,",
    headlineBottom: "learning and contributing.",
    items: [
      {
        company: "THYNAA HEALTHY NATURALLY",
        role: "Founder’s Office Associate",
        dates: "Feb 2026 – Apr 2026",
        location: "Ghaziabad",
        link: "https://thynaa.com/",
        focus: ["Strategy", "Execution", "Operations"],
        impact: ["0 → 1 pilot", "300+ families", "500+ prospect insights", "~15% conversion"],
        points: [
          "Launched Aarogya Bhoomi’s 300-family pilot in collaboration with the founders, driving market rollout and one-on-one product demonstrations.",
          "Converted 500+ prospect insights from 10+ workshops into customer profiles, enabling pain-point-based targeting.",
          "Converted ~15% of 100+ trial kit recipients into subscribers.",
        ],
      },
      {
        company: "SHIVAM HANDLOOM",
        role: "Business Operations, Sales Forecasting & Supply Chain",
        dates: "2020 – Present",
        location: "Madhubani",
        focus: ["Family Wholesale Business"],
        impact: ["20% revenue growth", "45 → 21 days payment cycle", "25%+ sales growth"],
        points: [
          "Drove 20% revenue growth through B2B analytics and demand forecasting, improving delivery and inventory efficiency.",
          "Managed procurement, operations and receivables, reducing the payment cycle from 45 to 21 days.",
          "Led GTM expansion and digital adoption, achieving 25%+ sales growth.",
        ],
      },
      {
        company: "THYNAA HEALTHY NATURALLY",
        role: "Community Manager Intern",
        dates: "Jun 2025 – Jan 2026",
        location: "Ghaziabad",
        link: "https://thynaa.com/",
        points: [
          "Managed a 2,000+ member community, resolving 90% of queries within 24 hours.",
          "Implemented engagement and retention initiatives that improved repeat participation.",
        ],
      },
      {
        company: "ISKCON PRAYAGRAJ",
        role: "Front Office Lead Intern",
        dates: "Jan 2025 – Feb 2026",
        location: "Prayagraj",
        link: "https://www.iskconprayagraj.org/",
        impact: ["630+ accommodations", "40+ staff", "150+ → ~20 daily complaints"],
        points: [
          "Led front office operations across 630+ accommodations, coordinating with 40+ staff to maintain near-100% occupancy over 2 months.",
          "Designed a centralized tracking system, reducing unresolved complaints from 150+ to ~20 daily.",
        ],
      },
      {
        company: "SCALER",
        role: "Technical Content Reviewer & Publisher",
        dates: "Dec 2024 – Jun 2025",
        location: "Remote",
        link: "https://www.scaler.com/",
        impact: ["400+ modules published", "~25% faster review process"],
        points: [
          "Reviewed and published 400+ technical learning modules, improving content quality, SEO and learner experience.",
          "Optimized the review process, reducing editing and reviewing time by ~25% while maintaining quality standards.",
        ],
      },
      {
        company: "GOOGLE SEARCH LAB",
        role: "Content Contributor",
        dates: "Nov 2024 – Feb 2025",
        location: "Remote",
        link: "https://labs.google.com/",
        impact: ["300+ Search Notes", "3rd fastest contributor"],
        points: [
          "Created and reviewed 300+ Search Notes submissions, evaluating user intent and quality.",
          "Recognized as the 3rd fastest contributor while consistently maintaining quality and compliance standards.",
        ],
      },
      {
        company: "TRAINITY",
        role: "Data Analytics Virtual Intern",
        dates: "May 2024 – Jun 2024",
        location: "Remote",
        link: "https://trainity.online/",
        points: [
          "Completed Excel, SQL and Power BI training through 3 real-world projects.",
          "Analyzed job-posting trends across 200+ roles; Instagram analytics work reached the top 10% of hashtags with 40%+ impression share.",
        ],
      },
    ] as ExperienceItem[],
  },

  ventures: {
    label: "VENTURES",
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
    label: "SKILLS",
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
      "Dashboarding",
      "Zoho CRM",
      "Canva",
    ],
  },

  beyond: {
    label: "BEYOND WORK",
    items: [
      {
        title: "Yoga & Meditation",
        note: "Practicing consistently for the past 2+ years — a daily reset for focus, discipline and calm under pressure.",
      },
      {
        title: "Cooking & Cuisine",
        note: "Exploring cuisines by experimenting through recipe trials — a curiosity that eventually grew into The Bowl & Beyond.",
      },
    ],
  },

  contact: {
    label: "GET IN TOUCH",
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
