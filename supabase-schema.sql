-- Supabase SQL Schema for Road-Dogs Rider Companion
-- Run this in your Supabase SQL Editor to create the necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the rider_applications table
CREATE TABLE IF NOT EXISTS rider_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age INTEGER NOT NULL,
  address_street TEXT NOT NULL,
  address_city TEXT NOT NULL,
  address_state TEXT NOT NULL,
  address_zip TEXT NOT NULL,
  id_number TEXT NOT NULL,
  
  -- Emergency Contact
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  emergency_contact_relationship TEXT NOT NULL,
  
  -- Background Eligibility
  has_felony_conviction BOOLEAN DEFAULT FALSE,
  felony_details TEXT,
  is_on_probation_parole BOOLEAN DEFAULT FALSE,
  probation_parole_details TEXT,
  is_banned_from_carrier BOOLEAN DEFAULT FALSE,
  banned_carrier_details TEXT,
  has_medical_conditions BOOLEAN DEFAULT FALSE,
  medical_conditions_details TEXT,
  can_sit_extended_periods BOOLEAN DEFAULT TRUE,
  has_motion_sickness BOOLEAN DEFAULT FALSE,
  takes_medications BOOLEAN DEFAULT FALSE,
  medications_details TEXT,
  
  -- Experience & Purpose
  why_companion_rider TEXT NOT NULL,
  has_traveled_long_distances BOOLEAN DEFAULT FALSE,
  long_distance_experience TEXT,
  overnight_comfort_level TEXT NOT NULL,
  confined_spaces_comfort BOOLEAN DEFAULT TRUE,
  understands_not_romantic BOOLEAN NOT NULL,
  
  -- Conduct Acknowledgment
  conduct_acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
  conduct_signature TEXT NOT NULL,
  conduct_date DATE NOT NULL,
  
  -- Insurance Information
  health_insurance_name TEXT NOT NULL,
  health_insurance_policy TEXT NOT NULL,
  health_insurance_start DATE NOT NULL,
  health_insurance_end DATE NOT NULL,
  liability_insurance_name TEXT,
  liability_insurance_policy TEXT,
  liability_insurance_start DATE,
  liability_insurance_end DATE,
  
  -- Document URLs (stored in Supabase Storage)
  id_document_url TEXT,
  health_insurance_document_url TEXT,
  liability_insurance_document_url TEXT,
  
  -- Application Status
  application_status TEXT DEFAULT 'pending' CHECK (application_status IN ('pending', 'approved', 'rejected', 'under_review')),
  admin_notes TEXT
);

-- Create storage bucket for documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('rider-documents', 'rider-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for rider-documents bucket
-- Allow anyone to upload files (for public form submission)
DROP POLICY IF EXISTS "Anyone can upload documents" ON storage.objects;
CREATE POLICY "Anyone can upload documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'rider-documents');

-- Allow anyone to read files (for admin viewing)
DROP POLICY IF EXISTS "Anyone can view documents" ON storage.objects;
CREATE POLICY "Anyone can view documents" ON storage.objects
  FOR SELECT USING (bucket_id = 'rider-documents');

-- Allow updates/removals if needed (optional)
DROP POLICY IF EXISTS "Anyone can update documents" ON storage.objects;
CREATE POLICY "Anyone can update documents" ON storage.objects
  FOR UPDATE USING (bucket_id = 'rider-documents') WITH CHECK (bucket_id = 'rider-documents');
DROP POLICY IF EXISTS "Anyone can delete documents" ON storage.objects;
CREATE POLICY "Anyone can delete documents" ON storage.objects
  FOR DELETE USING (bucket_id = 'rider-documents');

-- Set up Row Level Security (RLS)
ALTER TABLE rider_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid duplication errors
DROP POLICY IF EXISTS "Anyone can submit an application" ON rider_applications;
DROP POLICY IF EXISTS "Anyone can read applications" ON rider_applications;
DROP POLICY IF EXISTS "Service role can read all applications" ON rider_applications;
DROP POLICY IF EXISTS "Service role can update applications" ON rider_applications;

-- Policy to allow anyone to insert (for public form submission)
CREATE POLICY "Anyone can submit an application" ON rider_applications
  FOR INSERT WITH CHECK (true);

-- Allow public read if needed (optional)
CREATE POLICY "Anyone can read applications" ON rider_applications
  FOR SELECT USING (true);

-- Policy to allow service role to read all applications (for admin panel)
CREATE POLICY "Service role can read all applications" ON rider_applications
  FOR SELECT USING (true);

-- Policy to allow service role to update applications
CREATE POLICY "Service role can update applications" ON rider_applications
  FOR UPDATE USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_rider_applications_status ON rider_applications(application_status);
CREATE INDEX IF NOT EXISTS idx_rider_applications_created ON rider_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rider_applications_email ON rider_applications(email);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists to make this idempotent
DROP TRIGGER IF EXISTS update_rider_applications_updated_at ON rider_applications;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_rider_applications_updated_at
  BEFORE UPDATE ON rider_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
