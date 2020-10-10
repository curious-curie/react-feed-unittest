import React, { useEffect, useState } from 'react';
import history from '../../history';
import './articles.css';
import CommentSection from './comments/CommentSection';

export default function ArticleItem({ article, onDelete, users, user, comments }) {
  const [articleComments, setArticleComments] = useState([]);

  useEffect(() => {
    setArticleComments(comments.filter((comment) => comment.article_id === article.id));
  }, [comments, article.id]);

  const authorName = users.find((user) => user.id === article.author_id).name;
  const goToDetailPage = () => {
    history.push(`/articles/${article.id}`);
  };

  const goToEditPage = () => {
    history.push(`/articles/${article.id}/edit`);
  };

  return (
    <div className="article-list-item">
      <div className="article-header">
        <div className="article-id">{article.id}</div>
        <div id="article-title" className="article-title" onClick={goToDetailPage}>
          {article.title}
        </div>
        <div id="article-author" className="article-author">
          {authorName}
        </div>
        {user.id === article.author_id && (
          <div className="article-buttons__wrapper">
            <button id="delete-article-button" className="article-button" onClick={onDelete}>
              Delete
            </button>
            <button id="edit-article-button" className="article-button" onClick={goToEditPage}>
              Edit
            </button>
          </div>
        )}
      </div>
      <div id="article-content" className="article-content">
        {article.content}
      </div>
      <CommentSection comments={articleComments} articleId={article.id} />
    </div>
  );
}
