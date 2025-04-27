import { configureStore } from '@reduxjs/toolkit';
import fulltimeReducer from './fullTimeSlice';
import gigReducer from './gigsSlice';
import volunteerReducer from './volunteerSlice';
import applicationReducer from './applicationSlice';

const store = configureStore({
  reducer: {
    fulltime: fulltimeReducer,
    gigs: gigReducer,
    volunteer: volunteerReducer,
    application: applicationReducer,
  },
});

export default store;
