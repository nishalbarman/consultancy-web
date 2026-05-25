export const seedContent = {
  profile: {
    brand: "Technira.Space",
    tagline: "Developer portfolio and product engineering studio",
    headline:
      "I build production-ready web apps, mobile apps, APIs, dashboards, and Play Store-ready products.",
    intro:
      "A compact developer-led consultancy for founders, local businesses, and teams that need dependable engineering without hiring a full-time team.",
    email: "support@technira.space",
    phone: "+91 9876543210",
    location: "India",
    playStoreUrl: "",
    githubUrl: "",
    linkedinUrl: "",
    aboutHeadline: "Developer-led delivery for businesses that need practical software.",
    aboutIntro:
      "This site works as both a consultancy website and a personal developer portfolio. The public pages are powered by the server, while the admin panel keeps projects, services, testimonials, leads, users, and orders current.",
    processTitle: "From idea to launch build",
    processSummary:
      "Share your requirements, approve the scope, track progress, and receive a deployable website, API, app build, or admin dashboard.",
    heroCodeLines: [
      'const studio = "portfolio + services";',
      "buildWebApp();",
      "publishMobileApp();",
      "secureAdminPanel();",
      "trackClientOrders();",
    ],
    stats: [
      { label: "Launch speed", value: "1-4 weeks" },
      { label: "Service areas", value: "Web, API, Mobile" },
      { label: "Support", value: "Post-launch care" },
    ],
  },
  services: [
    {
      id: "app-development",
      title: "App Development",
      summary:
        "Android and cross-platform apps with clean UI, backend integration, release builds, and Play Store preparation.",
      price: "From INR 25,000",
      features: ["React Native apps", "API integration", "Play Store listing support"],
    },
    {
      id: "webapp-development",
      title: "Web App Development",
      summary:
        "Fast business websites, booking systems, dashboards, admin panels, ecommerce flows, and SaaS-style web apps.",
      price: "From INR 18,000",
      features: ["React frontends", "Responsive UI", "SEO and performance setup"],
    },
    {
      id: "backend-api",
      title: "Backend and API Development",
      summary:
        "Secure APIs, databases, authentication, admin tooling, and automations that make your product dynamic.",
      price: "From INR 20,000",
      features: ["Node.js APIs", "Database design", "Admin panels"],
    },
  ],
  projects: [
    {
      id: "expense-tracker",
      title: "Expense Tracker App",
      type: "Mobile App",
      summary: "Personal finance app with calendar views, reports, notes, and offline-friendly data flows.",
      stack: ["React Native", "SQLite", "Node.js"],
      url: "",
      playStoreUrl: "",
      featured: true,
    },
    {
      id: "business-website",
      title: "Business Service Website",
      type: "Website",
      summary:
        "Conversion-focused service website with enquiry capture, admin lead tracking, and dynamic service pages.",
      stack: ["React", "Node.js", "MongoDB"],
      url: "",
      playStoreUrl: "",
      featured: true,
    },
  ],
  testimonials: [
    {
      id: "founder-feedback",
      name: "Startup Founder",
      role: "Product Client",
      quote:
        "Technira helped us move from idea to a working launch build quickly, with clear communication throughout.",
    },
  ],
};
