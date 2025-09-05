import { configureStore } from '@reduxjs/toolkit';

// 1. Import all your feature reducers
import patientsReducer from '@/features/patientManagement/patientSlice';
import appointmentsReducer from '@/features/appointmentManagement/appointmentSlice';
import staffReducer from '@/features/staffManagement/staffSlice';
import billingReducer from '@/features/billing/billingSlice';
import pharmacyReducer from '@/features/pharmacy/pharmacySlice';
import labReducer from '@/features/lab/labSlice';
import userReducer from '@/features/admin/userSlice';
import notesReducer from '@/features/notes/notesSlice';

// 2. Configure the store
export const store = configureStore({
  // The `reducer` object is where all the different state slices are combined
  reducer: {
    patients: patientsReducer,
    appointments: appointmentsReducer,
    staff: staffReducer,
    billing: billingReducer,
    pharmacy: pharmacyReducer,
    lab: labReducer,
    users: userReducer,
    notes: notesReducer,
  },
});

// 3. Export types for use throughout the application
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;