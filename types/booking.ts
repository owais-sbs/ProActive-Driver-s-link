export type BookingStatus = 'Pending' | 'Confirmed' | 'Paid';

export interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  lesson_type: string;
  preferred_time: string;
  pick_up_location: string;
  drop_off_location: string;
  address: string;
  message?: string | null;
  status: BookingStatus;
  created_at: string;
}

export interface NewBooking {
  full_name: string;
  phone: string;
  email: string;
  lesson_type: string;
  preferred_time: string;
  pick_up_location: string;
  drop_off_location: string;
  address: string;
  message?: string;
  confirm?: boolean;
}
