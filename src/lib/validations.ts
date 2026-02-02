import { z } from 'zod';

function isAtLeast18(dateString: string): boolean {
  const today = new Date();
  const birthDate = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(birthDate.getTime())) {
    return false;
  }
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  // Adjust age if birthday hasn't occurred this year yet
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
}

export const personalInfoSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  date_of_birth: z.string().refine((date) => {
    return isAtLeast18(date);
  }, 'You must be at least 18 years old'),
  address_street: z.string().min(5, 'Please enter a valid street address'),
  address_city: z.string().min(2, 'Please enter a valid city'),
  address_state: z.string().min(2, 'Please select a state'),
  address_zip: z.string().min(5, 'Please enter a valid ZIP code'),
  id_number: z.string().min(5, 'Please enter a valid ID number'),
  emergency_contact_name: z.string().min(2, 'Emergency contact name is required'),
  emergency_contact_phone: z.string().min(10, 'Please enter a valid emergency contact phone'),
  emergency_contact_relationship: z.string().min(2, 'Please specify the relationship'),
});

export const backgroundSchema = z.object({
  has_felony_conviction: z.boolean(),
  felony_details: z.string().optional(),
  is_on_probation_parole: z.boolean(),
  probation_parole_details: z.string().optional(),
  is_banned_from_carrier: z.boolean(),
  banned_carrier_details: z.string().optional(),
  has_medical_conditions: z.boolean(),
  medical_conditions_details: z.string().optional(),
  can_sit_extended_periods: z.boolean(),
  has_motion_sickness: z.boolean(),
  takes_medications: z.boolean(),
  medications_details: z.string().optional(),
});

export const experienceSchema = z.object({
  why_companion_rider: z.string().min(50, 'Please provide a detailed response (at least 50 characters)'),
  has_traveled_long_distances: z.boolean(),
  long_distance_experience: z.string().optional(),
  overnight_comfort_level: z.string().min(1, 'Please select your comfort level'),
  confined_spaces_comfort: z.boolean(),
  understands_not_romantic: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge this understanding',
  }),
});

export const conductSchema = z.object({
  conduct_acknowledged: z.boolean().refine((val) => val === true, {
    message: 'You must acknowledge the conduct and professional expectations',
  }),
  conduct_signature: z.string().min(2, 'Please provide your signature'),
  conduct_date: z.string().min(1, 'Date is required'),
});

export const insuranceSchema = z.object({
  health_insurance_name: z.string().min(2, 'Insurance company name is required'),
  health_insurance_policy: z.string().min(2, 'Policy number is required'),
  health_insurance_start: z.string().min(1, 'Coverage start date is required'),
  health_insurance_end: z.string().min(1, 'Coverage end date is required'),
  liability_insurance_name: z.string().optional(),
  liability_insurance_policy: z.string().optional(),
  liability_insurance_start: z.string().optional(),
  liability_insurance_end: z.string().optional(),
});

export const fullApplicationSchema = personalInfoSchema
  .merge(backgroundSchema)
  .merge(experienceSchema)
  .merge(conductSchema)
  .merge(insuranceSchema);

export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type BackgroundData = z.infer<typeof backgroundSchema>;
export type ExperienceData = z.infer<typeof experienceSchema>;
export type ConductData = z.infer<typeof conductSchema>;
export type InsuranceData = z.infer<typeof insuranceSchema>;
export type FullApplicationData = z.infer<typeof fullApplicationSchema>;
