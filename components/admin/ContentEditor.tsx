'use client';

import { useEffect, useState } from 'react';
import {
  Save,
  Image as ImageIcon,
  Type,
  Video,
  Plus,
  Trash2,
  Check,
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { defaultSiteContent } from '@/lib/data/content';
import { useSaveContentSection, useSiteContent } from '@/lib/queries/useContent';
import type { ContentSection } from '@/types/content';

type Feature = { title: string; description: string };
type Lesson = { title: string; description: string; price: string; image: string };
type Review = { name: string; text: string; rating: number };

function SaveBar({
  onSave,
  saved,
  saving,
}: {
  onSave: () => void;
  saved: boolean;
  saving: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs text-ink/50">Changes are saved to Supabase and appear on the live site.</p>
      <div className="flex items-center gap-2">
        {saved && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <Check className="h-3 w-3" /> Saved
          </span>
        )}
        <Button
          onClick={onSave}
          disabled={saving}
          size="sm"
          className="bg-forest text-white hover:bg-forest-light"
        >
          {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
          Save section
        </Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</Label>
      {children}
    </div>
  );
}

export function ContentEditor() {
  const { data, isLoading } = useSiteContent();
  const saveSection = useSaveContentSection();
  const [savedSection, setSavedSection] = useState<ContentSection | null>(null);

  const [hero, setHero] = useState(defaultSiteContent.hero);
  const [why, setWhy] = useState(defaultSiteContent.why);
  const [lessons, setLessons] = useState(defaultSiteContent.lessons.items);
  const [reviews, setReviews] = useState(defaultSiteContent.testimonials.items);
  const [cta, setCta] = useState(defaultSiteContent.final_cta);

  useEffect(() => {
    if (!data) return;
    setHero(data.hero);
    setWhy(data.why);
    setLessons(data.lessons.items);
    setReviews(data.testimonials.items);
    setCta(data.final_cta);
  }, [data]);

  const save = (section: ContentSection, payload: unknown) => {
    saveSection.mutate(
      { section, data: payload },
      {
        onSuccess: () => {
          setSavedSection(section);
          window.setTimeout(() => setSavedSection(null), 2500);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-20 text-sm text-ink/60">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading content…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">Website Content</h1>
        <p className="mt-1 text-sm text-ink/60">
          Edit sections on the public site. Each tab saves independently to Supabase.
        </p>
      </div>

      <Tabs defaultValue="hero" className="space-y-5">
        <TabsList className="flex h-auto flex-wrap gap-1 border border-slate-200 bg-white p-1">
          {[
            { v: 'hero', l: 'Hero', icon: Video },
            { v: 'why', l: 'Why Choose Us', icon: ImageIcon },
            { v: 'lessons', l: 'Lessons', icon: Type },
            { v: 'reviews', l: 'Testimonials', icon: Type },
            { v: 'cta', l: 'Final CTA', icon: Type },
          ].map((t) => (
            <TabsTrigger
              key={t.v}
              value={t.v}
              className="gap-1.5 data-[state=active]:bg-forest data-[state=active]:text-white"
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.l}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <SaveBar
            onSave={() => save('hero', hero)}
            saved={savedSection === 'hero'}
            saving={saveSection.isPending}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-ink">Hero copy</h2>
              <Field label="Eyebrow">
                <Input value={hero.eyebrow} onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })} />
              </Field>
              <Field label="Headline">
                <Textarea rows={2} value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
              </Field>
              <Field label="Italic accent words">
                <Input value={hero.titleAccent} onChange={(e) => setHero({ ...hero, titleAccent: e.target.value })} />
              </Field>
              <Field label="Tagline">
                <Input value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} />
              </Field>
              <Field label="Body">
                <Textarea rows={4} value={hero.body} onChange={(e) => setHero({ ...hero, body: e.target.value })} />
              </Field>
              <Field label="Hero video URL">
                <Input value={hero.videoUrl} onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })} />
              </Field>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/40">Live preview</p>
              <p className="section-label">{hero.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-ink">
                {hero.title.replace(hero.titleAccent, '')}
                <span className="italic text-forest">{hero.titleAccent}</span>
              </h3>
              <p className="mt-2 text-sm font-medium text-forest">{hero.tagline}</p>
              <p className="mt-2 text-sm text-ink/65">{hero.body}</p>
              <div className="mt-4 overflow-hidden rounded-xl bg-ink/5">
                <video src={hero.videoUrl} className="aspect-video w-full object-cover" muted playsInline controls />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="why" className="space-y-4">
          <SaveBar
            onSave={() => save('why', why)}
            saved={savedSection === 'why'}
            saving={saveSection.isPending}
          />
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title">
                <Input value={why.title} onChange={(e) => setWhy({ ...why, title: e.target.value })} />
              </Field>
              <Field label="Italic accent">
                <Input value={why.titleAccent} onChange={(e) => setWhy({ ...why, titleAccent: e.target.value })} />
              </Field>
            </div>
            <Field label="Subtitle">
              <Textarea rows={2} value={why.subtitle} onChange={(e) => setWhy({ ...why, subtitle: e.target.value })} />
            </Field>
            <div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-ink">Feature cards</h3>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setWhy({
                      ...why,
                      features: [...why.features, { title: 'New feature', description: 'Description…' }],
                    })
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Add
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {why.features.map((f: Feature, i: number) => (
                  <div key={i} className="rounded-xl border border-mist bg-cream p-4">
                    <div className="flex items-start justify-between gap-2">
                      <Input
                        value={f.title}
                        onChange={(e) => {
                          const features = [...why.features];
                          features[i] = { ...f, title: e.target.value };
                          setWhy({ ...why, features });
                        }}
                        className="font-semibold"
                      />
                      <button
                        type="button"
                        className="grid h-9 w-9 shrink-0 place-items-center rounded-lg text-red-600 hover:bg-red-50"
                        onClick={() => setWhy({ ...why, features: why.features.filter((_, j) => j !== i) })}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Textarea
                      className="mt-2"
                      rows={2}
                      value={f.description}
                      onChange={(e) => {
                        const features = [...why.features];
                        features[i] = { ...f, description: e.target.value };
                        setWhy({ ...why, features });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-bold text-ink">Middle carousel media (URLs)</h3>
              <div className="space-y-2">
                {why.media.map((url, i) => (
                  <Input
                    key={i}
                    value={url}
                    onChange={(e) => {
                      const media = [...why.media];
                      media[i] = e.target.value;
                      setWhy({ ...why, media });
                    }}
                    placeholder="Image or video path"
                  />
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lessons" className="space-y-4">
          <SaveBar
            onSave={() => save('lessons', { items: lessons })}
            saved={savedSection === 'lessons'}
            saving={saveSection.isPending}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {lessons.map((l: Lesson, i: number) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Field label="Title">
                  <Input
                    value={l.title}
                    onChange={(e) => {
                      const next = [...lessons];
                      next[i] = { ...l, title: e.target.value };
                      setLessons(next);
                    }}
                  />
                </Field>
                <div className="mt-3">
                  <Field label="Description">
                    <Textarea
                      rows={3}
                      value={l.description}
                      onChange={(e) => {
                        const next = [...lessons];
                        next[i] = { ...l, description: e.target.value };
                        setLessons(next);
                      }}
                    />
                  </Field>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Field label="Price">
                    <Input
                      value={l.price}
                      onChange={(e) => {
                        const next = [...lessons];
                        next[i] = { ...l, price: e.target.value };
                        setLessons(next);
                      }}
                    />
                  </Field>
                  <Field label="Image URL">
                    <Input
                      value={l.image}
                      onChange={(e) => {
                        const next = [...lessons];
                        next[i] = { ...l, image: e.target.value };
                        setLessons(next);
                      }}
                    />
                  </Field>
                </div>
                <img src={l.image} alt={l.title} className="mt-3 h-28 w-full rounded-xl object-cover" />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <SaveBar
            onSave={() => save('testimonials', { items: reviews })}
            saved={savedSection === 'testimonials'}
            saving={saveSection.isPending}
          />
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setReviews([...reviews, { name: 'New review', rating: 5, text: '' }])}
            >
              <Plus className="h-3.5 w-3.5" /> Add review
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r: Review, i: number) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <Field label="Name">
                    <Input
                      value={r.name}
                      onChange={(e) => {
                        const next = [...reviews];
                        next[i] = { ...r, name: e.target.value };
                        setReviews(next);
                      }}
                    />
                  </Field>
                  <button
                    type="button"
                    className="mt-6 grid h-9 w-9 place-items-center rounded-lg text-red-600 hover:bg-red-50"
                    onClick={() => setReviews(reviews.filter((_, j) => j !== i))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3">
                  <Field label="Review">
                    <Textarea
                      rows={3}
                      value={r.text}
                      onChange={(e) => {
                        const next = [...reviews];
                        next[i] = { ...r, text: e.target.value };
                        setReviews(next);
                      }}
                    />
                  </Field>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cta" className="space-y-4">
          <SaveBar
            onSave={() => save('final_cta', cta)}
            saved={savedSection === 'final_cta'}
            saving={saveSection.isPending}
          />
          <div className="max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Field label="Eyebrow">
              <Input value={cta.eyebrow} onChange={(e) => setCta({ ...cta, eyebrow: e.target.value })} />
            </Field>
            <Field label="Title">
              <Input value={cta.title} onChange={(e) => setCta({ ...cta, title: e.target.value })} />
            </Field>
            <Field label="Italic accent">
              <Input value={cta.titleAccent} onChange={(e) => setCta({ ...cta, titleAccent: e.target.value })} />
            </Field>
            <Field label="Body">
              <Textarea rows={3} value={cta.body} onChange={(e) => setCta({ ...cta, body: e.target.value })} />
            </Field>
            <div className={cn('rounded-xl bg-dark p-6 text-center text-white')}>
              <p className="text-[11px] uppercase tracking-widest text-sage">{cta.eyebrow}</p>
              <p className="mt-2 font-display text-xl font-extrabold">
                {cta.title} <span className="italic text-sage">{cta.titleAccent}</span>
              </p>
              <p className="mt-2 text-sm text-white/70">{cta.body}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
