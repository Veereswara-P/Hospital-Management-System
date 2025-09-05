'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { LabTest } from '@/types/lab';
import { fetchLabTests, deleteTest, setEditingTest } from './labSlice';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, CircularProgress, Chip, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LabTestList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allTests, isLoading } = useSelector((state: RootState) => state.lab);
  const { allPatients } = useSelector((state: RootState) => state.patients);

  useEffect(() => {
    dispatch(fetchLabTests());
  }, [dispatch]);

  const getPatientName = (patientId: string) => {
    const patient = allPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };

  const getStatusColor = (status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled') => {
    if (status === 'Completed') return 'success';
    if (status === 'In Progress') return 'info';
    if (status === 'Pending') return 'warning';
    return 'error';
  };

  const handleDelete = (testId: string) => {
    if (window.confirm('Are you sure you want to delete this test record?')) {
      dispatch(deleteTest(testId));
    }
  };

  const handleEdit = (test: LabTest) => {
    dispatch(setEditingTest(test));
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Laboratory Tests
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Test Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.id}</TableCell>
                <TableCell>{getPatientName(test.patientId)}</TableCell>
                <TableCell>{test.testType}</TableCell>
                <TableCell>{new Date(test.testDate).toLocaleString()}</TableCell>
                <TableCell>
                  <Chip label={test.status} color={getStatusColor(test.status)} size="small" />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(test)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(test.id)} color="error">
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

export default LabTestList;