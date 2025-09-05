'use client';

import React from 'react';
import Slider from 'react-slick';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Paper, Typography, Box, Avatar } from '@mui/material';

const DoctorSlider = () => {
  const { allStaff } = useSelector((state: RootState) => state.staff);
  const doctors = allStaff.filter(s => s.role === 'Doctor');

  const settings = {
    dots: true,
    infinite: doctors.length > 3, // Only loop if there are more slides than shown
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600, // For mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  // We'll map doctor names to the images you provided
  const doctorImages: { [key: string]: string } = {
    // "Suryanarayana": "/images/doctors.webp",
    // "Sruthi": "/images/ddr.a sruthi.webp",
    // "Sridevi": "/images/consulting.webp",
    // // Add more mappings here if needed
  };

  return (
    <div className="py-16 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Meet Our Doctors</h2>
          <p className="text-xl text-gray-600">Experienced specialists dedicated to your health.</p>
        </div>
        <Slider {...settings}>
          {doctors.map((doctor) => (
            <Box key={doctor.id} sx={{ px: 2 }}>
              <Paper elevation={3} sx={{ textAlign: 'center', p: 3, m: 1, height: '280px' }}>
                <Avatar
  src={doctorImages[doctor.lastName] || ''}
  alt={`${doctor.firstName} ${doctor.lastName}`}
  sx={{
    width: 100,
    height: 100,
    margin: '0 auto 1rem',
    bgcolor: !doctorImages[doctor.lastName] ? '#3179ecff' : 'transparent',
    color: !doctorImages[doctor.lastName] ? 'white' : 'inherit',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }}
>
  {/* Fallback to initials if no image is found */}
  {!doctorImages[doctor.lastName] &&
    `${doctor.firstName.charAt(0)}${doctor.lastName.charAt(0)}`}
</Avatar>

                <Typography variant="h6">{`${doctor.firstName} ${doctor.lastName}`}</Typography>
                <Typography color="primary">{doctor.department}</Typography>
              </Paper>
            </Box>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DoctorSlider;