// src/components/CommentSection.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchComments, addComment } from '../features/comments/commentsSlice';
import { selectCommentsByArticleId } from '../features/comments/commentsSelectors';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalStyles.css'; 
import './CommentSection.css'; 

interface CommentSectionProps {
  articleId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
  const dispatch: AppDispatch = useDispatch();
  const commentsSelector = selectCommentsByArticleId(articleId); // Create the selector
  const comments = useSelector((state: RootState) => commentsSelector(state));
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [comment, setComment] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchComments(articleId));
  }, [dispatch, articleId]);

  const handleAddComment = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    if (comment.length > 200) {
      alert('Comment must be less than 200 words.');
      return;
    }
    dispatch(addComment({ articleId, comment }));
    setComment('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="comment-section">
      <button 
        className="toggle-comments-btn" 
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide Comments' : 'Show Comments'}
      </button>
      {expanded && (
        <div>
          <div className="comment-list">
            {comments.map((c) => (
              <div key={c.id}>
                <p className="comment-username">Username: {c.username}</p>
                <p className="comment-text">{c.comment}</p>
              </div>
            ))}
          </div>
          <div className="comment-textarea">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment"
              className="form-control mb-2"
            />
            <button className="comment-btn" onClick={handleAddComment}>Comment</button>
          </div>
        </div>
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Authentication Required"
        ariaHideApp={false} // Important for screen readers
      >
        <h2>Authentication Required</h2>
        <p>You must be logged in to comment.</p>
        <button className="round-button" onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default CommentSection;


