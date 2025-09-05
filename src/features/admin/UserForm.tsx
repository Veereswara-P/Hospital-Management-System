'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addNewUser, updateUser, setEditingUser } from './userSlice';
import { User } from '@/types/user';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Typography, Grid } from '@mui/material';

const UserForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editingUser } = useSelector((state: RootState) => state.users);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<User['role']>('Receptionist');
  
  useEffect(() => {
    if (editingUser) {
      setUsername(editingUser.username);
      setRole(editingUser.role);
      setPassword(''); // Clear password field on edit
    } else {
      setUsername(''); 
      setPassword(''); 
      setRole('Receptionist');
    }
  }, [editingUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || (!editingUser && !password)) {
      alert('Please fill all required fields.');
      return;
    }
    
    const userData = { username, role, status: 'Active' as const };
    
    if (editingUser) {
      // Note: We are not updating the password from this form for security reasons.
      dispatch(updateUser({ ...editingUser, ...userData }));
    } else {
      dispatch(addNewUser({ ...userData, password }));
    }
    // Clear the form
    dispatch(setEditingUser(null));
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>{editingUser ? 'Edit User' : 'Add New User'}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          {/* Note: 'item' prop has been removed from all Grid components below */}
          <Grid xs={12} sm={6}>
            <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth required />
          </Grid>
          {!editingUser && 
            <Grid xs={12} sm={6}>
              <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required />
            </Grid>
          }
          <Grid xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select value={role} label="Role" onChange={(e) => setRole(e.target.value as User['role'])}>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
                <MenuItem value="Nurse">Nurse</MenuItem>
                <MenuItem value="Receptionist">Receptionist</MenuItem>
                <MenuItem value="Lab Technician">Lab Technician</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>{editingUser ? 'Update User' : 'Add User'}</Button>
          {editingUser && <Button variant="outlined" onClick={() => dispatch(setEditingUser(null))}>Cancel</Button>}
        </Box>
      </Box>
    </Paper>
  );
};

export default UserForm;