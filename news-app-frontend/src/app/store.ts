// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../features/articles/articlesSlice';
import authReducer from '../features/auth/authSlice'; // Import the auth reducer

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer, // Add auth reducer here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
