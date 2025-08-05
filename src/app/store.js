import { createSlice, configureStore } from '@reduxjs/toolkit';

const dummySlice = createSlice({
  name: 'dummy',
  initialState: {},
  reducers: {},
});

const store = configureStore({
  reducer: {
    dummy: dummySlice.reducer,
  },
});

export default store;
