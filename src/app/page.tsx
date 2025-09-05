'use client'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchStaff } from '@/features/staffManagement/staffSlice';
import Header from '@/components/marketing/Header'
import Hero from '@/components/marketing/Hero'
import OurDoctors from '@/components/marketing/OurDoctors'
import CtaSection from '@/components/marketing/CtaSection'
import Footer from '@/components/marketing/Footer'
import AppointmentModal from '@/components/marketing/AppointmentModal'
import SecondOpinionModal from '@/components/marketing/SecondOpinionModal'
import CentersOfExcellence from '@/components/marketing/CentersOfExcellence';
import ImageCarousel from '@/components/marketing/ImageCarousel';
import DoctorSlider from '@/components/marketing/DoctorSlider';

export default function HomePage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [isSecondOpinionModalOpen, setIsSecondOpinionModalOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const carouselImages = [
    '/images/Hospital building.webp',
    '/images/staff.webp',
    '/images/consulting.webp',
    '/images/arogya sri schme.webp',
    '/images/ddr.a sruthi.webp',
    '/images/doctors.webp',
    '/images/IMG_2971.webp',
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header 
        onBookAppointment={() => setIsAppointmentModalOpen(true)}
        // REMOVE THE LINE BELOW
        // onSecondOpinion={() => setIsSecondOpinionModalOpen(true)}
      />
      
      <Hero 
        onBookAppointment={() => setIsAppointmentModalOpen(true)}
      />

      

      <CentersOfExcellence />

      <OurDoctors />
      <DoctorSlider />

      <ImageCarousel 
        images={carouselImages} 
        sectionTitle="A Glimpse of Our Hospital"
      />

      <CtaSection onBookAppointment={() => setIsAppointmentModalOpen(true)} />

      <Footer />
      <AppointmentModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
      <SecondOpinionModal 
        isOpen={isSecondOpinionModalOpen}
        onClose={() => setIsSecondOpinionModalOpen(false)}
      />
    </main>
  )
}