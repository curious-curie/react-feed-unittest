import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../../modules/comments';
import './comments.css';

export default function CommentItem({ comment }) {
  const { users, user } = useSelector((state) => state.auth);
  const authorName = users.find((user) => user.id === comment.author_id).name;
  const isAuthor = user.id === comment.author_id;
  const dispatch = useDispatch();

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment.id));
  };

  const handleEditComment = () => {
    const newInput = prompt('Enter edited comment');
    if (!newInput.length) return;
    const newComment = {
      ...comment,
      content: newInput,
    };
    dispatch(editComment(newComment));
  };

  return (
    <div className="comment-item__wrapper">
      <div className="comment-contents">
        <div className="author">{authorName}</div>
        <div>{comment.content}</div>
      </div>
      {isAuthor && (
        <div className="comment-buttons">
          <button id="edit-comment-button" className="comment-button" onClick={handleEditComment}>
            Edit
          </button>
          <button id="delete-comment-button" className="comment-button" onClick={handleDeleteComment}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
