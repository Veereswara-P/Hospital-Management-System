'use client';
import React from 'react';
import Link from 'next/link';

interface CtaSectionProps {
    onBookAppointment: () => void;
}

const CtaSection = ({ onBookAppointment }: CtaSectionProps) => {
  return (
    <section className="py-16 lg:py-24 bg-white" id="services">
        <div className="container mx-auto px-4">
            <div className="bg-blue-500 rounded-2xl p-8 text-center text-white"> {/* Restored gradient and white text */}
                <h2 className="text-3xl font-bold mb-4">Ready to Take the Next Step?</h2>
                <p className="mb-8 max-w-2xl mx-auto">
                    Our team is ready to provide you with the best medical care. Schedule your consultation today and experience compassionate healthcare.
                </p>
                <button 
                    onClick={onBookAppointment}
                    className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors btn-hover text-lg"
                >
                    Book a Consultation
                </button>
            </div>
        </div>
    </section>
  );
};

export default CtaSection;