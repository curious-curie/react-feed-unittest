import React from 'react';
import { useSelector } from 'react-redux';
import './comments.css';

export default function CommentItem({ comment }) {
  const { users, user } = useSelector((state) => state.auth);
  const authorName = users.find((user) => user.id === comment.author_id).name;
  const isAuthor = user.id === comment.author_id;
  return (
    <div className="comment-item__wrapper">
      <div className="comment-contents">
        <div className="author">{authorName}</div>
        <div>{comment.content}</div>
      </div>
      {isAuthor && (
        <div className="comment-buttons">
          <button id="edit-comment-button" className="comment-button">
            Edit
          </button>
          <button id="delete-comment-button" className="comment-button">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
