import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/api';

export const fetchApplicationsByJob = createAsyncThunk(
    'applications/fetchByJob',
    async (jobId) => {
      const response = await API.get(`/application?job_id=${jobId}`);
      return response.data;
    }
  );
  

// Fetch applications for a given jobId
export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await API.get(`/application?job_id=${jobId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Create a new application
export const createApplication = createAsyncThunk(
  'applications/createApplication',
  async ({ jobId, applicantId, posterId }, { rejectWithValue }) => {
    try {
      const response = await API.post('/application', {
        job_id: jobId,
        applicant: applicantId,
        poster: posterId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create application');
    }
  }
);

// Accept an applicant
export const acceptApplication = createAsyncThunk(
  'applications/acceptApplication',
  async (applicationId, { rejectWithValue }) => {
    try {
      await API.patch(`/application/${applicationId}/accept`);
      return applicationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to accept application');
    }
  }
);

// Reject an applicant
export const rejectApplication = createAsyncThunk(
  'applications/rejectApplication',
  async (applicationId, { rejectWithValue }) => {
    try {
      await API.patch(`/application/${applicationId}/reject`);
      return applicationId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to reject application');
    }
  }
);

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
        state.error = action.payload;
      })
      .addCase(createApplication.fulfilled, (state, action) => {
        state.applications.push(action.payload);
      })
      .addCase(acceptApplication.fulfilled, (state, action) => {
        const id = action.payload;
        state.applications = state.applications.map((app) =>
          app._id === id ? { ...app, selected: true, active: true } : app
        );
      })
      .addCase(rejectApplication.fulfilled, (state, action) => {
        const id = action.payload;
        state.applications = state.applications.map((app) =>
          app._id === id ? { ...app, active: false } : app
        );
      });
  },
});

export default applicationSlice.reducer;
