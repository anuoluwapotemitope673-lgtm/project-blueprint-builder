import type { Project } from "./portfolio-types";
import image0 from "@/assets/portfolio/linen-care-editorial-calendar.webp";
import image1 from "@/assets/portfolio/ankara-tailoring-process-grid.webp";
import image2 from "@/assets/portfolio/skincare-ingredient-explainer-slides.webp";
import image3 from "@/assets/portfolio/natural-hair-wash-day-reels.webp";
import image4 from "@/assets/portfolio/coffee-origin-story-series.webp";
import image5 from "@/assets/portfolio/meal-prep-menu-release-board.webp";
import image6 from "@/assets/portfolio/pilates-movement-education-cards.webp";
import image7 from "@/assets/portfolio/strength-coach-technique-clips.webp";
import image8 from "@/assets/portfolio/career-change-conversation-prompts.webp";
import image9 from "@/assets/portfolio/illustrator-sketchbook-feed.webp";
import image10 from "@/assets/portfolio/eco-lodge-arrival-story-guide.webp";
import image11 from "@/assets/portfolio/city-tour-meeting-point-graphics.webp";
import image12 from "@/assets/portfolio/jewelry-materials-transparency-grid.webp";
import image13 from "@/assets/portfolio/pet-harness-fit-carousel.webp";
import image14 from "@/assets/portfolio/toy-safety-content-planner.webp";
import image15 from "@/assets/portfolio/language-academy-pronunciation-reels.webp";
import image16 from "@/assets/portfolio/indoor-plant-rescue-slides.webp";
import image17 from "@/assets/portfolio/planner-habit-challenge-stories.webp";
import image18 from "@/assets/portfolio/car-detailing-before-care-shot-plan.webp";
import image19 from "@/assets/portfolio/dental-appointment-preparation-posts.webp";
import image20 from "@/assets/portfolio/interior-studio-material-moodboard.webp";
import image21 from "@/assets/portfolio/wedding-photography-shot-priorities.webp";
import image22 from "@/assets/portfolio/nonprofit-volunteer-welcome-threads.webp";
import image23 from "@/assets/portfolio/food-bank-donation-sorting-graphics.webp";
import image24 from "@/assets/portfolio/women-in-tech-speaker-announcement-kit.webp";
import image25 from "@/assets/portfolio/book-club-discussion-rhythm.webp";
import image26 from "@/assets/portfolio/restaurant-menu-photography-brief.webp";
import image27 from "@/assets/portfolio/barber-booking-highlights.webp";
import image28 from "@/assets/portfolio/streetwear-drop-production-checklist.webp";
import image29 from "@/assets/portfolio/podcast-audience-listening-report.webp";
import image30 from "@/assets/portfolio/candle-scent-finder-welcome-journey.webp";
import image31 from "@/assets/portfolio/linen-variant-cart-reminder.webp";
import image32 from "@/assets/portfolio/coffee-subscription-editorial-newsletter.webp";
import image33 from "@/assets/portfolio/ceramic-collection-preview-emails.webp";
import image34 from "@/assets/portfolio/fitness-email-preference-reset.webp";
import image35 from "@/assets/portfolio/pet-shop-behaviour-segmentation.webp";
import image36 from "@/assets/portfolio/consultant-discovery-follow-up.webp";
import image37 from "@/assets/portfolio/tour-booking-pre-arrival-journey.webp";
import image38 from "@/assets/portfolio/charity-volunteer-orientation-emails.webp";
import image39 from "@/assets/portfolio/language-placement-invitation-series.webp";
import image40 from "@/assets/portfolio/skincare-routine-interest-segments.webp";
import image41 from "@/assets/portfolio/jewelry-gift-timing-emails.webp";
import image42 from "@/assets/portfolio/portfolio-enquiry-acknowledgement.webp";
import image43 from "@/assets/portfolio/meal-plan-dietary-preference-journey.webp";
import image44 from "@/assets/portfolio/course-incomplete-registration-reminder.webp";
import image45 from "@/assets/portfolio/plant-shop-care-newsletter.webp";
import image46 from "@/assets/portfolio/saas-feature-orientation-emails.webp";
import image47 from "@/assets/portfolio/eco-lodge-accessibility-enquiry-flow.webp";
import image48 from "@/assets/portfolio/nonprofit-donation-stewardship-letter.webp";
import image49 from "@/assets/portfolio/planner-digital-download-delivery.webp";
import image50 from "@/assets/portfolio/dental-recall-consent-journey.webp";
import image51 from "@/assets/portfolio/architecture-project-brief-nurture.webp";
import image52 from "@/assets/portfolio/music-workshop-waitlist-release.webp";
import image53 from "@/assets/portfolio/cleaning-service-first-visit-checklist.webp";
import image54 from "@/assets/portfolio/community-digest-topic-preferences.webp";
import image55 from "@/assets/portfolio/architecture-project-index.webp";
import image56 from "@/assets/portfolio/dental-new-patient-information-site.webp";
import image57 from "@/assets/portfolio/tour-route-booking-prototype.webp";
import image58 from "@/assets/portfolio/illustrator-case-study-portfolio.webp";
import image59 from "@/assets/portfolio/consultant-workshop-enquiry-page.webp";
import image60 from "@/assets/portfolio/plant-shop-care-microsite.webp";
import image61 from "@/assets/portfolio/law-practice-service-navigation.webp";
import image62 from "@/assets/portfolio/pilates-class-selection-site.webp";
import image63 from "@/assets/portfolio/coffee-wholesale-lead-page.webp";
import image64 from "@/assets/portfolio/wedding-planner-package-explorer.webp";
import image65 from "@/assets/portfolio/food-bank-donation-information-hub.webp";
import image66 from "@/assets/portfolio/women-in-tech-member-resource-site.webp";
import image67 from "@/assets/portfolio/car-detailing-service-area-microsite.webp";
import image68 from "@/assets/portfolio/finance-advisor-document-checklist.webp";
import image69 from "@/assets/portfolio/music-school-instructor-directory.webp";
import image70 from "@/assets/portfolio/cybersecurity-service-brief-site.webp";
import image71 from "@/assets/portfolio/eco-lodge-accessibility-directory.webp";
import image72 from "@/assets/portfolio/baker-custom-cake-brief-builder.webp";
import image73 from "@/assets/portfolio/natural-hair-studio-service-guide.webp";
import image74 from "@/assets/portfolio/language-academy-placement-microsite.webp";
import image75 from "@/assets/portfolio/interior-studio-material-journal.webp";
import image76 from "@/assets/portfolio/nonprofit-volunteer-role-directory.webp";
import image77 from "@/assets/portfolio/podcast-episode-transcript-site.webp";
import image78 from "@/assets/portfolio/photography-image-licensing-page.webp";
import image79 from "@/assets/portfolio/local-cleaning-recurring-service-site.webp";
import image80 from "@/assets/portfolio/bootcamp-curriculum-explorer.webp";
import image81 from "@/assets/portfolio/book-club-reading-archive.webp";
import image82 from "@/assets/portfolio/jewelry-repair-information-page.webp";
import image83 from "@/assets/portfolio/community-event-accessibility-form.webp";
import image84 from "@/assets/portfolio/realtor-property-comparison-prototype.webp";
import image85 from "@/assets/portfolio/accountant-service-document-hub.webp";
import image86 from "@/assets/portfolio/saas-help-centre-navigation.webp";
import image87 from "@/assets/portfolio/linen-size-and-fit-product-page.webp";
import image88 from "@/assets/portfolio/skincare-texture-comparison-store.webp";
import image89 from "@/assets/portfolio/coffee-grind-variant-selector.webp";
import image90 from "@/assets/portfolio/pet-harness-measurement-store.webp";
import image91 from "@/assets/portfolio/jewelry-metal-collection-filters.webp";
import image92 from "@/assets/portfolio/candle-gift-box-builder.webp";
import image93 from "@/assets/portfolio/toy-age-band-catalogue.webp";
import image94 from "@/assets/portfolio/plant-delivery-cart-guidance.webp";
import image95 from "@/assets/portfolio/stationery-paper-format-collections.webp";
import image96 from "@/assets/portfolio/meal-prep-pickup-checkout-prototype.webp";
import image97 from "@/assets/portfolio/ankara-fabric-length-product-selector.webp";
import image98 from "@/assets/portfolio/home-goods-room-based-storefront.webp";
import image99 from "@/assets/portfolio/ceramic-fragile-item-checkout.webp";
import image100 from "@/assets/portfolio/sports-nutrition-label-audit.webp";
import image101 from "@/assets/portfolio/hair-care-routine-bundle.webp";
import image102 from "@/assets/portfolio/music-sample-pack-licence-page.webp";
import image103 from "@/assets/portfolio/coffee-subscription-cart-controls.webp";
import image104 from "@/assets/portfolio/streetwear-drop-inventory-catalogue.webp";
import image105 from "@/assets/portfolio/pet-accessories-social-shop-map.webp";
import image106 from "@/assets/portfolio/candle-mobile-scent-explorer.webp";
import image107 from "@/assets/portfolio/toy-gift-recipient-bundle.webp";
import image108 from "@/assets/portfolio/skincare-ingredient-catalogue-cleanup.webp";
import image109 from "@/assets/portfolio/jewelry-mobile-variant-gallery.webp";
import image110 from "@/assets/portfolio/eco-home-goods-materials-audit.webp";
import image111 from "@/assets/portfolio/planner-digital-and-print-storefront.webp";
import image112 from "@/assets/portfolio/local-baker-cake-deposit-prototype.webp";
import image113 from "@/assets/portfolio/linen-marketplaces-attribute-map.webp";
import image114 from "@/assets/portfolio/plant-shop-seasonal-homepage.webp";
import image115 from "@/assets/portfolio/coding-bootcamp-prerequisite-academy.webp";
import image116 from "@/assets/portfolio/language-listening-lesson-interface.webp";
import image117 from "@/assets/portfolio/music-production-practice-dashboard.webp";
import image118 from "@/assets/portfolio/leadership-workshop-resource-library.webp";
import image119 from "@/assets/portfolio/yoga-instructor-orientation-journey.webp";
import image120 from "@/assets/portfolio/photography-critique-community.webp";
import image121 from "@/assets/portfolio/illustration-process-course-sales-page.webp";
import image122 from "@/assets/portfolio/finance-basics-scenario-quiz.webp";
import image123 from "@/assets/portfolio/plant-care-seasonal-learning-hub.webp";
import image124 from "@/assets/portfolio/volunteer-safeguarding-orientation.webp";
import image125 from "@/assets/portfolio/book-club-facilitator-community.webp";
import image126 from "@/assets/portfolio/career-portfolio-review-academy.webp";
import image127 from "@/assets/portfolio/hair-braiding-technique-lesson.webp";
import image128 from "@/assets/portfolio/restaurant-team-induction-dashboard.webp";
import image129 from "@/assets/portfolio/community-event-toolkit-library.webp";
import image130 from "@/assets/portfolio/artisan-product-photography-quiz.webp";
import image131 from "@/assets/portfolio/remote-coaching-member-portal.webp";
import image132 from "@/assets/portfolio/language-conversation-practice-spaces.webp";
import image133 from "@/assets/portfolio/architecture-sketching-curriculum.webp";
import image134 from "@/assets/portfolio/podcast-production-course-overview.webp";
import image135 from "@/assets/portfolio/consultant-discovery-worksheet-lead-magnet.webp";
import image136 from "@/assets/portfolio/coffee-wholesale-customer-journey.webp";
import image137 from "@/assets/portfolio/eco-lodge-enquiry-funnel-blueprint.webp";
import image138 from "@/assets/portfolio/skincare-product-launch-asset-system.webp";
import image139 from "@/assets/portfolio/nonprofit-campaign-approval-planner.webp";
import image140 from "@/assets/portfolio/podcast-episode-repurposing-map.webp";
import image141 from "@/assets/portfolio/local-service-enquiry-routing-concept.webp";
import image142 from "@/assets/portfolio/plant-care-newsletter-opt-in.webp";
import image143 from "@/assets/portfolio/architecture-website-clarity-audit.webp";
import image144 from "@/assets/portfolio/meal-prep-campaign-decision-dashboard.webp";
import image145 from "@/assets/portfolio/photography-enquiry-brief-workflow.webp";
import image146 from "@/assets/portfolio/jewelry-care-guide-download-kit.webp";
import image147 from "@/assets/portfolio/language-workshop-channel-plan.webp";
import image148 from "@/assets/portfolio/community-accessibility-touchpoint-map.webp";
import image149 from "@/assets/portfolio/fashion-launch-content-readiness-audit.webp";

