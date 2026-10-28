import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectCard, ProjectDialog } from "@/components/site/ProjectCard";
import { Button } from "@/components/ui/button";
import { SERVICES, type ServiceId } from "@/data/services";
import { PROJECTS, type Project } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — 300 Concept Projects | Mercy Digital Riches" },
      { name: "description", content: "Browse original concept projects across social media, email marketing, websites, Shopify, online courses and digital marketing." },
      { property: "og:title", content: "Portfolio | Mercy Digital Riches" },
      { property: "og:description", content: "Searchable portfolio of concept projects across six freelance digital service areas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const PAGE = 12;

function PortfolioPage() {
  const [cat, setCat] = useState<ServiceId | "all">("all");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(PAGE);
  const [active, setActive] = useState<Project | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PROJECTS.length };
    PROJECTS.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return PROJECTS.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (!s || `${p.title} ${p.subcategory} ${p.industry}`.toLowerCase().includes(s)),
    );
  }, [cat, q]);

  const reset = () => setLimit(PAGE);

  return (
    <>
      <Header />
      <main>
        <section className="section-dark pb-16 pt-36">
          <div className="mx-auto max-w-7xl px-6">
            <p className="eyebrow text-lime">Portfolio</p>
            <h1 className="mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">A substantial body of <em className="text-lime">concept work.</em></h1>
            <p className="mt-5 max-w-2xl text-paper/65">
              {PROJECTS.length} original demonstration projects across six service areas. Each is labelled “Concept project” — they show approach and range, not client results. Verified client work will be marked separately.
            </p>
            <div className="relative mt-10 max-w-xl">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40" />
              <input
                type="search"
                value={q}
                onChange={(e) => { setQ(e.target.value); reset(); }}
                placeholder="Search by title, service or industry…"
                aria-label="Search projects"
                className="w-full rounded-full border border-ink-line bg-ink-soft py-3.5 pl-11 pr-4 text-sm text-paper placeholder:text-paper/35 focus:border-lime focus:outline-none"
              />
            </div>
            <div role="tablist" aria-label="Categories" className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {[{ id: "all" as const, short: "All Projects" }, ...SERVICES].map((s) => (
                <button key={s.id} role="tab" aria-selected={cat === s.id} onClick={() => { setCat(s.id); reset(); }}
                  className={cn("shrink-0 rounded-full border px-4 py-2 text-sm transition-all",
                    cat === s.id ? "border-lime bg-lime font-semibold text-ink" : "border-ink-line text-paper/70 hover:text-paper")}>
                  {s.short} <span className="opacity-60">({counts[s.id]})</span>
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="py-14">
          <div className="mx-auto max-w-7xl px-6">
            <p className="text-sm text-muted-foreground" aria-live="polite">Showing {Math.min(limit, filtered.length)} of {filtered.length} projects</p>
            {filtered.length === 0 ? (
              <div className="mt-10 rounded-3xl border border-dashed p-12 text-center">
                <p className="font-display text-2xl">No projects match that search.</p>
                <Button variant="ghostDark" className="mt-5 h-10 px-5" onClick={() => { setQ(""); setCat("all"); }}>Clear filters</Button>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.slice(0, limit).map((p) => <ProjectCard key={p.id} p={p} onOpen={setActive} />)}
              </div>
            )}
            {limit < filtered.length && (
              <div className="mt-12 text-center">
                <Button variant="ink" size="xl" onClick={() => setLimit((l) => l + PAGE)}>Load More Projects</Button>
              </div>
            )}
            <div className="mt-16 text-center">
              <Button asChild variant="lime" size="xl"><Link to="/" hash="contact">Discuss Your Project</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ProjectDialog p={active} onClose={() => setActive(null)} />
    </>
  );
}
