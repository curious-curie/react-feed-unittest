import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createComment } from '../../../modules/comments';
import './comments.css';

export default function CommentInput({ articleId }) {
  const { user } = useSelector((state) => state.auth);
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleCreateComment = async () => {
    const newComment = {
      content,
      article_id: articleId,
      author_id: user.id,
    };
    await dispatch(createComment(newComment));
    setContent('');
  };
  return (
    <div>
      <input id="new-comment-content-input" value={content} onChange={handleChange} />
      <button id="confirm-create-comment-button" onClick={handleCreateComment} disabled={!content.length}>
        comment
      </button>
    </div>
  );
}