export const MOCKUPS: Readonly<Record<string, string>> = {
  "linen-care-editorial-calendar": image0,
  "ankara-tailoring-process-grid": image1,
  "skincare-ingredient-explainer-slides": image2,
  "natural-hair-wash-day-reels": image3,
  "coffee-origin-story-series": image4,
  "meal-prep-menu-release-board": image5,
  "pilates-movement-education-cards": image6,
  "strength-coach-technique-clips": image7,
  "career-change-conversation-prompts": image8,
  "illustrator-sketchbook-feed": image9,
  "eco-lodge-arrival-story-guide": image10,
  "city-tour-meeting-point-graphics": image11,
  "jewelry-materials-transparency-grid": image12,
  "pet-harness-fit-carousel": image13,
  "toy-safety-content-planner": image14,
  "language-academy-pronunciation-reels": image15,
  "indoor-plant-rescue-slides": image16,
  "planner-habit-challenge-stories": image17,
  "car-detailing-before-care-shot-plan": image18,
  "dental-appointment-preparation-posts": image19,
  "interior-studio-material-moodboard": image20,
  "wedding-photography-shot-priorities": image21,
  "nonprofit-volunteer-welcome-threads": image22,
  "food-bank-donation-sorting-graphics": image23,
  "women-in-tech-speaker-announcement-kit": image24,
  "book-club-discussion-rhythm": image25,
  "restaurant-menu-photography-brief": image26,
  "barber-booking-highlights": image27,
  "streetwear-drop-production-checklist": image28,
  "podcast-audience-listening-report": image29,
  "candle-scent-finder-welcome-journey": image30,
  "linen-variant-cart-reminder": image31,
  "coffee-subscription-editorial-newsletter": image32,
  "ceramic-collection-preview-emails": image33,
  "fitness-email-preference-reset": image34,
  "pet-shop-behaviour-segmentation": image35,
  "consultant-discovery-follow-up": image36,
  "tour-booking-pre-arrival-journey": image37,
  "charity-volunteer-orientation-emails": image38,
  "language-placement-invitation-series": image39,
  "skincare-routine-interest-segments": image40,
  "jewelry-gift-timing-emails": image41,
  "portfolio-enquiry-acknowledgement": image42,
  "meal-plan-dietary-preference-journey": image43,
  "course-incomplete-registration-reminder": image44,
  "plant-shop-care-newsletter": image45,
  "saas-feature-orientation-emails": image46,
  "eco-lodge-accessibility-enquiry-flow": image47,
  "nonprofit-donation-stewardship-letter": image48,
  "planner-digital-download-delivery": image49,
  "dental-recall-consent-journey": image50,
  "architecture-project-brief-nurture": image51,
  "music-workshop-waitlist-release": image52,
  "cleaning-service-first-visit-checklist": image53,
  "community-digest-topic-preferences": image54,
  "architecture-project-index": image55,
  "dental-new-patient-information-site": image56,
  "tour-route-booking-prototype": image57,
  "illustrator-case-study-portfolio": image58,
  "consultant-workshop-enquiry-page": image59,
  "plant-shop-care-microsite": image60,
  "law-practice-service-navigation": image61,
  "pilates-class-selection-site": image62,
  "coffee-wholesale-lead-page": image63,
  "wedding-planner-package-explorer": image64,
  "food-bank-donation-information-hub": image65,
  "women-in-tech-member-resource-site": image66,
  "car-detailing-service-area-microsite": image67,
  "finance-advisor-document-checklist": image68,
  "music-school-instructor-directory": image69,
  "cybersecurity-service-brief-site": image70,
  "eco-lodge-accessibility-directory": image71,
  "baker-custom-cake-brief-builder": image72,
  "natural-hair-studio-service-guide": image73,
  "language-academy-placement-microsite": image74,
  "interior-studio-material-journal": image75,
  "nonprofit-volunteer-role-directory": image76,
  "podcast-episode-transcript-site": image77,
  "photography-image-licensing-page": image78,
  "local-cleaning-recurring-service-site": image79,
  "bootcamp-curriculum-explorer": image80,
  "book-club-reading-archive": image81,
  "jewelry-repair-information-page": image82,
  "community-event-accessibility-form": image83,
  "realtor-property-comparison-prototype": image84,
  "accountant-service-document-hub": image85,
  "saas-help-centre-navigation": image86,
  "linen-size-and-fit-product-page": image87,
  "skincare-texture-comparison-store": image88,
  "coffee-grind-variant-selector": image89,
  "pet-harness-measurement-store": image90,
  "jewelry-metal-collection-filters": image91,
  "candle-gift-box-builder": image92,
  "toy-age-band-catalogue": image93,
  "plant-delivery-cart-guidance": image94,
  "stationery-paper-format-collections": image95,
  "meal-prep-pickup-checkout-prototype": image96,
  "ankara-fabric-length-product-selector": image97,
  "home-goods-room-based-storefront": image98,
  "ceramic-fragile-item-checkout": image99,
  "sports-nutrition-label-audit": image100,
  "hair-care-routine-bundle": image101,
  "music-sample-pack-licence-page": image102,
  "coffee-subscription-cart-controls": image103,
  "streetwear-drop-inventory-catalogue": image104,
  "pet-accessories-social-shop-map": image105,
  "candle-mobile-scent-explorer": image106,
  "toy-gift-recipient-bundle": image107,
  "skincare-ingredient-catalogue-cleanup": image108,
  "jewelry-mobile-variant-gallery": image109,
  "eco-home-goods-materials-audit": image110,
  "planner-digital-and-print-storefront": image111,
  "local-baker-cake-deposit-prototype": image112,
  "linen-marketplaces-attribute-map": image113,
  "plant-shop-seasonal-homepage": image114,
  "coding-bootcamp-prerequisite-academy": image115,
  "language-listening-lesson-interface": image116,
  "music-production-practice-dashboard": image117,
  "leadership-workshop-resource-library": image118,
  "yoga-instructor-orientation-journey": image119,
  "photography-critique-community": image120,
  "illustration-process-course-sales-page": image121,
  "finance-basics-scenario-quiz": image122,
  "plant-care-seasonal-learning-hub": image123,
  "volunteer-safeguarding-orientation": image124,
  "book-club-facilitator-community": image125,
  "career-portfolio-review-academy": image126,
  "hair-braiding-technique-lesson": image127,
  "restaurant-team-induction-dashboard": image128,
  "community-event-toolkit-library": image129,
  "artisan-product-photography-quiz": image130,
  "remote-coaching-member-portal": image131,
  "language-conversation-practice-spaces": image132,
  "architecture-sketching-curriculum": image133,
  "podcast-production-course-overview": image134,
  "consultant-discovery-worksheet-lead-magnet": image135,
  "coffee-wholesale-customer-journey": image136,
  "eco-lodge-enquiry-funnel-blueprint": image137,
  "skincare-product-launch-asset-system": image138,
  "nonprofit-campaign-approval-planner": image139,
  "podcast-episode-repurposing-map": image140,
  "local-service-enquiry-routing-concept": image141,
  "plant-care-newsletter-opt-in": image142,
  "architecture-website-clarity-audit": image143,
  "meal-prep-campaign-decision-dashboard": image144,
  "photography-enquiry-brief-workflow": image145,
  "jewelry-care-guide-download-kit": image146,
  "language-workshop-channel-plan": image147,
  "community-accessibility-touchpoint-map": image148,
  "fashion-launch-content-readiness-audit": image149,
};

export function mockupKeyFor(p: Pick<Project, "slug">): string { return p.slug; }
export function mockupFor(p: Pick<Project, "slug">): string | undefined { return MOCKUPS[p.slug]; }
