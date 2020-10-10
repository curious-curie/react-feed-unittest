import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ArticleItem from '../../components/article/ArticleItem';
import { deleteArticle, getArticle } from '../../modules/articles';
import history from '../../history';

function ArticleDetail({ match }) {
  const dispatch = useDispatch();
  const { article } = useSelector((state) => state.article);
  const { users, user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comments);
  const { id } = match.params;

  useEffect(() => {
    dispatch(getArticle(id));
  }, [dispatch, id]);

  const goBack = () => {
    history.push('/articles');
  };

  const onDelete = async () => {
    await dispatch(deleteArticle(id));
    goBack();
  };

  return (
    <div>
      <button id="back-detail-article-button" onClick={goBack}>
        ← back to list
      </button>
      {article && <ArticleItem article={article} onDelete={onDelete} users={users} user={user} comments={comments} />}
    </div>
  );
}

export default withRouter(ArticleDetail);
