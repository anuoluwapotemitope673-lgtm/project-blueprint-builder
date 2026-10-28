import type { ServiceId } from "./services";

/**
 * Portfolio data.
 *
 * Every entry below is a CONCEPT project: an original demonstration piece, not
 * client work. To add a real client project, push an object with
 * `authenticity: "client"` into REAL_PROJECTS (and include only verified results).
 */

export type Layout =
  | "feed" | "carousel" | "phone" | "calendar" | "email" | "flow" | "browser"
  | "store" | "product" | "dashboard" | "lesson" | "community" | "funnel" | "report";

export interface Project {
  id: string;
  title: string;
  category: ServiceId;
  subcategory: string;
  industry: string;
  business: string;
  objective: string;
  approach: string;
  deliverables: string[];
  layout: Layout;
  seed: number;
  authenticity: "concept" | "client";
  results?: string;
}

interface ProjectType {
  name: string;
  layout: Layout;
  objective: (b: string) => string;
  approach: string;
  deliverables: string[];
}

const BUSINESSES: [string, string][] = [
  ["Slow-Fashion Linen Label", "Fashion"],
  ["Streetwear Drop Brand", "Fashion"],
  ["Ankara-Print Tailoring House", "Fashion"],
  ["Modest Wear Boutique", "Fashion"],
  ["Plant-Based Skincare Line", "Beauty"],
  ["Natural Hair Care Studio", "Beauty"],
  ["Luxury Nail Salon", "Beauty"],
  ["Men's Grooming Barbershop", "Beauty"],
  ["Jollof & Grill Restaurant", "Food & Drink"],
  ["Artisan Coffee Roaster", "Food & Drink"],
  ["Home-Baked Cake Studio", "Food & Drink"],
  ["Healthy Meal-Prep Kitchen", "Food & Drink"],
  ["Boutique Pilates Studio", "Fitness & Wellness"],
  ["Online Strength Coach", "Fitness & Wellness"],
  ["Mindfulness & Yoga Retreat", "Fitness & Wellness"],
  ["Sports Nutrition Supplier", "Fitness & Wellness"],
  ["Executive Leadership Coach", "Coaching & Consulting"],
  ["Career Transition Consultant", "Coaching & Consulting"],
  ["Small-Business Finance Advisor", "Coaching & Consulting"],
  ["Relationship & Life Coach", "Coaching & Consulting"],
  ["Travel Vlogger Personal Brand", "Creators"],
  ["Faith-Based Podcast Host", "Creators"],
  ["Food Content Creator", "Creators"],
  ["Independent Illustrator", "Creators"],
  ["Luxury Apartment Developer", "Real Estate"],
  ["Short-Let Property Manager", "Real Estate"],
  ["Suburban Realtor Team", "Real Estate"],
  ["Boutique Eco-Lodge", "Travel & Hospitality"],
  ["City Tour Operator", "Travel & Hospitality"],
  ["Destination Wedding Planner", "Travel & Hospitality"],
  ["Fintech Payments Startup", "Technology"],
  ["Project-Management SaaS", "Technology"],
  ["Cybersecurity Consultancy", "Technology"],
  ["Mobile Gadget Repair Shop", "Technology"],
  ["Handmade Candle Shop", "E-Commerce"],
  ["Eco Home-Goods Store", "E-Commerce"],
  ["Gold-Plated Jewelry Brand", "E-Commerce"],
  ["Pet Accessories Brand", "E-Commerce"],
  ["Kids' Learning Toys Shop", "E-Commerce"],
  ["Coding Bootcamp", "Education"],
  ["Language Learning Academy", "Education"],
  ["Exam-Prep Tutoring Centre", "Education"],
  ["Music Production School", "Education"],
  ["Minimalist Lifestyle Brand", "Lifestyle"],
  ["Indoor Plant Shop", "Lifestyle"],
  ["Stationery & Planner Brand", "Lifestyle"],
  ["Mobile Car Detailing Service", "Local Services"],
  ["Family Dental Clinic", "Healthcare"],
  ["Physiotherapy Practice", "Healthcare"],
  ["Home Cleaning Company", "Local Services"],
  ["Interior Design Studio", "Creative Studios"],
  ["Wedding Photography Studio", "Creative Studios"],
  ["Boutique Law Firm", "Professional Services"],
  ["Accounting & Tax Practice", "Professional Services"],
  ["Architecture Practice", "Professional Services"],
  ["Youth Mentorship Nonprofit", "Nonprofit"],
  ["Community Food Bank", "Nonprofit"],
  ["Clean-Water Charity", "Nonprofit"],
  ["Women in Tech Network", "Community"],
  ["Local Book Club Collective", "Community"],
];

