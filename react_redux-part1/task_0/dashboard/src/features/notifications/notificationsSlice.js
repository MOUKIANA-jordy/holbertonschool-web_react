import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
  },
  reducers: {},
});

export default notificationsSlice.reducer;
