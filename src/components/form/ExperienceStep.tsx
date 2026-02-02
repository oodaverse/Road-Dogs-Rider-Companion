'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Compass, Clock, Moon, Box, HeartHandshake } from 'lucide-react';
import { Checkbox, Textarea, Select } from '@/components/ui/FormElements';
import { COMFORT_LEVELS } from '@/lib/constants';
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

export function ExperienceStep() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FullApplicationData>();

  const hasTraveledLong = useWatch({
    control,
    name: 'has_traveled_long_distances',
  });

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
          Experience & Purpose
        </h2>
        <p className="text-gray-600">
          Help us understand your motivations and experience with long-distance travel.
        </p>
      </motion.div>

      {/* Motivation */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Compass className="w-5 h-5 text-orange-500" />
          Your Motivation
        </h3>

        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-lg border border-orange-100">
          <Textarea
            label="Why do you want to be a companion rider?"
            placeholder="Tell us about your interest in the Road-Dogs program. What draws you to this experience? What do you hope to gain from it? (Minimum 50 characters)"
            error={errors.why_companion_rider?.message}
            required
            className="min-h-[150px]"
            {...register('why_companion_rider')}
          />
          <p className="text-orange-600 text-xs mt-2">
            This helps us match you with compatible drivers who share your interests.
          </p>
        </div>
      </motion.div>

      {/* Travel Experience */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="w-5 h-5 text-orange-500" />
          Travel Experience
        </h3>

        <div className="space-y-4 bg-gray-50 p-6 rounded-lg border border-gray-100">
          <Checkbox
            label={
              <span>
                <strong>I have traveled long distances</strong> (500+ miles) by vehicle before
              </span>
            }
            {...register('has_traveled_long_distances')}
          />

          {hasTraveledLong && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="ml-8"
            >
              <Textarea
                label="Tell us about your long-distance travel experience"
                placeholder="Describe your previous trips, how you handled the journey, any challenges you faced..."
                {...register('long_distance_experience')}
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Overnight Comfort */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Moon className="w-5 h-5 text-orange-500" />
          Overnight Comfort
        </h3>

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-4">
          <p className="text-indigo-800 text-sm">
            🌙 Long-haul routes often require overnight stays in the truck cab sleeper berth
            or at truck stops. Understanding your comfort level helps us plan accordingly.
          </p>
        </div>

        <Select
          label="How comfortable are you with overnight travel?"
          options={COMFORT_LEVELS}
          error={errors.overnight_comfort_level?.message}
          required
          {...register('overnight_comfort_level')}
        />
      </motion.div>

      {/* Confined Spaces */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Box className="w-5 h-5 text-orange-500" />
          Environment Comfort
        </h3>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <Checkbox
            label={
              <span>
                <strong>I am comfortable in confined spaces</strong> for extended periods.
                I understand that a truck cab is a limited space and I will be sharing it with the driver.
              </span>
            }
            error={errors.confined_spaces_comfort?.message}
            {...register('confined_spaces_comfort')}
          />
        </div>
      </motion.div>

      {/* Critical Acknowledgment */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-navy-800 flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-orange-500" />
          Important Acknowledgment
        </h3>

        <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
          <div className="mb-4">
            <h4 className="font-bold text-red-800 text-lg mb-2">
              ⚠️ THIS IS NOT A ROMANTIC OR DATING SERVICE
            </h4>
            <p className="text-red-700 text-sm mb-4">
              Road-Dogs: Rider Companion is a <strong>strictly professional</strong> companion
              service designed to provide drivers with company during long-haul routes.
              This is NOT a platform for romantic relationships, dating, or any sexual
              encounters.
            </p>
            <ul className="text-red-700 text-sm space-y-1 ml-4 list-disc">
              <li>All interactions must remain professional at all times</li>
              <li>No romantic or sexual expectations should be implied or expected</li>
              <li>Violation of this policy will result in immediate removal from the program</li>
              <li>Any misconduct should be reported immediately</li>
            </ul>
          </div>

          <Checkbox
            label={
              <span className="font-semibold text-red-800">
                I understand and acknowledge that Road-Dogs: Rider Companion is NOT a romantic
                or sexual arrangement service, and I agree to maintain professional conduct at all times.
              </span>
            }
            error={errors.understands_not_romantic?.message}
            {...register('understands_not_romantic')}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
