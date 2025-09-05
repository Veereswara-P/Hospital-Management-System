import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ClinicalNote } from '@/types/notes';

export const fetchNotes = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await fetch('/api/notes');
  return response.json();
});

interface NotesState {
  allNotes: ClinicalNote[];
}
const initialState: NotesState = { allNotes: [] };

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.fulfilled, (state, action: PayloadAction<ClinicalNote[]>) => {
      state.allNotes = action.payload;
    });
  },
});

export default notesSlice.reducer;