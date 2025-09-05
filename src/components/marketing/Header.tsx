'use client'

import { useState } from 'react'
import { Phone, MessageCircle, User, Menu, X } from 'lucide-react'
import Link from 'next/link';

interface HeaderProps {
  onBookAppointment: () => void;
}

export default function Header({ onBookAppointment }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-primary-600 text-white py-2"> {/* Changed text back to white for visibility */}
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2  ">
              <Phone className="w-4 h-4 text-blue-500" /> {/* Icons will inherit the white text color */}
              <span className='text-blue-500'>08932-235210</span>
            </div>
            <a href="https://wa.me/919618551521" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span className='text-blue-500'>WhatsApp</span>
            </a>
          </div>
          <Link href="/dashboard" className="flex items-center space-x-2 hover:underline">
            <User className="w-4 h-4 text-blue-500" />
            <span className='text-blue-500'>Staff Portal</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">SL</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Sri Lalitha Hospital</h1>
              <p className="text-sm text-gray-600">Narsipatnam</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/#services" className="text-gray-700 hover:text-primary-600 transition-colors font-semibold">Services</Link>
            <button onClick={onBookAppointment} className="text-gray-700 hover:text-primary-600 transition-colors font-semibold">Book Appointment</button>
            <Link href="/dashboard/patients" className="text-gray-700 hover:text-primary-600 transition-colors font-semibold">Patient Records</Link>
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t p-4">
          <Link href="/#services" className="block py-2 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <button onClick={() => { onBookAppointment(); setIsMobileMenuOpen(false); }} className="block w-full text-left py-2 text-gray-700">Book Appointment</button>
          <Link href="/dashboard/patients" className="block py-2 text-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Patient Records</Link>
        </div>
      )}
    </header>
  )
}