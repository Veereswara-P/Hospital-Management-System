'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Card, Typography, Grid, Avatar } from '@mui/material';
import Link from 'next/link';

const OurDoctors = () => {
  const { allStaff } = useSelector((state: RootState) => state.staff);
  const doctors = allStaff.filter(s => s.role === 'Doctor').slice(0, 4); // Show first 3 doctors

  return (
    <div className="py-16 lg:py-24 bg-gray-50"> {/* Spacer at top & bottom */}
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Our Doctors
          </h2>
          <p className="text-xl text-gray-600">
            Experienced specialists dedicated to your health.
          </p>
        </div>

        {/* Doctors Grid */}
        <Grid container spacing={4} justifyContent="center">
          {doctors.map((doctor) => (
            <Grid
              key={doctor.id}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                className="text-center p-8 h-full transition-transform transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl bg-white"
                sx={{ maxWidth: 320, width: "100%" }}
              >
                <Avatar
                  sx={{
                    width: 90,
                    height: 90,
                    margin: "0 auto 1rem",
                    bgcolor: "primary.main",
                    fontSize: "1.5rem",
                  }}
                >
                  {doctor.firstName.charAt(0)}
                  {doctor.lastName.charAt(0)}
                </Avatar>
                <Typography variant="h6" component="h3" className="font-bold">
                  {doctor.firstName} {doctor.lastName}
                </Typography>
                <Typography color="primary" gutterBottom>
                  {doctor.department}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Button */}
        <div className="text-center mt-12">
          <Link href="/dashboard/staff" passHref>
            <button className="bg-blue-400 text-black px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              View All Staff
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurDoctors;
