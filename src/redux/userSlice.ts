import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from '../axios';

interface RegisterUserData {
  fullName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

export const fetchRegisterUser = createAsyncThunk(
  'users/fetchRegisterUser',
  async (data: RegisterUserData) => {
    const res = await axios.post('user/register', data);
    return res.data;
  },
);

export const fetchLoginUser = createAsyncThunk(
  'users/fetchLoginUser',
  async (data: LoginUserData) => {
    const res = await axios.post('user/login', data);
    return res.data;
  },
);

export const fetchAuthMe = createAsyncThunk('users/fetchAuth', async () => {
  const res = await axios.get('user/auth');
  return res.data;
});

interface UserState {
  currentUser: string[] | null;
  isLoading: boolean;
}

const initialState: UserState = {
  currentUser: null,
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(fetchRegisterUser.pending, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    builder.addCase(fetchRegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(fetchRegisterUser.rejected, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    // login
    builder.addCase(fetchLoginUser.pending, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(fetchLoginUser.rejected, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    // auth get always user
    builder.addCase(fetchAuthMe.pending, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state) => {
      state.isLoading = true;
      state.currentUser = null;
    });
  },
});

export const { logout } = userSlice.actions;

// export const isAuthenticated = (state: { user: UserState }) =>
//   state.user.currentUser !== null && state.user.currentUser.length > 0;
export const isAuthenticated = (state: { user: UserState }) => Boolean(state.user.currentUser);

export default userSlice.reducer;
