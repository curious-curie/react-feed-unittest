import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ArticlePreview from './ArticlePreview';
import './articles.css';

export default function ArticleForm({ handleCreate }) {
  const { user } = useSelector((state) => state.auth);
  const [isPreview, setIsPreview] = useState(false);
  const [newArticle, setNewArticle] = useState({
    author_id: null,
    title: '',
    content: '',
  });

  useEffect(() => {
    if (user && user.id) setNewArticle((prev) => ({ ...prev, author_id: user.id }));
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle((prev) => ({ ...prev, [name]: value }));
  };

  const setPreview = () => {
    setIsPreview(true);
  };

  const setWrite = () => {
    setIsPreview(false);
  };

  const onCreate = () => {
    handleCreate(newArticle);
  };

  return (
    <div className="article-create-wrapper">
      <h3>New Article</h3>
      <button onClick={setPreview} id="preview-tab-button">
        Preview Mode
      </button>
      <button onClick={setWrite} id="write-tab-button">
        Write Mode
      </button>

      {isPreview ? (
        <ArticlePreview article={newArticle} />
      ) : (
        <>
          <div className="input-title">Title</div>
          <input
            name="title"
            onChange={handleChange}
            value={newArticle.title}
            className="article-input"
            id="article-title-input"></input>
          <div className="input-title">Content</div>
          <textarea
            name="content"
            value={newArticle.content}
            onChange={handleChange}
            className="article-input"
            id="article-content-input"></textarea>
        </>
      )}
      <button
        onClick={onCreate}
        disabled={!newArticle.title.length || !newArticle.content.length}
        id="confirm-create-article-button">
        Confirm
      </button>
    </div>
  );
}
