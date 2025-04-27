import { configureStore } from '@reduxjs/toolkit';
import fullTimeReducer from './fullTimeSlice';
import gigReducer from './gigsSlice';
import volunteerReducer from './volunteerSlice';
import applicationReducer from './applicationSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    gigs: gigReducer,
    volunteers: volunteerReducer,
    fulltimes: fullTimeReducer,
    applications: applicationReducer,
    users: userReducer,
  },
});

export default store;
