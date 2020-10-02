import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import history from '../../history';
import ArticlePreview from './ArticlePreview';
import './articles.css';

export default function ArticleForm({ handleCreate, isEdit, article }) {
  const { user } = useSelector((state) => state.auth);
  const [isPreview, setIsPreview] = useState(false);
  const [newArticle, setNewArticle] = useState({
    author_id: null,
    title: '',
    content: '',
  });

  useEffect(() => {
    if (isEdit) {
      setNewArticle((prev) => ({ ...prev, title: article.title, content: article.content, id: article.id }));
    }
  }, [isEdit, article]);

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

  const goBackToDetail = () => {
    const isChanged = article.content !== newArticle.content || article.title !== newArticle.title;
    if (!isChanged) {
      history.push(`/articles/${article.id}`);
      return;
    }
    const message = 'Are you sure? The change will be lost.';
    if (window.confirm(message)) history.push(`/articles/${article.id}`);
    return;
  };

  return (
    <div className="article-create-wrapper">
      {isEdit && (
        <button id="back-edit-article-button" onClick={goBackToDetail}>
          ← back to detail
        </button>
      )}
      {isEdit ? <h3>Edit Article</h3> : <h3>New Article</h3>}
      <button style={{ background: isPreview ? 'none' : 'pink' }} onClick={setWrite} id="write-tab-button">
        Write Mode
      </button>
      <button style={{ background: isPreview ? 'pink' : 'none' }} onClick={setPreview} id="preview-tab-button">
        Preview Mode
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
      {isEdit ? (
        <button
          onClick={onCreate}
          disabled={!newArticle.title.length || !newArticle.content.length}
          id="confirm-edit-article-button">
          Confirm Edit
        </button>
      ) : (
        <button
          onClick={onCreate}
          disabled={!newArticle.title.length || !newArticle.content.length}
          id="confirm-create-article-button">
          Confirm
        </button>
      )}
    </div>
  );
}
