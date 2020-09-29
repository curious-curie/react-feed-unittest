import axios from 'axios';
export const GET_ARTICLE_REQUEST = 'articles/GET_ARTICLE_REQUEST';
export const GET_ARTICLE_SUCCESS = 'articles/GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_ERROR = 'articles/GET_ARTICLE_ERROR';

export const GET_ARTICLES_REQUEST = 'articles/GET_ARTICLES_REQUEST';
export const GET_ARTICLES_SUCCESS = 'articles/GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_ERROR = 'articles/GET_ARTICLES_ERROR';

export const DELETE_ARTICLE_REQUEST = 'articles/DELETE_ARTICLE_REQUEST';
export const DELETE_ARTICLE_SUCCESS = 'articles/DELETE_ARTICLE_SUCCESS';

export const UPDATE_ARTICLE_REQUEST = 'articles/UPDATE_ARTICLE_REQUEST';
export const UPDATE_ARTICLE_SUCCESS = 'articles/UPDATE_ARTICLE_SUCCESS';

const initialState = {
  error: false,
  article: null,
  articles: [],
};

export const getArticles = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/articles');
    dispatch({ type: GET_ARTICLES_SUCCESS, articles: data });
  } catch (e) {
    dispatch({ type: GET_ARTICLES_ERROR, error: e });
  }
};

export const getArticle = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/articles/${id}`);
    dispatch({ type: GET_ARTICLE_SUCCESS, article: data });
  } catch (e) {
    dispatch({ type: GET_ARTICLE_ERROR, error: e });
  }
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.articles,
        error: false,
      };
    case GET_ARTICLES_ERROR:
      return {
        ...state,
        articles: [],
        error: action.error,
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.article,
        error: false,
      };
    case GET_ARTICLE_ERROR:
      return {
        ...state,
        article: null,
        error: action.error,
      };
    default:
      return state;
  }
}
