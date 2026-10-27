import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SERVICE_OPTIONS, serviceTitle } from "@/data/services";
import { Button } from "@/components/ui/button";
import { mailtoHref } from "@/lib/site-config";

const schema = z.object({
  full_name: z.string().trim().min(1, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  company: z.string().trim().max(160).optional(),
  service: z.string().min(1, "Please choose a service"),
  budget: z.string().max(60).optional(),
  timeline: z.string().max(60).optional(),
  description: z.string().trim().min(10, "Please share at least a sentence about your project").max(4000),
  contact_method: z.string().max(40).optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field =
  "mt-1.5 w-full rounded-xl border border-ink-line bg-ink-soft px-4 py-3 text-sm text-paper placeholder:text-paper/35 transition-colors focus:border-lime focus:outline-none";

export function ContactForm({ preselected }: { preselected?: string }) {
  const [service, setService] = useState(serviceTitle(preselected) ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const t = serviceTitle(preselected);
    if (t) setService(t);
  }, [preselected]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries()) as Record<string, string>;
    const parsed = schema.safeParse({ ...raw, service });
    if (!parsed.success) {
      const errs: Errors = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    const d = parsed.data;
    const clean = (v?: string) => (v && v.length ? v : null);
    const { error } = await supabase.from("contact_inquiries").insert({
      full_name: d.full_name,
      email: d.email,
      company: clean(d.company),
      service: d.service,
      budget: clean(d.budget),
      timeline: clean(d.timeline),
      description: d.description,
      contact_method: clean(d.contact_method),
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-3xl border border-lime/40 bg-ink-soft p-8">
        <CheckCircle2 className="h-10 w-10 text-lime" />
        <h3 className="font-display text-2xl">Thank you — your inquiry was received.</h3>
        <p className="text-paper/70">I'll review the details you shared and get back to you about next steps.</p>
        <Button variant="ghostLight" onClick={() => setStatus("idle")}>Send another inquiry</Button>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] ? <p id={`${k}-err`} className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-3xl border border-ink-line bg-ink/60 p-6 sm:grid-cols-2 sm:p-8">
      <label className="text-sm font-medium">Full name *
        <input name="full_name" autoComplete="name" className={field} aria-invalid={!!errors.full_name} aria-describedby="full_name-err" />
        {err("full_name")}
      </label>
      <label className="text-sm font-medium">Email address *
        <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby="email-err" />
        {err("email")}
      </label>
      <label className="text-sm font-medium">Company / business <span className="text-paper/40">(optional)</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="text-sm font-medium">Service required *
        <select name="service" value={service} onChange={(e) => setService(e.target.value)} className={field} aria-invalid={!!errors.service} aria-describedby="service-err">
          <option value="">Select a service…</option>
          {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {err("service")}
      </label>
      <label className="text-sm font-medium">Budget <span className="text-paper/40">(optional)</span>
        <select name="budget" className={field} defaultValue="">
          <option value="">Prefer to discuss</option>
          <option>Small project</option>
          <option>Medium project</option>
          <option>Large / ongoing project</option>
        </select>
      </label>
      <label className="text-sm font-medium">Timeline <span className="text-paper/40">(optional)</span>
        <select name="timeline" className={field} defaultValue="">
          <option value="">Flexible</option>
          <option>As soon as possible</option>
          <option>Within a month</option>
          <option>1–3 months</option>
          <option>Just exploring</option>
        </select>
      </label>
      <label className="text-sm font-medium sm:col-span-2">Project description *
        <textarea name="description" rows={5} placeholder="What are you working on, and what do you need help with?" className={field} aria-invalid={!!errors.description} aria-describedby="description-err" />
        {err("description")}
      </label>
      <fieldset className="sm:col-span-2">
        <legend className="text-sm font-medium">Preferred contact method <span className="text-paper/40">(optional)</span></legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {["Email", "WhatsApp", "Video call"].map((m) => (
            <label key={m} className="cursor-pointer">
              <input type="radio" name="contact_method" value={m} className="peer sr-only" />
              <span className="inline-block rounded-full border border-ink-line px-4 py-2 text-sm text-paper/70 transition-colors peer-checked:border-lime peer-checked:bg-lime peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-lime">{m}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {status === "error" && (
        <div role="alert" className="flex gap-2 rounded-xl border border-destructive/50 p-3 text-sm sm:col-span-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
          <span>Your message couldn't be sent. Please try again, or <a className="underline" href={mailtoHref("Project inquiry")}>email me directly</a>.</span>
        </div>
      )}
      <div className="sm:col-span-2">
        <Button type="submit" variant="lime" size="xl" disabled={status === "sending"} className="w-full sm:w-auto">
          {status === "sending" ? <><Loader2 className="animate-spin" /> Sending…</> : "Send an Inquiry"}
        </Button>
      </div>
    </form>
  );
}
