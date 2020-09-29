import axios from 'axios';

export const GET_COMMENTS_REQUEST = 'comments/GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'comments/GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_ERROR = 'comments/GET_COMMENTS_ERROR';

export const DELETE_COMMENT_REQUEST = 'comments/DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'comments/DELETE_COMMENT_SUCCESS';

export const UPDATE_COMMENT_REQUEST = 'comments/UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'comments/UPDATE_COMMENT_SUCCESS';

const initialState = {
  error: false,
  comments: [],
};

export const getComments = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/comments');
    dispatch({ type: GET_COMMENTS_SUCCESS, comments: data });
  } catch (e) {
    dispatch({ type: GET_COMMENTS_ERROR, error: e });
  }
};

export const deleteComment = (id) => async (dispatch) => {
  dispatch({ type: DELETE_COMMENT_REQUEST });
  try {
    await axios.delete(`/comments/${id}`);
    dispatch({ type: DELETE_COMMENT_SUCCESS });
  } catch (e) {
    console.log(e);
  }
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments,
        error: false,
      };
    case GET_COMMENTS_ERROR:
      return {
        ...state,
        comments: [],
        error: action.error,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comment: null,
      };
    default:
      return state;
  }
}
