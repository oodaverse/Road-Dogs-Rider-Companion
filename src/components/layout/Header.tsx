'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 md:h-24">
          <Link href="/" className="flex items-center gap-2 sm:gap-4 group">
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="logo-emblem w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
            >
              <Image
                src="/doglogo.jpg"
                alt="Road Dog Logo"
                width={64}
                height={64}
                className="rounded-full object-cover w-full h-full"
              />
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                className="font-brand text-xl sm:text-2xl md:text-3xl lg:text-4xl gradient-text tracking-wide"
                whileHover={{ scale: 1.02 }}
              >
                Road Dog
              </motion.span>
              <span className="font-brand text-sm sm:text-lg md:text-xl lg:text-2xl text-red-500 -mt-1 tracking-wide text-shadow-red">
                Companion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-200 hover:text-yellow-400 transition-all duration-300 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/apply"
              className="text-gray-200 hover:text-yellow-400 transition-all duration-300 font-medium relative group"
            >
              Apply Now
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/admin"
              className="text-gray-200 hover:text-yellow-400 transition-all duration-300 font-medium relative group"
            >
              Admin
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/apply"
                className="btn-premium text-white px-8 py-3 rounded-full font-semibold inline-block"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-yellow-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-6 border-t border-yellow-500/20"
          >
            <div className="flex flex-col gap-5">
              <Link
                href="/"
                className="text-gray-200 hover:text-yellow-400 transition-all duration-300 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/apply"
                className="text-gray-200 hover:text-yellow-400 transition-all duration-300 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
              <Link
                href="/admin"
                className="text-gray-200 hover:text-yellow-400 transition-all duration-300 font-medium text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                href="/apply"
                className="btn-premium text-white px-6 py-3 rounded-full font-semibold text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-[#0d0d0d] text-white py-16 border-t border-yellow-500/20 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="logo-emblem">
                <Image
                  src="/doglogo.jpg"
                  alt="Road Dog Logo"
                  width={56}
                  height={56}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-brand text-3xl gradient-text">
                  Road Dog
                </span>
                <span className="font-brand text-xl text-red-500 -mt-1">
                  Companion
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              Road Dog Companion connects licensed truck drivers with vetted
              companions for long-haul routes across the United States. Making the open
              road a little less lonely.
            </p>
            <div className="divider-gold w-32 mt-6"></div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-yellow-400 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  → Home
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  → Apply as Rider
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  → For Drivers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  → FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-yellow-400 text-lg">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">✉</span> support@road-dog.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">☎</span> 1-800-ROAD-DOG
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-500">◷</span> Mon-Fri: 8AM-6PM EST
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-12 mb-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} <span className="text-yellow-500/70">Road Dog Companion</span>. All rights reserved.
          </p>
          <div className="flex gap-8 text-gray-500 text-sm">
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-yellow-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
