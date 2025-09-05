'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Appointment } from '@/types/appointment';
import { fetchAppointments, deleteAppointment, setEditingAppointment } from './appointmentSlice';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, CircularProgress, IconButton,
  Link as MuiLink
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const AppointmentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allAppointments, isLoading } = useSelector((state: RootState) => state.appointments);
  const { allPatients } = useSelector((state: RootState) => state.patients);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const getPatientName = (patientId: string) => {
    const patient = allPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const handleDelete = (appointmentId: string) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(deleteAppointment(appointmentId));
    }
  };

  const handleEdit = (appointment: Appointment) => {
    dispatch(setEditingAppointment(appointment));
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Appointment List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>
                  {/* Clickable patient name link */}
                  <MuiLink component={Link} href={`/patients/${appointment.patientId}`} underline="hover">
                    {getPatientName(appointment.patientId)}
                  </MuiLink>
                </TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{new Date(appointment.appointmentDate).toLocaleString()}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(appointment)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(appointment.id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AppointmentList;