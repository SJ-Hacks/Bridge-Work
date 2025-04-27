import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

export const fetchVolunteers = createAsyncThunk(
  "volunteer/fetchVolunteers",
  async () => {
    const response = await API.get("/api/volunteer");
    return response.data;
  }
);

export const applyForVolunteer = createAsyncThunk(
  "volunteer/applyForVolunteer",
  async ({ jobId, userId }, { rejectWithValue }) => {
    try {
      const payload = {
        job_id: jobId,
        applicant: userId || "664111111111111111111111",
        poster: "664111111111111111111111",
      };
      const response = await API.post("/application", payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const volunteerSlice = createSlice({
  name: "volunteer",
  initialState: {
    volunteers: [],
    status: "idle",
    error: null,
    applyStatus: "idle",
    applyError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVolunteers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.volunteers = action.payload;
      })
      .addCase(fetchVolunteers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(applyForVolunteer.pending, (state) => {
        state.applyStatus = "loading";
      })
      .addCase(applyForVolunteer.fulfilled, (state) => {
        state.applyStatus = "succeeded";
      })
      .addCase(applyForVolunteer.rejected, (state, action) => {
        state.applyStatus = "failed";
        state.applyError = action.payload;
      });
  },
});

export default volunteerSlice.reducer;