const t = (
  name: string,
  layout: Layout,
  objective: (b: string) => string,
  approach: string,
  deliverables: string[],
): ProjectType => ({ name, layout, objective, approach, deliverables });

const TYPES: Record<ServiceId, ProjectType[]> = {
  social: [
    t("Monthly Content Calendar", "calendar", (b) => `Give the ${b} a predictable posting rhythm built around its key moments.`, "Content pillars mapped to a 30-day grid with formats, captions and posting times.", ["30-day calendar", "Content pillars", "Caption drafts", "Posting schedule"]),
    t("Instagram Feed Design", "feed", (b) => `Make the ${b}'s Instagram grid instantly recognisable at a glance.`, "A modular grid system alternating product, people and typography tiles.", ["9-post grid concept", "Colour & type rules", "Editable templates"]),
    t("Educational Carousel Series", "carousel", (b) => `Turn the ${b}'s expertise into saveable, swipeable posts.`, "Hook slide, value slides and a soft call-to-action on a consistent frame.", ["5 carousel concepts", "Slide templates", "Hook formulas"]),
    t("Reels Concept Pack", "phone", (b) => `Plan short-form videos the ${b} can film quickly and consistently.`, "Shot lists, on-screen text and trending-format adaptations scripted per Reel.", ["6 Reel scripts", "Shot lists", "Cover frames"]),
    t("Product Launch Campaign Creatives", "carousel", (b) => `Build anticipation for a new offer from the ${b}.`, "Teaser, reveal and launch-day assets sequenced across a two-week window.", ["Teaser posts", "Launch graphics", "Story sequence"]),
    t("Branded Story Templates", "phone", (b) => `Help the ${b} post polished Stories without designing from scratch.`, "A template set covering Q&A, behind-the-scenes, promos and testimonials-ready slots.", ["12 Story templates", "Usage guide"]),
    t("Content Strategy Playbook", "report", (b) => `Clarify who the ${b} speaks to and what it should post about.`, "Audience definition, voice guidelines and a pillar-to-format matrix.", ["Audience profile", "Voice guide", "Pillar matrix"]),
    t("Community Engagement Plan", "flow", (b) => `Turn followers of the ${b} into an active, replying community.`, "Daily engagement routines, reply frameworks and conversation-starter prompts.", ["Engagement routine", "Reply templates", "Prompt bank"]),
    t("Promotional Graphics Set", "feed", (b) => `Announce offers from the ${b} with clear, on-brand graphics.`, "Bold offer-led layouts with consistent price, date and call-to-action zones.", ["Promo post set", "Story versions", "Banner sizes"]),
    t("Monthly Social Reporting Template", "dashboard", (b) => `Give the ${b} a simple way to review what's working each month.`, "A one-page report structure tracking reach, saves and replies against goals.", ["Report template", "Metric definitions"]),
  ],
  email: [
    t("Welcome Email Sequence", "email", (b) => `Introduce new subscribers to the ${b} and set expectations.`, "A five-email arc moving from welcome to story to first offer.", ["5-email sequence", "Subject lines", "Layout design"]),
    t("Abandoned-Cart Flow", "flow", (b) => `Remind shoppers of the ${b} about items left behind.`, "Timed reminders with product blocks, reassurance copy and branching by cart value.", ["3-step flow map", "Email designs", "Trigger logic"]),
    t("Monthly Newsletter Design", "email", (b) => `Keep the ${b}'s audience informed with a newsletter they look forward to.`, "A modular newsletter template with feature story, quick links and community slot.", ["Newsletter template", "Content blocks", "Editorial checklist"]),
    t("Product Launch Email Campaign", "email", (b) => `Announce a new release from the ${b} in a memorable way.`, "Teaser, launch and last-chance emails with a consistent visual story.", ["3-email campaign", "Subject line variants", "Hero designs"]),
    t("Re-engagement Campaign", "email", (b) => `Win back quiet subscribers of the ${b}.`, "A friendly check-in sequence ending in a preference-update option.", ["Win-back sequence", "Preference centre copy"]),
    t("Klaviyo Segmentation Map", "flow", (b) => `Send the ${b}'s subscribers more relevant emails.`, "Segments by behaviour and interest, each tied to tailored flows in Klaviyo.", ["Segment definitions", "Flow map", "Setup notes"]),
    t("Mailchimp Onboarding Workflow", "flow", (b) => `Onboard new customers of the ${b} automatically.`, "A Mailchimp customer journey with tips, check-ins and helpful resources.", ["Journey map", "Email copy", "Automation setup"]),
    t("Seasonal Promotion Campaign", "email", (b) => `Make the most of a seasonal moment for the ${b}.`, "A themed campaign with countdown framing and clear offer hierarchy.", ["Campaign emails", "Seasonal header art"]),
    t("Event Invitation Series", "email", (b) => `Invite and remind the ${b}'s audience about an upcoming event.`, "Save-the-date, invitation and reminder emails with RSVP focus.", ["Invite series", "RSVP blocks", "Reminder timing"]),
    t("Lead-Nurturing Sequence", "flow", (b) => `Guide new leads of the ${b} from interest to inquiry.`, "Value-first emails that answer common questions before inviting a conversation.", ["Nurture sequence", "Content map", "CTA strategy"]),
  ],
  web: [
    t("Business Website", "browser", (b) => `Explain what the ${b} does and make inquiries easy.`, "Clear service structure, trust-building layout and visible contact paths.", ["5-page site concept", "Desktop & mobile layouts", "Copy structure"]),
    t("Conversion Landing Page", "browser", (b) => `Focus visitors of the ${b} on one clear action.`, "A single-scroll page with benefit-led sections and a repeated call-to-action.", ["Landing page", "Section copy", "Form design"]),
    t("WordPress Website Concept", "browser", (b) => `Give the ${b} an easy-to-update WordPress site.`, "A block-based layout system the owner can edit without breaking design.", ["Theme layout", "Reusable blocks", "Editing guide"]),
    t("Website Redesign", "browser", (b) => `Modernise the ${b}'s dated website and simplify navigation.`, "Content audit, simplified sitemap and refreshed visual language.", ["Sitemap", "Before/after layouts", "Style guide"]),
    t("Personal Portfolio Site", "browser", (b) => `Showcase the work behind the ${b} in a personal way.`, "Editorial layout with case-study pages and a story-led about section.", ["Portfolio site", "Case-study template"]),
    t("Booking & Appointments Site", "browser", (b) => `Let clients of the ${b} book without back-and-forth messages.`, "Service menu, availability-led booking flow and confirmation pages.", ["Booking flow", "Service pages", "Mobile layout"]),
    t("Mobile-First Microsite", "phone", (b) => `Reach the ${b}'s mostly-mobile audience with a fast, focused site.`, "Thumb-friendly navigation, short sections and sticky contact actions.", ["Mobile layouts", "Interaction notes"]),
    t("Interactive HTML/CSS/JS Concept", "browser", (b) => `Create a memorable, interactive first impression for the ${b}.`, "Scroll-driven reveals and lightweight interactions built with vanilla code.", ["Interactive prototype", "Motion specs"]),
    t("Membership Website Concept", "browser", (b) => `Give members of the ${b} a private home for content.`, "Public sales pages plus a gated member area with clear navigation.", ["Public pages", "Member area layout"]),
    t("Lead-Generation Website", "browser", (b) => `Turn the ${b}'s website visitors into qualified inquiries.`, "Lead magnet placement, short forms and follow-up pathways.", ["Lead pages", "Form strategy", "Thank-you page"]),
  ],
  ecommerce: [
    t("Shopify Storefront Design", "store", (b) => `Give the ${b} a storefront that reflects its brand.`, "Homepage hierarchy leading from hero collection to bestsellers.", ["Homepage design", "Navigation structure", "Mobile store"]),
    t("Product Detail Page", "product", (b) => `Help shoppers of the ${b} decide confidently.`, "Gallery, benefit bullets, variant picker and reassurance blocks near the button.", ["PDP layout", "Copy framework", "Variant design"]),
    t("Collection Page Structure", "store", (b) => `Make the ${b}'s catalogue easy to browse.`, "Filterable collections with clear sorting and visual category tiles.", ["Collection layouts", "Filter logic", "Category tiles"]),
    t("Homepage Redesign", "store", (b) => `Refresh the ${b}'s homepage to highlight what sells.`, "Rebuilt hero, curated collection rows and trust strip.", ["Redesigned homepage", "Section library"]),
    t("Cart & Checkout Experience", "product", (b) => `Reduce friction in the ${b}'s cart and checkout.`, "Slide-out cart, progress cues and simplified checkout fields.", ["Cart drawer", "Checkout flow", "Upsell slot"]),
    t("Product Catalogue Organisation", "dashboard", (b) => `Clean up and organise the ${b}'s product listings.`, "Consistent naming, tags, variants and collection rules.", ["Catalogue structure", "Tagging system", "Upload template"]),
    t("Store UX Audit", "report", (b) => `Identify where the ${b}'s store loses shoppers.`, "Page-by-page review with prioritised, practical recommendations.", ["Audit report", "Priority list", "Annotated screens"]),
    t("Mobile Shopping Experience", "phone", (b) => `Make shopping the ${b} on a phone feel effortless.`, "Sticky add-to-cart, swipe galleries and simplified menus.", ["Mobile layouts", "Interaction specs"]),
    t("Sales-Channel Integration Plan", "flow", (b) => `Connect the ${b}'s store to more places customers shop.`, "A channel map linking Shopify with social shops and marketplaces.", ["Channel map", "Sync checklist"]),
    t("Gift & Bundle Builder Concept", "product", (b) => `Encourage bigger orders at the ${b} through bundles.`, "A build-your-own bundle flow with live price and gift options.", ["Bundle flow", "Gift options design"]),
  ],
  courses: [
    t("LearnDash Course Website", "browser", (b) => `Launch the ${b}'s first online course on WordPress.`, "LearnDash course structure with lessons, topics and progress tracking.", ["Course site", "Lesson structure", "Setup notes"]),
    t("Tutor LMS Academy", "browser", (b) => `Build a multi-course academy for the ${b}.`, "Tutor LMS catalogue, instructor pages and enrolment flow.", ["Academy layout", "Catalogue design"]),
    t("Student Dashboard", "dashboard", (b) => `Help students of the ${b} see progress and what's next.`, "Progress rings, resume-lesson card and upcoming sessions.", ["Dashboard design", "Progress components"]),
    t("Lesson Page Layout", "lesson", (b) => `Make lessons from the ${b} distraction-free.`, "Video-first layout with notes, resources and lesson navigation.", ["Lesson template", "Resource panel"]),
    t("Course Sales Page", "browser", (b) => `Explain the ${b}'s course and invite enrolment.`, "Outcome-led copy, curriculum preview, instructor section and FAQ.", ["Sales page", "Curriculum block", "Pricing section"]),
    t("Skool Community Setup", "community", (b) => `Give the ${b}'s members a lively community home.`, "Skool categories, onboarding post and engagement calendar.", ["Community structure", "Welcome post", "Rituals calendar"]),
    t("Circle Community Concept", "community", (b) => `Organise the ${b}'s community into clear spaces.`, "Circle spaces for discussion, events and resources with onboarding.", ["Space architecture", "Onboarding flow"]),
    t("Student Onboarding Experience", "flow", (b) => `Help new students of the ${b} get started confidently.`, "Welcome email, orientation lesson and first-week checklist.", ["Onboarding journey", "Orientation content"]),
    t("Quiz & Assessment Interface", "lesson", (b) => `Let students of the ${b} check understanding as they learn.`, "Clean question cards with instant feedback and score summaries.", ["Quiz UI", "Feedback states"]),
    t("Resource Library", "store", (b) => `Collect the ${b}'s downloads and guides in one searchable place.`, "Tagged resource cards with filters by topic and format.", ["Library layout", "Tagging system"]),
  ],
  marketing: [
    t("Lead Magnet Design", "report", (b) => `Give the ${b} a useful freebie that attracts the right leads.`, "A practical guide designed for skimming, with a natural next step.", ["Lead magnet PDF", "Opt-in page copy"]),
    t("Marketing Funnel Map", "funnel", (b) => `Map how strangers become customers of the ${b}.`, "Awareness-to-purchase stages with content and touchpoints per stage.", ["Funnel diagram", "Stage content plan"]),
    t("Customer Journey Map", "flow", (b) => `Understand every touchpoint a customer has with the ${b}.`, "Journey stages, questions, emotions and improvement opportunities.", ["Journey map", "Opportunity list"]),
    t("Campaign Planning Document", "report", (b) => `Organise an upcoming campaign for the ${b}.`, "Goals, audience, channels, timeline and asset list in one plan.", ["Campaign brief", "Timeline", "Asset checklist"]),
    t("Content Repurposing System", "flow", (b) => `Get more mileage from each piece of content the ${b} creates.`, "One long-form piece broken into posts, emails and short videos.", ["Repurposing workflow", "Format templates"]),
    t("Marketing Reporting Dashboard", "dashboard", (b) => `Give the ${b} one view of marketing activity.`, "Channel tiles, goal tracking and notes for decisions.", ["Dashboard concept", "Metric guide"]),
    t("Newsletter Signup Experience", "phone", (b) => `Grow the ${b}'s email list with a better signup moment.`, "Inline form, exit-intent offer and friendly confirmation page.", ["Signup forms", "Confirmation page"]),
    t("Website Audit", "report", (b) => `Find quick wins on the ${b}'s website.`, "Review of clarity, speed signals, navigation and calls-to-action.", ["Audit report", "Quick-win list"]),
    t("Marketing Automation Concept", "flow", (b) => `Automate the ${b}'s repetitive marketing tasks.`, "Triggers connecting forms, CRM tags and follow-up emails.", ["Automation map", "Tool connections"]),
    t("Digital Launch Asset Kit", "carousel", (b) => `Equip the ${b} with everything needed for a product launch.`, "Coordinated graphics, email headers and landing hero in one system.", ["Social assets", "Email headers", "Landing hero"]),
  ],
};

