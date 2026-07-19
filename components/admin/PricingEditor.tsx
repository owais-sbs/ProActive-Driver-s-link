'use client';

import { useEffect, useState } from 'react';
import {
  Loader2,
  Save,
  Plus,
  Trash2,
  Star,
  Check,
  LayoutGrid,
  Table2,
  Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { usePricing, useSavePricing } from '@/lib/queries/useBookings';
import { defaultPricing } from '@/lib/data/pricing';
import type { PricingPackage } from '@/types/pricing';
import { cn } from '@/lib/utils';

type ViewMode = 'cards' | 'table';

export function PricingEditor() {
  const { data, isLoading } = usePricing();
  const savePricing = useSavePricing();
  const [packages, setPackages] = useState<PricingPackage[]>(defaultPricing);
  const [saved, setSaved] = useState(false);
  const [view, setView] = useState<ViewMode>('cards');
  const [editing, setEditing] = useState<number | null>(null);

  useEffect(() => {
    if (data && data.length > 0) setPackages(data);
  }, [data]);

  const update = (index: number, patch: Partial<PricingPackage>) => {
    setPackages((prev) => prev.map((p, i) => (i === index ? { ...p, ...patch } : p)));
    setSaved(false);
  };

  const updateFeatures = (index: number, featuresText: string) => {
    const features = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    update(index, { features });
  };

  const remove = (index: number) => {
    const name = packages[index]?.name ?? 'this package';
    if (!window.confirm(`Delete package “${name}”?`)) return;
    setPackages((prev) => prev.filter((_, i) => i !== index));
    setEditing(null);
    setSaved(false);
  };

  const add = (category: 'G2' | 'G') => {
    const next: PricingPackage = {
      category,
      name: 'New Package',
      price: '$0',
      period: 'package',
      description: 'Short description…',
      features: ['Feature one', 'Feature two'],
      highlighted: false,
      sort_order: packages.filter((p) => p.category === category).length + 1,
    };
    setPackages((prev) => [...prev, next]);
    setEditing(packages.length);
    setView('cards');
    setSaved(false);
  };

  const onSave = () => {
    savePricing.mutate(packages, { onSuccess: () => setSaved(true) });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-ink/60">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading pricing…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
            Packages
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            Same card look as the public site. Toggle cards or table — delete anytime.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1">
            <button
              type="button"
              onClick={() => setView('cards')}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition',
                view === 'cards' ? 'bg-forest text-white' : 'text-ink/60 hover:bg-cream'
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" /> Cards
            </button>
            <button
              type="button"
              onClick={() => setView('table')}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition',
                view === 'table' ? 'bg-forest text-white' : 'text-ink/60 hover:bg-cream'
              )}
            >
              <Table2 className="h-3.5 w-3.5" /> Table
            </button>
          </div>
          {saved && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Check className="h-3.5 w-3.5" /> Saved
            </span>
          )}
          <Button
            onClick={onSave}
            disabled={savePricing.isPending}
            className="bg-forest text-white hover:bg-forest-light"
          >
            {savePricing.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </div>

      {(['G2', 'G'] as const).map((category) => {
        const items = packages.map((p, i) => ({ p, i })).filter(({ p }) => p.category === category);

        return (
          <section key={category} className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-ink">{category} Packages</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => add(category)}
                className="border-forest/25 text-ink hover:bg-forest hover:text-white"
              >
                <Plus className="h-4 w-4" /> Create package
              </Button>
            </div>

            {view === 'cards' ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {items.map(({ p, i }) => (
                  <div key={`${category}-${i}`} className="relative">
                    {editing === i ? (
                      <EditPanel
                        p={p}
                        i={i}
                        update={update}
                        updateFeatures={updateFeatures}
                        onDone={() => setEditing(null)}
                        onDelete={() => remove(i)}
                      />
                    ) : (
                      <PublicStyleCard
                        pkg={p}
                        onEdit={() => setEditing(i)}
                        onDelete={() => remove(i)}
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-ink/55">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Name</th>
                        <th className="px-4 py-3 font-semibold">Price</th>
                        <th className="px-4 py-3 font-semibold">Period</th>
                        <th className="px-4 py-3 font-semibold">Best value</th>
                        <th className="px-4 py-3 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {items.map(({ p, i }) => (
                        <tr key={i} className="hover:bg-slate-50/80">
                          <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                          <td className="px-4 py-3 text-ink/70">{p.price}</td>
                          <td className="px-4 py-3 text-ink/70">{p.period}</td>
                          <td className="px-4 py-3">
                            {p.highlighted ? (
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-forest">
                                <Star className="h-3.5 w-3.5 fill-forest" /> Yes
                              </span>
                            ) : (
                              <span className="text-xs text-ink/40">No</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => {
                                  setView('cards');
                                  setEditing(i);
                                }}
                                className="grid h-8 w-8 place-items-center rounded-lg text-ink/60 hover:bg-cream"
                                aria-label="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => remove(i)}
                                className="grid h-8 w-8 place-items-center rounded-lg text-red-600 hover:bg-red-50"
                                aria-label="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

function PublicStyleCard({
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
      className={cn(
        'relative flex h-full flex-col rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-md',
        pkg.highlighted ? 'border-forest ring-1 ring-forest' : 'border-mist'
      )}
    >
      {pkg.highlighted && (
        <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-forest px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
          <Star className="h-3 w-3 fill-white" /> Best Value
        </span>
      )}

      <div className="absolute right-3 top-3 flex gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="grid h-8 w-8 place-items-center rounded-lg bg-cream text-ink/70 hover:bg-forest hover:text-white"
          aria-label="Edit package"
        >
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="grid h-8 w-8 place-items-center rounded-lg bg-cream text-red-600 hover:bg-red-50"
          aria-label="Delete package"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      <h3 className="pr-16 text-lg font-bold text-ink">{pkg.name}</h3>
      {pkg.description && <p className="mt-1 text-sm text-ink/60">{pkg.description}</p>}
      <div className="mt-4 flex items-end gap-1">
        <span className="font-display text-3xl font-extrabold text-ink">{pkg.price}</span>
        {pkg.period && <span className="mb-1 text-sm text-mist">/{pkg.period}</span>}
      </div>
      <ul className="mt-5 flex-1 space-y-2.5">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink/75">
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-cream text-forest">
              <Check className="h-3.5 w-3.5" />
            </span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EditPanel({
  p,
  i,
  update,
  updateFeatures,
  onDone,
  onDelete,
}: {
  p: PricingPackage;
  i: number;
  update: (index: number, patch: Partial<PricingPackage>) => void;
  updateFeatures: (index: number, text: string) => void;
  onDone: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="rounded-2xl border border-forest/30 bg-white p-5 shadow-md ring-1 ring-forest/10">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest">Editing</p>
        <div className="flex gap-1">
          <Button size="sm" onClick={onDone} className="bg-forest text-white hover:bg-forest-light">
            Done
          </Button>
          <button
            type="button"
            onClick={onDelete}
            className="grid h-9 w-9 place-items-center rounded-lg text-red-600 hover:bg-red-50"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input value={p.name} onChange={(e) => update(i, { name: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label>Price</Label>
            <Input value={p.price} onChange={(e) => update(i, { price: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Period</Label>
            <Input
              value={p.period ?? ''}
              onChange={(e) => update(i, { period: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label>Description</Label>
          <Textarea
            rows={2}
            value={p.description ?? ''}
            onChange={(e) => update(i, { description: e.target.value })}
          />
        </div>
        <div className="space-y-1">
          <Label>Features (one per line)</Label>
          <Textarea
            rows={4}
            value={p.features.join('\n')}
            onChange={(e) => updateFeatures(i, e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id={`hl-${i}`}
            checked={p.highlighted}
            onCheckedChange={(c) => update(i, { highlighted: c === true })}
          />
          <Label htmlFor={`hl-${i}`} className="text-sm">
            Highlight as Best Value
          </Label>
        </div>
      </div>
    </div>
  );
}
