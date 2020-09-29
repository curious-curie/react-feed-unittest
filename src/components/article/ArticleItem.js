import React from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import './articles.css';

export default function ArticleItem({ article }) {
  const { users } = useSelector((state) => state.auth);
  const authorName = users.find((user) => user.id === article.author_id).name;
  const goToDetailPage = () => {
    history.push(`/articles/${article.id}`);
  };
  return (
    <div className="article-list-item">
      <div className="article-header">
        <div className="article-id">{article.id}</div>
        <div id="article-title" className="article-title" onClick={goToDetailPage}>
          {article.title}
        </div>
        <div id="article-author" className="article-author">
          by {authorName}
        </div>
      </div>
      <div id="article-content" className="article-content">
        {article.content}
      </div>
    </div>
  );
}
