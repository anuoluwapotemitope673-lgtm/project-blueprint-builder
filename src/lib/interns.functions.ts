import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { Database } from '@/integrations/supabase/types';
import { internSchema } from './intern-validation';

export const getPublicInterns = createServerFn({ method: 'GET' })
 .inputValidator((v: { slug?: string }) => z.object({ slug: z.string().optional() }).parse(v))
 .handler(async ({ data }) => {
  const url = process.env['SUPABASE_URL']; const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error('Directory unavailable');
  const client = createClient<Database>(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => { const h = new Headers(init?.headers); if (key.startsWith('sb_') && h.get('Authorization') === `Bearer ${key}`) h.delete('Authorization'); h.set('apikey', key); return fetch(input, { ...init, headers: h }); } } });
  let query = client.from('interns').select('*').eq('status', 'active').order('created_at');
  if (data.slug) query = query.eq('slug', data.slug);
  const result = await query; if (result.error) throw new Error('Directory unavailable');
  return await Promise.all((result.data ?? []).map(async row => {
   if (!row.picture_path) return row;
   const signed = await client.storage.from('intern-portraits').createSignedUrl(row.picture_path, 3600);
   const browserUrl = import.meta.env.VITE_SUPABASE_URL;
   return { ...row, profile_picture_url: signed.data?.signedUrl.replace(url, browserUrl) ?? '' };
  }));
 });

export const getAdminInterns = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
 const role = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
 if (role.error || !role.data) throw new Error('Administrator access required');
 const rows = await context.supabase.from('interns').select('*').order('created_at');
 if (rows.error) throw new Error(rows.error.message);
 const profile = await context.supabase.from('profiles').select('display_name,avatar_url').eq('id',context.userId).single();
 return { interns: rows.data, profile: profile.data };
});

export const saveIntern = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
 .inputValidator((v: unknown) => internSchema.parse(v)).handler(async ({ data, context }) => {
 const role = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
 if (role.error || !role.data) throw new Error('Administrator access required');
 const { id, ...values } = data;
 const result = id ? await context.supabase.from('interns').update(values).eq('id',id).select().single() : await context.supabase.from('interns').insert(values).select().single();
 if (result.error) throw new Error(result.error.code === '23505' ? 'This profile slug is already in use.' : result.error.message);
 return result.data;
});
export const deleteIntern = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
 .inputValidator((v: { id: string }) => z.object({ id: z.string().uuid() }).parse(v)).handler(async ({ data, context }) => {
 const role = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
 if (role.error || !role.data) throw new Error('Administrator access required');
 const result = await context.supabase.from('interns').delete().eq('id', data.id);
 if (result.error) throw new Error(result.error.message); return { success: true };
});