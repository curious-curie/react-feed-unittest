import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticleListItem from '../../components/article/ArticleListItem';
import { getArticles } from '../../modules/articles';

export default function ArticleList() {
  const { articles } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div>
      {articles.map((article) => (
        <ArticleListItem key={article.id} article={article} />
      ))}
    </div>
  );
}
