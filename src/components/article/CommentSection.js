import React from 'react';
import CommentItem from './CommentItem';
import './comments.css';

export default function CommentSection({ comments }) {
  return (
    <div className="comment-section">
      {comments.map((item) => (
        <CommentItem key={item.id} comment={item} />
      ))}
    </div>
  );
}
