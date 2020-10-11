import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import LoginPage from './LoginPage';
import { mockAuthStore } from '../../mockStore';
import rootReducer from '../../modules';
import history from '../../history';
import * as actionCreators from '../../modules/auth';

jest.mock('../../components/auth/LoginForm', () => {
  return jest.fn((props) => {
    return (
      <div className="LoginForm">
        <button className="loginButton" onClick={props.handleSubmit}>
          Log In
        </button>
      </div>
    );
  });
});

Enzyme.configure({ adapter: new EnzymeAdapter() });
describe('<LoginPage /> unit test', () => {
  const store = createStore(rootReducer, mockAuthStore, composeWithDevTools(applyMiddleware(thunk)));

  const spyFetchUsers = jest.spyOn(actionCreators, 'fetchUsers').mockImplementation(() => {
    return (dispatch) => {};
  });

  const getWrapper = () =>
    mount(
      <Provider store={store}>
        <Router history={history}>
          <LoginPage />
        </Router>
      </Provider>,
    );

  it('LoginPage should mount', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('LoginPage').length).toBe(1);
    expect(spyFetchUsers).toBeCalled();
  });

  it('should work with login button', () => {
    const wrapper = getWrapper();
    history.push = jest.fn().mockImplementation(() => false);
    const spyLogin = jest.spyOn(actionCreators, 'requestLogin').mockImplementation(({ email, password }) => {
      return (dispatch) => {};
    });
    const submitButton = wrapper.find('.loginButton');
    expect(submitButton.length).toBe(1);
    submitButton.simulate('click');
    expect(spyLogin).toBeCalled();

    setTimeout(() => {
      history.push = jest.fn().mockImplementation(() => false);
      expect(history.push).toBeCalled();
    }, 5000);
  });

  // it('should delete article', () => {
  //   const wrapper = getWrapper();
  //   const spyLogin = jest.spyOn(actionCreators, 'deleteArticle').mockImplementation((id) => {
  //     return (dispatch) => {};
  //   });
  //   const deleteButton = wrapper.find('.deleteButton');
  //   deleteButton.simulate('click');
  //   expect(spyLogin).toBeCalled();
  // });
});
