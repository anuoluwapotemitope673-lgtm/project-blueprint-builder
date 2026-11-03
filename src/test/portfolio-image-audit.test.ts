import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { PROJECTS } from "@/data/portfolio";
const audit: { count: number; assets: { slug: string; dimensions: number[]; path: string; sha256: string }[]; near_duplicate_candidates: unknown[] } = JSON.parse(readFileSync(resolve("src/data/portfolio-image-audit.json"), "utf8"));

describe("global image audit", () => {
  it("contains exactly 150 separate image files with no renamed duplicate bytes", () => {
    const folder = resolve("src/assets/portfolio");
    const files = readdirSync(folder).filter(file => file.endsWith(".webp"));
    expect(files).toHaveLength(150);
    const hashes = files.map(file => createHash("sha256").update(readFileSync(resolve(folder, file))).digest("hex"));
    expect(new Set(hashes).size).toBe(150);
  });
  it("has one audited original asset for every canonical project", () => {
    expect(audit.count).toBe(150);
    expect(new Set(audit.assets.map(a => a.slug))).toEqual(new Set(PROJECTS.map(p => p.slug)));
    for (const asset of audit.assets) {
      expect(asset.dimensions).toEqual([1024, 768]);
      const hash = createHash("sha256").update(readFileSync(resolve(asset.path))).digest("hex");
      expect(hash).toBe(asset.sha256);
    }
  });
  it("has no perceptually near-identical preview candidates", () => {
    expect(audit.near_duplicate_candidates).toHaveLength(0);
  });
});