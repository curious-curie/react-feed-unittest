import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleForm from '../../components/article/ArticleForm';
import history from '../../history';
import { createArticle } from '../../modules/articles';

export default function ArticleCreate() {
  const [created, setCreated] = useState(false);
  const { article } = useSelector((state) => state.article);
  const { users, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (created && article) {
      history.push(`/articles/${article.id}`);
    }
  }, [created, article]);

  const goBack = () => {
    history.push('/articles');
  };

  const handleCreate = async (newArticle) => {
    setCreated(true);
    await dispatch(createArticle(newArticle));
  };

  return (
    <div>
      <button id="back-create-article-button" onClick={goBack}>
        ← back to list
      </button>
      <ArticleForm handleCreate={handleCreate} user={user} users={users} />
    </div>
  );
}
