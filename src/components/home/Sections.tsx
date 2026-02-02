'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Truck,
  Users,
  Shield,
  MapPin,
  CheckCircle,
  ArrowRight,
  Heart,
  Clock,
  Star,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-navy-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        
        {/* Road lines animation */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900/50 to-transparent" />
        <motion.div
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-16 w-[200%] flex"
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-24 h-2 bg-orange-500/30 mx-4 rounded-full"
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-orange-500/20 backdrop-blur-sm px-4 py-2 rounded-full text-orange-300 mb-8"
        >
          <Truck className="w-5 h-5" />
          <span className="text-sm font-medium">The Open Road Awaits</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Road-<span className="text-orange-400">Dogs</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-2xl md:text-3xl text-orange-300 font-semibold mb-4"
        >
          Rider Companion Program
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Join our network of companion riders and experience the adventure of
          long-haul trucking across America. Safe, vetted, professional.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:scale-105"
          >
            Apply as Rider
            <ArrowRight className="w-5 h-5" />
          </Link>
          <button className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
            Learn More
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
        >
          {[
            { number: '10K+', label: 'Miles Covered' },
            { number: '500+', label: 'Active Riders' },
            { number: '98%', label: 'Satisfaction' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-orange-400">
                {stat.number}
              </p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-orange-400 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Thoroughly Vetted',
      description:
        'All riders undergo comprehensive background checks and verification to ensure safety for everyone.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Users,
      title: 'Professional Companions',
      description:
        'Our riders are trained professionals who understand the responsibilities of long-haul companionship.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: MapPin,
      title: 'Coast to Coast',
      description:
        'Travel across all 48 contiguous states. Experience America from the unique perspective of the open road.',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Heart,
      title: 'Combating Loneliness',
      description:
        'Long-haul trucking can be isolating. Our companions provide meaningful conversation and company.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description:
        'Choose routes and schedules that fit your lifestyle. Short hauls or cross-country adventures.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Star,
      title: 'Rated & Reviewed',
      description:
        'Both drivers and riders are rated after each trip, maintaining high quality standards.',
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <section className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-orange-500 font-semibold mb-4"
          >
            WHY CHOOSE US
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            The Road-Dogs Difference
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            We&apos;re not just connecting riders and drivers—we&apos;re building a community
            based on safety, respect, and shared adventure.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-navy-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-navy-700"
            >
              <div
                className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    {
      step: '01',
      title: 'Apply Online',
      description:
        'Fill out our comprehensive application form with your personal details and background information.',
    },
    {
      step: '02',
      title: 'Verification',
      description:
        'Our team reviews your application, verifies documents, and conducts necessary background checks.',
    },
    {
      step: '03',
      title: 'Get Matched',
      description:
        'Once approved, browse available routes and get matched with compatible drivers.',
    },
    {
      step: '04',
      title: 'Hit the Road',
      description:
        'Coordinate with your driver and embark on your adventure across America!',
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="text-orange-400 font-semibold mb-4"
          >
            HOW IT WORKS
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Your Journey Starts Here
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-gray-300 max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to become a Road-Dogs
            companion rider.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="relative"
            >
              <div className="bg-navy-900 rounded-2xl p-8 h-full border border-navy-700 hover:border-orange-500/50 transition-colors">
                <span className="text-6xl font-bold text-orange-500/20">
                  {item.step}
                </span>
                <h3 className="text-xl font-bold text-white mt-4 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-orange-500/30" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function RequirementsSection() {
  const requirements = [
    'Must be at least 18 years of age',
    'Valid government-issued photo ID',
    'Active health insurance coverage',
    'Clean background check',
    'No active warrants or restrictions',
    'Ability to sit for extended periods',
    'Professional, respectful demeanor',
    'Understanding of trip expectations',
  ];

  return (
    <section className="py-24 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-orange-500 font-semibold mb-4">REQUIREMENTS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What We Look For
            </h2>
            <p className="text-gray-300 mb-8">
              To ensure the safety and quality of our program, all rider applicants
              must meet the following requirements. These standards help us maintain
              a trusted community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requirements.map((req, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-200">{req}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-orange-100 mb-8">
                Join hundreds of riders who have already experienced the adventure
                of cross-country trucking. Apply today and start your journey!
              </p>
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors"
              >
                Start Application
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-black rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-orange-600 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-black to-navy-900 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-orange-500/5 rounded-full"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Truck className="w-16 h-16 text-orange-400 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Adventure Awaits
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Don&apos;t just dream about the open road—experience it. Join Road-Dogs
            today and discover America from behind the wheel of an 18-wheeler.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/30 transition-all hover:scale-105"
          >
            Apply Now — It&apos;s Free
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
