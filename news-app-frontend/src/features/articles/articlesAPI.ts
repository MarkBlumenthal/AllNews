// src/features/articles/articlesAPI.ts
import axios from 'axios';

export const fetchArticlesFromAPI = async () => {
  const response = await axios.get('/api/articles');
  return response.data;
};

export {};  

