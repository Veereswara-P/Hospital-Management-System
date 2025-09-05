import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { LabTest } from '@/types/lab';

export const fetchLabTests = createAsyncThunk('lab/fetchLabTests', async () => {
  const response = await fetch('/api/lab');
  if (!response.ok) throw new Error('Failed to fetch lab tests');
  return response.json();
});

export const addNewTest = createAsyncThunk('lab/addNewTest', async (newTest: Omit<LabTest, 'id'>) => {
  const response = await fetch('/api/lab', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newTest) });
  return response.json();
});

export const updateTest = createAsyncThunk('lab/updateTest', async (test: LabTest) => {
  const response = await fetch('/api/lab', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(test) });
  return response.json();
});

export const deleteTest = createAsyncThunk('lab/deleteTest', async (testId: string) => {
  await fetch(`/api/lab?id=${testId}`, { method: 'DELETE' });
  return testId;
});

interface LabState {
  allTests: LabTest[];
  isLoading: boolean;
  error: string | null;
  editingTest: LabTest | null;
}
const initialState: LabState = { allTests: [], isLoading: false, error: null, editingTest: null };

export const labSlice = createSlice({
  name: 'lab',
  initialState,
  reducers: {
    setEditingTest: (state, action: PayloadAction<LabTest | null>) => {
      state.editingTest = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabTests.pending, (state) => { state.isLoading = true; })
      .addCase(fetchLabTests.fulfilled, (state, action: PayloadAction<LabTest[]>) => {
        state.isLoading = false;
        state.allTests = action.payload;
      })
      .addCase(addNewTest.fulfilled, (state, action: PayloadAction<LabTest>) => {
        state.allTests.push(action.payload);
      })
      .addCase(updateTest.fulfilled, (state, action: PayloadAction<LabTest>) => {
        const index = state.allTests.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.allTests[index] = action.payload;
        state.editingTest = null;
      })
      .addCase(deleteTest.fulfilled, (state, action: PayloadAction<string>) => {
        state.allTests = state.allTests.filter((t) => t.id !== action.payload);
      });
  },
});

export const { setEditingTest } = labSlice.actions;
export default labSlice.reducer;