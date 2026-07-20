'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from '@/components/ui/select';
import { bookingSchema, lessonTypes, type BookingFormValues } from '@/lib/schemas/booking';
import { useCreateBooking } from '@/lib/queries/useBookings';
import { RevealText, FadeIn } from '@/components/motion/Reveal';

const fieldClass =
  'w-full rounded-lg border border-mist bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-mist/70 focus:border-forest focus:ring-2 focus:ring-forest/20 focus:outline-none';

export function BookingForm() {
  const [success, setSuccess] = useState(false);
  const createBooking = useCreateBooking();

  const {
    register, handleSubmit, reset, setValue, watch,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      full_name: '', phone: '', email: '', lesson_type: undefined,
      preferred_time: '', pick_up_location: '', drop_off_location: '',
      address: '', message: '', confirm: false as unknown as true,
    },
  });

  const lessonType = watch('lesson_type');

  const onSubmit = async (values: BookingFormValues) => {
    setSuccess(false);
    await createBooking.mutateAsync(values);
    setSuccess(true);
    reset();
  };

  return (
    <section id="book" className="bg-white py-12 lg:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <RevealText from="left">
            <span className="section-label">Book a Lesson</span>
          </RevealText>
          <RevealText from="left" delay={0.08}>
            <h2 className="mt-3 font-display text-3xl font-extrabold text-ink sm:text-4xl">
              Reserve <span className="italic text-forest">your spot</span>
            </h2>
          </RevealText>
          <RevealText from="right" delay={0.14}>
            <p className="mt-3 text-sm text-ink/65 sm:mt-4 sm:text-base">
              Fill out the form below and we’ll be in touch to confirm your lesson.
            </p>
          </RevealText>
        </div>

        <FadeIn delay={0.1} className="mt-10 rounded-2xl border border-mist bg-cream p-6 sm:p-8">
          {success && (
            <div role="status" className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-semibold">Booking request received!</p>
                <p className="mt-0.5">We’ll contact you shortly to confirm. Please send your e-transfer to complete the booking.</p>
              </div>
            </div>
          )}

          {createBooking.isError && (
            <div role="alert" className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
              <div>
                <p className="font-semibold">Something went wrong.</p>
                <p className="mt-0.5">{(createBooking.error as Error)?.message || 'Please try again or call us directly.'}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="full_name">Full Name *</Label>
                <input id="full_name" className={fieldClass} {...register('full_name')} placeholder="Your name" />
                {errors.full_name && <p className="text-xs text-red-600">{errors.full_name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone *</Label>
                <input id="phone" className={fieldClass} {...register('phone')} placeholder="(416) 555-0199" />
                {errors.phone && <p className="text-xs text-red-600">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email *</Label>
                <input id="email" type="email" className={fieldClass} {...register('email')} placeholder="you@example.com" />
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lesson_type">Lesson Type *</Label>
                <Select value={lessonType} onValueChange={(v) => setValue('lesson_type', v as BookingFormValues['lesson_type'], { shouldValidate: true })}>
                  <SelectTrigger id="lesson_type" className={fieldClass}><SelectValue placeholder="Select a lesson type" /></SelectTrigger>
                  <SelectContent>
                    {lessonTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
                {errors.lesson_type && <p className="text-xs text-red-600">{errors.lesson_type.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="preferred_time">Preferred Time *</Label>
              <input id="preferred_time" className={fieldClass} {...register('preferred_time')} placeholder="e.g. Weekday evenings, Saturday morning" />
              {errors.preferred_time && <p className="text-xs text-red-600">{errors.preferred_time.message}</p>}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="pick_up_location">Pick-Up Location *</Label>
                <input id="pick_up_location" className={fieldClass} {...register('pick_up_location')} placeholder="e.g. Home, school, workplace" />
                {errors.pick_up_location && <p className="text-xs text-red-600">{errors.pick_up_location.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="drop_off_location">Drop-Off Location *</Label>
                <input id="drop_off_location" className={fieldClass} {...register('drop_off_location')} placeholder="e.g. Home, test centre" />
                {errors.drop_off_location && <p className="text-xs text-red-600">{errors.drop_off_location.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="address">Address *</Label>
              <input id="address" className={fieldClass} {...register('address')} placeholder="Street, city, postal code" />
              {errors.address && <p className="text-xs text-red-600">{errors.address.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message">Additional Message</Label>
              <Textarea id="message" className={fieldClass} rows={3} {...register('message')} placeholder="Anything else we should know?" />
              {errors.message && <p className="text-xs text-red-600">{errors.message.message}</p>}
            </div>

            <div className="rounded-lg border border-forest/20 bg-cream p-4 text-sm text-ink/75">
              <p className="font-semibold text-ink">Payment Instructions</p>
              <p className="mt-1">
                Please send an e-transfer to{' '}
                <span className="font-semibold text-forest">info@turboteach.ca</span>{' '}
                after submitting. Your booking is confirmed only after payment is received.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox id="confirm" checked={watch('confirm') as boolean} onCheckedChange={(c) => setValue('confirm', (c === true) as true, { shouldValidate: true })} />
              <div>
                <Label htmlFor="confirm" className="text-sm font-medium">
                  I understand the booking is confirmed only after e-transfer payment.
                </Label>
                {errors.confirm && <p className="mt-0.5 text-xs text-red-600">{errors.confirm.message}</p>}
              </div>
            </div>

            <Button type="submit" size="lg" disabled={createBooking.isPending} className="w-full bg-forest text-white hover:bg-forest-light">
              {createBooking.isPending ? (<><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>) : (<><Send className="h-4 w-4" /> Submit Booking Request</>)}
            </Button>
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
