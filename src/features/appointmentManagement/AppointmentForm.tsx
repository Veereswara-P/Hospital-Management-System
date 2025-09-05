'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addNewAppointment, updateAppointment, setEditingAppointment } from './appointmentSlice';
import { Appointment } from '@/types/appointment';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Typography, Grid } from '@mui/material';

const AppointmentForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editingAppointment } = useSelector((state: RootState) => state.appointments);
  const { allPatients } = useSelector((state: RootState) => state.patients);

  const [patientId, setPatientId] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (editingAppointment) {
      setPatientId(editingAppointment.patientId);
      setDoctorName(editingAppointment.doctorName);
      const formattedDate = new Date(editingAppointment.appointmentDate).toISOString().substring(0, 16);
      setAppointmentDate(formattedDate);
      setReason(editingAppointment.reason);
    } else {
      clearForm();
    }
  }, [editingAppointment]);

  const clearForm = () => {
    setPatientId('');
    setDoctorName('');
    setAppointmentDate('');
    setReason('');
  };

  const handleCancelEdit = () => {
    dispatch(setEditingAppointment(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || !doctorName || !appointmentDate || !reason) {
      alert('Please fill all fields');
      return;
    }

    if (editingAppointment) {
      const updatedData: Appointment = {
        ...editingAppointment, patientId, doctorName, appointmentDate, reason,
      };
      dispatch(updateAppointment(updatedData));
    } else {
      dispatch(addNewAppointment({ patientId, doctorName, appointmentDate, reason }));
    }
    clearForm();
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Patient</InputLabel>
              <Select
                value={patientId}
                label="Patient"
                onChange={(e) => setPatientId(e.target.value)}
              >
                {allPatients.map(p => (
                  <MenuItem key={p.id} value={p.id}>
                    {p.firstName} {p.lastName} (ID: {p.id})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Doctor's Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Appointment Date"
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Reason for Visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>
            {editingAppointment ? 'Update Appointment' : 'Schedule Appointment'}
          </Button>
          {editingAppointment && (
            <Button variant="outlined" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default AppointmentForm;