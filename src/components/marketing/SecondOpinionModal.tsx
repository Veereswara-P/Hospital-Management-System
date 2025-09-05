'use client'

import { X } from 'lucide-react'

interface SecondOpinionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SecondOpinionModal({ isOpen, onClose }: SecondOpinionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Second Opinion</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-600">
            This feature is coming soon. Please contact us directly for a second opinion.
          </p>
           <div className="mt-6 text-right">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Close
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}