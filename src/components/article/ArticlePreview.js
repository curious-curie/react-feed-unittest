import React from 'react';
import { useSelector } from 'react-redux';
import './articles.css';

export default function ArticlePreview({ article }) {
  const { users } = useSelector((state) => state.auth);

  const authorName = users.find((user) => user.id === article.author_id).name;

  return (
    <div className="article-list-item">
      <div className="article-header">
        <div className="article-id">{article.id}</div>
        <div id="article-title" className="article-title">
          {article.title}
        </div>
        <div id="article-author" className="article-author">
          {authorName}
        </div>
      </div>
      <div id="article-content" className="article-content">
        {article.content}
      </div>
    </div>
  );
}
