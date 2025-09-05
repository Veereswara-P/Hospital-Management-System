'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { addNewItem, updateItem, setEditingItem } from './pharmacySlice';
import { InventoryItem } from '@/types/pharmacy';
import { Box, Button, TextField, Paper, Typography, Grid } from '@mui/material';

const InventoryForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { editingItem } = useSelector((state: RootState) => state.pharmacy);
  const [name, setName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [supplier, setSupplier] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setBatchNumber(editingItem.batchNumber);
      setQuantity(editingItem.quantity);
      setSupplier(editingItem.supplier);
      setExpiryDate(editingItem.expiryDate);
    } else {
      clearForm();
    }
  }, [editingItem]);

  const clearForm = () => {
    setName('');
    setBatchNumber('');
    setQuantity(0);
    setSupplier('');
    setExpiryDate('');
  };

  const handleCancelEdit = () => {
    dispatch(setEditingItem(null));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !batchNumber || !supplier || !expiryDate) {
        alert('Please fill all required fields.');
        return;
    }

    const itemData = { name, batchNumber, quantity, supplier, expiryDate };
    
    if (editingItem) {
      dispatch(updateItem({ ...itemData, id: editingItem.id }));
    } else {
      dispatch(addNewItem(itemData));
    }
    clearForm();
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>{editingItem ? 'Edit Inventory Item' : 'Add New Inventory Item'}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}><TextField label="Item Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required /></Grid>
          <Grid xs={12} sm={6}><TextField label="Batch Number" value={batchNumber} onChange={(e) => setBatchNumber(e.target.value)} fullWidth required /></Grid>
          <Grid xs={12} sm={6}><TextField label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value, 10))} fullWidth required /></Grid>
          <Grid xs={12} sm={6}><TextField label="Supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} fullWidth required /></Grid>
          <Grid xs={12} sm={6}><TextField label="Expiry Date" type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} fullWidth required InputLabelProps={{ shrink: true }} /></Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>{editingItem ? 'Update Item' : 'Add Item'}</Button>
          {editingItem && <Button variant="outlined" onClick={handleCancelEdit}>Cancel</Button>}
        </Box>
      </Box>
    </Paper>
  );
};

export default InventoryForm;