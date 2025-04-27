import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// Fetch all full-time jobs
export const fetchFullTimeJobs = createAsyncThunk(
  "fulltime/fetchFullTimeJobs",
  async () => {
    const response = await API.get("/api/job");
    return response.data;
  }
);

// Apply for a full-time job
export const applyForFullTime = createAsyncThunk(
  "fulltime/applyForFullTime",
  async ({ jobId }) => {
    const mockUserId = "680d9b50de670faf3e8cf6a7"; // Temporary placeholder until auth is implemented

    const response = await API.post("/api/application", {
      job_id: jobId,
      applicant: mockUserId,
      poster: mockUserId,
    });

    return response.data;
  }
);

const fullTimeSlice = createSlice({
  name: "fulltime",
  initialState: {
    fullTimeJobs: [],
    status: "idle",
    error: null,
    applyStatus: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFullTimeJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFullTimeJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.fullTimeJobs = action.payload;
      })
      .addCase(fetchFullTimeJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(applyForFullTime.pending, (state) => {
        state.applyStatus = "loading";
      })
      .addCase(applyForFullTime.fulfilled, (state) => {
        state.applyStatus = "succeeded";
      })
      .addCase(applyForFullTime.rejected, (state) => {
        state.applyStatus = "failed";
      });
  },
});

export default fullTimeSlice.reducer;
