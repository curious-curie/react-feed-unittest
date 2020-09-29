import axios from 'axios';
export const UPDATE_USERS = 'auth/UPDATE_USERS';
export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';

export const fetchUsers = () => {
  return async (dispatch) => {
    const users = await axios.get('/user');
    if (users) {
      dispatch(updateUsers(users));
    }
  };
};

export const updateUsers = (users) => {
  return {
    UPDATE_USERS,
    users,
  };
};

export const requestLogin = ({ email, password }) => {
  return async (dispatch) => {
    const res = await axios.get('/user');
    const users = res.data;
    const user = users.find((user) => user.email === email);
    console.log(email);
    // if (user.password !== password) dispatch(loginFailure());
    // dispatch(login());
    try {
      const loginUser = { ...user, logged_in: true };
      const newUsers = users.map((item) => {
        if (+item.id === +user.id) return loginUser;
        else return item;
      });
      await axios.put(`/user/${user.id}`, { ...user, logged_in: true });
      dispatch(loginSuccess({ user: loginUser, users: newUsers }));
    } catch (error) {
      dispatch(loginFailure(error));
    }
  };
};

export const login = () => {
  return {
    type: LOGIN,
  };
};

export const loginSuccess = ({ user, users }) => {
  // localStorage.setItem('user', JSON.stringify(user));
  return {
    type: LOGIN_SUCCESS,
    user,
    users,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_ERROR,
    error,
  };
};

const initialState = {
  loading: false,
  error: false,
  user: null,
  users: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERS:
      return {
        ...state,
        error: false,
        loading: false,
        users: action.users,
      };
    case LOGIN:
      return {
        ...state,
        user: null,
        error: false,
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        users: action.users,
        user: action.user,
        error: false,
        loading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        user: null,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
