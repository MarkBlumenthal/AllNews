// src/features/comments/commentsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

interface Comment {
  id: number;
  user_id: string;
  article_id: number;
  comment: string;
  created_at: string;
  username: string; // Add the username property
}

interface CommentsState {
  commentsByArticleId: { [key: number]: Comment[] };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  commentsByArticleId: {},
  status: 'idle',
  error: null,
};

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL;

export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleId: number) => {
  const response = await axios.get(`${API_URL}/api/comments/${articleId}`);
  return { articleId, comments: response.data };
});

export const addComment = createAsyncThunk('comments/addComment', async ({ articleId, comment }: { articleId: number; comment: string }, { getState }) => {
  const token = (getState() as RootState).auth.token;
  const response = await axios.post(
    `${API_URL}/api/comments`,
    { articleId, comment },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<{ articleId: number, comments: Comment[] }>) => {
        state.status = 'succeeded';
        state.commentsByArticleId[action.payload.articleId] = action.payload.comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<Comment>) => {
        const { article_id } = action.payload;
        if (!state.commentsByArticleId[article_id]) {
          state.commentsByArticleId[article_id] = [];
        }
        state.commentsByArticleId[article_id].push(action.payload);
      });
  },
});

export default commentsSlice.reducer;
