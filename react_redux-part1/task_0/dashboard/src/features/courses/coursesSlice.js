import { createSlice } from '@reduxjs/toolkit';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
  },
  reducers: {},
});

export default coursesSlice.reducer;
