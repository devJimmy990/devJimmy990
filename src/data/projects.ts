export interface Project {
  _id?: string;
  id?: number; // For backward compatibility
  title: string;
  description: string;
  cover: string | null;
  images: string[] | null;
  video: string | null;
  tags: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  category: "frontend" | "mobile";
}

// Default projects data (will be replaced with API data)
export const projectsData: Project[] = [
  {
    id: 1,
    title: "LeadBull App",
    description: "A full-featured CRM platform built with React, offering lead management, user tracking, and data analytics.",
    cover: "https://app.leadbull.net/assets/logo-0da85036.svg",
    images: [
      "https://app.leadbull.net/assets/logo-0da85036.svg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    video: "https://www.youtube.com/watch?v=it3arZlX8rA",
    tags: ["React", "Node.js", "MongoDB", "Web"],
    githubUrl: "#",
    liveUrl: "https://app.leadbull.net/",
    category: "frontend"
  },
  {
    id: 2,
    title: "LeadBull Website",
    description: "The marketing website for LeadBull, showcasing the platform's features and benefits with a modern design.",
    cover: "https://www.leadbull.io/assets/imgs/leadbull-logo.svg",
    images: [
      "https://www.leadbull.io/assets/imgs/leadbull-logo.svg",
      "/placeholder.svg"
    ],
    video: "https://www.youtube.com/watch?v=jcB9dHvRFT8",
    tags: ["React", "Next.js", "Web"],
    githubUrl: "#",
    liveUrl: "https://www.leadbull.io/",
    category: "frontend"
  },
  {
    id: 3,
    title: "Medilo",
    description: "A healthcare application connecting patients with doctors, featuring appointment scheduling and telehealth services.",
    cover: "/placeholder.svg",
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    video: "https://www.youtube.com/watch?v=QAe3AfbQG9Q",
    tags: ["React", "Next.js", "Web"],
    githubUrl: "#",
    liveUrl: "https://medilo-five.vercel.app/",
    category: "frontend"
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description: "A cross-platform mobile app built with Flutter for tracking workouts, nutrition, and fitness goals.",
    cover: "/placeholder.svg",
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    video: "https://www.youtube.com/watch?v=8U9LPJnMEqk",
    tags: ["Flutter", "Firebase", "Mobile"],
    githubUrl: "#",
    liveUrl: "#",
    category: "mobile"
  },
  {
    id: 5,
    title: "Personal Blog",
    description: "A minimalist blog platform built with React and a headless CMS, featuring a clean design and optimized for SEO.",
    cover: "/placeholder.svg", 
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    video: "https://www.youtube.com/watch?v=lyyW1yOh-Vs",
    tags: ["React", "Next.js", "Web"],
    githubUrl: "#",
    liveUrl: "#",
    category: "frontend"
  },
  {
    id: 6,
    title: "Chat Application",
    description: "A real-time messaging application built with Flutter and Firebase, supporting text, images, and notifications.",
    cover: "/placeholder.svg",
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    video: "https://www.youtube.com/watch?v=is8uO-l9Kgc",
    tags: ["Flutter", "Firebase", "Mobile"],
    githubUrl: "#",
    liveUrl: "#",
    category: "mobile"
  },
  {
    id: 7,
    title: "E-commerce Platform",
    description: "A comprehensive e-commerce solution with product management, cart functionality, and payment processing.",
    cover: "/placeholder.svg",
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    video: "https://www.youtube.com/watch?v=Dk-VyghPmU4",
    tags: ["React", "Node.js", "MongoDB", "Web"],
    githubUrl: "#",
    liveUrl: "#",
    category: "frontend"
  },
  {
    id: 8,
    title: "Weather App",
    description: "A beautiful weather application providing real-time forecasts and weather data visualization.",
    cover: "/placeholder.svg",
    images: [
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    video: "https://www.youtube.com/watch?v=ER57Ak-sOOk",
    tags: ["React", "API", "Mobile"],
    githubUrl: "#",
    liveUrl: "#",
    category: "mobile"
  }
];
