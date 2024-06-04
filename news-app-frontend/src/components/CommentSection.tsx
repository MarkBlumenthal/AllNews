import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchComments, addComment } from '../features/comments/commentsSlice';

interface CommentSectionProps {
  articleId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector((state: RootState) => state.comments.comments);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [comment, setComment] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchComments(articleId));
  }, [dispatch, articleId]);

  const handleAddComment = () => {
    if (!isAuthenticated) {
      alert('You must be logged in to comment.');
      return;
    }
    if (comment.length > 200) {
      alert('Comment must be less than 200 words.');
      return;
    }
    dispatch(addComment({ articleId, comment }));
    setComment('');
  };

  return (
    <div className="comment-section">
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide Comments' : 'Show Comments'}
      </button>
      {expanded && (
        <div>
          <div>
            {comments.map((c) => (
              <div key={c.id}>
                <p>{c.comment} - User ID: {c.user_id}</p>
              </div>
            ))}
          </div>
          <div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button onClick={handleAddComment}>Comment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSection;
