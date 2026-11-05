import { z } from 'zod';
export function publicContactLink(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return '';
    if (['fiverr.com', 'www.fiverr.com'].includes(url.hostname)) {
      const edit = url.pathname.match(/^\/sellers\/([a-zA-Z0-9_]+)\/edit\/?$/);
      if (edit) return `https://www.fiverr.com/${edit[1]}`;
    }
    return url.href;
  } catch { return ''; }
}
export function isFiverrContact(value: string) {
  try { return ['fiverr.com', 'www.fiverr.com'].includes(new URL(value).hostname); }
  catch { return false; }
}
export const internSchema = z.object({
  id: z.string().uuid().optional(),
  full_name: z.string().trim().min(1).max(120),
  profile_title: z.string().trim().min(1).max(300),
  location: z.string().trim().min(1).max(120),
  languages: z.array(z.string().trim().min(1).max(60)).min(1).max(30),
  bio: z.string().trim().max(10000),
  contact_link: z.string().refine(v => !v || /^https:\/\//i.test(v) && z.string().url().safeParse(v).success, 'Use a valid HTTPS link'),
  slug: z.string().max(150).refine(v => !v || /^[a-z0-9]+(-[a-z0-9]+)*$/.test(v), 'Use lowercase letters, numbers and hyphens'),
  status: z.enum(['active', 'inactive']),
  profile_picture_url: z.string().max(2000),
  picture_path: z.string().max(500),
});
export type InternInput = z.infer<typeof internSchema>;