'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { defaultSiteSettings } from '@/lib/data/settings';
import { siteConfig } from '@/lib/data/site';
import type { SiteSettings } from '@/types/settings';

export const SETTINGS_KEY = ['site-settings'] as const;

function phoneToHref(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return siteConfig.phoneHref;
  return `tel:+${digits}`;
}

export type LiveSiteConfig = typeof siteConfig & SiteSettings & {
  phoneHref: string;
  emailHref: string;
};

export function useSiteSettings() {
  return useQuery<SiteSettings>({
    queryKey: SETTINGS_KEY,
    queryFn: async () => {
      const res = await fetch('/api/settings');
      if (!res.ok) throw new Error('Failed to load settings');
      const data = await res.json();
      return (data.settings as SiteSettings) ?? defaultSiteSettings;
    },
    placeholderData: defaultSiteSettings,
    staleTime: 60_000,
  });
}

export function useSiteConfig(): LiveSiteConfig {
  const { data: settings = defaultSiteSettings } = useSiteSettings();
  return {
    ...siteConfig,
    ...settings,
    phoneHref: phoneToHref(settings.phone),
    emailHref: `mailto:${settings.email}`,
    area: settings.address,
  };
}

export function useSaveSiteSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: SiteSettings) => {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SETTINGS_KEY });
    },
  });
}
