export type ServiceId = "social" | "email" | "web" | "ecommerce" | "courses" | "marketing";

export interface Service {
  id: ServiceId;
  letter: string;
  title: string;
  short: string;
  description: string;
  deliverables: string[];
}

export const SERVICES: Service[] = [
  {
    id: "social",
    letter: "A",
    title: "Social Media Management & Content Creation",
    short: "Social Media",
    description:
      "Consistent, on-brand content and an organized posting rhythm, so your audience always knows what you stand for.",
    deliverables: [
      "Social media strategy and content planning",
      "Account management",
      "Content calendars and scheduling",
      "Branded graphics and templates",
      "Short-form video and Reels support",
      "Community engagement",
      "Growth analysis and reporting",
    ],
  },
  {
    id: "email",
    letter: "B",
    title: "Email Marketing & Automation",
    short: "Email Marketing",
    description:
      "Emails people want to open — from welcome sequences to newsletters — set up to run smoothly in the background.",
    deliverables: [
      "Email marketing strategy",
      "Newsletter creation and management",
      "Campaign design and copywriting",
      "List management and segmentation",
      "Welcome sequences and automated workflows",
      "Klaviyo and Mailchimp setup",
      "Performance analysis",
    ],
  },
  {
    id: "web",
    letter: "C",
    title: "Website Design & Development",
    short: "Websites",
    description:
      "Clear, well-structured websites that explain what you do and make it easy for visitors to take the next step.",
    deliverables: [
      "WordPress website design",
      "Business and portfolio websites",
      "Landing pages and lead-generation sites",
      "Redesigns and improvements",
      "Shopify storefront customization",
      "Maintenance and content updates",
      "Conversion-focused experiences",
    ],
  },
  {
    id: "ecommerce",
    letter: "D",
    title: "E-Commerce & Shopify Solutions",
    short: "E-Commerce",
    description:
      "Online stores that present products well, stay organized, and make shopping straightforward for your customers.",
    deliverables: [
      "Shopify store setup and customization",
      "Product uploads and catalog organization",
      "Product-page improvements",
      "E-commerce website content",
      "Store audits and UX improvements",
      "Sales-channel integration support",
      "Store maintenance and optimization",
    ],
  },
  {
    id: "courses",
    letter: "E",
    title: "Online Courses & Membership Platforms",
    short: "Online Courses",
    description:
      "Learning platforms and communities that feel organized for students and manageable for you.",
    deliverables: [
      "Online course website setup",
      "LearnDash and Tutor LMS",
      "Course uploads and lesson organization",
      "Membership website setup",
      "Student experience improvements",
      "Course landing pages and payments",
      "Circle and Skool community setup",
    ],
  },
  {
    id: "marketing",
    letter: "F",
    title: "Digital Marketing & Business Support",
    short: "Digital Marketing",
    description:
      "Practical, hands-on support for campaigns, landing pages and the digital workflows that keep your business moving.",
    deliverables: [
      "Digital marketing support",
      "Lead-generation landing pages",
      "Campaign content and creative assets",
      "Content repurposing",
      "Workflow organization",
      "Marketing platform setup and integration",
      "Virtual assistance for digital tasks",
    ],
  },
];

export const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Multiple services / Not sure yet"];

export const serviceTitle = (id: string | undefined) =>
  SERVICES.find((s) => s.id === id)?.title;
