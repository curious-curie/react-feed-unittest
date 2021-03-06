import axios from 'axios';
export const GET_ARTICLE_REQUEST = 'articles/GET_ARTICLE_REQUEST';
export const GET_ARTICLE_SUCCESS = 'articles/GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_ERROR = 'articles/GET_ARTICLE_ERROR';

export const GET_ARTICLES_REQUEST = 'articles/GET_ARTICLES_REQUEST';
export const GET_ARTICLES_SUCCESS = 'articles/GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_ERROR = 'articles/GET_ARTICLES_ERROR';

export const CREATE_ARTICLE_REQUEST = 'articles/CREATE_ARTICLE_REQUEST';
export const CREATE_ARTICLE_SUCCESS = 'articles/CREATE_ARTICLE_SUCCESS';

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
  const { data } = await axios.get('/articles');
  dispatch({ type: GET_ARTICLES_SUCCESS, articles: data });
};

export const getArticle = (id) => async (dispatch) => {
  dispatch({ type: GET_ARTICLE_REQUEST });
  const { data } = await axios.get(`/articles/${id}`);
  dispatch({ type: GET_ARTICLE_SUCCESS, article: data });
};

export const createArticle = (article) => async (dispatch) => {
  const res = await axios.post('/articles', article);
  const newArticle = res.data;
  dispatch({ type: CREATE_ARTICLE_SUCCESS, article: newArticle });
};

export const editArticle = (article) => async (dispatch) => {
  const res = await axios.put(`/articles/${article.id}`, article);
  const newArticle = res.data;
  dispatch({ type: UPDATE_ARTICLE_SUCCESS, article: newArticle });
};

export const deleteArticle = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ARTICLE_REQUEST });
  await axios.delete(`/articles/${id}`);
  dispatch({ type: DELETE_ARTICLE_SUCCESS });
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        article: null,
        articles: action.articles,
        error: false,
      };
    case GET_ARTICLE_REQUEST:
      return {
        ...state,
        article: null,
      };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        article: action.article,
        error: false,
      };
    case DELETE_ARTICLE_SUCCESS:
      return {
        ...state,
        article: null,
      };
    case CREATE_ARTICLE_SUCCESS: {
      const newArticles = [...state.articles, action.article];
      return {
        ...state,
        articles: newArticles,
        article: action.article,
      };
    }
    case UPDATE_ARTICLE_SUCCESS: {
      const newArticles = state.articles.map((item) => {
        if (item.id === action.article.id) return action.article;
        else return item;
      });
      return {
        ...state,
        article: action.article,
        articles: newArticles,
      };
    }
    default:
      return state;
  }
}
