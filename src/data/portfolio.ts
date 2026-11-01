import { CONCEPT_BRIEFS } from "./portfolio-briefs";
import { MOCKUPS } from "./portfolio-images";
import type { Project } from "./portfolio-types";
import type { ServiceId } from "./services";
export type { Project, Layout } from "./portfolio-types";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** Single canonical published inventory; concepts are never described as completed client jobs. */
export const REAL_PROJECTS: Project[] = [];
export const PROJECTS: Project[] = Object.entries(CONCEPT_BRIEFS).flatMap(([category, briefs]) =>
  briefs.map(([title, industry, subcategory, challenge, solution, deliverables, tools, layout], index) => {
    const slug = slugify(title);
    const image = MOCKUPS[slug];
    if (!image) throw new Error(`Missing original concept image: ${slug}`);
    return {
      id: slug, slug, title, category: category as ServiceId, subcategory, industry,
      business: `${industry} business scenario`,
      overview: `${title} is an illustrative ${subcategory.toLowerCase()} concept centred on ${deliverables.join(", ").toLowerCase()}.`,
      objective: challenge,
      challenge,
      solution,
      approach: solution,
      execution: `The concept specification covers ${deliverables.join("; ").toLowerCase()}. The accompanying original preview illustrates this design response; it is not evidence of a deployed service or a client engagement.`,
      outcome: `Proposed output: ${deliverables.join(", ").toLowerCase()}. Its intended benefit is to address the brief: ${challenge} No performance improvement or live implementation is claimed.`,
      deliverables: [...deliverables], tools: [...tools],
      tags: [industry, subcategory, ...tools], image,
      imageAlt: `Original illustrative concept: ${title}, showing ${deliverables.join(", ").toLowerCase()}`,
      layout, seed: Object.keys(CONCEPT_BRIEFS).indexOf(category) * 1000 + index,
      authenticity: "concept" as const, publicationStatus: "published" as const,
    };
  })
);
