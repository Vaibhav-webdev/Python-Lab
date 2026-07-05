'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../../../public/logo.png'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'How it Works', href: '#how-it-works' },
  ];

  return (
    // Changed background to match your exact deep black theme
    <nav className="bg-black border-b border-neutral-800 top-0 sticky z-50" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto lg:px-4">
        <div className="flex justify-between items-center h-20 px-6 lg:px-10">

          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-white rounded-md p-1">
              <Image
                src={logoImg}
                alt="React Labs Logo"
                priority
                className="h-10 w-auto grayscale" // Added grayscale just in case the logo image has colors
              />
              {/* Clean White Logo Text */}
              <span className="text-white font-bold text-2xl tracking-wide">
                PyXode
              </span>
              <span className="bg-neutral-900 text-xs text-neutral-400 px-2 py-0.5 rounded-full border border-neutral-800 ml-1">
                v1.0
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons (Desktop) - High contrast White on Black */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/learn"
              className="bg-white hover:bg-neutral-200 transition-all duration-200 active:scale-[0.97] text-black px-5 py-2.5 rounded-md text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-white"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-neutral-800">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-400 hover:text-white hover:bg-neutral-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 flex flex-col gap-3 px-3">
              {/* Mobile "Get Started" Button - White */}
              <Link
                href="/learn"
                className="w-full text-center bg-white hover:bg-neutral-200 text-black px-4 py-2 rounded-md font-medium"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;