'use client';

import { useEffect, useState } from 'react';
import { Save, Check, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { defaultSiteSettings } from '@/lib/data/settings';
import { useSaveSiteSettings, useSiteSettings } from '@/lib/queries/useSiteSettings';

export function AdminSettings() {
  const { data, isLoading } = useSiteSettings();
  const saveSettings = useSaveSiteSettings();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(defaultSiteSettings);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  const onSave = () => {
    saveSettings.mutate(form, {
      onSuccess: () => {
        setSaved(true);
        window.setTimeout(() => setSaved(false), 2500);
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-ink/60">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading settings…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-ink/60">
          Site contact details and booking payment info — saved to Supabase.
        </p>
      </div>

      <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2 text-sm">
            <Phone className="h-3.5 w-3.5 text-forest" /> Phone
          </Label>
          <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2 text-sm">
            <Mail className="h-3.5 w-3.5 text-forest" /> Email
          </Label>
          <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">WhatsApp link</Label>
          <Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="flex items-center gap-2 text-sm">
            <MapPin className="h-3.5 w-3.5 text-forest" /> Service area
          </Label>
          <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">E-transfer email</Label>
          <Input value={form.etransfer} onChange={(e) => setForm({ ...form, etransfer: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">Hours</Label>
          <Textarea rows={2} value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} />
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4">
          {saved && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <Check className="h-3 w-3" /> Saved
            </span>
          )}
          <Button
            onClick={onSave}
            disabled={saveSettings.isPending}
            className="bg-forest text-white hover:bg-forest-light"
          >
            {saveSettings.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save settings
          </Button>
        </div>
      </div>
    </div>
  );
}
