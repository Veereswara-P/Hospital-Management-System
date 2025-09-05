'use client'

import { useState } from 'react'
import { X, Calendar, Clock, User, Phone, MapPin, Check } from 'lucide-react'

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    appointmentType: '',
    city: '',
    specialty: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    reason: '',
  })

  const appointmentTypes = [
    { id: 'consultation', name: 'Doctor Consultation', description: 'General consultation with a specialist' },
    { id: 'followup', name: 'Follow-up Visit', description: 'Follow-up for existing treatment' },
    { id: 'checkup', name: 'Health Checkup', description: 'Comprehensive health screening' },
    { id: 'surgery', name: 'Surgery Consultation', description: 'Pre-surgery consultation' }
  ]

  const cities = ['Narsipatnam', 'Visakhapatnam', 'Anakapalli']
  const specialties = ['General Surgery', 'Orthopedics', 'Skin & Cosmetology', 'Gynaecology']
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log('Appointment booked:', formData)
    onClose()
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.appointmentType !== '';
      case 2: return formData.city !== '' && formData.specialty !== '';
      case 3: return formData.date !== '' && formData.time !== '';
      case 4: return formData.firstName !== '' && formData.phone !== '';
      default: return true;
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Book an Appointment</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="mt-6">
             {/* Progress steps can be added here */}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Step content will be rendered here based on currentStep */}
          {currentStep === 1 && (
             <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Select Appointment Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {appointmentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleInputChange('appointmentType', type.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${
                        formData.appointmentType === type.id
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">{type.name}</h4>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </button>
                  ))}
                </div>
              </div>
          )}
           {/* Add other steps similarly */}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl mt-auto">
          <div className="flex justify-between">
            <button onClick={handlePrevious} disabled={currentStep === 1} className="px-6 py-3 border rounded-lg disabled:opacity-50">
              Previous
            </button>
            
            {currentStep === 4 ? (
              <button onClick={handleSubmit} disabled={!isStepValid()} className="px-8 py-3 bg-primary-600 text-white rounded-lg disabled:opacity-50">
                Book Appointment
              </button>
            ) : (
              <button onClick={handleNext} disabled={!isStepValid()} className="px-6 py-3 bg-primary-600 text-white rounded-lg disabled:opacity-50">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}