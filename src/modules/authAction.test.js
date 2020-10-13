import axios from 'axios';
import store from '../store';
import authReducer, * as actionCreators from './auth';

const initialState = {
  loading: false,
  error: false,
  user: null,
  users: [],
};

const stubUser = {
  id: 1,
  email: 'swpp@snu.ac.kr',
  password: 'iluvswpp',
  name: 'Software Lover',
  logged_in: false,
};

const anotherUser = {
  id: 3,
  email: 'edsger@dijkstra.com',
  password: 'iluvswpp',
  name: 'Edsger Dijkstra',
  logged_in: false,
};
const stubUsers = [stubUser, anotherUser];

const stubLoggedInUser = {
  id: 1,
  email: 'swpp@snu.ac.kr',
  password: 'iluvswpp',
  name: 'Software Lover',
  logged_in: true,
};
const userEmail = 'swpp@snu.ac.kr';
const userPW = 'iluvswpp';

describe('authActions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it(`'fetchUsers' should fetch users correctly`, (done) => {
    // const stubUsers = [stubLoggedInUser];

    const spy = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: [anotherUser, stubUser],
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.requestLogin({ email: 'swpp@snu.ac.kr', password: 'iluvswpp' })).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });

    const spyLogin = jest.spyOn(actionCreators, 'loginSuccess').mockImplementation((user) => {
      return (dispatch) => {};
    });

    const dispatch = jest.fn();

    store.dispatch(actionCreators.fetchUsers()).then(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenCalledTimes(0);
      const newState = store.getState();
      // expect(newState.auth.user).toStrictEqual(stubLoggedInUser);
      // expect(newState.auth.users).toStrictEqual([anotherUser, stubLoggedInUser]);
      done();
    });
  });

  it(`'requestLogin' should make login call`, (done) => {
    const spyGet = jest.spyOn(axios, 'get').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: [stubLoggedInUser, anotherUser],
        };
        resolve(result);
      });
    });

    const spy = jest.spyOn(axios, 'put').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: [stubLoggedInUser, anotherUser],
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.requestLogin({ email: 'swpp@snu.ac.kr', password: 'iluvswpp' })).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      const newState = store.getState();
      expect(newState.auth.user).toStrictEqual(stubLoggedInUser);
      expect(newState.auth.users).toStrictEqual([stubLoggedInUser, anotherUser]);
      done();
    });
  });

  it(`'logout' should make put call`, (done) => {
    const stubUsers = [stubUser];

    const spy = jest.spyOn(axios, 'put').mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubUsers,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.logout(stubLoggedInUser)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  describe('Auth Reducer', () => {
    it('should return default state', () => {
      const newState = authReducer(undefined, {}); // initialize
      expect(newState).toEqual(initialState);
    });

    it('should request login', () => {
      const newState = authReducer(initialState, {
        type: actionCreators.LOGIN,
      });
      expect(newState).toEqual({ ...initialState, loading: true });
    });

    it('should request login action', () => {
      // const newState = authReducer(initialState, {
      //   type: actionCreators.LOGIN,
      // });
      store.dispatch(actionCreators.login());
      const newState = store.getState();
      expect(newState.auth).toStrictEqual({ ...initialState, loading: true, users: [anotherUser, stubUser] });
    });

    it('should login', () => {
      const newState = authReducer(initialState, {
        type: actionCreators.LOGIN_SUCCESS,
        users: [stubLoggedInUser],
        user: stubLoggedInUser,
      });
      expect(newState).toEqual({
        // users: [stubLoggedInUser],
        users: [stubLoggedInUser],
        user: stubLoggedInUser,
        error: false,
        loading: false,
      });
    });
  });

  it('should logout', () => {
    const newState = authReducer(initialState, {
      type: actionCreators.LOG_OUT,
      user: stubLoggedInUser,
    });
    expect(newState).toEqual({
      users: [stubLoggedInUser],
      user: null,
      error: false,
      loading: false,
    });
  });
});
