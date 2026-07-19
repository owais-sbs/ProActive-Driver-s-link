import { z } from 'zod';

export const lessonTypes = [
  'G2 Preparation',
  'G Road Test Preparation',
  'Refresher Lessons',
  'BDE Course (MTO-approved 20hr)',
] as const;

export const bookingSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Please enter your full name')
    .max(80, 'Name is too long'),
  phone: z
    .string()
    .min(10, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  email: z.string().email('Please enter a valid email address'),
  lesson_type: z.enum(lessonTypes, {
    errorMap: () => ({ message: 'Please select a lesson type' }),
  }),
  preferred_time: z
    .string()
    .min(2, 'Please tell us your preferred time'),
  pick_up_location: z
    .string()
    .min(3, 'Please enter a pick-up location'),
  drop_off_location: z
    .string()
    .min(3, 'Please enter a drop-off location'),
  address: z.string().min(5, 'Please enter your address'),
  message: z.string().max(1000, 'Message is too long').optional().or(z.literal('')),
  confirm: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm the payment instructions' }),
  }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
