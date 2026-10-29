import { useState } from "react";
import type { Project } from "@/data/portfolio";
import { mockupFor } from "@/data/portfolio-images";
import { MockupArt } from "./MockupArt";

/** Realistic mockup photo for a project; falls back to the drawn mockup if the image fails. */
export function ProjectImage({ p, eager = false }: { p: Project; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const alt = `Illustrative concept mockup: ${p.subcategory} for a ${p.business}`;
  if (failed) return <MockupArt layout={p.layout} seed={p.seed} label={alt} />;
  return (
    <img
      src={mockupFor(p)}
      alt={alt}
      width={1024}
      height={768}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full bg-muted object-cover object-center"
    />
  );
}
