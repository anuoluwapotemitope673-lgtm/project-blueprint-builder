import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/portfolio";
import { SERVICES } from "@/data/services";
import { MOCKUPS, mockupFor } from "@/data/portfolio-images";
import { mailtoHref, whatsappHref } from "@/lib/site-config";

describe("canonical portfolio", () => {
  it("contains exactly 150 projects across all existing services combined", () => {
    expect(PROJECTS).toHaveLength(150);
    expect(SERVICES.reduce((sum, s) => sum + PROJECTS.filter(p => p.category === s.id).length, 0)).toBe(150);
    expect(new Set(PROJECTS.map(p => p.category))).toEqual(new Set(SERVICES.map(s => s.id)));
  });
  it("has no duplicate identities, titles, descriptions or case studies", () => {
    for (const key of ["id", "slug", "title", "overview", "challenge", "solution", "execution", "outcome"] as const) {
      expect(new Set(PROJECTS.map(p => p[key])).size, key).toBe(150);
    }
    expect(new Set(PROJECTS.map(p => JSON.stringify(p.deliverables))).size).toBe(150);
  });
  it("assigns exactly one distinct image to every project with zero repeated references", () => {
    expect(Object.keys(MOCKUPS)).toHaveLength(150);
    expect(new Set(PROJECTS.map(p => p.image)).size).toBe(150);
    for (const p of PROJECTS) expect(mockupFor(p)).toBe(p.image);
  });
  it("never assigns an unrelated image to an unknown identity", () => {
    expect(mockupFor({ slug: "unknown-project" })).toBeUndefined();
  });
  it("has complete specific case studies and service relationships", () => {
    for (const p of PROJECTS) {
      for (const key of ["overview", "objective", "challenge", "solution", "execution", "outcome", "imageAlt"] as const) expect(p[key].length).toBeGreaterThan(30);
      expect(p.deliverables.length).toBeGreaterThanOrEqual(3);
      expect(p.tools.length).toBeGreaterThan(0);
      expect(p.tags).toContain(p.industry);
      expect(p.tags).toContain(p.subcategory);
      expect(p.publicationStatus).toBe("published");
    }
  });
  it("labels every illustrative entry honestly without invented performance results", () => {
    for (const p of PROJECTS) {
      expect(p.authenticity).toBe("concept");
      expect(p.results).toBeUndefined();
      expect(p.execution).toContain("not evidence of a deployed service or a client engagement");
    }
  });
});
describe("contact links", () => {
  it("preserves the official contact details", () => {
    expect(mailtoHref()).toBe("mailto:mercydigitalagency1@gmail.com");
    expect(whatsappHref()).toMatch(/^https:\/\/wa\.me\/2348163242998\?text=/);
  });
});
