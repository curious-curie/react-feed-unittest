import React from 'react';
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import './comments.css';

export default function CommentSection({ comments, articleId }) {
  return (
    <div className="comment-section">
      {comments.map((item) => (
        <CommentItem key={item.id} comment={item} />
      ))}
      <CommentInput articleId={articleId} />
    </div>
  );
}
