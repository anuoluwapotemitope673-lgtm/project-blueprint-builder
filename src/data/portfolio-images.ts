import type { Project } from "./portfolio";
import socialFeed from "@/assets/mockups/social-feed.jpg";
import socialStories from "@/assets/mockups/social-stories.jpg";
import emailNewsletter from "@/assets/mockups/email-newsletter.jpg";
import emailFlow from "@/assets/mockups/email-flow.jpg";
import webBusiness from "@/assets/mockups/web-business.jpg";
import webResponsive from "@/assets/mockups/web-responsive.jpg";
import shopStore from "@/assets/mockups/shop-store.jpg";
import shopProduct from "@/assets/mockups/shop-product.jpg";
import courseLesson from "@/assets/mockups/course-lesson.jpg";
import courseCommunity from "@/assets/mockups/course-community.jpg";
import marketingDashboard from "@/assets/mockups/marketing-dashboard.jpg";
import marketingReport from "@/assets/mockups/marketing-report.jpg";

/** Illustrative mockup images. Each project type maps to the image that matches its deliverable. */
export const MOCKUPS = {
  socialFeed, socialStories, emailNewsletter, emailFlow, webBusiness, webResponsive,
  shopStore, shopProduct, courseLesson, courseCommunity, marketingDashboard, marketingReport,
} as const;

export type MockupKey = keyof typeof MOCKUPS;

export function mockupKeyFor(p: Pick<Project, "category" | "layout" | "subcategory">): MockupKey {
  const { category, layout, subcategory } = p;
  switch (category) {
    case "social":
      return layout === "phone" || layout === "carousel" ? "socialStories" : "socialFeed";
    case "email":
      return layout === "flow" ? "emailFlow" : "emailNewsletter";
    case "web":
      return /landing|booking|mobile|lead|membership/i.test(subcategory) ? "webResponsive" : "webBusiness";
    case "ecommerce":
      return layout === "product" || layout === "phone" ? "shopProduct" : "shopStore";
    case "courses":
      return layout === "community" || layout === "dashboard" || layout === "flow" ? "courseCommunity" : "courseLesson";
    case "marketing":
      return layout === "dashboard" || layout === "flow" || layout === "phone" ? "marketingDashboard" : "marketingReport";
  }
}

export function mockupFor(p: Pick<Project, "category" | "layout" | "subcategory">): string {
  return MOCKUPS[mockupKeyFor(p)];
}
