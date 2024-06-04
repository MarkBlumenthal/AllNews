// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../features/articles/articlesSlice';
import commentsReducer from '../features/comments/commentsSlice';
import authReducer from '../features/auth/authSlice'; 

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer, 
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;