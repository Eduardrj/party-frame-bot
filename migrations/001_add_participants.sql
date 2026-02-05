-- Migration: add participants table and event status
BEGIN;

-- add status column to events table (if table exists named events)
ALTER TABLE IF EXISTS events
  ADD COLUMN IF NOT EXISTS status VARCHAR(16) DEFAULT 'OPEN';

-- create participants table
CREATE TABLE IF NOT EXISTS participants (
  id SERIAL PRIMARY KEY,
  event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  whatsapp_user TEXT NOT NULL,
  welcome_sent BOOLEAN DEFAULT FALSE,
  first_seen_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(event_id, whatsapp_user)
);

COMMIT;
