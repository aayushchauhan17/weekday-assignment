import { configureStore } from '@reduxjs/toolkit';
import jobReducer from './slices/job.slice';

const store = configureStore({
  reducer: {
    jobs: jobReducer
  }
});

export default store;
