import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/api";

// Fetch all volunteer jobs
export const fetchVolunteers = createAsyncThunk(
  "volunteers/fetchVolunteers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/volunteer");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Create a new volunteer job
export const createVolunteer = createAsyncThunk(
  "volunteers/createVolunteer",
  async (volunteerData, { rejectWithValue }) => {
    try {
      const response = await API.post("/volunteer", volunteerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const volunteerSlice = createSlice({
  name: "volunteers",
  initialState: {
    volunteers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVolunteers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVolunteers.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers = action.payload;
      })
      .addCase(fetchVolunteers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createVolunteer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVolunteer.fulfilled, (state, action) => {
        state.loading = false;
        state.volunteers.push(action.payload);
      })
      .addCase(createVolunteer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default volunteerSlice.reducer;
