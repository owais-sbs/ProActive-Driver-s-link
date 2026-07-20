'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save, Plus, Trash2, Check, Pencil, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { usePricing, useSavePricing } from '@/lib/queries/useBookings';
import { defaultPricing } from '@/lib/data/pricing';
import type { PricingCategory, PricingPackage } from '@/types/pricing';
import { cn } from '@/lib/utils';

type Draft = PricingPackage & { _index: number | null };

function emptyDraft(category: PricingCategory, sortOrder: number): Draft {
  return {
    _index: null,
    category,
    name: '',
    price: '',
    description: 'HST included',
    features: [],
    highlighted: false,
    sort_order: sortOrder,
  };
}

export function PricingEditor() {
  const { data, isLoading } = usePricing();
  const savePricing = useSavePricing();
  const [packages, setPackages] = useState<PricingPackage[]>(defaultPricing);
  const [saved, setSaved] = useState(false);
  const [draft, setDraft] = useState<Draft | null>(null);

  useEffect(() => {
    if (data && data.length > 0) setPackages(data);
  }, [data]);

  const openCreate = (category: PricingCategory) => {
    const sortOrder = packages.filter((p) => p.category === category).length + 1;
    setDraft(emptyDraft(category, sortOrder));
  };

  const openEdit = (index: number) => {
    setDraft({ ...packages[index], _index: index });
  };

  const closeModal = () => setDraft(null);

  const updateDraft = (patch: Partial<PricingPackage>) => {
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const persist = (next: PricingPackage[]) => {
    setPackages(next);
    setSaved(false);
    savePricing.mutate(next, { onSuccess: () => setSaved(true) });
  };

  const saveDraft = () => {
    if (!draft) return;
    if (!draft.name.trim() || !draft.price.trim()) {
      window.alert('Please enter a title and price.');
      return;
    }

    const { _index, ...pkg } = draft;
    const cleaned: PricingPackage = {
      ...pkg,
      name: pkg.name.trim(),
      price: pkg.price.trim(),
      description: pkg.description?.trim() || '',
      features: [],
      period: undefined,
      highlighted: pkg.highlighted ?? false,
    };

    const next =
      _index === null
        ? [...packages, cleaned]
        : packages.map((p, i) => (i === _index ? { ...cleaned, id: p.id } : p));

    persist(next);
    closeModal();
  };

  const remove = (index: number) => {
    const name = packages[index]?.name ?? 'this package';
    if (!window.confirm(`Delete “${name}”?`)) return;
    persist(packages.filter((_, i) => i !== index));
    if (draft?._index === index) closeModal();
  };

  const loadDefaults = () => {
    if (
      !window.confirm(
        'Replace all packages with the full 16 lesson cards (8 G2 + 8 G) and publish to the site?'
      )
    ) {
      return;
    }
    persist(defaultPricing);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-ink/60">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading pricing…
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Packages
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Same cards as the public site — {packages.length} total. Click a card to edit.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {saved && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Check className="h-3.5 w-3.5" /> Live on site
            </span>
          )}
          {savePricing.isPending && (
            <span className="inline-flex items-center gap-1.5 text-xs text-ink/50">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…
            </span>
          )}
          <Button variant="outline" size="sm" onClick={loadDefaults}>
            Load all 16 lesson cards
          </Button>
          <Button
            onClick={() => persist(packages)}
            disabled={savePricing.isPending}
            className="bg-forest text-white hover:bg-forest-light"
          >
            {savePricing.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save all
          </Button>
        </div>
      </div>

      {(['G2', 'G', 'BDE'] as const).map((category) => {
        const items = packages
          .map((p, i) => ({ p, i }))
          .filter(({ p }) => p.category === category)
          .sort((a, b) => a.p.sort_order - b.p.sort_order);

        if (category === 'BDE' && items.length === 0) return null;

        const title =
          category === 'BDE' ? 'Beginner Driver Education (BDE)' : `${category} Packages`;

        return (
          <section key={category} className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-center sm:text-left">
                <h2 className="font-display text-xl font-extrabold text-ink">{title}</h2>
                <span className="mt-1 inline-block h-0.5 w-12 rounded-full bg-forest/70" />
                <p className="mt-1 text-xs text-ink/50">{items.length} cards</p>
              </div>
              <Button
                size="sm"
                onClick={() => openCreate(category)}
                className="bg-forest text-white hover:bg-forest-light"
              >
                <Plus className="h-4 w-4" /> Create package
              </Button>
            </div>

            {items.length === 0 ? (
              <button
                type="button"
                onClick={() => openCreate(category)}
                className="flex w-full flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed border-mist bg-white/60 px-6 py-12 text-sm text-ink/50 hover:border-forest/40 hover:bg-white hover:text-forest"
              >
                <Plus className="h-5 w-5" />
                No {category} packages — create one
              </button>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {items.map(({ p, i }) => (
                  <AdminPriceCard
                    key={p.id ?? `${category}-${i}-${p.name}`}
                    pkg={p}
                    onEdit={() => openEdit(i)}
                    onDelete={() => remove(i)}
                  />
                ))}
              </div>
            )}
          </section>
        );
      })}

      <PackageModal
        draft={draft}
        saving={savePricing.isPending}
        onClose={closeModal}
        onChange={updateDraft}
        onSave={saveDraft}
        onDelete={
          draft?._index !== null && draft?._index !== undefined
            ? () => remove(draft._index!)
            : undefined
        }
      />
    </div>
  );
}

function AdminPriceCard({
  pkg,
  onEdit,
  onDelete,
}: {
  pkg: PricingPackage;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onEdit}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onEdit();
        }
      }}
      className={cn(
        'group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[20px] border border-mist/80 bg-white p-5 shadow-[0_4px_20px_rgba(17,24,39,0.04)] transition-all duration-300 sm:p-6',
        'hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(17,24,39,0.1)]',
        pkg.highlighted && 'border-forest/40 ring-1 ring-forest/20'
      )}
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-forest via-sage to-moss"
      />

      <div className="absolute right-2 top-3 z-10 flex gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="grid h-8 w-8 place-items-center rounded-lg bg-cream text-ink/70 hover:bg-forest hover:text-white"
          aria-label="Edit"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="grid h-8 w-8 place-items-center rounded-lg bg-cream text-red-600 hover:bg-red-50"
          aria-label="Delete"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {pkg.highlighted && (
        <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-forest px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          <Star className="h-3 w-3 fill-white" /> Best Value
        </span>
      )}

      <h3 className="pr-16 text-sm font-semibold text-ink/85 sm:text-[15px]">{pkg.name}</h3>
      <p className="mt-3 font-display text-[1.75rem] font-extrabold leading-none tracking-tight text-forest sm:text-3xl">
        {pkg.price}
      </p>
      {pkg.description && (
        <p className="mt-2.5 text-xs italic leading-snug text-ink/45 sm:text-[13px]">
          {pkg.description}
        </p>
      )}
    </div>
  );
}

