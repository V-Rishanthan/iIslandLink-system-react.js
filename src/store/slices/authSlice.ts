import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  uid: string | null;
  email: string | null;
  role: string | null;
  name: string | null;
  businessName?: string | null;
  district?: string | null;
  phone?: string | null;
  province?: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  role: null,
  name: null,
  businessName: null,
  district: null,
  phone: null,
  province: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.name = action.payload.name;
      state.businessName = action.payload.businessName || null;
      state.district = action.payload.district || null;
      state.phone = action.payload.phone || null;
      state.province = action.payload.province || null;
    },
    clearUser(state) {
      state.uid = null;
      state.email = null;
      state.role = null;
      state.name = null;
      state.businessName = null;
      state.district = null;
      state.phone = null;
      state.province = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
