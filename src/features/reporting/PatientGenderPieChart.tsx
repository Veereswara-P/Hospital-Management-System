'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography } from '@mui/material';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; // Blue, Green, Yellow

const PatientGenderPieChart = () => {
  const { allPatients } = useSelector((state: RootState) => state.patients);

  // Process data to count patients by gender
  const genderData = allPatients.reduce((acc, patient) => {
    const gender = patient.gender || 'Other';
    const existing = acc.find(item => item.name === gender);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: gender, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Patient Demographics
      </Typography>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={genderData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={(entry) => `${entry.name}: ${entry.value}`}
          >
            {genderData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default PatientGenderPieChart;