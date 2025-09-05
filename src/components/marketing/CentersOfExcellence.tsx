'use client'

import { Heart, Bone, Brain, Shield } from 'lucide-react'

export default function CentersOfExcellence() {
  const centers = [
    { name: 'General Surgery', icon: Shield, color: 'text-red-600', bgColor: 'bg-red-50' },
    { name: 'Orthopedics', icon: Bone, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Gynaecology', icon: Heart, color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { name: 'Dermatology', icon: Brain, color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ]

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Specialties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Providing expert care across all major medical specialties.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {centers.map((center) => {
            const IconComponent = center.icon
            return (
              <div
                key={center.name}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 card-hover group cursor-pointer text-center"
              >
                <div className={`w-16 h-16 ${center.bgColor} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${center.color}`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {center.name}
                </h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}