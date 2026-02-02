'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Shield, Heart, FileText, Upload, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/FormElements';
import { FileUpload } from '@/components/ui/FileUpload';
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

interface InsuranceStepProps {
  onFileChange: (field: string, file: File | null) => void;
  files: {
    id_document?: File | null;
    health_insurance_document?: File | null;
    liability_insurance_document?: File | null;
  };
}

export function InsuranceStep({ onFileChange, files }: InsuranceStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FullApplicationData>();

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
          Insurance Requirements
        </h2>
        <p className="text-gray-600">
          Valid insurance coverage is required to participate in the Road-Dogs program.
        </p>
      </motion.div>

      {/* Important Notice */}
      <motion.div
        variants={itemVariants}
        className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200"
      >
        <div className="flex items-start gap-4">
          <Shield className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-blue-800 text-lg mb-2">
              Insurance Requirements
            </h3>
            <ul className="text-blue-700 text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>Health Insurance:</strong> Required for all riders
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <strong>Liability Insurance:</strong> Recommended but optional
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Coverage must be active for the duration of your trips
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Government ID Upload */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-orange-500" />
          Government-Issued ID
        </h3>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <FileUpload
            label="Upload your Government ID (Driver's License, State ID, or Passport)"
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            value={files.id_document}
            onChange={(file) => onFileChange('id_document', file)}
            required
          />
        </div>
      </motion.div>

      {/* Health Insurance */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-orange-500" />
          Health Insurance (Required)
        </h3>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Insurance Company Name"
              placeholder="e.g., Blue Cross Blue Shield"
              error={errors.health_insurance_name?.message}
              required
              {...register('health_insurance_name')}
            />
            <Input
              label="Policy Number"
              placeholder="Your policy number"
              error={errors.health_insurance_policy?.message}
              required
              {...register('health_insurance_policy')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Coverage Start Date"
              type="date"
              error={errors.health_insurance_start?.message}
              required
              {...register('health_insurance_start')}
            />
            <Input
              label="Coverage End Date"
              type="date"
              error={errors.health_insurance_end?.message}
              required
              {...register('health_insurance_end')}
            />
          </div>

          <FileUpload
            label="Upload Proof of Health Insurance (Insurance Card or Declaration Page)"
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            value={files.health_insurance_document}
            onChange={(file) => onFileChange('health_insurance_document', file)}
            required
          />
        </div>
      </motion.div>

      {/* Liability Insurance */}
      <motion.div variants={itemVariants} className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-orange-500" />
          Liability Insurance (Optional but Recommended)
        </h3>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 mb-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <p className="text-amber-800 text-sm">
                <strong>Optional:</strong> Liability insurance provides additional
                protection for you and the driver during your journey. While not
                required, it is highly recommended.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Insurance Company Name"
              placeholder="e.g., State Farm"
              error={errors.liability_insurance_name?.message}
              {...register('liability_insurance_name')}
            />
            <Input
              label="Policy Number"
              placeholder="Your policy number"
              error={errors.liability_insurance_policy?.message}
              {...register('liability_insurance_policy')}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Coverage Start Date"
              type="date"
              error={errors.liability_insurance_start?.message}
              {...register('liability_insurance_start')}
            />
            <Input
              label="Coverage End Date"
              type="date"
              error={errors.liability_insurance_end?.message}
              {...register('liability_insurance_end')}
            />
          </div>

          <FileUpload
            label="Upload Proof of Liability Insurance (Optional)"
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5}
            value={files.liability_insurance_document}
            onChange={(file) => onFileChange('liability_insurance_document', file)}
          />
        </div>
      </motion.div>

      {/* Final Notice */}
      <motion.div
        variants={itemVariants}
        className="text-center p-6 bg-gradient-to-r from-navy-800 to-navy-700 rounded-lg text-white"
      >
        <Upload className="w-10 h-10 mx-auto mb-4 text-orange-400" />
        <h4 className="font-bold text-lg mb-2">Almost Done!</h4>
        <p className="text-white/80 text-sm">
          After submitting your application, our team will review your information
          and documents. You will receive a confirmation email within 3-5 business days.
        </p>
      </motion.div>
    </motion.div>
  );
}
