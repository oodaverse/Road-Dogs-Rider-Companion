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
    <div className="w-full py-3 sm:py-6 overflow-x-auto">
      <div className="flex items-center justify-between min-w-max sm:min-w-0">
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
                  'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-lg z-10 shadow-lg',
                  currentStep > step.id && 'bg-yellow-500',
                  currentStep === step.id && 'bg-red-600 ring-2 sm:ring-4 ring-yellow-500/30',
                  currentStep < step.id && 'bg-gray-300 text-gray-500'
                )}
              >
                {currentStep > step.id ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </motion.div>
                ) : (
                  step.id
                )}
              </motion.div>
              <div className="mt-1.5 sm:mt-2 md:mt-3 text-center">
                <p
                  className={cn(
                    'text-[10px] sm:text-xs md:text-sm font-semibold whitespace-nowrap',
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  )}
                >
                  {step.title}
                </p>
                <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 hidden sm:block max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 md:mx-4 mb-8 sm:mb-10 md:mb-12 rounded-full bg-gray-200 overflow-hidden">
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
