import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/user';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch('/api/users');
  return response.json();
});

export const addNewUser = createAsyncThunk('users/addNewUser', async (newUser: Omit<User, 'id'>) => {
  const response = await fetch('/api/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser) });
  return response.json();
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {
  const response = await fetch('/api/users', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(user) });
  return response.json();
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string) => {
  await fetch(`/api/users?id=${userId}`, { method: 'DELETE' });
  return userId;
});

interface UserState {
  allUsers: User[];
  isLoading: boolean;
  error: string | null;
  editingUser: User | null;
}
const initialState: UserState = { allUsers: [], isLoading: false, error: null, editingUser: null };

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setEditingUser: (state, action: PayloadAction<User | null>) => {
      state.editingUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.isLoading = true; })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.isLoading = false;
        state.allUsers = action.payload;
      })
      .addCase(addNewUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.allUsers.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.allUsers.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) state.allUsers[index] = action.payload;
        state.editingUser = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.allUsers = state.allUsers.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setEditingUser } = userSlice.actions;
export default userSlice.reducer;