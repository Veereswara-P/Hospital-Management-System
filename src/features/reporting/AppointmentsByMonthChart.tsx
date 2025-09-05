'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const AppointmentsByMonthChart = () => {
  const { allAppointments } = useSelector((state: RootState) => state.appointments);

  // Process the data to group appointments by month
  const data = allAppointments.reduce((acc, appointment) => {
    const month = new Date(appointment.appointmentDate).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(item => item.name === month);
    if (existingMonth) {
      existingMonth.appointments++;
    } else {
      acc.push({ name: month, appointments: 1 });
    }
    return acc;
  }, [] as { name: string; appointments: number }[]);

  // Sort months for proper display (optional but recommended)
  const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  data.sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Monthly Appointments
      </Typography>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 16, right: 16, bottom: 0, left: -10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="appointments" fill="#8884d8" name="Appointments" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default AppointmentsByMonthChart;