import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '@/types/patient';

export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
  const response = await fetch('/api/patients');
  const data: Patient[] = await response.json();
  return data;
});

export const addNewPatient = createAsyncThunk('patients/addNewPatient', async (newPatient: Omit<Patient, 'id'>) => {
  const response = await fetch('/api/patients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newPatient),
  });
  const data: Patient = await response.json();
  return data;
});

export const updatePatient = createAsyncThunk('patients/updatePatient', async (patient: Patient) => {
  const response = await fetch('/api/patients', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patient),
  });
  const data: Patient = await response.json();
  return data;
});

export const deletePatient = createAsyncThunk('patients/deletePatient', async (patientId: string) => {
  await fetch(`/api/patients?id=${patientId}`, {
    method: 'DELETE',
  });
  return patientId;
});

interface PatientState {
  allPatients: Patient[];
  isLoading: boolean;
  error: string | null;
  editingPatient: Patient | null;
}

const initialState: PatientState = {
  allPatients: [],
  isLoading: false,
  error: null,
  editingPatient: null,
};

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setEditingPatient: (state, action: PayloadAction<Patient | null>) => {
      state.editingPatient = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
        state.isLoading = false;
        state.allPatients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch patients';
      })
      .addCase(addNewPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.allPatients.push(action.payload);
      })
      .addCase(updatePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        const index = state.allPatients.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) {
          state.allPatients[index] = action.payload;
        }
        state.editingPatient = null;
      })
      .addCase(deletePatient.fulfilled, (state, action: PayloadAction<string>) => {
        state.allPatients = state.allPatients.filter((patient) => patient.id !== action.payload);
      });
  },
});

export const { setEditingPatient } = patientSlice.actions;
export default patientSlice.reducer;