'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { InventoryItem } from '@/types/pharmacy';
// 1. Import the new actions and icons
import { fetchInventory, deleteItem, setEditingItem } from './pharmacySlice';
import {
  Box, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Typography, CircularProgress, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InventoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { inventory, isLoading } = useSelector((state: RootState) => state.pharmacy);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  // 2. Create handler functions for edit and delete
  const handleDelete = (itemId: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      dispatch(deleteItem(itemId));
    }
  };

  const handleEdit = (item: InventoryItem) => {
    dispatch(setEditingItem(item));
  };

  if (isLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}><CircularProgress /></Box>;
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Pharmacy Inventory
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Batch #</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Expiry Date</TableCell>
              {/* 3. Add the Actions header */}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.batchNumber}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{new Date(item.expiryDate).toLocaleDateString()}</TableCell>
                {/* 4. Add the Actions cell with buttons */}
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(item)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.id)} color="error">
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

export default InventoryList;