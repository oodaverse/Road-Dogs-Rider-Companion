'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Send, CheckCircle } from 'lucide-react';

import { StepIndicator } from '@/components/ui/StepIndicator';
import { Button } from '@/components/ui/Button';
import { PersonalInfoStep } from '@/components/form/PersonalInfoStep';
import { BackgroundStep } from '@/components/form/BackgroundStep';
import { ExperienceStep } from '@/components/form/ExperienceStep';
import { ConductStep } from '@/components/form/ConductStep';
import { InsuranceStep } from '@/components/form/InsuranceStep';

import {
  personalInfoSchema,
  backgroundSchema,
  experienceSchema,
  conductSchema,
  insuranceSchema,
  type FullApplicationData,
} from '@/lib/validations';
import { calculateAge } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const STEPS = [
  { id: 1, title: 'Personal Info', description: 'Your details' },
  { id: 2, title: 'Background', description: 'Eligibility check' },
  { id: 3, title: 'Experience', description: 'Your motivation' },
  { id: 4, title: 'Conduct', description: 'Expectations' },
  { id: 5, title: 'Insurance', description: 'Coverage proof' },
];

const stepSchemas = [
  personalInfoSchema,
  backgroundSchema,
  experienceSchema,
  conductSchema,
  insuranceSchema,
];

interface Files {
  id_document?: File | null;
  health_insurance_document?: File | null;
  liability_insurance_document?: File | null;
}

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [files, setFiles] = useState<Files>({});

  const methods = useForm<FullApplicationData>({
    mode: 'onChange',
    defaultValues: {
      has_felony_conviction: false,
      is_on_probation_parole: false,
      is_banned_from_carrier: false,
      has_medical_conditions: false,
      can_sit_extended_periods: true,
      has_motion_sickness: false,
      takes_medications: false,
      has_traveled_long_distances: false,
      confined_spaces_comfort: true,
      understands_not_romantic: false,
      conduct_acknowledged: false,
      conduct_date: new Date().toISOString().split('T')[0],
    },
  });

  const handleFileChange = (field: string, file: File | null) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const validateCurrentStep = async (): Promise<boolean> => {
    const currentSchema = stepSchemas[currentStep - 1];
    const values = methods.getValues();
    
    try {
      await currentSchema.parseAsync(values);
      return true;
    } catch (error) {
      // Trigger validation to show errors
      if (currentSchema.shape) {
        const fieldsToValidate = Object.keys(currentSchema.shape);
        await Promise.all(
          fieldsToValidate.map((field) =>
            methods.trigger(field as keyof FullApplicationData)
          )
        );
      }
      return false;
    }
  };

  const nextStep = async (): Promise<void> => {
    try {
      const isValid = await validateCurrentStep();
      if (isValid && currentStep < STEPS.length) {
        setCurrentStep((prev) => prev + 1);
        // Use requestAnimationFrame for smoother scroll on mobile
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error } = await supabase.storage
        .from('rider-documents')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error:', error);
        return null;
      }

      const { data: urlData } = supabase.storage
        .from('rider-documents')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      return null;
    }
  };

  const onSubmit = async (data: FullApplicationData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Upload files
      let idDocumentUrl = null;
      let healthInsuranceDocUrl = null;
      let liabilityInsuranceDocUrl = null;

      if (files.id_document) {
        idDocumentUrl = await uploadFile(files.id_document, 'id-documents');
      }
      if (files.health_insurance_document) {
        healthInsuranceDocUrl = await uploadFile(files.health_insurance_document, 'health-insurance');
      }
      if (files.liability_insurance_document) {
        liabilityInsuranceDocUrl = await uploadFile(files.liability_insurance_document, 'liability-insurance');
      }

      // Calculate age from DOB
      const age = calculateAge(data.date_of_birth);

      // Prepare the application data
      const applicationData = {
        ...data,
        age,
        id_document_url: idDocumentUrl,
        health_insurance_document_url: healthInsuranceDocUrl,
        liability_insurance_document_url: liabilityInsuranceDocUrl,
        application_status: 'pending',
      };

      // Submit to Supabase
      const { error } = await supabase
        .from('rider_applications')
        .insert([applicationData]);

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex items-center justify-center px-3 sm:px-6"
      >
        <div className="text-center bg-white p-6 sm:p-8 md:p-12 rounded-xl sm:rounded-2xl shadow-xl max-w-lg mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <CheckCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-green-500 mx-auto mb-4 sm:mb-6" />
          </motion.div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
            Application Submitted!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            Thank you for applying to the Road-Dogs: Rider Companion program.
            We will review your application and contact you within 3-5 business days.
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
          <Button
            onClick={() => { window.location.href = '/'; }}
            className="mt-6 sm:mt-8"
            variant="primary"
          >
            Return to Home
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-4xl mx-auto px-1 sm:px-0">
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 mt-4 sm:mt-6 md:mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <PersonalInfoStep />}
              {currentStep === 2 && <BackgroundStep />}
              {currentStep === 3 && <ExperienceStep />}
              {currentStep === 4 && <ConductStep />}
              {currentStep === 5 && (
                <InsuranceStep onFileChange={handleFileChange} files={files} />
              )}
            </motion.div>
          </AnimatePresence>

          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center"
            >
              {submitError}
            </motion.div>
          )}

          <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12 pt-4 sm:pt-6 border-t border-gray-100">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              icon={<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />}
              iconPosition="left"
              className="w-full sm:w-auto justify-center"
            >
              Previous
            </Button>

            {currentStep < STEPS.length ? (
              <Button
                type="button"
                onClick={nextStep}
                icon={<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                className="w-full sm:w-auto justify-center"
              >
                Next Step
              </Button>
            ) : (
              <Button
                type="submit"
                loading={isSubmitting}
                icon={<Send className="w-4 h-4 sm:w-5 sm:h-5" />}
                className="w-full sm:w-auto justify-center"
              >
                Submit Application
              </Button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
