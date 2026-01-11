-- ============================================
-- DRUMMING SHAMAN DATABASE SCHEMA
-- ============================================
-- Supabase PostgreSQL Schema for Events, Bookings, and Community Management
-- ============================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- For location-based queries

-- ============================================
-- ENUM TYPES
-- ============================================

-- Event types
CREATE TYPE event_type AS ENUM (
  'ceremony',
  'workshop',
  'drum_circle',
  'private_session',
  'retreat',
  'corporate',
  'online'
);

-- Event status
CREATE TYPE event_status AS ENUM (
  'draft',
  'published',
  'cancelled',
  'completed',
  'sold_out'
);

-- Booking status
CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'cancelled',
  'attended',
  'no_show'
);

-- Contact inquiry type
CREATE TYPE inquiry_type AS ENUM (
  'general',
  'booking',
  'event',
  'workshop',
  'corporate',
  'press',
  'collaboration'
);

-- ============================================
-- CORE TABLES
-- ============================================

-- Locations/Venues
CREATE TABLE locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100),
  country VARCHAR(100) NOT NULL DEFAULT 'USA',
  postal_code VARCHAR(20),
  coordinates GEOGRAPHY(POINT, 4326), -- PostGIS point for lat/lng
  timezone VARCHAR(50) DEFAULT 'America/Denver',
  capacity INTEGER,
  amenities JSONB DEFAULT '[]',
  images JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  is_healing_temple BOOLEAN DEFAULT false,
  is_healing_vortex BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(500),
  type event_type NOT NULL,
  status event_status DEFAULT 'draft',

  -- Scheduling
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ NOT NULL,
  timezone VARCHAR(50) DEFAULT 'America/Denver',
  is_recurring BOOLEAN DEFAULT false,
  recurrence_rule VARCHAR(255), -- iCal RRULE format

  -- Location
  location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
  is_online BOOLEAN DEFAULT false,
  online_url VARCHAR(500),

  -- Capacity & Pricing
  capacity INTEGER,
  spots_remaining INTEGER,
  price DECIMAL(10, 2) DEFAULT 0,
  early_bird_price DECIMAL(10, 2),
  early_bird_deadline TIMESTAMPTZ,
  currency VARCHAR(3) DEFAULT 'USD',

  -- Content
  featured_image VARCHAR(500),
  gallery JSONB DEFAULT '[]',
  video_url VARCHAR(500),
  what_to_bring TEXT,
  preparation_instructions TEXT,

  -- SEO & Meta
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),

  -- Flags
  is_featured BOOLEAN DEFAULT false,
  is_private BOOLEAN DEFAULT false,
  requires_approval BOOLEAN DEFAULT false,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Bookings/Reservations
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,

  -- Guest Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),

  -- Booking Details
  status booking_status DEFAULT 'pending',
  number_of_guests INTEGER DEFAULT 1,
  total_price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'USD',

  -- Payment (for future integration)
  payment_status VARCHAR(50) DEFAULT 'unpaid',
  payment_intent_id VARCHAR(255),
  paid_at TIMESTAMPTZ,

  -- Notes
  special_requests TEXT,
  internal_notes TEXT,

  -- Consent
  marketing_consent BOOLEAN DEFAULT false,
  terms_accepted BOOLEAN DEFAULT true,
  terms_accepted_at TIMESTAMPTZ DEFAULT NOW(),

  -- Tracking
  source VARCHAR(100), -- How they found the event
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,

  -- Ensure unique booking per email per event
  UNIQUE(event_id, email)
);

-- Contact Form Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Contact Info
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),

  -- Inquiry Details
  inquiry_type inquiry_type DEFAULT 'general',
  subject VARCHAR(255),
  message TEXT NOT NULL,

  -- Processing
  is_read BOOLEAN DEFAULT false,
  is_replied BOOLEAN DEFAULT false,
  replied_at TIMESTAMPTZ,
  reply_notes TEXT,
  assigned_to VARCHAR(255),

  -- Tracking
  source_page VARCHAR(255),
  ip_address INET,
  user_agent TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),

  -- Preferences
  is_active BOOLEAN DEFAULT true,
  interests JSONB DEFAULT '[]', -- ['ceremonies', 'workshops', 'news']

  -- Consent & Tracking
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  confirmation_token VARCHAR(255),
  source VARCHAR(100), -- How they subscribed

  -- Email engagement (for future analytics)
  last_email_sent_at TIMESTAMPTZ,
  last_email_opened_at TIMESTAMPTZ,
  total_emails_sent INTEGER DEFAULT 0,
  total_emails_opened INTEGER DEFAULT 0
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Author
  author_name VARCHAR(255) NOT NULL,
  author_location VARCHAR(255),
  author_image VARCHAR(500),

  -- Content
  quote TEXT NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  event_type event_type,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),

  -- Publishing
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ
);

