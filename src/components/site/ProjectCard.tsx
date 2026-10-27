import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { SERVICES } from "@/data/services";
import { MockupArt } from "./MockupArt";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const short = (id: string) => SERVICES.find((s) => s.id === id)?.short ?? id;

export function AuthBadge({ p }: { p: Project }) {
  return p.authenticity === "client" ? (
    <span className="eyebrow rounded-full bg-lime px-2.5 py-1 text-[0.6rem] text-ink">Client work</span>
  ) : (
    <span className="eyebrow rounded-full border border-current/30 bg-paper/90 px-2.5 py-1 text-[0.6rem] text-ink">Concept project</span>
  );
}

export function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <button type="button" onClick={() => onOpen(p)} className="relative block aspect-[4/3] overflow-hidden text-left" aria-label={`View details: ${p.title}`}>
        <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]">
          <MockupArt layout={p.layout} seed={p.seed} label={`Illustrative mockup: ${p.subcategory}`} />
        </div>
        <span className="absolute left-3 top-3"><AuthBadge p={p} /></span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <p className="eyebrow text-[0.62rem] text-muted-foreground">{short(p.category)} · {p.industry}</p>
        <h3 className="mt-2 font-display text-lg leading-snug">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.objective}</p>
        <button type="button" onClick={() => onOpen(p)} className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-ink underline-offset-4 hover:underline">
          Explore case study <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}

export function ProjectDialog({ p, onClose }: { p: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!p} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto rounded-3xl p-0">
        {p && (
          <>
            <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl">
              <MockupArt layout={p.layout} seed={p.seed} label={`Illustrative mockup: ${p.subcategory}`} />
              <span className="absolute left-4 top-4"><AuthBadge p={p} /></span>
            </div>
            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <p className="eyebrow text-[0.65rem] text-muted-foreground">{short(p.category)} · {p.subcategory} · {p.industry}</p>
                <DialogTitle className="mt-2 font-display text-2xl sm:text-3xl">{p.title}</DialogTitle>
                <DialogDescription className="mt-2">
                  {p.authenticity === "concept"
                    ? "An original concept project created to demonstrate approach and capability. It is not client work and makes no claims about results."
                    : "Verified client project."}
                </DialogDescription>
              </div>
              <dl className="grid gap-5 sm:grid-cols-2">
                <div><dt className="eyebrow text-[0.62rem] text-lime-deep">Objective</dt><dd className="mt-1.5 text-sm">{p.objective}</dd></div>
                <div><dt className="eyebrow text-[0.62rem] text-lime-deep">Approach</dt><dd className="mt-1.5 text-sm">{p.approach}</dd></div>
                <div><dt className="eyebrow text-[0.62rem] text-lime-deep">My role</dt><dd className="mt-1.5 text-sm">Strategy, design and implementation of the concept from brief to final deliverables.</dd></div>
                <div>
                  <dt className="eyebrow text-[0.62rem] text-lime-deep">Deliverables</dt>
                  <dd><ul className="mt-1.5 space-y-1 text-sm">{p.deliverables.map((d) => <li key={d} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-deep" />{d}</li>)}</ul></dd>
                </div>
                {p.results && <div className="sm:col-span-2"><dt className="eyebrow text-[0.62rem] text-lime-deep">Verified results</dt><dd className="mt-1.5 text-sm">{p.results}</dd></div>}
              </dl>
              <Button asChild variant="ink" size="xl" className="w-full sm:w-auto">
                <Link to="/" search={{ service: p.category }} hash="contact" onClick={onClose}>Discuss a Similar Project</Link>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
