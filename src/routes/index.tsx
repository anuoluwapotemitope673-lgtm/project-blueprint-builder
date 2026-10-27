import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Plus, Minus, Sparkles, Share2, Globe, ShoppingBag, GraduationCap, TrendingUp } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Reveal } from "@/components/site/Reveal";
import { MockupArt } from "@/components/site/MockupArt";
import { ProjectCard, ProjectDialog } from "@/components/site/ProjectCard";
import { ContactForm } from "@/components/site/ContactForm";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICES, type ServiceId } from "@/data/services";
import { PROJECTS, type Project } from "@/data/portfolio";
import { SITE, mailtoHref, whatsappHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const searchSchema = z.object({
  service: z.enum(["social", "email", "web", "ecommerce", "courses", "marketing"]).optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: (s) => searchSchema.parse({ service: searchSchema.shape.service.safeParse(s.service).success ? s.service : undefined }),
  head: () => ({
    meta: [
      { title: "Mercy Digital Riches — Freelance Websites, Social Media & Email Marketing" },
      { name: "description", content: "Independent freelancer offering website design, social media management, email marketing, Shopify e-commerce, online course platforms and digital marketing support." },
      { property: "og:title", content: "Mercy Digital Riches — Freelance Digital Services" },
      { property: "og:description", content: "One creative partner for websites, content, email marketing, e-commerce and online learning platforms." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const ICONS: Record<ServiceId, typeof Share2> = {
  social: Share2, email: Mail, web: Globe, ecommerce: ShoppingBag, courses: GraduationCap, marketing: TrendingUp,
};

function Home() {
  const { service } = Route.useSearch();
  return (
    <div id="top">
      <Header />
      <main>
        <Hero />
        <Services />
        <PortfolioPreview />
        <About />
        <WhyMe />
        <Process />
        <Feedback />
        <Faq />
        <Contact preselected={service} />
        <FinalCta />
      </main>
      <Footer />
      <MobileContactBar />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const words = ["Your Vision.", "My Digital Expertise."];
  return (
    <section className="section-dark relative overflow-hidden pb-24 pt-36 sm:pt-40 lg:pb-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full bg-lime/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-ink-line px-4 py-1.5 text-xs text-paper/70">
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-lime" /> Independent freelancer · Multiple digital services
          </p>
          <h1 className="mt-7 text-[2.6rem] font-medium leading-[1.02] sm:text-6xl lg:text-[4.6rem]">
            {words.map((w, i) => (
              <span key={w} className="animate-rise block" style={{ animationDelay: `${120 + i * 120}ms` }}>{w}</span>
            ))}
            <span className="animate-rise block italic text-lime" style={{ animationDelay: "360ms" }}>
              Let's Build Something That Works.
            </span>
          </h1>
          <p className="animate-rise mt-7 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg" style={{ animationDelay: "480ms" }}>
            I help businesses, entrepreneurs, creators, and growing brands strengthen their digital presence through strategic content, professional websites, email marketing, e-commerce solutions, and digital systems designed around their goals.
          </p>
          <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "600ms" }}>
            <Button asChild variant="lime" size="xl"><Link to="/" hash="services">Explore My Services <ArrowRight /></Link></Button>
            <Button asChild variant="ghostLight" size="xl"><Link to="/" hash="contact">Let's Work Together</Link></Button>
          </div>
        </div>
        <div className="relative h-[24rem] sm:h-[30rem] lg:col-span-5">
          <div className="animate-rise absolute left-0 top-6 w-[70%] overflow-hidden rounded-2xl border border-ink-line shadow-lift" style={{ animationDelay: "300ms" }}>
            <div className="aspect-[4/3]"><MockupArt layout="browser" seed={4021} label="Illustrative website mockup" /></div>
          </div>
          <div className="animate-rise absolute right-0 top-24 w-[42%] overflow-hidden rounded-2xl border border-ink-line shadow-lift" style={{ animationDelay: "450ms" }}>
            <div className="animate-float aspect-[3/4]"><MockupArt layout="phone" seed={77} label="Illustrative social media mockup" /></div>
          </div>
          <div className="animate-rise absolute bottom-0 left-[12%] w-[55%] overflow-hidden rounded-2xl border border-ink-line shadow-lift" style={{ animationDelay: "600ms" }}>
            <div className="aspect-[4/3]"><MockupArt layout="email" seed={913} label="Illustrative email mockup" /></div>
          </div>
          <div className="animate-rise absolute -left-2 bottom-20 rounded-full bg-lime px-4 py-2 text-xs font-bold text-ink shadow-lime" style={{ animationDelay: "800ms" }}>
            6 service areas · 1 point of contact
          </div>
        </div>
      </div>
      <div className="relative mt-20 overflow-hidden border-y border-ink-line py-4">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-display text-xl italic text-paper/40">
          {[...SERVICES, ...SERVICES, ...SERVICES, ...SERVICES].map((s, i) => (
            <span key={i} className="flex items-center gap-10">{s.short}<Sparkles className="h-4 w-4 text-lime" /></span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
function Services() {
  const [open, setOpen] = useState<ServiceId | null>(null);
  return (
    <section id="services" className="grid-lines relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-lime-deep">Services</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Everything your digital presence needs — <em className="text-muted-foreground">handled by one person.</em></h2>
          </div>
          <p className="text-muted-foreground lg:col-span-5">Pick one service or combine several. Each area is delivered with the same attention to detail and clear communication.</p>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.id];
            const isOpen = open === s.id;
            const featured = i === 0 || i === 4;
            return (
              <Reveal key={s.id} delay={i * 70}>
                <article className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-3xl border p-7 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift",
                  featured ? "section-dark border-ink-line" : "bg-card",
                )}>
                  <span className="pointer-events-none absolute -right-6 -top-10 font-display text-[9rem] italic leading-none opacity-[0.06] transition-transform duration-700 group-hover:-translate-x-3">{s.letter}</span>
                  <div className={cn("grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110", featured ? "bg-lime text-ink" : "bg-ink text-lime")}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl leading-tight">{s.title}</h3>
                  <p className={cn("mt-3 text-sm leading-relaxed", featured ? "text-paper/65" : "text-muted-foreground")}>{s.description}</p>
                  <div className={cn("grid transition-all duration-500", isOpen ? "mt-5 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                    <ul id={`svc-${s.id}`} className="space-y-2 overflow-hidden text-sm">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime-deep" />{d}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
                    <button type="button" aria-expanded={isOpen} aria-controls={`svc-${s.id}`} onClick={() => setOpen(isOpen ? null : s.id)} className="inline-flex items-center gap-1.5 text-sm font-semibold">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />} {isOpen ? "Hide" : "View"} deliverables
                    </button>
                    <Button asChild variant={featured ? "lime" : "ink"} className="h-10 px-5">
                      <Link to="/" search={{ service: s.id }} hash="contact">Discuss This Service</Link>
                    </Button>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- PORTFOLIO PREVIEW ---------- */
const FILTERS: { id: ServiceId | "all"; label: string }[] = [
  { id: "all", label: "All Projects" },
  ...SERVICES.map((s) => ({ id: s.id, label: s.short })),
];

function PortfolioPreview() {
  const [filter, setFilter] = useState<ServiceId | "all">("all");
  const [active, setActive] = useState<Project | null>(null);
  const shown = useMemo(() => {
    if (filter === "all") return SERVICES.map((s, i) => PROJECTS.filter((p) => p.category === s.id)[i * 3]);
    return PROJECTS.filter((p) => p.category === filter).slice(0, 6);
  }, [filter]);
  return (
    <section id="portfolio" className="section-dark relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-lime">Portfolio</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Selected work across every service.</h2>
            <p className="mt-4 text-paper/60">{PROJECTS.length} original concept projects demonstrating approach and range. Each is clearly labelled — real client work will be added and marked as verified.</p>
          </div>
          <Button asChild variant="ghostLight" size="xl"><Link to="/portfolio">Browse all {PROJECTS.length} projects <ArrowUpRight /></Link></Button>
        </Reveal>
        <div role="tablist" aria-label="Filter projects" className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {FILTERS.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}
              className={cn("shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-300",
                filter === f.id ? "border-lime bg-lime font-semibold text-ink" : "border-ink-line text-paper/70 hover:border-paper/40 hover:text-paper")}>
              {f.label}
            </button>
          ))}
        </div>
        <div key={filter} className="mt-8 grid gap-6 text-foreground sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <div key={p.id} className="animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
              <ProjectCard p={p} onOpen={setActive} />
            </div>
          ))}
        </div>
      </div>
      <ProjectDialog p={active} onClose={() => setActive(null)} />
    </section>
  );
}

/* ---------- ABOUT ---------- */
function About() {
  const principles = ["Clear communication", "Attention to detail", "Client-focused problem-solving", "Organized project delivery", "Continuous learning and improvement"];
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          {/* Replace this placeholder with a real portrait when available. */}
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[2rem] border-2 border-dashed border-ink/20 bg-paper-muted">
            <div className="absolute inset-0 grid place-items-center p-8 text-center">
              <div>
                <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-ink font-display text-4xl italic text-lime">M</div>
                <p className="mt-5 text-sm font-semibold">Portrait coming soon</p>
                <p className="mt-1 text-xs text-muted-foreground">A professional photo will be placed here.</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-lime/50 blur-2xl" />
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal><p className="eyebrow text-lime-deep">About me</p></Reveal>
          <Reveal delay={80}><h2 className="mt-4 text-4xl leading-tight sm:text-5xl">One Creative Partner. <em>Multiple Ways to Move Your Business Forward.</em></h2></Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I'm the person behind Mercy Digital Riches, helping businesses and entrepreneurs bring their digital ideas to life. My work spans website development, social media management, email marketing, e-commerce, and online learning platforms. I focus on understanding each client's needs, communicating clearly, and delivering digital solutions tailored to the project.
            </p>
          </Reveal>
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {principles.map((p, i) => (
              <Reveal as="li" key={p} delay={220 + i * 60}>
                <span className="inline-flex rounded-full border border-ink/15 bg-card px-4 py-2 text-sm font-medium shadow-soft">{p}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY ---------- */
function WhyMe() {
  const items = [
    ["Direct communication", "You speak with the person actually doing the work — no hand-offs or account managers."],
    ["A flexible approach", "Different businesses need different things. The work adapts to your situation."],
    ["Focus on your objectives", "Every decision is checked against what you're trying to achieve."],
    ["Tailored solutions", "No copy-paste packages — deliverables shaped around your requirements."],
    ["Clear expectations", "Scope, timeline and process agreed upfront, with organized workflows."],
    ["Practical deliverables", "Work that's useful day-to-day, not just impressive in a presentation."],
  ];
  return (
    <section className="bg-paper-muted py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <p className="eyebrow text-lime-deep">Why work with me</p>
            <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">The advantages of going <em>direct.</em></h2>
            <div className="mt-8 h-1 w-24 rounded-full bg-lime" />
          </Reveal>
          <ol className="lg:col-span-8">
            {items.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 50} className="group grid grid-cols-[auto_1fr] gap-6 border-t border-ink/10 py-7 last:border-b">
                <span className="font-display text-4xl italic text-ink/20 transition-colors duration-500 group-hover:text-lime-deep">0{i + 1}</span>
                <div>
                  <h3 className="text-2xl">{t}</h3>
                  <p className="mt-2 text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function Process() {
  const steps = [
    ["Discovery", "You explain your business, goals, needs, and challenges."],
    ["Planning", "I clarify the scope, deliverables, timeline, and project requirements."],
    ["Execution", "I work on the agreed deliverables, keeping you informed about progress."],
    ["Review & Refinement", "I review the work, gather feedback, and make agreed revisions."],
    ["Delivery", "I deliver the completed work according to the agreed scope, with any handover information."],
  ];
  return (
    <section id="process" className="section-dark relative overflow-hidden py-24 lg:py-32">
      <div className="grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-lime">Process</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">From first message to final handover.</h2>
        </Reveal>
        <div className="relative mt-16">
          <Reveal className="absolute left-0 right-0 top-6 hidden lg:block"><div className="animate-draw h-px bg-gradient-to-r from-lime via-lime/40 to-transparent" /></Reveal>
          <ol className="grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 120} className="relative border-l border-ink-line pl-6 lg:border-l-0 lg:pl-0">
                <span className="grid h-12 w-12 place-items-center rounded-full border border-lime bg-ink font-display text-lg italic text-lime">{i + 1}</span>
                <h3 className="mt-5 text-xl">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/60">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------- FEEDBACK (no fabricated testimonials) ---------- */
function Feedback() {
  return (
    <section className="py-24 lg:py-28">
      <Reveal className="mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow text-lime-deep">Client feedback</p>
        <blockquote className="mt-6 font-display text-4xl leading-tight sm:text-6xl">
          “Every project starts with <em className="bg-lime px-2 not-italic">understanding</em> your goals.”
        </blockquote>
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">Verified client reviews will appear here as projects are completed. Until then, the best way to see how I work is to start a conversation.</p>
        <Button asChild variant="ghostDark" size="xl" className="mt-8"><Link to="/" hash="contact">Discuss Your Project</Link></Button>
      </Reveal>
    </section>
  );
}

/* ---------- FAQ ---------- */
function Faq() {
  const faqs = [
    ["What services do you offer?", "Social media management and content creation, email marketing and automation, website design and development, e-commerce and Shopify solutions, online course and membership platforms, and digital marketing and business support."],
    ["Can I hire you for just one service?", "Yes. You can hire me for a single, focused task or one service area — there's no need to bundle services."],
    ["Can you handle projects involving multiple digital services?", "Yes. Many projects overlap — for example a website plus email setup, or a Shopify store plus social content. Having one person handle connected parts keeps things consistent."],
    ["How do we get started?", "Send an inquiry through the form, email, or WhatsApp. I'll review your details and we'll discuss your goals, scope and next steps."],
    ["What information do you need before starting a project?", "A short description of your business, what you'd like to achieve, any existing assets (logo, website, accounts), examples you like, and your preferred timeline."],
    ["Can you work with my existing website or marketing tools?", "In most cases, yes — including platforms like WordPress, Shopify, Klaviyo, Mailchimp, LearnDash, Tutor LMS, Circle and Skool. We'll confirm compatibility during discovery."],
    ["How do you determine project pricing?", "Pricing depends on the scope, complexity and timeline of each project. After understanding your needs, I'll share a clear quote before any work begins."],
    ["Can I contact you to discuss a custom project?", "Absolutely. If your project doesn't fit neatly into one category, reach out and describe what you have in mind."],
  ];
  return (
    <section className="bg-paper-muted py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow text-lime-deep">FAQ</p>
          <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Questions, answered.</h2>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(([q, a], i) => (
              <AccordionItem key={q} value={`f${i}`} className="border-ink/10">
                <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */
function Contact({ preselected }: { preselected?: string }) {
  return (
    <section id="contact" className="section-dark relative overflow-hidden py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-lime/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal><p className="eyebrow text-lime">Contact</p></Reveal>
          <Reveal delay={80}><h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Have a Project in Mind? <em className="text-lime">Let's Make It Happen.</em></h2></Reveal>
          <Reveal delay={160}><p className="mt-6 text-paper/65">Tell me what you're working on, what you need help with, and where you'd like to go. I'll use the details you share to understand your project and discuss the next steps.</p></Reveal>
          <Reveal delay={240} className="mt-10 space-y-4">
            <a href={mailtoHref("Project inquiry")} className="group flex items-center gap-4 rounded-2xl border border-ink-line p-5 transition-colors hover:border-lime">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime text-ink"><Mail className="h-5 w-5" /></span>
              <span className="min-w-0">
                <span className="eyebrow block text-[0.6rem] text-paper/50">Email Me</span>
                <span className="block break-all font-medium group-hover:text-lime">{SITE.email}</span>
              </span>
            </a>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-ink-line p-5 transition-colors hover:border-lime">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-lime text-lime"><MessageCircle className="h-5 w-5" /></span>
              <span>
                <span className="eyebrow block text-[0.6rem] text-paper/50">WhatsApp Me</span>
                <span className="block font-medium group-hover:text-lime">{SITE.whatsappNumberDisplay}</span>
              </span>
            </a>
          </Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-7">
          <ContactForm preselected={preselected} />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-lime py-24 text-ink lg:py-32">
      <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border-[40px] border-ink/5" />
      <div className="pointer-events-none absolute -bottom-32 left-10 h-72 w-72 rounded-full border-[30px] border-ink/5" />
      <Reveal className="relative mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-4xl leading-[1.05] sm:text-6xl lg:text-7xl">Let's Turn Your Next Digital Idea Into <em>Something Real.</em></h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">Whether you need a website, stronger content, better email marketing, or support with your online business, let's talk about your goals.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="ink" size="xl"><Link to="/" hash="contact">Start a Project <ArrowRight /></Link></Button>
          <Button asChild variant="ghostDark" size="xl"><Link to="/portfolio">Explore My Work</Link></Button>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- MOBILE CONTACT BAR ---------- */
function MobileContactBar() {
  return (
    <div className="fixed inset-x-3 bottom-3 z-40 flex gap-2 sm:hidden">
      <Button asChild variant="lime" className="h-12 flex-1 shadow-lift"><Link to="/" hash="contact">Let's Work Together</Link></Button>
      <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Me" className="grid h-12 w-12 place-items-center rounded-full bg-ink text-lime shadow-lift">
        <MessageCircle className="h-5 w-5" />
      </a>
    </div>
  );
}
