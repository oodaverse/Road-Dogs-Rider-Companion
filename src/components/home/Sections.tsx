'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Premium Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0d0d0d] to-black opacity-90"></div>
        
        {/* Animated glow orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-yellow-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-red-500/15 to-red-600/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-yellow-500/10 to-transparent rounded-full blur-3xl"
        />
        
        {/* Animated road lines */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
        <motion.div
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 w-[200%] flex"
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-32 h-1.5 bg-gradient-to-r from-yellow-500/50 to-yellow-400/20 mx-6 rounded-full shadow-lg shadow-yellow-500/20"
            />
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="logo-emblem w-32 h-32 md:w-40 md:h-40 mx-auto">
            <Image
              src="/doglogo.jpg"
              alt="Road Dog Logo"
              width={160}
              height={160}
              className="rounded-full object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full text-yellow-300 mb-10"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Truck className="w-5 h-5" />
          </motion.div>
          <span className="text-sm font-medium tracking-wide">The Open Road Awaits</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-6xl md:text-8xl font-brand gradient-text mb-4 pb-2 text-shadow-gold"
          style={{ paddingBottom: '0.1em' }}
        >
          Road Dog
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-4xl md:text-5xl font-brand text-red-500 mb-10 text-shadow-red"
        >
          Companion
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Join our network of companion riders and experience the adventure of
          long-haul trucking across America. <span className="text-yellow-400">Safe</span>, <span className="text-yellow-400">vetted</span>, <span className="text-yellow-400">professional</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            href="/apply"
            className="btn-premium inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-bold text-lg group"
          >
            Apply as Rider
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="glass inline-flex items-center justify-center gap-3 text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border-2 border-yellow-500/40 hover:border-yellow-400/60 hover:scale-105">
            Learn More
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-20"
        >
          {[
            { number: '10K+', label: 'Miles Covered' },
            { number: '500+', label: 'Active Riders' },
            { number: '98%', label: 'Satisfaction' },
          ].map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center glass-light rounded-2xl py-6 px-4 hover:scale-105 transition-transform"
              whileHover={{ y: -5 }}
            >
              <p className="text-3xl md:text-5xl font-bold gradient-text">
                {stat.number}
              </p>
              <p className="text-yellow-400 text-sm mt-2 font-semibold">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-8 h-14 border-2 border-yellow-400/50 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
          <motion.div
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 bg-gradient-to-b from-yellow-400 to-red-500 rounded-full"
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
      color: 'from-yellow-400 to-yellow-600',
      glow: 'shadow-yellow-500/30',
    },
    {
      icon: Users,
      title: 'Professional Companions',
      description:
        'Our riders are trained professionals who understand the responsibilities of long-haul companionship.',
      color: 'from-red-500 to-red-700',
      glow: 'shadow-red-500/30',
    },
    {
      icon: MapPin,
      title: 'Coast to Coast',
      description:
        'Travel across all 48 contiguous states. Experience America from the unique perspective of the open road.',
      color: 'from-orange-500 to-orange-700',
      glow: 'shadow-orange-500/30',
    },
    {
      icon: Heart,
      title: 'Combating Loneliness',
      description:
        'Long-haul trucking can be isolating. Our companions provide meaningful conversation and company.',
      color: 'from-pink-500 to-red-600',
      glow: 'shadow-pink-500/30',
    },
    {
      icon: Clock,
      title: 'Flexible Scheduling',
      description:
        'Choose routes and schedules that fit your lifestyle. Short hauls or cross-country adventures.',
      color: 'from-emerald-500 to-emerald-700',
      glow: 'shadow-emerald-500/30',
    },
    {
      icon: Star,
      title: 'Rated & Reviewed',
      description:
        'Both drivers and riders are rated after each trip, maintaining high quality standards.',
      color: 'from-amber-400 to-amber-600',
      glow: 'shadow-amber-500/30',
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-gray-900 via-gray-900 to-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="text-yellow-400 font-bold tracking-widest mb-4 uppercase text-sm"
          >
            ★ Why Choose Us ★
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-brand gradient-text mb-6"
          >
            The Road Dog Difference
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-gold w-32 mx-auto mb-8" />
          <motion.p
            variants={fadeInUp}
            className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            We&apos;re not just connecting riders and drivers—we&apos;re building a <span className="text-yellow-400 font-semibold">community</span> based on safety, respect, and shared adventure.
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
              whileHover={{ y: -8, scale: 1.02 }}
              className={`card-premium rounded-2xl p-8 hover:shadow-2xl ${feature.glow} transition-all duration-300`}
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-200">{feature.description}</p>
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
      icon: '📝',
    },
    {
      step: '02',
      title: 'Verification',
      description:
        'Our team reviews your application, verifies documents, and conducts necessary background checks.',
      icon: '✓',
    },
    {
      step: '03',
      title: 'Get Matched',
      description:
        'Once approved, browse available routes and get matched with compatible drivers.',
      icon: '🤝',
    },
    {
      step: '04',
      title: 'Hit the Road',
      description:
        'Coordinate with your driver and embark on your adventure across America!',
      icon: '🚛',
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Road line decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500/0 via-yellow-500/30 to-yellow-500/0 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.p
            variants={fadeInUp}
            className="text-yellow-400 font-bold tracking-widest mb-4 uppercase text-sm"
          >
            ★ How It Works ★
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-brand gradient-text mb-6"
          >
            Your Journey Starts Here
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-gold w-32 mx-auto mb-8" />
          <motion.p variants={fadeInUp} className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Getting started is easy. Follow these simple steps to become a <span className="text-yellow-400 font-semibold">Road Dog</span> companion rider.
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
              whileHover={{ y: -8 }}
              className="relative"
            >
              <div className="card-premium rounded-2xl p-8 h-full group hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-6xl font-bold bg-gradient-to-br from-yellow-400/30 to-red-500/20 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-yellow-400 mt-4 mb-3 group-hover:text-yellow-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-200 leading-relaxed">{item.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
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
    { text: 'Must be at least 18 years of age', icon: '🎂' },
    { text: 'Valid government-issued photo ID', icon: '🪪' },
    { text: 'Active health insurance coverage', icon: '🏥' },
    { text: 'Clean background check', icon: '✅' },
    { text: 'No active warrants or restrictions', icon: '⚖️' },
    { text: 'Ability to sit for extended periods', icon: '💺' },
    { text: 'Professional, respectful demeanor', icon: '🤝' },
    { text: 'Understanding of trip expectations', icon: '📋' },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-gray-900 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-yellow-400 font-bold tracking-widest mb-4 uppercase text-sm">★ Requirements ★</p>
            <h2 className="text-4xl md:text-6xl font-brand gradient-text mb-6">
              What We Look For
            </h2>
            <div className="divider-gold w-24 mb-8" />
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              To ensure the <span className="text-yellow-400 font-semibold">safety</span> and <span className="text-yellow-400 font-semibold">quality</span> of our program, all rider applicants
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
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-4 glass-light p-4 rounded-xl hover:border-yellow-500/50 transition-all"
                >
                  <span className="text-2xl">{req.icon}</span>
                  <span className="text-yellow-400 font-medium">{req.text}</span>
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
            <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl p-10 md:p-14 border-2 border-yellow-500/30 shadow-2xl shadow-red-500/20 relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent pointer-events-none" />
              
              <h3 className="text-3xl font-brand text-yellow-400 mb-4 relative">
                Ready to Get Started?
              </h3>
              <p className="text-red-100 mb-10 text-lg leading-relaxed relative">
                Join hundreds of riders who have already experienced the adventure
                of cross-country trucking. Apply today and start your journey!
              </p>
              <Link
                href="/apply"
                className="relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-10 py-5 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-yellow-400 transition-all shadow-lg shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40 hover:scale-105 group"
              >
                Start Application
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-black to-gray-900 rounded-3xl -z-10 border border-yellow-500/20" />
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-3xl -z-10 shadow-xl shadow-yellow-500/30" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-32 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Animations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-yellow-500/5 to-red-500/5 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] bg-gradient-to-br from-red-500/5 to-yellow-500/5 rounded-full"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Icon with glow */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="relative inline-block mb-10"
          >
            <div className="absolute inset-0 bg-yellow-400/30 blur-2xl rounded-full" />
            <Truck className="w-20 h-20 text-yellow-400 relative" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-brand gradient-text mb-8">
            Your Adventure Awaits
          </h2>
          <div className="divider-gold w-24 mx-auto mb-8" />
          <p className="text-xl text-gray-300 mb-14 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t just dream about the open road—<span className="text-yellow-400 font-semibold">experience it</span>. Join Road Dog
            today and discover America from behind the wheel of an 18-wheeler.
          </p>
          <Link
            href="/apply"
            className="btn-premium inline-flex items-center gap-4 px-14 py-6 rounded-2xl font-bold text-xl group"
          >
            Apply Now — It&apos;s Free
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Free to Apply</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-400" />
              <span>Verified & Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>500+ Active Riders</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
