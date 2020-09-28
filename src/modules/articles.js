export const GET_POST_REQUEST = 'posts/GET_POST_REQUEST';
export const GET_POST_SUCCESS = 'posts/GET_POST_SUCCESS';
export const GET_POST_ERROR = 'posts/GET_POST_ERROR';

export const GET_POSTS_REQUEST = 'posts/GET_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'posts/GET_POSTS_SUCCESS';
export const GET_POSTS_ERROR = 'posts/GET_POSTS_ERROR';

export const DELETE_POST_REQUEST = 'posts/DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'posts/DELETE_POST_SUCCESS';

export const UPDATE_POST_REQUEST = 'posts/UPDATE_POST_REQUEST';
export const UPDATE_POST_SUCCESS = 'posts/UPDATE_POST_SUCCESS';

const initialState = {
  error: false,
  article: null,
  articles: [],
};

export default function articleReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
