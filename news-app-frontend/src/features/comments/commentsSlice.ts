// src/features/comments/commentsSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { RootState } from '../../app/store';  // Import RootState type

// interface Comment {
//   id: number;
//   user_id: number;
//   article_id: number;
//   comment: string;
//   created_at: string;
// }

// interface CommentsState {
//   comments: Comment[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: CommentsState = {
//   comments: [],
//   status: 'idle',
//   error: null,
// };

// export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleId: number) => {
//   const response = await axios.get(`/api/comments/${articleId}`);
//   return response.data;
// });

// export const addComment = createAsyncThunk('comments/addComment', async ({ articleId, comment }: { articleId: number; comment: string }, { getState }) => {
//   const token = (getState() as RootState).auth.token;
//   const response = await axios.post(
//     '/api/comments',
//     { articleId, comment },
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return response.data;
// });

// const commentsSlice = createSlice({
//   name: 'comments',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchComments.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchComments.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.comments = action.payload;
//       })
//       .addCase(fetchComments.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to fetch comments';
//       })
//       .addCase(addComment.fulfilled, (state, action) => {
//         state.comments.push(action.payload);
//       });
//   },
// });

// export default commentsSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

interface Comment {
  id: number;
  user_id: number;
  article_id: number;
  comment: string;
  created_at: string;
}

interface CommentsState {
  comments: Comment[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  status: 'idle',
  error: null,
};

export const fetchComments = createAsyncThunk('comments/fetchComments', async (articleId: number) => {
  const response = await axios.get(`http://localhost:5000/api/comments/${articleId}`);
  return response.data;
});

export const addComment = createAsyncThunk('comments/addComment', async ({ articleId, comment }: { articleId: number; comment: string }, { getState }) => {
  const token = (getState() as RootState).auth.token;
  const response = await axios.post(
    'http://localhost:5000/api/comments',
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
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch comments';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export default commentsSlice.reducer;


