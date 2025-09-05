'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { StaffMember } from '@/types/staff';
import { fetchStaff, deleteStaff, setEditingStaff } from './staffSlice';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, CircularProgress, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StaffList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allStaff, isLoading } = useSelector((state: RootState) => state.staff);

  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const handleDelete = (staffId: string) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      dispatch(deleteStaff(staffId));
    }
  };

  const handleEdit = (staffMember: StaffMember) => {
    dispatch(setEditingStaff(staffMember));
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Staff List
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allStaff.map((staffMember) => (
              <TableRow key={staffMember.id}>
                <TableCell>{staffMember.id}</TableCell>
                <TableCell>{staffMember.firstName}</TableCell>
                <TableCell>{staffMember.lastName}</TableCell>
                <TableCell>{staffMember.role}</TableCell>
                <TableCell>{staffMember.department}</TableCell>
                <TableCell>{staffMember.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(staffMember)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(staffMember.id)} color="error">
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

export default StaffList;