'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FileCheck, Scale, Gavel, Check } from 'lucide-react';
import { Checkbox, Input } from '@/components/ui/FormElements';
import { CONDUCT_EXPECTATIONS } from '@/lib/constants';
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

export function ConductStep() {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<FullApplicationData>();

  // Set today's date as default
  const today = new Date().toISOString().split('T')[0];

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
          Conduct & Professional Expectations
        </h2>
        <p className="text-gray-600">
          Please review and acknowledge the following conduct guidelines.
        </p>
      </motion.div>

      {/* Legal Notice */}
      <motion.div
        variants={itemVariants}
        className="bg-amber-50 p-6 rounded-lg border-2 border-amber-300"
      >
        <div className="flex items-start gap-4">
          <Scale className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-amber-800 text-lg mb-2">
              Legal Notice & Terms of Participation
            </h3>
            <p className="text-amber-700 text-sm">
              By participating in the Road-Dogs: Rider Companion program, you agree to
              abide by the following conduct and professional expectations. Failure to
              comply may result in immediate termination from the program and potential
              legal action.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Conduct Sections */}
      {CONDUCT_EXPECTATIONS.map((section, index) => (
        <motion.div
          key={section.title}
          variants={itemVariants}
          className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
        >
          <div className="bg-gradient-to-r from-navy-800 to-navy-700 px-6 py-4">
            <h3 className="font-bold text-white flex items-center gap-2">
              <span className="bg-orange-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <span className="underline decoration-orange-400 decoration-2 underline-offset-4">
                {section.title}
              </span>
            </h3>
          </div>
          <ul className="p-6 space-y-3">
            {section.points.map((point, pointIndex) => (
              <li key={pointIndex} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}

      {/* Acknowledgment Section */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-lg p-8 text-white"
      >
        <div className="flex items-center gap-3 mb-6">
          <Gavel className="w-8 h-8 text-orange-400" />
          <h3 className="text-xl font-bold">
            <span className="underline decoration-orange-400 decoration-2 underline-offset-4">
              Acknowledgment & Signature
            </span>
          </h3>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
          <p className="text-white/90 text-sm mb-4">
            By checking the box below and providing my signature, I hereby acknowledge that:
          </p>
          <ul className="space-y-2 text-white/80 text-sm ml-4">
            <li>• I have read and understood all conduct and professional expectations</li>
            <li>• I agree to abide by all guidelines outlined above</li>
            <li>• I understand that violations may result in removal from the program</li>
            <li>• I release Road-Dogs, its affiliates, and partner carriers from liability</li>
            <li>• I confirm all information provided in this application is true and accurate</li>
          </ul>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg p-4">
            <Checkbox
              label={
                <span className="text-gray-800 font-semibold">
                  I acknowledge and agree to all conduct and professional expectations outlined above.
                  I understand this is a legally binding agreement.
                </span>
              }
              error={errors.conduct_acknowledged?.message}
              {...register('conduct_acknowledged')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <Input
                label="Digital Signature (Type your full legal name)"
                placeholder="Your Full Legal Name"
                icon={<FileCheck className="w-4 h-4" />}
                error={errors.conduct_signature?.message}
                required
                {...register('conduct_signature')}
              />
            </div>
            <div className="bg-white rounded-lg p-4">
              <Input
                label="Date"
                type="date"
                defaultValue={today}
                error={errors.conduct_date?.message}
                required
                {...register('conduct_date')}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Final Warning */}
      <motion.div
        variants={itemVariants}
        className="text-center p-4 bg-gray-100 rounded-lg"
      >
        <p className="text-gray-600 text-sm">
          <strong>Important:</strong> This acknowledgment serves as a digital signature
          and is legally binding. Please ensure you have read and understood all terms
          before proceeding.
        </p>
      </motion.div>
    </motion.div>
  );
}