-- ============================================
-- INDEXES
-- ============================================

-- Locations
CREATE INDEX idx_locations_active ON locations(is_active);
CREATE INDEX idx_locations_coordinates ON locations USING GIST(coordinates);

-- Events
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_type ON events(type);
CREATE INDEX idx_events_start ON events(start_datetime);
CREATE INDEX idx_events_location ON events(location_id);
CREATE INDEX idx_events_featured ON events(is_featured, status);
CREATE INDEX idx_events_upcoming ON events(start_datetime, status)
  WHERE status = 'published' AND start_datetime > NOW();

-- Bookings
CREATE INDEX idx_bookings_event ON bookings(event_id);
CREATE INDEX idx_bookings_email ON bookings(email);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created ON bookings(created_at);

-- Contact Submissions
CREATE INDEX idx_contact_unread ON contact_submissions(is_read, created_at);
CREATE INDEX idx_contact_type ON contact_submissions(inquiry_type);

-- Newsletter
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active, email);

-- Testimonials
CREATE INDEX idx_testimonials_approved ON testimonials(is_approved, is_featured);

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_locations_updated_at
  BEFORE UPDATE ON locations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-update spots_remaining
CREATE OR REPLACE FUNCTION update_event_spots()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE events
    SET spots_remaining = capacity - (
      SELECT COALESCE(SUM(number_of_guests), 0)
      FROM bookings
      WHERE event_id = NEW.event_id
      AND status IN ('pending', 'confirmed', 'attended')
    )
    WHERE id = NEW.event_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    UPDATE events
    SET spots_remaining = capacity - (
      SELECT COALESCE(SUM(number_of_guests), 0)
      FROM bookings
      WHERE event_id = OLD.event_id
      AND status IN ('pending', 'confirmed', 'attended')
    )
    WHERE id = OLD.event_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_spots_on_booking
  AFTER INSERT OR UPDATE OR DELETE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_event_spots();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can view active locations"
  ON locations FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can view published events"
  ON events FOR SELECT
  USING (status = 'published');

CREATE POLICY "Public can view approved testimonials"
  ON testimonials FOR SELECT
  USING (is_approved = true);

-- Anyone can create bookings and contacts
CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can submit contact forms"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (true);

-- Users can view their own bookings by email
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.jwt() ->> 'email' = email);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert Healing Temple location
INSERT INTO locations (
  name, slug, description, city, state, country,
  is_healing_temple, is_active
) VALUES (
  'The Healing Temple',
  'healing-temple',
  'A sacred space dedicated to healing ceremonies and spiritual growth.',
  'Santa Fe',
  'New Mexico',
  'USA',
  true,
  true
);

-- Insert Healing Vortex location
INSERT INTO locations (
  name, slug, description, city, state, country,
  is_healing_vortex, is_active
) VALUES (
  'The Healing Vortex',
  'healing-vortex',
  'An energy vortex center for deep transformation and spiritual awakening.',
  'Sedona',
  'Arizona',
  'USA',
  true,
  true
);

-- Insert sample testimonials
INSERT INTO testimonials (author_name, author_location, quote, event_type, is_approved, is_featured) VALUES
('Sarah M.', 'New York, USA', 'The drumming session was unlike anything I''ve experienced. I felt layers of stress melt away and reconnected with a part of myself I''d forgotten existed.', 'ceremony', true, true),
('Marcus J.', 'London, UK', 'Anup creates such a safe and powerful space. The rhythms took me on a journey that brought deep healing and clarity.', 'workshop', true, true),
('Yuki T.', 'Tokyo, Japan', 'After years of meditation, I thought I knew inner peace. The drumming ceremony showed me there are depths I hadn''t touched.', 'ceremony', true, true);
