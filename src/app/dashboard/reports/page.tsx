'use client';

import { Paper, Typography, Grid } from '@mui/material';
import AppointmentsByMonthChart from '@/features/reporting/AppointmentsByMonthChart';
import PatientGenderPieChart from '@/features/reporting/PatientGenderPieChart'; // 1. Import the new chart

export default function ReportsPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Reporting & Analytics
      </Typography>
      <Grid container spacing={3}>
        {/* Appointments Bar Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 340 }}>
            <AppointmentsByMonthChart />
          </Paper>
        </Grid>
        {/* 2. Add the new Patient Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 340 }}>
            <PatientGenderPieChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}