function PackageModal({
  draft,
  saving,
  onClose,
  onChange,
  onSave,
  onDelete,
}: {
  draft: Draft | null;
  saving: boolean;
  onClose: () => void;
  onChange: (patch: Partial<PricingPackage>) => void;
  onSave: () => void;
  onDelete?: () => void;
}) {
  const isCreate = draft?._index === null;

  return (
    <Dialog open={!!draft} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm overflow-hidden border-mist bg-white p-0 sm:rounded-[20px]">
        {draft && (
          <div className="p-6">
            <DialogHeader className="mb-5 text-left">
              <DialogTitle className="font-display text-xl font-extrabold text-ink">
                {isCreate ? `New ${draft.category} card` : 'Edit package card'}
              </DialogTitle>
              <DialogDescription className="text-sm text-ink/55">
                Title, price, and subtitle — same fields as the public cards.
              </DialogDescription>
            </DialogHeader>

            <div className="mb-5 overflow-hidden rounded-[20px] border border-mist bg-white p-5 shadow-sm">
              <span className="mb-3 block h-[3px] w-full rounded-full bg-gradient-to-r from-forest via-sage to-moss" />
              <p className="text-sm font-semibold text-ink/85">
                {draft.name || 'Package title'}
              </p>
              <p className="mt-3 font-display text-2xl font-extrabold text-forest">
                {draft.price || '$0'}
              </p>
              <p className="mt-2 text-xs italic text-ink/45">
                {draft.description || 'Subtitle'}
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Title</Label>
                <Input
                  placeholder="e.g. 1 Hour Lesson"
                  value={draft.name}
                  onChange={(e) => onChange({ name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Price</Label>
                <Input
                  placeholder="e.g. $56.50"
                  value={draft.price}
                  onChange={(e) => onChange({ price: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label>Subtitle</Label>
                <Input
                  placeholder="e.g. HST included"
                  value={draft.description ?? ''}
                  onChange={(e) => onChange({ description: e.target.value })}
                />
              </div>
              <label className="flex items-center gap-2 pt-1 text-sm text-ink/70">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-mist"
                  checked={draft.highlighted}
                  onChange={(e) => onChange({ highlighted: e.target.checked })}
                />
                Best Value badge
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button
                onClick={onSave}
                disabled={saving}
                className="flex-1 bg-forest text-white hover:bg-forest-light"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isCreate ? 'Create & publish' : 'Save & publish'}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {onDelete && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onDelete}
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
