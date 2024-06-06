// src/features/articles/articlesSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export interface Article {
//   id: number;
//   title: string;
//   description: string;
//   url: string;
//   urltoimage: string;
//   publishedAt: string;
//   source: string;
//   category: string;
// }

// interface ArticlesState {
//   homeArticles: Article[];
//   politicsArticles: Article[];
//   articles: Article[];
//   homeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
//   politicsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
// }

// const initialState: ArticlesState = {
//   homeArticles: [],
//   politicsArticles: [],
//   articles: [],
//   homeStatus: 'idle',
//   politicsStatus: 'idle',
//   status: 'idle',
//   error: null,
// };

// // Thunks for fetching articles
// export const fetchHomeArticles = createAsyncThunk('articles/fetchHomeArticles', async () => {
//   const response = await axios.get('http://localhost:5000/api/articles/latest');
//   return response.data;
// });

// export const fetchPoliticsArticles = createAsyncThunk('articles/fetchPoliticsArticles', async () => {
//   const response = await axios.get('http://localhost:5000/api/articles');
//   return response.data;
// });

// export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
//   const response = await axios.get('http://localhost:5000/api/articles');
//   return response.data;
// });

// const articlesSlice = createSlice({
//   name: 'articles',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Handle home articles
//       .addCase(fetchHomeArticles.pending, (state) => {
//         state.homeStatus = 'loading';
//       })
//       .addCase(fetchHomeArticles.fulfilled, (state, action) => {
//         state.homeStatus = 'succeeded';
//         state.homeArticles = action.payload;
//       })
//       .addCase(fetchHomeArticles.rejected, (state, action) => {
//         state.homeStatus = 'failed';
//         state.error = action.error.message || 'Failed to fetch home articles';
//       })
//       // Handle politics articles
//       .addCase(fetchPoliticsArticles.pending, (state) => {
//         state.politicsStatus = 'loading';
//       })
//       .addCase(fetchPoliticsArticles.fulfilled, (state, action) => {
//         state.politicsStatus = 'succeeded';
//         state.politicsArticles = action.payload;
//       })
//       .addCase(fetchPoliticsArticles.rejected, (state, action) => {
//         state.politicsStatus = 'failed';
//         state.error = action.error.message || 'Failed to fetch politics articles';
//       })
//       // Handle general articles
//       .addCase(fetchArticles.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchArticles.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.articles = action.payload;
//       })
//       .addCase(fetchArticles.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || 'Failed to fetch articles';
//       });
//   },
// });

// export default articlesSlice.reducer;







// src/features/articles/articlesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  urltoimage: string;
  publishedAt: string;
  source: string;
  category: string;
}

interface ArticlesState {
  homeArticles: Article[];
  politicsArticles: Article[];
  articles: Article[];
  homeStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  politicsStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ArticlesState = {
  homeArticles: [],
  politicsArticles: [],
  articles: [],
  homeStatus: 'idle',
  politicsStatus: 'idle',
  status: 'idle',
  error: null,
};

// Use environment variable for API URL
const API_URL = process.env.REACT_APP_API_URL;

// Thunks for fetching articles
export const fetchHomeArticles = createAsyncThunk('articles/fetchHomeArticles', async () => {
  const response = await axios.get(`${API_URL}/api/articles/latest`);
  return response.data;
});

export const fetchPoliticsArticles = createAsyncThunk('articles/fetchPoliticsArticles', async () => {
  const response = await axios.get(`${API_URL}/api/articles`);
  return response.data;
});

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await axios.get(`${API_URL}/api/articles`);
  return response.data;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle home articles
      .addCase(fetchHomeArticles.pending, (state) => {
        state.homeStatus = 'loading';
      })
      .addCase(fetchHomeArticles.fulfilled, (state, action) => {
        state.homeStatus = 'succeeded';
        state.homeArticles = action.payload;
      })
      .addCase(fetchHomeArticles.rejected, (state, action) => {
        state.homeStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch home articles';
      })
      // Handle politics articles
      .addCase(fetchPoliticsArticles.pending, (state) => {
        state.politicsStatus = 'loading';
      })
      .addCase(fetchPoliticsArticles.fulfilled, (state, action) => {
        state.politicsStatus = 'succeeded';
        state.politicsArticles = action.payload;
      })
      .addCase(fetchPoliticsArticles.rejected, (state, action) => {
        state.politicsStatus = 'failed';
        state.error = action.error.message || 'Failed to fetch politics articles';
      })
      // Handle general articles
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch articles';
      });
  },
});

export default articlesSlice.reducer;
