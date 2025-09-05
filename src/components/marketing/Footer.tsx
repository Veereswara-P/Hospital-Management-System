'use client'

import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Sri Lalitha Hospital</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Providing quality healthcare with European standards to the community of Narsipatnam.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon
                return (
                  <a key={social.label} href={social.href} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600">
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/dashboard/patients" className="text-gray-300 hover:text-primary-400">Patient Management</a></li>
              <li><a href="/dashboard/appointments" className="text-gray-300 hover:text-primary-400">Appointments</a></li>
              <li><a href="/dashboard/staff" className="text-gray-300 hover:text-primary-400">Staff Portal</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li><span className="text-gray-300">General Surgery</span></li>
              <li><span className="text-gray-300">Orthopedics</span></li>
              <li><span className="text-gray-300">Skin & Cosmetology</span></li>
              <li><span className="text-gray-300">Gynaecology</span></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
             <h4 className="text-lg font-bold mb-6">Contact Us</h4>
             <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1" />
                <p className="text-sm">5 ROADS JUNCTION, NARSIPATNAM</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <p className="text-sm">08932-235210</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <p className="text-sm">info@srilalithahospital.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 text-center text-gray-400 text-sm">
          <p>Copyrights © 2025 All Rights Reserved by Sri Lalitha Multi Speciality Hospital</p>
        </div>
      </div>
    </footer>
  )
}