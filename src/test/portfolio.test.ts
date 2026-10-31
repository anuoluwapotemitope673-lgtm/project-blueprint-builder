import { describe, expect, it } from "vitest";
import { PROJECTS } from "@/data/portfolio";
import { SERVICES } from "@/data/services";
import { mailtoHref, whatsappHref } from "@/lib/site-config";

describe("portfolio", () => {
  it("has at least 50 projects in each of the six niches", () => {
    for (const s of SERVICES) expect(PROJECTS.filter((p) => p.category === s.id).length).toBeGreaterThanOrEqual(50);
    expect(PROJECTS.length).toBeGreaterThanOrEqual(300);
  });
  it("has no duplicate ids, titles or seeds", () => {
    expect(new Set(PROJECTS.map((p) => p.id)).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((p) => p.title)).size).toBe(PROJECTS.length);
    expect(new Set(PROJECTS.map((p) => p.seed)).size).toBe(PROJECTS.length);
  });
  it("labels demonstration projects as concepts with no results", () => {
    for (const p of PROJECTS.filter((p) => p.authenticity === "concept")) expect(p.results).toBeUndefined();
  });
});

describe("contact links", () => {
  it("uses the official email and WhatsApp number", () => {
    expect(mailtoHref()).toBe("mailto:mercydigitalagency1@gmail.com");
    expect(whatsappHref()).toMatch(/^https:\/\/wa\.me\/2348163242998\?text=/);
  });
});

import { mockupFor, mockupKeyFor, MOCKUPS } from "@/data/portfolio-images";
describe("portfolio images", () => {
  it("assigns an image to every project", () => {
    for (const p of PROJECTS) expect(mockupFor(p)).toBeTruthy();
  });
  it("assigns 60 unique assets and never shares an image between project types", () => {
    const owner = new Map<string, string>();
    for (const p of PROJECTS) {
      const k = mockupKeyFor(p);
      const src = mockupFor(p);
      expect(src).toBeDefined();
      if (!src) throw new Error(`Missing mockup: ${k}`);
      expect(owner.get(src) ?? k).toBe(k);
      owner.set(src, k);
    }
    expect(owner.size).toBe(60);
    expect(Object.values(MOCKUPS).flatMap(Object.values)).toHaveLength(60);
  });
  it("matches every image to its exact category and project description", () => {
    for (const p of PROJECTS) {
      const images: Readonly<Record<string, string>> = MOCKUPS[p.category];
      expect(Object.hasOwn(images, p.subcategory)).toBe(true);
      expect(mockupFor(p)).toBe(images[p.subcategory]);
    }
  });
  it("does not give an unknown type an unrelated image", () => {
    expect(mockupFor({ category: "social", subcategory: "Unknown project" })).toBeUndefined();
  });
});
