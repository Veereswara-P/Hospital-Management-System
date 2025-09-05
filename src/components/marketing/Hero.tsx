'use client'

import { Search, MapPin } from 'lucide-react'

interface HeroProps {
  onBookAppointment: () => void
}

export default function Hero({ onBookAppointment }: HeroProps) {
  return (
    <section className="relative bg-primary-50 py-16 lg:py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Compassionate Care,
              <span className="text-primary-600 block">Close to Home.</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sri Lalitha Multi Speciality Hospital provides world-class healthcare in Narsipatnam.
            </p>
            <button
              onClick={onBookAppointment}
              className="bg-primary-600 text-white py-3 px-8 rounded-lg hover:bg-primary-700 transition-colors text-lg font-semibold btn-hover"
            >
              Book an Appointment
            </button>
          </div>

          {/* Right Content - Image/Visual */}
          <div className="relative">
            <img 
              src="/images/Hospital building.webp" 
              alt="Sri Lalitha Multi Speciality Hospital Building" 
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}