'use client';

import { useState } from 'react';
import {
  Save,
  Image as ImageIcon,
  Type,
  Video,
  Plus,
  Trash2,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type Feature = { title: string; description: string };
type Lesson = { title: string; description: string; price: string; image: string };
type Review = { name: string; text: string; rating: number };

const defaultHero = {
  eyebrow: 'MTO-Approved · Toronto / GTA',
  title: 'Pass Your G2 & G Driving Test With Confidence!',
  titleAccent: 'G2 & G',
  tagline: 'Where great drivers are made, not born.',
  body: 'Private, one-on-one driving lessons across the Greater Toronto Area with flexible scheduling and complimentary pick-up & drop-off.',
  videoUrl: '/videos/hero-screen.mp4',
};

const defaultWhy = {
  title: 'Why Choose',
  titleAccent: 'Turbo Teach?',
  subtitle:
    'Turbo Teach provides private G2 & G driving lessons across GTA with a focus on confidence, safety, and test success.',
  features: [
    { title: 'Road Test Preparation', description: 'Expert guidance to help you ace your G2 and G road tests.' },
    { title: 'One-on-One Lessons', description: 'Personalized instruction tailored to your learning pace.' },
    { title: 'Flexible Scheduling', description: 'Choose times that work best for your busy schedule.' },
    { title: 'Patient & Friendly Teaching', description: 'Build confidence with supportive, encouraging instruction.' },
    { title: 'Multilingual Instruction', description: 'Learn comfortably in English, Urdu, Hindi, and Punjabi.' },
    { title: 'High Pass Rate', description: 'Proven methods that help students build confidence and pass.' },
  ] as Feature[],
  media: [
    '/videos/why-choose-us-3.mp4',
    '/images/why-choose-us-1.jpg',
    '/images/why-choose-us-2.jpg',
    '/images/why-choose-us-4.jpg',
  ],
};

const defaultLessons: Lesson[] = [
  {
    title: 'G2 Preparation',
    description: 'Master the basics and build confidence for your G2 exit test.',
    price: 'From $50 / hr',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'G Road Test Prep',
    description: 'Highway-focused training to help you upgrade to a full G licence.',
    price: 'From $55 / hr',
    image: 'https://images.pexels.com/photos/97079/pexels-photo-97079.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Refresher Lessons',
    description: 'Targeted refresher sessions to rebuild confidence behind the wheel.',
    price: 'From $50 / hr',
    image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'BDE Course (MTO-approved)',
    description: 'Full 20-hour Beginner Driver Education program with MTO certification.',
    price: 'From $399',
    image: 'https://images.pexels.com/photos/2076622/pexels-photo-2076622.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const defaultReviews: Review[] = [
  { name: 'Karen Smith', rating: 5, text: 'I was so nervous before my G2, but my instructor was incredibly patient.' },
  { name: 'Ali Khan', rating: 5, text: 'Flexible timing was a game-changer for me.' },
  { name: 'Priya Sharma', rating: 5, text: 'Lessons in my own language made a huge difference.' },
];

function SaveBar({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs text-ink/50">
        UI preview only — changes stay in this session until backend is connected.
      </p>
      <div className="flex items-center gap-2">
        {saved && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            <Check className="h-3 w-3" /> Saved
          </span>
        )}
        <Button onClick={onSave} size="sm" className="bg-forest text-white hover:bg-forest-light">
          <Save className="h-3.5 w-3.5" /> Save section
        </Button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</Label>
      {children}
    </div>
  );
}

export function ContentEditor() {
  const [saved, setSaved] = useState(false);
  const [hero, setHero] = useState(defaultHero);
  const [why, setWhy] = useState(defaultWhy);
  const [lessons, setLessons] = useState(defaultLessons);
  const [reviews, setReviews] = useState(defaultReviews);
  const [cta, setCta] = useState({
    eyebrow: 'Get Started Today',
    title: 'Ready to Pass Your Driving Test?',
    titleAccent: 'Driving Test?',
    body: 'Join hundreds of GTA drivers who passed with confidence. Book your first lesson today.',
  });

  const markSaved = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
          Website Content
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Edit the dynamic sections that appear on the public site. Backend wiring comes next —
          this is the admin UI.
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

        {/* HERO */}
        <TabsContent value="hero" className="space-y-4">
          <SaveBar onSave={markSaved} saved={saved} />
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-bold text-ink">Hero copy</h2>
              <Field label="Eyebrow">
                <Input
                  value={hero.eyebrow}
                  onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
                />
              </Field>
              <Field label="Headline">
                <Textarea
                  rows={2}
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                />
              </Field>
              <Field label="Italic accent words">
                <Input
                  value={hero.titleAccent}
                  onChange={(e) => setHero({ ...hero, titleAccent: e.target.value })}
                />
              </Field>
              <Field label="Tagline">
                <Input
                  value={hero.tagline}
                  onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
                />
              </Field>
              <Field label="Body">
                <Textarea
                  rows={4}
                  value={hero.body}
                  onChange={(e) => setHero({ ...hero, body: e.target.value })}
                />
              </Field>
              <Field label="Hero video URL">
                <Input
                  value={hero.videoUrl}
                  onChange={(e) => setHero({ ...hero, videoUrl: e.target.value })}
                />
              </Field>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/40">
                Live preview
              </p>
              <p className="section-label">{hero.eyebrow}</p>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-ink">
                {hero.title.replace(hero.titleAccent, '')}
                <span className="italic text-forest">{hero.titleAccent}</span>
              </h3>
              <p className="mt-2 text-sm font-medium text-forest">{hero.tagline}</p>
              <p className="mt-2 text-sm text-ink/65">{hero.body}</p>
              <div className="mt-4 overflow-hidden rounded-xl bg-ink/5">
                <video
                  src={hero.videoUrl}
                  className="aspect-video w-full object-cover"
                  muted
                  playsInline
                  controls
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* WHY CHOOSE US */}
        <TabsContent value="why" className="space-y-4">
          <SaveBar onSave={markSaved} saved={saved} />
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Title">
                <Input
                  value={why.title}
                  onChange={(e) => setWhy({ ...why, title: e.target.value })}
                />
              </Field>
              <Field label="Italic accent">
                <Input
                  value={why.titleAccent}
                  onChange={(e) => setWhy({ ...why, titleAccent: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Subtitle">
              <Textarea
                rows={2}
                value={why.subtitle}
                onChange={(e) => setWhy({ ...why, subtitle: e.target.value })}
              />
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
                      features: [
                        ...why.features,
                        { title: 'New feature', description: 'Description…' },
                      ],
                    })
                  }
                >
                  <Plus className="h-3.5 w-3.5" /> Add
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {why.features.map((f, i) => (
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
                        onClick={() =>
                          setWhy({
                            ...why,
                            features: why.features.filter((_, j) => j !== i),
                          })
                        }
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

        {/* LESSONS */}
        <TabsContent value="lessons" className="space-y-4">
          <SaveBar onSave={markSaved} saved={saved} />
          <div className="grid gap-4 md:grid-cols-2">
            {lessons.map((l, i) => (
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
                <img
                  src={l.image}
                  alt={l.title}
                  className="mt-3 h-28 w-full rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        {/* TESTIMONIALS */}
        <TabsContent value="reviews" className="space-y-4">
          <SaveBar onSave={markSaved} saved={saved} />
          <div className="flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                setReviews([...reviews, { name: 'New review', rating: 5, text: '' }])
              }
            >
              <Plus className="h-3.5 w-3.5" /> Add review
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
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

        {/* CTA */}
        <TabsContent value="cta" className="space-y-4">
          <SaveBar onSave={markSaved} saved={saved} />
          <div className="max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Field label="Eyebrow">
              <Input value={cta.eyebrow} onChange={(e) => setCta({ ...cta, eyebrow: e.target.value })} />
            </Field>
            <Field label="Title">
              <Input value={cta.title} onChange={(e) => setCta({ ...cta, title: e.target.value })} />
            </Field>
            <Field label="Italic accent">
              <Input
                value={cta.titleAccent}
                onChange={(e) => setCta({ ...cta, titleAccent: e.target.value })}
              />
            </Field>
            <Field label="Body">
              <Textarea
                rows={3}
                value={cta.body}
                onChange={(e) => setCta({ ...cta, body: e.target.value })}
              />
            </Field>
            <div
              className={cn(
                'rounded-xl bg-dark p-6 text-center text-white'
              )}
            >
              <p className="text-[11px] uppercase tracking-widest text-sage">{cta.eyebrow}</p>
              <p className="mt-2 font-display text-xl font-extrabold">
                {cta.title}{' '}
                <span className="italic text-sage">{cta.titleAccent}</span>
              </p>
              <p className="mt-2 text-sm text-white/70">{cta.body}</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
