import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticleItem from '../../components/article/ArticleItem';
import { getArticles } from '../../modules/articles';

export default function ArticleList() {
  const { articles } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  return (
    <div>
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
}
