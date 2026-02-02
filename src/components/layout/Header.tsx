'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-yellow-500/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="logo-emblem"
            >
              <Image
                src="/doglogo.jpg"
                alt="Road Dog Logo"
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-yellow-400">
                Road Dog
              </span>
              <span className="font-brand text-red-500 text-sm -mt-1">
                Companion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-200 hover:text-yellow-400 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/apply"
              className="text-gray-200 hover:text-yellow-400 transition-colors font-medium"
            >
              Apply Now
            </Link>
            <Link
              href="/admin"
              className="text-gray-200 hover:text-yellow-400 transition-colors font-medium"
            >
              Admin
            </Link>
            <Link
              href="/apply"
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all border border-yellow-500/30"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-yellow-500/30"
          >
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-200 hover:text-yellow-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/apply"
                className="text-gray-200 hover:text-yellow-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Apply Now
              </Link>
              <Link
                href="/admin"
                className="text-gray-200 hover:text-yellow-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
              <Link
                href="/apply"
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg font-semibold text-center border border-yellow-500/30"
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
    <footer className="bg-black text-white py-12 border-t border-yellow-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="logo-emblem">
                <Image
                  src="/doglogo.jpg"
                  alt="Road Dog Logo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-yellow-400">
                  Road Dog
                </span>
                <span className="font-brand text-red-500 text-xs -mt-1">
                  Companion
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-md">
              Road Dog Companion connects licensed truck drivers with vetted
              companions for long-haul routes across the United States. Making the open
              road a little less lonely.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-yellow-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/apply" className="hover:text-yellow-400 transition-colors">
                  Apply as Rider
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-400 transition-colors">
                  For Drivers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>support@road-dog.com</li>
              <li>1-800-ROAD-DOG</li>
              <li>Mon-Fri: 8AM-6PM EST</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Road Dog Companion. All rights reserved.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
