import type { Project } from "./portfolio";
import mockup0 from "@/assets/mockups/social-monthly-content-calendar.jpg";
import mockup1 from "@/assets/mockups/social-feed.jpg";
import mockup2 from "@/assets/mockups/social-educational-carousel-series.jpg";
import mockup3 from "@/assets/mockups/social-stories.jpg";
import mockup4 from "@/assets/mockups/social-product-launch-campaign-creatives.jpg";
import mockup5 from "@/assets/mockups/social-branded-story-templates.jpg";
import mockup6 from "@/assets/mockups/social-content-strategy-playbook.jpg";
import mockup7 from "@/assets/mockups/social-community-engagement-plan.jpg";
import mockup8 from "@/assets/mockups/social-promotional-graphics-set.jpg";
import mockup9 from "@/assets/mockups/social-monthly-social-reporting-template.jpg";
import mockup10 from "@/assets/mockups/email-welcome-email-sequence.jpg";
import mockup11 from "@/assets/mockups/email-flow.jpg";
import mockup12 from "@/assets/mockups/email-newsletter.jpg";
import mockup13 from "@/assets/mockups/email-product-launch-email-campaign.jpg";
import mockup14 from "@/assets/mockups/email-re-engagement-campaign.jpg";
import mockup15 from "@/assets/mockups/email-klaviyo-segmentation-map.jpg";
import mockup16 from "@/assets/mockups/email-mailchimp-onboarding-workflow.jpg";
import mockup17 from "@/assets/mockups/email-seasonal-promotion-campaign.jpg";
import mockup18 from "@/assets/mockups/email-event-invitation-series.jpg";
import mockup19 from "@/assets/mockups/email-lead-nurturing-sequence.jpg";
import mockup20 from "@/assets/mockups/web-business.jpg";
import mockup21 from "@/assets/mockups/web-responsive.jpg";
import mockup22 from "@/assets/mockups/web-wordpress-website-concept.jpg";
import mockup23 from "@/assets/mockups/web-website-redesign.jpg";
import mockup24 from "@/assets/mockups/web-personal-portfolio-site.jpg";
import mockup25 from "@/assets/mockups/web-booking-appointments-site.jpg";
import mockup26 from "@/assets/mockups/web-mobile-first-microsite.jpg";
import mockup27 from "@/assets/mockups/web-interactive-html-css-js-concept.jpg";
import mockup28 from "@/assets/mockups/web-membership-website-concept.jpg";
import mockup29 from "@/assets/mockups/web-lead-generation-website.jpg";
import mockup30 from "@/assets/mockups/shop-store.jpg";
import mockup31 from "@/assets/mockups/shop-product.jpg";
import mockup32 from "@/assets/mockups/ecommerce-collection-page-structure.jpg";
import mockup33 from "@/assets/mockups/ecommerce-homepage-redesign.jpg";
import mockup34 from "@/assets/mockups/ecommerce-cart-checkout-experience.jpg";
import mockup35 from "@/assets/mockups/ecommerce-product-catalogue-organisation.jpg";
import mockup36 from "@/assets/mockups/ecommerce-store-ux-audit.jpg";
import mockup37 from "@/assets/mockups/ecommerce-mobile-shopping-experience.jpg";
import mockup38 from "@/assets/mockups/ecommerce-sales-channel-integration-plan.jpg";
import mockup39 from "@/assets/mockups/ecommerce-gift-bundle-builder-concept.jpg";
import mockup40 from "@/assets/mockups/courses-learndash-course-website.jpg";
import mockup41 from "@/assets/mockups/courses-tutor-lms-academy.jpg";
import mockup42 from "@/assets/mockups/courses-student-dashboard.jpg";
import mockup43 from "@/assets/mockups/course-lesson.jpg";
import mockup44 from "@/assets/mockups/courses-course-sales-page.jpg";
import mockup45 from "@/assets/mockups/course-community.jpg";
import mockup46 from "@/assets/mockups/courses-circle-community-concept.jpg";
import mockup47 from "@/assets/mockups/courses-student-onboarding-experience.jpg";
import mockup48 from "@/assets/mockups/courses-quiz-assessment-interface.jpg";
import mockup49 from "@/assets/mockups/courses-resource-library.jpg";
import mockup50 from "@/assets/mockups/marketing-report.jpg";
import mockup51 from "@/assets/mockups/marketing-marketing-funnel-map.jpg";
import mockup52 from "@/assets/mockups/marketing-customer-journey-map.jpg";
import mockup53 from "@/assets/mockups/marketing-campaign-planning-document.jpg";
import mockup54 from "@/assets/mockups/marketing-content-repurposing-system.jpg";
import mockup55 from "@/assets/mockups/marketing-dashboard.jpg";
import mockup56 from "@/assets/mockups/marketing-newsletter-signup-experience.jpg";
import mockup57 from "@/assets/mockups/marketing-website-audit.jpg";
import mockup58 from "@/assets/mockups/marketing-marketing-automation-concept.jpg";
import mockup59 from "@/assets/mockups/marketing-digital-launch-asset-kit.jpg";

