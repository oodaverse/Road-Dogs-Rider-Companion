'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center relative">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{
                  scale: currentStep >= step.id ? 1 : 0.8,
                  backgroundColor:
                    currentStep > step.id
                      ? '#eab308'
                      : currentStep === step.id
                      ? '#dc2626'
                      : '#e5e7eb',
                }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg z-10 shadow-lg',
                  currentStep > step.id && 'bg-yellow-500',
                  currentStep === step.id && 'bg-red-600 ring-4 ring-yellow-500/30',
                  currentStep < step.id && 'bg-gray-300 text-gray-500'
                )}
              >
                {currentStep > step.id ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                ) : (
                  step.id
                )}
              </motion.div>
              <div className="mt-3 text-center">
                <p
                  className={cn(
                    'text-sm font-semibold',
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  )}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 hidden md:block max-w-[120px]">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 mb-12 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{
                    width: currentStep > step.id ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
