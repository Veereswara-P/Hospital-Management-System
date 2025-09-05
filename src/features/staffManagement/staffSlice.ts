import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { StaffMember } from '@/types/staff';

export const fetchStaff = createAsyncThunk('staff/fetchStaff', async () => {
  const response = await fetch('/api/staff');
  return response.json();
});

export const addNewStaff = createAsyncThunk('staff/addNewStaff', async (newStaff: Omit<StaffMember, 'id'>) => {
  const response = await fetch('/api/staff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newStaff) });
  return response.json();
});

export const updateStaff = createAsyncThunk('staff/updateStaff', async (staffMember: StaffMember) => {
  const response = await fetch('/api/staff', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(staffMember) });
  return response.json();
});

export const deleteStaff = createAsyncThunk('staff/deleteStaff', async (staffId: string) => {
  await fetch(`/api/staff?id=${staffId}`, { method: 'DELETE' });
  return staffId;
});

interface StaffState {
  allStaff: StaffMember[];
  isLoading: boolean;
  error: string | null;
  editingStaff: StaffMember | null;
}

const initialState: StaffState = {
  allStaff: [],
  isLoading: false,
  error: null,
  editingStaff: null,
};

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setEditingStaff: (state, action: PayloadAction<StaffMember | null>) => {
      state.editingStaff = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => { state.isLoading = true; })
      .addCase(fetchStaff.fulfilled, (state, action: PayloadAction<StaffMember[]>) => { state.isLoading = false; state.allStaff = action.payload; })
      .addCase(fetchStaff.rejected, (state, action) => { state.isLoading = false; state.error = action.error.message || 'Failed'; })
      .addCase(addNewStaff.fulfilled, (state, action: PayloadAction<StaffMember>) => { state.allStaff.push(action.payload); })
      .addCase(updateStaff.fulfilled, (state, action: PayloadAction<StaffMember>) => {
        const index = state.allStaff.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.allStaff[index] = action.payload;
        state.editingStaff = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action: PayloadAction<string>) => {
        state.allStaff = state.allStaff.filter((s) => s.id !== action.payload);
      });
  },
});

export const { setEditingStaff } = staffSlice.actions;
export default staffSlice.reducer;