/** One illustrative asset per exact service/project type; no image is reused between types. */
export const MOCKUPS = {
  social: {
    "Monthly Content Calendar": mockup0,
    "Instagram Feed Design": mockup1,
    "Educational Carousel Series": mockup2,
    "Reels Concept Pack": mockup3,
    "Product Launch Campaign Creatives": mockup4,
    "Branded Story Templates": mockup5,
    "Content Strategy Playbook": mockup6,
    "Community Engagement Plan": mockup7,
    "Promotional Graphics Set": mockup8,
    "Monthly Social Reporting Template": mockup9,
  },
  email: {
    "Welcome Email Sequence": mockup10,
    "Abandoned-Cart Flow": mockup11,
    "Monthly Newsletter Design": mockup12,
    "Product Launch Email Campaign": mockup13,
    "Re-engagement Campaign": mockup14,
    "Klaviyo Segmentation Map": mockup15,
    "Mailchimp Onboarding Workflow": mockup16,
    "Seasonal Promotion Campaign": mockup17,
    "Event Invitation Series": mockup18,
    "Lead-Nurturing Sequence": mockup19,
  },
  web: {
    "Business Website": mockup20,
    "Conversion Landing Page": mockup21,
    "WordPress Website Concept": mockup22,
    "Website Redesign": mockup23,
    "Personal Portfolio Site": mockup24,
    "Booking & Appointments Site": mockup25,
    "Mobile-First Microsite": mockup26,
    "Interactive HTML/CSS/JS Concept": mockup27,
    "Membership Website Concept": mockup28,
    "Lead-Generation Website": mockup29,
  },
  ecommerce: {
    "Shopify Storefront Design": mockup30,
    "Product Detail Page": mockup31,
    "Collection Page Structure": mockup32,
    "Homepage Redesign": mockup33,
    "Cart & Checkout Experience": mockup34,
    "Product Catalogue Organisation": mockup35,
    "Store UX Audit": mockup36,
    "Mobile Shopping Experience": mockup37,
    "Sales-Channel Integration Plan": mockup38,
    "Gift & Bundle Builder Concept": mockup39,
  },
  courses: {
    "LearnDash Course Website": mockup40,
    "Tutor LMS Academy": mockup41,
    "Student Dashboard": mockup42,
    "Lesson Page Layout": mockup43,
    "Course Sales Page": mockup44,
    "Skool Community Setup": mockup45,
    "Circle Community Concept": mockup46,
    "Student Onboarding Experience": mockup47,
    "Quiz & Assessment Interface": mockup48,
    "Resource Library": mockup49,
  },
  marketing: {
    "Lead Magnet Design": mockup50,
    "Marketing Funnel Map": mockup51,
    "Customer Journey Map": mockup52,
    "Campaign Planning Document": mockup53,
    "Content Repurposing System": mockup54,
    "Marketing Reporting Dashboard": mockup55,
    "Newsletter Signup Experience": mockup56,
    "Website Audit": mockup57,
    "Marketing Automation Concept": mockup58,
    "Digital Launch Asset Kit": mockup59,
  },
} as const;

export function mockupKeyFor(p: Pick<Project, "category" | "subcategory">): string {
  return `${p.category}:${p.subcategory}`;
}

/** Missing mappings deliberately use the component's nonblank fallback, never an unrelated photo. */
export function mockupFor(p: Pick<Project, "category" | "subcategory">): string | undefined {
  const images: Readonly<Record<string, string>> = MOCKUPS[p.category];
  return images[p.subcategory];
}
