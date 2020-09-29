import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ArticleItem from '../../components/article/ArticleItem';
import { getArticle } from '../../modules/articles';
import history from '../../history';

function ArticleDetail({ match }) {
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.article);
  useEffect(() => {
    const { id } = match.params;
    dispatch(getArticle(id));
  }, [dispatch, match.params]);

  const goBack = () => {
    history.push('/articles');
  };

  return (
    <div>
      <button id="back-detail-article-button" onClick={goBack}>
        ← back to list
      </button>
      {article && <ArticleItem article={article} />}
    </div>
  );
}

export default withRouter(ArticleDetail);
