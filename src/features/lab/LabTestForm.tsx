'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addNewTest, updateTest, setEditingTest } from './labSlice';
import { LabTest } from '@/types/lab';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Paper, Typography, Grid } from '@mui/material';

const LabTestForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editingTest } = useSelector((state: RootState) => state.lab);
  const { allPatients } = useSelector((state: RootState) => state.patients);

  const [patientId, setPatientId] = useState('');
  const [testType, setTestType] = useState('');
  const [status, setStatus] = useState<LabTest['status']>('Pending');
  const [result, setResult] = useState('');
  
  useEffect(() => {
    if (editingTest) {
      setPatientId(editingTest.patientId);
      setTestType(editingTest.testType);
      setStatus(editingTest.status);
      setResult(editingTest.result || '');
    } else {
      clearForm();
    }
  }, [editingTest]);

  const clearForm = () => { /* ... clear all useState setters ... */ };
  const handleCancelEdit = () => { dispatch(setEditingTest(null)); };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const testData = { 
      patientId, 
      testType, 
      status, 
      result, 
      orderedBy: 'Dr. Arjun Gupta', // Placeholder
      sampleId: `SMPL-${Date.now()}`, // Placeholder
      testDate: new Date().toISOString() // Placeholder
    };
    
    if (editingTest) {
      dispatch(updateTest({ ...editingTest, ...testData }));
    } else {
      dispatch(addNewTest(testData));
    }
    clearForm();
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>{editingTest ? 'Edit Lab Test' : 'Order New Lab Test'}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth><InputLabel>Patient</InputLabel><Select value={patientId} label="Patient" onChange={(e) => setPatientId(e.target.value)}>{allPatients.map(p => <MenuItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</MenuItem>)}</Select></FormControl>
            </Grid>
            <Grid item xs={12} sm={6}><TextField label="Test Type" value={testType} onChange={(e) => setTestType(e.target.value)} fullWidth required /></Grid>
            <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Status</InputLabel><Select value={status} label="Status" onChange={(e) => setStatus(e.target.value as LabTest['status'])}><MenuItem value="Pending">Pending</MenuItem><MenuItem value="In Progress">In Progress</MenuItem><MenuItem value="Completed">Completed</MenuItem><MenuItem value="Cancelled">Cancelled</MenuItem></Select></FormControl></Grid>
            <Grid item xs={12}><TextField label="Result (Optional)" value={result} onChange={(e) => setResult(e.target.value)} fullWidth multiline rows={3} /></Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>{editingTest ? 'Update Test' : 'Order Test'}</Button>
          {editingTest && <Button variant="outlined" onClick={handleCancelEdit}>Cancel</Button>}
        </Box>
      </Box>
    </Paper>
  );
};

export default LabTestForm;