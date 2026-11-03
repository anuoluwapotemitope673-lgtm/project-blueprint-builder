import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, MapPin, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { internQueries } from '@/lib/intern-queries';
export function InternDirectory() {
 const { data } = useSuspenseQuery(internQueries());
 return <section id="interns" className="section-light px-6 py-24"><div className="mx-auto max-w-7xl">
  <p className="eyebrow">Our people</p><h2 className="mt-4 font-display text-4xl sm:text-5xl">Our Interns</h2>
  {data.length === 0 ? <p className="mt-10 text-muted-foreground">No active intern profiles yet.</p> : <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{data.map(intern => <article key={intern.id} className="border-b border-border pb-8">
   <Link to="/intern/$slug" params={{ slug: intern.slug }} className="flex items-start gap-5"><img src={intern.profile_picture_url || undefined} alt={intern.full_name} className="h-24 w-24 shrink-0 rounded-lg bg-muted object-contain" width={96} height={96} /><div><h3 className="font-display text-2xl">{intern.full_name}</h3><p className="mt-2 text-sm leading-relaxed">{intern.profile_title}</p></div></Link>
   <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={15}/>{intern.location}</p><p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground"><Languages size={15} className="mt-1 shrink-0"/>{intern.languages.join(', ')}</p>
   <Button asChild variant="outline" className="mt-6"><Link to="/intern/$slug" params={{ slug: intern.slug }}>View Profile <ArrowUpRight size={16}/></Link></Button>
  </article>)}</div>}
 </div></section>;
}