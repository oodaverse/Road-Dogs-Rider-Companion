'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Image, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  label: string;
  accept?: string;
  maxSize?: number; // in MB
  error?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
}

export function FileUpload({
  label,
  accept = '.pdf,.jpg,.jpeg,.png',
  maxSize = 5,
  error,
  value,
  onChange,
  required,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    const allowedTypes = accept.split(',').map((t) => t.trim());
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
    
    if (!allowedTypes.some((type) => fileExtension === type || file.type.includes(type.replace('.', '')))) {
      setUploadError(`Invalid file type. Allowed: ${accept}`);
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setUploadError(`File too large. Max size: ${maxSize}MB`);
      return false;
    }

    setUploadError(null);
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      onChange(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      onChange(file);
    }
  };

  const removeFile = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-8 h-8 text-blue-500" />;
    }
    return <FileText className="w-8 h-8 text-yellow-500" />;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <AnimatePresence mode="wait">
        {value ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative p-4 bg-green-50 border-2 border-green-200 rounded-lg"
          >
            <div className="flex items-center gap-4">
              {getFileIcon(value)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {value.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(value.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              'relative p-8 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200',
              'hover:border-yellow-400 hover:bg-yellow-50/50',
              isDragging
                ? 'border-yellow-500 bg-yellow-50'
                : 'border-gray-300 bg-gray-50/50',
              error && 'border-red-500'
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="flex flex-col items-center text-center">
              <motion.div
                animate={{ y: isDragging ? -5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Upload
                  className={cn(
                    'w-10 h-10 mb-3',
                    isDragging ? 'text-yellow-500' : 'text-gray-400'
                  )}
                />
              </motion.div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-yellow-600">Click to upload</span>
                {' '}or drag and drop
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {accept.replace(/\./g, '').toUpperCase()} (max {maxSize}MB)
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(error || uploadError) && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm"
        >
          {error || uploadError}
        </motion.p>
      )}
    </div>
  );
}
