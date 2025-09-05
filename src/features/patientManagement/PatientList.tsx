'use client';

import React, { useEffect, useState } from 'react'; // 1. Import useState
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Patient } from '@/types/patient';
import { fetchPatients, deletePatient, setEditingPatient } from './patientSlice';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  CircularProgress,
  TextField // 2. Import TextField for the search bar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageviewIcon from '@mui/icons-material/Pageview';

const PatientList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allPatients, isLoading } = useSelector((state: RootState) => state.patients);
  
  // 3. Add state for the search term
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleDelete = (patientId: string) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      dispatch(deletePatient(patientId));
    }
  };

  const handleEdit = (patient: Patient) => {
    dispatch(setEditingPatient(patient));
  };
  
  // 4. Filter patients based on the search term before rendering
  const filteredPatients = allPatients.filter(patient =>
    patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
          Patient List
        </Typography>
        {/* 5. Add the search bar */}
        <TextField
          label="Search Patients"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* 6. Map over the NEW filteredPatients array */}
            {filteredPatients.map((patient: Patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>{patient.status}</TableCell>
                <TableCell align="right">
                  <IconButton component={Link} href={`/patients/${patient.id}`} color="default" title="View Details">
                    <PageviewIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(patient)} color="primary" title="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(patient.id)} color="error" title="Delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PatientList;