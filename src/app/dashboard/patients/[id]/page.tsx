'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { useParams } from 'next/navigation';
import { Paper, Typography, Box, List, ListItem, ListItemText, Divider, Chip, CircularProgress } from '@mui/material';
import { fetchNotes } from '@/features/notes/notesSlice';
import { fetchPatients } from '@/features/patientManagement/patientSlice';

export default function PatientDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  
  // Use optional chaining (?.) to safely access 'id'.
  // If 'params' is null, patientId will be undefined.
  const patientId = params?.id as string; 

  const { allPatients } = useSelector((state: RootState) => state.patients);
  const { allNotes } = useSelector((state: RootState) => state.notes);
  
  // Find the specific patient from the list
  const patient = allPatients.find(p => p.id === patientId);
  
  // Get all clinical notes and filter for this patient
  const notes = allNotes.filter(n => n.patientId === patientId);

  useEffect(() => {
    // Ensure both patients and notes are fetched
    if (allPatients.length === 0) {
      dispatch(fetchPatients());
    }
    if (allNotes.length === 0) {
      dispatch(fetchNotes());
    }
  }, [dispatch, allPatients.length, allNotes.length]);

  // Show a loading spinner if we don't have the patient data yet
  if (!patient) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h4" gutterBottom>{patient.firstName} {patient.lastName}</Typography>
        <List>
          <ListItem><ListItemText primary="Patient ID" secondary={patient.id} /></ListItem>
          <Divider />
          <ListItem><ListItemText primary="Date of Birth" secondary={new Date(patient.dateOfBirth).toLocaleDateString()} /></ListItem>
          <Divider />
          <ListItem><ListItemText primary="Gender" secondary={patient.gender} /></ListItem>
          <Divider />
          <ListItem><ListItemText primary="Contact" secondary={patient.contactNumber} /></ListItem>
        </List>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h5" gutterBottom>Clinical Notes & Alerts</Typography>
        <List>
          {notes.length > 0 ? notes.map(note => (
            <React.Fragment key={note.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Chip 
                      label={note.type} 
                      color={note.type === 'Alert' ? 'error' : 'info'} 
                      size="small" 
                      sx={{ mb: 1 }}
                    />
                  }
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {note.note}
                      </Typography>
                      <br />
                      {`— ${note.author} on ${new Date(note.timestamp).toLocaleString()}`}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          )) : (
            <Typography sx={{ p: 2, color: 'text.secondary' }}>No notes for this patient.</Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
}