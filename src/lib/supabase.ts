import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type RiderApplication = {
  id?: string;
  created_at?: string;
  
  // Personal Information
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  age: number;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  id_number: string;
  
  // Emergency Contact
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  
  // Background Eligibility
  has_felony_conviction: boolean;
  felony_details?: string;
  is_on_probation_parole: boolean;
  probation_parole_details?: string;
  is_banned_from_carrier: boolean;
  banned_carrier_details?: string;
  has_medical_conditions: boolean;
  medical_conditions_details?: string;
  can_sit_extended_periods: boolean;
  has_motion_sickness: boolean;
  takes_medications: boolean;
  medications_details?: string;
  
  // Experience & Purpose
  why_companion_rider: string;
  has_traveled_long_distances: boolean;
  long_distance_experience?: string;
  overnight_comfort_level: string;
  confined_spaces_comfort: boolean;
  understands_not_romantic: boolean;
  
  // Conduct Acknowledgment
  conduct_acknowledged: boolean;
  conduct_signature: string;
  conduct_date: string;
  
  // Insurance Information
  health_insurance_name: string;
  health_insurance_policy: string;
  health_insurance_start: string;
  health_insurance_end: string;
  liability_insurance_name?: string;
  liability_insurance_policy?: string;
  liability_insurance_start?: string;
  liability_insurance_end?: string;
  
  // Document URLs
  id_document_url?: string;
  health_insurance_document_url?: string;
  liability_insurance_document_url?: string;
  
  // Status
  application_status: 'pending' | 'approved' | 'rejected' | 'under_review';
  admin_notes?: string;
};
