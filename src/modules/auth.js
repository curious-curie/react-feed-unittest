import axios from 'axios';
export const UPDATE_USERS = 'auth/UPDATE_USERS';
export const LOGIN = 'auth/LOGIN';
export const LOG_OUT = 'auth/LOG_OUT';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';

const userEmail = 'swpp@snu.ac.kr';

export const fetchUsers = () => {
  return async (dispatch) => {
    const res = await axios.get('/user');
    const users = res.data;
    const currentUser = users.find((user) => user.email === userEmail);
    if (currentUser.logged_in) {
      dispatch(loginSuccess({ user: currentUser, users }));
    }
  };
};

export const requestLogin = ({ email, password }) => {
  return async (dispatch) => {
    const res = await axios.get('/user');
    const users = res.data;
    const user = users.find((user) => user.email === email);
    const loginUser = { ...user, logged_in: true };
    const newUsers = users.map((item) => {
      if (+item.id === +user.id) return loginUser;
      else return item;
    });
    await axios.put(`/user/${user.id}`, { ...user, logged_in: true });
    dispatch(loginSuccess({ user: loginUser, users: newUsers }));
  };
};

export const login = () => {
  return {
    type: LOGIN,
  };
};

export const logout = (user) => {
  return async (dispatch) => {
    const newUser = { ...user, logged_in: false };
    await axios.put(`/user/${user.id}`, newUser);
    dispatch(logoutSuccess(newUser), { user: newUser });
  };
};

export const logoutSuccess = (user) => {
  return {
    type: LOG_OUT,
    user,
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

const initialState = {
  loading: false,
  error: false,
  user: null,
  users: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
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
    case LOG_OUT: {
      const users = state.users.filter((user) => user.id !== action.user.id);
      const newUsers = [...users, action.user];
      return {
        ...state,
        user: null,
        users: newUsers,
        error: false,
        loading: false,
      };
    }
    default:
      return state;
  }
}
