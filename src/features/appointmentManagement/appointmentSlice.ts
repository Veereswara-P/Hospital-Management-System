import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Appointment } from '@/types/appointment';
import { RootState } from '@/store';

// ========================================================================
// ASYNC THUNKS
// ========================================================================

export const fetchAppointments = createAsyncThunk('appointments/fetchAppointments', async () => {
  const response = await fetch('/api/appointments');
  if (!response.ok) throw new Error('Failed to fetch appointments');
  return response.json();
});

export const addNewAppointment = createAsyncThunk(
  'appointments/addNewAppointment',
  async (newAppointment: Omit<Appointment, 'id' | 'status'>, thunkAPI) => {
    const appointmentData = { ...newAppointment, status: 'Scheduled' as const };
    
    // First, save the new appointment
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointmentData),
    });
    if (!response.ok) throw new Error('Failed to add new appointment');
    
    const savedAppointment: Appointment = await response.json();

    // Trigger notification
    try {
      const state = thunkAPI.getState() as RootState;
      const patient = state.patients.allPatients.find(p => p.id === savedAppointment.patientId);

      if (patient && patient.contactNumber) {
        const appointmentDate = new Date(savedAppointment.appointmentDate).toLocaleString('en-IN', {
          dateStyle: 'long',
          timeStyle: 'short',
        });
        const messageBody = `Dear ${patient.firstName}, your appointment with ${savedAppointment.doctorName} is confirmed for ${appointmentDate}. Thank you.`;
        
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: patient.contactNumber, body: messageBody }),
        });
      }
    } catch (notificationError) {
      console.error('Failed to send notification:', notificationError);
    }

    return savedAppointment;
  }
);

export const updateAppointment = createAsyncThunk('appointments/updateAppointment', async (appointment: Appointment) => {
  const response = await fetch('/api/appointments', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  });
  if (!response.ok) throw new Error('Failed to update appointment');
  return response.json();
});

export const deleteAppointment = createAsyncThunk('appointments/deleteAppointment', async (appointmentId: string) => {
  await fetch(`/api/appointments?id=${appointmentId}`, { method: 'DELETE' });
  return appointmentId;
});

// ========================================================================
// STATE AND SLICE DEFINITION
// ========================================================================

interface AppointmentState {
  allAppointments: Appointment[];
  isLoading: boolean;
  error: string | null;
  editingAppointment: Appointment | null;
}

const initialState: AppointmentState = {
  allAppointments: [],
  isLoading: false,
  error: null,
  editingAppointment: null,
};

export const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setEditingAppointment: (state, action: PayloadAction<Appointment | null>) => {
      state.editingAppointment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => { state.isLoading = true; })
      .addCase(fetchAppointments.fulfilled, (state, action: PayloadAction<Appointment[]>) => {
        state.isLoading = false;
        state.allAppointments = action.payload;
      })
      .addCase(addNewAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        state.allAppointments.push(action.payload);
      })
      .addCase(updateAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
        const index = state.allAppointments.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.allAppointments[index] = action.payload;
        state.editingAppointment = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<string>) => {
        state.allAppointments = state.allAppointments.filter((appt) => appt.id !== action.payload);
      });
  },
});

export const { setEditingAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;