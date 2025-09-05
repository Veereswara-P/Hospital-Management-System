'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addNewPatient, updatePatient, setEditingPatient } from './patientSlice';
import { Patient } from '@/types/patient';
// Add 'Grid' to this import line
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Typography, Grid } from '@mui/material';

const PatientForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editingPatient } = useSelector((state: RootState) => state.patients);

  // ... the rest of your component code is correct ...
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [gender, setGender] = useState<Patient['gender']>('Male');

  useEffect(() => {
    if (editingPatient) {
      setFirstName(editingPatient.firstName);
      setLastName(editingPatient.lastName);
      setDateOfBirth(editingPatient.dateOfBirth);
      setContactNumber(editingPatient.contactNumber);
      setGender(editingPatient.gender);
    } else {
      clearForm();
    }
  }, [editingPatient]);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setDateOfBirth('');
    setContactNumber('');
    setGender('Male');
  };

  const handleCancelEdit = () => {
    dispatch(setEditingPatient(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !dateOfBirth || !contactNumber) {
      alert('Please fill out all fields.');
      return;
    }
    
    const patientData = {
      firstName,
      lastName,
      dateOfBirth,
      contactNumber,
      gender,
      status: editingPatient ? editingPatient.status : 'Active',
    };

    if (editingPatient) {
      dispatch(updatePatient({ ...patientData, id: editingPatient.id }));
    } else {
      dispatch(addNewPatient(patientData as Omit<Patient, 'id'>));
    }
    clearForm();
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {editingPatient ? 'Edit Patient' : 'Add New Patient'}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date of Birth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Gender</InputLabel>
              <Select
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value as Patient['gender'])}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>
            {editingPatient ? 'Update Patient' : 'Add Patient'}
          </Button>
          {editingPatient && (
            <Button variant="outlined" onClick={handleCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default PatientForm;