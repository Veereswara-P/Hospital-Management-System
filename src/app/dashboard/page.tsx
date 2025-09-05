'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Box, Grid, Typography } from '@mui/material';
import SummaryCard from '@/components/SummaryCard';

// Import all the fetch actions needed for the dashboard
import { fetchPatients } from '@/features/patientManagement/patientSlice';
import { fetchAppointments } from '@/features/appointmentManagement/appointmentSlice';
import { fetchStaff } from '@/features/staffManagement/staffSlice';
import { fetchInvoices } from '@/features/billing/billingSlice';
import { fetchInventory } from '@/features/pharmacy/pharmacySlice';
import { fetchLabTests } from '@/features/lab/labSlice';

// Import icons for the cards
import PeopleIcon from '@mui/icons-material/People';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import BiotechIcon from '@mui/icons-material/Biotech';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';

export default function DashboardHomePage() {
  const dispatch = useDispatch<AppDispatch>();
  
  // Select data from all relevant slices
  const { allPatients } = useSelector((state: RootState) => state.patients);
  const { allAppointments } = useSelector((state: RootState) => state.appointments);
  const { allStaff } = useSelector((state: RootState) => state.staff);
  const { allInvoices } = useSelector((state: RootState) => state.billing);
  const { inventory } = useSelector((state: RootState) => state.pharmacy);
  const { allTests } = useSelector((state: RootState) => state.lab);

  useEffect(() => {
    // Dispatch all fetch actions when the dashboard loads
    dispatch(fetchPatients());
    dispatch(fetchAppointments());
    dispatch(fetchStaff());
    dispatch(fetchInvoices());
    dispatch(fetchInventory());
    dispatch(fetchLabTests());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Total Patients"
            value={allPatients.length}
            icon={<PeopleIcon sx={{ fontSize: 40 }} />}
            href="/dashboard/patients"
            iconColor="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Total Appointments"
            value={allAppointments.length}
            icon={<CalendarMonthIcon sx={{ fontSize: 40 }} />}
            href="/dashboard/appointments"
            iconColor="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Total Staff"
            value={allStaff.length}
            icon={<AdminPanelSettingsIcon sx={{ fontSize: 40 }} />}
            href="/dashboard/staff"
            iconColor="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Pending Invoices"
            value={allInvoices.filter(inv => inv.paymentStatus !== 'Paid').length}
            icon={<ReceiptIcon sx={{ fontSize: 40 }} />}
            href="/dashboard/billing"
            iconColor="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Inventory Items"
            value={inventory.length}
            icon={<LocalPharmacyIcon sx={{ fontSize: 40 }} />}
            href="/dashboard/pharmacy"
            iconColor="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title="Pending Lab Tests"
            value={allTests.filter(t => t.status === 'Pending').length}
            icon={<BiotechIcon sx={{ fontSize: 40 }} />}
            href="/dashboard/lab"
            iconColor="error.main"
          />
        </Grid>
      </Grid>
    </Box>
  );
}