import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api';

// Fetch all applications
export const fetchApplications = createAsyncThunk('applications/fetchAll', async () => {
  const response = await API.get('/application');
  return response.data;
});

// Fetch applications by job ID
export const fetchApplicationsByJobId = createAsyncThunk('applications/fetchByJobId', async (jobId) => {
  const response = await API.get(`/application?job_id=${jobId}`);
  return response.data;
});

// Create a new application
export const createApplication = createAsyncThunk('applications/create', async (applicationData) => {
  const response = await API.post('/application', applicationData);
  return response.data;
});

// Accept an application
export const acceptApplication = createAsyncThunk('applications/accept', async (applicationId) => {
  const response = await API.patch(`/application/${applicationId}/accept`);
  return response.data;
});

// Reject an application
export const rejectApplication = createAsyncThunk('applications/reject', async (applicationId) => {
  const response = await API.patch(`/application/${applicationId}/reject`);
  return response.data;
});

const applicationSlice = createSlice({
  name: 'applications',
  initialState: {
    applications: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchApplicationsByJobId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApplicationsByJobId.fulfilled, (state, action) => {
        state.loading = false;
        state.applications = action.payload;
      })
      .addCase(fetchApplicationsByJobId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.applications.push(action.payload);
      })
      .addCase(acceptApplication.fulfilled, (state, action) => {
        const index = state.applications.findIndex(app => app._id === action.payload._id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
      })
      .addCase(rejectApplication.fulfilled, (state, action) => {
        const index = state.applications.findIndex(app => app._id === action.payload._id);
        if (index !== -1) {
          state.applications[index] = action.payload;
        }
      });
  },
});

export default applicationSlice.reducer;
