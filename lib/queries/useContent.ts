'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { defaultSiteContent } from '@/lib/data/content';
import type { ContentSection, SiteContentMap, LessonContent } from '@/types/content';

export const CONTENT_KEY = ['site-content'] as const;

async function postJSON<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => 'Request failed');
    throw new Error(msg || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function useSiteContent(): { data: SiteContentMap; isLoading: boolean } {
  const query = useQuery<SiteContentMap>({
    queryKey: CONTENT_KEY,
    queryFn: async () => {
      const res = await fetch('/api/content');
      if (!res.ok) throw new Error('Failed to load content');
      const data = await res.json();
      return (data.content as SiteContentMap) ?? defaultSiteContent;
    },
    placeholderData: defaultSiteContent,
    staleTime: 60_000,
  });

  return { data: query.data ?? defaultSiteContent, isLoading: query.isLoading };
}

export function useSaveContentSection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ section, data }: { section: ContentSection; data: unknown }) =>
      postJSON<{ ok: boolean }>('/api/content', { section, data }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: CONTENT_KEY });
    },
  });
}
