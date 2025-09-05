'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { Invoice } from '@/types/billing';
import { fetchInvoices, deleteInvoice, setEditingInvoice } from './billingSlice';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, CircularProgress, Chip, IconButton,
  Link as MuiLink
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InvoiceList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allInvoices, isLoading } = useSelector((state: RootState) => state.billing);
  const { allPatients } = useSelector((state: RootState) => state.patients);

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const getPatientName = (patientId: string) => {
    const patient = allPatients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
  };
  
  const getStatusColor = (status: 'Paid' | 'Partial' | 'Unpaid') => {
    if (status === 'Paid') return 'success';
    if (status === 'Partial') return 'warning';
    return 'error';
  };

  const handleDelete = (invoiceId: string) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      dispatch(deleteInvoice(invoiceId));
    }
  };

  const handleEdit = (invoice: Invoice) => {
    dispatch(setEditingInvoice(invoice));
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Invoices
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.id}</TableCell>
                <TableCell>
                  {/* Clickable patient name link */}
                  <MuiLink component={Link} href={`/patients/${invoice.patientId}`} underline="hover">
                    {getPatientName(invoice.patientId)}
                  </MuiLink>
                </TableCell>
                <TableCell>{new Date(invoice.invoiceDate).toLocaleDateString()}</TableCell>
                <TableCell>₹{invoice.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip label={invoice.paymentStatus} color={getStatusColor(invoice.paymentStatus)} size="small" />
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(invoice)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(invoice.id)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default InvoiceList;