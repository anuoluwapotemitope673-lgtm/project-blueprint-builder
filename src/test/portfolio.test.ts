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
