import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("tiffinUser")) || null
    : null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem('tiffinUser');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
