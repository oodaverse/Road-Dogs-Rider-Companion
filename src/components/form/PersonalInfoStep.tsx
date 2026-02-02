'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, CreditCard, Users } from 'lucide-react';
import { Input, Select } from '@/components/ui/FormElements';
import { US_STATES, RELATIONSHIPS } from '@/lib/constants';
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

export function PersonalInfoStep() {
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
          Personal Information
        </h2>
        <p className="text-gray-600">
          Please provide your personal details. All information is kept confidential.
        </p>
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm font-medium">
            ⚠️ You must be at least 18 years old to apply
          </p>
        </div>
      </motion.div>

      {/* Name Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-orange-500" />
          Full Name
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            placeholder="Enter your first name"
            icon={<User className="w-4 h-4" />}
            error={errors.first_name?.message}
            required
            {...register('first_name')}
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            error={errors.last_name?.message}
            required
            {...register('last_name')}
          />
        </div>
      </motion.div>

      {/* Contact Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-orange-500" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            required
            {...register('email')}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="(555) 123-4567"
            icon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            required
            {...register('phone')}
          />
        </div>
      </motion.div>

      {/* DOB & ID Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-orange-500" />
          Identification
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date of Birth"
            type="date"
            error={errors.date_of_birth?.message}
            required
            {...register('date_of_birth')}
          />
          <Input
            label="Government ID Number"
            placeholder="Driver's License or State ID"
            icon={<CreditCard className="w-4 h-4" />}
            error={errors.id_number?.message}
            required
            {...register('id_number')}
          />
        </div>
      </motion.div>

      {/* Address Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-orange-500" />
          Address
        </h3>
        <div className="space-y-4">
          <Input
            label="Street Address"
            placeholder="123 Main Street, Apt 4B"
            icon={<MapPin className="w-4 h-4" />}
            error={errors.address_street?.message}
            required
            {...register('address_street')}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="City"
              placeholder="City"
              error={errors.address_city?.message}
              required
              {...register('address_city')}
            />
            <Select
              label="State"
              options={US_STATES}
              error={errors.address_state?.message}
              required
              {...register('address_state')}
            />
            <Input
              label="ZIP Code"
              placeholder="12345"
              error={errors.address_zip?.message}
              required
              {...register('address_zip')}
            />
          </div>
        </div>
      </motion.div>

      {/* Emergency Contact Section */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-500" />
          Emergency Contact
        </h3>
        <div className="p-4 bg-red-50 border border-red-100 rounded-lg mb-4">
          <p className="text-red-700 text-sm">
            This person will be contacted in case of an emergency during your travels.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Contact Name"
            placeholder="Full name"
            error={errors.emergency_contact_name?.message}
            required
            {...register('emergency_contact_name')}
          />
          <Input
            label="Contact Phone"
            type="tel"
            placeholder="(555) 123-4567"
            error={errors.emergency_contact_phone?.message}
            required
            {...register('emergency_contact_phone')}
          />
          <Select
            label="Relationship"
            options={RELATIONSHIPS}
            error={errors.emergency_contact_relationship?.message}
            required
            {...register('emergency_contact_relationship')}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
