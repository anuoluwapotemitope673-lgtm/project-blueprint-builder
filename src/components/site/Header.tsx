import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NAV = [
  { label: "Home", hash: "top" },
  { label: "Services", hash: "services" },
  { label: "Portfolio", hash: "portfolio" },
  { label: "About", hash: "about" },
  { label: "Process", hash: "process" },
  { label: "Contact", hash: "contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2 transition-all duration-500 sm:px-5",
          scrolled ? "mx-3 bg-ink/90 text-paper shadow-lift backdrop-blur-md md:mx-auto" : "bg-transparent text-paper",
        )}
      >
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.hash}
              to="/"
              hash={n.hash}
              className="relative rounded-full px-3.5 py-2 text-sm font-medium text-paper/75 transition-colors hover:text-paper after:absolute after:inset-x-3.5 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="lime" className="hidden h-10 px-5 sm:inline-flex">
            <Link to="/" hash="contact">Let's Work Together</Link>
          </Button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "section-dark fixed inset-0 top-0 -z-10 flex flex-col px-6 pb-10 pt-28 transition-[clip-path] duration-700 ease-[cubic-bezier(0.7,0,0.2,1)] lg:hidden",
          open ? "[clip-path:circle(150%_at_calc(100%-2.5rem)_2.5rem)]" : "pointer-events-none [clip-path:circle(0%_at_calc(100%-2.5rem)_2.5rem)]",
        )}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="flex flex-col">
          {NAV.map((n, i) => (
            <Link
              key={n.hash}
              to="/"
              hash={n.hash}
              onClick={() => setOpen(false)}
              className={cn(
                "border-b border-ink-line py-4 font-display text-3xl transition-all duration-500 hover:text-lime",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
              )}
              style={{ transitionDelay: open ? `${150 + i * 50}ms` : "0ms" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="lime" size="xl" className="mt-auto">
          <Link to="/" hash="contact" onClick={() => setOpen(false)}>Let's Work Together</Link>
        </Button>
      </div>
    </header>
  );
}
