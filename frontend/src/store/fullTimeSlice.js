// src/store/jobSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api'; 

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await API.get('/job');
  return response.data;
});

export const postJob = createAsyncThunk('jobs/postJob', async (jobData) => {
  const response = await API.post('/job', jobData);
  return response.data;
});

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      });
  },
});

export default jobSlice.reducer;
