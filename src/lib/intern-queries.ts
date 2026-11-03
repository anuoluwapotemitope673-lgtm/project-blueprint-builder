import { queryOptions } from '@tanstack/react-query';
import { getPublicInterns } from './interns.functions';
export const internQueries = (slug?: string) => queryOptions({ queryKey: ['interns', slug ?? 'all'], queryFn: () => getPublicInterns({ data: { slug } }), staleTime: 0, refetchInterval: 60000 });