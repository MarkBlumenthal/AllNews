// src/features/articles/articlesSelector.ts
import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

const selectArticlesState = (state: RootState) => state.articles;

export const selectHomeArticles = createSelector(
  [selectArticlesState],
  (articlesState) => articlesState.homeArticles
);

export const selectPoliticsArticles = createSelector(
  [selectArticlesState],
  (articlesState) => articlesState.politicsArticles
);

export const selectAllArticles = createSelector(
  [selectArticlesState],
  (articlesState) => articlesState.articles
);


