/**
 * Drumming Shaman Database Types
 * Auto-generated from Supabase schema
 */

// ============================================
// ENUM TYPES
// ============================================

export type EventType =
  | 'ceremony'
  | 'workshop'
  | 'drum_circle'
  | 'private_session'
  | 'retreat'
  | 'corporate'
  | 'online';

export type EventStatus =
  | 'draft'
  | 'published'
  | 'cancelled'
  | 'completed'
  | 'sold_out';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'attended'
  | 'no_show';

export type InquiryType =
  | 'general'
  | 'booking'
  | 'event'
  | 'workshop'
  | 'corporate'
  | 'press'
  | 'collaboration';

// ============================================
// TABLE TYPES
// ============================================

export interface Location {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string;
  state: string | null;
  country: string;
  postal_code: string | null;
  coordinates: { lat: number; lng: number } | null;
  timezone: string;
  capacity: number | null;
  amenities: string[];
  images: { url: string; alt: string }[];
  is_active: boolean;
  is_healing_temple: boolean;
  is_healing_vortex: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  short_description: string | null;
  type: EventType;
  status: EventStatus;

  // Scheduling
  start_datetime: string;
  end_datetime: string;
  timezone: string;
  is_recurring: boolean;
  recurrence_rule: string | null;

  // Location
  location_id: string | null;
  location?: Location;
  is_online: boolean;
  online_url: string | null;

  // Capacity & Pricing
  capacity: number | null;
  spots_remaining: number | null;
  price: number;
  early_bird_price: number | null;
  early_bird_deadline: string | null;
  currency: string;

  // Content
  featured_image: string | null;
  gallery: { url: string; alt: string }[];
  video_url: string | null;
  what_to_bring: string | null;
  preparation_instructions: string | null;

  // SEO & Meta
  meta_title: string | null;
  meta_description: string | null;

  // Flags
  is_featured: boolean;
  is_private: boolean;
  requires_approval: boolean;

  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface Booking {
  id: string;
  event_id: string;
  event?: Event;

  // Guest Information
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;

  // Booking Details
  status: BookingStatus;
  number_of_guests: number;
  total_price: number | null;
  currency: string;

  // Payment
  payment_status: string;
  payment_intent_id: string | null;
  paid_at: string | null;

  // Notes
  special_requests: string | null;
  internal_notes: string | null;

  // Consent
  marketing_consent: boolean;
  terms_accepted: boolean;
  terms_accepted_at: string;

  // Tracking
  source: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;

  created_at: string;
  updated_at: string;
  confirmed_at: string | null;
  cancelled_at: string | null;
}

export interface ContactSubmission {
  id: string;

  // Contact Info
  name: string;
  email: string;
  phone: string | null;

  // Inquiry Details
  inquiry_type: InquiryType;
  subject: string | null;
  message: string;

  // Processing
  is_read: boolean;
  is_replied: boolean;
  replied_at: string | null;
  reply_notes: string | null;
  assigned_to: string | null;

  // Tracking
  source_page: string | null;
  ip_address: string | null;
  user_agent: string | null;

  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;

  // Preferences
  is_active: boolean;
  interests: string[];

  // Consent & Tracking
  subscribed_at: string;
  confirmed_at: string | null;
  unsubscribed_at: string | null;
  confirmation_token: string | null;
  source: string | null;

  // Email engagement
  last_email_sent_at: string | null;
  last_email_opened_at: string | null;
  total_emails_sent: number;
  total_emails_opened: number;
}

export interface Testimonial {
  id: string;

  // Author
  author_name: string;
  author_location: string | null;
  author_image: string | null;

  // Content
  quote: string;
  event_id: string | null;
  event?: Event;
  event_type: EventType | null;
  rating: number | null;

  // Publishing
  is_approved: boolean;
  is_featured: boolean;
  display_order: number;

  created_at: string;
  approved_at: string | null;
}

// ============================================
// INSERT/UPDATE TYPES
// ============================================

export type LocationInsert = Omit<Location, 'id' | 'created_at' | 'updated_at'>;
export type LocationUpdate = Partial<LocationInsert>;

export type EventInsert = Omit<Event, 'id' | 'created_at' | 'updated_at' | 'location' | 'spots_remaining'>;
export type EventUpdate = Partial<EventInsert>;

export type BookingInsert = Omit<
  Booking,
  'id' | 'created_at' | 'updated_at' | 'event' | 'confirmed_at' | 'cancelled_at' | 'terms_accepted_at'
>;
export type BookingUpdate = Partial<BookingInsert>;

export type ContactSubmissionInsert = Omit<ContactSubmission, 'id' | 'created_at'>;

export type NewsletterSubscriberInsert = Omit<
  NewsletterSubscriber,
  'id' | 'subscribed_at' | 'last_email_sent_at' | 'last_email_opened_at' | 'total_emails_sent' | 'total_emails_opened'
>;

export type TestimonialInsert = Omit<Testimonial, 'id' | 'created_at' | 'approved_at' | 'event'>;
export type TestimonialUpdate = Partial<TestimonialInsert>;

// ============================================
// SUPABASE DATABASE INTERFACE
// ============================================

export interface Database {
  public: {
    Tables: {
      locations: {
        Row: Location;
        Insert: LocationInsert;
        Update: LocationUpdate;
      };
      events: {
        Row: Event;
        Insert: EventInsert;
        Update: EventUpdate;
      };
      bookings: {
        Row: Booking;
        Insert: BookingInsert;
        Update: BookingUpdate;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: ContactSubmissionInsert;
        Update: never;
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: NewsletterSubscriberInsert;
        Update: Partial<NewsletterSubscriberInsert>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: TestimonialInsert;
        Update: TestimonialUpdate;
      };
    };
    Enums: {
      event_type: EventType;
      event_status: EventStatus;
      booking_status: BookingStatus;
      inquiry_type: InquiryType;
    };
  };
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================
// QUERY PARAMS
// ============================================

export interface EventQueryParams {
  status?: EventStatus;
  type?: EventType;
  location_id?: string;
  is_featured?: boolean;
  start_after?: string;
  start_before?: string;
  page?: number;
  pageSize?: number;
}

export interface BookingQueryParams {
  event_id?: string;
  status?: BookingStatus;
  email?: string;
  page?: number;
  pageSize?: number;
}