// Step and offset per niche chosen so each niche pairs projects with 50 different businesses.
const NICHE_PARAMS: Record<ServiceId, [number, number]> = {
  social: [7, 0],
  email: [11, 3],
  web: [13, 5],
  ecommerce: [17, 8],
  courses: [19, 2],
  marketing: [23, 6],
};


function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function build(): Project[] {
  const out: Project[] = [];
  (Object.keys(TYPES) as ServiceId[]).forEach((cat, ci) => {
    const [step, offset] = NICHE_PARAMS[cat];
    for (let i = 0; i < 50; i++) {
      const type = TYPES[cat][i % 10]!;
      const [business, industry] = BUSINESSES[(i * step + offset) % BUSINESSES.length]!;
      const title = `${type.name} for a ${business}`;
      out.push({
        id: `${cat}-${slug(type.name)}-${slug(business)}`,
        title,
        category: cat,
        subcategory: type.name,
        industry,
        business,
        objective: type.objective(business.toLowerCase()),
        approach: type.approach,
        deliverables: type.deliverables,
        layout: type.layout,
        seed: ci * 1000 + i * 37 + 11,
        authenticity: "concept",
      });
    }
  });
  return out;
}

// Add verified client work here.
export const REAL_PROJECTS: Project[] = [];

export const PROJECTS: Project[] = [...REAL_PROJECTS, ...build()];
