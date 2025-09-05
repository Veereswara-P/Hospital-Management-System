import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Invoice } from '@/types/billing';

// ========================================================================
// ASYNC THUNKS
// ========================================================================

export const fetchInvoices = createAsyncThunk(
  'billing/fetchInvoices',
  async () => {
    const response = await fetch('/api/billing');
    if (!response.ok) throw new Error('Failed to fetch invoices');
    return response.json();
  }
);

export const addNewInvoice = createAsyncThunk(
  'billing/addNewInvoice',
  async (newInvoice: Omit<Invoice, 'id'>) => {
    const response = await fetch('/api/billing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInvoice),
    });
    if (!response.ok) throw new Error('Failed to add new invoice');
    return response.json();
  }
);

export const updateInvoice = createAsyncThunk(
  'billing/updateInvoice',
  async (invoice: Invoice) => {
    const response = await fetch('/api/billing', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice),
    });
    if (!response.ok) throw new Error('Failed to update invoice');
    return response.json();
  }
);

export const deleteInvoice = createAsyncThunk(
  'billing/deleteInvoice',
  async (invoiceId: string) => {
    const response = await fetch(`/api/billing?id=${invoiceId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete invoice');
    return invoiceId;
  }
);

// ========================================================================
// STATE AND SLICE DEFINITION
// ========================================================================

interface BillingState {
  allInvoices: Invoice[];
  isLoading: boolean;
  error: string | null;
  editingInvoice: Invoice | null; // For the edit form
}

const initialState: BillingState = {
  allInvoices: [],
  isLoading: false,
  error: null,
  editingInvoice: null,
};

export const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    // Synchronous action to set which invoice is being edited
    setEditingInvoice: (state, action: PayloadAction<Invoice | null>) => {
      state.editingInvoice = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Cases for fetching invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<Invoice[]>) => {
        state.isLoading = false;
        state.allInvoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An unknown error occurred';
      })
      // Case for adding a new invoice
      .addCase(addNewInvoice.fulfilled, (state, action: PayloadAction<Invoice>) => {
        state.allInvoices.push(action.payload);
      })
      // Case for updating an invoice
      .addCase(updateInvoice.fulfilled, (state, action: PayloadAction<Invoice>) => {
        const index = state.allInvoices.findIndex(inv => inv.id === action.payload.id);
        if (index !== -1) {
          state.allInvoices[index] = action.payload;
        }
        state.editingInvoice = null; // Clear editing state after update
      })
      // Case for deleting an invoice
      .addCase(deleteInvoice.fulfilled, (state, action: PayloadAction<string>) => {
        state.allInvoices = state.allInvoices.filter(inv => inv.id !== action.payload);
      });
  },
});

export const { setEditingInvoice } = billingSlice.actions;
export default billingSlice.reducer;