// src/features/gigs/gigsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api';

export const fetchGigs = createAsyncThunk('gigs/fetchGigs', async (_, thunkAPI) => {
  try {
    const response = await API.get('/api/gig');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

const gigsSlice = createSlice({
  name: 'gigs',
  initialState: {
    gigs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGigs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGigs.fulfilled, (state, action) => {
        state.loading = false;
        state.gigs = action.payload;
      })
      .addCase(fetchGigs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default gigsSlice.reducer;
