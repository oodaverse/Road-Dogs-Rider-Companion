'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useState, useCallback } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading: externalLoading = false,
  icon,
  iconPosition = 'right',
  className,
  disabled,
  type = 'button',
  onClick,
}: ButtonProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = externalLoading || internalLoading;
  const isDisabled = disabled || isLoading;

  const variants = {
    primary:
      'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 border border-yellow-500/30',
    secondary:
      'bg-gray-800 text-white hover:bg-gray-700 shadow-lg shadow-gray-800/25',
    outline:
      'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-50',
    ghost:
      'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleClick = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent double-clicks and rapid taps
    if (isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (onClick) {
      try {
        setInternalLoading(true);
        const result = onClick(e);
        // Handle async onClick
        if (result instanceof Promise) {
          await result;
        }
      } catch (error) {
        console.error('Button click error:', error);
      } finally {
        setInternalLoading(false);
      }
    }
  }, [onClick, isDisabled]);

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      whileHover={isDisabled ? undefined : { scale: 1.02 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      className={cn(
        'rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2',
        'touch-manipulation select-none',
        variants[variant],
        sizes[size],
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-auto',
        className
      )}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </motion.button>
  );
}
