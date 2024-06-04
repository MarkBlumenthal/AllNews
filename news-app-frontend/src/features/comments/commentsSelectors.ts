// src/features/comments/commentsSelector.ts
import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

const selectCommentsState = (state: RootState) => state.comments;

export const selectCommentsByArticleId = (articleId: number) => createSelector(
  [selectCommentsState],
  (commentsState) => commentsState.commentsByArticleId[articleId] || []
);

