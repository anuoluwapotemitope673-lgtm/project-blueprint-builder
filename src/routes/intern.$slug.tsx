import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { MapPin, Languages, ArrowUpRight, ArrowLeft } from 'lucide-react';
import { internQueries } from '@/lib/intern-queries';
import { Header } from '@/components/site/Header';
import { Footer } from '@/components/site/Footer';
import { Button } from '@/components/ui/button';
import { publicContactLink, isFiverrContact } from '@/lib/intern-validation';
export const Route = createFileRoute('/intern/$slug')({
 loader: async ({ context, params }) => { const rows = await context.queryClient.ensureQueryData(internQueries(params.slug)); const intern = rows[0]; if (!intern) throw notFound(); return { intern }; },
 head: ({ loaderData }) => { const i=loaderData?.intern; const title = `${i?.full_name ?? 'Profile not found'} — Mercy Digital Agency`; const description=i?.bio || i?.profile_title || 'Intern profile unavailable.'; const image=i?.profile_picture_url; return { meta: [{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'profile'},{name:'twitter:card',content:'summary_large_image'},...(image?.startsWith('https://') ? [{property:'og:image',content:image},{name:'twitter:image',content:image}] : [])] }; },
 component: InternProfile,
});
function InternProfile(){ const { slug } = Route.useParams(); const {data}=useSuspenseQuery(internQueries(slug));const intern=data[0];if(!intern) return null;
 return <><div className="section-dark min-h-32"><Header/></div><main className="section-light px-6 py-16"><div className="mx-auto max-w-5xl"><Button asChild variant="ghost"><Link to="/" hash="interns"><ArrowLeft size={16}/> Our Interns</Link></Button><div className="mt-10 grid gap-12 md:grid-cols-[240px_1fr]"><img src={intern.profile_picture_url || undefined} alt={intern.full_name} width={240} height={240} className="aspect-square w-full max-w-60 rounded-lg bg-muted object-contain"/><div><p className="eyebrow">Intern profile</p><h1 className="mt-3 font-display text-5xl">{intern.full_name}</h1><p className="mt-5 text-xl leading-relaxed">{intern.profile_title}</p><p className="mt-6 flex gap-2 text-muted-foreground"><MapPin size={18}/>{intern.location}</p><p className="mt-3 flex gap-2 text-muted-foreground"><Languages size={18} className="shrink-0"/>{intern.languages.join(', ')}</p>{intern.bio && <><h2 className="mt-10 font-display text-2xl">About</h2><p className="mt-3 whitespace-pre-wrap leading-relaxed">{intern.bio}</p></>}<h2 className="mt-10 font-display text-2xl">What I do</h2><p className="mt-3 leading-relaxed">{intern.profile_title}</p>{intern.contact_link && <Button asChild variant="lime" size="lg" className="mt-8"><a href={intern.contact_link} target="_blank" rel="noopener noreferrer">Connect With Me <ArrowUpRight size={18}/></a></Button>}</div></div></div></main><Footer/></>;
}