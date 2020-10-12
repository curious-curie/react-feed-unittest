import axios from 'axios';

export const GET_COMMENTS_REQUEST = 'comments/GET_COMMENTS_REQUEST';
export const GET_COMMENTS_SUCCESS = 'comments/GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_ERROR = 'comments/GET_COMMENTS_ERROR';

export const DELETE_COMMENT_REQUEST = 'comments/DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'comments/DELETE_COMMENT_SUCCESS';

export const UPDATE_COMMENT_REQUEST = 'comments/UPDATE_COMMENT_REQUEST';
export const UPDATE_COMMENT_SUCCESS = 'comments/UPDATE_COMMENT_SUCCESS';

export const CREATE_COMMENT_REQUEST = 'comments/CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'comments/CREATE_COMMENT_SUCCESS';

const initialState = {
  error: false,
  comments: [],
};

export const getComments = () => async (dispatch) => {
  const { data } = await axios.get('/comments');
  dispatch({ type: GET_COMMENTS_SUCCESS, comments: data });
};

export const deleteComment = (id) => async (dispatch) => {
  await axios.delete(`/comments/${id}`);
  dispatch({ type: DELETE_COMMENT_SUCCESS, id });
};

export const editComment = (comment) => async (dispatch) => {
  await axios.put(`/comments/${comment.id}`, comment);
  dispatch({ type: UPDATE_COMMENT_SUCCESS, comment });
};

export const createComment = (comment) => async (dispatch) => {
  const res = await axios.post('/comments', comment);
  dispatch({ type: CREATE_COMMENT_SUCCESS, comment: res.data });
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments,
        error: false,
      };
    case DELETE_COMMENT_SUCCESS: {
      const newComments = state.comments.filter((item) => item.id !== action.id);
      return {
        ...state,
        comment: null,
        comments: newComments,
      };
    }
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, action.comment],
      };
    case UPDATE_COMMENT_SUCCESS: {
      const newComments = state.comments.map((item) => {
        if (item.id === action.comment.id) return action.comment;
        else return item;
      });
      return {
        ...state,
        comment: null,
        comments: newComments,
      };
    }
    default:
      return state;
  }
}
