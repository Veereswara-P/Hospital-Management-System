'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addNewStaff, updateStaff, setEditingStaff } from './staffSlice';
import { StaffMember } from '@/types/staff';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Typography, Grid } from '@mui/material';

const StaffForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editingStaff } = useSelector((state: RootState) => state.staff);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<StaffMember['role']>('Doctor');
  const [department, setDepartment] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  
  useEffect(() => {
    if (editingStaff) {
      setFirstName(editingStaff.firstName);
      setLastName(editingStaff.lastName);
      setRole(editingStaff.role);
      setDepartment(editingStaff.department);
      setContactNumber(editingStaff.contactNumber);
    } else {
      clearForm();
    }
  }, [editingStaff]);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setRole('Doctor');
    setDepartment('');
    setContactNumber('');
  };

  const handleCancelEdit = () => {
    dispatch(setEditingStaff(null));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !department || !contactNumber) {
      alert('Please fill all fields');
      return;
    }
    const staffData = { firstName, lastName, role, department, contactNumber, status: 'Active' as const };
    
    if (editingStaff) {
      dispatch(updateStaff({ ...staffData, id: editingStaff.id, status: editingStaff.status }));
    } else {
      dispatch(addNewStaff(staffData));
    }
    clearForm();
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>{editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select value={role} label="Role" onChange={(e) => setRole(e.target.value as StaffMember['role'])}>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Nurse">Nurse</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Technician">Technician</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Department" value={department} onChange={(e) => setDepartment(e.target.value)} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} fullWidth required />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>
            {editingStaff ? 'Update Staff' : 'Add Staff'}
          </Button>
          {editingStaff && <Button variant="outlined" onClick={handleCancelEdit}>Cancel</Button>}
        </Box>
      </Box>
    </Paper>
  );
};

export default StaffForm;