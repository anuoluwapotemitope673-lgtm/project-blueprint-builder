import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { NAV } from "./Header";
import { SERVICES } from "@/data/services";
import { SITE, mailtoHref, whatsappHref } from "@/lib/site-config";

export function Footer() {
  const socials = SITE.socials.filter((s) => s.href);
  return (
    <footer className="section-dark border-t border-ink-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/60">
            Independent freelance support for websites, social media, email marketing, e-commerce and online learning platforms.
          </p>
        </div>
        <div className="md:col-span-2">
          <h3 className="eyebrow text-lime">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((n) => (
              <li key={n.hash}><Link to="/" hash={n.hash} className="text-paper/70 hover:text-paper">{n.label}</Link></li>
            ))}
            <li><Link to="/portfolio" className="text-paper/70 hover:text-paper">Full portfolio</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h3 className="eyebrow text-lime">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link to="/" search={{ service: s.id }} hash="contact" className="text-paper/70 hover:text-paper">{s.short}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <h3 className="eyebrow text-lime">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a href={mailtoHref()} className="inline-flex items-center gap-2 break-all text-paper/80 hover:text-lime">
                <Mail className="h-4 w-4 shrink-0" /> {SITE.email}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-paper/80 hover:text-lime">
                <MessageCircle className="h-4 w-4 shrink-0" /> WhatsApp: {SITE.whatsappNumberDisplay}
              </a>
            </li>
            {socials.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="text-paper/70 hover:text-paper">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-6 py-6 text-xs text-paper/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Mercy Digital Riches. All rights reserved.</p>
          <p>Portfolio pieces marked "Concept" are original demonstration work.</p>
        </div>
      </div>
    </footer>
  );
}
