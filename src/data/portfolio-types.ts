import type { ServiceId } from "./services";

export type Layout = "feed" | "carousel" | "phone" | "calendar" | "email" | "flow" | "browser" | "store" | "product" | "dashboard" | "lesson" | "community" | "funnel" | "report";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ServiceId;
  subcategory: string;
  industry: string;
  business: string;
  overview: string;
  objective: string;
  challenge: string;
  solution: string;
  approach: string;
  execution: string;
  outcome: string;
  deliverables: string[];
  tools: string[];
  tags: string[];
  image: string;
  imageAlt: string;
  layout: Layout;
  seed: number;
  authenticity: "concept" | "client";
  publicationStatus: "published";
  results?: string;
}

/** Independently authored concept brief: title, niche, deliverable type, challenge, design response, deliverables, tools, layout. */
export type ConceptBrief = readonly [string, string, string, string, string, readonly string[], readonly string[], Layout];