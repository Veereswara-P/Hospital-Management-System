'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addNewInvoice } from './billingSlice';
import { Invoice, InvoiceItem } from '@/types/billing';
import {
  Box, Button, TextField, Select, MenuItem, FormControl, InputLabel,
  Paper, Typography, Grid, IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const InvoiceForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { allPatients } = useSelector((state: RootState) => state.patients);

  const [patientId, setPatientId] = useState('');
  const [items, setItems] = useState<Omit<InvoiceItem, 'id' | 'total'>[]>([{ description: '', quantity: 1, unitPrice: 0 }]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    setTotalAmount(total);
  }, [items]);

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    (newItems[index] as any)[field] = field === 'description' ? value : numValue;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId || items.length === 0) {
      alert('Please select a patient and add at least one item.');
      return;
    }

    const finalItems: InvoiceItem[] = items.map((item, index) => ({
      ...item,
      id: `item-${Date.now()}-${index}`,
      total: item.quantity * item.unitPrice,
    }));

    const newInvoice: Omit<Invoice, 'id'> = {
      patientId,
      invoiceDate: new Date().toISOString(),
      items: finalItems,
      totalAmount,
      paymentStatus: 'Unpaid',
    };

    dispatch(addNewInvoice(newInvoice));
    // Reset form
    setPatientId('');
    setItems([{ description: '', quantity: 1, unitPrice: 0 }]);
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Create New Invoice</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Patient</InputLabel>
          <Select value={patientId} label="Select Patient" onChange={(e) => setPatientId(e.target.value)} required>
            {allPatients.map(p => <MenuItem key={p.id} value={p.id}>{p.firstName} {p.lastName}</MenuItem>)}
          </Select>
        </FormControl>

        {items.map((item, index) => (
          <Grid container spacing={2} key={index} sx={{ mb: 1, alignItems: 'center' }}>
            <Grid item xs={5}><TextField label="Description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} fullWidth required /></Grid>
            <Grid item xs={2}><TextField label="Quantity" type="number" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} fullWidth required /></Grid>
            <Grid item xs={3}><TextField label="Unit Price" type="number" value={item.unitPrice} onChange={(e) => handleItemChange(index, 'unitPrice', e.target.value)} fullWidth required /></Grid>
            <Grid item xs={2}><IconButton onClick={() => removeItem(index)} color="error"><DeleteIcon /></IconButton></Grid>
          </Grid>
        ))}

        <Button startIcon={<AddCircleOutlineIcon />} onClick={addItem} sx={{ mt: 1 }}>Add Item</Button>
        
        <Typography variant="h6" sx={{ mt: 2 }}>Total: ₹{totalAmount.toFixed(2)}</Typography>
        
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>Generate Invoice</Button>
      </Box>
    </Paper>
  );
};

export default InvoiceForm;