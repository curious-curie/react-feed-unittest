import React from 'react';
import history from '../../history';
import './articles.css';

export default function ArticleListItem({ article, users }) {
  const authorName = users.find((user) => user.id === article.author_id).name;
  const goToDetailPage = () => {
    history.push(`/articles/${article.id}`);
  };
  return (
    <div className="article-list-item">
      <div className="article-id">{article.id}</div>
      <button className="article-title__button" onClick={goToDetailPage}>
        {article.title}
      </button>
      <div className="article-author">{authorName}</div>
    </div>
  );
}
