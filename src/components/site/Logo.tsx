import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import sparkLogo from "@/assets/mercy_spark_logo.png";

export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={cn("group inline-flex items-center gap-2.5", className)} aria-label="Mercy Digital Agency — home">
      <img src={sparkLogo} alt="" width={1024} height={1024} className="h-11 w-11 shrink-0 object-contain transition-transform duration-500 group-hover:rotate-6" />
      <span className="leading-none">
        <span className="block font-display text-[1.05rem] font-semibold tracking-tight">Mercy Digital</span>
        <span className="eyebrow block text-[0.6rem] opacity-60">Agency · Freelance</span>
      </span>
    </Link>
  );
}
