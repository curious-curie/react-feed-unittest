import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ArticleListItem from '../../components/article/ArticleListItem';
import history from '../../history';
import { getArticles } from '../../modules/articles';
import { getComments } from '../../modules/comments';

export default function ArticleList() {
  const { articles } = useSelector((state) => state.article);
  const { users, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
    dispatch(getComments());
  }, [dispatch]);

  const goToCreatePage = () => {
    history.push('/articles/create');
  };

  return (
    <div>
      <button
        id="create-article-button"
        onClick={goToCreatePage}
        style={{ display: 'flex', fontWeight: 'bold', flexDirection: 'row-reverse', width: '100%' }}>
        New Article
      </button>
      {articles.map((article) => (
        <ArticleListItem users={users} key={article.id} article={article} />
      ))}
    </div>
  );
}
