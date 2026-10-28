import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Mercy Digital Agency — home">
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-lime font-display text-lg font-semibold italic text-ink transition-transform duration-500 group-hover:rotate-[20deg]">
        M
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-current bg-ink" />
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-semibold tracking-tight">Mercy Digital</span>
        <span className="eyebrow block text-[0.6rem] opacity-60">Agency · Freelance</span>
      </span>
    </Link>
  );
}
