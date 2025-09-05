import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { InventoryItem } from '@/types/pharmacy';

export const fetchInventory = createAsyncThunk(/* ... as before ... */);
export const addNewItem = createAsyncThunk('pharmacy/addNewItem', async (newItem: Omit<InventoryItem, 'id'>) => {
  const response = await fetch('/api/pharmacy', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newItem) });
  return response.json();
});
export const updateItem = createAsyncThunk('pharmacy/updateItem', async (item: InventoryItem) => {
  const response = await fetch('/api/pharmacy', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(item) });
  return response.json();
});
export const deleteItem = createAsyncThunk('pharmacy/deleteItem', async (itemId: string) => {
  await fetch(`/api/pharmacy?id=${itemId}`, { method: 'DELETE' });
  return itemId;
});

interface PharmacyState {
  inventory: InventoryItem[];
  isLoading: boolean;
  error: string | null;
  editingItem: InventoryItem | null;
}
const initialState: PharmacyState = { inventory: [], isLoading: false, error: null, editingItem: null };

export const pharmacySlice = createSlice({
  name: 'pharmacy',
  initialState,
  reducers: {
    setEditingItem: (state, action: PayloadAction<InventoryItem | null>) => {
      state.editingItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.fulfilled, (state, action) => { state.inventory = action.payload; })
      .addCase(addNewItem.fulfilled, (state, action: PayloadAction<InventoryItem>) => { state.inventory.push(action.payload); })
      .addCase(updateItem.fulfilled, (state, action: PayloadAction<InventoryItem>) => {
        const index = state.inventory.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) state.inventory[index] = action.payload;
        state.editingItem = null;
      })
      .addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.inventory = state.inventory.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setEditingItem } = pharmacySlice.actions;
export default pharmacySlice.reducer;