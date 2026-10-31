import { useState } from "react";
import type { Project } from "@/data/portfolio";
import { mockupFor } from "@/data/portfolio-images";
import { MockupArt } from "./MockupArt";

/** Realistic mockup photo for a project; falls back to the drawn mockup if the image fails. */
export function ProjectImage({ p, eager = false }: { p: Project; eager?: boolean }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const src = mockupFor(p);
  const alt = `Illustrative concept mockup of ${p.subcategory}: ${p.deliverables.join(", ")}`;
  if (!src || failedSource === src) return <MockupArt layout={p.layout} seed={p.seed} label={alt} />;
  return (
    <img
      src={src}
      alt={alt}
      width={1024}
      height={768}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailedSource(src)}
      className="h-full w-full bg-muted object-cover object-center"
    />
  );
}
