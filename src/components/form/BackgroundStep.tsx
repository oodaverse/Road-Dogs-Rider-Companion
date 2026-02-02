'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Heart, Pill, Activity } from 'lucide-react';
import { Checkbox, Textarea } from '@/components/ui/FormElements';
import type { FullApplicationData } from '@/lib/validations';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface ConditionalFieldProps {
  condition: boolean;
  children: React.ReactNode;
}

function ConditionalField({ condition, children }: ConditionalFieldProps) {
  if (!condition) return null;
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="ml-8 mt-3"
    >
      {children}
    </motion.div>
  );
}

export function BackgroundStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FullApplicationData>();

  const watchedValues = useWatch({
    control,
    name: [
      'has_felony_conviction',
      'is_on_probation_parole',
      'is_banned_from_carrier',
      'has_medical_conditions',
      'takes_medications',
    ],
  });

  const [
    hasFelony,
    isOnProbation,
    isBanned,
    hasMedical,
    takesMeds,
  ] = watchedValues;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Section Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Background Eligibility
        </h2>
        <p className="text-gray-600">
          Please answer the following questions honestly. Your responses help ensure
          the safety and compatibility of all participants.
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            🔒 All information is confidential and used solely for eligibility assessment.
          </p>
        </div>
      </motion.div>

      {/* Legal Background */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-orange-500" />
          Legal Background
        </h3>

        <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div>
            <Checkbox
              label="Have you ever been convicted of a felony?"
              {...register('has_felony_conviction')}
            />
            <ConditionalField condition={!!hasFelony}>
              <Textarea
                label="Please provide details about your conviction(s)"
                placeholder="Include type of offense, date, and any relevant information..."
                {...register('felony_details')}
              />
            </ConditionalField>
          </div>

          <div>
            <Checkbox
              label="Are you currently on probation or parole?"
              {...register('is_on_probation_parole')}
            />
            <ConditionalField condition={!!isOnProbation}>
              <Textarea
                label="Please provide details about your probation/parole"
                placeholder="Include type, duration, restrictions, and supervising officer contact if applicable..."
                {...register('probation_parole_details')}
              />
            </ConditionalField>
          </div>

          <div>
            <Checkbox
              label="Have you been banned from any carrier or trucking company?"
              {...register('is_banned_from_carrier')}
            />
            <ConditionalField condition={!!isBanned}>
              <Textarea
                label="Please provide details about the ban"
                placeholder="Include company name, reason for ban, and date..."
                {...register('banned_carrier_details')}
              />
            </ConditionalField>
          </div>
        </div>
      </motion.div>

      {/* Health & Medical */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-orange-500" />
          Health & Medical
        </h3>

        <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <div>
            <Checkbox
              label="Do you have any medical conditions we should be aware of?"
              {...register('has_medical_conditions')}
            />
            <ConditionalField condition={!!hasMedical}>
              <Textarea
                label="Please describe your medical condition(s)"
                placeholder="Include any conditions that may affect your ability to travel or require special accommodations..."
                {...register('medical_conditions_details')}
              />
            </ConditionalField>
          </div>

          <div>
            <Checkbox
              label="Do you currently take any medications?"
              {...register('takes_medications')}
            />
            <ConditionalField condition={!!takesMeds}>
              <Textarea
                label="Please list your medications"
                placeholder="Include medication names, dosages, and any that may cause drowsiness or affect your alertness..."
                {...register('medications_details')}
              />
            </ConditionalField>
          </div>
        </div>
      </motion.div>

      {/* Physical Considerations */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-500" />
          Physical Considerations
        </h3>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <p className="text-amber-800 text-sm">
              Long-haul trucking involves extended periods of sitting in a truck cab.
              Please consider your physical comfort and capabilities when answering.
            </p>
          </div>
        </div>

        <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <Checkbox
            label={
              <span>
                <strong>I am able to sit for extended periods</strong> (4+ hours) without significant discomfort
              </span>
            }
            error={errors.can_sit_extended_periods?.message}
            {...register('can_sit_extended_periods')}
          />

          <Checkbox
            label={
              <span>
                <strong>I experience motion sickness</strong> during vehicle travel
              </span>
            }
            {...register('has_motion_sickness')}
          />
        </div>
      </motion.div>

      {/* Disclosure Notice */}
      <motion.div
        variants={itemVariants}
        className="p-4 bg-gray-100 rounded-lg border border-gray-200"
      >
        <p className="text-gray-600 text-sm">
          <strong>Disclosure Notice:</strong> Providing false information may result
          in disqualification from the program. Certain background factors may not
          automatically disqualify you—each application is reviewed individually.
        </p>
      </motion.div>
    </motion.div>
  );
}
