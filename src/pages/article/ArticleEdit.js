import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticleForm from '../../components/article/ArticleForm';
import history from '../../history';
import { editArticle } from '../../modules/articles';

export default function ArticleEdit() {
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.article);
  const handleEdit = async (newArticle) => {
    await dispatch(editArticle(newArticle));
    history.push(`/articles/${newArticle.id}`);
  };

  return (
    <div>
      <ArticleForm handleCreate={handleEdit} isEdit={true} article={article} />
    </div>
  );
}
